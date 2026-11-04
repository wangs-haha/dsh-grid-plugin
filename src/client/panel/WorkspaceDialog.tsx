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
      props.notify(t('projectBound').replace('{name}', value.connectionId).replace('{database}', value.database), 'success')
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
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause))
    } finally {
      setBusy('')
    }
  }

  return (
    <Modal
      title={t('workspaces')}
      onClose={props.onClose}
      width={660}
      footer={<Button onClick={props.onClose}>{t('close')}</Button>}
    >
      <Banner>{t('agentHint')}</Banner>
      {error ? (
        <Banner tone="error" onClose={() => setError('')}>
          {error}
        </Banner>
      ) : null}
      {workspaces.length === 0 ? (
        <Empty title={t('noWorkspaces')} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: '54vh', overflow: 'auto' }}>
          {workspaces.map((workspace) => {
            const binding = bindingOf(workspace.id)
            const value = valueOf(workspace.id)
            return (
              <div key={workspace.id} className="dg-ws-row">
                <div className="dg-ws-head">
                  <Icon name="folder" size={12} />
                  <span className="dg-ws-title">{workspace.title}</span>
                  <span className="dg-ws-path" title={workspace.path}>
                    {workspace.path}
                  </span>
                </div>
                {binding ? (
                  <div className="dg-tags">
                    <span className="dg-tag dg-tag-strong">{binding.connectionName || binding.connectionId}</span>
                    {binding.database ? <span className="dg-tag">{binding.database}</span> : null}
                    <span className="dg-tag">{t('readOnlyForAgent')}</span>
                  </div>
                ) : (
                  <div className="dg-muted dg-hint">
                    {t('projectUnbound')}
                  </div>
                )}
                <div className="dg-ws-form">
                  <Field label={t('connections')}>
                    <Select
                      value={value.connectionId}
                      onChange={(event) => update(workspace.id, { connectionId: event.target.value })}
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
                    <Input
                      value={value.database}
                      placeholder="optional"
                      onChange={(event) => update(workspace.id, { database: event.target.value })}
                    />
                  </Field>
                  <div className="dg-ws-actions">
                    <Button
                      size="sm"
                      variant="primary"
                      disabled={busy === workspace.id || !value.connectionId}
                      onClick={() => void bind(workspace.id, workspace.path)}
                    >
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
