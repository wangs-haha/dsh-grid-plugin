/**
 * SQLite work, in-process.
 *
 * `node:sqlite` is synchronous: every call holds the thread until it returns.
 * That is why this class is not used from the Host directly — it runs inside the
 * worker started by `sqlite.js`, so a slow query cannot freeze the whole DSH
 * process. The one other caller is the fallback used when a worker cannot be
 * started at all.
 */

import { DatabaseSync } from 'node:sqlite'
import { limitClause, orderByClause, qualify, quoteIdent, toJsonRow, toJsonValue } from '../query.js'
import { GridError } from '../errors.js'

/** Row cap for one `exec` result set, keeping a runaway query off the wire. */
const MAX_ROWS = 2000

/**
 * Turn one SQLite column declaration into a short type label.
 * @param {{ type?: string }} column - a `columns()` entry.
 * @returns {string} the declared type, uppercased, or '' when untyped.
 */
function sqliteType(column) {
  return String(column?.type ?? '').toUpperCase()
}

export class SqliteCore {
  /**
   * @param {object} connection - normalized connection record.
   */
  constructor(connection) {
    this.connection = connection
    this.engine = 'sqlite'
    /** @type {DatabaseSync|null} */
    this.db = null
    this.version = ''
  }

  /**
   * Open the database file.
   * @returns {Promise<string>} the SQLite library version.
   */
  async open() {
    const file = this.connection.file
    if (!file) throw new GridError('a SQLite connection needs a database file path')
    this.db = new DatabaseSync(file, {
      readOnly: false,
      enableForeignKeyConstraints: true,
      // Integers outside the safe range (epoch milliseconds, snowflake ids) make
      // a plain read throw ERR_OUT_OF_RANGE; bigints are handled downstream.
      readBigInts: true,
      // Without a busy timeout any concurrent writer fails instantly with
      // SQLITE_BUSY instead of waiting for the lock.
      timeout: 5_000,
    })
    // A missing file is created by `DatabaseSync`; report the version so the
    // caller can stamp the session.
    const row = this.db.prepare('SELECT sqlite_version() AS version').get()
    this.version = `SQLite ${row?.version ?? ''}`.trim()
    return this.version
  }

  /** @returns {Promise<void>} resolves after the handle is closed. */
  async close() {
    if (this.db) {
      this.db.close()
      this.db = null
    }
  }

  /** @returns {DatabaseSync} the open handle. */
  handle() {
    if (!this.db) throw new Error('the SQLite database is not open')
    return this.db
  }

  /** @returns {Promise<string>} the server version string. */
  async serverVersion() {
    return this.version
  }

  /**
   * List attached databases.
   * @returns {Promise<Array<{ name: string, schemas: string[], file?: string }>>}
   */
  async databases() {
    const rows = this.handle().prepare('PRAGMA database_list').all()
    return rows.map((row) => ({ name: String(row.name), schemas: [], file: String(row.file ?? '') }))
  }

  /**
   * List tables and views of one database.
   * @param {{ database?: string }} scope - ignored beyond the default schema.
   * @returns {Promise<Array<{ name: string, kind: string, rows: number|null }>>}
   */
  async tables(scope = {}) {
    const db = quoteIdent('sqlite', scope.database || 'main')
    const rows = this.handle()
      .prepare(
        `SELECT name, type FROM ${db}.sqlite_master
         WHERE type IN ('table', 'view') AND name NOT LIKE 'sqlite_%'
         ORDER BY type, name`,
      )
      .all()
    return rows.map((row) => ({
      name: String(row.name),
      kind: String(row.type) === 'view' ? 'view' : 'table',
      rows: null,
      comment: '',
    }))
  }

  /**
   * Describe one table: columns, indexes and its DDL.
   * @param {{ database?: string, table: string }} scope - target table.
   * @returns {Promise<{ columns: object[], indexes: object[], ddl: string }>}
   */
  async describe(scope) {
    const handle = this.handle()
    const db = quoteIdent('sqlite', scope.database || 'main')
    const table = quoteIdent('sqlite', scope.table)
    const info = handle.prepare(`PRAGMA ${db}.table_info(${table})`).all()
    const columns = info.map((row) => ({
      name: String(row.name),
      type: sqliteType({ type: row.type }),
      nullable: Number(row.notnull) === 0 && Number(row.pk) === 0,
      defaultValue: row.dflt_value === null || row.dflt_value === undefined ? null : String(row.dflt_value),
      primaryKey: Number(row.pk) > 0,
      ordinal: Number(row.cid),
      comment: '',
      extra: Number(row.pk) > 0 ? `pk#${row.pk}` : '',
    }))

    /** @type {object[]} */
    const indexes = []
    try {
      for (const entry of handle.prepare(`PRAGMA ${db}.index_list(${table})`).all()) {
        const name = String(entry.name)
        const columnsOfIndex = handle
          .prepare(`PRAGMA ${db}.index_info(${quoteIdent('sqlite', name)})`)
          .all()
          .map((info) => String(info.name ?? ''))
        indexes.push({
          name,
          columns: columnsOfIndex.filter(Boolean),
          unique: Number(entry.unique) === 1,
          primary: String(entry.origin ?? '') === 'pk',
        })
      }
    } catch {
      // Views expose no index list; an empty list is the correct answer.
    }

    // A rowid alias such as `INTEGER PRIMARY KEY` creates no index object, so
    // the primary key would otherwise be invisible in the structure tab.
    const primaryColumns = columns.filter((column) => column.primaryKey).map((column) => column.name)
    if (primaryColumns.length > 0 && !indexes.some((index) => index.primary)) {
      indexes.unshift({ name: 'PRIMARY', columns: primaryColumns, unique: true, primary: true })
    }

    let ddl = ''
    try {
      const row = handle
        .prepare(`SELECT sql FROM ${db}.sqlite_master WHERE name = ? LIMIT 1`)
        .get(scope.table)
      ddl = String(row?.sql ?? '')
    } catch {
      ddl = ''
    }

    return { columns, indexes, ddl }
  }

  /**
   * SQLite has no cheap row estimate, and its `COUNT(*)` walks the smallest index
   * rather than the table, so the exact count is used instead.
   * @returns {Promise<null>} always null.
   */
  async estimateRows() {
    return null
  }

  /**
   * Read one page of a table.
   * @param {{ database?: string, table: string, page: number, pageSize: number,
   *   orderBy?: string, orderDir?: string, where?: string, count?: boolean }} query - page request.
   * @returns {Promise<{ columns: object[], rows: object[], total: number|null, durationMs: number }>}
   */
  async select(query) {
    const started = Date.now()
    const handle = this.handle()
    const target = qualify('sqlite', [query.database || 'main', query.table])
    const filter = query.where ? ` WHERE ${query.where}` : ''
    const order = orderByClause('sqlite', query.orderBy, query.orderDir)
    const page = Math.max(1, Math.trunc(Number(query.page) || 1))
    const size = Math.max(1, Math.min(1000, Math.trunc(Number(query.pageSize) || 100)))
    const tail = limitClause('sqlite', size, (page - 1) * size, Boolean(order))

    const statement = handle.prepare(`SELECT * FROM ${target}${filter}${order}${tail}`)
    const columns = statement.columns().map((column) => ({
      name: column.name,
      type: sqliteType(column),
    }))
    const rows = statement.all().map(toJsonRow)
    // `COUNT(*)` costs a full scan; callers that already know the total ask for
    // the next page without it.
    let total = null
    if (query.count !== false) {
      const countRow = handle.prepare(`SELECT COUNT(*) AS total FROM ${target}${filter}`).get()
      total = Number(countRow?.total ?? 0)
    }
    return { columns, rows, total, durationMs: Date.now() - started }
  }

  /**
   * Update one row addressed by its primary key.
   * @param {{ database?: string, table: string, key: Record<string, unknown>,
   *   changes: Record<string, unknown> }} request - update request.
   * @returns {Promise<{ affected: number }>}
   */
  async update(request) {
    const entries = Object.entries(request.changes ?? {})
    if (entries.length === 0) throw new GridError('no columns to update')
    const sets = entries.map(([name]) => `${quoteIdent('sqlite', name)} = ?`).join(', ')
    const keyEntries = Object.entries(request.key ?? {})
    if (keyEntries.length === 0) throw new GridError('this table has no primary key')
    const where = keyEntries.map(([name]) => `${quoteIdent('sqlite', name)} = ?`).join(' AND ')
    const params = [...entries.map(([, value]) => value ?? null), ...keyEntries.map(([, value]) => value ?? null)]
    const target = qualify('sqlite', [request.database || 'main', request.table])
    const result = this.handle().prepare(`UPDATE ${target} SET ${sets} WHERE ${where}`).run(...params)
    return { affected: Number(result.changes ?? 0) }
  }

  /**
   * Insert one row.
   *
   * With no values this inserts a row of defaults, which is what the grid's
   * "Insert row" button needs before the user has typed anything.
   * @param {{ database?: string, table: string, values: object }} request - insert request.
   * @returns {Promise<{ affected: number }>}
   */
  async insert(request) {
    const entries = Object.entries(request.values ?? {})
    const target = qualify('sqlite', [request.database || 'main', request.table])
    if (entries.length === 0) {
      const empty = this.handle().prepare(`INSERT INTO ${target} DEFAULT VALUES`).run()
      return { affected: Number(empty.changes ?? 0) }
    }
    const names = entries.map(([name]) => quoteIdent('sqlite', name)).join(', ')
    const holes = entries.map(() => '?').join(', ')
    const params = entries.map(([, value]) => value ?? null)
    const result = this.handle().prepare(`INSERT INTO ${target} (${names}) VALUES (${holes})`).run(...params)
    return { affected: Number(result.changes ?? 0) }
  }

  /**
   * Insert many rows in one transaction.
   * @param {{ database?: string, table: string, rows: object[] }} request - the batch.
   * @returns {Promise<{ inserted: number }>}
   */
  async insertMany(request) {
    const rows = Array.isArray(request.rows) ? request.rows : []
    const handle = this.handle()
    handle.exec('BEGIN')
    try {
      let inserted = 0
      for (const row of rows) {
        const result = await this.insert({ ...request, values: row })
        inserted += Number(result.affected ?? 0)
      }
      handle.exec('COMMIT')
      return { inserted }
    } catch (error) {
      try {
        handle.exec('ROLLBACK')
      } catch {
        // The commit may already have failed the transaction.
      }
      throw error
    }
  }

  /**
   * Delete one row addressed by its primary key.
   * @param {{ database?: string, table: string, key: Record<string, unknown> }} request - delete request.
   * @returns {Promise<{ affected: number }>}
   */
  async remove(request) {
    const keyEntries = Object.entries(request.key ?? {})
    if (keyEntries.length === 0) throw new GridError('this table has no primary key')
    const where = keyEntries.map(([name]) => `${quoteIdent('sqlite', name)} = ?`).join(' AND ')
    const target = qualify('sqlite', [request.database || 'main', request.table])
    const result = this.handle().prepare(`DELETE FROM ${target} WHERE ${where}`).run(
      ...keyEntries.map(([, value]) => value ?? null),
    )
    return { affected: Number(result.changes ?? 0) }
  }

  /**
   * Execute a script, one result per statement.
   *
   * With `readOnly`, `PRAGMA query_only` makes SQLite itself refuse the first
   * write, so the guard does not depend on the statement classifier being right.
   * @param {string[]} statements - already-split statements.
   * @param {{ readOnly?: boolean }} [options] - execution options.
   * @returns {Promise<{ results: object[], durationMs: number }>}
   */
  async exec(statements, options = {}) {
    if (options.readOnly !== true) return this.runStatements(statements)
    const handle = this.handle()
    // The pragma is per connection, and this connection is shared with writes.
    // It is always cleared in `finally`, so a failed read-only script cannot
    // leave the panel unable to edit rows.
    handle.exec('PRAGMA query_only = 1')
    try {
      return this.runStatements(statements, { readOnly: true })
    } finally {
      try {
        handle.exec('PRAGMA query_only = 0')
      } catch {
        // Closing the database between the two pragmas is not an error here.
      }
    }
  }

  /**
   * Run statements without changing the connection's write mode.
   * @param {string[]} statements - already-split statements.
   * @param {{ readOnly?: boolean }} [options] - re-assert the guard per statement.
   * @returns {{ results: object[], durationMs: number }} one result per statement.
   */
  runStatements(statements, options = {}) {
    const started = Date.now()
    const handle = this.handle()
    /** @type {object[]} */
    const results = []
    for (const statement of statements) {
      // A script can contain `PRAGMA query_only = 0` as its first statement.
      // Re-asserting before every statement keeps that from disarming the guard
      // for the statements that follow it.
      if (options.readOnly === true) handle.exec('PRAGMA query_only = 1')
      const statementStart = Date.now()
      try {
        const prepared = handle.prepare(statement)
        let columns = []
        try {
          columns = prepared.columns().map((column) => ({ name: column.name, type: sqliteType(column) }))
        } catch {
          columns = []
        }
        if (columns.length > 0) {
          // `iterate()` stops at the cap instead of materialising the whole
          // result set first, which is what a `SELECT * FROM huge` would do.
          const rows = []
          let truncated = false
          for (const row of prepared.iterate()) {
            if (rows.length >= MAX_ROWS) {
              truncated = true
              break
            }
            rows.push(toJsonRow(row))
          }
          results.push({
            statement,
            columns,
            rows,
            rowCount: rows.length,
            truncated,
            durationMs: Date.now() - statementStart,
          })
        } else {
          const info = prepared.run()
          results.push({
            statement,
            columns: [],
            rows: [],
            rowCount: 0,
            affected: Number(info.changes ?? 0),
            lastInsertId: toJsonValue(info.lastInsertRowid),
            durationMs: Date.now() - statementStart,
          })
        }
      } catch (error) {
        results.push({
          statement,
          columns: [],
          rows: [],
          rowCount: 0,
          error: error instanceof Error ? error.message : String(error),
          durationMs: Date.now() - statementStart,
        })
        break
      }
    }
    return { results, durationMs: Date.now() - started }
  }
  /**
   * SQLite offers no way to interrupt a statement already running: the driver is
   * synchronous, so the query holds the thread until it finishes.
   * @returns {Promise<{ cancelled: boolean, reason?: string }>} always unsupported.
   */
  async cancelQuery() {
    return { cancelled: false, reason: 'SQLite cannot cancel a running statement' }
  }

  /**
   * SQLite has no stored routines.
   * @returns {Promise<object[]>} an empty list.
   */
  async routines() {
    return []
  }

  /**
   * SQLite has no account catalogue to list.
   * @returns {Promise<object[]>} an empty list.
   */
  async accounts() {
    return []
  }
}
