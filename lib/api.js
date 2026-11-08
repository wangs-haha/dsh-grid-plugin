/**
 * The action router.
 *
 * Both transports call this module: the browser over `POST /api/grid`, and the
 * Agent through the `grid_*` tools. Keeping one implementation means a table
 * the user opened and a table the model inspects behave identically.
 */

import {
  createConnection,
  deleteConnection,
  getRecord,
  listConnections,
  normalizeConnection,
  openSecret,
  revealPassword,
  updateConnection,
} from './connections.js'
import { engineAvailability } from './drivers/index.js'
import { GridError } from './errors.js'
import { SavedQueries, WorkspaceBindingStore } from './extras.js'
import { isReadOnly, splitStatements } from './query.js'
import { isDisconnectError, testConnection } from './session.js'

export { GridError } from './errors.js'

/** Largest script accepted in one request. */
const MAX_SCRIPT_BYTES = 1_000_000

/** Largest number of statements run from one request. */
const MAX_STATEMENTS = 100

/** Largest number of rows returned by the export action. */
const EXPORT_LIMIT = 10_000

/** Rows per driver call while collecting an export. */
const EXPORT_CHUNK = 1_000

/** Largest accepted length of an ad-hoc filter expression. */
const MAX_WHERE = 4_000

/** Largest number of rows accepted by one import request. */
const MAX_IMPORT_ROWS = 5_000

/**
 * Require a non-empty string field.
 * @param {unknown} value - candidate value.
 * @param {string} field - field name used in the message.
 * @returns {string} the trimmed value.
 */
function required(value, field) {
  const text = String(value ?? '').trim()
  if (!text) throw new GridError(`${field} is required`)
  return text
}

/**
 * Clamp an integer payload field.
 * @param {unknown} value - candidate value.
 * @param {number} fallback - value used when absent or invalid.
 * @param {number} min - lower bound.
 * @param {number} max - upper bound.
 * @returns {number} the bounded integer.
 */
function int(value, fallback, min, max) {
  const parsed = Number.parseInt(String(value ?? ''), 10)
  if (!Number.isFinite(parsed)) return fallback
  return Math.max(min, Math.min(max, parsed))
}

/**
 * Read the scope fields shared by table actions.
 * @param {object} payload - request payload.
 * @returns {{ connectionId: string, database: string, schema: string, table: string }} the scope.
 */
function tableScope(payload) {
  return {
    connectionId: required(payload.connectionId, 'connectionId'),
    database: String(payload.database ?? '').trim(),
    schema: String(payload.schema ?? '').trim(),
    table: required(payload.table, 'table'),
  }
}

/**
 * Build the router.
 * @param {{ pool: import('./session.js').SessionPool, log?: (message: string) => void,
 *   allowWrites?: boolean }} options - router dependencies.
 * @returns {(action: string, payload: object) => Promise<object>} the dispatch function.
 */
export function createRouter(options) {
  const { pool, allowWrites = false, listWorkspaces } = options
  const log = options.log ?? (() => {})
  const queries = new SavedQueries()
  const project = new WorkspaceBindingStore()
  /**
   * Primary-key layout per table scope, so a row write can be checked without a
   * catalogue query on every click.
   * @type {Map<string, { columns: string[], at: number }>}
   */
  const keyLayouts = new Map()
  const KEY_LAYOUT_TTL_MS = 30_000

  /**
   * Read the primary-key columns of one table.
   * @param {object} session - open session.
   * @param {object} scope - table scope.
   * @returns {Promise<string[]>} the primary-key columns, in table order.
   */
  async function primaryKeyOf(session, scope) {
    const cacheKey = `${session.id}\u0000${scope.database}\u0000${scope.schema}\u0000${scope.table}`
    const cached = keyLayouts.get(cacheKey)
    if (cached && Date.now() - cached.at < KEY_LAYOUT_TTL_MS) return cached.columns
    const described = await session.driver.describe(scope)
    const columns = (described?.columns ?? []).filter((column) => column.primaryKey).map((column) => column.name)
    keyLayouts.set(cacheKey, { columns, at: Date.now() })
    return columns
  }

  /**
   * Refuse a row write whose key is not exactly the table's primary key.
   *
   * The panel is not the only caller: an Agent or a future client can post any
   * key object. Without this check a non-unique column in `key` turns one
   * update into a full-table rewrite.
   * @param {object} session - open session.
   * @param {object} scope - table scope.
   * @param {Record<string, unknown>} key - the supplied key.
   * @returns {Promise<void>} resolves when the key is safe to use.
   */
  async function assertPrimaryKey(session, scope, key) {
    const expected = await primaryKeyOf(session, scope)
    if (expected.length === 0) {
      throw new GridError('this table has no primary key, so a row cannot be located')
    }
    const actual = Object.keys(key ?? {})
    const same = expected.length === actual.length && expected.every((name) => actual.includes(name))
    if (!same) {
      throw new GridError('the row key does not match the table primary key')
    }
  }

  /**
   * Run one table action against a session.
   * @param {object} payload - request payload.
   * @param {(session: object, scope: object) => Promise<object>} operation - the work.
   * @param {{ retry?: boolean, lane?: 'main'|'query' }} [options] - retry control and session lane.
   * @returns {Promise<object>} the operation result.
   */
  const withTable = (payload, operation, options) => {
    const scope = tableScope(payload)
    return pool.withSession(scope.connectionId, (session) => operation(session, scope), options)
  }

  /** @type {Record<string, (payload: object) => Promise<object>>} */
  const actions = {
    /**
     * Capability summary for the browser.
     * @returns {Promise<object>} engines, version and write policy.
     */
    async meta() {
      const bindings = project.list().map((binding) => {
        const record = getRecord(binding.connectionId)
        return { ...binding, connectionName: record ? record.name : '' }
      })
      return {
        engines: await engineAvailability(),
        allowWrites,
        bindings,
        workspaces: typeof listWorkspaces === 'function' ? listWorkspaces() : [],
      }
    },

    /** @returns {Promise<object>} every stored connection, without secrets. */
    async 'connections.list'() {
      return { connections: listConnections() }
    },

    /**
     * Create a connection and report whether it works right away.
     * @param {object} payload - `{ connection }`.
     * @returns {Promise<object>} the new connection plus a probe result.
     */
    async 'connections.create'(payload) {
      const connection = createConnection(payload.connection ?? payload)
      const probeResult = await probe(connection.id).catch((error) => ({
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      }))
      return { connection, probe: probeResult }
    },

    /**
     * Update a connection; its open session is closed so the next use reconnects
     * with the new settings.
     * @param {object} payload - `{ id, patch }`.
     * @returns {Promise<object>} the updated connection.
     */
    async 'connections.update'(payload) {
      const id = required(payload.id ?? payload.connectionId, 'id')
      const connection = updateConnection(id, payload.patch ?? payload.connection ?? {})
      keyLayouts.clear()
      await pool.close(id)
      return { connection }
    },

    /**
     * Delete a connection and close its session.
     * @param {object} payload - `{ id }`.
     * @returns {Promise<object>} `{ deleted }`.
     */
    async 'connections.delete'(payload) {
      const id = required(payload.id ?? payload.connectionId, 'id')
      keyLayouts.clear()
      await pool.close(id)
      return { deleted: deleteConnection(id) }
    },

    /**
     * Probe a stored connection, or an unsaved set of fields.
     * @param {object} payload - `{ id }` or `{ connection }`.
     * @returns {Promise<object>} `{ ok, latencyMs, serverVersion }`.
     */
    async 'connections.test'(payload) {
      if (payload.id && !payload.connection) return { ...(await probe(String(payload.id))), id: payload.id }
      const fields = { ...(payload.connection ?? payload) }
      if (!fields.password && payload.id) fields.password = revealPassword(payload.id)
      const normalized = normalizeConnection(fields)
      normalized.password = fields.password ?? ''
      return probeFields(normalized)
    },

    /**
     * Open a session explicitly.
     * @param {object} payload - `{ id }`.
     * @returns {Promise<object>} `{ ok, serverVersion, engine }`.
     */
    async 'connections.connect'(payload) {
      const id = required(payload.id ?? payload.connectionId, 'id')
      const session = await pool.acquire(id)
      return { ok: true, serverVersion: session.version, engine: session.engine }
    },

    /**
     * Close the session of one connection.
     * @param {object} payload - `{ id }`.
     * @returns {Promise<object>} `{ ok, wasOpen }`.
     */
    async 'connections.disconnect'(payload) {
      const id = required(payload.id ?? payload.connectionId, 'id')
      const wasOpen = await pool.close(id)
      return { ok: true, wasOpen }
    },

    /**
     * Report which sessions are open right now.
     * @returns {Promise<object>} `{ sessions }`.
     */
    async 'connections.sessions'() {
      return { sessions: pool.listOpen() }
    },

    /**
     * List databases (and, for PostgreSQL and SQL Server, their schemas).
     * @param {object} payload - `{ connectionId }`.
     * @returns {Promise<object>} `{ databases }`.
     */
    async databases(payload) {
      const connectionId = required(payload.connectionId, 'connectionId')
      return pool.withSession(connectionId, async (session) => ({
        databases: await session.driver.databases(),
      }))
    },

    /**
     * List tables and views of one database/schema.
     * @param {object} payload - `{ connectionId, database, schema }`.
     * @returns {Promise<object>} `{ tables }`.
     */
    async tables(payload) {
      const connectionId = required(payload.connectionId, 'connectionId')
      const scope = { database: String(payload.database ?? ''), schema: String(payload.schema ?? '') }
      return pool.withSession(connectionId, async (session) => ({
        tables: await session.driver.tables(scope),
      }))
    },

    /**
     * Describe a table: columns, indexes and DDL.
     * @param {object} payload - table scope.
     * @returns {Promise<object>} `{ columns, indexes, ddl }`.
     */
    async columns(payload) {
      return withTable(payload, async (session, scope) => session.driver.describe(scope))
    },

    /**
     * Read one page of a table.
     *
     * `total` decides how the row count is obtained. `auto` (the default) takes
     * the engine's own estimate when the request is unfiltered — a `COUNT(*)` on
     * a large table costs more than the page itself — and counts exactly
     * otherwise. `exact` always counts; `none` never does.
     * @param {object} payload - table scope plus paging.
     * @returns {Promise<object>} `{ columns, rows, total, totalKind, durationMs, page, pageSize }`.
     */
    async rows(payload) {
      const page = int(payload.page, 1, 1, 1_000_000)
      const pageSize = int(payload.pageSize, 100, 1, 1000)
      const mode =
        payload.total === 'exact' ? 'exact' : payload.count === false || payload.total === 'none' ? 'none' : 'auto'
      const where = String(payload.where ?? '').trim().slice(0, MAX_WHERE)
      const orderBy = String(payload.orderBy ?? '').trim().slice(0, 128)
      const orderDir = String(payload.orderDir ?? '').toLowerCase() === 'desc' ? 'desc' : 'asc'

      // A filter makes every catalogue estimate meaningless, so only an
      // unfiltered request is allowed to use one.
      let estimate = null
      if (mode === 'auto' && !where) {
        estimate = await withTable(payload, async (session, scope) => {
          if (typeof session.driver.estimateRows !== 'function') return null
          try {
            return await session.driver.estimateRows(scope)
          } catch {
            return null
          }
        })
      }
      const count = mode === 'exact' || (mode === 'auto' && typeof estimate !== 'number')
      const result = await withTable(payload, async (session, scope) =>
        session.driver.select({ ...scope, page, pageSize, where, orderBy, orderDir, count }),
      )
      const total = count ? result.total : mode === 'none' ? null : estimate
      return {
        ...result,
        total,
        totalKind: mode === 'none' ? 'none' : count ? 'exact' : 'estimate',
        page,
        pageSize,
      }
    },

    /**
     * Update one row addressed by primary key.
     * @param {object} payload - `{ ...scope, key, changes }`.
     * @returns {Promise<object>} `{ affected }`.
     */
    async 'rows.update'(payload) {
      if (!payload.key || typeof payload.key !== 'object' || Object.keys(payload.key).length === 0) {
        throw new GridError('this table has no primary key, so a row cannot be located')
      }
      if (!payload.changes || typeof payload.changes !== 'object' || Object.keys(payload.changes).length === 0) {
        throw new GridError('no columns to update')
      }
      const result = await withTable(
        payload,
        async (session, scope) => {
          await assertPrimaryKey(session, scope, payload.key)
          return session.driver.update({ ...scope, key: payload.key, changes: payload.changes })
        },
        { retry: false },
      )
      if (result.affected === 0) throw new GridError('the row was changed or removed by someone else', 409)
      if (result.affected > 1) {
        throw new GridError('the update matched more than one row; the primary key returned duplicate rows', 409)
      }
      return result
    },

    /**
     * Insert one row.
     * @param {object} payload - `{ ...scope, values }`.
     * @returns {Promise<object>} `{ affected, lastInsertId? }`.
     */
    async 'rows.insert'(payload) {
      if (!payload.values || typeof payload.values !== 'object') throw new GridError('values are required')
      return withTable(
        payload,
        async (session, scope) => session.driver.insert({ ...scope, values: payload.values }),
        { retry: false },
      )
    },

    /**
     * Insert many rows in one transaction.
     *
     * Used by the CSV import: either the whole batch lands or nothing does, so a
     * bad row in the middle cannot leave half a file behind.
     * @param {object} payload - `{ ...scope, rows }`.
     * @returns {Promise<object>} `{ inserted }`.
     */
    async 'rows.insertMany'(payload) {
      const rows = Array.isArray(payload.rows) ? payload.rows : []
      if (rows.length === 0) throw new GridError('rows are required')
      if (rows.length > MAX_IMPORT_ROWS) {
        throw new GridError(`at most ${MAX_IMPORT_ROWS} rows can be inserted in one request`, 413)
      }
      rows.forEach((row, index) => {
        if (!row || typeof row !== 'object' || Array.isArray(row)) {
          throw new GridError(`row ${index + 1} is not an object`)
        }
        if (Object.keys(row).length === 0) throw new GridError(`row ${index + 1} has no columns`)
        for (const [column, value] of Object.entries(row)) {
          if (value === undefined || (value !== null && typeof value === 'object')) {
            throw new GridError(`row ${index + 1}, column "${column}": only plain values can be inserted`)
          }
        }
      })
      return withTable(
        payload,
        async (session, scope) => session.driver.insertMany({ ...scope, rows }),
        { retry: false },
      )
    },

    /**
     * Delete one row addressed by primary key.
     * @param {object} payload - `{ ...scope, key }`.
     * @returns {Promise<object>} `{ affected }`.
     */
    async 'rows.delete'(payload) {
      if (!payload.key || typeof payload.key !== 'object' || Object.keys(payload.key).length === 0) {
        throw new GridError('this table has no primary key, so a row cannot be located')
      }
      const result = await withTable(
        payload,
        async (session, scope) => {
          await assertPrimaryKey(session, scope, payload.key)
          return session.driver.remove({ ...scope, key: payload.key })
        },
        { retry: false },
      )
      if (result.affected === 0) throw new GridError('the row was already removed', 409)
      if (result.affected > 1) {
        throw new GridError('the delete matched more than one row; the primary key returned duplicate rows', 409)
      }
      return result
    },

    /**
     * Cancel whichever statement the query lane is running.
     *
     * SQL runs on its own connection (see `SessionPool`), so this reaches the
     * right backend without disturbing the object tree. Engines that cannot
     * interrupt a statement say so instead of pretending.
     * @param {object} payload - `{ connectionId }`.
     * @returns {Promise<object>} `{ cancelled, reason? }`.
     */
    async 'sql.cancel'(payload) {
      const connectionId = required(payload.connectionId, 'connectionId')
      if (typeof pool.cancel !== 'function') {
        return { cancelled: false, reason: 'this session pool cannot cancel a running statement' }
      }
      // Deliberately not `withSession`: that queue is what the running
      // statement occupies, so a cancel routed through it would wait for the
      // query it is meant to stop.
      return pool.cancel(connectionId, 'query')
    },

    /**
     * Read up to `EXPORT_LIMIT` rows of a table for a file download.
     *
     * The page size of a normal grid read is capped at 1000 by every driver, so
     * an export cannot reuse `select` with a large page: it walks pages instead
     * and reports truncation from what it actually collected.
     * @param {object} payload - table scope plus ordering.
     * @returns {Promise<object>} `{ columns, rows, truncated, total }`.
     */
    async export(payload) {
      const where = String(payload.where ?? '').trim().slice(0, MAX_WHERE)
      const orderBy = String(payload.orderBy ?? '').trim().slice(0, 128)
      const orderDir = String(payload.orderDir ?? '').toLowerCase() === 'desc' ? 'desc' : 'asc'
      /** @type {object[]} */
      const rows = []
      /** @type {object[]} */
      let columns = []
      let total = 0
      for (let page = 1; rows.length < EXPORT_LIMIT; page += 1) {
        const want = Math.min(EXPORT_CHUNK, EXPORT_LIMIT - rows.length)
        const chunk = await withTable(
          payload,
          async (session, scope) =>
            session.driver.select({ ...scope, page, pageSize: want, where, orderBy, orderDir, count: page === 1 }),
          // Up to ten reads: keep them off the workbench lane so the tree stays live.
          { lane: 'query' },
        )
        columns = chunk.columns ?? columns
        total = typeof chunk.total === 'number' ? chunk.total : total
        if (chunk.rows.length === 0) break
        rows.push(...chunk.rows)
        if (chunk.rows.length < want) break
        if (Number.isFinite(chunk.total) && rows.length >= chunk.total) break
      }
      return {
        columns,
        rows,
        // Hitting the limit is not the same as losing rows: a table of exactly
        // `EXPORT_LIMIT` rows is complete, and the count tells them apart.
        truncated: rows.length >= EXPORT_LIMIT && (Number.isFinite(total) ? total > rows.length : true),
        total,
      }
    },

    /**
     * Execute a script, returning one result per statement.
     * @param {object} payload - `{ connectionId, database, sql, readOnly? }`.
     * @returns {Promise<object>} `{ results, durationMs, statementCount }`.
     */
    async sql(payload) {
      const connectionId = required(payload.connectionId, 'connectionId')
      const script = String(payload.sql ?? '')
      if (!script.trim()) throw new GridError('enter a SQL statement')
      if (Buffer.byteLength(script, 'utf8') > MAX_SCRIPT_BYTES) throw new GridError('the script is too large', 413)
      const statements = splitStatements(script)
      if (statements.length === 0) throw new GridError('enter a SQL statement')
      if (statements.length > MAX_STATEMENTS) {
        throw new GridError(`a script may contain at most ${MAX_STATEMENTS} statements`, 413)
      }
      if (payload.readOnly === true) {
        const write = statements.find((statement) => !isReadOnly(statement))
        if (write) throw new GridError('this tool is read-only; the statement would modify data', 403)
      }
      const database = String(payload.database ?? '').trim()
      // A script that already ran its INSERT must not be replayed after a dropped
      // socket; only an all-reads script is safe to retry once.
      const retry = statements.every((statement) => isReadOnly(statement))
      // `readOnly` is handed to the driver, which asks the engine itself to
      // refuse writes (a read-only transaction, or `query_only` on SQLite). The
      // classifier above rejects obvious writes before the round trip; this is
      // the layer that catches what it cannot see.
      const readOnly = payload.readOnly === true
      const result = await pool.withSession(
        connectionId,
        async (session) => {
          if (session.engine === 'mysql' && database) {
            // MySQL scopes a schema to the session, so a query tab pointed at one
            // database needs an explicit USE. PostgreSQL and SQL Server are bound
            // to their database at connect time, so nothing to switch here.
            await session.driver.handle().query(`USE ${quoteIdentifier(session.engine, database)}`)
          }
          return session.driver.exec(statements, { readOnly })
        },
        // Typed SQL runs on its own connection, so a slow report does not hold the
        // object tree, paging or the structure view behind it.
        { retry, lane: 'query' },
      )
      // A script may have changed a table's columns, so the cached primary-key
      // layout is no longer trustworthy.
      keyLayouts.clear()
      return { ...result, statementCount: statements.length }
    },
  }

  /** Redis actions live in their own table so the SQL path stays type-safe. */
  const redisActions = {
    /**
     * List logical Redis databases.
     * @param {object} payload - `{ connectionId }`.
     * @returns {Promise<object>} `{ databases }`.
     */
    async 'redis.databases'(payload) {
      const connectionId = required(payload.connectionId, 'connectionId')
      return pool.withSession(connectionId, async (session) => ({
        databases: await session.driver.databases(),
      }))
    },

    /**
     * Scan one page of keys.
     * @param {object} payload - `{ connectionId, cursor, pattern, type, database }`.
     * @returns {Promise<object>} `{ cursor, keys }`.
     */
    async 'redis.scan'(payload) {
      const connectionId = required(payload.connectionId, 'connectionId')
      const request = {
        cursor: String(payload.cursor ?? '0'),
        pattern: String(payload.pattern ?? '').trim().slice(0, 512),
        type: String(payload.type ?? '').trim(),
        database: payload.database === undefined || payload.database === '' ? undefined : int(payload.database, 0, 0, 255),
      }
      return pool.withSession(connectionId, async (session) => session.driver.scan(request))
    },

    /**
     * Read one key.
     * @param {object} payload - `{ connectionId, key, database }`.
     * @returns {Promise<object>} the key view.
     */
    async 'redis.key'(payload) {
      const connectionId = required(payload.connectionId, 'connectionId')
      const key = required(payload.key, 'key')
      return pool.withSession(connectionId, async (session) =>
        session.driver.inspectKey({
          key,
          database: payload.database === '' || payload.database === undefined ? undefined : int(payload.database, 0, 0, 255),
        }),
      )
    },

    /**
     * Run a raw Redis command.
     * @param {object} payload - `{ connectionId, command }`.
     * @returns {Promise<object>} the reply.
     */
    async 'redis.command'(payload) {
      const connectionId = required(payload.connectionId, 'connectionId')
      const command = required(payload.command, 'command')
      // Raw commands are not necessarily idempotent (`INCR`, `LPUSH`, `SET`).
      // Replaying one after a dropped reply can apply it twice.
      return pool.withSession(
        connectionId,
        async (session) => session.driver.command({ command }),
        { retry: false },
      )
    },

    /**
     * Delete one key.
     *
     * The database index is mandatory: a Redis session is shared, and the index
     * a key was listed from is not necessarily the one the session last selected.
     * @param {object} payload - `{ connectionId, key, database }`.
     * @returns {Promise<object>} `{ deleted, database }`.
     */
    async 'redis.delete'(payload) {
      const connectionId = required(payload.connectionId, 'connectionId')
      const key = required(payload.key, 'key')
      const database = int(payload.database, 0, 0, 255)
      // `DEL` is a write: a retry after a lost reply can remove a key that was
      // recreated in the meantime.
      return pool.withSession(
        connectionId,
        async (session) => ({
          ...(await session.driver.removeKey({ key, database })),
          database,
        }),
        { retry: false },
      )
    },
  }

  /** Actions added beside the query path: routines, accounts, queries, backups, binding. */
  const extraActions = {
    /** @returns {Promise<object>} routines of one scope. */
    async routines(payload) {
      const connectionId = required(payload.connectionId, 'connectionId')
      const scope = { database: String(payload.database ?? ''), schema: String(payload.schema ?? '') }
      return pool.withSession(connectionId, async (session) => ({ routines: await session.driver.routines(scope) }))
    },

    /** @returns {Promise<object>} accounts visible to the connection. */
    async accounts(payload) {
      const connectionId = required(payload.connectionId, 'connectionId')
      return pool.withSession(connectionId, async (session) => ({ accounts: await session.driver.accounts() }))
    },

    /** @returns {Promise<object>} saved queries. */
    async 'queries.list'() {
      return { queries: queries.list() }
    },

    /** Save or update a query. */
    async 'queries.save'(payload) {
      return { query: queries.save(payload) }
    },

    /** Delete a saved query. */
    async 'queries.delete'(payload) {
      return { deleted: queries.remove(required(payload.id, 'id')) }
    },

    /** Bind one workspace to a connection and database. */
    async 'projects.bind'(payload) {
      const binding = project.bind({
        workspaceId: required(payload.workspaceId, 'workspaceId'),
        workspacePath: String(payload.workspacePath ?? ''),
        connectionId: required(payload.connectionId, 'connectionId'),
        database: String(payload.database ?? ''),
      })
      const record = getRecord(binding.connectionId)
      return { binding: { ...binding, connectionName: record ? record.name : '' } }
    },

    /** Remove the binding of one workspace. */
    async 'projects.unbind'(payload) {
      return { ok: project.unbind(required(payload.workspaceId, 'workspaceId')) }
    },
  }
  /**
   * Quote an identifier for a `USE` / `SET search_path` statement.
   * @param {string} engine - engine key.
   * @param {string} name - identifier.
   * @returns {string} the quoted identifier.
   */
  function quoteIdentifier(engine, name) {
    const source = String(name ?? '')
    if (engine === 'mysql') return `\`${source.replace(/`/g, '``')}\``
    return `"${source.replace(/"/g, '""')}"`
  }

  /**
   * Probe a stored connection without keeping the session.
   * @param {string} id - connection id.
   * @returns {Promise<{ ok: boolean, latencyMs: number, serverVersion: string }>}
   */
  async function probe(id) {
    const record = getRecord(id)
    if (!record) throw new GridError('connection not found', 404)
    return testConnection({ ...record, password: openSecret(record.secret) })
  }

  /**
   * Probe ad-hoc connection fields.
   * @param {object} fields - normalized connection plus `password`.
   * @returns {Promise<{ ok: boolean, latencyMs: number, serverVersion: string }>}
   */
  async function probeFields(fields) {
    return testConnection(fields)
  }

  /**
   * Dispatch one action.
   * @param {string} action - action name.
   * @param {object} payload - request payload.
   * @returns {Promise<object>} the action result.
   */
  return async function dispatch(action, payload) {
    const name = String(action ?? '')
    const handler = actions[name] || redisActions[name] || extraActions[name]
    if (!handler) throw new GridError(`unknown action: ${name || '(none)'}`, 404)
    const body = payload && typeof payload === 'object' ? payload : {}
    try {
      return await handler(body)
    } catch (error) {
      if (error instanceof GridError) throw error
      if (isDisconnectError(error)) {
        throw new GridError(
          `the database connection was lost: ${error instanceof Error ? error.message : String(error)}`,
          503,
        )
      }
      throw error
    }
  }
}


