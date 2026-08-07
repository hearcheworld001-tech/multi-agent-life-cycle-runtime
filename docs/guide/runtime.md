# Runtime 架构

Runtime 是 Agent 的生命基础设施，核心模块包括：

- Lifecycle Manager：创建、激活、休眠、恢复、演化和终止
- Scheduler：任务、事件和资源调度
- Heartbeat：健康检查、租约和失联检测
- Persistence：快照、检查点、版本和审计记录
- Communication：Agent 间消息、事件和协作协议
- Resource & Security：配额、隔离、权限和环境访问

Agent Snapshot 至少保存 Identity、Goal、Memory、Capability、Task State、World State、Relationship State、版本和恢复点。
