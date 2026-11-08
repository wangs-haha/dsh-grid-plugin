# Grid — database workbench for DeepSeek Harness

Grid connects to your databases and works like a desktop client: a connection tree, an object list,
an editable data grid, a highlighted SQL console, and a Redis browser. It is modelled on
[RustGrid](https://github.com/yisier/rustgrid) — the Navicat-style layout, the object list with
metadata, the Excel-style data grid, the SQL editor with completion.

The difference is that Grid is also an agent capability: the connections you configure are exposed
as `grid_*` tools, so the model can inspect a schema and query it without you copying results around.

Upgrading from 0.4.0? Read [CHANGELOG.md](CHANGELOG.md) first — TLS verification, retry policy and the
`rows` response shape all changed.

## Screenshots

Both themes are rendered from the same declarations — a `--dg-*` layer over the host tokens — so dark
mode is not a separate skin that drifts.

| Light | Dark |
| --- | --- |
| ![Data grid in light mode](docs/screenshots/data-grid-light.png) | ![Data grid in dark mode](docs/screenshots/data-grid-dark.png) |

The SQL console takes its syntax colours from the host's own highlighter palette, pulled toward the
text colour so strings and comments stay readable on white as well as on near-black:

| Light | Dark |
| --- | --- |
| ![SQL console in light mode](docs/screenshots/sql-console-light.png) | ![SQL console in dark mode](docs/screenshots/sql-console-dark.png) |

| Structure of a relation | New connection |
| --- | --- |
| ![Structure view](docs/screenshots/structure-light.png) | ![New connection dialog](docs/screenshots/connection-dialog.png) |

These are produced by `dev/cdp-shot.mjs` (see [Development](#development)); `pnpm audit:ui` measures
the same views for contrast, surface separation and target sizes instead of photographing them.

## Install

```powershell
dsh plugin add D:\work\code\dsh-grid-plugin
```

Or from the Plugin Manager: **Install bundle** → choose this directory. Then reload the page and
open the **数据库 / Grid** entry in the sidebar.

To let the agent modify data, edit the row in your profile's `cordis.patch.yml`:

```yaml
- insert:
    - id: grid
      name: '@local/dsh-grid'
      config:
        allowWrites: true    # default false
        idleMinutes: 10      # close an idle session after N minutes
```

`allowWrites` gates the **agent's** `grid_execute` tool. The panel itself always
lets you edit rows (it is you), while `grid_query` is read-only for the agent
regardless.

## Requirements

Node **22.13+** (or 23.4+) is required: SQLite goes through the built-in
`node:sqlite` module, which only stopped needing `--experimental-sqlite` at those
versions. The other four engines are optional dependencies, so a profile that
does without them still starts.

## Engines

| Engine | Driver | Status | Notes |
| --- | --- | --- | --- |
| SQLite | `node:sqlite` (built in) | ✅ out of the box | No install, no native build; queries run on a worker thread |
| MySQL / MariaDB | `mysql2` | ✅ optional dependency | 5.7+; table comments and row estimates |
| PostgreSQL | `pg` | ✅ optional dependency | 12+; database + schema levels, `reltuples` estimates |
| SQL Server | `mssql` | ✅ optional dependency | 2017+ |
| Redis | `ioredis` | ✅ optional dependency | 6+; namespaces, TTL, rename, console |
| Oracle, DB2 / ODBC | — | ⛔ not yet | Needs Instant Client / ODBC |

The four network drivers are declared as `optionalDependencies` and imported lazily. If one is
missing, only that engine reports *"the MySQL driver is not installed"*; everything else keeps
working. Install it with `pnpm add mysql2` inside the plugin directory.

## The panel

Three columns, the way a desktop client is laid out:

```
┌ toolbar ───────────────────────────────────────────────────────────────┐
│ Grid  [+ New] │ ● 生产环境 MySQL  mysql │ ⏻ ✓ ✎ 🗑 │      [New query] [⟳] │
├────────────┬──────────────┬────────────────────────────────────────────┤
│ 连接        │ 对象          │ tabs: users · Query 1 · Redis db0          │
│ ▾ 生产      │ audit_log    │ ┌────────────────────────────────────────┐ │
│   ● MySQL  │ categories   │ │ data grid / SQL console / structure    │ │
│   ○ Redis  │ orders       │ └────────────────────────────────────────┘ │
│ ▸ 测试      │ users        │                                            │
├────────────┴──────────────┴────────────────────────────────────────────┤
│ ● 生产环境 MySQL  8.4.0 · shop · 13 objects                    ready     │
└────────────────────────────────────────────────────────────────────────┘
```

**Connections** — create, edit, delete, test, connect, disconnect; group label, environment colour,
TLS mode. Groups collapse; right-click a connection for the full menu.

**TLS modes** — `disable` (default), `require` (encrypted, certificate *not* verified),
`verify-ca` (chain verified) and `verify-full` (chain and host name). A connection created with
`ssl: true` is treated as `verify-full`; supply `options.sslCa` with a PEM string to trust a
private CA. **TLS server name** optionally specifies the database certificate identity while
leaving the physical database address unchanged. SQL Server does not support chain-only
`verify-ca`: choose `verify-full` or another supported mode. MySQL `verify-full` requires a
DNS certificate identity; when dialing an IP, supply that DNS name explicitly.

## SSH tunnels

Network connections support a **single SSH jump host** with password or OpenSSH private-key
authentication (including an encrypted private key's passphrase). SQLite remains a local file
connection. No shell commands, agent forwarding or system `ssh` process are used.

1. Enter the **database host and port as reachable from the jump host**. An internal DNS name is
   resolved there; `127.0.0.1` means the jump host itself, not the browser or the DSH machine.
2. Enable **Connect through SSH**, then enter the jump host, port (default 22), user and authentication method.
3. Supply the **pinned SHA256 SSH host fingerprint** obtained from the administrator through a trusted channel.
   On the SSH server, an administrator can inspect a host public key with:

   ```sh
   ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub -E sha256
   ```

   Copy the `SHA256:...` value for a key type the server will negotiate. Grid never discovers or
   accepts keys automatically. A mismatch stops the connection; verify a legitimate rotation
   out of band before updating the pin. Only one pinned host key is supported per connection.
4. Enter the SSH password, or paste the complete private key and optional passphrase. There is no
   arbitrary Host file-path reader. Test the connection, then save it.
5. Keep database TLS configured independently. SSH protects DSH → jump host; it does **not** protect
   the jump host → database leg. The TLS server name is the **database** identity, not the SSH host.

The jump host must permit local TCP forwarding and reach the database endpoint. An administrator
can restrict a dedicated account using `AllowTcpForwarding local` and `PermitOpen host:port`.
The DSH Host, not the browser, must be able to reach the jump host.

`ssh2` is an optional, lazily imported dependency. If absent, only SSH connections fail; direct
connections keep working. Install it from the plugin directory with `pnpm install --ignore-scripts`.
The core JS path works without the package's optional native acceleration/build scripts.

**Credential edits:** blank fields preserve saved credentials; the explicit **Clear credential**
action removes one. Disabling SSH and saving erases its settings and secrets. Switching authentication
methods erases the obsolete method's credentials. Passwords, private keys and passphrases are independently
AES-256-GCM sealed; neither plaintext nor ciphertext is returned to the browser or Agent.
Omission preserves a credential in API patches and draft tests; an explicit empty string clears it.

**Lifecycle:** main/query drivers share one SSH connection per saved configuration, but each driver
owns its own ephemeral `127.0.0.1` listener. Each TCP connection gets a separate SSH channel, including
MySQL/PostgreSQL cancellation connections and SQL Server pool connections. Draft tests are isolated.
Closing an idle lane does not kill another lane. Disconnect/edit/delete invalidates old queued and
pending work; unload aborts probes and transport handshakes. A 20-second total connect deadline covers
SSH and database setup, followed by bounded cleanup. Cancellation is bounded at 10 seconds.
SSH-level keepalives run every 15 seconds, with three unanswered probes tolerated.

A dropped SSH connection invalidates its sessions. **An in-flight operation is not replayed**, even
if it returns a per-statement error; its outcome may be unknown. A later request reconnects on demand.
Grid never silently falls back to a direct connection. The existing Agent write policy is unchanged.

**Threat boundary:** loopback ports are not a local-user authentication boundary. Other processes
on the same Host can reach the forwarding listener while it is open, so retain database authentication
and use a trusted single-user Host or OS/container isolation. Sealing credentials does not protect
against an attacker who controls the Host account and can also read its encryption key. Enforce
appropriate Windows ACLs; POSIX `0600` alone is not an equivalent Windows access-control guarantee.

First-version exclusions: multi-hop/ProxyJump/ProxyCommand, interactive MFA, SSH agent/hardware-key
integration, Redis Cluster/Sentinel, and SQL Server instance discovery or redirected endpoints.
Configure a fixed TCP endpoint; redirects are rejected instead of bypassing the tunnel.

## The data views

**Object list** — the relations of the selected database with **name, kind, estimated rows and
comment**, sortable by any column and searchable. Double-click opens a tab; right-click offers
data, structure, "open in query" and copy-name.

**Data grid**

- server-side pagination and click-to-sort that stays correct across pages;
- the pager shows the row total from the engine's own estimate (`≈`) for an unfiltered table, and
  counts exactly when you filter or press **Refresh** — a `COUNT(*)` over a large table costs more
  than the page it labels;
- **Excel-style selection**: click, drag, or `Shift`+arrows to extend; `Ctrl/Cmd+C` copies the
  selection as TSV, `Ctrl/Cmd+V` pastes it back (multi-row paste asks for confirmation);
- the pager shows **selection size, sum and average** of the selected numeric cells;
- double-click a cell to edit it in place; the **row-number cell** opens a row editor with every field at
  once (only the fields you changed are written back, one `UPDATE` by primary key; text, JSON and long
  `varchar` columns get a multi-line field); **Insert row** adds a row of column defaults, ready to fill
  in, and the trash button deletes the current row;
- **column resize** by dragging header edges, **column hide/show** from the Columns menu (local, no
  refetch);
- a **filter builder** (column / operator / value with AND-OR, plus a raw `WHERE` escape hatch);
- insert row, delete row, and an **Export** menu — CSV, JSON, `INSERT` statements, or a Markdown table.
  The export walks the whole table page by page and says so when it stops at the 10 000-row limit.
- **Import CSV** — the header must name columns this table has (a stray column is refused rather than
  dropped). Rows go in 200 at a time and each batch is one transaction, so a bad row leaves nothing
  behind. An empty cell is written as `NULL`, letting the column's own default apply.

Editing needs a primary key: without one a row cannot be addressed safely, so the grid says so and
refuses the edit instead of risking a full-table update.

**Structure** — columns with type, nullability, default and PK marker; indexes; DDL. The description is
fetched once per open table and shared with the data view, so toggling Data/Structure costs no round
trip; each view's Refresh asks for a new one. On PostgreSQL the DDL is assembled from the catalogue —
real types, identity and generated columns, constraints as separate `ALTER TABLE` statements (so a
deferrable constraint survives), non-constraint indexes and comments; on SQL Server the `sys.*`
equivalents including computed columns and named default constraints, rendered with the exact type
(`nvarchar(100)`, `decimal(18, 2)`, `nvarchar(max)`). A view shows its own definition instead of a
synthesised `CREATE TABLE`.

**SQL console**

- **syntax highlighting** (keywords, functions, strings, numbers, comments, variables) drawn under a
  transparent textarea, with a **line-number gutter**;
- **completion** for keywords, functions, the tables in the current database and the columns of the
  open tab; `Ctrl+Space` opens it, arrows navigate, `Enter`/`Tab` accepts;
- `Ctrl/Cmd+Enter` runs the selection or the whole script; `Tab` indents; **Beautify** reformats
  clause by clause without touching the contents of strings or quoted identifiers; **Explain**
  prefixes the first statement;
- while a script runs, **Cancel** asks the engine to stop it (PostgreSQL `pg_cancel_backend`, MySQL
  `KILL QUERY`, SQL Server request cancel). SQLite has no interrupt API, and says so instead. A
  cancel travels on its own control path, so it is not queued behind the statement it stops;
- one result tab per statement, per-statement timing, a 25-entry **history** menu, and a banner when
  the result was capped at 2 000 rows.

**Redis** — namespace-grouped keys (`user:`, `cart:`, …), type filter, per-type value views
(string / hash / list / set / zset / stream), TTL, rename, edit string value, new key, delete, and a
raw command console.

The layout is a flex column and both toolbars **wrap** rather than clip: on a narrow panel the buttons
move to a second line instead of disappearing past the right edge. Measured with
`node dev/cdp-shot.mjs --view table` at 1680 / 1024 / 700 px: no horizontal overflow and no clipped
toolbar control at any of them (at 700 px the toolbar grows to 67 px, two lines).

## Agent tools

| Tool | Purpose | Writes |
| --- | --- | --- |
| `grid_list_connections` | Connections, engines, open sessions (no passwords) | — |
| `grid_inspect` | Databases / schemas / tables, or one table's columns, indexes and DDL | — |
| `grid_query` | Read-only SQL (`SELECT`, `WITH … SELECT`, `SHOW`, `DESCRIBE`, `EXPLAIN`, `PRAGMA`) | no |
| `grid_execute` | Any SQL, including DDL/DML | only with `allowWrites: true` |

`grid_query` classifies every statement before running it and rejects a script containing a mutating
verb, so a read-only request cannot quietly write. The classifier masks string literals and comments
first, refuses `EXPLAIN ANALYZE` (which executes its statement), `SELECT … INTO` / `INTO OUTFILE`,
`FOR UPDATE` / `FOR SHARE`, and a `PRAGMA name = value` assignment.

That is only the first layer. A read-only run is also handed to the engine, which refuses the write
itself: PostgreSQL runs it in `BEGIN READ ONLY`, MySQL in `START TRANSACTION READ ONLY`, and SQLite
sets `PRAGMA query_only`. SQL Server has no read-only session or transaction, so there the classifier
and the login's own permissions are the boundary.

`grid_query` and `grid_inspect` may omit `connectionId` when the workspace is bound to a database in
the panel — the binding supplies both the connection and its database.

## Sessions

A connection keeps **two**: the workbench lane serves the object tree, a page of rows and the
structure view, while SQL you type (and an export) runs on a second lane of its own. A report that
takes thirty seconds no longer freezes the rest of the panel, and Cancel has a connection it can
reach. SQLite and SQL Server stay on one connection — SQLite's driver is synchronous, and `mssql`
already multiplexes its own pool. Sessions expire after `idleMinutes` (default 10).

## Data and security

- Connections live in `$DSH_HOME/dsh-grid/connections.json`.
- Passwords are sealed with **AES-256-GCM** under a random key in `$DSH_HOME/dsh-grid/key`
  (mode `0600`), stored in its own file beside the registry.
- A password is **never** returned to the browser or to a tool: projections carry only
  `hasPassword`.
- The browser talks to `POST /api/grid` through `ctx.connection.fetch`, authenticated by the
  same-origin browser peer.
- Row updates and deletes always require a primary key, so a misclick cannot rewrite a table. The
  Host also checks the posted key against the table's real primary key, so a crafted or stale
  request cannot turn one row write into a full-table update.
- A read-only run is guarded twice. The classifier rejects PRAGMA write forms as well as `=`
  assignments, and SQLite re-asserts `PRAGMA query_only` before every statement, so a script cannot
  disable the guard for the statements that follow it.
- Redis scoped operations re-select the requested logical database instead of trusting the
  session's cached index, because a raw `SELECT` in the console moves the shared connection.
  Raw commands and key deletion are never retried after a dropped connection.
- TLS verifies the server certificate by default; `require` is the explicit opt-out, and it is
  labelled as unverified in the connection form.
- Connection handshakes have a 20s total deadline for transport + driver setup, with bounded
  graceful cleanup and forced socket teardown after a 1s grace period.
- Statements are bounded too: `options.queryTimeoutMs` (default 30 000) becomes
  `statement_timeout` on PostgreSQL, `MAX_EXECUTION_TIME` / `max_statement_time` on MySQL and
  MariaDB, `requestTimeout` on SQL Server and `commandTimeout` on Redis. SQLite has no equivalent, so
  a runaway SQLite query is bounded only by the client giving up.
- Writes are never retried automatically: a dropped socket after a committed `INSERT` would
  otherwise be replayed. Only all-reads scripts get the one retry.

## Architecture

The Web panel is TypeScript + React, bundled by esbuild into a single classic script
(`dist/client.js`, ~146 KB, React external). The Host half stays plain ESM.

```
src/client/
  main.tsx              bundle entry: registers the slot factories
  store.ts              observable stores (connections, catalog, tabs, queries, meta)
  lib/                  api client, SQL tokenizer/beautifier, formatting, types, i18n
  ui/                   kit.tsx primitives + panel.css (host tokens, plus a --dg-* semantic layer)
  views/                TreePane, TableView, SqlView, AuxViews, RedisView
  panel/                GridPanel (layout + toolbar) and ConnectionDialog
lib/                    Host: drivers, session pool, router, extras, tools
scripts/build.mjs       esbuild bundle + module-loader wrapper
```

## Development

```powershell
pnpm install
pnpm build                                 # src/client -> dist/client.js
pnpm test                                  # builds first; includes opt-in-by-availability local DB fixtures
pnpm test:ssh                              # isolated SSH/security/UI tests, no existing DB server used
pnpm typecheck                             # tsc over src/client and over the test sources
node scripts/export-locale.mjs             # i18n.ts -> locale/*.json
node dev/cdp-shot.mjs --view table         # render the panel in headless Edge
pnpm audit:ui                              # measure contrast, surfaces, targets in both themes
```

`pnpm test` runs `pnpm build` first on purpose: `test/ui.test.ts` loads the **built**
`dist/client.js`, so testing without rebuilding would silently check the previous bundle.
`pnpm typecheck` checks the panel sources and then the test sources through `tsconfig.test.json`,
which is the only config that pulls in `@types/node`.

The SSH suites use only their own loopback SSH server and minimal PostgreSQL/Redis protocol fixtures,
plus mocked vendor clients for all four network adapters. The certificate/private key under
`test/fixtures/` is a public, test-only self-signed fixture, not a real credential. No administrator
fingerprint, production private key or existing database is needed. The full `pnpm test` command
also runs the older driver integration suite, which may create/drop test objects on local database
servers if those documented test credentials are available; use `pnpm test:ssh` for the isolated SSH checks.

| Test file | Covers |
| --- | --- |
| `test/ssh-config.test.mjs` | strict SSH input, independent encryption, write-only projections, secret preservation/clearing, draft probes without persistence |
| `test/ssh-transport.test.mjs` | leases, independent listeners, timeout/abort/late callbacks, failed generations, no replay, queued-work fencing |
| `test/ssh-driver-wiring.test.mjs` | all four real adapters against mocked vendor packages: stream/connector routing, cancellation, TLS identities and teardown |
| `test/ssh-integration.test.mjs` | real local ssh2 server/client password and encrypted-key authentication, pinned host keys, real pg TLS and Redis protocol round trips |
| `test/ssh-review.test.mjs` | close/acquire races, probe invalidation, PostgreSQL ambient-credential isolation and SNI |
| `test/connection-dialog-ui.test.ts` | actual dialog payloads, write-only credential edits, SSH validation, SQLite switching, bilingual guidance |
| `test/query.test.mjs` | statement splitting, read-only classification (including the `EXPLAIN ANALYZE` / `INTO` / literal-masking cases), identifier quoting, pagination, value serialisation |
| `test/connections.test.mjs` | registry CRUD, AES-256-GCM at rest, TLS mode defaults (including records written before `sslMode` existed), validation status codes, password preservation |
| `test/options.test.mjs` | the `queryTimeoutMs` policy and its bounds |
| `test/format.test.mjs` | the `INSERT` and Markdown exporters and the CSV parser (quotes, embedded commas and newlines, BOM, short rows), run against the TypeScript source |
| `test/drivers.test.mjs` | the same table contract against **real** SQLite, MySQL, PostgreSQL and Redis |
| `test/api.test.mjs` | router + session pool + agent tools against a real SQLite file: paging with and without a count (`auto` estimate vs `exact`), full-table export, the binding fallback, the write gate, the engine-level read-only refusal including a script that tries to disable it, cancellation while a statement is still running, a key that is not the primary key, Redis write retry policy, and an all-or-nothing batch insert |
| `test/streaming.test.mjs` | the MySQL and SQL Server row caps against fake event emitters: the read stops at 2 000, truncation is reported, OkPackets and `rowsaffected` are distinguished from rows, errors become per-statement errors, and the MySQL fallback path |
| `test/postgres-ddl.test.mjs` | the PostgreSQL DDL composer: real types, identity vs generated columns, constraints as separate statements (deferrable clauses kept), non-constraint indexes, comments, quoted identifiers |
| `test/sqlserver-ddl.test.mjs` | the SQL Server composer: `nvarchar(100)` from `max_length` 200, `(max)` and precision/scale, identity seed/increment, computed columns, named defaults, FK actions |
| `test/describe-wiring.test.mjs` | the seam between the drivers' catalogue queries and the composers, against a fake `pg` client and a fake `mssql` pool — this is what catches a projection that drops `notNull` or `identity` |
| `test/session.test.mjs` | lane routing (which engines get a second connection), per-lane close and reap, no replay after a cancel, a handshake that finishes after close, and serial execution across a reconnect |
| `test/redis-session.test.mjs` | scoped Redis operations after a raw `SELECT`, and that Beautify preserves string contents |
| `test/sqlite-worker.test.mjs` | that SQLite queries really leave the main thread (a timer keeps ticking during a slow one, and does not on the in-process control), error status codes across the boundary, worker teardown, the fallback path |
| `test/ui.test.ts` | the real `client.js` in jsdom: booting the panel, the tree and object list, opening a table, selecting a cell (the count chip appears), in-cell editing writing back by primary key, Insert row, the row editor sending only the changed fields, the Columns menu hiding and restoring a column without a refetch, the filter builder composing a predicate, the filter debounce (three keystrokes send nothing, the pause sends one), the Export menu writing a real `INSERT` script, CSV import (a matching header posts one batch, a mismatched one posts nothing), the `≈` estimate marker, the Cancel button reaching the Host, SQL keyword highlighting, Beautify and Ctrl+Space completion |
| `test/locale.test.mjs` | the embedded dictionaries match `locale/*.json` |

`dev/` holds a local harness — fixtures plus a CDP driver — that renders the real `client.js` in
headless Edge and reports page geometry, so layout regressions are measurable without a browser
session. It is not part of the installed plugin. `--view table` opens a real table through the
toolbar (the drivers were waiting on a class from a layout that no longer exists, which is why the
view used to stop at the relations list).

`dev/audit.mjs` goes further and returns measurements rather than pixels: WCAG contrast for every
text and icon node (colours normalised through a canvas, translucent backgrounds composited up the
ancestor chain), the CIE L\* gap between adjacent surfaces, the visible difference of hover/pressed/
zebra states, pointer-target sizes and the set of font sizes in use, across every view in both
themes. Its theme stand-in in `dev/harness.html` is transcribed from the host's own theme
stylesheet on purpose — an invented palette hides exactly the defects (`bg-layer-*` collapsing to
`bg-base` in light mode) that it exists to catch.

## Layout

```
index.js              Host plugin: route, tools, session lifecycle
lib/connections.js    Registry, validation, TLS modes, AES-256-GCM
lib/errors.js         GridError + HTTP status mapping
lib/session.js        Session pool: lanes, idle expiry, queued-work fences and probes
lib/open.js           Total-deadline opener and bounded teardown shared by sessions/probes
lib/transport.js      Lazy ssh2 client, pinned host identity, leased loopback listeners
lib/drivers/network.js Guarded socket factories keep logical identity separate from dialing
lib/api.js            Action router shared by the panel and the tools
lib/query.js          Dialect helpers, statement splitter, read-only classifier
lib/tools.js          grid_* tool definitions
lib/extras.js         Saved queries and workspace bindings
lib/drivers/*.js      sqlite / mysql / postgres / sqlserver / redis adapters
lib/drivers/sqlite.js async façade over a worker thread
lib/drivers/sqlite-core.js, sqlite-worker.js
                      the synchronous `node:sqlite` work and its worker entry
lib/drivers/tls.js    certificate verification shared by the network drivers
lib/drivers/postgres-ddl.js
                      catalogue metadata -> faithful CREATE TABLE / ALTER / COMMENT text
lib/drivers/sqlserver-ddl.js
                      sys.* metadata -> the same, with SQL Server type rules
lib/drivers/options.js
                      per-connection execution policy (`queryTimeoutMs`)
src/client/           Web panel (React + TypeScript, bundled into dist/client.js)
dist/client.js        Build output loaded by the page; run `pnpm build` after editing src/
```

## Known limits

- Oracle and ODBC engines are not implemented.
- No SOCKS5 or HTTP proxy. SSH is single-hop TCP forwarding only (see above).
- No table designer (create/alter table), no schema comparison, no backup/export container.
- PostgreSQL and SQL Server sessions are bound to one database; switch it by editing the connection.
- The grid pages instead of virtualising, so it stays simple at the cost of very large scans.
- Redis key enumeration is `SCAN`-based, so a huge keyspace is paged rather than listed at once.
- No cancel on SQLite, and no cancel for an engine that refuses the side connection: the statement
  then runs to its timeout instead.
- Import is CSV only (no Excel), and the file's header must already match the table's column names.
- On engines with one connection per lane (SQLite, SQL Server) a long query still delays other
  actions on that connection.
- A `SELECT` from the console or the agent stops at 2 000 rows and says it was truncated. MySQL and
  SQL Server stream, so the rest never enters the Host's memory; PostgreSQL still materialises the
  result first, because bounding it there needs a cursor dependency.
- `node:sqlite` is synchronous, so it runs on a worker thread; in the rare environment where a worker
  cannot be started the driver falls back to in-process and a heavy query then blocks the Host.
- The structure tab's DDL covers tables only (not views, triggers or extended properties), and on
  MySQL it is `SHOW CREATE TABLE` verbatim.
