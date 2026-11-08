/**
 * MySQL / MariaDB adapter over `mysql2/promise`.
 *
 * The package is optional: `lib/drivers/index.js` imports this module lazily,
 * so a profile without `mysql2` still loads the plugin and only this engine
 * reports that its driver is missing.
 */

import { limitClause, orderByClause, qualify, quoteIdent, toJsonRow, toJsonValue } from '../query.js'
import { GridError } from '../errors.js'
import { queryTimeoutMs } from './options.js'
import { mysqlTlsOptions, tlsIdentity, tlsMode } from './tls.js'
import { assertConnecting, connectSocket } from './network.js'

/** Row cap for one `exec` result set. */
const MAX_ROWS = 2000

/**
 * `mysql2` reports a numeric type code per field; the panel needs a name.
 * Without this the structure tab and the numeric-alignment check receive values
 * like `"253"` that match nothing.
 */
const TYPE_NAMES = {
  0: 'DECIMAL',
  1: 'TINYINT',
  2: 'SMALLINT',
  3: 'INT',
  4: 'FLOAT',
  5: 'DOUBLE',
  6: 'NULL',
  7: 'TIMESTAMP',
  8: 'BIGINT',
  9: 'MEDIUMINT',
  10: 'DATE',
  11: 'TIME',
  12: 'DATETIME',
  13: 'YEAR',
  14: 'DATE',
  15: 'VARCHAR',
  16: 'BIT',
  245: 'JSON',
  246: 'DECIMAL',
  247: 'ENUM',
  248: 'SET',
  249: 'TINYBLOB',
  250: 'MEDIUMBLOB',
  251: 'LONGBLOB',
  252: 'BLOB',
  253: 'VARCHAR',
  254: 'CHAR',
  255: 'GEOMETRY',
}

/**
 * Turn one field descriptor into a short type label.
 * @param {{ type?: number, columnType?: string }} field - a column descriptor.
 * @returns {string} the type name, or '' when unknown.
 */
function fieldType(field) {
  const byCode = TYPE_NAMES[Number(field?.type)]
  if (byCode) return byCode
  const byName = String(field?.columnType ?? '')
  return byName && byName !== 'undefined' ? byName : ''
}

/** Map an `information_schema.TABLES.TABLE_TYPE` value onto our two kinds. */
function tableKind(value) {
  return String(value ?? '').toUpperCase() === 'VIEW' ? 'view' : 'table'
}

export class MysqlDriver {
  /**
   * @param {object} connection - normalized connection record.
   */
  constructor(connection) {
    this.connection = { ...connection }
    this.engine = 'mysql'
    /** @type {import('mysql2/promise').Connection|null} */
    this.client = null
    /** Server-side thread id, used to cancel a running statement. */
    this.threadId = 0
    /** Set when this driver was asked to cancel, so the pool does not retry. */
    this.cancelled = false
    this.version = ''
  }

  /**
   * The settings a connection needs, reused when opening a side connection for
   * a cancel request.
   * @returns {object} `mysql2` connection options.
   */
  connectionConfig() {
    const { connection } = this
    assertConnecting(connection)
    return {
      host: tlsMode(connection) === 'disable' ? connection.host : tlsIdentity(connection),
      port: connection.port || 3306,
      stream: () => connectSocket(connection),
      user: connection.user || undefined,
      password: connection.password || undefined,
      database: connection.database || undefined,
      connectTimeout: 10_000,
      supportBigNumbers: true,
      bigNumberStrings: false,
      multipleStatements: false,
      ...(mysqlTlsOptions(connection) ? { ssl: mysqlTlsOptions(connection) } : {}),
    }
  }

  /**
   * Open one connection (no pool: a workbench session wants one ordered stream).
   * @returns {Promise<string>} the server version.
   */
  async open() {
    const mysql = await import('mysql2/promise')
    const { connection } = this
    assertConnecting(connection)
    this.client = await mysql.createConnection(this.connectionConfig())
    if (connection._signal?.aborted) {
      this.client.destroy()
      assertConnecting(connection)
    }
    if (this.client?.connection && typeof this.client.connection.on === 'function') {
      this.client.connection.on('error', () => {
        // Absorb connection drop errors to prevent uncaughtException
      })
    }
    const [rows] = await this.client.query('SELECT VERSION() AS version, CONNECTION_ID() AS id')
    const version = Array.isArray(rows) && rows[0] ? rows[0].version : ''
    this.threadId = Array.isArray(rows) && rows[0] ? Number(rows[0].id) : 0
    this.version = `MySQL ${version}`.trim()
    await this.applyTimeouts(queryTimeoutMs(connection))
    return this.version
  }

  /**
   * Ask the server to kill the statement this connection is running.
   *
   * `KILL QUERY` must come from another session and needs the `PROCESS`
   * privilege (or the same account); when that is refused the socket is dropped
   * instead, which also ends the statement.
   * @returns {Promise<{ cancelled: boolean, reason?: string }>} the outcome.
   */
  async cancelQuery() {
    if (!this.client || !this.threadId) return { cancelled: false, reason: 'the connection is not open' }
    const mysql = await import('mysql2/promise')
    /** @type {any} */
    let side = null
    try {
      side = await mysql.createConnection(this.connectionConfig())
      if (side?.connection && typeof side.connection.on === 'function') {
        side.connection.on('error', () => {})
      }
      await side.query(`KILL QUERY ${Number(this.threadId)}`)
      return { cancelled: true }
    } catch (error) {
      // Dropping the socket also ends the statement server-side. The flag tells
      // the session pool not to retry: re-running the query we just cancelled
      // would be the opposite of what was asked.
      this.cancelled = true
      try {
        this.client.destroy()
      } catch {
        // Already gone.
      }
      return { cancelled: false, reason: error instanceof Error ? error.message : String(error) }
    } finally {
      await side?.end().catch(() => undefined)
    }
  }

  /**
   * Ask the server to cap how long a statement may run.
   *
   * MySQL only honours `MAX_EXECUTION_TIME` for `SELECT`; MariaDB spells it
   * `max_statement_time` in seconds. Both are best-effort: an older server or a
   * restricted account simply keeps the client-side bound.
   * @param {number} timeoutMs - the connection's timeout.
   * @returns {Promise<void>}
   */
  async applyTimeouts(timeoutMs) {
    if (!this.client) return
    await this.client.query(`SET SESSION MAX_EXECUTION_TIME = ${timeoutMs}`).catch(() => undefined)
    await this.client
      .query(`SET SESSION max_statement_time = ${Math.max(1, Math.ceil(timeoutMs / 1000))}`)
      .catch(() => undefined)
    await this.client
      .query(`SET SESSION innodb_lock_wait_timeout = ${Math.max(1, Math.ceil(timeoutMs / 1000))}`)
      .catch(() => undefined)
  }

  destroy() {
    this.connection._closed = true
    for (const socket of this.connection._sockets ?? []) socket.destroy()
    this.client?.destroy()
    this.client = null
  }

  /** @returns {Promise<void>} resolves after the connection is closed. */
  async close() {
    this.connection._closed = true
    if (this.client) {
      const client = this.client
      this.client = null
      try {
        await client.end()
      } catch {
        // A server-side kill leaves nothing to close.
      }
    }
  }

  /** @returns {import('mysql2/promise').Connection} the open client. */
  handle() {
    if (!this.client) throw new Error('the MySQL connection is not open')
    return this.client
  }

  /** @returns {Promise<string>} the server version. */
  async serverVersion() {
    return this.version
  }

  /**
   * List schemas the account can see.
   * @returns {Promise<Array<{ name: string, schemas: string[] }>>}
   */
  async databases() {
    const [rows] = await this.handle().query(
      'SELECT SCHEMA_NAME AS `name` FROM information_schema.SCHEMATA ORDER BY SCHEMA_NAME',
    )
    return rows.map((row) => ({ name: String(row.name), schemas: [] }))
  }

  /**
   * List tables and views of one schema.
   * @param {{ database?: string }} scope - the schema to read.
   * @returns {Promise<Array<{ name: string, kind: string, rows: number|null }>>}
   */
  async tables(scope = {}) {
    const database = scope.database || this.connection.database
    if (!database) throw new GridError('select a database first')
    const [rows] = await this.handle().query(
      `SELECT TABLE_NAME AS \`name\`, TABLE_TYPE AS \`kind\`, TABLE_ROWS AS \`rows\`, TABLE_COMMENT AS \`comment\`
       FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? ORDER BY TABLE_TYPE, TABLE_NAME`,
      [database],
    )
    return rows.map((row) => ({
      name: String(row.name),
      kind: tableKind(row.kind),
      rows: row.rows === null || row.rows === undefined ? null : Number(row.rows),
      comment: String(row.comment ?? ''),
    }))
  }

  /**
   * Describe one table.
   * @param {{ database?: string, table: string }} scope - target table.
   * @returns {Promise<{ columns: object[], indexes: object[], ddl: string }>}
   */
  async describe(scope) {
    const database = scope.database || this.connection.database
    if (!database) throw new GridError('select a database first')
    const handle = this.handle()
    const [columnRows] = await handle.query(
      `SELECT COLUMN_NAME AS \`name\`, COLUMN_TYPE AS \`type\`, IS_NULLABLE AS \`nullable\`,
              COLUMN_DEFAULT AS \`defaultValue\`, COLUMN_KEY AS \`keyName\`, EXTRA AS \`extra\`,
              COLUMN_COMMENT AS \`comment\`, ORDINAL_POSITION AS \`ordinal\`
       FROM information_schema.COLUMNS
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? ORDER BY ORDINAL_POSITION`,
      [database, scope.table],
    )
    const columns = columnRows.map((row) => ({
      name: String(row.name),
      type: String(row.type ?? ''),
      nullable: String(row.nullable ?? '').toUpperCase() === 'YES',
      defaultValue: row.defaultValue === null || row.defaultValue === undefined ? null : String(row.defaultValue),
      primaryKey: String(row.keyName ?? '').toUpperCase() === 'PRI',
      ordinal: Number(row.ordinal ?? 0),
      comment: String(row.comment ?? ''),
      extra: String(row.extra ?? ''),
    }))

    /** @type {object[]} */
    const indexes = []
    try {
      const [indexRows] = await handle.query(
        `SELECT INDEX_NAME AS \`name\`, COLUMN_NAME AS \`columnName\`, NON_UNIQUE AS \`nonUnique\`, SEQ_IN_INDEX AS \`seq\`
         FROM information_schema.STATISTICS
         WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? ORDER BY INDEX_NAME, SEQ_IN_INDEX`,
        [database, scope.table],
      )
      /** @type {Map<string, object>} */
      const byName = new Map()
      for (const row of indexRows) {
        const name = String(row.name)
        let entry = byName.get(name)
        if (!entry) {
          entry = { name, columns: [], unique: Number(row.nonUnique) === 0, primary: name === 'PRIMARY' }
          byName.set(name, entry)
          indexes.push(entry)
        }
        entry.columns.push(String(row.columnName))
      }
    } catch {
      // Older servers or restricted accounts: structure still renders.
    }

    let ddl = ''
    try {
      const [ddlRows] = await handle.query(`SHOW CREATE TABLE ${qualify('mysql', [database, scope.table])}`)
      ddl = String(ddlRows?.[0]?.['Create Table'] ?? ddlRows?.[0]?.['Create View'] ?? '')
    } catch {
      ddl = ''
    }
    return { columns, indexes, ddl }
  }

  /**
   * Approximate the number of rows in one table, from the catalogue.
   *
   * InnoDB's `TABLE_ROWS` is an estimate that can be tens of percent off; the
   * caller labels it as such and asks for an exact count when it matters.
   * @param {{ database?: string, table: string }} scope - target table.
   * @returns {Promise<number|null>} the estimate, or null when unavailable.
   */
  async estimateRows(scope = {}) {
    const database = scope.database || this.connection.database
    if (!database) return null
    try {
      const [rows] = await this.handle().query(
        'SELECT TABLE_ROWS AS `rows` FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?',
        [database, scope.table],
      )
      const value = Array.isArray(rows) && rows[0] ? Number(rows[0].rows) : NaN
      return Number.isFinite(value) && value >= 0 ? value : null
    } catch {
      return null
    }
  }

  /**
   * Read one page of a table.
   * @param {{ database?: string, table: string, page: number, pageSize: number,
   *   orderBy?: string, orderDir?: string, where?: string, count?: boolean }} query - page request.
   * @returns {Promise<{ columns: object[], rows: object[], total: number|null, durationMs: number }>}
   */
  async select(query) {
    const started = Date.now()
    const database = query.database || this.connection.database
    if (!database) throw new GridError('select a database first')
    const target = qualify('mysql', [database, query.table])
    const filter = query.where ? ` WHERE ${query.where}` : ''
    const order = orderByClause('mysql', query.orderBy, query.orderDir)
    const page = Math.max(1, Math.trunc(Number(query.page) || 1))
    const size = Math.max(1, Math.min(1000, Math.trunc(Number(query.pageSize) || 100)))
    const tail = limitClause('mysql', size, (page - 1) * size, Boolean(order))

    const [rows, fields] = await this.handle().query(`SELECT * FROM ${target}${filter}${order}${tail}`)
    const columns = (fields ?? []).map((field) => ({
      name: field.name,
      type: fieldType(field),
    }))
    let total = null
    if (query.count !== false) {
      const [countRows] = await this.handle().query(`SELECT COUNT(*) AS total FROM ${target}${filter}`)
      total = Number(countRows?.[0]?.total ?? 0)
    }
    return {
      columns,
      rows: rows.map(toJsonRow),
      total,
      durationMs: Date.now() - started,
    }
  }

  /**
   * Update one row by primary key.
   * @param {{ database?: string, table: string, key: object, changes: object }} request - update request.
   * @returns {Promise<{ affected: number }>}
   */
  async update(request) {
    const entries = Object.entries(request.changes ?? {})
    if (entries.length === 0) throw new GridError('no columns to update')
    const keyEntries = Object.entries(request.key ?? {})
    if (keyEntries.length === 0) throw new GridError('this table has no primary key')
    const database = request.database || this.connection.database
    const target = qualify('mysql', [database, request.table])
    const sets = entries.map(([name]) => `${quoteIdent('mysql', name)} = ?`).join(', ')
    const where = keyEntries.map(([name]) => `${quoteIdent('mysql', name)} = ?`).join(' AND ')
    const [result] = await this.handle().query(`UPDATE ${target} SET ${sets} WHERE ${where}`, [
      ...entries.map(([, value]) => value ?? null),
      ...keyEntries.map(([, value]) => value ?? null),
    ])
    return { affected: Number(result.affectedRows ?? 0) }
  }

  /**
   * Insert one row.
   *
   * With no values this inserts a row of defaults, which is what the grid's
   * "Insert row" button needs before the user has typed anything. MySQL spells
   * that `INSERT INTO t () VALUES ()`.
   * @param {{ database?: string, table: string, values: object }} request - insert request.
   * @returns {Promise<{ affected: number, lastInsertId: unknown }>}
   */
  async insert(request) {
    const entries = Object.entries(request.values ?? {})
    const database = request.database || this.connection.database
    const target = qualify('mysql', [database, request.table])
    if (entries.length === 0) {
      const [empty] = await this.handle().query(`INSERT INTO ${target} () VALUES ()`)
      return { affected: Number(empty.affectedRows ?? 0), lastInsertId: toJsonValue(empty.insertId ?? null) }
    }
    const names = entries.map(([name]) => quoteIdent('mysql', name)).join(', ')
    const holes = entries.map(() => '?').join(', ')
    const [result] = await this.handle().query(`INSERT INTO ${target} (${names}) VALUES (${holes})`, [
      ...entries.map(([, value]) => value ?? null),
    ])
    return {
      affected: Number(result.affectedRows ?? 0),
      lastInsertId: toJsonValue(result.insertId ?? null),
    }
  }

  /**
   * Insert many rows in one transaction.
   * @param {{ database?: string, table: string, rows: object[] }} request - the batch.
   * @returns {Promise<{ inserted: number }>}
   */
  async insertMany(request) {
    const rows = Array.isArray(request.rows) ? request.rows : []
    const handle = this.handle()
    await handle.query('START TRANSACTION')
    try {
      let inserted = 0
      for (const row of rows) {
        const result = await this.insert({ ...request, values: row })
        inserted += Number(result.affected ?? 0)
      }
      await handle.query('COMMIT')
      return { inserted }
    } catch (error) {
      try {
        await handle.query('ROLLBACK')
      } catch {
        // A dead connection has nothing left to roll back.
      }
      throw error
    }
  }

  /**
   * Delete one row by primary key.
   * @param {{ database?: string, table: string, key: object }} request - delete request.
   * @returns {Promise<{ affected: number }>}
   */
  async remove(request) {
    const keyEntries = Object.entries(request.key ?? {})
    if (keyEntries.length === 0) throw new GridError('this table has no primary key')
    const database = request.database || this.connection.database
    const target = qualify('mysql', [database, request.table])
    const where = keyEntries.map(([name]) => `${quoteIdent('mysql', name)} = ?`).join(' AND ')
    const [result] = await this.handle().query(`DELETE FROM ${target} WHERE ${where}`, [
      ...keyEntries.map(([, value]) => value ?? null),
    ])
    return { affected: Number(result.affectedRows ?? 0) }
  }

  /**
   * Execute a script, one result per statement.
   *
   * A read-only request runs inside `START TRANSACTION READ ONLY`, so the server
   * rejects the first write even if the statement classifier missed it. The
   * transaction is always rolled back.
   * @param {string[]} statements - already-split statements.
   * @param {{ readOnly?: boolean }} [options] - execution options.
   * @returns {Promise<{ results: object[], durationMs: number }>}
   */
  async exec(statements, options = {}) {
    if (options.readOnly !== true) return this.runStatements(statements)
    const handle = this.handle()
    await handle.query('START TRANSACTION READ ONLY')
    try {
      return await this.runStatements(statements)
    } finally {
      try {
        await handle.query('ROLLBACK')
      } catch {
        // The server may have already ended the transaction.
      }
    }
  }

  /**
   * Run one statement, stopping the read at `MAX_ROWS`.
   *
   * `mysql2`'s promise API hands back the entire result set, so `SELECT * FROM
   * huge` would be materialised in V8 before being sliced. The core connection
   * underneath emits rows as they arrive, which is what this listens to. It
   * returns null when that API is not available, and the caller falls back.
   * @param {string} statement - one statement.
   * @returns {Promise<object>|null} the outcome, or null when streaming is unavailable.
   */
  streamStatement(statement) {
    const core = this.client?.connection
    // The decision has to be made before a statement is started: falling back
    // after starting would run a write twice.
    if (!core || typeof core.query !== 'function') return null
    return new Promise((resolve, reject) => {
      /** @type {object[]} */
      const rows = []
      /** @type {object[]} */
      let columns = []
      let truncated = false
      let affected = 0
      let lastInsertId = null
      const query = core.query(statement)
      query.on('fields', (fields) => {
        columns = (fields ?? []).map((field) => ({ name: field.name, type: fieldType(field) }))
      })
      query.on('result', (row) => {
        if (columns.length === 0) {
          // No fields means this was an OkPacket: INSERT, UPDATE or DDL.
          affected = Number(row?.affectedRows ?? 0)
          lastInsertId = toJsonValue(row?.insertId ?? null)
          return
        }
        if (rows.length >= MAX_ROWS) {
          truncated = true
          return
        }
        rows.push(toJsonRow(row))
      })
      query.on('error', (error) => reject(error))
      query.on('end', () => resolve({ columns, rows, truncated, affected, lastInsertId }))
    })
  }

  /**
   * Run statements without opening a transaction.
   * @param {string[]} statements - already-split statements.
   * @returns {Promise<{ results: object[], durationMs: number }>} one result per statement.
   */
  async runStatements(statements) {
    const started = Date.now()
    const handle = this.handle()
    /** @type {object[]} */
    const results = []
    for (const statement of statements) {
      const statementStart = Date.now()
      try {
        const streamed = this.streamStatement(statement)
        if (streamed) {
          const outcome = await streamed
          results.push({
            statement,
            columns: outcome.columns,
            rows: outcome.rows,
            rowCount: outcome.rows.length,
            truncated: outcome.truncated,
            affected: outcome.affected,
            ...(outcome.lastInsertId === null ? {} : { lastInsertId: outcome.lastInsertId }),
            durationMs: Date.now() - statementStart,
          })
          continue
        }
        // Fallback for a driver build without the streaming API.
        const [result, fields] = await handle.query(statement)
        if (Array.isArray(fields)) {
          const rows = Array.isArray(result) ? result.slice(0, MAX_ROWS).map(toJsonRow) : []
          results.push({
            statement,
            columns: fields.map((field) => ({ name: field.name, type: fieldType(field) })),
            rows,
            rowCount: rows.length,
            truncated: Array.isArray(result) && result.length > MAX_ROWS,
            affected: Number(result?.affectedRows ?? 0),
            durationMs: Date.now() - statementStart,
          })
        } else {
          results.push({
            statement,
            columns: [],
            rows: [],
            rowCount: 0,
            affected: Number(result?.affectedRows ?? 0),
            lastInsertId: toJsonValue(result?.insertId ?? null),
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
   * List accounts when the login may read `mysql.user`.
   * @returns {Promise<object[]>} accounts, or an empty list without privileges.
   */
  async accounts() {
    try {
      const [rows] = await this.handle().query(
        'SELECT User AS `name`, Host AS `host`, plugin AS `plugin`, account_locked AS `locked` FROM mysql.user ORDER BY User, Host',
      )
      return rows.map((row) => ({
        name: String(row.name),
        host: String(row.host ?? ''),
        plugin: String(row.plugin ?? ''),
        locked: Boolean(Number(row.locked ?? 0)),
        privileged: false,
      }))
    } catch {
      return []
    }
  }
  /**
   * List stored routines of one schema.
   * @param {{ database?: string }} scope - target scope.
   * @returns {Promise<object[]>} routines.
   */
  async routines(scope = {}) {
    const database = scope.database || this.connection.database
    if (!database) return []
    const [rows] = await this.handle().query(
      `SELECT ROUTINE_NAME AS \`name\`, ROUTINE_TYPE AS \`kind\`, DTD_IDENTIFIER AS \`returnType\`,
              EXTERNAL_LANGUAGE AS \`language\`, ROUTINE_DEFINITION AS \`definition\`
       FROM information_schema.ROUTINES WHERE ROUTINE_SCHEMA = ?
       ORDER BY ROUTINE_TYPE, ROUTINE_NAME`,
      [database],
    )
    return rows.map((row) => ({
      name: String(row.name),
      kind: String(row.kind ?? '').toUpperCase() === 'PROCEDURE' ? 'procedure' : 'function',
      returnType: String(row.returnType ?? ''),
      language: String(row.language ?? ''),
      definition: String(row.definition ?? ''),
    }))
  }
}

/**
 * Build an unopened MySQL driver.
 * @param {object} connection - normalized connection record.
 * @returns {MysqlDriver} the driver.
 */
export function create(connection) {
  return new MysqlDriver(connection)
}
