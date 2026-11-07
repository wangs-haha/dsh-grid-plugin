/** The panel: toolbar, connection tree, tabbed workbench and status bar. */

import { useEffect, useMemo, useState } from 'react'

import { api } from '../lib/api'
import { fmt } from '../lib/format'
import type { Connection, DatabaseNode, RelationKind, RelationNode, SavedQuery, Tab } from '../lib/types'
import { useStore, GridStore } from '../store'
import { Banner, Button, Empty, Icon, IconButton, Menu, Splitter, type MenuItem } from '../ui/kit'
import panelCss from '../ui/panel.css'
import { ConnectionDialog } from './ConnectionDialog'
import { WorkspaceDialog } from './WorkspaceDialog'
import { AccountsView, OverviewView, QueriesView, RelationsView, RoutinesView } from '../views/AuxViews'
import { RedisView } from '../views/RedisView'
import { SqlView } from '../views/SqlView'
import { TableView, selectFrom } from '../views/TableView'
import { TreePane } from '../views/TreePane'

/**
 * Every object type the workbench can list.
 *
 * Adding a type is one entry here plus its host implementation: the toolbar, the
 * tab factory and the empty state all read from this table.
 */
const OBJECT_ACTIONS: Array<{
  id: string
  labelKey: string
  icon: string
  target: 'relations' | 'routines' | 'accounts' | 'queries'
  relation?: RelationKind
}> = [
  { id: 'tables', labelKey: 'tables', icon: 'table', target: 'relations', relation: 'table' },
  { id: 'views', labelKey: 'views', icon: 'view', target: 'relations', relation: 'view' },
  { id: 'functions', labelKey: 'functions', icon: 'function', target: 'routines' },
  { id: 'users', labelKey: 'users', icon: 'user', target: 'accounts' },
  { id: 'queries', labelKey: 'queries', icon: 'bookmark', target: 'queries' },
]

interface GridPanelProps {
  t?: (key: string) => string
}

export function GridPanel({ t }: GridPanelProps): JSX.Element {
  const tr = t ?? ((key: string) => key)
  const [store] = useState(() => new GridStore())
  const connections = useStore(store.connections)
  const meta = useStore(store.meta)
  const tabs = useStore(store.tabs)
  const [scope, setScope] = useState<{ connectionId: string; database: string; schema: string } | null>(null)
  const [dialog, setDialog] = useState<{ kind: 'connection'; initial?: Connection } | { kind: 'workspaces' } | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<Connection | null>(null)
  const [menu, setMenu] = useState<{ x: number; y: number; items: MenuItem[] } | null>(null)
  const [toast, setToast] = useState<{ message: string; tone: string } | null>(null)
  const [treeWidth, setTreeWidth] = useState(262)

  useEffect(() => {
    void store.bootstrap()
  }, [store])

  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(() => setToast(null), 3600)
    return () => clearTimeout(timer)
  }, [toast])

  const notify = (message: string, tone: 'info' | 'error' | 'success' = 'info'): void => setToast({ message, tone })

  const connectionOf = (id: string): Connection | undefined => connections.items.find((item) => item.id === id)
  const engineOf = (id: string): string => connectionOf(id)?.engine ?? 'sqlite'

  /* ------------------------------------------------------------ open tabs */

  /** Default destination for a database: its table list. */
  const openDatabase = (connection: Connection, database: DatabaseNode): void => {
    const schema = database.schemas[0] ?? ''
    setScope({ connectionId: connection.id, database: database.name, schema })
    void store.catalog.loadRelations(connection.id, database.name, schema)
    store.tabs.open({
      id: `relations:${connection.id}:${database.name}:${schema}:table`,
      kind: 'relations',
      connectionId: connection.id,
      database: database.name,
      schema,
      relation: 'table',
      title: database.name,
    })
  }

  const openOverview = (connection: Connection, database: DatabaseNode): void => {
    setScope({ connectionId: connection.id, database: database.name, schema: database.schemas[0] ?? '' })
    store.tabs.open({
      id: `overview:${connection.id}:${database.name}`,
      kind: 'overview',
      connectionId: connection.id,
      database: database.name,
      title: database.name,
    })
  }

  const openTable = (connection: Connection, database: string, schema: string, relation: RelationNode): void => {
    store.tabs.open({
      id: `table:${connection.id}:${database}:${schema}:${relation.name}`,
      kind: 'table',
      connectionId: connection.id,
      database,
      schema,
      table: relation.name,
      tableKind: relation.kind,
      title: relation.name,
    })
  }

  const openList = (kind: 'relations' | 'routines' | 'accounts' | 'queries', relationKind: RelationKind = 'table'): void => {
    if (kind === 'queries') {
      store.tabs.open({ id: 'queries', kind: 'queries', connectionId: '', database: '', schema: '', title: tr('queries') })
      return
    }
    if (!scope) return notify(tr('selectDatabase'), 'info')
    if (kind === 'accounts') {
      store.tabs.open({
        id: `accounts:${scope.connectionId}`,
        kind: 'accounts',
        connectionId: scope.connectionId,
        database: scope.database,
        schema: '',
        title: tr('users'),
      })
      return
    }
    if (kind === 'relations') {
      store.tabs.open({
        id: `relations:${scope.connectionId}:${scope.database}:${scope.schema}:${relationKind}`,
        kind: 'relations',
        connectionId: scope.connectionId,
        database: scope.database,
        schema: scope.schema,
        relation: relationKind,
        title: scope.database,
      })
      return
    }
    store.tabs.open({
      id: `${kind}:${scope.connectionId}:${scope.database}:${scope.schema}`,
      kind,
      connectionId: scope.connectionId,
      database: scope.database,
      schema: scope.schema,
      title: kind === 'routines' ? tr('functions') : tr('users'),
    })
  }

  const openQuery = (connection?: Connection | null, sql?: string): void => {
    const target = connection ?? (scope ? connectionOf(scope.connectionId) : connections.items[0])
    if (!target) return setDialog({ kind: 'connection' })
    const database = scope && scope.connectionId === target.id ? scope.database : (store.connections.session(target.id).databases[0]?.name ?? '')
    store.tabs.open({
      id: `sql:${target.id}:${Date.now()}`,
      kind: 'sql',
      connectionId: target.id,
      database,
      title: `${tr('query')} ${tabs.tabs.filter((tab) => tab.kind === 'sql').length + 1}`,
      initialSql: sql ?? '',
    })
  }

  const openSavedQuery = (query: SavedQuery): void => {
    const connection = connectionOf(query.connectionId) ?? connections.items[0]
    if (!connection) return setDialog({ kind: 'connection' })
    store.tabs.open({
      id: `sql:saved:${query.id}:${Date.now()}`,
      kind: 'sql',
      connectionId: connection.id,
      database: query.database,
      title: query.name,
      initialSql: query.sql,
    })
  }

  /* -------------------------------------------------------------- actions */

  const saveConnection = async (input: Parameters<typeof store.connections.create>[0]): Promise<void> => {
    const editing = dialog && dialog.kind === 'connection' ? dialog.initial : undefined
    if (editing) {
      await store.connections.update(editing.id, input)
      store.tabs.closeConnection(editing.id)
      notify(tr('saved'), 'success')
    } else {
      const probe = await store.connections.create(input)
      notify(
        probe.ok ? fmt(tr('testOk'), { version: probe.serverVersion ?? '', ms: probe.latencyMs ?? 0 }) : tr('saved'),
        probe.ok ? 'success' : 'info',
      )
    }
    setDialog(null)
  }

  const connectionMenu = (event: React.MouseEvent, connection: Connection): void => {
    const status = store.connections.session(connection.id).status
    setMenu({
      x: event.clientX,
      y: event.clientY,
      items: [
        status === 'open'
          ? { label: tr('disconnect'), icon: 'unplug', onClick: () => void store.connections.disconnect(connection.id) }
          : { label: tr('connect'), icon: 'plug', onClick: () => void store.connections.connect(connection.id) },
        {
          label: tr('test'),
          icon: 'check',
          onClick: () =>
            void store.connections.test(connection.id).then(
              (probe) => notify(fmt(tr('testOk'), { version: probe.serverVersion ?? '', ms: probe.latencyMs ?? 0 }), 'success'),
              (cause: unknown) => notify(cause instanceof Error ? cause.message : String(cause), 'error'),
            ),
        },
        { separator: true },
        { label: tr('newQuery'), icon: 'play', onClick: () => openQuery(connection) },
        { label: tr('edit'), icon: 'pencil', onClick: () => setDialog({ kind: 'connection', initial: connection }) },
        {
          label: tr('refresh'),
          icon: 'refresh',
          onClick: () => void store.connections.reloadDatabases(connection.id),
        },
        { separator: true },
        { label: tr('delete'), icon: 'trash', danger: true, onClick: () => setConfirmDelete(connection) },
      ],
    })
  }

  const databaseMenu = (event: React.MouseEvent, connection: Connection, database: DatabaseNode): void => {
    setMenu({
      x: event.clientX,
      y: event.clientY,
      items: [
        { label: tr('overview'), icon: 'info', onClick: () => openOverview(connection, database) },
        { label: tr('tables'), icon: 'table', onClick: () => { setScope({ connectionId: connection.id, database: database.name, schema: database.schemas[0] ?? '' }); openList('relations', 'table') } },
        { label: tr('views'), icon: 'view', onClick: () => { setScope({ connectionId: connection.id, database: database.name, schema: database.schemas[0] ?? '' }); openList('relations', 'view') } },
        { label: tr('functions'), icon: 'function', onClick: () => { setScope({ connectionId: connection.id, database: database.name, schema: database.schemas[0] ?? '' }); openList('routines') } },
        { separator: true },
        { label: tr('newQuery'), icon: 'play', onClick: () => openQuery(connection) },
      ],
    })
  }

  /* ------------------------------------------------------------------ ui */

  const bindings = store.bindings()
  const activeDatabaseKey = scope ? `${scope.connectionId}|${scope.database}` : ''
  const activeTab = tabs.tabs.find((tab) => tab.id === tabs.activeId) ?? null

  const toolbar = (
    <div className="dg-toolbar">
      <div className="dg-brand">
        <span className="dg-brand-badge">
          <Icon name="database" size={15} />
        </span>
        <span className="dg-brand-title">{tr('panel')}</span>
      </div>
      <div className="dg-toolgroup">
        <Button variant="primary" onClick={() => setDialog({ kind: 'connection' })} title={tr('newConnection')}>
          <Icon name="plus" size={11} />
          {tr('newConnection')}
        </Button>
        <Button variant="tonal" onClick={() => openQuery()} title={tr('newQuery')}>
          <Icon name="play" size={10} />
          {tr('newQuery')}
        </Button>
      </div>
      <span className="dg-toolbar-divider" />
      <div className="dg-toolgroup dg-obj-pills">
        {OBJECT_ACTIONS.map((action) => (
          <Button
            key={action.id}
            size="sm"
            variant="ghost"
            onClick={() => openList(action.target, action.relation)}
            title={tr(action.labelKey)}
          >
            <Icon name={action.icon} size={11} />
            {tr(action.labelKey)}
          </Button>
        ))}
      </div>
      <div className="dg-spacer" />
      <button
        type="button"
        className={`dg-binding-chip${bindings.length > 0 ? ' dg-binding-chip-active' : ''}`}
        onClick={() => setDialog({ kind: 'workspaces' })}
        title={bindings.length > 0 ? `${tr('boundProject')}: ${bindings.map((b) => b.connectionName || b.connectionId).join(', ')}` : tr('projectUnbound')}
      >
        <span className={`dg-dot${bindings.length > 0 ? ' dg-dot-open' : ''}`} />
        <Icon name="link" size={11} />
        <span className="dg-binding-chip-label">
          {bindings.length > 0
            ? `${tr('boundProject')}: ${bindings[0].connectionName || bindings[0].connectionId}${bindings.length > 1 ? ` (+${bindings.length - 1})` : ''}`
            : tr('workspaces')}
        </span>
      </button>
      {meta.meta?.allowWrites ? (
        <span className="dg-chip dg-chip-writable" title={tr('writesEnabled')}>
          {tr('writesEnabled')}
        </span>
      ) : (
        <span className="dg-chip" title={tr('readOnlyForAgent')}>
          {tr('readOnlyForAgent')}
        </span>
      )}
      <IconButton icon="refresh" title={tr('refresh')} onClick={() => { void store.connections.load(); void store.meta.load() }} />
    </div>
  )

  const tabbar = tabs.tabs.length ? (
    <div className="dg-tabs" role="tablist">
      {tabs.tabs.map((tab) => (
        /* A tab is a div holding its own close button: nesting a button inside a
           button is invalid, and the old span-with-role could not be focused. */
        <div
          key={tab.id}
          role="tab"
          tabIndex={tab.id === tabs.activeId ? 0 : -1}
          aria-selected={tab.id === tabs.activeId}
          className={`dg-tab${tab.id === tabs.activeId ? ' dg-tab-active' : ''}`}
          onClick={() => store.tabs.activate(tab.id)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              store.tabs.activate(tab.id)
              return
            }
            /* Roving tabindex: only the active tab is in the Tab order, so the
               arrow keys have to carry focus to its neighbours. */
            const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
            if (step === 0) return
            event.preventDefault()
            const siblings = event.currentTarget.parentElement?.children
            const count = siblings?.length ?? 0
            if (!count) return
            const next = tabs.tabs[(tabs.tabs.findIndex((entry) => entry.id === tab.id) + step + count) % count]
            if (!next) return
            store.tabs.activate(next.id)
            ;(siblings?.[tabs.tabs.indexOf(next)] as HTMLElement | undefined)?.focus()
          }}
          title={tab.title}
        >
          <Icon
            name={tab.kind === 'table' ? (tab.tableKind === 'view' ? 'view' : 'table') : tab.kind === 'sql' ? 'play' : tab.kind === 'queries' ? 'bookmark' : tab.kind === 'redis' ? 'database' : 'info'}
            size={10}
          />
          <span className="dg-tab-label">{tab.title}</span>
          <button
            type="button"
            className="dg-tab-close"
            aria-label={`${tr('close')} ${tab.title}`}
            onClick={(event) => {
              event.stopPropagation()
              store.tabs.close(tab.id)
            }}
          >
            <Icon name="x" size={9} />
          </button>
        </div>
      ))}
    </div>
  ) : null

  const panes = tabs.tabs.map((tab) => {
    if (tab.id !== tabs.activeId) return null
    const connection = connectionOf(tab.connectionId)
    switch (tab.kind) {
      case 'overview': {
        const database = store.connections.session(tab.connectionId).databases.find((entry) => entry.name === tab.database)
        if (!database) return null
        return (
          <OverviewView
            key={tab.id}
            t={tr}
            store={store}
            connectionId={tab.connectionId}
            database={database}
            schemas={database.schemas}
            onOpenRelations={(kind) => openList('relations', kind)}
          />
        )
      }
      case 'table':
        return <TableView key={tab.id} t={tr} tab={tab} engine={engineOf(tab.connectionId)} notify={notify} />
      case 'sql':
        return (
          <SqlView
            key={tab.id}
            t={tr}
            tab={tab}
            tables={store.catalog.relationsOf(`${tab.connectionId}|${tab.database}|`).map((relation) => relation.name)}
            notify={notify}
            onSaved={() => void store.queries.load()}
          />
        )
      case 'relations':
        return (
          <RelationsView
            key={tab.id}
            t={tr}
            store={store}
            connectionId={tab.connectionId}
            database={tab.database}
            schema={tab.schema}
            kind={tab.relation}
            onOpen={(relation) => {
              if (connection) openTable(connection, tab.database, tab.schema, relation)
            }}
            onQuery={(relation) => openQuery(connection, selectFrom(engineOf(tab.connectionId), relation.name))}
            notify={notify}
          />
        )
      case 'routines':
        return <RoutinesView key={tab.id} t={tr} store={store} connectionId={tab.connectionId} database={tab.database} schema={tab.schema} />
      case 'accounts':
        return <AccountsView key={tab.id} t={tr} store={store} connectionId={tab.connectionId} />
      case 'queries':
        return <QueriesView key={tab.id} t={tr} store={store} onOpen={openSavedQuery} notify={notify} />
      case 'redis':
        return <RedisView key={tab.id} t={tr} tab={tab} notify={notify} />
      default:
        return null
    }
  })

  const status = (
    <div className="dg-status">
      {connections.activeId ? (
        <span className="dg-status-item">
          <Icon name="database" size={10} />
          <b>{connectionOf(connections.activeId)?.name ?? ''}</b>
          <span>{store.connections.session(connections.activeId).version || connectionOf(connections.activeId)?.engine || ''}</span>
        </span>
      ) : (
        <span className="dg-status-item">{tr('selectConnection')}</span>
      )}
      {scope ? (
        <span className="dg-status-item">
          <span>{scope.database}</span>
          {scope.schema ? <span>· {scope.schema}</span> : null}
        </span>
      ) : null}
      <div className="dg-spacer" />
      {bindings.length > 0 ? (
        <span className="dg-status-item">
          {tr('boundProject')}: {bindings.length}
        </span>
      ) : null}
      <span className="dg-status-item">{activeTab ? activeTab.kind : 'ready'}</span>
    </div>
  )

  return (
    <div className="dg-root">
      <style>{panelCss}</style>
      {toolbar}
      {meta.error ? (
        <Banner tone="error" onClose={() => void store.meta.load()}>
          {meta.error}
        </Banner>
      ) : null}
      <div className="dg-body">
        <div style={{ width: treeWidth, flex: `0 0 ${treeWidth}px`, display: 'flex', minWidth: 0 }}>
          <TreePane
            store={store}
            t={tr}
            onNewConnection={() => setDialog({ kind: 'connection' })}
            selectedDatabaseKey={activeDatabaseKey}
            onSelectDatabase={openDatabase}
            onOpenTable={(connection, database, schema, relation) =>
              openTable(connection, database.name, schema, relation)
            }
            onConnectionMenu={connectionMenu}
            onDatabaseMenu={databaseMenu}
          />
        </div>
        <Splitter width={treeWidth} setWidth={setTreeWidth} min={200} max={420} />
        <div className="dg-main">
          {tabbar}
          {tabs.tabs.length === 0 ? (
            <Empty title={tr('selectConnection')} hint={tr('agentHint')}>
              <div className="dg-welcome-actions">
                <Button variant="primary" onClick={() => setDialog({ kind: 'connection' })}>
                  <Icon name="plus" size={11} />
                  {tr('newConnection')}
                </Button>
                <Button variant="tonal" onClick={() => openQuery()}>
                  <Icon name="play" size={10} />
                  {tr('newQuery')}
                </Button>
                <Button variant="ghost" onClick={() => setDialog({ kind: 'workspaces' })}>
                  <Icon name="link" size={11} />
                  {tr('workspaces')}
                </Button>
              </div>
            </Empty>
          ) : null}
          {panes}
          {toast ? (
            <div className={`dg-toast${toast.tone === 'error' ? ' dg-toast-error' : ''}`}>
              <Icon name={toast.tone === 'error' ? 'alert' : 'check'} size={11} />
              <span className="dg-truncate">{toast.message}</span>
            </div>
          ) : null}
        </div>
      </div>
      {status}
      {dialog && dialog.kind === 'connection' ? (
        <ConnectionDialog
          t={tr}
          engines={meta.meta?.engines ?? []}
          initial={dialog.initial ?? null}
          onClose={() => setDialog(null)}
          onSave={saveConnection}
        />
      ) : null}
      {dialog && dialog.kind === 'workspaces' ? (
        <WorkspaceDialog t={tr} store={store} onClose={() => setDialog(null)} notify={notify} />
      ) : null}
      {confirmDelete ? (
        <Menu
          x={window.innerWidth / 2}
          y={window.innerHeight / 2}
          onClose={() => setConfirmDelete(null)}
          items={[
            { label: tr('confirmDeleteConnection'), disabled: true },
            { separator: true },
            { label: tr('cancel'), onClick: () => setConfirmDelete(null) },
            {
              label: tr('delete'),
              icon: 'trash',
              danger: true,
              onClick: () => {
                const target = confirmDelete
                setConfirmDelete(null)
                void store.connections.remove(target.id).catch((cause: unknown) => notify(cause instanceof Error ? cause.message : String(cause), 'error'))
              },
            },
          ]}
        />
      ) : null}
      {menu ? <Menu x={menu.x} y={menu.y} items={menu.items} onClose={() => setMenu(null)} /> : null}
    </div>
  )
}

export type { GridPanelProps }
