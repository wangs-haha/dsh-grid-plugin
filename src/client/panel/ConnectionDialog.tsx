/**
 * Create or edit a connection.
 *
 * Engines are cards with their own mark, the environment colour is a
 * swatch row, and the form is organized cleanly into tabs (General, SSH, SSL).
 * Switching engines stays pure local state: no driver, no network.
 */

import { useState } from 'react'

import { api } from '../lib/api'
import { fmt } from '../lib/format'
import type { Connection, ConnectionInput, ConnectionColor, EngineInfo, SshAuthType, SshConnectionInput } from '../lib/types'
import { Banner, Button, Field, Icon, Input, Modal, Select, Spinner, TextArea } from '../ui/kit'

/** Brand colour and glyph used for an engine's mark. */
const ENGINE_MARK: Record<string, { color: string; glyph: 'cylinder' | 'layers' | 'file' }> = {
  mysql: { color: '#00758f', glyph: 'cylinder' },
  postgres: { color: '#336791', glyph: 'cylinder' },
  sqlite: { color: '#0f80cc', glyph: 'file' },
  sqlserver: { color: '#cc2927', glyph: 'cylinder' },
  redis: { color: '#dc382d', glyph: 'layers' },
}

const SWATCHES: Array<{ value: ConnectionColor; color: string }> = [
  { value: 'none', color: 'var(--dsw-alias-border-l2)' },
  { value: 'green', color: 'var(--dsw-alias-state-success-primary)' },
  { value: 'yellow', color: 'var(--dsw-alias-state-warn-primary)' },
  { value: 'red', color: 'var(--dsw-alias-state-error-primary)' },
]

/** One engine mark: a crisp SVG icon in the brand colour. */
export function EngineLogo({ engine, size = 20 }: { engine: string; size?: number }): JSX.Element {
  const mark = ENGINE_MARK[engine] ?? { color: '#1677ff', glyph: 'cylinder' as const }
  const path =
    mark.glyph === 'layers'
      ? 'M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5'
      : mark.glyph === 'file'
        ? 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8'
        : 'M21 5c0 1.66-4.03 3-9 3S3 6.66 3 5s4.03-3 9-3 9 1.34 9 3z M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5 M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3'
  return (
    <span className="dg-logo" style={{ width: size, height: size, color: mark.color }} aria-hidden>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
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
  required?: boolean
  hint?: string
  placeholder?: string
  onChange: (value: string) => void
  onClear: (clear: boolean) => void
}): JSX.Element {
  const { t, draft, hasSaved, disabled } = props
  const [showPassword, setShowPassword] = useState(false)

  const statusHint = draft.clear
    ? t('secretClearPending')
    : hasSaved
      ? t('secretKeep')
      : undefined

  return (
    <div className="dg-field-wrap">
      <Field label={props.label} required={props.required} hint={statusHint}>
        <div className="dg-input-affix-wrapper">
          {props.multiline ? (
            <TextArea
              aria-label={props.label}
              value={draft.value}
              onChange={(event) => props.onChange(event.target.value)}
              rows={4}
              autoComplete="off"
              spellCheck={false}
              disabled={disabled}
              placeholder={props.placeholder ?? '—'}
            />
          ) : (
            <Input
              aria-label={props.label}
              type={showPassword ? 'text' : 'password'}
              value={draft.value}
              onChange={(event) => props.onChange(event.target.value)}
              autoComplete="new-password"
              disabled={disabled}
              placeholder={
                draft.clear
                  ? t('secretClearPending')
                  : hasSaved
                    ? '••••••••'
                    : (props.placeholder ?? (props.required ? '' : t('optional')))
              }
            />
          )}
          <div className="dg-input-suffix-actions">
            {!props.multiline && (draft.value || hasSaved) ? (
              <button
                type="button"
                className="dg-input-action-btn"
                title={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                <Icon name={showPassword ? 'eyeOff' : 'eye'} size={13} />
              </button>
            ) : null}
            {hasSaved ? (
              <button
                type="button"
                className="dg-btn-inline-clear ant-btn ant-btn-link"
                disabled={disabled}
                onClick={() => props.onClear(!draft.clear)}
              >
                {draft.clear ? t('secretUndoClear') : t('secretClear')}
              </button>
            ) : null}
          </div>
        </div>
        {props.hint ? <div className="dg-field-hint">{props.hint}</div> : null}
      </Field>
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

  return (
    <Modal
      icon="database"
      title={initial ? t('edit') : t('newConnection')}
      onClose={props.onClose}
      busy={busy}
      width={600}
      footer={
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: 8 }}>
          <Button onClick={() => void test()} disabled={busy}>
            {testing ? <Spinner /> : null}
            {t('test')}
          </Button>
          {probe?.text ? (
            <span
              className={probe.ok ? 'dg-tag dg-tag-green' : 'dg-tag dg-tag-red'}
              style={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              title={probe.text}
            >
              <Icon name={probe.ok ? 'check' : 'alert'} size={11} />
              {probe.text}
            </span>
          ) : null}
          <div style={{ flex: 1 }} />
          <Button onClick={props.onClose} disabled={busy}>
            {t('cancel')}
          </Button>
          <Button variant="primary" onClick={() => void save()} disabled={busy}>
            {saving ? <Spinner /> : null}
            {t('save')}
          </Button>
        </div>
      }
    >
      {/* 1. Clean Engine Cards (without unnecessary tags) */}
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
            <EngineLogo engine={entry.id} size={20} />
            <span className="dg-engine-name">{entry.label}</span>
          </button>
        ))}
      </div>

      {/* 2. Modern Tab Switcher */}
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

      {/* 3. Tab Panes: All kept mounted in DOM so form drafts and controlled queries persist */}
      <div className="dg-dialog-tab-body">
        {/* Tab 1: General */}
        <div
          role="tabpanel"
          id="tab-pane-general"
          aria-labelledby="tab-btn-general"
          className="dg-tab-panel"
          style={{ display: tab === 'general' ? 'flex' : 'none' }}
        >
          <div className="dg-form">
            <Field label={t('name')} required>
              <Input value={form.name} onChange={set('name')} placeholder={info?.label ?? 'Connection Name'} />
            </Field>

            {info?.kind === 'file' ? (
              <Field label={t('file')} required hint="e.g. D:\\data\\app.db">
                <Input value={form.file} onChange={set('file')} placeholder="C:/data/app.db" />
              </Field>
            ) : (
              <>
                <Field label={t('host')} required hint={ssh.enabled ? t('sshDatabaseHostHint') : undefined}>
                  <Input value={form.host} onChange={set('host')} placeholder="127.0.0.1" />
                </Field>

                <Field label={t('port')} required>
                  <Input value={form.port} onChange={set('port')} placeholder={String(info?.defaultPort ?? '')} />
                </Field>

                <Field label={t('user')} required={engine !== 'redis'}>
                  <Input value={form.user} onChange={set('user')} placeholder={engine === 'redis' ? t('optional') : 'root'} />
                </Field>

                <SecretField label={t('password')} {...secretProps('password', initial?.hasPassword ?? false)} placeholder={t('optional')} />

                {engine === 'redis' ? (
                  <Field label={t('redisDb')}>
                    <Input value={form.redisDb} onChange={set('redisDb')} inputMode="numeric" placeholder="0" />
                  </Field>
                ) : (
                  <Field label={t('database')} hint={t('optional')}>
                    <Input value={form.database} onChange={set('database')} placeholder={t('optional')} />
                  </Field>
                )}
              </>
            )}

            <Field label={t('group')} hint={t('optional')}>
              <Input value={form.group} onChange={set('group')} placeholder="dev / staging / prod" />
            </Field>

            <div className="dg-field ant-form-item">
              <span className="dg-field-label ant-form-item-label">{t('color')}</span>
              <div className="dg-colors">
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
            </div>
          </div>
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
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
                    <Field label={t('sshHost')} required>
                      <Input value={ssh.host} onChange={setSshField('host')} required disabled={busy} autoComplete="off" placeholder="jump.example.com" />
                    </Field>

                    <Field label={t('sshPort')} required>
                      <Input value={ssh.port} onChange={setSshField('port')} required inputMode="numeric" disabled={busy} placeholder="22" />
                    </Field>

                    <Field label={t('sshUsername')} required>
                      <Input value={ssh.username} onChange={setSshField('username')} required disabled={busy} autoComplete="off" placeholder="deploy" />
                    </Field>

                    <Field label={t('sshAuthType')} required>
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

                    <Field label={t('sshHostFingerprint')} required hint={t('sshFingerprintHint')}>
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
                      <SecretField label={t('sshPassword')} required {...secretProps('sshPassword', initial?.ssh?.hasPassword ?? false)} />
                    ) : (
                      <>
                        <SecretField
                          label={t('sshPrivateKey')}
                          multiline
                          required
                          hint={t('sshPrivateKeyHint')}
                          placeholder="-----BEGIN OPENSSH PRIVATE KEY-----"
                          {...secretProps('privateKey', initial?.ssh?.hasPrivateKey ?? false)}
                        />
                        <SecretField label={t('sshPassphrase')} hint={t('optional')} placeholder={t('optional')} {...secretProps('passphrase', initial?.ssh?.hasPassphrase ?? false)} />
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
            </div>
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
            <div className="dg-form">
              <Field label="TLS / SSL" required hint={engine === 'sqlserver' ? t('sqlserverVerifyCaUnsupported') : undefined}>
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
                <Field label={t('tlsServerName')} hint={t('tlsServerNameHint')}>
                  <Input value={form.tlsServerName} onChange={set('tlsServerName')} placeholder={form.host.trim()} />
                </Field>
              ) : null}
            </div>
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
