# 开发指南

返回 [文档索引](<README.md>)；修改前阅读 [贡献规范](<../CONTRIBUTING.md>) 和 [架构](<architecture.md>)。

## 工具与安装

- 插件运行最低 Node 22.13，依赖内置 `node:sqlite`；开发环境还必须满足锁定的开发依赖要求。
- 建议 Node 22.22.2+ 或 24.15+。例如当前 lock 中 jsdom 的传递依赖要求 `^22.22.2 || ^24.15.0 || >=26`；不要把运行时 minimum 当成完整开发环境承诺。
- pnpm 固定 10.33.0，见 [package.json](<../package.json>) 的 `packageManager`；使用 [pnpm-lock.yaml](<../pnpm-lock.yaml>)，不提交其他包管理器 lock。

```sh
pnpm install --frozen-lockfile
pnpm check
```

依赖构建脚本由本机 pnpm/DSH 安装政策控制。ssh2 的可选 native 加速不是核心 JS 功能的前提；esbuild 则必须能运行。如果需要跳过第三方脚本，可用 `pnpm install --frozen-lockfile --ignore-scripts`，然后以 `pnpm build` 验证构建器，不要自动批准未审查脚本。

## 命令入口

| 命令 | 行为 |
| --- | --- |
| `pnpm check` | repo 检查 → locale 同步检查 → 两套 tsc → build → 默认测试 |
| `pnpm check:repo` | 本地文档目标、skill 元信息、脚本引用、安装入口和约束检查；不修写文件 |
| `pnpm build` | TSX/CSS → tracked 客户端 bundle；Host 不转译 |
| `pnpm typecheck` | Client DOM 类型 + 独立 test Node 类型两套配置 |
| `pnpm locale` / `pnpm locale:check` | 导出 / 只校验英中生成语言包 |
| `pnpm test` | 构建后运行根 test 的明确文件集合，不扫描临时目录或 dev 工具 |
| `pnpm test:ssh` | 定向 SSH/security/连接表单测试，先构建 |
| `pnpm test:integration` | 显式授权访问已有本机 DB 测试夹具；有写副作用 |
| `pnpm audit:ui` / `pnpm shot` / `pnpm audit:ssh` | 可选 Windows Edge 文件夹具测量，详见 [测试边界](<testing.md#浏览器量具>) |

没有默认 dev server 或自动 watch 命令。手动调用 `node --test` 不会触发 package 的 pretest；UI 修改必须先构建再测。

## 生成物约定

- 客户端唯一来源是 `src/client/`；[构建脚本](<../scripts/build.mjs>) 保留宿主 module-loader wrapper、外部 React 和 stylesheet 内嵌。
- locale 唯一来源是 [i18n.ts](<../src/client/lib/i18n.ts>) 的 `en` / `zh`，不可单独修 JSON。
- [dist/client.js](<../dist/client.js>) 和 locale JSON 故意提交：目录安装没有安装时自动构建保证。客户端或文案变更应连同生成结果提交。
- 不改源码的情况下重新构建应没有差异。CI 在 `pnpm check` 后检查 tracked 生成物 drift。

## 加载到现有 DSH

本仓库不包含 DSH Web shell。先在插件管理器或 CLI 指向本仓库，再按改动边界操作：

1. **Client**：`pnpm build` 后刷新现有 DSH 页面；如果宿主提供并启用了插件 HMR，必须验证它确实收到新 bundle，不能只看到文件已写出就声称 UI 已更新。
2. **Host**：重新加载/重启插件才能替换 Node 已导入的 ESM，再刷新页面。不要为了小改动擅自改用户 profile 或重启整个宿主。
3. **DSH 本身**：修改宿主 checkout 不属于本仓库的普通开发；宿主 shell/plain package 需要相应 Web 构建与原 URL 刷新，另起 server 不会更新用户正在看的 GUI。

[dev harness](<../dev/harness.html>) 使用静态夹具渲染真实 bundle，只验证文件夹具环境；它不证明线上插件被安装、启用、认证或 HMR 生效。

## 项目级 skill

项目 skill 放在 [.agents/skills/grid-maintenance/SKILL.md](<../.agents/skills/grid-maintenance/SKILL.md>)，文件首部的 YAML 包含必填 `name` 和 `description`。本仓库检查器要求 description 使用 JSON 兼容的双引号字符串，避免把 YAML 注释、布尔或空值误当说明。DSH filesystem skill provider 的默认项目发现支持 `.agents/skills/<name>/SKILL.md`，不是把任意 docs 文档当作 skill。

该路径已按安装版 DSH 0.2.2-rc.1 的 loader 核实；运行配置仍需启用 filesystem provider 与默认 roots。若当前会话 catalog 尚未发现它，直接阅读该文件作为 fallback；不要因此复制到全局目录或修改宿主配置。

skill 是操作流程，根 [AGENTS.md](<../AGENTS.md>) 是仓库不变量，专题 docs 是事实说明。三者引用而不复制大段协议，变更流程时一起复核。

## 常见误区

- 测试 UI 却忘记重建，实际检查旧 bundle。
- 只跑 SSH 子集，就声称完整多引擎回归通过。
- 将历史记录中的测试数、旧 API 或“不支持 SSH”作为当前结论。
- 以 Git 忽略规则代替秘密保护；已跟踪/已泄露的秘密不会因 ignore 消失。
- 为了清理删掉 bundle patch、公开测试证书、README 截图或 tracked 产物。
