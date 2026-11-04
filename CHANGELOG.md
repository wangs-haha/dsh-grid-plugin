# Changelog

Behaviour changes that matter when upgrading. Each entry names what a user or an
integration will notice, not just what the code does. The review that drove these
changes is in [REVIEW-vs-dbx.md](REVIEW-vs-dbx.md).

## Unreleased

### Visual

- **The panel now has layers in light mode.** Surfaces, hover and zebra striping
  were painted with `bg-layer-1/2`, which the host sets to the same value as
  `bg-base` in light mode — so the tree, toolbar, tab strip and connection dialog
  were one flat white sheet and hover gave no feedback at all. Surfaces are now
  derived from the text colour mixed into the background, which holds in both
  themes. Light-mode users will see a visible chrome/table separation and real
  hover states for the first time.
- **The SQL console is readable in light mode.** Its syntax colours were hard-coded
  dark-theme hex values, so identifiers (`#e6e9ef`) were near-white on white. It
  now uses the host's `--shiki-token-*` palette, pulled 24% toward the text colour
  so strings and comments clear 4.5:1 on white as well.
- **Accent and primary action follow the host.** Accents use the chromatic
  `state-business-primary`; the primary button is the host's solid
  `button-primary-fill` with inverted text (black on white / white on dark).
- **One type scale and one control height.** Seven font sizes (9.5–12.5px) became
  11 / 12 / 13 plus 18 for the overview cards, and every ad-hoc inline
  `height: 22` / `fontSize: 10.5` in the views was replaced by the token scale.
  Nothing is below the host's 11px floor any more.
- **Secondary text passes contrast.** Row numbers, `NULL` markers, field hints and
  completion kinds moved off `label-tertiary` (3.4:1 on a light surface) to
  `label-secondary` (5.8:1).
- **State colour no longer carries text.** Banners, error blocks and toasts keep
  the state in the icon and a left rule over a soft tint, instead of colouring the
  message itself, which could not hold 4.5:1 in both themes.

### Fixed

- **The SQL result area scrolls inside the panel** (`.dg-results` was referenced
  but never defined, so a large result set overflowed instead of scrolling).
- **The structure view no longer clips its Default column**; the three panes are
  no longer equal thirds, and the field table uses a fixed layout with declared
  column widths.
- **The connection dialog fits a narrow panel** (`max-width: 100%`), its workspace
  binding rows put the actions on their own line, and its duplicated section
  headings were replaced by `Identity` / `Server`.
- **Tabs are keyboard reachable.** The close control is a real button (it used to
  be a `span` nested inside a `button`, both invalid and unfocusable) with a 24px
  hit area, and arrow keys move between tabs.
- **The primary-key mark is an SVG.** It was `⚿`, a codepoint no UI font covers,
  so it rendered as a tofu box.
- **`dev/harness.html` uses the host's real tokens**, so previews no longer hide
  light-mode defects.
- **`dev/cdp-shot.mjs` leaves no browser behind**: it now kills the process tree
  and uses a throwaway profile (a shared profile made the next run silently fail
  with "no debugging target").

### Added

- `dev/audit.mjs` (`pnpm audit:ui`): measures contrast, surface separation,
  interaction feedback, target sizes and font sizes across seven views in both
  themes, in headless Edge. All 14 combinations are currently clean.

## 0.5.0

### Breaking / behaviour changes

- **TLS now verifies the server certificate.** `ssl: true` used to mean "encrypt
  but accept any certificate"; it now means `verify-full`. A connection to a host
  behind a self-signed certificate will start failing until you set
  `sslMode: 'require'` on it. The connection form exposes the four modes
  (`disable` / `require` / `verify-ca` / `verify-full`), and `options.sslCa`
  accepts a PEM string for a private CA. Records written before this version are
  read back as `verify-full`, which is also how they connect.
- **Writes are no longer retried after a dropped socket.** A committed `INSERT`
  replayed on reconnect was a double write. Only all-reads scripts keep the
  single retry.
- **`grid_query` is enforced by the engine, not only by the classifier.**
  PostgreSQL runs it in `BEGIN READ ONLY`, MySQL in `START TRANSACTION READ ONLY`,
  SQLite sets `PRAGMA query_only`. SQL Server has no equivalent, so there the
  classifier and the login's permissions remain the boundary.
- **`export` returns what it says.** It used to hand a 10 000-row page size to a
  driver that caps pages at 1 000, so a 5 000-row table exported 1 000 rows and
  reported `truncated: false`. It now walks pages and reports truncation
  accurately, which means an export can return more rows than before.
- **`rows` response shape.** `total` can now be `null` (when the caller asked for
  no count) and there is a new `totalKind: 'exact' | 'estimate' | 'none'`. A new
  `total` request field (`auto` | `exact` | `none`) selects the behaviour; the old
  `count: boolean` still works.
- **`redis.delete` takes the database index.** A Redis session is shared, and the
  index a key was listed from is not necessarily the one the session last
  selected; deleting without it could remove a same-named key from another
  database. The panel now always sends it.
- **Errors carry their status.** Validation failures used to surface as HTTP 500;
  they are 400 (and "connection not found" is 404), so a client can tell a typo
  from a fault.
- **SQLite runs on a worker thread.** A heavy SQLite query no longer blocks the
  Host process. If a worker cannot be started the driver falls back to in-process
  execution.
- **Two sessions per connection.** The object tree, paging and the structure view
  use one connection; typed SQL and exports use a second one, so a slow report no
  longer freezes the panel. SQLite and SQL Server keep a single connection
  (synchronous driver, and `mssql` already pools). `connections.sessions` now
  reports a `lane` per entry.
- **Node 22.13 or newer is required** (`engines` field). SQLite uses the built-in
  `node:sqlite`, which only stopped needing `--experimental-sqlite` at 22.13.
- **`allowWrites` still gates only the agent's `grid_execute`.** The panel has
  always let the person at the keyboard edit rows; that is now stated in the
  README instead of implied.

### Added

- `sql.cancel` — cancels the statement the query connection is running
  (PostgreSQL `pg_cancel_backend`, MySQL `KILL QUERY`, SQL Server request cancel;
  SQLite and Redis report that they cannot). A Cancel button appears in the SQL
  console while a script runs, and an aborted `grid_query` call (a timeout or the
  user stopping it) cancels on the server instead of merely giving up.
- `rows.insertMany` — a batch insert in one transaction, used by CSV import.
- `rows.insert` with no values inserts a row of column defaults ("Insert row").
- CSV import (header must match the table's columns; a stray column is refused),
  and Export as `INSERT` statements or a Markdown table.
- A Columns menu (hide/show without refetching) and a row editor on the
  row-number cell (edits every field at once, writes back only what changed).
- PostgreSQL and SQL Server DDL is assembled from the real catalogue: identity and
  generated columns, constraints as separate `ALTER TABLE` statements, indexes and
  comments. Views show their own definition instead of a synthesised
  `CREATE TABLE`.
- MySQL and SQL Server stream results, so a `SELECT` from a large table stops at
  2 000 rows without materialising the rest; the console says when a result was
  capped. PostgreSQL still materialises.
- `options.queryTimeoutMs` (default 30 000) becomes `statement_timeout` on
  PostgreSQL, `MAX_EXECUTION_TIME` / `max_statement_time` on MySQL and MariaDB,
  `requestTimeout` on SQL Server and `commandTimeout` on Redis.

### Fixed

- The grid's row total is the engine's estimate (`≈`) for an unfiltered table and
  an exact count when filtered or refreshed, instead of a full `COUNT(*)` on every
  page turn.
- Filter input is debounced and superseded requests are aborted, so typing no
  longer sends one query per keystroke.
- The selection chip shows its count (the label had no `{n}` placeholder).
- `SQLite` reads big integers (the default threw `ERR_OUT_OF_RANGE` on a 64-bit
  id) and sets a 5 s busy timeout.
- Column types are names, not driver codes (`253`, OID `23`), and numeric columns
  right-align.
- SQL Server no longer loses every column header on an empty page.
- The grid's toolbar and the panel's main toolbar wrap instead of clipping their buttons on a narrow
  panel. The README used to describe a responsive layout (brand hidden below 1120 px, and so on) that
  was never implemented; it now states what actually happens, with measurements.
- README no longer claims a row-detail drawer it did not have; it has a row
  editor, and the README says so.
- The `dev/` harness drives the current markup again (`--view table` used to stop at the relations
  list because it waited for a class from an older layout).

### Internal

- `pnpm typecheck` now also checks `test/**/*.ts` through `tsconfig.test.json`
  (new devDependencies `@types/node`, `@types/jsdom`).
- `pnpm test` builds first: the UI test loads `dist/client.js`, so testing without
  building silently checked the previous bundle.
- UI tests cover in-cell editing, Insert row, the row editor, the Columns menu, the
  filter builder, the debounce, export, import, the estimate marker, Cancel,
  highlighting, Beautify and completion.
- `GridError` moved to `lib/errors.js`; duplicate `accounts()` methods and dead
  helpers (`literal`, `findByName`, `quoteValue`, `toBindValue`) and the unused
  `Backup` type / backups locale keys are gone.

### Upgrading

1. Restart the Host (or reload the plugin) — the Host half changed.
2. Refresh the page — the panel bundle changed.
3. For every connection with `ssl: true` behind a self-signed certificate, set
   `sslMode: 'require'`; otherwise it will report a certificate error.
4. If you polled the panel's HTTP route yourself, check `rows` (`total` may be
   `null`, `totalKind` is new) and `redis.delete` (send `database`).
