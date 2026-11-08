# 安全设计与信任边界

返回 [文档索引](<README.md>)；报告流程见 [SECURITY.md](<../SECURITY.md>)。本页记录设计边界，不代替最小数据库权限、宿主隔离或外部安全审计。

## 权限与 SQL

- Web 面板是已认证用户的数据库客户端，允许人工行编辑和 SQL；Agent 的 `grid_execute` 额外受 Host `allowWrites` 限制，默认关闭。不能把两条权限路径混为一谈。
- `grid_query` / inspect 保持只读语句判定，并在支持的引擎上配合只读事务/会话：PostgreSQL `BEGIN READ ONLY`、MySQL `START TRANSACTION READ ONLY`、SQLite 每语句重设 `query_only`。
- SQL Server 没有等价只读事务，分类器与数据库登录权限共同约束。函数副作用、数据库扩展和管理员权限不是关键字扫描可以完全覆盖的；使用只读专用账号。
- 行更新/删除必须携带完整真实主键，Host 核对表结构，不能因为 Client 发来了任意 key 就执行。参数值使用驱动绑定；标识符走方言引用。

实现入口：[router](<../lib/api.js>)、[分类/引用](<../lib/query.js>)、[工具定义](<../lib/tools.js>)。安全行为必须在 Host 验证，不只禁用按钮。

## 凭据与本地存储

连接在 `$DSH_HOME/dsh-grid/connections.json`，AES-256-GCM key 单独存放在同目录的 `key`。默认 home 为 `~/.dsh`。密码、SSH 私钥和 passphrase 分别加密；公开投影只暴露存在标记，不返回明文或密文。

更新语义必须保留：API 省略字段保留、显式空字符串清除；UI 空白编辑转换为省略，只有清除动作发送清空。关闭 SSH、切换认证方式要移除过时秘密。草稿 Test 不写注册表或创建持久密钥。

加密不能抵抗控制同一 Host 账号、同时可读注册表和 key 的攻击者。POSIX `0600` 不是 Windows ACL 的替代，部署需合适的目录 ACL 与用户隔离。不要向日志、错误、截图、工具结果或示例复制真实秘密；已泄露秘密必须轮换，Git ignore 不会撤销它。

实现入口：[连接存储](<../lib/connections.js>)。运行 profile 不属于仓库，也不属于测试数据。

## TLS 与 SSH 是两种独立身份

- TLS `disable` 不加密；`require` 只加密不验证，是明确 opt-out；启用 TLS 却未指定模式时默认 `verify-full`。不要将“TLS 默认验证”误写成“所有连接默认启用 TLS”。
- `verify-ca` 与 `verify-full` 的支持必须按驱动真实能力处理；SQL Server 不支持 chain-only 模式，不能偷偷降级。MySQL full verification 需要 DNS 身份。
- SSH 只支持单跳固定主机 SHA256 指纹；不做 TOFU、不读取任意 Host 私钥路径、不调用系统 ssh/shell。`ssh2` 可选且惰性导入；缺失只影响 SSH 路径。
- SSH 的目标地址是 jump host 能访问的数据库地址；TLS server name 是数据库证书身份，不是临时 listener 或 SSH 主机名。
- SSH 保护 Host → jump host；jump host → database 仍需按风险启用数据库 TLS。
- 每个 driver lease 的 `127.0.0.1` listener 不是本地用户认证边界；同机进程可能访问，仍需数据库认证和 OS/容器隔离。

详细配置见 [使用指南](<user-guide.md#ssh-tunnels>)。实现入口：[transport](<../lib/transport.js>)、[network](<../lib/drivers/network.js>)、[TLS](<../lib/drivers/tls.js>)。

## 不确定结果、取消与资源释放

已提交但丢失响应的写入不能安全重试；原始 Redis 命令也可能写入。取消后的查询、SSH 中断中的 in-flight 请求不能自动重放，不能静默回退直连。只读重试的适用范围由 router/session 明确决定。

连接有总 deadline、AbortSignal、迟到 driver 清理和有界 teardown；disconnect/edit/delete/unload 的 fence 必须拦住旧握手和排队工作。仅让 UI fetch 超时不等于数据库语句已经终止。SQLite 没有真正的查询取消能力，不能假称它已停止执行。

实现入口：[session](<../lib/session.js>)、[open](<../lib/open.js>)；回归入口见 [测试指南](<testing.md>)。

## 测试、安装与剩余风险

默认测试仅用临时数据和自建回环服务，已有数据库夹具显式 opt-in。公开 [测试私钥](<../test/fixtures/tls-key.pem>) / [证书](<../test/fixtures/tls-cert.pem>) 不是实际凭据，不能复用到部署。

依赖构建脚本可能执行代码。ssh2 的可选 native 加速不是核心 JS 功能必需；不要为缺省 JS 连接自动批准脚本或安装任意驱动。维护依赖时复核传递依赖、许可、engines 和 lock diff。

已知边界包括 SQL Server 的登录权限、PostgreSQL 大结果可能先物化、SQLite 降级后的同步阻塞、文件 harness 不证明线上鉴权，以及常规 UI 量具不完整覆盖 Portal/可访问性。这些需要显式验证或未来改进，不用“全测试通过”掩盖。
