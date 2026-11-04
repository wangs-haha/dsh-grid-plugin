/** Thin typed wrapper over the authenticated Host route. */

import type {
  Account,
  Connection,
  ConnectionInput,
  DatabaseNode,
  DescribeResult,
  EngineInfo,
  Meta,
  ProjectBinding,
  RelationNode,
  RowsResult,
  Routine,
  SavedQuery,
  SessionInfo,
  SqlResult,
} from './types'

/** Error carrying the Host's message and HTTP status. */
export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

/** Document-relative path of the authenticated route. */
const DEFAULT_PATH = 'api/grid'

export class GridApi {
  constructor(private readonly path: string = DEFAULT_PATH) {}

  /**
   * Call one action.
   * @param action - Host action name.
   * @param payload - extra fields merged into the request body.
   * @param signal - cancels the request when a newer one supersedes it.
   */
  async call<T>(action: string, payload: Record<string, unknown> = {}, signal?: AbortSignal): Promise<T> {
    let response: Response
    try {
      response = await fetch(this.path, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ action, ...payload }),
        ...(signal ? { signal } : {}),
      })
    } catch (error) {
      // Let callers tell "the user moved on" apart from a real failure.
      if (error instanceof DOMException && error.name === 'AbortError') throw error
      throw new ApiError(error instanceof Error ? error.message : String(error), 0)
    }
    let body: unknown = null
    try {
      body = await response.json()
    } catch {
      body = null
    }
    const record = (body && typeof body === 'object' ? body : {}) as Record<string, unknown>
    if (!response.ok || record.error) {
      throw new ApiError(String(record.error ?? `request failed (${response.status})`), response.status)
    }
    return record as T
  }

  meta(): Promise<Meta> {
    return this.call<Meta>('meta')
  }

  listConnections(): Promise<{ connections: Connection[] }> {
    return this.call('connections.list')
  }

  createConnection(connection: ConnectionInput): Promise<{ connection: Connection; probe: ProbeResult }> {
    return this.call('connections.create', { connection })
  }

  updateConnection(id: string, patch: ConnectionInput): Promise<{ connection: Connection }> {
    return this.call('connections.update', { id, patch })
  }

  deleteConnection(id: string): Promise<{ deleted: boolean }> {
    return this.call('connections.delete', { id })
  }

  testConnection(id: string): Promise<ProbeResult> {
    return this.call('connections.test', { id })
  }

  testDraft(connection: ConnectionInput, id?: string): Promise<ProbeResult> {
    return this.call('connections.test', { connection, ...(id ? { id } : {}) })
  }

  connect(id: string): Promise<{ ok: boolean; serverVersion: string; engine: string }> {
    return this.call('connections.connect', { id })
  }

  disconnect(id: string): Promise<{ ok: boolean }> {
    return this.call('connections.disconnect', { id })
  }

  sessions(): Promise<{ sessions: SessionInfo[] }> {
    return this.call('connections.sessions')
  }

  databases(connectionId: string): Promise<{ databases: DatabaseNode[] }> {
    return this.call('databases', { connectionId })
  }

  relations(connectionId: string, database: string, schema: string): Promise<{ tables: RelationNode[] }> {
    return this.call('tables', { connectionId, database, schema })
  }

  describe(connectionId: string, database: string, schema: string, table: string): Promise<DescribeResult> {
    return this.call('columns', { connectionId, database, schema, table })
  }

  rows(
    options: {
      connectionId: string
      database: string
      schema: string
      table: string
      page: number
      pageSize: number
      orderBy?: string
      orderDir?: string
      where?: string
      /** How to obtain the row total: engine estimate, exact count, or not at all. */
      total?: 'auto' | 'exact' | 'none'
    },
    signal?: AbortSignal,
  ): Promise<RowsResult> {
    return this.call('rows', options, signal)
  }

  updateRow(options: {
    connectionId: string
    database: string
    schema: string
    table: string
    key: Record<string, unknown>
    changes: Record<string, unknown>
  }): Promise<{ affected: number }> {
    return this.call('rows.update', options)
  }

  insertRow(options: {
    connectionId: string
    database: string
    schema: string
    table: string
    values: Record<string, unknown>
  }): Promise<{ affected: number }> {
    return this.call('rows.insert', options)
  }

  /** Insert a batch in one transaction; either all rows land or none do. */
  insertRows(options: {
    connectionId: string
    database: string
    schema: string
    table: string
    rows: Record<string, unknown>[]
  }): Promise<{ inserted: number }> {
    return this.call('rows.insertMany', options)
  }

  deleteRow(options: {
    connectionId: string
    database: string
    schema: string
    table: string
    key: Record<string, unknown>
  }): Promise<{ affected: number }> {
    return this.call('rows.delete', options)
  }

  exportRows(options: {
    connectionId: string
    database: string
    schema: string
    table: string
    where?: string
    orderBy?: string
    orderDir?: string
  }): Promise<{ columns: ResultColumnLike[]; rows: Record<string, unknown>[]; truncated: boolean; total: number }> {
    return this.call('export', options)
  }

  sql(options: { connectionId: string; database: string; sql: string; readOnly?: boolean }): Promise<SqlResult> {
    return this.call('sql', options)
  }

  /** Ask the Host to stop the statement the query connection is running. */
  sqlCancel(connectionId: string): Promise<{ cancelled: boolean; reason?: string }> {
    return this.call('sql.cancel', { connectionId })
  }

  routines(connectionId: string, database: string, schema: string): Promise<{ routines: Routine[] }> {
    return this.call('routines', { connectionId, database, schema })
  }

  accounts(connectionId: string): Promise<{ accounts: Account[] }> {
    return this.call('accounts', { connectionId })
  }

  listQueries(): Promise<{ queries: SavedQuery[] }> {
    return this.call('queries.list')
  }

  saveQuery(query: { name: string; sql: string; connectionId: string; database: string; scope?: 'user' | 'agent' }): Promise<{ query: SavedQuery }> {
    return this.call('queries.save', query)
  }

  deleteQuery(id: string): Promise<{ deleted: boolean }> {
    return this.call('queries.delete', { id })
  }

  bindProject(binding: {
    workspaceId: string
    workspacePath: string
    connectionId: string
    database: string
  }): Promise<{ binding: ProjectBinding }> {
    return this.call('projects.bind', binding)
  }

  unbindProject(workspaceId: string): Promise<{ ok: boolean }> {
    return this.call('projects.unbind', { workspaceId })
  }

  redisDatabases(connectionId: string): Promise<{ databases: DatabaseNode[] }> {
    return this.call('redis.databases', { connectionId })
  }

  redisScan(options: {
    connectionId: string
    cursor: string
    pattern: string
    type: string
    database: number
  }): Promise<{ cursor: string; keys: Array<{ key: string; type: string; ttl: number }> }> {
    return this.call('redis.scan', options)
  }

  redisKey(connectionId: string, key: string, database: number): Promise<RedisKeyView> {
    return this.call('redis.key', { connectionId, key, database })
  }

  redisCommand(connectionId: string, command: string): Promise<{ reply: unknown; durationMs: number }> {
    return this.call('redis.command', { connectionId, command })
  }

  redisDelete(connectionId: string, key: string, database: number): Promise<{ deleted: number; database: number }> {
    return this.call('redis.delete', { connectionId, key, database })
  }

  engines(): Promise<{ engines: EngineInfo[] }> {
    return this.call('meta')
  }
}

export interface ProbeResult {
  ok: boolean
  latencyMs?: number
  serverVersion?: string
  error?: string
}

export interface ResultColumnLike {
  name: string
  type?: string
}

export interface RedisKeyView {
  key: string
  type: string
  ttl: number
  length: number | null
  value: unknown
  truncated: boolean
  /** Logical database the key was read from; required when deleting it. */
  database: number
}

/** One shared instance: every view talks to the same route. */
export const api = new GridApi()
