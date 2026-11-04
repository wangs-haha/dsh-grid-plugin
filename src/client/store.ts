/**
 * Client-side stores.
 *
 * Each store is a small observable object: it owns one slice of state and the
 * operations that change it, and React reads it through `useSyncExternalStore`.
 * This keeps data fetching out of components, so a view only renders what a
 * store exposes and the same store can be reused by several views.
 */

import { useSyncExternalStore } from 'react'

import { api, type ProbeResult } from './lib/api'
import type {
  Account,
  Connection,
  ConnectionInput,
  DatabaseNode,
  Meta,
  ProjectBinding,
  RelationNode,
  Routine,
  SavedQuery,
  Tab,
} from './lib/types'

type Listener = () => void

/** Base class for every store: one immutable state value plus subscribers. */
export abstract class Store<T> {
  protected state: T
  private readonly listeners = new Set<Listener>()

  protected constructor(initial: T) {
    this.state = initial
  }

  readonly getSnapshot = (): T => this.state

  readonly subscribe = (listener: Listener): (() => void) => {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  protected setState(next: T): void {
    this.state = next
    for (const listener of this.listeners) listener()
  }

  protected patch(patch: Partial<T>): void {
    this.setState({ ...this.state, ...patch })
  }
}

/** Read one store inside a component. */
export function useStore<T>(store: Store<T>): T {
  return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot)
}

/* -------------------------------------------------------------------------- */
/* Meta                                                                        */
/* -------------------------------------------------------------------------- */

export interface MetaState {
  meta: Meta | null
  error: string
}

export class MetaStore extends Store<MetaState> {
  constructor() {
    super({ meta: null, error: '' })
  }

  async load(): Promise<void> {
    try {
      this.patch({ meta: await api.meta(), error: '' })
    } catch (error) {
      this.patch({ error: error instanceof Error ? error.message : String(error) })
    }
  }

  get current(): Meta | null {
    return this.state.meta
  }

  engines() {
    return this.state.meta?.engines ?? []
  }

  get allowWrites(): boolean {
    return this.state.meta?.allowWrites === true
  }
}

/* -------------------------------------------------------------------------- */
/* Connections and their sessions                                              */
/* -------------------------------------------------------------------------- */

export type SessionStatus = 'closed' | 'opening' | 'open' | 'error'

export interface SessionState {
  status: SessionStatus
  version: string
  error: string
  databases: DatabaseNode[]
}

const EMPTY_SESSION: SessionState = { status: 'closed', version: '', error: '', databases: [] }

export interface ConnectionsState {
  items: Connection[]
  activeId: string
  loading: boolean
  error: string
  sessions: Record<string, SessionState>
  testing: Record<string, boolean>
}

export class ConnectionsStore extends Store<ConnectionsState> {
  constructor() {
    super({ items: [], activeId: '', loading: false, error: '', sessions: {}, testing: {} })
  }

  async load(): Promise<void> {
    this.patch({ loading: true })
    try {
      const { connections } = await api.listConnections()
      const activeId = this.state.items.some((item) => item.id === this.state.activeId)
        ? this.state.activeId
        : (connections[0]?.id ?? '')
      this.patch({ items: connections, activeId, loading: false, error: '' })
    } catch (error) {
      this.patch({ loading: false, error: error instanceof Error ? error.message : String(error) })
    }
  }

  select(id: string): void {
    this.patch({ activeId: id })
  }

  get active(): Connection | null {
    return this.state.items.find((item) => item.id === this.state.activeId) ?? null
  }

  session(id: string): SessionState {
    return this.state.sessions[id] ?? EMPTY_SESSION
  }

  private setSession(id: string, patch: Partial<SessionState>): void {
    const current = this.session(id)
    this.patch({ sessions: { ...this.state.sessions, [id]: { ...current, ...patch } } })
  }

  async create(input: ConnectionInput): Promise<ProbeResult> {
    const result = await api.createConnection(input)
    await this.load()
    this.select(result.connection.id)
    return result.probe
  }

  async update(id: string, patch: ConnectionInput): Promise<void> {
    await api.updateConnection(id, patch)
    this.setSession(id, { status: 'closed', version: '', databases: [] })
    await this.load()
  }

  async remove(id: string): Promise<void> {
    await api.deleteConnection(id)
    const sessions = { ...this.state.sessions }
    delete sessions[id]
    this.patch({ sessions })
    await this.load()
  }

  async test(id: string): Promise<ProbeResult> {
    this.patch({ testing: { ...this.state.testing, [id]: true } })
    try {
      return await api.testConnection(id)
    } finally {
      this.patch({ testing: { ...this.state.testing, [id]: false } })
    }
  }

  /** Open a session and load its databases. Idempotent. */
  async connect(id: string): Promise<void> {
    if (this.session(id).status === 'open') return
    this.setSession(id, { status: 'opening', error: '' })
    try {
      const connected = await api.connect(id)
      const { databases } = await api.databases(id)
      this.setSession(id, { status: 'open', version: connected.serverVersion, databases, error: '' })
    } catch (error) {
      this.setSession(id, { status: 'error', error: error instanceof Error ? error.message : String(error) })
    }
  }

  async disconnect(id: string): Promise<void> {
    await api.disconnect(id).catch(() => undefined)
    this.setSession(id, { ...EMPTY_SESSION })
  }

  async reloadDatabases(id: string): Promise<void> {
    if (this.session(id).status !== 'open') return this.connect(id)
    try {
      const { databases } = await api.databases(id)
      this.setSession(id, { databases })
    } catch (error) {
      this.setSession(id, { status: 'error', error: error instanceof Error ? error.message : String(error) })
    }
  }
}

/* -------------------------------------------------------------------------- */
/* Catalog: relations, routines, accounts per scope                            */
/* -------------------------------------------------------------------------- */

export interface CatalogState {
  relations: Record<string, RelationNode[]>
  routines: Record<string, Routine[]>
  accounts: Record<string, Account[]>
  loading: Record<string, boolean>
  errors: Record<string, string>
}

/** Cache key for one database/schema scope. */
export function scopeKey(connectionId: string, database: string, schema = ''): string {
  return `${connectionId}|${database}|${schema}`
}

export class CatalogStore extends Store<CatalogState> {
  constructor() {
    super({ relations: {}, routines: {}, accounts: {}, loading: {}, errors: {} })
  }

  relationsOf(key: string): RelationNode[] {
    return this.state.relations[key] ?? []
  }

  routinesOf(key: string): Routine[] {
    return this.state.routines[key] ?? []
  }

  accountsOf(connectionId: string): Account[] {
    return this.state.accounts[connectionId] ?? []
  }

  isLoading(key: string): boolean {
    return this.state.loading[key] === true
  }

  errorOf(key: string): string {
    return this.state.errors[key] ?? ''
  }

  private async run<T>(key: string, loader: () => Promise<T>, apply: (value: T) => Partial<CatalogState>): Promise<void> {
    this.patch({ loading: { ...this.state.loading, [key]: true } })
    try {
      const value = await loader()
      this.setState({
        ...this.state,
        ...apply(value),
        loading: { ...this.state.loading, [key]: false },
        errors: { ...this.state.errors, [key]: '' },
      })
    } catch (error) {
      this.setState({
        ...this.state,
        loading: { ...this.state.loading, [key]: false },
        errors: { ...this.state.errors, [key]: error instanceof Error ? error.message : String(error) },
      })
    }
  }

  async loadRelations(connectionId: string, database: string, schema = '', force = false): Promise<void> {
    const key = scopeKey(connectionId, database, schema)
    if (!force && this.state.relations[key]) return
    await this.run(
      key,
      () => api.relations(connectionId, database, schema),
      ({ tables }) => ({ relations: { ...this.state.relations, [key]: tables } }),
    )
  }

  async loadRoutines(connectionId: string, database: string, schema = '', force = false): Promise<void> {
    const key = scopeKey(connectionId, database, schema)
    if (!force && this.state.routines[key]) return
    await this.run(
      key,
      () => api.routines(connectionId, database, schema),
      ({ routines }) => ({ routines: { ...this.state.routines, [key]: routines } }),
    )
  }

  async loadAccounts(connectionId: string, force = false): Promise<void> {
    if (!force && this.state.accounts[connectionId]) return
    await this.run(
      connectionId,
      () => api.accounts(connectionId),
      ({ accounts }) => ({ accounts: { ...this.state.accounts, [connectionId]: accounts } }),
    )
  }

  invalidate(key: string): void {
    const relations = { ...this.state.relations }
    delete relations[key]
    this.patch({ relations })
  }
}

/* -------------------------------------------------------------------------- */
/* Tabs                                                                        */
/* -------------------------------------------------------------------------- */

export interface TabsState {
  tabs: Tab[]
  activeId: string
}

export class TabsStore extends Store<TabsState> {
  constructor() {
    super({ tabs: [], activeId: '' })
  }

  open(tab: Tab): void {
    const exists = this.state.tabs.some((entry) => entry.id === tab.id)
    this.setState({
      tabs: exists ? this.state.tabs : this.state.tabs.concat(tab),
      activeId: tab.id,
    })
  }

  activate(id: string): void {
    this.patch({ activeId: id })
  }

  close(id: string): void {
    const index = this.state.tabs.findIndex((tab) => tab.id === id)
    const tabs = this.state.tabs.filter((tab) => tab.id !== id)
    const fallback = tabs[Math.max(0, index - 1)]
    this.setState({ tabs, activeId: this.state.activeId === id ? (fallback?.id ?? '') : this.state.activeId })
  }

  closeConnection(connectionId: string): void {
    const tabs = this.state.tabs.filter((tab) => tab.connectionId !== connectionId)
    const stillActive = tabs.some((tab) => tab.id === this.state.activeId)
    this.setState({ tabs, activeId: stillActive ? this.state.activeId : (tabs[tabs.length - 1]?.id ?? '') })
  }

  get active(): Tab | null {
    return this.state.tabs.find((tab) => tab.id === this.state.activeId) ?? null
  }
}

/* -------------------------------------------------------------------------- */
/* Saved queries                                                               */
/* -------------------------------------------------------------------------- */

export interface QueriesState {
  items: SavedQuery[]
  loading: boolean
  error: string
}

export class QueriesStore extends Store<QueriesState> {
  constructor() {
    super({ items: [], loading: false, error: '' })
  }

  async load(): Promise<void> {
    this.patch({ loading: true })
    try {
      const { queries } = await api.listQueries()
      this.patch({ items: queries, loading: false, error: '' })
    } catch (error) {
      this.patch({ loading: false, error: error instanceof Error ? error.message : String(error) })
    }
  }

  async save(input: { name: string; sql: string; connectionId: string; database: string; scope?: 'user' | 'agent' }): Promise<SavedQuery> {
    const { query } = await api.saveQuery(input)
    await this.load()
    return query
  }

  async remove(id: string): Promise<void> {
    await api.deleteQuery(id)
    await this.load()
  }
}

/* -------------------------------------------------------------------------- */
/* Root store                                                                  */
/* -------------------------------------------------------------------------- */

/** Everything the panel shares. One instance per panel mount. */
export class GridStore {
  readonly meta = new MetaStore()
  readonly connections = new ConnectionsStore()
  readonly catalog = new CatalogStore()
  readonly tabs = new TabsStore()
  readonly queries = new QueriesStore()

  async bootstrap(): Promise<void> {
    await Promise.all([this.meta.load(), this.connections.load(), this.queries.load()])
  }

  bindings(): ProjectBinding[] {
    return this.meta.current?.bindings ?? []
  }

  bindingFor(workspaceId: string): ProjectBinding | null {
    return this.bindings().find((binding) => binding.workspaceId === workspaceId) ?? null
  }
}

export type { Connection, RelationNode, SavedQuery, Tab }
