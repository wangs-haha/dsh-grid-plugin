/** Shared shapes for everything the Host returns. */

export type EngineId = 'sqlite' | 'mysql' | 'postgres' | 'sqlserver' | 'redis'

export type ConnectionColor = 'none' | 'red' | 'yellow' | 'green'

export interface EngineInfo {
  id: EngineId
  label: string
  package: string | null
  defaultPort: number
  kind: 'file' | 'network'
  fields: string[]
  description: string
  available?: boolean
  error?: string
}

export type SshAuthType = 'password' | 'privateKey'

/** Public SSH settings: credentials are write-only and exposed only as flags. */
export interface SshConnection {
  enabled: true
  host: string
  port: number
  username: string
  authType: SshAuthType
  hostFingerprint: string
  hasPassword: boolean
  hasPrivateKey: boolean
  hasPassphrase: boolean
}

/** Omitted credentials are retained; explicit empty strings clear them. */
export interface SshConnectionInput {
  enabled: boolean
  host?: string
  port?: number
  username?: string
  authType?: SshAuthType
  hostFingerprint?: string
  password?: string
  privateKey?: string
  passphrase?: string
}

export interface Connection {
  id: string
  name: string
  engine: EngineId
  group: string
  color: ConnectionColor
  host: string
  port: number
  user: string
  database: string
  file: string
  redisDb: number
  ssl: boolean
  /** How the TLS connection is verified; see the Host's `SSL_MODES`. */
  sslMode: 'disable' | 'require' | 'verify-ca' | 'verify-full'
  /** Empty means use the database host, not a tunnel's local forwarding address. */
  tlsServerName?: string
  ssh?: SshConnection | null
  hasPassword: boolean
  createdAt: string
  updatedAt: string
}

export type ConnectionInput = Partial<Omit<Connection, 'id' | 'ssh' | 'hasPassword' | 'createdAt' | 'updatedAt'>> & {
  id?: string
  password?: string
  ssh?: SshConnectionInput | null
}

export interface DatabaseNode {
  name: string
  schemas: string[]
  file?: string
}

export type RelationKind = 'table' | 'view'

export interface RelationNode {
  name: string
  kind: RelationKind
  rows: number | null
  comment: string
}

export interface ColumnInfo {
  name: string
  type: string
  nullable: boolean
  defaultValue: string | null
  primaryKey: boolean
  ordinal: number
  comment: string
  extra: string
}

export interface IndexInfo {
  name: string
  columns: string[]
  unique: boolean
  primary: boolean
}

export interface DescribeResult {
  columns: ColumnInfo[]
  indexes: IndexInfo[]
  ddl: string
}

export interface ResultColumn {
  name: string
  type?: string
}

export type Row = Record<string, unknown>

export interface RowsResult {
  columns: ResultColumn[]
  rows: Row[]
  total: number
  /** Whether `total` is a counted number or the engine's estimate. */
  totalKind: 'exact' | 'estimate' | 'none'
  page: number
  pageSize: number
  durationMs: number
}

export interface StatementResult {
  statement: string
  columns: ResultColumn[]
  rows: Row[]
  rowCount: number
  /** The statement produced more rows than the Host returns in one result. */
  truncated?: boolean
  affected?: number
  lastInsertId?: unknown
  error?: string
  durationMs: number
}

export interface SqlResult {
  results: StatementResult[]
  statementCount: number
  durationMs: number
}

export interface Routine {
  name: string
  kind: 'function' | 'procedure'
  returnType: string
  language: string
  definition: string
}

export interface Account {
  name: string
  host: string
  plugin: string
  locked: boolean
  privileged: boolean
}

export interface SavedQuery {
  id: string
  name: string
  sql: string
  connectionId: string
  database: string
  scope: 'user' | 'agent'
  createdAt: string
  updatedAt: string
}

export interface Workspace {
  id: string
  title: string
  path: string
}

export interface ProjectBinding {
  workspaceId: string
  workspacePath: string
  connectionId: string
  connectionName?: string
  database: string
  createdAt: string
}

export interface Meta {
  engines: EngineInfo[]
  allowWrites: boolean
  bindings: ProjectBinding[]
  workspaces: Workspace[]
}

export interface SessionInfo {
  id: string
  /** Which connection the session belongs to: the workbench or typed SQL. */
  lane: 'main' | 'query'
  engine: EngineId
  idleMs: number
  version: string
}

/** One open workbench tab. */
export type Tab =
  | { id: string; kind: 'overview'; connectionId: string; database: string; title: string }
  | { id: string; kind: 'table'; connectionId: string; database: string; schema: string; table: string; tableKind: RelationKind; title: string }
  | { id: string; kind: 'sql'; connectionId: string; database: string; title: string; initialSql?: string }
  | { id: string; kind: 'redis'; connectionId: string; database: string; title: string }
  | {
      id: string
      kind: 'relations'
      connectionId: string
      database: string
      schema: string
      relation: RelationKind
      title: string
    }
  | { id: string; kind: 'routines' | 'accounts' | 'queries'; connectionId: string; database: string; schema: string; title: string }
