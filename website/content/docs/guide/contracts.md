# 核心契约

本页把设计原则转换为后续实现可以测试的最小契约。字段和接口名称仍是候选，但语义约束不能因技术选型而消失。

## 契约层级

1. **身份契约**：定义 Agent 如何被唯一识别和版本化。
2. **生命周期契约**：定义合法状态和转换提交方式。
3. **事件契约**：定义命令、事件、顺序、幂等和因果关系。
4. **快照契约**：定义可恢复状态和版本兼容性。
5. **动作契约**：定义外部副作用的授权和恢复语义。
6. **记忆契约**：定义来源、可见性、更新和遗忘。
7. **演化契约**：定义候选变更的验证、发布和回滚。
8. **审计契约**：定义证据完整性和跨模块关联。

## Identity Contract

### 候选结构

```text
AgentIdentity
├── agent_id: globally unique, never reused
├── identity_version: monotonically increasing
├── owner: authorized principal
├── mission: bounded purpose
├── policy_refs: versioned policy references
├── created_at
├── predecessor_id?: inheritance relation
└── status: active | terminated
```

### 必须满足

- `agent_id` 永不复用，即使原 Agent 已终止。
- 身份变更产生新版本，不能原地覆盖且不留记录。
- 所有者、使命或核心策略变化属于高风险变更，需要审批。
- 继承关系不自动继承权限和私有记忆。
- 实例 ID 与 Agent ID 分离；多个历史实例可以属于同一 Agent。

### 验证

- 尝试复用已终止 ID 时被拒绝；
- 并发身份更新只有一个版本提交成功；
- 可以从当前身份追溯完整版本链。

## Lifecycle Contract

### 候选接口

```text
request_transition(agent_id, from_state, to_state, reason,
                   expected_version, idempotency_key, actor)
  -> accepted | rejected | already_applied
```

### 必须满足

- 只允许状态图定义的转换。
- 转换使用预期版本，防止并发覆盖。
- 相同幂等键重复请求返回相同逻辑结果。
- 提交成功同时产生状态版本和事件记录。
- `Terminated` 不可逆。

## Event Contract

### 候选结构

```text
Envelope
├── message_id
├── kind: command | event | query | proposal | decision
├── schema_version
├── sender / recipient
├── occurred_at / received_at / expires_at
├── correlation_id / causation_id / trace_id
├── idempotency_key?
├── authorization_context
└── payload
```

### 必须满足

- 已发生事实用过去式事件表示，期望行为使用命令表示。
- 未知模式版本不能被静默解析。
- 过期命令不得继续执行高风险动作。
- 重复投递不能产生重复业务效果。
- 事件顺序只在声明的范围内保证，消费者不能假设全局顺序。

## Snapshot Contract

### 候选接口

```text
create_snapshot(agent_id, expected_state_version)
  -> snapshot_id, event_watermark, checksum

restore_snapshot(snapshot_id, target_runtime_version)
  -> restored | migration_required | incompatible | corrupted
```

### 必须满足

- 快照绑定 Agent 身份、状态版本和事件水位。
- 快照包含模式版本、创建工具版本和校验值。
- 恢复前验证身份、完整性、兼容性和租约。
- 不兼容快照必须显式迁移或拒绝，不能尽力猜测。
- 快照之后的事件重放不能重复已提交副作用。

## Action Contract

### 候选结构

```text
ActionIntent
├── action_id
├── agent_id / goal_id / task_id
├── tool / operation / parameters_ref
├── expected_effect
├── permission_requirement
├── resource_budget
├── idempotency_key
├── timeout / retry_policy
├── compensation?
└── risk_level
```

### 必须满足

- 执行前校验权限、策略版本、预算和 Agent 租约。
- 工具适配器声明副作用和恢复能力。
- 结果未知与明确失败分开表示。
- 高风险动作的审批绑定动作摘要、版本和有效期。
- 日志不能记录明文密钥或不必要的敏感参数。

## Memory Contract

### 候选接口

```text
store_memory(candidate, source_refs, scope, confidence, retention)
  -> memory_id, version

retrieve_memory(agent_id, context, purpose, limit)
  -> records with score_explanation and provenance

revise_memory(memory_id, expected_version, evidence)
  -> new_version
```

### 必须满足

- 长期记忆具有来源、可见范围、敏感度和保留策略。
- 检索阶段重新校验权限，不依赖写入时授权。
- 更新产生版本或替代关系，不无痕覆盖。
- 冲突信息被显式表达。
- 删除或撤销能识别需要重新评估的派生记忆。

## Evolution Contract

### 候选结构

```text
EvolutionCandidate
├── candidate_id / base_version
├── change_type / change_ref
├── hypothesis
├── evidence_refs
├── evaluation_plan
├── risk_assessment
├── approval_requirements
├── rollout_plan
└── rollback_plan
```

### 必须满足

- 候选变更不能直接覆盖稳定版本。
- 评价计划在看到实验结果前确定，防止选择性解释。
- 安全硬约束不能用平均质量提升抵消。
- 审批绑定候选内容，内容改变后审批失效。
- 发布支持灰度、监控和回滚。
- 回滚同时处理策略、配置、记忆引用和自我模型。

## Audit Contract

审计记录至少能重建：

```text
谁（actor / agent）
因为什么（goal / reason）
在什么授权下（policy / approval）
基于哪些信息（event / memory / version）
执行了什么（action / transition）
产生了什么结果（effect / state / evaluation）
```

审计写入必须由 Runtime 强制执行，不能由 Agent 自行决定是否记录。审计存储的访问权限应高于普通业务日志，并定义完整性校验和保留周期。

## 跨契约事务

最常见的跨契约流程是“执行外部动作并提交状态”：

```text
ActionAuthorized
  -> EffectStarted
  -> EffectSucceeded / EffectFailed / EffectUnknown
  -> StateCommitted
  -> CheckpointCreated
```

无法用单个数据库事务覆盖外部系统时，必须通过操作状态机、幂等键、结果查询和补偿建立最终一致性。

## 兼容性策略

- 模式使用显式版本，不依赖字段猜测。
- 新增可选字段可以向后兼容；删除、改义或收紧字段需要新主版本。
- 消费者对未知字段应忽略或保留，但对未知消息类型必须拒绝或隔离。
- 快照迁移必须可重复、可校验，并保留原始制品。
- 运行时升级前需要验证旧快照、在途事件和回滚路径。

## 最小契约测试矩阵

| 契约 | 正常路径 | 异常路径 | 并发/恢复路径 |
| --- | --- | --- | --- |
| Identity | 创建并读取 | 非法所有者 | 并发版本更新 |
| Lifecycle | 合法转换 | 非法跳转 | 重复请求、租约丢失 |
| Event | 投递并确认 | 未知版本、过期 | 重复、乱序、重放 |
| Snapshot | 创建并恢复 | 损坏、不兼容 | 恢复后追赶事件 |
| Action | 授权并成功 | 拒绝、超时 | 结果未知、幂等重放 |
| Memory | 写入并检索 | 越权、冲突 | 更新、撤销、派生删除 |
| Evolution | 实验并发布 | 验证失败 | 灰度回滚、审批失效 |
| Audit | 完整关联 | 敏感信息脱敏 | 写入失败和完整性检查 |

只有正常路径通过不能证明契约成立；异常、重复、并发和恢复路径是同等重要的验收条件。
