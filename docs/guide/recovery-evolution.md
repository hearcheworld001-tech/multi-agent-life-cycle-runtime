# 故障恢复与演化

## 故障恢复

```text
Failure -> Detection -> Diagnosis -> Recovery / Rollback
        -> Evaluation -> Learning
```

恢复必须区分临时重试、状态回滚、任务转移和 Agent 级恢复，并留下原因、动作、结果和版本记录。

## 自我进化

```text
Experience -> Reflection -> Evaluation -> Experiment
           -> Validation -> Update
```

能力、策略、流程或架构的变化必须有证据、验证结果、版本和回退路径，不能把一次偶然结果直接固化为长期行为。
