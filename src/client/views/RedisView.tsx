/** Redis key browser with namespace grouping and a command console. */

import { useEffect, useMemo, useState } from 'react'

import { api, type RedisKeyView } from '../lib/api'
import type { DatabaseNode, Tab } from '../lib/types'
import { Banner, Button, Empty, Field, Icon, IconButton, Input, Modal, Select, Spinner } from '../ui/kit'

interface RedisViewProps {
  t: (key: string) => string
  tab: Extract<Tab, { kind: 'redis' }>
  notify: (message: string, tone?: 'info' | 'error' | 'success') => void
}

interface KeyEntry {
  key: string
  type: string
  ttl: number
}

export function RedisView(props: RedisViewProps): JSX.Element {
  const { t, tab } = props
  const [databases, setDatabases] = useState<DatabaseNode[]>([])
  const [dbIndex, setDbIndex] = useState(Number(tab.database.replace(/[^0-9]/g, '')) || 0)
  const [pattern, setPattern] = useState('*')
  const [type, setType] = useState('')
  const [keys, setKeys] = useState<KeyEntry[]>([])
  const [cursor, setCursor] = useState('0')
  const [selected, setSelected] = useState('')
  const [detail, setDetail] = useState<RedisKeyView | null>(null)
  const [command, setCommand] = useState('')
  const [reply, setReply] = useState<unknown>(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [collapsed, setCollapsed] = useState<Set<string>>(() => new Set())
  const [dialog, setDialog] = useState<{ kind: 'new' | 'rename' | 'ttl' | 'value'; value?: string } | null>(null)
  const [draft, setDraft] = useState('')

  useEffect(() => {
    void api
      .redisDatabases(tab.connectionId)
      .then((result) => setDatabases(result.databases))
      .catch(() => undefined)
  }, [tab.connectionId])

  const scan = async (reset: boolean): Promise<void> => {
    try {
      const result = await api.redisScan({ connectionId: tab.connectionId, cursor: reset ? '0' : cursor, pattern, type, database: dbIndex })
      setKeys((current) => {
        const merged = reset ? [] : current.slice()
        const seen = new Set(merged.map((entry) => entry.key))
        for (const entry of result.keys) if (!seen.has(entry.key)) merged.push(entry)
        return merged.sort((a, b) => a.key.localeCompare(b.key))
      })
      setCursor(result.cursor)
      setError('')
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause))
    }
  }

  useEffect(() => {
    setKeys([])
    setSelected('')
    setDetail(null)
    void scan(true)
  }, [tab.connectionId, dbIndex])

  const openKey = async (key: string): Promise<void> => {
    setSelected(key)
    try {
      setDetail(await api.redisKey(tab.connectionId, key, dbIndex))
      setError('')
    } catch (cause) {
      setDetail(null)
      setError(cause instanceof Error ? cause.message : String(cause))
    }
  }

  const send = async (line: string): Promise<void> => {
    setBusy(true)
    try {
      const result = await api.redisCommand(tab.connectionId, line)
      setReply(result.reply)
      await scan(true)
      if (selected) await openKey(selected)
      setError('')
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause))
    } finally {
      setBusy(false)
    }
  }

  const groups = useMemo(() => {
    const map = new Map<string, KeyEntry[]>()
    for (const entry of keys) {
      const index = entry.key.indexOf(':')
      const name = index > 0 ? entry.key.slice(0, index) : ''
      const list = map.get(name) ?? []
      list.push(entry)
      map.set(name, list)
    }
    return [...map.entries()].sort((a, b) => (a[0] === '' ? 1 : b[0] === '' ? -1 : a[0].localeCompare(b[0])))
  }, [keys])

  const renderValue = (): JSX.Element => {
    if (!detail) return <Empty title={t('keyValue')} />
    if (detail.value === null || detail.value === undefined) return <Empty title={t('null')} />
    if (detail.type === 'string') return <pre className="dg-pre" style={{ padding: 9 }}>{String(detail.value)}</pre>
    if (detail.type === 'hash') {
      return (
        <div className="dg-grid-wrap">
          <table className="dg-grid" style={{ width: '100%' }}>
            <tbody>
              {Object.entries(detail.value as Record<string, unknown>).map(([field, value]) => (
                <tr key={field}>
                  <td className="dg-mono" style={{ width: '32%' }}>{field}</td>
                  <td>{String(value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
    if (Array.isArray(detail.value)) {
      return (
        <div className="dg-grid-wrap">
          <table className="dg-grid" style={{ width: '100%' }}>
            <tbody>
              {(detail.value as unknown[]).map((entry, index) => (
                <tr key={index}>
                  <td className="dg-rownum">{index}</td>
                  <td className="dg-mono">{typeof entry === 'object' ? JSON.stringify(entry) : String(entry)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
    return <pre className="dg-pre" style={{ padding: 9 }}>{JSON.stringify(detail.value, null, 2)}</pre>
  }

  return (
    <div className="dg-redis">
      <div className="dg-redis-list">
        <div className="dg-panehead">
          <Icon name="database" size={11} />
          {t('redisKeys')}
          <div className="dg-spacer" />
          <Select value={String(dbIndex)} onChange={(event) => setDbIndex(Number(event.target.value))}>
            {(databases.length ? databases : [{ name: 'db0', schemas: [] }]).map((database) => (
              <option key={database.name} value={database.name.replace('db', '')}>
                {database.name}
              </option>
            ))}
          </Select>
          <IconButton icon="plus" title={t('newKey')} size={11} onClick={() => { setDialog({ kind: 'new' }); setDraft('') }} />
          <IconButton icon="refresh" title={t('refresh')} size={11} onClick={() => void scan(true)} />
        </div>
        <div className="dg-row" style={{ padding: '4px 6px', gap: 4 }}>
          <div className="dg-search">
            <Icon name="search" size={10} />
            <input value={pattern} placeholder={t('redisPattern')} onChange={(event) => setPattern(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && void scan(true)} />
          </div>
          <Select value={type} onChange={(event) => { setType(event.target.value); void scan(true) }}>
            <option value="">any</option>
            {['string', 'hash', 'list', 'set', 'zset', 'stream'].map((kind) => (
              <option key={kind} value={kind}>{kind}</option>
            ))}
          </Select>
        </div>
        <div className="dg-redis-keys">
          {keys.length === 0 ? <div className="dg-muted" style={{ padding: 7 }}>{t('emptyObjects')}</div> : groups.map(([name, list]) => {
            const open = name === '' || !collapsed.has(name)
            return (
              <div key={name || '_'}>
                {name ? (
                  <div className="dg-rns" onClick={() => setCollapsed((current) => {
                    const next = new Set(current)
                    if (next.has(name)) next.delete(name)
                    else next.add(name)
                    return next
                  })}>
                    <span className={`dg-twist${open ? ' dg-twist-open' : ''}`}><Icon name="chevron" size={8} /></span>
                    <Icon name="folder" size={10} />
                    <span className="dg-truncate" style={{ flex: 1 }}>{name}:</span>
                    <span className="dg-badge">{list.length}</span>
                  </div>
                ) : null}
                {open ? list.map((entry) => (
                  <div key={entry.key} className={`dg-rkey${entry.key === selected ? ' dg-rkey-active' : ''}`} onClick={() => void openKey(entry.key)} title={entry.key}>
                    <span className="dg-truncate" style={{ flex: 1 }}>{name ? entry.key.slice(name.length + 1) : entry.key}</span>
                    <span className="dg-badge">{entry.type}</span>
                  </div>
                )) : null}
              </div>
            )
          })}
        </div>
        {cursor !== '0' ? (
          <div className="dg-pager">
            <Button size="sm" onClick={() => void scan(false)}>{t('scanMore')}</Button>
          </div>
        ) : null}
      </div>
      <div className="dg-redis-detail">
        {error ? <Banner tone="error" onClose={() => setError('')}>{error}</Banner> : null}
        {detail ? (
          <div className="dg-subbar">
            <span className="dg-mono dg-truncate" title={detail.key}>{detail.key}</span>
            <span className="dg-tag">{detail.type}</span>
            <span className="dg-chip">{t('ttl')}: {detail.ttl > 0 ? `${detail.ttl}s` : t('noTtl')}</span>
            <div className="dg-spacer" />
            <Button size="sm" onClick={() => { setDialog({ kind: 'rename' }); setDraft(detail.key) }}>{t('rename')}</Button>
            <Button size="sm" onClick={() => { setDialog({ kind: 'ttl' }); setDraft(detail.ttl > 0 ? String(detail.ttl) : '3600') }}>{t('setTtl')}</Button>
            <Button size="sm" onClick={() => { setDialog({ kind: 'value' }); setDraft(String(detail.value ?? '')) }}>{t('editValue')}</Button>
            <Button size="sm" variant="danger" onClick={() => void (async () => {
              // The database index must travel with the key: the Host session is
              // shared and may have been pointed at another database since.
              await api.redisDelete(tab.connectionId, detail.key, detail.database ?? dbIndex)
              setSelected('')
              setDetail(null)
              await scan(true)
              props.notify(t('deleted'), 'success')
            })()}>{t('deleteKey')}</Button>
          </div>
        ) : null}
        <div className="dg-grid-wrap">{renderValue()}</div>
        <div className="dg-redis-console">
          <div className="dg-row">
            <Icon name="play" size={10} />
            <Input value={command} placeholder={t('commandHint')} style={{ flex: 1 }} onChange={(event) => setCommand(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && command.trim() && void send(command)} />
            <Button size="sm" variant="primary" disabled={busy} onClick={() => command.trim() && void send(command)}>{t('run')}</Button>
          </div>
          {reply !== null ? <pre className="dg-pre" style={{ maxHeight: 110, overflow: 'auto' }}>{JSON.stringify(reply, null, 2)}</pre> : null}
        </div>
      </div>
      {dialog ? (
        <Modal
          title={dialog.kind === 'new' ? t('newKey') : dialog.kind === 'rename' ? t('rename') : dialog.kind === 'ttl' ? t('setTtl') : t('editValue')}
          width={420}
          onClose={() => setDialog(null)}
          footer={
            <>
              <Button onClick={() => setDialog(null)}>{t('cancel')}</Button>
              <Button
                variant="primary"
                onClick={() => {
                  void (async () => {
                    const escape = (value: string): string => value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
                    let line = ''
                    if (dialog.kind === 'new') line = `SET "${escape(draft)}" ""`
                    if (dialog.kind === 'rename' && detail) line = `RENAME "${escape(detail.key)}" "${escape(draft)}"`
                    if (dialog.kind === 'ttl' && detail) line = `EXPIRE "${escape(detail.key)}" ${Number.parseInt(draft, 10) || 0}`
                    if (dialog.kind === 'value' && detail) line = `SET "${escape(detail.key)}" "${escape(draft)}"`
                    if (line) await send(line)
                    setDialog(null)
                    props.notify(t('saved'), 'success')
                  })()
                }}
              >
                {t('save')}
              </Button>
            </>
          }
        >
          <Field label={dialog.kind === 'ttl' ? t('ttl') : dialog.kind === 'value' ? t('keyValue') : t('name')}>
            <Input value={draft} autoFocus onChange={(event) => setDraft(event.target.value)} />
          </Field>
        </Modal>
      ) : null}
    </div>
  )
}
