/**
 * Bind each workspace to a connection and database.
 *
 * A conversation in that workspace then reads the bound database without asking
 * which connection to use, and the access is read-only.
 */

import { useState } from 'react'

import { api } from '../lib/api'
import type { ProjectBinding } from '../lib/types'
import { useStore, type GridStore } from '../store'
import { Banner, Button, Empty, Field, Icon, Input, Modal, Select } from '../ui/kit'

interface WorkspaceDialogProps {
  t: (key: string) => string
  store: GridStore
  onClose: () => void
  notify: (message: string, tone?: 'info' | 'error' | 'success') => void
}

export function WorkspaceDialog(props: WorkspaceDialogProps): JSX.Element {
  const { t, store } = props
  const meta = useStore(store.meta)
  const connections = useStore(store.connections)
  const [draft, setDraft] = useState<Record<string, { connectionId: string; database: string }>>({})
  const [busy, setBusy] = useState('')
  const [error, setError] = useState('')

  const workspaces = meta.meta?.workspaces ?? []
  const bindings = meta.meta?.bindings ?? []
  const bindingOf = (workspaceId: string): ProjectBinding | undefined => bindings.find((binding) => binding.workspaceId === workspaceId)

  const valueOf = (workspaceId: string): { connectionId: string; database: string } => {
    const current = bindingOf(workspaceId)
    return draft[workspaceId] ?? { connectionId: current?.connectionId ?? '', database: current?.database ?? '' }
  }

  const update = (workspaceId: string, patch: Partial<{ connectionId: string; database: string }>): void =>
    setDraft((current) => ({ ...current, [workspaceId]: { ...valueOf(workspaceId), ...patch } }))

  const bind = async (workspaceId: string, workspacePath: string): Promise<void> => {
    const value = valueOf(workspaceId)
    if (!value.connectionId) return setError(t('selectConnection'))
    setBusy(workspaceId)
    setError('')
    try {
      await api.bindProject({
        workspaceId,
        workspacePath,
        connectionId: value.connectionId,
        database: value.database,
      })
      await store.meta.load()
      const targetConn = connections.items.find((c) => c.id === value.connectionId)
      const connName = targetConn?.name || value.connectionId
      const dbSuffix = value.database ? ` (${value.database})` : ''
      const rawNotice = t('projectBound')
      const msg = rawNotice
        .replace('{name}', connName)
        .replace('（{database}）', dbSuffix)
        .replace('({database})', dbSuffix)
        .replace('{database}', value.database || '')
      props.notify(msg, 'success')
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause))
    } finally {
      setBusy('')
    }
  }

  const unbind = async (workspaceId: string): Promise<void> => {
    setBusy(workspaceId)
    try {
      await api.unbindProject(workspaceId)
      await store.meta.load()
      props.notify(t('unbindProject') + ' ✓', 'info')
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause))
    } finally {
      setBusy('')
    }
  }

  return (
    <Modal
      icon="link"
      title={t('workspaces')}
      subtitle={t('agentHint')}
      onClose={props.onClose}
      width={680}
      footer={<Button onClick={props.onClose}>{t('close')}</Button>}
    >
      {error ? (
        <Banner tone="error" onClose={() => setError('')}>
          {error}
        </Banner>
      ) : null}
      {workspaces.length === 0 ? (
        <Empty title={t('noWorkspaces')} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: '60vh', overflow: 'auto', padding: '2px 0' }}>
          {workspaces.map((workspace) => {
            const binding = bindingOf(workspace.id)
            const value = valueOf(workspace.id)
            const activeConn = connections.items.find((c) => c.id === value.connectionId)
            const knownDbs = value.connectionId ? store.connections.session(value.connectionId).databases : []

            return (
              <div key={workspace.id} className="dg-ws-row">
                <div className="dg-ws-head">
                  <span className="dg-ws-icon">
                    <Icon name="folder" size={14} />
                  </span>
                  <div className="dg-truncate" style={{ flex: 1, minWidth: 0 }}>
                    <div className="dg-ws-title">{workspace.title}</div>
                    <div className="dg-ws-path" title={workspace.path}>
                      {workspace.path}
                    </div>
                  </div>
                  {binding ? (
                    <span className="dg-status-badge dg-status-badge-ok">
                      <span className="dg-dot dg-dot-open" />
                      {t('boundProject')}
                    </span>
                  ) : (
                    <span className="dg-status-badge">
                      {t('projectUnbound')}
                    </span>
                  )}
                </div>

                {binding ? (
                  <div className="dg-tags" style={{ marginTop: 2, marginBottom: 4 }}>
                    <span className="dg-tag dg-tag-strong">
                      <Icon name="database" size={10} />
                      {binding.connectionName || binding.connectionId}
                    </span>
                    {binding.database ? (
                      <span className="dg-tag">
                        {binding.database}
                      </span>
                    ) : null}
                    <span className="dg-tag dg-tag-accent">
                      {t('readOnlyForAgent')}
                    </span>
                  </div>
                ) : null}

                <div className="dg-ws-form">
                  <Field label={t('connections')}>
                    <Select
                      value={value.connectionId}
                      onChange={(event) => {
                        const newConnId = event.target.value
                        const newConn = connections.items.find((c) => c.id === newConnId)
                        update(workspace.id, {
                          connectionId: newConnId,
                          database: newConn?.database || '',
                        })
                      }}
                    >
                      <option value="">—</option>
                      {connections.items.map((connection) => (
                        <option key={connection.id} value={connection.id}>
                          {connection.name} · {connection.engine}
                        </option>
                      ))}
                    </Select>
                  </Field>

                  <Field label={t('database')}>
                    {knownDbs.length > 0 ? (
                      <Select
                        value={value.database}
                        onChange={(event) => update(workspace.id, { database: event.target.value })}
                      >
                        <option value="">{activeConn?.database ? `${activeConn.database} (default)` : '—'}</option>
                        {knownDbs.map((db) => (
                          <option key={db.name} value={db.name}>
                            {db.name}
                          </option>
                        ))}
                      </Select>
                    ) : (
                      <Input
                        value={value.database}
                        placeholder={activeConn?.database || 'optional'}
                        onChange={(event) => update(workspace.id, { database: event.target.value })}
                      />
                    )}
                  </Field>

                  <div className="dg-ws-actions">
                    <Button
                      size="sm"
                      variant="primary"
                      disabled={busy === workspace.id || !value.connectionId}
                      onClick={() => void bind(workspace.id, workspace.path)}
                    >
                      <Icon name="link" size={11} />
                      {t('bindProject')}
                    </Button>
                    {binding ? (
                      <Button size="sm" variant="ghost" disabled={busy === workspace.id} onClick={() => void unbind(workspace.id)}>
                        {t('unbindProject')}
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </Modal>
  )
}
