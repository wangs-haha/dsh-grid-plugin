/**
 * Create or edit a connection.
 *
 * Engines are cards with their own mark and tags, the environment colour is a
 * swatch row, and the form is organized cleanly into tabs (General, SSH, SSL).
 * Switching engines stays pure local state: no driver, no network.
 */

import { useState } from 'react'

import { api } from '../lib/api'
import { fmt } from '../lib/format'
import type { Connection, ConnectionInput, ConnectionColor, EngineInfo, SshAuthType, SshConnectionInput } from '../lib/types'
import { Banner, Button, Field, Icon, Input, Modal, Select, Spinner, TextArea } from '../ui/kit'

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

interface SecretDraft {
  value: string
  clear: boolean
}

type SecretName = 'password' | 'sshPassword' | 'privateKey' | 'passphrase'
type ConnectionTab = 'general' | 'ssh' | 'ssl'

/** A blank field never deletes a saved secret; only the explicit action does. */
function SecretField(props: {
  t: (key: string) => string
  label: string
  draft: SecretDraft
  hasSaved: boolean
  multiline?: boolean
  disabled: boolean
  onChange: (value: string) => void
  onClear: (clear: boolean) => void
}): JSX.Element {
  const { t, draft } = props
  return (
    <div className="dg-field">
      <Field label={props.label} hint={draft.clear ? t('secretClearPending') : props.hasSaved ? t('secretKeep') : undefined}>
        {props.multiline ? (
          <TextArea
            aria-label={props.label}
            value={draft.value}
            onChange={(event) => props.onChange(event.target.value)}
            rows={5}
            autoComplete="off"
            spellCheck={false}
            disabled={props.disabled}
          />
        ) : (
          <Input
            aria-label={props.label}
            type="password"
            value={draft.value}
            onChange={(event) => props.onChange(event.target.value)}
            autoComplete="new-password"
            disabled={props.disabled}
          />
        )}
      </Field>
      <div>
        <Button size="sm" variant="ghost" disabled={props.disabled} onClick={() => props.onClear(!draft.clear)}>
          {draft.clear ? t('secretUndoClear') : t('secretClear')}
        </Button>
      </div>
    </div>
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
  const [tab, setTab] = useState<ConnectionTab>('general')
  const [form, setForm] = useState(() => ({
    name: initial?.name ?? '',
    group: initial?.group ?? '',
    host: initial?.host || '127.0.0.1',
    port: initial?.port ? String(initial.port) : '',
    user: initial?.user ?? '',
    database: initial?.database ?? '',
    file: initial?.file ?? '',
    redisDb: String(initial?.redisDb ?? 0),
    sslMode: initial?.sslMode ?? 'disable',
    tlsServerName: initial?.tlsServerName ?? '',
    color: (initial?.color ?? 'none') as ConnectionColor,
  }))
  const [ssh, setSsh] = useState(() => ({
    enabled: initial?.ssh?.enabled === true,
    host: initial?.ssh?.host ?? '',
    port: String(initial?.ssh?.port ?? 22),
    username: initial?.ssh?.username ?? '',
    authType: initial?.ssh?.authType ?? ('password' as SshAuthType),
    hostFingerprint: initial?.ssh?.hostFingerprint ?? '',
  }))
  const [secrets, setSecrets] = useState<Record<SecretName, SecretDraft>>(() => ({
    password: { value: '', clear: false },
    sshPassword: { value: '', clear: false },
    privateKey: { value: '', clear: false },
    passphrase: { value: '', clear: false },
  }))
  const [probe, setProbe] = useState<{ ok: boolean; text: string } | null>(null)
  const [testing, setTesting] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const info = engines.find((entry) => entry.id === engine)
  const network = engine !== 'sqlite' && info?.kind !== 'file'
  const busy = testing || saving
  const set = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setForm((current) => ({ ...current, [key]: event.target.value }))
  const setSshField = (key: 'host' | 'port' | 'username' | 'hostFingerprint') => (event: React.ChangeEvent<HTMLInputElement>) =>
    setSsh((current) => ({ ...current, [key]: event.target.value }))
  const changeSecret = (key: SecretName, value: string): void =>
    setSecrets((current) => ({ ...current, [key]: { value, clear: false } }))
  const clearSecret = (key: SecretName, clear: boolean): void =>
    setSecrets((current) => ({ ...current, [key]: { value: '', clear } }))
  const secretProps = (key: SecretName, hasSaved: boolean) => ({
    t,
    draft: secrets[key],
    hasSaved,
    disabled: busy,
    onChange: (value: string) => changeSecret(key, value),
    onClear: (clear: boolean) => clearSecret(key, clear),
  })
  const changeAuthType = (authType: SshAuthType): void => {
    setSsh((current) => ({ ...current, authType }))
    // Never hide a typed credential and send it under another authentication
    // method. Explicit clears also remove the obsolete saved credentials.
    setSecrets((current) => authType === 'password'
      ? { ...current, privateKey: { value: '', clear: true }, passphrase: { value: '', clear: true } }
      : { ...current, sshPassword: { value: '', clear: true } })
  }

  const validate = (): boolean => {
    let message = ''
    if (network && engine === 'sqlserver' && form.sslMode === 'verify-ca') {
      message = t('sqlserverVerifyCaUnsupported')
      setTab('ssl')
    } else if (network && ssh.enabled) {
      if (!ssh.host.trim() || !ssh.username.trim() || !['password', 'privateKey'].includes(ssh.authType)) {
        message = t('sshFieldsRequired')
        setTab('ssh')
      } else if (!/^\d+$/.test(ssh.port) || Number(ssh.port) < 1 || Number(ssh.port) > 65535) {
        message = t('sshPortInvalid')
        setTab('ssh')
      } else if (!/^SHA256:[A-Za-z0-9+/]{43}=?$/.test(ssh.hostFingerprint.trim())) {
        message = t('sshFingerprintInvalid')
        setTab('ssh')
      }
    }
    setError(message)
    if (message) setProbe(null)
    return !message
  }

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
    if (network) {
      body.tlsServerName = form.tlsServerName.trim()
      if (secrets.password.value !== '' || secrets.password.clear) body.password = secrets.password.value
      if (ssh.enabled) {
        const tunnel: SshConnectionInput = {
          enabled: true,
          host: ssh.host.trim(),
          port: Number(ssh.port),
          username: ssh.username.trim(),
          authType: ssh.authType,
          hostFingerprint: ssh.hostFingerprint.trim(),
        }
        if (ssh.authType === 'password') {
          if (secrets.sshPassword.value !== '' || secrets.sshPassword.clear) tunnel.password = secrets.sshPassword.value
          if (secrets.privateKey.clear) tunnel.privateKey = ''
          if (secrets.passphrase.clear) tunnel.passphrase = ''
        } else {
          if (secrets.privateKey.value !== '' || secrets.privateKey.clear) tunnel.privateKey = secrets.privateKey.value
          if (secrets.passphrase.value !== '' || secrets.passphrase.clear) tunnel.passphrase = secrets.passphrase.value
          if (secrets.sshPassword.clear) tunnel.password = ''
        }
        body.ssh = tunnel
      } else {
        body.ssh = { enabled: false }
      }
    } else {
      // An edited network connection can still have stored SSH settings. Clear
      // them explicitly so draft/save merging cannot re-enable SSH for SQLite.
      body.ssh = { enabled: false }
    }
    return body
  }

  const test = async (): Promise<void> => {
    if (!validate()) return
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
    if (!validate()) return
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
      icon="database"
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
      {/* 1. Compact Engine Picker */}
      <div className="dg-engines">
        {engines.map((entry) => (
          <button
            key={entry.id}
            type="button"
            className={`dg-engine${entry.id === engine ? ' dg-engine-active' : ''}`}
            onClick={() => {
              if (entry.id === engine) return
              setEngine(entry.id)
              setForm((current) => ({ ...current, port: String(entry.defaultPort || ''), sslMode: 'disable' }))
              setProbe(null)
              if (entry.kind === 'file') setTab('general')
            }}
          >
            <span className="dg-engine-head">
              <EngineLogo engine={entry.id} size={22} />
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

      {/* 2. Connection Summary Pill Row */}
      <div className="dg-tags dg-summary">
        <span className="dg-tag dg-tag-strong">{info?.label ?? engine}</span>
        {endpoint ? <span className="dg-tag">{endpoint}</span> : null}
        {form.database ? <span className="dg-tag">{form.database}</span> : null}
        {form.group ? <span className="dg-tag">{form.group}</span> : null}
        {network && form.sslMode !== 'disable' ? <span className="dg-tag">TLS</span> : null}
        {network && ssh.enabled ? <span className="dg-tag">SSH</span> : null}
      </div>

      {/* 3. Modern Tab Switcher */}
      {network ? (
        <div className="dg-dialog-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            id="tab-btn-general"
            aria-selected={tab === 'general'}
            aria-controls="tab-pane-general"
            className={`dg-dialog-tab${tab === 'general' ? ' dg-dialog-tab-active' : ''}`}
            onClick={() => setTab('general')}
          >
            <Icon name="database" size={13} />
            <span>{t('tabGeneral')}</span>
          </button>

          <button
            type="button"
            role="tab"
            id="tab-btn-ssh"
            aria-selected={tab === 'ssh'}
            aria-controls="tab-pane-ssh"
            className={`dg-dialog-tab${tab === 'ssh' ? ' dg-dialog-tab-active' : ''}`}
            onClick={() => setTab('ssh')}
          >
            <Icon name="link" size={13} />
            <span>{t('sshSection')}</span>
            {ssh.enabled ? <span className="dg-tab-dot-badge dg-tab-dot-active" /> : null}
          </button>

          <button
            type="button"
            role="tab"
            id="tab-btn-ssl"
            aria-selected={tab === 'ssl'}
            aria-controls="tab-pane-ssl"
            className={`dg-dialog-tab${tab === 'ssl' ? ' dg-dialog-tab-active' : ''}`}
            onClick={() => setTab('ssl')}
          >
            <Icon name="shield" size={13} />
            <span>{t('tabSsl')}</span>
            {form.sslMode !== 'disable' ? <span className="dg-tab-dot-badge dg-tab-dot-active" /> : null}
          </button>
        </div>
      ) : null}

      {/* 4. Tab Panes: All kept mounted in DOM so form drafts and controlled queries persist */}
      <div className="dg-dialog-tab-body">
        {/* Tab 1: General */}
        <div
          role="tabpanel"
          id="tab-pane-general"
          aria-labelledby="tab-btn-general"
          className="dg-tab-panel"
          style={{ display: tab === 'general' ? 'flex' : 'none' }}
        >
          <section className="dg-form-section" style={network ? { borderTop: 0, paddingTop: 0 } : undefined}>
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
            {info?.kind === 'file' ? null : <div className="dg-section-title">{t('server')}</div>}
            {info?.kind === 'file' ? (
              <div className="dg-form">
                <Field label={t('file')} wide hint="e.g. D:\\data\\app.db">
                  <Input value={form.file} onChange={set('file')} placeholder="C:/data/app.db" />
                </Field>
              </div>
            ) : (
              <div className="dg-form">
                <div className="dg-field-row dg-field-wide dg-grid-host-port">
                  <Field label={t('host')} hint={ssh.enabled ? t('sshDatabaseHostHint') : undefined}>
                    <Input value={form.host} onChange={set('host')} />
                  </Field>
                  <Field label={t('port')}>
                    <Input value={form.port} onChange={set('port')} placeholder={String(info?.defaultPort ?? '')} />
                  </Field>
                </div>
                <Field label={t('user')}>
                  <Input value={form.user} onChange={set('user')} />
                </Field>
                <SecretField label={t('password')} {...secretProps('password', initial?.hasPassword ?? false)} />
                {engine === 'redis' ? (
                  <Field label={t('redisDb')}>
                    <Input value={form.redisDb} onChange={set('redisDb')} inputMode="numeric" />
                  </Field>
                ) : (
                  <Field label={t('database')}>
                    <Input value={form.database} onChange={set('database')} placeholder="optional" />
                  </Field>
                )}
              </div>
            )}
          </section>
        </div>

        {/* Tab 2: SSH */}
        {network ? (
          <div
            role="tabpanel"
            id="tab-pane-ssh"
            aria-labelledby="tab-btn-ssh"
            className="dg-tab-panel"
            style={{ display: tab === 'ssh' ? 'flex' : 'none' }}
          >
            <section className="dg-form-section" style={{ borderTop: 0, paddingTop: 0 }}>
              <div className="dg-section-title">{t('sshSection')}</div>
              <label className="dg-field-label dg-checkbox-row">
                <input
                  type="checkbox"
                  checked={ssh.enabled}
                  disabled={busy}
                  onChange={(event) => {
                    setSsh((current) => ({ ...current, enabled: event.target.checked }))
                    setProbe(null)
                  }}
                />
                <span style={{ fontWeight: 600 }}>{t('sshEnable')}</span>
                <span className={`dg-tag${ssh.enabled ? ' dg-tag-strong' : ''}`}>{ssh.enabled ? 'Active' : 'Off'}</span>
              </label>

              {ssh.enabled ? (
                <>
                  <div className="dg-field-hint">{t('sshSingleHopHint')}</div>
                  <div className="dg-form">
                    <div className="dg-field-row dg-field-wide dg-grid-host-port">
                      <Field label={t('sshHost')}>
                        <Input value={ssh.host} onChange={setSshField('host')} required disabled={busy} autoComplete="off" />
                      </Field>
                      <Field label={t('sshPort')}>
                        <Input value={ssh.port} onChange={setSshField('port')} required inputMode="numeric" disabled={busy} />
                      </Field>
                    </div>
                    <Field label={t('sshUsername')}>
                      <Input value={ssh.username} onChange={setSshField('username')} required disabled={busy} autoComplete="off" />
                    </Field>
                    <Field label={t('sshAuthType')}>
                      <Select
                        value={ssh.authType}
                        disabled={busy}
                        required
                        onChange={(event) => changeAuthType(event.target.value as SshAuthType)}
                      >
                        <option value="password">{t('sshAuthPassword')}</option>
                        <option value="privateKey">{t('sshAuthPrivateKey')}</option>
                      </Select>
                    </Field>
                    <Field label={t('sshHostFingerprint')} wide hint={t('sshFingerprintHint')}>
                      <Input
                        value={ssh.hostFingerprint}
                        onChange={setSshField('hostFingerprint')}
                        placeholder="SHA256:…"
                        required
                        disabled={busy}
                        autoComplete="off"
                        spellCheck={false}
                      />
                    </Field>
                    {ssh.authType === 'password' ? (
                      <SecretField label={t('sshPassword')} {...secretProps('sshPassword', initial?.ssh?.hasPassword ?? false)} />
                    ) : (
                      <>
                        <div className="dg-field-wide">
                          <SecretField
                            label={t('sshPrivateKey')}
                            multiline
                            {...secretProps('privateKey', initial?.ssh?.hasPrivateKey ?? false)}
                          />
                          <div className="dg-field-hint">{t('sshPrivateKeyHint')}</div>
                        </div>
                        <SecretField label={t('sshPassphrase')} {...secretProps('passphrase', initial?.ssh?.hasPassphrase ?? false)} />
                      </>
                    )}
                  </div>
                  <Banner>{t('sshSecurityHint')}</Banner>
                </>
              ) : initial?.ssh ? (
                <div className="dg-field-hint">{t('sshDisableHint')}</div>
              ) : (
                <div className="dg-tab-placeholder">
                  <Icon name="link" size={16} />
                  <span>{t('sshSingleHopHint')}</span>
                </div>
              )}
            </section>
          </div>
        ) : null}

        {/* Tab 3: SSL / TLS */}
        {network ? (
          <div
            role="tabpanel"
            id="tab-pane-ssl"
            aria-labelledby="tab-btn-ssl"
            className="dg-tab-panel"
            style={{ display: tab === 'ssl' ? 'flex' : 'none' }}
          >
            <section className="dg-form-section" style={{ borderTop: 0, paddingTop: 0 }}>
              <div className="dg-section-title">TLS / SSL</div>
              <div className="dg-form">
                <Field label="TLS / SSL" wide hint={engine === 'sqlserver' ? t('sqlserverVerifyCaUnsupported') : undefined}>
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
                    <option value="verify-ca" disabled={engine === 'sqlserver'}>{t('sslVerifyCa')}</option>
                    <option value="verify-full">{t('sslVerifyFull')}</option>
                  </Select>
                </Field>
                {form.sslMode !== 'disable' ? (
                  <Field label={t('tlsServerName')} wide hint={t('tlsServerNameHint')}>
                    <Input value={form.tlsServerName} onChange={set('tlsServerName')} placeholder={form.host.trim()} />
                  </Field>
                ) : null}
              </div>
            </section>
          </div>
        ) : null}
      </div>

      {error ? (
        <Banner tone="error" onClose={() => setError('')}>
          {error}
        </Banner>
      ) : null}
    </Modal>
  )
}
