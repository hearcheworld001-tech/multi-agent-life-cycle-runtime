# 工程路线图

当前仓库处于设计阶段。实现前需要稳定以下契约：

1. Engine 模块边界与 Agent Interface
2. 生命周期状态机、事件模型与恢复语义
3. Memory Interface、检索策略与共享/隔离规则
4. Runtime API、通信协议与权限模型
5. 快照、存储、版本迁移和审计模型
6. 调度、资源管理、心跳与可观测性
7. 演化的评估、验证、发布和回滚机制

## 本地预览

```bash
npm install
npm run docs:dev
```

## Cloudflare Pages

在 Cloudflare Pages 中连接 Gitee 镜像或 Git 仓库，构建配置填写：

| 配置项 | 值 |
| --- | --- |
| Framework preset | `VitePress`（没有该选项时选 `None`） |
| Build command | `npm run docs:build` |
| Build output directory | `docs/.vitepress/dist` |
| Root directory | `/` |
| Node.js version | `20` 或更高 |

每次推送到配置的分支后，Cloudflare Pages 会自动安装依赖、构建并发布静态站点。
