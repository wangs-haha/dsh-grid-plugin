/**
 * Left pane: a drill-down tree of connections → databases → schemas → tables.
 *
 * Every level loads lazily: opening a connection lists its databases, opening a
 * database lists its relations. Selecting a database also drives the workbench.
 */

import { useMemo, useState } from 'react'

import type { Connection, DatabaseNode, RelationNode } from '../lib/types'
import { useStore, type GridStore } from '../store'
import { Icon, IconButton, StatusDot } from '../ui/kit'

const COLOR_VALUE: Record<string, string> = {
  red: 'var(--dsw-alias-state-error-primary)',
  yellow: 'var(--dsw-alias-state-warn-primary)',
  green: 'var(--dsw-alias-state-success-primary)',
}

interface TreePaneProps {
  store: GridStore
  t: (key: string) => string
  selectedDatabaseKey: string
  onNewConnection: () => void
  onSelectDatabase: (connection: Connection, database: DatabaseNode) => void
  onOpenTable: (connection: Connection, database: DatabaseNode, schema: string, relation: RelationNode) => void
  onConnectionMenu: (event: React.MouseEvent, connection: Connection) => void
  onDatabaseMenu: (event: React.MouseEvent, connection: Connection, database: DatabaseNode) => void
}

export function TreePane(props: TreePaneProps): JSX.Element {
  const { store, t } = props
  const connections = useStore(store.connections)
  const catalog = useStore(store.catalog)
  const [filter, setFilter] = useState('')
  const [openConnections, setOpenConnections] = useState<Set<string>>(() => new Set())
  const [openDatabases, setOpenDatabases] = useState<Set<string>>(() => new Set())
  const [openSchemas, setOpenSchemas] = useState<Set<string>>(() => new Set())

  const toggleKey = (key: string, setter: React.Dispatch<React.SetStateAction<Set<string>>>): void =>
    setter((current) => {
      const next = new Set(current)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })

  const term = filter.trim().toLowerCase()

  /** Connections grouped by their label. */
  const groups = useMemo(() => {
    const map = new Map<string, Connection[]>()
    for (const connection of connections.items) {
      const name = connection.group || t('noGroups')
      const list = map.get(name) ?? []
      list.push(connection)
      map.set(name, list)
    }
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]))
  }, [connections.items, t])

  const toggleConnection = async (connection: Connection): Promise<void> => {
    store.connections.select(connection.id)
    const status = store.connections.session(connection.id).status
    if (status === 'open' || status === 'opening') {
      toggleKey(connection.id, setOpenConnections)
      return
    }
    setOpenConnections((current) => new Set(current).add(connection.id))
    await store.connections.connect(connection.id)
  }

  const selectDatabase = async (connection: Connection, database: DatabaseNode): Promise<void> => {
    props.onSelectDatabase(connection, database)
    const key = `${connection.id}|${database.name}`
    setOpenDatabases((current) => new Set(current).add(key))
    await store.catalog.loadRelations(connection.id, database.name, database.schemas[0] ?? '')
  }

  const relationRow = (
    connection: Connection,
    database: DatabaseNode,
    schema: string,
    relation: RelationNode,
    depth: number,
  ): JSX.Element => (
    <div
      key={`${connection.id}|${database.name}|${schema}|${relation.name}`}
      className="dg-trow"
      style={{ paddingLeft: depth * 13 + 4 }}
      title={`${relation.name}${relation.rows !== null ? ` · ${relation.rows} rows` : ''}`}
      onClick={() => props.onOpenTable(connection, database, schema, relation)}
    >
      <span className="dg-twist" />
      <span className="dg-ticon">
        <Icon name={relation.kind === 'view' ? 'view' : 'table'} size={11} />
      </span>
      <span className="dg-tlabel">{relation.name}</span>
      {relation.rows !== null ? <span className="dg-badge">{relation.rows}</span> : null}
    </div>
  )

  const databaseNode = (connection: Connection, database: DatabaseNode): JSX.Element => {
    const key = `${connection.id}|${database.name}`
    const open = openDatabases.has(key)
    const schemas = database.schemas.length ? database.schemas : ['']
    return (
      <div key={key}>
        <div
          className={`dg-trow dg-trow-db${props.selectedDatabaseKey === key ? ' dg-trow-active' : ''}`}
          title={database.name}
          onClick={() => void selectDatabase(connection, database)}
          onContextMenu={(event) => {
            event.preventDefault()
            props.onDatabaseMenu(event, connection, database)
          }}
        >
          <span
            className={`dg-twist${open ? ' dg-twist-open' : ''}`}
            onClick={(event) => {
              event.stopPropagation()
              toggleKey(key, setOpenDatabases)
              if (!open) void store.catalog.loadRelations(connection.id, database.name, schemas[0] ?? '')
            }}
          >
            <Icon name="chevron" size={9} />
          </span>
          <span className="dg-ticon">
            <Icon name="database" size={11} />
          </span>
          <span className="dg-tlabel">{database.name}</span>
          {database.schemas.length > 1 ? <span className="dg-badge">{database.schemas.length}</span> : null}
        </div>
        {open
          ? schemas.map((schema) => {
              const schemaKey = `${key}|${schema}`
              const schemaOpen = !schema || openSchemas.has(schemaKey)
              const relations = catalog.relations[`${connection.id}|${database.name}|${schema}`] ?? []
              const loading = catalog.loading[`${connection.id}|${database.name}|${schema}`] === true
              return (
                <div key={schema || '_default'}>
                  {schema ? (
                    <div
                      className="dg-trow"
                      style={{ paddingLeft: 17 }}
                      onClick={() => {
                        toggleKey(schemaKey, setOpenSchemas)
                        if (!schemaOpen) void store.catalog.loadRelations(connection.id, database.name, schema)
                      }}
                    >
                      <span className={`dg-twist${schemaOpen ? ' dg-twist-open' : ''}`}>
                        <Icon name="chevron" size={9} />
                      </span>
                      <span className="dg-ticon">
                        <Icon name="folder" size={11} />
                      </span>
                      <span className="dg-tlabel">{schema}</span>
                    </div>
                  ) : null}
                  {schemaOpen
                    ? loading && relations.length === 0
                      ? (
                          <div
                            className="dg-muted"
                            style={{ padding: `2px 8px 2px ${(schema ? 3 : 2) * 13 + 16}px` }}
                          >
                            {t('loading')}
                          </div>
                        )
                      : relations.map((relation) => relationRow(connection, database, schema, relation, schema ? 3 : 2))
                    : null}
                </div>
              )
            })
          : null}
      </div>
    )
  }

  return (
    <div className="dg-tree">
      <div className="dg-panehead">
        <Icon name="database" size={11} />
        {t('connections')}
        <span className="dg-badge">{connections.items.length}</span>
        <div className="dg-spacer" />
        <IconButton
          icon="refresh"
          title={t('refresh')}
          size={11}
          onClick={() => {
            void store.connections.load()
            void store.meta.load()
          }}
        />
        <IconButton icon="plus" title={t('newConnection')} size={11} onClick={props.onNewConnection} />
      </div>
      <div className="dg-row" style={{ padding: '4px 6px' }}>
        <div className="dg-search">
          <Icon name="search" size={10} />
          <input value={filter} placeholder={t('search')} onChange={(event) => setFilter(event.target.value)} />
        </div>
      </div>
      <div className="dg-tree-scroll">
        {connections.loading && connections.items.length === 0 ? (
          <div className="dg-muted" style={{ padding: 8 }}>
            {t('loading')}
          </div>
        ) : null}
        {connections.error ? <div className="dg-banner dg-banner-error">{connections.error}</div> : null}
        {groups.map(([group, list]) => {
          const visible = list.filter((connection) => {
            if (!term) return true
            if (connection.name.toLowerCase().includes(term)) return true
            const session = store.connections.session(connection.id)
            return session.databases.some((database) => database.name.toLowerCase().includes(term))
          })
          if (visible.length === 0) return null
          return (
            <div key={group}>
              <div className="dg-group">
                <span className="dg-twist" />
                <span className="dg-truncate">{group}</span>
                <span className="dg-badge">{visible.length}</span>
              </div>
              {visible.map((connection) => {
                const session = store.connections.session(connection.id)
                const expanded = openConnections.has(connection.id) && session.status === 'open'
                return (
                  <div key={connection.id}>
                    <div
                      className={`dg-trow${connections.activeId === connection.id ? ' dg-trow-active' : ''}`}
                      onClick={() => void toggleConnection(connection)}
                      onContextMenu={(event) => {
                        event.preventDefault()
                        props.onConnectionMenu(event, connection)
                      }}
                      title={`${connection.name} · ${connection.engine}`}
                    >
                      <span className={`dg-twist${expanded ? ' dg-twist-open' : ''}`}>
                        <Icon name="chevron" size={9} />
                      </span>
                      {connection.color !== 'none' ? (
                        <span className="dg-colorbar" style={{ background: COLOR_VALUE[connection.color] }} />
                      ) : null}
                      <span className="dg-ticon">
                        <Icon name="database" size={12} />
                      </span>
                      <span className="dg-tlabel">{connection.name}</span>
                      <span className="dg-badge">{connection.engine}</span>
                      <StatusDot status={session.status} />
                    </div>
                    {session.status === 'opening' ? (
                      <div className="dg-muted dg-hint" style={{ padding: '2px 8px 2px 30px' }}>
                        {t('connect')}…
                      </div>
                    ) : null}
                    {session.status === 'error' ? (
                      <div className="dg-muted dg-hint" style={{ padding: '2px 8px 2px 30px' }}>
                        {session.error || t('error')}
                      </div>
                    ) : null}
                    {expanded ? session.databases.map((database) => databaseNode(connection, database)) : null}
                  </div>
                )
              })}
            </div>
          )
        })}
        {!connections.loading && connections.items.length === 0 ? (
          <div className="dg-muted dg-hint" style={{ padding: 10 }}>
            {t('selectConnection')}
          </div>
        ) : null}
      </div>
    </div>
  )
}
