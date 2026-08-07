# 总体概览

本项目不是一次性任务编排器，而是一个为长期存在的智能体提供生存环境的 Runtime。

> Engine 提供生命环境，Agent 产生生命行为。

## Agent

Agent 是具有身份、目标、状态、能力、记忆和行为循环的自主执行实体。它负责自己的目标、判断、经验、策略和成长。

## Engine

Engine 负责生命周期、调度、心跳、持久化、通信、资源、安全、环境接口和故障编排，但不替 Agent 做价值判断。

## 总体数据流

```text
External Environment
  -> Perception Layer
  -> World Model
  -> Agent (Decision / Action / Reflection)
  -> Multi-Agent Life Runtime
```

世界模型至少应表达实体、关系、状态、事件和预测，使 Agent 能主动观察和理解环境，而不是只响应单次输入。
