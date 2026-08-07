# Agent 生命周期

```text
Birth -> Identity Formation -> Capability Development -> Active
                                                        |
             Observe -> Act -> Evaluate -> Reflect -> Evolve
                                                        |
                    Sleep <-> Wake <-> Recovering -> Terminated
```

运行状态包括 `Created`、`Initializing`、`Active`、`Sleeping`、`Recovering`、`Evolving` 和 `Terminated`。状态转换应由事件驱动、可审计，并能够从快照恢复。

生命周期让 Agent 从“启动、执行、结束”变为可以学习、休眠、恢复、协作和持续存在的实体。
