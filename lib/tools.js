/**
 * Agent tools.
 *
 * Four tools cover the whole surface: discover, describe, read, write. They go
 * through the same router as the browser, so a connection the user configured
 * is immediately queryable by the model. Writes are gated on `allowWrites`.
 */

import { isReadOnly, splitStatements } from './query.js'

/** Rows rendered into the text block of one result. */
const RENDER_ROWS = 50

/** Longest cell kept in the rendered text block. */
const CELL_LIMIT = 60

/** Largest result table returned to the model. */
const RESULT_ROWS = 200

/**
 * Render one value for a fixed-width text table.
 * @param {unknown} value - cell value.
 * @returns {string} the cell text.
 */
function cell(value) {
  if (value === null || value === undefined) return 'NULL'
  const text = typeof value === 'object' ? JSON.stringify(value) : String(value)
  return text.length > CELL_LIMIT ? `${text.slice(0, CELL_LIMIT - 1)}…` : text
}

/**
 * Render a result set as an aligned plain-text table.
 * @param {Array<{ name: string }>} columns - column metadata.
 * @param {object[]} rows - result rows.
 * @param {number} [maxRows] - rows to include.
 * @returns {string} the text block.
 */
export function formatTable(columns, rows, maxRows = RENDER_ROWS) {
  if (!columns || columns.length === 0) return '(no columns)'
  const names = columns.map((column) => column.name)
  const body = (rows ?? []).slice(0, maxRows).map((row) => names.map((name) => cell(row[name])))
  const widths = names.map((name, index) =>
    Math.min(CELL_LIMIT, Math.max(name.length, ...body.map((line) => line[index].length))),
  )
  const line = (values) =>
    values.map((value, index) => value.padEnd(widths[index])).join(' | ').trimEnd()
  const parts = [line(names), widths.map((width) => '-'.repeat(width)).join('-+-')]
  for (const values of body) parts.push(line(values))
  if ((rows?.length ?? 0) > maxRows) parts.push(`… ${rows.length - maxRows} more row(s)`)
  return parts.join('\n')
}

/**
 * Summarize one SQL result for the model.
 * @param {object} result - one entry of `driver.exec`'s results.
 * @returns {string} the human-readable summary.
 */
function describeResult(result, index) {
  const header = `-- statement ${index + 1}: ${result.statement.replace(/\s+/g, ' ').slice(0, 200)}`
  if (result.error) return `${header}\nERROR: ${result.error}`
  if (!result.columns || result.columns.length === 0) {
    return `${header}\n${result.affected ?? 0} row(s) affected (${result.durationMs} ms)`
  }
  const shown = result.rows.slice(0, RENDER_ROWS)
  const table = formatTable(result.columns, shown)
  const tail = result.rows.length > shown.length ? `\n(${result.rows.length} row(s) shown, capped)` : ''
  return `${header}\n${table}${tail}`
}

/**
 * Run one promise, but stop waiting when the tool call is aborted.
 * @param {Promise<T>} work - the in-flight operation.
 * @param {AbortSignal|undefined} signal - the tool call's signal.
 * @param {() => void} [onAbort] - runs when the signal fires.
 * @returns {Promise<T>} the work result.
 * @template T
 */
function withAbort(work, signal, onAbort) {
  if (!signal || typeof signal.addEventListener !== 'function') return work
  if (signal.aborted) {
    onAbort?.()
    return Promise.reject(new Error('aborted'))
  }
  return new Promise((resolve, reject) => {
    const onSignal = () => {
      onAbort?.()
      reject(new Error('aborted'))
    }
    signal.addEventListener('abort', onSignal, { once: true })
    work.then(
      (value) => {
        signal.removeEventListener('abort', onSignal)
        resolve(value)
      },
      (error) => {
        signal.removeEventListener('abort', onSignal)
        reject(error)
      },
    )
  })
}

/**
 * Register the Grid tools.
 * @param {{ tools: import('@deepseek-ai/cordis').Context['tools'], dispatch: Function,
 *   allowWrites?: boolean, log?: (message: string) => void }} options - registration inputs.
 * @returns {Array<() => void>} disposers, one per tool.
 */
export function registerGridTools(options) {
  const { tools, dispatch, allowWrites = false, resolveBinding } = options
  const disposers = []

  disposers.push(
    tools.register({
      name: 'grid_list_connections',
      description:
        'List the database connections configured in the DSH Grid plugin: id, engine, host/file and whether a ' +
        'session is currently open. Use this before grid_inspect or grid_query when you do not know which ' +
        'connection to target. Passwords are never returned.',
      parameters: {
        type: 'object',
        properties: {},
        additionalProperties: false,
      },
      output: {
        schema: { type: 'object', additionalProperties: true },
        render: (_args, value) => {
          const connections = value?.connections ?? []
          if (connections.length === 0) {
            return [{ type: 'text', text: 'No database connections are configured in Grid yet.' }]
          }
          const lines = connections.map((connection) => {
            const target = connection.engine === 'sqlite'
              ? connection.file
              : `${connection.host}:${connection.port}${connection.database ? `/${connection.database}` : ''}`
            const state = connection.connected ? '[open]' : '[closed]'
            const version = connection.serverVersion ? ` ${connection.serverVersion}` : ''
            return `${connection.id}  ${connection.engine.padEnd(9)} ${connection.name} — ${target} ${state}${version}` +
              (connection.hasPassword ? '' : ' [no password]')
          })
          return [{ type: 'text', text: lines.join('\n') }]
        },
      },
      async execute() {
        const payload = await dispatch('connections.list', {})
        const sessions = new Map((await dispatch('connections.sessions', {})).sessions.map((s) => [s.id, s]))
        return {
          connections: payload.connections.map((connection) => ({
            id: connection.id,
            name: connection.name,
            engine: connection.engine,
            host: connection.host,
            port: connection.port,
            database: connection.database,
            file: connection.file,
            hasPassword: connection.hasPassword,
            connected: sessions.has(connection.id),
            serverVersion: sessions.get(connection.id)?.version ?? '',
          })),
        }
      },
    }),
  )

  disposers.push(
    tools.register({
      name: 'grid_inspect',
      description:
        'Inspect a database through the DSH Grid plugin. Without `table` it lists databases, schemas and tables; ' +
        'with `table` it returns that table\'s columns, indexes and DDL. Read-only. Use it to learn a schema ' +
        'before writing SQL, then run the query with grid_query.',
      parameters: {
        type: 'object',
        properties: {
          connectionId: {
            type: 'string',
            description:
              'Connection id from grid_list_connections. Optional: a workspace bound to a database in the Grid panel supplies it.',
          },
          database: { type: 'string', description: 'Database name (MySQL/PostgreSQL/SQL Server). Omit for the default.' },
          schema: { type: 'string', description: 'Schema name (PostgreSQL/SQL Server). Omit for the default.' },
          table: { type: 'string', description: 'Table or view name. Omit to list tables instead.' },
        },
        additionalProperties: false,
      },
      output: {
        schema: { type: 'object', additionalProperties: true },
        render: (_args, value) => {
          if (value.kind === 'table') {
            const header = `${value.table} — ${value.columns.length} column(s)`
            const rows = value.columns.map((column) => ({
              column: String(column.name),
              type: String(column.type || ''),
              nullable: column.nullable ? 'YES' : 'NO',
              key: column.primaryKey ? 'PK' : '',
            }))
            const table = formatTable(
              [{ name: 'column' }, { name: 'type' }, { name: 'nullable' }, { name: 'key' }],
              rows,
              200,
            )
            const indexes = (value.indexes || []).length
              ? '\n\nindexes: ' + value.indexes.map((index) => `${index.name}(${(index.columns || []).join(', ')})${index.unique ? ' UNIQUE' : ''}`).join(', ')
              : ''
            return [{ type: 'text', text: `${header}\n\n${table}${indexes}` }]
          }
          const lines = []
          for (const database of value.databases ?? []) {
            lines.push(`database: ${database.name}`)
            if (database.schemas?.length) lines.push(`  schemas: ${database.schemas.join(', ')}`)
          }
          if (value.tables?.length) {
            lines.push('')
            lines.push(`${value.tables.length} table(s) in ${value.database || value.schema || 'default'}:`)
            lines.push(value.tables.map((table) => `${table.name}${table.kind === 'view' ? ' (view)' : ''}`).join(', '))
          }
          return [{ type: 'text', text: lines.join('\n') || '(empty)' }]
        },
      },
      async execute(args, exec) {
        let connectionId = String(args.connectionId ?? '')
        let binding = null
        if (!connectionId && typeof resolveBinding === 'function') {
          binding = await resolveBinding(exec?.agent)
          if (binding) connectionId = binding.connectionId
        }
        if (!connectionId) {
          throw new Error('connectionId is required, or bind this workspace to a database in the Grid panel')
        }
        // The binding records which database the workspace belongs to; dropping it
        // made a bound workspace silently inspect whatever the default is.
        const database = String(args.database ?? '') || String(binding?.database ?? '')
        const schema = String(args.schema ?? '')
        const table = String(args.table ?? '')
        if (!table) {
          const { databases } = await dispatch('databases', { connectionId })
          // An explicitly named database wins even when the server did not list
          // it: silently inspecting a different one is worse than reporting that
          // the name is wrong.
          const chosen = database
            ? databases.find((entry) => entry.name === database) ?? { name: database, schemas: [] }
            : databases[0]
          if (!chosen) return { kind: 'list', databases: [], tables: [], database, schema }
          const effectiveSchema = schema || chosen.schemas?.[0] || ''
          const { tables } = await dispatch('tables', {
            connectionId,
            database: chosen.name,
            schema: effectiveSchema,
          })
          return {
            kind: 'list',
            databases,
            database: chosen.name,
            schema: effectiveSchema,
            tables: tables.slice(0, 500),
          }
        }
        const description = await dispatch('columns', { connectionId, database, schema, table })
        return {
          kind: 'table',
          database,
          schema,
          table,
          columns: description.columns,
          indexes: description.indexes,
          ddl: String(description.ddl ?? '').slice(0, 20_000),
        }
      },
    }),
  )

  disposers.push(
    tools.register({
      name: 'grid_query',
      description:
        'Run read-only SQL through the DSH Grid plugin and return every result set as a text table. Only ' +
        'SELECT / WITH … SELECT / SHOW / DESCRIBE / EXPLAIN / PRAGMA / VALUES statements are accepted. Use ' +
        'grid_inspect first when you do not know the schema.',
      parameters: {
        type: 'object',
        properties: {
          connectionId: {
            type: 'string',
            description:
              'Connection id from grid_list_connections. Optional: a workspace bound to a database in the Grid panel supplies it.',
          },
          sql: { type: 'string', description: 'The SQL to run. Multiple statements separated by ; are allowed.' },
          queryName: {
            type: 'string',
            description: 'Run a saved query by name instead of inline SQL (see grid_save_query).',
          },
          database: { type: 'string', description: 'Database to switch to before running.' },
        },
        additionalProperties: false,
      },
      output: {
        schema: { type: 'object', additionalProperties: true },
        render: (_args, value) => {
          if (value.error) return [{ type: 'text', text: `Query failed: ${value.error}` }]
          return [{ type: 'text', text: value.text }]
        },
      },
      async execute(args, exec) {
        let connectionId = String(args.connectionId ?? '')
        let sql = String(args.sql ?? '')
        if (!sql.trim() && args.queryName) {
          const { queries } = await dispatch('queries.list', {})
          const found = queries.find(
            (query) => query.name === String(args.queryName) && (!connectionId || query.connectionId === connectionId),
          )
          if (!found) return { error: 'no saved query named "' + String(args.queryName) + '"', text: '' }
          sql = found.sql
          connectionId = connectionId || found.connectionId
        }
        let binding = null
        if (!connectionId && typeof resolveBinding === 'function') {
          binding = await resolveBinding(exec?.agent)
          if (binding) connectionId = binding.connectionId
        }
        if (!connectionId) {
          throw new Error('connectionId is required, or bind this workspace to a database in the Grid panel')
        }
        if (!sql.trim()) throw new Error('sql is required')
        if (exec?.signal?.aborted) throw new Error('aborted')
        const statements = splitStatements(sql)
        const write = statements.find((statement) => !isReadOnly(statement))
        if (write) {
          return {
            error: 'grid_query is read-only. Use grid_execute (which requires allowWrites) for statements that modify data.',
            text: '',
          }
        }
        let result
        try {
          result = await withAbort(
            dispatch('sql', {
              connectionId,
              database: String(args.database ?? '') || String(binding?.database ?? ''),
              sql,
              readOnly: true,
            }),
            exec?.signal,
            // Abandoning the call is not enough: the statement keeps running on
            // the server unless it is cancelled too.
            () => {
              void dispatch('sql.cancel', { connectionId }).catch(() => undefined)
            },
          )
        } catch (error) {
          return { error: error instanceof Error ? error.message : String(error), text: '' }
        }
        const blocks = result.results.map((entry, index) => describeResult(entry, index))
        const firstError = result.results.find((entry) => entry.error)
        return {
          statementCount: result.statementCount,
          durationMs: result.durationMs,
          error: firstError ? firstError.error : '',
          text: blocks.join('\n\n'),
          results: result.results.map((entry) => ({
            statement: entry.statement.slice(0, 500),
            columns: entry.columns.map((column) => column.name),
            rows: entry.rows.slice(0, RESULT_ROWS),
            rowCount: entry.rowCount,
            error: entry.error ?? '',
          })),
        }
      },
      timeoutMs: 30_000,
    }),
  )

  disposers.push(
    tools.register({
      name: 'grid_execute',
      description:
        'Run SQL that may modify data or schema through the DSH Grid plugin. Disabled unless the plugin config ' +
        'sets allowWrites: true. Prefer grid_query for reads; use this for INSERT / UPDATE / DELETE / DDL when ' +
        'the user explicitly asked for a change.',
      parameters: {
        type: 'object',
        properties: {
          connectionId: { type: 'string', description: 'Connection id from grid_list_connections.' },
          sql: { type: 'string', description: 'The SQL to run. Multiple statements separated by ; are allowed.' },
          database: { type: 'string', description: 'Database to switch to before running.' },
        },
        required: ['connectionId', 'sql'],
        additionalProperties: false,
      },
      output: {
        schema: { type: 'object', additionalProperties: true },
        render: (_args, value) => {
          if (value.error) return [{ type: 'text', text: `Execution failed: ${value.error}` }]
          return [{ type: 'text', text: value.text }]
        },
      },
      async execute(args, exec) {
        if (!allowWrites) {
          return {
            error: 'grid_execute is disabled. Set allowWrites: true on the grid plugin row in cordis.patch.yml to enable it.',
            text: '',
          }
        }
        let connectionId = String(args.connectionId ?? '')
        const sql = String(args.sql ?? '')
        if (!connectionId && typeof resolveBinding === 'function') {
          const binding = await resolveBinding(exec?.agent)
          if (binding) {
            return {
              error:
                'This workspace is bound to ' +
                binding.connectionId +
                ' for read-only access. Pass an explicit connectionId to write.',
              text: '',
            }
          }
        }
        if (!connectionId) throw new Error('connectionId is required')
        if (!sql.trim()) throw new Error('sql is required')
        let result
        try {
          result = await dispatch('sql', {
            connectionId,
            database: String(args.database ?? ''),
            sql,
            readOnly: false,
          })
        } catch (error) {
          return { error: error instanceof Error ? error.message : String(error), text: '' }
        }
        const blocks = result.results.map((entry, index) => describeResult(entry, index))
        const firstError = result.results.find((entry) => entry.error)
        return {
          statementCount: result.statementCount,
          durationMs: result.durationMs,
          error: firstError ? firstError.error : '',
          text: blocks.join('\n\n'),
        }
      },
      timeoutMs: 30_000,
    }),
  )

  disposers.push(
    tools.register({
      name: 'grid_save_query',
      description:
        'Save a named SQL query into Grid so the user can open and run it later from the Queries tab. Use this when ' +
        'the user asks you to keep a query, or when you wrote SQL worth reusing. Saving never executes anything.',
      parameters: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Short name shown in the Queries list.' },
          sql: { type: 'string', description: 'The SQL to store.' },
          connectionId: { type: 'string', description: 'Connection the query belongs to.' },
          database: { type: 'string', description: 'Database the query targets.' },
        },
        required: ['name', 'sql'],
        additionalProperties: false,
      },
      output: {
        schema: { type: 'object', additionalProperties: true },
        render: (_args, value) => [
          {
            type: 'text',
            text: value.error
              ? 'Could not save the query: ' + value.error
              : 'Saved query "' + value.query.name + '" (id ' + value.query.id + '). Open it from the Queries tab, or run it with grid_query queryName="' + value.query.name + '".',
          },
        ],
      },
      async execute(args) {
        const name = String(args.name ?? '').trim()
        const sql = String(args.sql ?? '').trim()
        if (!name) return { error: 'name is required' }
        if (!sql) return { error: 'sql is required' }
        try {
          const payload = await dispatch('queries.save', {
            name,
            sql,
            connectionId: String(args.connectionId ?? ''),
            database: String(args.database ?? ''),
            scope: 'agent',
          })
          return { query: payload.query }
        } catch (error) {
          return { error: error instanceof Error ? error.message : String(error) }
        }
      },
    }),
  )

  return disposers
}
