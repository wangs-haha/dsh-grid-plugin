/**
 * Create or edit a connection.
 *
 * Engines are cards with their own mark and tags, the environment colour is a
 * swatch row, and the form is split into labelled sections instead of one block.
 * Switching engines stays pure local state: no driver, no network.
 */

import { useState } from 'react'

import { api } from '../lib/api'
import { fmt } from '../lib/format'
import type { Connection, ConnectionInput, ConnectionColor, EngineInfo } from '../lib/types'
import { Banner, Button, Field, Icon, Input, Modal, Select, Spinner } from '../ui/kit'

/** Brand colour and glyph used for an engine's mark (drawn, not copied). */
const ENGINE_MARK: Record<string, { color: string; glyph: 'cylinder' | 'layers' | 'file' }> = {
  mysql: { color: '#e48e00', glyph: 'cylinder' },
  postgres: { color: '#336791', glyph: 'cylinder' },
  sqlite: { color: '#0f80cc', glyph: 'file' },
  sqlserver: { color: '#cc2927', glyph: 'cylinder' },
  redis: { color: '#dc382d', glyph: 'layers' },
}

/** Tags shown inside an engine card: protocol, endpoint and driver. */
const ENGINE_TAGS: Record<string, string[]> = {
  mysql: ['TCP', ':3306', 'mysql2'],
  postgres: ['TCP', ':5432', 'pg'],
  sqlite: ['file', 'built-in'],
  sqlserver: ['TDS', ':1433', 'mssql'],
  redis: ['TCP', ':6379', 'ioredis'],
}

const SWATCHES: Array<{ value: ConnectionColor; color: string }> = [
  { value: 'none', color: 'var(--dsw-alias-border-l2)' },
  { value: 'green', color: 'var(--dsw-alias-state-success-primary)' },
  { value: 'yellow', color: 'var(--dsw-alias-state-warn-primary)' },
  { value: 'red', color: 'var(--dsw-alias-state-error-primary)' },
]

/** One engine mark: a rounded tile in the brand colour with a simple glyph. */
export function EngineLogo({ engine, size = 26 }: { engine: string; size?: number }): JSX.Element {
  const mark = ENGINE_MARK[engine] ?? { color: '#6b7280', glyph: 'cylinder' as const }
  const path =
    mark.glyph === 'layers'
      ? 'M12 4l7 3.5-7 3.5-7-3.5zM5 12l7 3.5 7-3.5M5 16.5l7 3.5 7-3.5'
      : mark.glyph === 'file'
        ? 'M7 3h7l4 4v14H7zM10 12h5M10 16h5'
        : 'M12 4c3.9 0 6 1.1 6 2.5S15.9 9 12 9 6 7.9 6 6.5 8.1 4 12 4zM6 6.5v11c0 1.4 2.1 2.5 6 2.5s6-1.1 6-2.5v-11'
  return (
    <span className="dg-logo" style={{ width: size, height: size, background: mark.color }} aria-hidden>
      <svg
        width={size * 0.68}
        height={size * 0.68}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={path} />
      </svg>
    </span>
  )
}

interface ConnectionDialogProps {
  t: (key: string) => string
  engines: EngineInfo[]
  initial: Connection | null
  onClose: () => void
  onSave: (input: ConnectionInput) => Promise<void>
}

export function ConnectionDialog(props: ConnectionDialogProps): JSX.Element {
  const { t, engines } = props
  const initial = props.initial
  const [engine, setEngine] = useState<string>(initial?.engine ?? 'sqlite')
  const [form, setForm] = useState(() => ({
    name: initial?.name ?? '',
    group: initial?.group ?? '',
    host: initial?.host || '127.0.0.1',
    port: initial?.port ? String(initial.port) : '',
    user: initial?.user ?? '',
    password: '',
    database: initial?.database ?? '',
    file: initial?.file ?? '',
    redisDb: String(initial?.redisDb ?? 0),
    sslMode: initial?.sslMode ?? 'disable',
    color: (initial?.color ?? 'none') as ConnectionColor,
  }))
  const [probe, setProbe] = useState<{ ok: boolean; text: string } | null>(null)
  const [testing, setTesting] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const info = engines.find((entry) => entry.id === engine)
  const busy = testing || saving
  const set = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setForm((current) => ({ ...current, [key]: event.target.value }))

  const payload = (): ConnectionInput => {
    const body: ConnectionInput = {
      name: form.name.trim(),
      engine: engine as ConnectionInput['engine'],
      group: form.group.trim(),
      host: form.host.trim(),
      port: Number.parseInt(form.port, 10) || info?.defaultPort || 0,
      user: form.user.trim(),
      database: form.database.trim(),
      file: form.file.trim(),
      redisDb: Number.parseInt(form.redisDb, 10) || 0,
      sslMode: form.sslMode as ConnectionInput['sslMode'],
      color: form.color,
    }
    if (form.password !== '' || !initial?.hasPassword) body.password = form.password
    return body
  }

  const test = async (): Promise<void> => {
    setTesting(true)
    setProbe(null)
    setError('')
    try {
      const result = await api.testDraft(payload(), initial?.id)
      setProbe({ ok: true, text: fmt(t('testOk'), { version: result.serverVersion ?? '', ms: result.latencyMs ?? 0 }) })
    } catch (cause) {
      setProbe({ ok: false, text: fmt(t('testFailed'), { error: cause instanceof Error ? cause.message : String(cause) }) })
    } finally {
      setTesting(false)
    }
  }

  const save = async (): Promise<void> => {
    setSaving(true)
    setError('')
    try {
      await props.onSave(payload())
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause))
      setSaving(false)
    }
  }

  /* Empty until the user types one: an endpoint chip of "…" said nothing. */
  const endpoint = info?.kind === 'file' ? form.file.trim() : `${form.host || '…'}:${form.port || info?.defaultPort || '…'}`

  return (
    <Modal
      title={initial ? t('edit') : t('newConnection')}
      onClose={props.onClose}
      busy={busy}
      width={620}
      footer={
        <>
          <span className="dg-muted dg-hint" style={{ marginRight: 'auto', maxWidth: '54%' }}>
            {probe?.text ?? ''}
          </span>
          <Button onClick={() => void test()} disabled={busy}>
            {testing ? <Spinner /> : null}
            {t('test')}
          </Button>
          <Button onClick={props.onClose} disabled={busy}>
            {t('cancel')}
          </Button>
          <Button variant="primary" onClick={() => void save()} disabled={busy}>
            {saving ? <Spinner /> : null}
            {t('save')}
          </Button>
        </>
      }
    >
      <div className="dg-engines">
        {engines.map((entry) => (
          <button
            key={entry.id}
            type="button"
            className={`dg-engine${entry.id === engine ? ' dg-engine-active' : ''}`}
            onClick={() => {
              setEngine(entry.id)
              setForm((current) => ({ ...current, port: String(entry.defaultPort || ''), sslMode: 'disable' }))
              setProbe(null)
            }}
          >
            <span className="dg-engine-head">
              <EngineLogo engine={entry.id} size={24} />
              <span className="dg-engine-name">{entry.label}</span>
            </span>
            <span className="dg-tags">
              {(ENGINE_TAGS[entry.id] ?? []).map((tag) => (
                <span key={tag} className="dg-tag">
                  {tag}
                </span>
              ))}
            </span>
          </button>
        ))}
      </div>

      <div className="dg-tags dg-summary">
        <span className="dg-tag dg-tag-strong">{info?.label ?? engine}</span>
        {endpoint ? <span className="dg-tag">{endpoint}</span> : null}
        {form.database ? <span className="dg-tag">{form.database}</span> : null}
        {form.group ? <span className="dg-tag">{form.group}</span> : null}
        {form.sslMode !== 'disable' ? <span className="dg-tag">TLS</span> : null}
      </div>

      <section className="dg-form-section">
        <div className="dg-section-title">{t('identity')}</div>
        <div className="dg-form">
          <Field label={t('name')}>
            <Input value={form.name} onChange={set('name')} placeholder={info?.label} />
          </Field>
          <Field label={t('group')}>
            <Input value={form.group} onChange={set('group')} placeholder="dev" />
          </Field>
        </div>
        <div className="dg-colors">
          <span className="dg-field-label">{t('color')}</span>
          {SWATCHES.map((swatch) => (
            <button
              key={swatch.value}
              type="button"
              className={`dg-swatch${swatch.value === 'none' ? ' dg-swatch-none' : ''}${form.color === swatch.value ? ' dg-swatch-on' : ''}`}
              style={{ background: swatch.color }}
              title={swatch.value}
              aria-label={swatch.value}
              aria-pressed={form.color === swatch.value}
              onClick={() => setForm((current) => ({ ...current, color: swatch.value }))}
            >
              {form.color === swatch.value ? <Icon name="check" size={10} /> : null}
            </button>
          ))}
        </div>
      </section>

      <section className="dg-form-section">
        {/* The file section holds a single field, so a heading would only repeat
            the field's own label. */}
        {info?.kind === 'file' ? null : <div className="dg-section-title">{t('server')}</div>}
        {info?.kind === 'file' ? (
          <div className="dg-form">
            <Field label={t('file')} wide hint="e.g. D:\\data\\app.db">
              <Input value={form.file} onChange={set('file')} placeholder="C:/data/app.db" />
            </Field>
          </div>
        ) : (
          <div className="dg-form">
            <Field label={t('host')}>
              <Input value={form.host} onChange={set('host')} />
            </Field>
            <Field label={t('port')}>
              <Input value={form.port} onChange={set('port')} placeholder={String(info?.defaultPort ?? '')} />
            </Field>
            <Field label={t('user')}>
              <Input value={form.user} onChange={set('user')} />
            </Field>
            <Field label={t('password')} hint={initial?.hasPassword ? t('passwordKeep') : undefined}>
              <Input type="password" value={form.password} onChange={set('password')} autoComplete="new-password" />
            </Field>
            {engine === 'redis' ? (
              <Field label={t('redisDb')}>
                <Input value={form.redisDb} onChange={set('redisDb')} inputMode="numeric" />
              </Field>
            ) : (
              <Field label={t('database')}>
                <Input value={form.database} onChange={set('database')} placeholder="optional" />
              </Field>
            )}
            <Field label="TLS / SSL">
              <Select
                value={form.sslMode}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    sslMode: event.target.value as ConnectionInput['sslMode'] & string,
                  }))
                }
              >
                <option value="disable">{t('sslDisable')}</option>
                <option value="require">{t('sslRequire')}</option>
                <option value="verify-ca">{t('sslVerifyCa')}</option>
                <option value="verify-full">{t('sslVerifyFull')}</option>
              </Select>
            </Field>
          </div>
        )}
      </section>

      {error ? (
        <Banner tone="error" onClose={() => setError('')}>
          {error}
        </Banner>
      ) : null}
    </Modal>
  )
}
