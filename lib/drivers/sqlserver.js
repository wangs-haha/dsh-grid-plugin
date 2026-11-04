/**
 * SQL Server adapter over `mssql` (tedious).
 *
 * SQL Server needs `OFFSET … FETCH` for paging and bracket quoting for
 * identifiers, both handled by the shared SQL helpers.
 */

import { limitClause, orderByClause, qualify, quoteIdent, toJsonRow, toJsonValue } from '../query.js'
import { GridError } from '../errors.js'
import { queryTimeoutMs } from './options.js'
import { buildSqlServerDdl, sqlServerType } from './sqlserver-ddl.js'
import { mssqlTlsOptions } from './tls.js'

/** Row cap for one `exec` result set. */
const MAX_ROWS = 2000

/** System schemas hidden from the tree. */
const SYSTEM_SCHEMAS = new Set(['sys', 'guest', 'INFORMATION_SCHEMA', 'db_owner', 'db_accessadmin'])

/**
 * Read column metadata from a result set.
 *
 * Deriving names from `rows[0]` loses every column on an empty page, which is
 * exactly when the grid still needs its header.
 * @param {{ columns?: Record<string, { type?: { declaration?: string } }> }} recordset - a `mssql` result set.
 * @returns {Array<{ name: string, type: string }>} column descriptors.
 */
function columnsOf(recordset) {
  const columns = recordset?.columns
  if (!columns || typeof columns !== 'object') return []
  return Object.entries(columns).map(([name, meta]) => ({
    name,
    type: String(meta?.type?.declaration ?? ''),
  }))
}

export class SqlServerDriver {
  /**
   * @param {object} connection - normalized connection record.
   */
  constructor(connection) {
    this.connection = connection
    this.engine = 'sqlserver'
    /** @type {import('mssql').ConnectionPool|null} */
    this.pool = null
    /** @type {import('mssql').Request|null} */
    this.active = null
    /** @type {any} the lazily imported module, kept for transactions */
    this.mssql = null
    this.version = ''
  }

  /**
   * Open one pool.
   * @returns {Promise<string>} the server version.
   */
  async open() {
    const mssql = (await import('mssql')).default
    this.mssql = mssql
    const { connection } = this
    this.pool = new mssql.ConnectionPool({
      server: connection.host,
      port: connection.port || 1433,
      user: connection.user || undefined,
      password: connection.password || undefined,
      database: connection.database || undefined,
      connectionTimeout: 10_000,
      // `mssql` cancels the request when this elapses, so the connection's
      // timeout is enforced on the client side for every engine that has no
      // server-side equivalent.
      requestTimeout: queryTimeoutMs(connection),
      options: {
        ...mssqlTlsOptions(connection),
        enableArithAbort: true,
      },
    })
    await this.pool.connect()
    const result = await this.pool.request().query('SELECT @@VERSION AS version')
    this.version = `SQL Server ${String(result.recordset?.[0]?.version ?? '').split('\n')[0]}`.trim()
    return this.version
  }

  /** @returns {Promise<void>} resolves after the pool is closed. */
  async close() {
    if (this.pool) {
      const pool = this.pool
      this.pool = null
      try {
        await pool.close()
      } catch {
        // Nothing left to close when the server already dropped the session.
      }
    }
  }

  /** @returns {import('mssql').ConnectionPool} the open pool. */
  handle() {
    if (!this.pool) throw new Error('the SQL Server connection is not open')
    return this.pool
  }

  /** @returns {Promise<string>} the server version. */
  async serverVersion() {
    return this.version
  }

  /**
   * Report the connected database with its user schemas.
   *
   * One SQL Server pool is bound to one database; browsing another one means
   * editing the connection.
   * @returns {Promise<Array<{ name: string, schemas: string[] }>>}
   */
  async databases() {
    const pool = this.handle()
    const current = await pool.request().query('SELECT DB_NAME() AS name')
    const schemas = await pool.request().query('SELECT name FROM sys.schemas ORDER BY name')
    const names = schemas.recordset.map((row) => String(row.name)).filter((name) => !SYSTEM_SCHEMAS.has(name))
    return [{ name: String(current.recordset?.[0]?.name ?? this.connection.database ?? ''), schemas: names }]
  }

  /**
   * List tables and views of one schema.
   * @param {{ schema?: string }} scope - the schema to read.
   * @returns {Promise<Array<{ name: string, kind: string, rows: number|null }>>}
   */
  async tables(scope = {}) {
    const schema = scope.schema || 'dbo'
    const result = await this.handle()
      .request()
      .input('schema', schema)
      .query(
        `SELECT TABLE_NAME AS name, TABLE_TYPE AS kind FROM INFORMATION_SCHEMA.TABLES
         WHERE TABLE_SCHEMA = @schema ORDER BY TABLE_TYPE, TABLE_NAME`,
      )
    return result.recordset.map((row) => ({
      name: String(row.name),
      kind: String(row.kind ?? '').toUpperCase() === 'VIEW' ? 'view' : 'table',
      rows: row.rows === null || row.rows === undefined ? null : Number(row.rows),
      comment: '',
    }))
  }

  /**
   * Describe one table.
   *
   * SQL Server has no `pg_get_constraintdef` equivalent for tables, so the DDL is
   * assembled from `sys.*` (see `sqlserver-ddl.js`). Columns come from
   * `sys.columns` so identity, computed and default-constraint information is
   * available at all — `INFORMATION_SCHEMA` exposes none of it.
   * @param {{ schema?: string, table: string }} scope - target table.
   * @returns {Promise<{ columns: object[], indexes: object[], ddl: string }>}
   */
  async describe(scope) {
    const schema = scope.schema || 'dbo'
    const pool = this.handle()
    /** Every query below needs the same object id. */
    const objectId = 'OBJECT_ID(QUOTENAME(@schema) + \'.\' + QUOTENAME(@table))'
    /** Column names arrive aggregated; unit-separator cannot occur in a name. */
    const SEPARATOR = '\u001f'

    // A view is not a table: it has no declared columns, and its DDL is the
    // definition SQL Server kept when it was created.
    const kindResult = await pool
      .request()
      .input('schema', schema)
      .input('table', scope.table)
      .query(
        `SELECT o.type AS kind, OBJECT_DEFINITION(o.object_id) AS definition
         FROM sys.objects o WHERE o.object_id = ${objectId}`,
      )
      .catch(() => ({ recordset: [] }))
    const isView = String(kindResult.recordset?.[0]?.kind ?? '').trim() === 'V'

    const columnResult = await pool
      .request()
      .input('schema', schema)
      .input('table', scope.table)
      .query(
        `SELECT c.column_id AS ordinal, c.name AS name,
                t.name AS typeName, SCHEMA_NAME(t.schema_id) AS typeSchema,
                t.is_user_defined AS userDefined,
                c.max_length AS maxLength, c.precision AS precision, c.scale AS scale,
                c.is_nullable AS nullable, c.is_identity AS identity, c.is_computed AS computed,
                cc.definition AS computedDef, cc.is_persisted AS persisted,
                dc.definition AS defaultDef, dc.name AS defaultName,
                ic.seed_value AS identitySeed, ic.increment_value AS identityIncrement
         FROM sys.columns c
         JOIN sys.types t ON t.user_type_id = c.user_type_id
         LEFT JOIN sys.computed_columns cc ON cc.object_id = c.object_id AND cc.column_id = c.column_id
         LEFT JOIN sys.default_constraints dc
                ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
         LEFT JOIN sys.identity_columns ic ON ic.object_id = c.object_id AND ic.column_id = c.column_id
         WHERE c.object_id = ${objectId}
         ORDER BY c.column_id`,
      )

    // The primary key's columns drive whether the grid may edit a row at all.
    const primary = new Set(
      await pool
        .request()
        .input('schema', schema)
        .input('table', scope.table)
        .query(
          `SELECT c.name AS name
           FROM sys.index_columns ic
           JOIN sys.columns c ON c.object_id = ic.object_id AND c.column_id = ic.column_id
           JOIN sys.key_constraints kc
             ON kc.parent_object_id = ic.object_id AND kc.unique_index_id = ic.index_id
           WHERE ic.object_id = ${objectId} AND kc.type = 'PK'`,
        )
        .then((result) => result.recordset.map((row) => String(row.name)))
        .catch(() => []),
    )

    const columns = columnResult.recordset.map((row) => ({
      name: String(row.name),
      type: sqlServerType(row),
      nullable: row.nullable === true || row.nullable === 1,
      defaultValue: row.defaultDef === null || row.defaultDef === undefined ? null : String(row.defaultDef),
      primaryKey: primary.has(String(row.name)),
      ordinal: Number(row.ordinal ?? 0),
      comment: '',
      extra: row.identity ? 'identity' : row.computed ? 'computed' : '',
    }))

    // The composer needs the raw `sys.*` fields (identity seed, computed
    // expression, default constraint name), so it gets its own projection rather
    // than the one the panel renders.
    const ddlColumns = columnResult.recordset.map((row) => ({
      ...row,
      nullable: row.nullable === true || row.nullable === 1,
    }))

    /** @type {object[]} */
    const constraints = []
    /** @type {object[]} */
    const indexes = []
    /** @type {object[]} */
    const indexStatements = []

    try {
      const keyResult = await pool
        .request()
        .input('schema', schema)
        .input('table', scope.table)
        .query(
          `SELECT kc.name AS name, kc.type AS kind, i.type_desc AS typeDesc,
                  STRING_AGG(c.name, NCHAR(31)) WITHIN GROUP (ORDER BY ic.key_ordinal) AS cols
           FROM sys.key_constraints kc
           JOIN sys.indexes i ON i.object_id = kc.parent_object_id AND i.index_id = kc.unique_index_id
           JOIN sys.index_columns ic
             ON ic.object_id = i.object_id AND ic.index_id = i.index_id AND ic.is_included_column = 0
           JOIN sys.columns c ON c.object_id = ic.object_id AND c.column_id = ic.column_id
           WHERE kc.parent_object_id = ${objectId}
           GROUP BY kc.name, kc.type, i.type_desc
           ORDER BY kc.name`,
        )
      for (const row of keyResult.recordset) {
        const raw = String(row.cols ?? '').split(SEPARATOR).filter(Boolean)
        const list = raw.map((name) => quoteIdent('sqlserver', name)).join(', ')
        const kind = String(row.kind) === 'PK' ? 'PRIMARY KEY' : 'UNIQUE'
        constraints.push({ name: String(row.name), definition: `${kind} ${String(row.typeDesc)} (${list})` })
        indexes.push({
          name: String(row.name),
          columns: raw,
          unique: String(row.kind) === 'PK' || /UNIQUE/i.test(String(row.typeDesc)),
          primary: String(row.kind) === 'PK',
        })
      }
    } catch {
      // Older servers or restricted accounts: the rest of the structure still renders.
    }

    try {
      const foreignResult = await pool
        .request()
        .input('schema', schema)
        .input('table', scope.table)
        .query(
          `SELECT fk.name AS name,
                  OBJECT_SCHEMA_NAME(fk.referenced_object_id) AS refSchema,
                  OBJECT_NAME(fk.referenced_object_id) AS refTable,
                  fk.delete_referential_action_desc AS onDelete,
                  fk.update_referential_action_desc AS onUpdate,
                  STRING_AGG(pc.name, NCHAR(31)) WITHIN GROUP (ORDER BY fkc.constraint_column_id) AS cols,
                  STRING_AGG(rc.name, NCHAR(31)) WITHIN GROUP (ORDER BY fkc.constraint_column_id) AS refCols
           FROM sys.foreign_keys fk
           JOIN sys.foreign_key_columns fkc ON fkc.constraint_object_id = fk.object_id
           JOIN sys.columns pc ON pc.object_id = fkc.parent_object_id AND pc.column_id = fkc.parent_column_id
           JOIN sys.columns rc
             ON rc.object_id = fkc.referenced_object_id AND rc.column_id = fkc.referenced_column_id
           WHERE fk.parent_object_id = ${objectId}
           GROUP BY fk.name, fk.referenced_object_id,
                    fk.delete_referential_action_desc, fk.update_referential_action_desc
           ORDER BY fk.name`,
        )
      for (const row of foreignResult.recordset) {
        const cols = String(row.cols ?? '').split(SEPARATOR).filter(Boolean)
        const refCols = String(row.refCols ?? '').split(SEPARATOR).filter(Boolean)
        const target = qualify('sqlserver', [String(row.refSchema ?? 'dbo'), String(row.refTable ?? '')])
        let definition =
          `FOREIGN KEY (${cols.map((name) => quoteIdent('sqlserver', name)).join(', ')}) ` +
          `REFERENCES ${target} (${refCols.map((name) => quoteIdent('sqlserver', name)).join(', ')})`
        if (String(row.onDelete ?? 'NO_ACTION') !== 'NO_ACTION') definition += ` ON DELETE ${String(row.onDelete)}`
        if (String(row.onUpdate ?? 'NO_ACTION') !== 'NO_ACTION') definition += ` ON UPDATE ${String(row.onUpdate)}`
        constraints.push({ name: String(row.name), definition })
      }
    } catch {
      // Same: a missing privilege must not hide the columns.
    }

    try {
      const checkResult = await pool
        .request()
        .input('schema', schema)
        .input('table', scope.table)
        .query(
          `SELECT name AS name, definition AS definition, is_disabled AS disabled
           FROM sys.check_constraints WHERE parent_object_id = ${objectId} ORDER BY name`,
        )
      for (const row of checkResult.recordset) {
        if (row.disabled === true || row.disabled === 1) continue
        constraints.push({ name: String(row.name), definition: `CHECK ${String(row.definition ?? '')}` })
      }
    } catch {
      // As above.
    }

    try {
      const indexResult = await pool
        .request()
        .input('schema', schema)
        .input('table', scope.table)
        .query(
          `SELECT i.name AS name, i.is_unique AS isUnique, i.type_desc AS typeDesc,
                  STRING_AGG(c.name, NCHAR(31)) WITHIN GROUP (ORDER BY ic.key_ordinal) AS cols
           FROM sys.indexes i
           JOIN sys.index_columns ic
             ON ic.object_id = i.object_id AND ic.index_id = i.index_id AND ic.is_included_column = 0
           JOIN sys.columns c ON c.object_id = ic.object_id AND c.column_id = ic.column_id
           WHERE i.object_id = ${objectId}
             AND i.is_primary_key = 0 AND i.is_unique_constraint = 0 AND i.type > 0
           GROUP BY i.name, i.is_unique, i.type_desc
           ORDER BY i.name`,
        )
      for (const row of indexResult.recordset) {
        const raw = String(row.cols ?? '').split(SEPARATOR).filter(Boolean)
        const list = raw.map((name) => quoteIdent('sqlserver', name)).join(', ')
        const unique = row.isUnique === true || row.isUnique === 1
        const typeDesc = String(row.typeDesc ?? 'NONCLUSTERED')
        indexes.push({ name: String(row.name), columns: raw, unique, primary: false })
        indexStatements.push({
          name: String(row.name),
          definition:
            `CREATE ${unique ? 'UNIQUE ' : ''}${typeDesc} INDEX ${quoteIdent('sqlserver', String(row.name))} ` +
            `ON ${qualify('sqlserver', [schema, scope.table])} (${list})`,
        })
      }
    } catch {
      // As above.
    }

    const viewDefinition = String(kindResult.recordset?.[0]?.definition ?? '').trim()
    return {
      columns,
      indexes,
      ddl: isView
        ? viewDefinition
          ? `${viewDefinition.replace(/;+$/, '')};`
          : ''
        : buildSqlServerDdl({ schema, table: scope.table, columns: ddlColumns, constraints, indexes: indexStatements }),
    }
  }

  /**
   * Approximate the number of rows in one table, from the partition statistics.
   * @param {{ schema?: string, table: string }} scope - target table.
   * @returns {Promise<number|null>} the estimate, or null when unavailable.
   */
  async estimateRows(scope = {}) {
    const schema = scope.schema || 'dbo'
    try {
      const result = await this.handle()
        .request()
        .input('schema', schema)
        .input('table', scope.table)
        .query(
          `SELECT SUM(p.rows) AS rows
           FROM sys.partitions p
           WHERE p.object_id = OBJECT_ID(QUOTENAME(@schema) + '.' + QUOTENAME(@table))
             AND p.index_id IN (0, 1)`,
        )
      const value = Number(result.recordset?.[0]?.rows)
      return Number.isFinite(value) && value >= 0 ? value : null
    } catch {
      return null
    }
  }

  /**
   * Read one page of a table.
   * @param {{ schema?: string, table: string, page: number, pageSize: number,
   *   orderBy?: string, orderDir?: string, where?: string }} query - page request.
   * @returns {Promise<{ columns: object[], rows: object[], total: number, durationMs: number }>}
   */
  async select(query) {
    const started = Date.now()
    const schema = query.schema || 'dbo'
    const target = qualify('sqlserver', [schema, query.table])
    const filter = query.where ? ` WHERE ${query.where}` : ''
    const order = orderByClause('sqlserver', query.orderBy, query.orderDir)
    const page = Math.max(1, Math.trunc(Number(query.page) || 1))
    const size = Math.max(1, Math.min(1000, Math.trunc(Number(query.pageSize) || 100)))
    const tail = limitClause('sqlserver', size, (page - 1) * size, Boolean(order))

    const result = await this.handle().request().query(`SELECT * FROM ${target}${filter}${order}${tail}`)
    const rows = result.recordset ?? []
    const columns = columnsOf(result.recordset)
    let total = null
    if (query.count !== false) {
      const countResult = await this.handle().request().query(`SELECT COUNT_BIG(*) AS total FROM ${target}${filter}`)
      total = Number(countResult.recordset?.[0]?.total ?? 0)
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
   * @param {{ schema?: string, table: string, key: object, changes: object }} request - update request.
   * @returns {Promise<{ affected: number }>}
   */
  async update(request) {
    const entries = Object.entries(request.changes ?? {})
    if (entries.length === 0) throw new GridError('no columns to update')
    const keyEntries = Object.entries(request.key ?? {})
    if (keyEntries.length === 0) throw new GridError('this table has no primary key')
    const schema = request.schema || 'dbo'
    const target = qualify('sqlserver', [schema, request.table])
    const rgx = this.handle().request()
    const values = []
    const sets = entries.map(([name, value]) => {
      const param = `v${values.length}`
      rgx.input(param, value ?? null)
      values.push(value)
      return `${quoteIdent('sqlserver', name)} = @${param}`
    }).join(', ')
    const where = keyEntries.map(([name, value]) => {
      const param = `v${values.length}`
      rgx.input(param, value ?? null)
      values.push(value)
      return `${quoteIdent('sqlserver', name)} = @${param}`
    }).join(' AND ')
    const result = await rgx.query(`UPDATE ${target} SET ${sets} WHERE ${where}`)
    return { affected: Number(result.rowsAffected?.[0] ?? 0) }
  }

  /**
   * Build one INSERT, bound to whatever `Request` the caller is using.
   * @param {{ schema?: string, table: string, values: object }} request - insert request.
   * @param {import('mssql').Request} rgx - a request (or a transaction's request).
   * @returns {() => Promise<{ rowsAffected?: number[] }>} the statement to run.
   */
  insertStatement(request, rgx) {
    const entries = Object.entries(request.values ?? {})
    const schema = request.schema || 'dbo'
    const target = qualify('sqlserver', [schema, request.table])
    if (entries.length === 0) {
      // A row of defaults: what "Insert row" starts from.
      return () => rgx.query(`INSERT INTO ${target} DEFAULT VALUES`)
    }
    const names = []
    const holes = []
    entries.forEach(([name, value], index) => {
      names.push(quoteIdent('sqlserver', name))
      holes.push(`@v${index}`)
      rgx.input(`v${index}`, value ?? null)
    })
    return () => rgx.query(`INSERT INTO ${target} (${names.join(', ')}) VALUES (${holes.join(', ')})`)
  }

  /**
   * Insert one row.
   * @param {{ schema?: string, table: string, values: object }} request - insert request.
   * @returns {Promise<{ affected: number }>}
   */
  async insert(request) {
    const result = await this.insertStatement(request, this.handle().request())()
    return { affected: Number(result.rowsAffected?.[0] ?? 0) }
  }

  /**
   * Insert many rows in one transaction.
   *
   * SQL Server needs a `Transaction` object rather than a `BEGIN` statement, so
   * this one keeps the lazily-imported `mssql` module on the instance.
   * @param {{ schema?: string, table: string, rows: object[] }} request - the batch.
   * @returns {Promise<{ inserted: number }>}
   */
  async insertMany(request) {
    const rows = Array.isArray(request.rows) ? request.rows : []
    if (!this.mssql) this.mssql = (await import('mssql')).default
    const transaction = new this.mssql.Transaction(this.handle())
    await transaction.begin()
    try {
      let inserted = 0
      for (const row of rows) {
        const statement = this.insertStatement({ ...request, values: row }, new this.mssql.Request(transaction))
        const result = await statement()
        inserted += Number(result.rowsAffected?.[0] ?? 0)
      }
      await transaction.commit()
      return { inserted }
    } catch (error) {
      try {
        await transaction.rollback()
      } catch {
        // A dead connection has nothing left to roll back.
      }
      throw error
    }
  }

  /**
   * Delete one row by primary key.
   * @param {{ schema?: string, table: string, key: object }} request - delete request.
   * @returns {Promise<{ affected: number }>}
   */
  async remove(request) {
    const keyEntries = Object.entries(request.key ?? {})
    if (keyEntries.length === 0) throw new GridError('this table has no primary key')
    const schema = request.schema || 'dbo'
    const target = qualify('sqlserver', [schema, request.table])
    const rgx = this.handle().request()
    const where = keyEntries.map(([name, value], index) => {
      rgx.input(`k${index}`, value ?? null)
      return `${quoteIdent('sqlserver', name)} = @k${index}`
    }).join(' AND ')
    const result = await rgx.query(`DELETE FROM ${target} WHERE ${where}`)
    return { affected: Number(result.rowsAffected?.[0] ?? 0) }
  }

  /**
   * Execute a script, one result per statement.
   *
   * SQL Server has no read-only session or transaction, so `readOnly` cannot be
   * enforced here the way the other engines do it; the statement classifier and
   * the login's own permissions remain the boundary.
   * @param {string[]} statements - already-split statements.
   * @param {{ readOnly?: boolean }} [options] - accepted for interface parity.
   * @returns {Promise<{ results: object[], durationMs: number }>}
   */
  async exec(statements, _options = {}) {
    return this.runStatements(statements)
  }

  /**
   * Run one statement with `request.stream`, so rows are discarded as they pass
   * the cap instead of being collected first.
   *
   * Streaming also means the request cannot be awaited: completion arrives as a
   * `done` event, and `cancelQuery` can abort it mid-flight.
   * @param {string} statement - one statement.
   * @returns {Promise<object>} `{ columns, rows, truncated, affected }`.
   */
  streamStatement(statement) {
    const request = this.handle().request()
    this.active = request
    request.stream = true
    return new Promise((resolve, reject) => {
      /** @type {object[]} */
      const rows = []
      /** @type {object[]} */
      let columns = []
      let truncated = false
      let affected = 0
      request.on('recordset', (recordset) => {
        columns = columnsOf({ columns: recordset?.columns ?? recordset })
      })
      request.on('row', (row) => {
        if (rows.length >= MAX_ROWS) {
          truncated = true
          return
        }
        rows.push(toJsonRow(row))
      })
      request.on('rowsaffected', (count) => {
        affected = Number(count ?? 0)
      })
      request.on('error', (error) => {
        this.active = null
        reject(error)
      })
      request.on('done', () => {
        this.active = null
        resolve({ columns, rows, truncated, affected })
      })
      request.query(statement)
    })
  }

  /**
   * Run statements without opening a transaction.
   * @param {string[]} statements - already-split statements.
   * @returns {Promise<{ results: object[], durationMs: number }>} one result per statement.
   */
  async runStatements(statements) {
    const started = Date.now()
    /** @type {object[]} */
    const results = []
    for (const statement of statements) {
      const statementStart = Date.now()
      try {
        const outcome = await this.streamStatement(statement)
        results.push({
          statement,
          columns: outcome.columns,
          rows: outcome.rows,
          rowCount: outcome.rows.length,
          truncated: outcome.truncated,
          affected: outcome.affected,
          durationMs: Date.now() - statementStart,
        })
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
      } finally {
        this.active = null
      }
    }
    return { results, durationMs: Date.now() - started }
  }
  /**
   * Abort the request this driver is currently running.
   *
   * `tedious` cancels client-side, so the batch stops on the server too.
   * @returns {Promise<{ cancelled: boolean, reason?: string }>} the outcome.
   */
  async cancelQuery() {
    const request = this.active
    if (!request) return { cancelled: false, reason: 'nothing is running' }
    try {
      request.cancel()
      return { cancelled: true }
    } catch (error) {
      return { cancelled: false, reason: error instanceof Error ? error.message : String(error) }
    }
  }

  /**
   * List server principals.
   * @returns {Promise<object[]>} accounts.
   */
  async accounts() {
    const result = await this.handle().request().query(
      `SELECT name AS name, '' AS host, type_desc AS plugin, is_disabled AS locked
       FROM sys.server_principals WHERE type IN ('S','U','G') ORDER BY name`,
    )
    return result.recordset.map((row) => ({
      name: String(row.name),
      host: String(row.host ?? ''),
      plugin: String(row.plugin ?? ''),
      locked: Boolean(Number(row.locked ?? 0)),
      privileged: false,
    }))
  }
  /**
   * List procedures and functions.
   * @returns {Promise<object[]>} routines.
   */
  async routines() {
    const result = await this.handle().request().query(
      `SELECT o.name AS name,
              CASE o.type WHEN 'P' THEN 'PROCEDURE' ELSE 'FUNCTION' END AS kind,
              '' AS "returnType", 'T-SQL' AS language,
              OBJECT_DEFINITION(o.object_id) AS definition
       FROM sys.objects o WHERE o.type IN ('P', 'FN', 'IF', 'TF') ORDER BY o.name`,
    )
    return result.recordset.map((row) => ({
      name: String(row.name),
      kind: String(row.kind ?? '').toUpperCase() === 'PROCEDURE' ? 'procedure' : 'function',
      returnType: String(row.returnType ?? ''),
      language: String(row.language ?? ''),
      definition: String(row.definition ?? ''),
    }))
  }
}

/**
 * Build an unopened SQL Server driver.
 * @param {object} connection - normalized connection record.
 * @returns {SqlServerDriver} the driver.
 */
export function create(connection) {
  return new SqlServerDriver(connection)
}
