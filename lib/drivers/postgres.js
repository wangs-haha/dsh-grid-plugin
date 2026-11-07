/**
 * PostgreSQL adapter over `pg`.
 *
 * A connection is bound to one database, so the tree exposes schemas beneath it
 * and every table operation carries both parts.
 */

import { limitClause, orderByClause, qualify, quoteIdent, toJsonRow } from '../query.js'
import { buildPostgresDdl, buildPostgresViewDdl } from './postgres-ddl.js'
import { queryTimeoutMs } from './options.js'
import { tlsOptions } from './tls.js'
import { GridError } from '../errors.js'

/** Row cap for one `exec` result set. */
const MAX_ROWS = 2000

/** Schemas that only describe the system. */
const SYSTEM_SCHEMAS = new Set(['pg_catalog', 'information_schema', 'pg_toast'])

/**
 * Common built-in type OIDs.
 *
 * `pg` exposes the OID of every result column; showing `23` in a grid is worse
 * than showing nothing, and the numeric-alignment check needs a name.
 */
const TYPE_OIDS = {
  16: 'boolean',
  17: 'bytea',
  18: 'char',
  19: 'name',
  20: 'bigint',
  21: 'smallint',
  23: 'integer',
  24: 'regproc',
  25: 'text',
  26: 'oid',
  114: 'json',
  142: 'xml',
  600: 'point',
  650: 'cidr',
  700: 'real',
  701: 'double precision',
  790: 'money',
  829: 'macaddr',
  869: 'inet',
  1042: 'char',
  1043: 'varchar',
  1082: 'date',
  1083: 'time',
  1114: 'timestamp',
  1184: 'timestamptz',
  1186: 'interval',
  1266: 'timetz',
  1700: 'numeric',
  2950: 'uuid',
  3802: 'jsonb',
  3904: 'int4range',
  3906: 'numrange',
  3908: 'tsrange',
}

/**
 * Turn one result-column OID into a type name.
 * @param {number} oid - `field.dataTypeID`.
 * @returns {string} the type name, or `oid:<n>` when unknown.
 */
function typeName(oid) {
  const id = Number(oid)
  const known = TYPE_OIDS[id]
  if (known) return known
  return Number.isInteger(id) && id > 0 ? `oid:${id}` : ''
}

export class PostgresDriver {
  /**
   * @param {object} connection - normalized connection record.
   */
  constructor(connection) {
    this.connection = connection
    this.engine = 'postgres'
    /** @type {import('pg').Client|null} */
    this.client = null
    /** Server-side process id, used to cancel a running statement. */
    this.pid = 0
    this.version = ''
  }

  /**
   * The settings a client needs, reused when opening a side connection for a
   * cancel request.
   * @returns {object} `pg` client options.
   */
  clientConfig() {
    const { connection } = this
    return {
      host: connection.host,
      port: connection.port || 5432,
      user: connection.user || undefined,
      password: connection.password || undefined,
      database: connection.database || undefined,
      connectionTimeoutMillis: 10_000,
      ...(tlsOptions(connection) ? { ssl: tlsOptions(connection) } : {}),
    }
  }

  /**
   * Open one client.
   * @returns {Promise<string>} the server version.
   */
  async open() {
    const { Client } = await import('pg')
    const { connection } = this
    this.client = new Client(this.clientConfig())
    // Absorb asynchronous/idle socket errors (like ECONNRESET) to prevent Node uncaughtException from crashing DSH
    this.client.on('error', () => {
      // The socket died or was reset; withSession/acquire will reconnect on next call
    })
    await this.client.connect()
    // `statement_timeout` is enforced by the server, so a runaway query is
    // stopped even if the panel, the agent or the socket has already given up.
    await this.client.query(`SET statement_timeout = ${queryTimeoutMs(connection)}`)
    const pid = await this.client.query('SELECT pg_backend_pid() AS pid')
    this.pid = Number(pid.rows?.[0]?.pid) || 0
    const result = await this.client.query('SHOW server_version')
    this.version = `PostgreSQL ${result.rows?.[0]?.server_version ?? ''}`.trim()
    return this.version
  }

  /**
   * Ask the server to cancel whatever this connection is running.
   *
   * `pg_cancel_backend` has to be issued by a *different* session, so this opens
   * a short side connection; the cancelled query's own connection stays usable.
   * @returns {Promise<{ cancelled: boolean, reason?: string }>} the outcome.
   */
  async cancelQuery() {
    if (!this.pid) return { cancelled: false, reason: 'the connection is not open' }
    const { Client } = await import('pg')
    const side = new Client(this.clientConfig())
    side.on('error', () => {})
    try {
      await side.connect()
      const result = await side.query('SELECT pg_cancel_backend($1) AS cancelled', [this.pid])
      return { cancelled: result.rows?.[0]?.cancelled === true }
    } catch (error) {
      return { cancelled: false, reason: error instanceof Error ? error.message : String(error) }
    } finally {
      await side.end().catch(() => undefined)
    }
  }

  /** @returns {Promise<void>} resolves after the client is ended. */
  async close() {
    if (this.client) {
      const client = this.client
      this.client = null
      client.removeAllListeners?.('error')
      client.on?.('error', () => {})
      try {
        await client.end()
      } catch {
        // Already terminated by the server.
      }
    }
  }

  /** @returns {import('pg').Client} the open client. */
  handle() {
    if (!this.client) throw new Error('the PostgreSQL connection is not open')
    return this.client
  }

  /** @returns {Promise<string>} the server version. */
  async serverVersion() {
    return this.version
  }

  /**
   * Report the connected database with its user schemas.
   * @returns {Promise<Array<{ name: string, schemas: string[] }>>}
   */
  async databases() {
    const handle = this.handle()
    const current = await handle.query('SELECT current_database() AS name')
    const schemas = await handle.query(
      "SELECT nspname FROM pg_namespace WHERE nspname NOT LIKE 'pg\\_%' AND nspname <> 'information_schema' ORDER BY nspname",
    )
    const names = schemas.rows.map((row) => String(row.nspname)).filter((name) => !SYSTEM_SCHEMAS.has(name))
    return [{ name: String(current.rows[0]?.name ?? this.connection.database ?? ''), schemas: names }]
  }

  /**
   * List tables and views of one schema.
   * @param {{ schema?: string }} scope - target schema.
   * @returns {Promise<Array<{ name: string, kind: string, rows: number|null, comment: string }>>}
   */
  async tables(scope = {}) {
    const schema = scope.schema || 'public'
    const result = await this.handle().query(
      `SELECT c.relname AS name,
              CASE c.relkind WHEN 'v' THEN 'VIEW' WHEN 'm' THEN 'MATERIALIZED VIEW'
                             WHEN 'f' THEN 'FOREIGN TABLE' ELSE 'BASE TABLE' END AS kind,
              CASE WHEN c.reltuples < 0 THEN NULL ELSE c.reltuples::bigint END AS "rows",
              obj_description(c.oid, 'pg_class') AS comment
       FROM pg_class c
       JOIN pg_namespace n ON n.oid = c.relnamespace
       WHERE n.nspname = $1 AND c.relkind IN ('r', 'p', 'v', 'm', 'f')
       ORDER BY c.relkind, c.relname`,
      [schema],
    )
    return result.rows.map((row) => ({
      name: String(row.name),
      kind: String(row.kind ?? '').toUpperCase().includes('VIEW') ? 'view' : 'table',
      rows: row.rows === null || row.rows === undefined ? null : Number(row.rows),
      comment: String(row.comment ?? ''),
    }))
  }

  /**
   * Describe one table.
   *
   * The DDL is assembled from the catalogue (real types, identity, generated
   * columns, constraints, indexes, comments) rather than guessed from
   * `information_schema`, which knows none of those.
   * @param {{ schema?: string, table: string }} scope - target table.
   * @returns {Promise<{ columns: object[], indexes: object[], ddl: string }>}
   */
  async describe(scope) {
    const schema = scope.schema || 'public'
    const handle = this.handle()
    const regclass = qualify('postgres', [schema, scope.table])

    const columnResult = await handle.query(
      `SELECT a.attname AS name,
              format_type(a.atttypid, a.atttypmod) AS type,
              a.attnotnull AS "notNull",
              a.attidentity AS identity,
              a.attgenerated AS generated,
              pg_get_expr(d.adbin, d.adrelid) AS "defaultDef",
              col_description(a.attrelid, a.attnum) AS comment,
              a.attnum AS ordinal
       FROM pg_attribute a
       LEFT JOIN pg_attrdef d ON d.adrelid = a.attrelid AND d.adnum = a.attnum
       WHERE a.attrelid = $1::regclass AND a.attnum > 0 AND NOT a.attisdropped
       ORDER BY a.attnum`,
      [regclass],
    )

    // A view is not a table: it has no constraints and its DDL is its definition.
    const kindResult = await handle
      .query(
        `SELECT c.relkind AS kind, pg_get_viewdef(c.oid, true) AS viewdef
         FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
         WHERE n.nspname = $1 AND c.relname = $2`,
        [schema, scope.table],
      )
      .catch(() => ({ rows: [] }))
    const relkind = String(kindResult.rows?.[0]?.kind ?? '')
    const isView = relkind === 'v' || relkind === 'm'

    const constraintResult = await handle
      .query(
        // `conkey` is the constraint's column list as attribute numbers; parsing
        // the definition text instead would break, because `pg_get_constraintdef`
        // only quotes identifiers when they need it.
        `SELECT conname AS name, contype AS type, pg_get_constraintdef(oid) AS definition,
                conkey::int2[] AS cols
         FROM pg_constraint WHERE conrelid = $1::regclass ORDER BY contype, conname`,
        [regclass],
      )
      .catch(() => ({ rows: [] }))
    const constraints = constraintResult.rows.map((row) => ({
      name: String(row.name),
      type: String(row.type),
      definition: String(row.definition ?? ''),
    }))

    // A primary key whose columns are known lets the grid address single rows.
    const nameOfAttr = new Map(columnResult.rows.map((row) => [Number(row.ordinal), String(row.name)]))
    const primary = new Set()
    for (const row of constraintResult.rows) {
      if (String(row.type) !== 'p') continue
      for (const attr of Array.isArray(row.cols) ? row.cols : []) {
        const name = nameOfAttr.get(Number(attr))
        if (name) primary.add(name)
      }
    }

    const columns = columnResult.rows.map((row) => ({
      name: String(row.name),
      type: String(row.type ?? ''),
      nullable: !row.notNull,
      defaultValue: row.defaultDef === null || row.defaultDef === undefined ? null : String(row.defaultDef),
      primaryKey: primary.has(String(row.name)),
      ordinal: Number(row.ordinal ?? 0),
      comment: String(row.comment ?? ''),
      extra: row.identity ? 'identity' : row.generated ? 'generated' : '',
    }))

    // The composer needs the raw catalogue fields (identity, generated, the
    // default expression), not the projection the panel renders.
    const ddlColumns = columnResult.rows.map((row) => ({
      name: String(row.name),
      type: String(row.type ?? ''),
      notNull: row.notNull === true,
      identity: String(row.identity ?? ''),
      generated: String(row.generated ?? ''),
      defaultDef: row.defaultDef === null || row.defaultDef === undefined ? null : String(row.defaultDef),
      comment: String(row.comment ?? ''),
    }))

    /** @type {object[]} */
    const indexes = []
    /** @type {object[]} */
    const indexStatements = []
    try {
      const indexResult = await handle.query(
        `SELECT indexname AS name, indexdef AS definition FROM pg_indexes
         WHERE schemaname = $1 AND tablename = $2 ORDER BY indexname`,
        [schema, scope.table],
      )
      const constraintNames = new Set(constraints.map((constraint) => constraint.name))
      for (const row of indexResult.rows) {
        const definition = String(row.definition ?? '')
        const name = String(row.name)
        const match = /\(([^)]*)\)/.exec(definition)
        indexes.push({
          name,
          columns: match ? match[1].split(',').map((part) => part.trim().split(' ')[0].replace(/"/g, '')) : [],
          unique: /\bUNIQUE\b/i.test(definition),
          primary: constraintNames.has(name) && constraints.some((c) => c.name === name && c.type === 'p'),
        })
        // A constraint's index is recreated by the constraint itself, and
        // `pg_indexes` also lists the primary key under the constraint's name.
        if (constraintNames.has(name)) continue
        if (!/^CREATE\s+(UNIQUE\s+)?INDEX\b/i.test(definition)) continue
        indexStatements.push({ name, definition })
      }
    } catch {
      // Restricted accounts may lack pg_indexes visibility.
    }

    const tableComment = await handle
      .query(`SELECT obj_description($1::regclass, 'pg_class') AS comment`, [regclass])
      .then((result) => String(result.rows?.[0]?.comment ?? ''))
      .catch(() => '')

    return {
      columns,
      indexes,
      ddl: isView
        ? buildPostgresViewDdl({
            schema,
            table: scope.table,
            kind: relkind,
            definition: String(kindResult.rows?.[0]?.viewdef ?? ''),
            comment: tableComment,
          })
        : buildPostgresDdl({
            schema,
            table: scope.table,
            columns: ddlColumns,
            constraints,
            indexes: indexStatements,
            tableComment,
          }),
    }
  }

  /**
   * Approximate the number of rows in one table, from `pg_class.reltuples`.
   *
   * `reltuples` is what the planner believes: accurate after an `ANALYZE`, -1 for
   * a table that was never analysed.
   * @param {{ schema?: string, table: string }} scope - target table.
   * @returns {Promise<number|null>} the estimate, or null when unavailable.
   */
  async estimateRows(scope = {}) {
    const schema = scope.schema || 'public'
    try {
      const result = await this.handle().query(
        `SELECT c.reltuples::bigint AS rows
         FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
         WHERE n.nspname = $1 AND c.relname = $2`,
        [schema, scope.table],
      )
      const value = Number(result.rows?.[0]?.rows)
      return Number.isFinite(value) && value >= 0 ? value : null
    } catch {
      return null
    }
  }

  /**
   * Read one page of a table.
   * @param {{ schema?: string, table: string, page: number, pageSize: number,
   *   orderBy?: string, orderDir?: string, where?: string, count?: boolean }} query - page request.
   * @returns {Promise<object>} the page.
   */
  async select(query) {
    const started = Date.now()
    const schema = query.schema || 'public'
    const target = qualify('postgres', [schema, query.table])
    const filter = query.where ? ` WHERE ${query.where}` : ''
    const order = orderByClause('postgres', query.orderBy, query.orderDir)
    const page = Math.max(1, Math.trunc(Number(query.page) || 1))
    const size = Math.max(1, Math.min(1000, Math.trunc(Number(query.pageSize) || 100)))
    const tail = limitClause('postgres', size, (page - 1) * size, Boolean(order))

    const result = await this.handle().query(`SELECT * FROM ${target}${filter}${order}${tail}`)
    const columns = (result.fields ?? []).map((field) => ({ name: field.name, type: typeName(field.dataTypeID) }))
    let total = null
    if (query.count !== false) {
      const countResult = await this.handle().query(`SELECT COUNT(*) AS total FROM ${target}${filter}`)
      total = Number(countResult.rows?.[0]?.total ?? 0)
    }
    return {
      columns,
      rows: result.rows.map(toJsonRow),
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
    const schema = request.schema || 'public'
    const target = qualify('postgres', [schema, request.table])
    const values = []
    const sets = entries
      .map(([name, value]) => {
        values.push(value ?? null)
        return `${quoteIdent('postgres', name)} = $${values.length}`
      })
      .join(', ')
    const where = keyEntries
      .map(([name, value]) => {
        values.push(value ?? null)
        return `${quoteIdent('postgres', name)} = $${values.length}`
      })
      .join(' AND ')
    const result = await this.handle().query(`UPDATE ${target} SET ${sets} WHERE ${where}`, values)
    return { affected: Number(result.rowCount ?? 0) }
  }

  /**
   * Insert one row.
   *
   * With no values this inserts a row of defaults, which is what the grid's
   * "Insert row" button needs before the user has typed anything.
   * @param {{ schema?: string, table: string, values: object }} request - insert request.
   * @returns {Promise<{ affected: number }>}
   */
  async insert(request) {
    const entries = Object.entries(request.values ?? {})
    const schema = request.schema || 'public'
    const target = qualify('postgres', [schema, request.table])
    if (entries.length === 0) {
      const empty = await this.handle().query(`INSERT INTO ${target} DEFAULT VALUES`)
      return { affected: Number(empty.rowCount ?? 0) }
    }
    const names = entries.map(([name]) => quoteIdent('postgres', name)).join(', ')
    const holes = entries.map((_entry, index) => `$${index + 1}`).join(', ')
    const params = entries.map(([, value]) => value ?? null)
    const result = await this.handle().query(`INSERT INTO ${target} (${names}) VALUES (${holes})`, params)
    return { affected: Number(result.rowCount ?? 0) }
  }

  /**
   * Insert many rows in one transaction.
   * @param {{ schema?: string, table: string, rows: object[] }} request - the batch.
   * @returns {Promise<{ inserted: number }>}
   */
  async insertMany(request) {
    const rows = Array.isArray(request.rows) ? request.rows : []
    const handle = this.handle()
    await handle.query('BEGIN')
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
   * @param {{ schema?: string, table: string, key: object }} request - delete request.
   * @returns {Promise<{ affected: number }>}
   */
  async remove(request) {
    const keyEntries = Object.entries(request.key ?? {})
    if (keyEntries.length === 0) throw new GridError('this table has no primary key')
    const schema = request.schema || 'public'
    const target = qualify('postgres', [schema, request.table])
    const values = []
    const where = keyEntries
      .map(([name, value]) => {
        values.push(value ?? null)
        return `${quoteIdent('postgres', name)} = $${values.length}`
      })
      .join(' AND ')
    const result = await this.handle().query(`DELETE FROM ${target} WHERE ${where}`, values)
    return { affected: Number(result.rowCount ?? 0) }
  }

  /**
   * Execute a script, one result per statement.
   *
   * A read-only request runs inside `BEGIN READ ONLY`, so PostgreSQL rejects the
   * first write with `25006` even if the statement classifier missed it. The
   * transaction is always rolled back.
   * @param {string[]} statements - already-split statements.
   * @param {{ readOnly?: boolean }} [options] - execution options.
   * @returns {Promise<{ results: object[], durationMs: number }>}
   */
  async exec(statements, options = {}) {
    if (options.readOnly !== true) return this.runStatements(statements)
    const handle = this.handle()
    await handle.query('BEGIN READ ONLY')
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
        const result = await handle.query(statement)
        if (Array.isArray(result.fields) && result.fields.length > 0) {
          const rows = (result.rows ?? []).slice(0, MAX_ROWS).map(toJsonRow)
          results.push({
            statement,
            columns: result.fields.map((field) => ({ name: field.name, type: typeName(field.dataTypeID) })),
            rows,
            rowCount: rows.length,
            // PostgreSQL materialises the whole result, so saying it was capped is
            // the least the driver can do until a cursor is available.
            truncated: (result.rows?.length ?? 0) > MAX_ROWS,
            affected: Number(result.rowCount ?? 0),
            durationMs: Date.now() - statementStart,
          })
        } else {
          results.push({
            statement,
            columns: [],
            rows: [],
            rowCount: 0,
            affected: Number(result.rowCount ?? 0),
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
   * List functions and procedures of one schema.
   * @param {{ schema?: string }} scope - target schema.
   * @returns {Promise<object[]>} routines.
   */
  async routines(scope = {}) {
    const schema = scope.schema || 'public'
    const result = await this.handle().query(
      `SELECT p.proname AS name,
              CASE p.prokind WHEN 'p' THEN 'PROCEDURE' ELSE 'FUNCTION' END AS kind,
              pg_get_function_result(p.oid) AS "returnType",
              l.lanname AS language,
              pg_get_functiondef(p.oid) AS definition
       FROM pg_proc p
       JOIN pg_namespace n ON n.oid = p.pronamespace
       JOIN pg_language l ON l.oid = p.prolang
       WHERE n.nspname = $1
       ORDER BY p.proname`,
      [schema],
    )
    return result.rows.map((row) => ({
      name: String(row.name),
      kind: String(row.kind ?? '').toUpperCase() === 'PROCEDURE' ? 'procedure' : 'function',
      returnType: String(row.returnType ?? ''),
      language: String(row.language ?? ''),
      definition: String(row.definition ?? ''),
    }))
  }

  /**
   * List roles.
   * @returns {Promise<object[]>} accounts.
   */
  async accounts() {
    const result = await this.handle().query(
      `SELECT rolname AS name, '' AS host, '' AS plugin,
              rolcanlogin AS privileged, NOT rolcanlogin AS locked
       FROM pg_roles ORDER BY rolname`,
    )
    return result.rows.map((row) => ({
      name: String(row.name),
      host: String(row.host ?? ''),
      plugin: String(row.plugin ?? ''),
      locked: Boolean(row.locked),
      privileged: Boolean(row.privileged),
    }))
  }
}

/**
 * Build an unopened PostgreSQL driver.
 * @param {object} connection - normalized connection record.
 * @returns {PostgresDriver} the driver.
 */
export function create(connection) {
  return new PostgresDriver(connection)
}
