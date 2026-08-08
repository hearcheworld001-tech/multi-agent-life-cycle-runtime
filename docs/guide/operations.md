# 发布与运维

本页描述当前文档站的本地运行、构建、发布和故障排查。这里的“运维”只针对文档站，不代表未来 Agent Runtime 的生产运维方案。

## 当前发布链路

```text
Gitee 主仓库
   |
   | GitHub Actions 定时同步（需要 Gitee 凭据）
   v
GitHub 镜像仓库
   |
   | Cloudflare Pages Git 集成
   v
VitePress build -> 静态 HTML/CSS/JS -> pages.dev
```

线上地址：<https://multi-agent-life-cycle-runtime.pages.dev/>

Cloudflare Pages 发布的是 VitePress 生成的 HTML 静态站点。源文件使用 Markdown 是为了便于维护，不影响浏览器最终接收 HTML。

## 环境要求

- Node.js 20 或更高；
- npm；
- 能访问 npm registry 的网络；
- UTF-8 编辑器和终端；
- 发布时需要对应 Gitee、GitHub 和 Cloudflare 权限。

## 本地开发

安装锁定依赖：

```bash
npm ci
```

启动开发服务器：

```bash
npm run docs:dev
```

开发服务器支持热更新。编辑 `docs/**/*.md` 或 `docs/.vitepress/config.mts` 后，页面应自动刷新。

## 构建与预览

生产构建：

```bash
npm run docs:build
```

输出目录为 `docs/.vitepress/dist`。该目录是生成物，不应手工编辑。

预览生产构建：

```bash
npm run docs:preview
```

提交前至少执行一次生产构建，因为开发服务器可能不会暴露全部死链接、配置和服务端渲染错误。

## Cloudflare Pages 配置

| 配置项 | 值 |
| --- | --- |
| Git 仓库 | `hearcheworld001-tech/multi-agent-life-cycle-runtime` |
| 生产分支 | `master` |
| Framework preset | `None` 或 `VitePress` |
| 构建命令 | `npm run docs:build` |
| 输出目录 | `docs/.vitepress/dist` |
| Root directory | `/` |
| Node.js | 20 或更高 |

每次 GitHub `master` 更新后，Cloudflare Pages 自动安装依赖、构建并发布。部署成功后，生产别名指向最新成功版本；失败构建不会覆盖上一个成功站点。

## Gitee 到 GitHub 同步

工作流文件：`.github/workflows/sync-from-gitee.yml`。

同步流程每 15 分钟运行一次，也支持手动触发。由于 Gitee 当前要求 Git 认证，GitHub 仓库需要配置 Actions Secrets：

| Secret | 含义 |
| --- | --- |
| `GITEE_USERNAME` | 有权读取 Gitee 仓库的用户名 |
| `GITEE_TOKEN` | Gitee 私人令牌或只读访问令牌 |

凭据只能存放在 GitHub Actions Secrets 中，不能写入工作流、README、日志或提交历史。

### 同步安全边界

- Gitee 是主仓库，GitHub 是镜像和部署源；
- 工作流会强制同步 Gitee 的分支和标签到 GitHub；
- 不应直接在 GitHub `master` 上提交独有改动，否则下一次镜像可能覆盖；
- 修改工作流本身时，应先推送到 Gitee，再同步或同时推送两个远端；
- 令牌应使用最小读取权限，并设置轮换和撤销流程。

## 内容变更检查清单

提交前检查：

1. 新页面已经加入 `docs/.vitepress/config.mts` 导航或由现有页面链接；
2. 内部链接使用正确的相对路径或站点绝对路径；
3. 没有把设计候选写成已实现事实；
4. 术语与[术语表](./glossary.md)一致；
5. 表格在窄屏仍可理解，代码块没有超长不可换行文本；
6. `npm run docs:build` 成功；
7. 构建后抽查首页、导航、搜索和新增页面；
8. 提交没有包含 `node_modules`、密钥或本地临时文件。

## 常见故障

### 构建提示死链接

确认目标 Markdown 文件存在，路径大小写一致，并检查 VitePress `cleanUrls` 下的链接形式。文档内优先链接 `.md` 源文件的相对路径，导航使用 `/guide/name`。

### 本地中文显示乱码

确认文件保存为 UTF-8。Windows PowerShell 读取时显式使用：

```powershell
Get-Content -Encoding utf8 -Raw README.md
```

乱码可能只是终端解码错误，不要在未确认文件字节编码前批量重写。

### Cloudflare 构建失败

按顺序检查：

1. Cloudflare 构建日志中的第一条实际错误；
2. Node.js 版本是否至少为 20；
3. `package-lock.json` 是否与 `package.json` 一致；
4. 构建命令和输出目录是否正确；
5. 相同提交能否在本地通过 `npm ci` 和 `npm run docs:build`。

### GitHub 镜像同步失败

- `could not read Username for 'https://gitee.com'`：缺少或无法读取 Gitee Secrets；
- `permission denied`：Gitee token 权限不足或已过期；
- GitHub push 被拒绝：检查工作流 `contents: write` 权限；
- 分支保护阻止强制推送：镜像模式需要调整保护策略或改用非强制同步设计。

## 回滚

### 文档内容回滚

优先使用新的 Git 提交反向恢复错误变更，保留审计历史，不重写公共分支历史。

### Cloudflare 部署回滚

Cloudflare Pages 保留历史部署。可以在项目部署列表中将已验证的历史版本重新设置为生产版本，随后再修复源仓库。

### 凭据泄露

1. 立即在 Gitee 撤销泄露令牌；
2. 在 GitHub Actions Secrets 中替换；
3. 检查 Actions 和部署日志是否包含敏感值；
4. 如果凭据进入 Git 历史，按安全事件处理，不能只删除当前文件；
5. 重新运行同步并验证最小权限。

## 发布验收

一次文档发布只有在以下证据齐全时才算完成：

- 本地生产构建成功；
- Cloudflare 最新部署成功；
- 线上首页返回并显示正确标题；
- 新增页面可通过导航访问；
- 内部链接无死链；
- GitHub 与 Gitee 目标分支指向预期提交；
- 不包含未授权凭据和未声明实现承诺。
