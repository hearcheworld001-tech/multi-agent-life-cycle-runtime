# Multi-Agent Life Cycle Runtime

面向长期存在的多智能体生命运行时设计。项目关注的不是一次请求内完成任务的 Agent 工作流，而是让多个智能体能够在一个受控运行环境中持续存在、感知环境、积累经验、从故障中恢复，并在可验证的边界内演化。

> Engine 提供生命环境，Agent 产生生命行为。

## 项目目标

传统 Agent 通常遵循“收到任务 -> 执行 -> 返回结果 -> 结束”的短生命周期。本项目将 Agent 定义为具有稳定身份、目标、状态、能力、记忆和行为循环的自主实体，并为其提供连续运行所需的底层能力。

运行时的五项核心能力：

1. **持续运行（Continuous Operation）**：管理生命周期、心跳、休眠与唤醒、状态快照和重启后的身份连续性。
2. **故障恢复（Fault Recovery）**：发现异常、诊断原因、执行恢复或回滚，并沉淀失败经验以减少重复错误。
3. **自我进化（Self Evolution）**：将经验经过反思、评估、实验和验证后，更新知识、技能、策略或流程。
4. **环境认知（Environment Awareness）**：持续观察用户、外部系统、数据、资源和其他 Agent，并维护可用于判断的世界模型。
5. **自我认知（Self Awareness）**：维护关于身份、目标、能力、限制、表现和成长历史的自我模型。

## 核心定义

### Agent

Agent 是一个具有以下要素的自主执行实体：

- **Identity**：稳定身份、角色、使命与价值约束。
- **Goal**：当前目标、优先级与目标来源。
- **State**：任务、能力、关系、世界理解和运行状态。
- **Memory**：可检索、可更新、可遗忘的长期经验，而不仅是上下文窗口。
- **Capability**：可调用的技能、工具与经过结果验证的熟练度。
- **Behavior Loop**：观察、理解、决策、行动、评估和反思的闭环。

### Engine / Runtime

Engine 不是 Agent 的“大脑”，而是 Agent 运行与协作的基础环境。它负责：

- 生命周期、调度和心跳
- 状态持久化与快照恢复
- Agent 通信、隔离与资源分配
- 安全、权限和环境接口
- 事件分发、健康检查和故障编排

Agent 自主负责目标、判断、记忆、策略、学习与成长。运行时不应替 Agent 做价值判断或隐式修改其认知状态。

## 总体架构

```text
External Environment
  Users / APIs / Files / Data / Systems / Other Agents / Events
                              |
                              v
Environment & Perception Layer
  Sensors -> Perception -> Understanding -> World Model -> Prediction
                              |
                              v
Agent
  Identity | Goals | Memory | Self Model | Capabilities
  Decision | Action | Recovery | Reflection | Evolution
                              |
                              v
Multi-Agent Life Runtime
  Lifecycle | Scheduler | Heartbeat | Communication | Persistence
  Resources | Security | Recovery | Wake/Sleep | Observability
```

世界模型应至少表达实体、关系、状态、事件和预测；Agent 通过它理解环境，而不是只对单次输入做被动响应。

## 生命周期模型

一个 Agent 的存在不等同于某次进程或任务的执行。抽象生命周期如下：

```text
Birth -> Identity Formation -> Capability Development -> Active
                                                        |
             +------------------------------------------+
             | Observe -> Act -> Evaluate -> Reflect    |
             |                  |                       |
             |                  v                       |
             |              Evolve                       |
             +------------------------------------------+
                                                        |
                    Sleep <-> Wake <-> Recovering -> Terminated
```

运行状态可细化为：`Created`、`Initializing`、`Active`、`Sleeping`、`Recovering`、`Evolving` 和 `Terminated`。状态转换必须由事件驱动、可审计且能够通过快照恢复。

## 状态与快照

为保证重启后的连续性，运行时需要保存 Agent Snapshot。快照至少应覆盖：

- Identity 与版本
- Goal State 与当前任务状态
- Capability State 与性能记录
- Memory 索引及必要的工作记忆
- World State 与关系状态
- 生命周期状态、恢复点和最近心跳

快照的目标不是简单保存数据，而是使恢复后的 Agent 能以可解释的方式延续先前身份、目标和经验。

## 记忆架构

记忆不是上下文的无限堆积，而是“经验 -> 评估 -> 编码 -> 存储 -> 检索 -> 使用 -> 更新/遗忘”的生命周期。

| 层级 | 回答的问题 | 典型内容 |
| --- | --- | --- |
| Working Memory | 我正在处理什么？ | 当前任务、局部推理、短期上下文 |
| Episodic Memory | 我经历过什么？ | 事件、过程、结果与评价 |
| Semantic Memory | 我知道什么？ | 从经验中抽取的事实、规律和知识 |
| Procedural Memory | 我会怎样做？ | 已验证的技能、工作流与策略 |
| Self Memory | 我如何变化？ | 能力表现、失败模式、成长与限制 |

记忆检索应由当前情境、相关性和重要性触发，避免每次加载全部历史。遗忘与降权同样是必要机制，用于控制资源消耗并保留真正影响未来决策的经验。

## 故障恢复与演化

故障处理闭环：

```text
Failure -> Detection -> Diagnosis -> Recovery / Rollback -> Evaluation -> Learning
```

演化闭环：

```text
Experience -> Reflection -> Evaluation -> Experiment -> Validation -> Update
```

任何改变能力、策略、流程或架构的演化，都应有明确的证据、版本、验证结果和回退路径；不能将一次偶然结果直接固化为长期行为。

## 多智能体协作

多 Agent 运行时需要支持：

- Agent 发现、关系建模与权限边界
- 消息、事件和任务协作协议
- 分工、协调、竞争与冲突处理
- 共享记忆与私有记忆的隔离规则
- 资源配额、健康状态与可观测性
- 创建、休眠、合并、升级和终止等生命事件

具体组织结构不预设为中心化或完全自治；协调方式应由场景、安全模型与责任边界决定。

## 工程设计范围

当前仓库处于设计阶段。后续实现应首先明确以下契约，而不是先绑定某个框架或基础设施：

1. Engine 模块边界与 Agent Interface
2. 生命周期状态机、事件模型与恢复语义
3. Memory Interface、检索策略与共享/隔离规则
4. Runtime API、通信协议与权限模型
5. 快照与存储模型、版本迁移和审计记录
6. 调度、资源管理、心跳与可观测性
7. 演化的评估、验证、发布与回滚机制

## 设计原则

- **生命连续性优先**：重启、休眠和迁移不应无声地抹去 Agent 的身份与经验。
- **边界清晰**：Engine 管理运行环境，Agent 管理自身行为；外部环境通过受控接口进入系统。
- **显式状态**：重要状态、转换、恢复点和版本都应可追踪。
- **经验可验证**：记忆、能力和演化结论应保留来源与评价依据。
- **安全优先**：权限、资源、通信和自我修改必须具备约束、审计和回退能力。
- **从架构到实现**：先稳定定义与契约，再选择工作流框架、存储和消息基础设施。

## 愿景

本项目最终要构建的不是又一个任务编排框架，而是一个支持智能体长期存在、学习、恢复、协作与受控进化的数字生命运行环境。
