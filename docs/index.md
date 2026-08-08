---
layout: home

hero:
  name: Multi-Agent Life Cycle Runtime
  text: 多智能体生命运行时
  tagline: 让 Agent 持续存在、可靠恢复、积累经验，并在可验证边界内演化。
  actions:
    - theme: brand
      text: 开始阅读
      link: /guide/overview
    - theme: alt
      text: 查看核心契约
      link: /guide/contracts
    - theme: alt
      text: Gitee 仓库
      link: https://gitee.com/he-lizi_admin/multi-agent-life-cycle-runtime

features:
  - title: 连续性
    details: 身份、目标、状态和经验不因进程退出、休眠或迁移而丢失。
  - title: 可恢复性
    details: 检测、诊断、重试、回滚、隔离和学习形成可审计闭环。
  - title: 受控演化
    details: 经验只有经过实验、验证、审批和版本化后才能改变长期行为。
  - title: 多智能体协作
    details: 通过明确协议、权限、资源配额和冲突规则建立可治理的协作关系。
---

## 这份文档解决什么问题

普通 Agent 文档常从模型、提示词或工具调用开始。本项目先回答更基础的问题：一个 Agent 如何被识别、如何跨重启延续、如何区分短期状态和长期记忆、如何在失败后恢复，以及如何证明一次“自我改进”没有破坏既有能力。

文档按以下顺序展开：

1. [总体概览](/guide/overview)：建立共同语言、边界和非目标。
2. [Agent 生命周期](/guide/lifecycle)：定义存在状态、事件和状态转换。
3. [Runtime 架构](/guide/runtime)：说明生命基础设施的模块与数据流。
4. [记忆架构](/guide/memory)：说明经验如何形成、检索、共享和遗忘。
5. [故障恢复与演化](/guide/recovery-evolution)：定义可靠性闭环和演化门禁。
6. [多智能体协作](/guide/society)：定义关系、通信、权限和冲突处理。
7. [核心契约](/guide/contracts)：把设计原则收敛为可测试的实现约束。
8. [工程路线图](/guide/roadmap)：给出阶段目标、交付物和退出标准。

## 阅读前提

::: warning 当前状态
本仓库目前是架构设计和文档站，不包含可运行的 Agent Runtime。文档中的接口和数据结构是设计候选，不代表已发布 API。
:::

当文档使用“必须”时，它表示后续实现需要满足的约束；使用“应”时，它表示有充分理由的推荐；使用“可以”时，它表示允许替换的实现选择。

> Engine 提供生命环境，Agent 产生生命行为。
