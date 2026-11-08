# 测试指南

返回 [文档索引](<README.md>)。通过数必须来自本次执行；历史 [测试记录](<archive/04-test-report.md>) 不代表当前版本的验证结果。

## 默认验证：不使用已有数据库

```sh
pnpm check
```

统一入口依次做仓库约束、locale 同步、Client/test 两套 TypeScript 检查、构建与 Node 测试。`pnpm test` 的 pretest 会构建，随后 [test runner](<../scripts/test.mjs>) 只枚举仓库根 test 下的测试文件，避免意外执行临时脚本。

默认使用临时 SQLite、mock vendor clients、jsdom 和测试自己创建的回环 SSH/TLS/协议服务。它**不探测已有 MySQL/PostgreSQL/Redis 的标准端口夹具**；四个相关测试明确跳过。少量不可达端口错误测试仍会发起回环连接，不能称为“完全不联网”。

测试所需的可选驱动必须安装才能覆盖对应路径。Node 旧版本缺少 `module.registerHooks` 时，部分 wiring 用例会跳过；跳过不是通过。SQL Server 有 mock/DDL/streaming/wiring 覆盖，不等于真实实例验证。

## 显式本地 DB 集成（有副作用）

只有准备了**专用、可销毁**的本机服务后才运行：

```sh
pnpm build
pnpm test:integration
```

该命令显式设置 `GRID_TEST_INTEGRATION=1`，运行完整测试。默认 `pnpm test` 会覆盖继承的这个变量为 `0`，不能因为旧 shell 环境意外启用 DB 写入；直接 `node --test` 不会做这个覆盖。

当前 [driver suite](<../test/drivers.test.mjs>) 使用固定夹具：

| 引擎 | 地址 / 账号 / 数据范围 | 副作用 |
| --- | --- | --- |
| MySQL | `127.0.0.1:3306`，`root` / `gridpass`，库 `gridtest` | DROP/CREATE `grid_probe`、CRUD |
| PostgreSQL | `127.0.0.1:5432`，`postgres` / `gridpass`，库 `gridtest`，schema `public` | DROP/CREATE `grid_probe`、CRUD、catalog 查询 |
| Redis | `127.0.0.1:6379`，无密码，db0 | DEL/SET/HSET/RPUSH `grid:probe:*` |

这些是公开测试凭据，不是可接受的部署默认值。当前固定对象名可能覆盖同名数据，且测试不承诺清理所有对象；不能用已有工作库、共享 Redis 或生产转发端口。服务不可达仍会跳过，执行完必须检查 skipped 明细，不能声称所有引擎都测过。该命令不自动创建容器、不使用用户 DSH profile，也不包含真实 SQL Server 测试。

## 按变更选择回归

| 边界 | 主要 suite |
| --- | --- |
| SQL 分句/只读/引用/分页 | [query](<../test/query.test.mjs>)、[API](<../test/api.test.mjs>) |
| 连接 CRUD/加密/输入 | [connections](<../test/connections.test.mjs>)、[ssh-config](<../test/ssh-config.test.mjs>) |
| 队列/lane/重连/取消/关闭 | [session](<../test/session.test.mjs>)、[ssh-transport](<../test/ssh-transport.test.mjs>)、[ssh-review](<../test/ssh-review.test.mjs>) |
| vendor socket/TLS/SSH | [driver wiring](<../test/ssh-driver-wiring.test.mjs>)、[loopback integration](<../test/ssh-integration.test.mjs>) |
| 结果截断与 DDL | [streaming](<../test/streaming.test.mjs>)、[PG DDL](<../test/postgres-ddl.test.mjs>)、[SQL Server DDL](<../test/sqlserver-ddl.test.mjs>)、[describe wiring](<../test/describe-wiring.test.mjs>) |
| SQLite worker / Redis database scope | [worker](<../test/sqlite-worker.test.mjs>)、[Redis session](<../test/redis-session.test.mjs>) |
| UI / 表单 / export / locale | [UI](<../test/ui.test.ts>)、[dialog](<../test/connection-dialog-ui.test.ts>)、[format](<../test/format.test.mjs>)、[locale](<../test/locale.test.mjs>) |
| 仓库约束与检查器 | [repo](<../test/repo.test.mjs>) |

```sh
pnpm build
node --test test/query.test.mjs test/api.test.mjs
pnpm test:ssh
```

[公开 TLS 证书](<../test/fixtures/tls-cert.pem>) 与 [测试私钥](<../test/fixtures/tls-key.pem>) 仅用于 loopback 夹具，不是实际凭据，不能为了通用 secret ignore 而误删它们。

## 浏览器量具

当前脚本依赖 **Windows + 固定安装位置的 Microsoft Edge**；不是跨平台 CI 必需项。先构建，然后按需要运行：

```sh
pnpm build
pnpm shot -- --view table --theme light
pnpm audit:ui -- --views table,sql --themes light,dark
pnpm audit:ssh
```

- [截图脚本](<../dev/cdp-shot.mjs>)：输出图片和几何指标到忽略的 `dev/shots/`，用于人工审阅；截图命令成功不等于所有交互正确。
- [常规量具](<../dev/audit.mjs>) / [页面测量](<../dev/audit-page.js>)：对比度、表面、控件与字号报告。其 strict 只对部分指标判失败，且面板根扫描可能漏掉 Portal；不能当作完整可访问性验收。
- [连接表单浏览器回归](<../dev/ssh-visual-audit.mjs>)：假私钥与假域名，双主题 × 1280/700/390px，覆盖 SSH 顶部/底部滚动及常规表单。断言 modal 范围、横向溢出、footer hit-test、最后口令字段可达、引擎按钮可命中、主机/端口同行与窄屏凭据单列。仅启动独立临时 profile，不接真实 Host。

真实 DSH 页面仍需检查安装/加载、Host 鉴权、焦点与键盘、Portal、深浅色和窄宽度。不能拿 jsdom 或文件 harness 代替这些检查。未实际执行的浏览器/外部 DB/跨平台验证，在报告中明确标为未验证。

### 连接表单视觉回归记录

2026-11-08 整理仓库时，旧 600px 弹窗在文件 harness 的 1280px 深色用例出现 40px 横向溢出（body `clientWidth=585`、`scrollWidth=625`），该结果促成后续表单优化。

同日完成 840px 响应式表单后，在 Windows / Node 24.14.0 / 本机 Edge 重新执行 `pnpm audit:ssh`：双主题 × 1280/700/390px，共 **18 个检查场景**通过；各宽度无横向溢出，SSH 底部按钮与末尾字段可达，常规表单的引擎按钮可命中，主机/端口同行，窄屏用户名/密码单列。浏览器无未捕获异常，独立临时 profile 清理成功。

这属于真实 Edge 的**文件夹具**验证，不是已认证 DSH 页面验证；现有 DSH URL 返回需认证，未自动操作用户会话、修改 profile 或重启插件。
