/** List-style workbench views: relations, routines, accounts and saved queries. */

import { useEffect, useMemo, useState } from 'react'

import { api } from '../lib/api'
import { humanSize, relativeTime } from '../lib/format'
import type { Account, DatabaseNode, RelationKind, RelationNode, Routine, SavedQuery } from '../lib/types'
import { useStore, type GridStore } from '../store'
import { Banner, Button, Empty, Icon, IconButton, Input, Spinner } from '../ui/kit'

type Notify = (message: string, tone?: 'info' | 'error' | 'success') => void

/* -------------------------------------------------------------------------- */

export function RelationsView(props: {
  t: (key: string) => string
  store: GridStore
  connectionId: string
  database: string
  schema: string
  kind: RelationKind
  onOpen: (relation: RelationNode) => void
  onQuery: (relation: RelationNode) => void
  notify: Notify
}): JSX.Element {
  const { t, store } = props
  const catalog = useStore(store.catalog)
  const key = `${props.connectionId}|${props.database}|${props.schema}`
  const [filter, setFilter] = useState('')
  const [sort, setSort] = useState<{ column: 'name' | 'rows' | 'comment'; dir: 'asc' | 'desc' }>({ column: 'name', dir: 'asc' })

  useEffect(() => {
    void store.catalog.loadRelations(props.connectionId, props.database, props.schema)
  }, [props.connectionId, props.database, props.schema, store])

  const rows = useMemo(() => {
    const term = filter.trim().toLowerCase()
    const list = catalog.relations[key] ?? []
    return list
      .filter((relation) => relation.kind === props.kind)
      .filter((relation) => (!term ? true : relation.name.toLowerCase().includes(term)))
      .sort((a, b) => {
        const sign = sort.dir === 'desc' ? -1 : 1
        if (sort.column === 'rows') return ((a.rows ?? 0) - (b.rows ?? 0)) * sign
        if (sort.column === 'comment') return (a.comment || '').localeCompare(b.comment || '') * sign
        return a.name.localeCompare(b.name) * sign
      })
  }, [catalog.relations, key, filter, props.kind, sort])

  const loading = catalog.loading[key] === true
  const error = catalog.errors[key] ?? ''
  const header = (column: 'name' | 'rows' | 'comment', label: string, extra?: string): JSX.Element => (
    <th
      className={extra}
      onClick={() =>
        setSort((current) => (current.column === column ? { column, dir: current.dir === 'asc' ? 'desc' : 'asc' } : { column, dir: 'asc' }))
      }
    >
      {label}
      {sort.column === column ? <span className="dg-sortmark">{sort.dir === 'desc' ? '▼' : '▲'}</span> : null}
    </th>
  )

  return (
    <div className="dg-content">
      <div className="dg-subbar">
        <Icon name={props.kind === 'view' ? 'view' : 'table'} size={12} />
        <span>{props.kind === 'view' ? t('views') : t('tables')}</span>
        <span className="dg-chip">{rows.length}</span>
        <div className="dg-spacer" />
        <Input
          value={filter}
          placeholder={t('search')}
          style={{ width: 180 }}
          onChange={(event) => setFilter(event.target.value)}
        />
        <IconButton
          icon="refresh"
          title={t('refresh')}
          onClick={() => void store.catalog.loadRelations(props.connectionId, props.database, props.schema, true)}
        />
      </div>
      {error ? <Banner tone="error">{error}</Banner> : null}
      <div className="dg-grid-wrap">
        {loading ? (
          <div className="dg-sqlmsg">
            <Spinner label={t('loading')} />
          </div>
        ) : rows.length === 0 ? (
          <Empty title={t('emptyTables')} />
        ) : (
          <table className="dg-list">
            <thead>
              <tr>
                {header('name', t('name'))}
                {header('rows', t('rows'), 'dg-num')}
                {header('comment', t('comment'))}
                <th style={{ width: 70 }} />
              </tr>
            </thead>
            <tbody>
              {rows.map((relation) => (
                <tr key={relation.name} onDoubleClick={() => props.onOpen(relation)}>
                  <td>
                    <span className="dg-list-name">
                      <Icon name={relation.kind === 'view' ? 'view' : 'table'} size={11} />
                      <span className="dg-mono">{relation.name}</span>
                    </span>
                  </td>
                  <td className="dg-num">{relation.rows ?? '—'}</td>
                  <td className="dg-muted dg-truncate" title={relation.comment}>
                    {relation.comment}
                  </td>
                  <td>
                    <span className="dg-row" style={{ gap: 2 }}>
                      <IconButton icon="play" title={t('openInQuery')} size={11} onClick={() => props.onQuery(relation)} />
                      <IconButton icon="table" title={t('data')} size={11} onClick={() => props.onOpen(relation)} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */

export function OverviewView(props: {
  t: (key: string) => string
  store: GridStore
  connectionId: string
  database: DatabaseNode
  schemas: string[]
  onOpenRelations: (kind: RelationKind) => void
}): JSX.Element {
  const { t, store } = props
  const connections = useStore(store.connections)
  const catalog = useStore(store.catalog)
  const connection = connections.items.find((item) => item.id === props.connectionId)
  const key = `${props.connectionId}|${props.database.name}|${props.schemas[0] ?? ''}`
  const relations = catalog.relations[key] ?? []
  const session = connections.sessions[props.connectionId]

  useEffect(() => {
    for (const schema of props.schemas.length ? props.schemas : ['']) {
      void store.catalog.loadRelations(props.connectionId, props.database.name, schema)
    }
  }, [props.connectionId, props.database.name, props.schemas, store])

  const tables = relations.filter((relation) => relation.kind === 'table').length
  const views = relations.filter((relation) => relation.kind === 'view').length
  const binding = store.bindings().find((entry) => entry.connectionId === props.connectionId) ?? null

  return (
    <div className="dg-content">
      <div className="dg-subbar">
        <Icon name="database" size={12} />
        <span className="dg-mono">{props.database.name}</span>
        <span className="dg-chip">{connection?.engine ?? ''}</span>
        {session?.version ? <span className="dg-chip">{session.version}</span> : null}
      </div>
      <div style={{ overflow: 'auto' }}>
        <div className="dg-cards">
          <div className="dg-card" onClick={() => props.onOpenRelations('table')} style={{ cursor: 'pointer' }}>
            <div className="dg-card-value">{tables}</div>
            <div className="dg-card-label">{t('tables')}</div>
          </div>
          <div className="dg-card" onClick={() => props.onOpenRelations('view')} style={{ cursor: 'pointer' }}>
            <div className="dg-card-value">{views}</div>
            <div className="dg-card-label">{t('views')}</div>
          </div>
          <div className="dg-card">
            <div className="dg-card-value">{props.schemas.length || 1}</div>
            <div className="dg-card-label">{t('schema')}</div>
          </div>
          <div className="dg-card">
            <div className="dg-card-value">{props.database.file ? humanSize(props.database.file.length) : '—'}</div>
            <div className="dg-card-label">{t('file')}</div>
          </div>
        </div>
        <div className="dg-section">
          <div className="dg-section-title">{t('agentHint')}</div>
          {binding && binding.connectionId === props.connectionId ? (
            <Banner tone="success">
              {t('projectBound')
                .replace('{name}', binding.connectionName ?? binding.connectionId)
                .replace('{database}', binding.database)}
            </Banner>
          ) : (
            <Banner>{t('projectUnbound')}</Banner>
          )}
          <Banner>{store.meta.allowWrites ? t('writesEnabled') : t('readOnlyForAgent')}</Banner>
        </div>
        <div className="dg-section">
          <div className="dg-section-title">{t('schema')}</div>
          {props.schemas.length > 0 ? (
            props.schemas.map((schema) => (
              <div key={schema} className="dg-row">
                <Icon name="folder" size={11} />
                <span className="dg-mono">{schema}</span>
              </div>
            ))
          ) : (
            <div className="dg-muted">default</div>
          )}
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */

export function RoutinesView(props: {
  t: (key: string) => string
  store: GridStore
  connectionId: string
  database: string
  schema: string
}): JSX.Element {
  const { t, store } = props
  const catalog = useStore(store.catalog)
  const key = `${props.connectionId}|${props.database}|${props.schema}`
  const rows: Routine[] = catalog.routines[key] ?? []
  const [selected, setSelected] = useState('')

  useEffect(() => {
    void store.catalog.loadRoutines(props.connectionId, props.database, props.schema)
  }, [props.connectionId, props.database, props.schema, store])

  const current = rows.find((routine) => routine.name === selected) ?? null

  return (
    <div className="dg-content">
      <div className="dg-subbar">
        <Icon name="function" size={12} />
        <span>{t('functions')}</span>
        <span className="dg-chip">{rows.length}</span>
        <div className="dg-spacer" />
        <IconButton icon="refresh" title={t('refresh')} onClick={() => void store.catalog.loadRoutines(props.connectionId, props.database, props.schema, true)} />
      </div>
      <div className="dg-struct" style={{ flex: 1 }}>
        <div className="dg-struct-col" style={{ flex: '0 0 46%' }}>
          <div className="dg-struct-body" style={{ padding: 0 }}>
            {catalog.loading[key] ? (
              <div className="dg-sqlmsg">
                <Spinner label={t('loading')} />
              </div>
            ) : rows.length === 0 ? (
              <Empty title={t('noRoutines')} />
            ) : (
              <table className="dg-list">
                <thead>
                  <tr>
                    <th>{t('name')}</th>
                    <th>{t('type')}</th>
                    <th>{t('returnType')}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((routine) => (
                    <tr key={`${routine.kind}-${routine.name}`} className={routine.name === selected ? 'dg-row-active' : ''} onClick={() => setSelected(routine.name)}>
                      <td className="dg-mono">{routine.name}</td>
                      <td>{routine.kind === 'function' ? t('functionKind') : t('procedureKind')}</td>
                      <td className="dg-muted dg-truncate">{routine.returnType || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <div className="dg-struct-col">
          <div className="dg-struct-head">{t('definition')}</div>
          <div className="dg-struct-body">
            {current ? (
              <>
                <div className="dg-row" style={{ marginBottom: 6 }}>
                  <span className="dg-mono">{current.name}</span>
                  <span className="dg-tag">{current.language || current.kind}</span>
                </div>
                <pre className="dg-pre">{current.definition || '—'}</pre>
              </>
            ) : (
              <div className="dg-muted">{t('selectConnection')}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */

export function AccountsView(props: { t: (key: string) => string; store: GridStore; connectionId: string }): JSX.Element {
  const { t, store } = props
  const catalogState = useStore(store.catalog)
  const rows: Account[] = catalogState.accounts[props.connectionId] ?? []

  useEffect(() => {
    void store.catalog.loadAccounts(props.connectionId)
  }, [props.connectionId, store])

  return (
    <div className="dg-content">
      <div className="dg-subbar">
        <Icon name="user" size={12} />
        <span>{t('users')}</span>
        <span className="dg-chip">{rows.length}</span>
        <div className="dg-spacer" />
        <IconButton icon="refresh" title={t('refresh')} onClick={() => void store.catalog.loadAccounts(props.connectionId, true)} />
      </div>
      <div className="dg-grid-wrap">
        {catalogState.loading[props.connectionId] ? (
          <div className="dg-sqlmsg">
            <Spinner label={t('loading')} />
          </div>
        ) : rows.length === 0 ? (
          <Empty title={t('noAccounts')} />
        ) : (
          <table className="dg-list">
            <thead>
              <tr>
                <th>{t('accountName')}</th>
                <th>{t('accountHost')}</th>
                <th>{t('accountPlugin')}</th>
                <th>{t('accountPrivileged')}</th>
                <th>{t('accountLocked')}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((account) => (
                <tr key={`${account.name}@${account.host}`}>
                  <td className="dg-mono">{account.name}</td>
                  <td className="dg-mono dg-muted">{account.host}</td>
                  <td className="dg-muted">{account.plugin}</td>
                  <td>{account.privileged ? '✓' : ''}</td>
                  <td>{account.locked ? '✓' : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */

export function QueriesView(props: {
  t: (key: string) => string
  store: GridStore
  onOpen: (query: SavedQuery) => void
  notify: Notify
}): JSX.Element {
  const { t, store } = props
  const queries = useStore(store.queries)

  useEffect(() => {
    if (queries.items.length === 0) void store.queries.load()
  }, [queries.items.length, store])

  return (
    <div className="dg-content">
      <div className="dg-subbar">
        <Icon name="bookmark" size={12} />
        <span>{t('queries')}</span>
        <span className="dg-chip">{queries.items.length}</span>
        <div className="dg-spacer" />
        <IconButton icon="refresh" title={t('refresh')} onClick={() => void store.queries.load()} />
      </div>
      {queries.error ? <Banner tone="error">{queries.error}</Banner> : null}
      <div className="dg-grid-wrap">
        {queries.loading && queries.items.length === 0 ? (
          <div className="dg-sqlmsg">
            <Spinner label={t('loading')} />
          </div>
        ) : queries.items.length === 0 ? (
          <Empty title={t('noQueries')} />
        ) : (
          <table className="dg-list">
            <thead>
              <tr>
                <th>{t('queryName')}</th>
                <th>{t('database')}</th>
                <th>{t('source')}</th>
                <th>{t('updatedAt')}</th>
                <th style={{ width: 96 }} />
              </tr>
            </thead>
            <tbody>
              {queries.items.map((query) => (
                <tr key={query.id} onDoubleClick={() => props.onOpen(query)}>
                  <td>
                    <span className="dg-list-name">
                      <Icon name="bookmark" size={11} />
                      <span>{query.name}</span>
                    </span>
                  </td>
                  <td className="dg-mono dg-muted">{query.database || '—'}</td>
                  <td>
                    <span className="dg-tag">{query.scope}</span>
                  </td>
                  <td className="dg-muted">{relativeTime(query.updatedAt)}</td>
                  <td>
                    <span className="dg-row" style={{ gap: 2 }}>
                      <IconButton icon="play" title={t('openInEditor')} size={11} onClick={() => props.onOpen(query)} />
                      <IconButton
                        icon="trash"
                        title={t('delete')}
                        size={11}
                        onClick={() => {
                          void store.queries.remove(query.id).catch((cause: unknown) => props.notify(String(cause), 'error'))
                        }}
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
