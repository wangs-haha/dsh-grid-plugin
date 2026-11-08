/** Source-level connection dialog tests: bundle in memory, never touch dist. */

import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { test, type TestContext } from 'node:test'
import { fileURLToPath } from 'node:url'

import { buildSync } from 'esbuild'
import { JSDOM } from 'jsdom'
import React from 'react'
import { createRoot } from 'react-dom/client'

import type { Connection, ConnectionInput, EngineInfo, SshConnectionInput } from '../src/client/lib/types'

const here = dirname(fileURLToPath(import.meta.url))
const source = buildSync({
  entryPoints: [join(here, '..', 'src', 'client', 'panel', 'ConnectionDialog.tsx')],
  bundle: true,
  write: false,
  format: 'cjs',
  platform: 'node',
  jsx: 'automatic',
  external: ['react', 'react-dom', 'react/jsx-runtime'],
}).outputFiles[0].text
const compiled = { exports: {} as { ConnectionDialog: React.ComponentType<{
  t: (key: string) => string
  engines: EngineInfo[]
  initial: Connection | null
  onClose: () => void
  onSave: (input: ConnectionInput) => Promise<void>
}> } }
new Function('require', 'module', 'exports', source)(createRequire(import.meta.url), compiled, compiled.exports)
const { ConnectionDialog } = compiled.exports

const dictionaries = buildSync({
  entryPoints: [join(here, '..', 'src', 'client', 'lib', 'i18n.ts')],
  bundle: true,
  write: false,
  format: 'cjs',
  platform: 'node',
}).outputFiles[0].text
const localeModule = { exports: {} as { en: Record<string, unknown>; zh: Record<string, unknown> } }
new Function('module', 'exports', dictionaries)(localeModule, localeModule.exports)
const translate = (language = 'en') => (key: string): string => {
  const value = (language === 'zh' ? localeModule.exports.zh : localeModule.exports.en)[key]
  return typeof value === 'string' ? value : key
}
const t = translate()
const fingerprint = `SHA256:${'A'.repeat(43)}`
const engines: EngineInfo[] = [
  { id: 'sqlite', label: 'SQLite', package: null, defaultPort: 0, kind: 'file', fields: ['file'], description: 'File' },
  { id: 'mysql', label: 'MySQL', package: 'mysql2', defaultPort: 3306, kind: 'network', fields: ['host'], description: 'TCP' },
  { id: 'postgres', label: 'PostgreSQL', package: 'pg', defaultPort: 5432, kind: 'network', fields: ['host'], description: 'TCP' },
  { id: 'sqlserver', label: 'SQL Server', package: 'mssql', defaultPort: 1433, kind: 'network', fields: ['host'], description: 'TCP' },
  { id: 'redis', label: 'Redis', package: 'ioredis', defaultPort: 6379, kind: 'network', fields: ['host'], description: 'TCP' },
]

function connection(patch: Partial<Connection> = {}): Connection {
  return {
    id: 'existing', name: 'Saved connection', engine: 'mysql', group: 'dev', color: 'green',
    host: 'db.internal', port: 3306, user: 'app', database: 'app', file: '', redisDb: 0,
    ssl: true, sslMode: 'verify-full', tlsServerName: '', hasPassword: true, createdAt: '', updatedAt: '',
    ssh: {
      enabled: true, host: 'jump.example', port: 22, username: 'deploy', authType: 'password', hostFingerprint: fingerprint,
      hasPassword: true, hasPrivateKey: false, hasPassphrase: false,
    },
    ...patch,
  }
}

/** Use the same controlled-field technique as the existing built-bundle UI tests. */
function props(element: Element): Record<string, (event: unknown) => void> {
  const key = Object.keys(element).find((name) => name.startsWith('__reactProps$'))
  assert.ok(key, 'the node is managed by React')
  return (element as unknown as Record<string, Record<string, (event: unknown) => void>>)[key]
}
const act = (React as unknown as { act: (callback: () => Promise<void> | void) => Promise<void> }).act

function field(dialog: Element, label: string): HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement {
  const found = [...dialog.querySelectorAll('label.dg-field')].find((entry) => entry.querySelector('.dg-field-label')?.textContent === label)
  const control = found?.querySelector('input, textarea, select')
  assert.ok(control, `the ${label} field exists`)
  return control as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
}

function button(container: Element, label: string): HTMLButtonElement {
  const found = [...container.querySelectorAll('button')].find((entry) => entry.textContent?.trim() === label)
  assert.ok(found, `the ${label} button exists`)
  return found
}

async function change(element: Element, value: string): Promise<void> {
  await act(async () => props(element).onChange({ target: { value } }))
}
async function click(element: Element): Promise<void> {
  await act(async () => { element.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true })) })
}
async function toggle(dialog: Element, enabled: boolean): Promise<void> {
  const checkbox = dialog.querySelector('input[type="checkbox"]')
  assert.ok(checkbox, 'network connections have an SSH checkbox')
  await act(async () => props(checkbox).onChange({ target: { checked: enabled } }))
}
async function chooseEngine(dialog: Element, label: string): Promise<void> {
  const name = [...dialog.querySelectorAll('.dg-engine-name')].find((entry) => entry.textContent === label)
  assert.ok(name, `the ${label} engine is offered`)
  await click(name.closest('button') as Element)
}
async function clear(dialog: Element, label: string, undo = false): Promise<void> {
  const wrapper = field(dialog, label).closest('label')?.parentElement
  assert.ok(wrapper)
  await click(button(wrapper, t(undo ? 'secretUndoClear' : 'secretClear')))
}

async function mount(context: TestContext, initial: Connection | null = null, language = 'en') {
  const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', { url: 'http://127.0.0.1/', pretendToBeVisual: true })
  Object.assign(globalThis, {
    window: dom.window, document: dom.window.document, self: dom.window,
    HTMLElement: dom.window.HTMLElement, Element: dom.window.Element, MouseEvent: dom.window.MouseEvent,
    Event: dom.window.Event, IS_REACT_ACT_ENVIRONMENT: true,
  })
  Object.defineProperty(globalThis, 'navigator', { value: dom.window.navigator, configurable: true })
  const requests: Array<{ action: string; id?: string; connection: ConnectionInput }> = []
  const saves: ConnectionInput[] = []
  const originalFetch = globalThis.fetch
  globalThis.fetch = async (_url, init) => {
    requests.push(JSON.parse(String(init?.body)))
    return { ok: true, status: 200, json: async () => ({ ok: true, serverVersion: 'fixture', latencyMs: 1 }) } as Response
  }
  const root = createRoot(dom.window.document.getElementById('root') as HTMLElement)
  context.after(async () => {
    await act(async () => root.unmount())
    dom.window.close()
    globalThis.fetch = originalFetch
  })
  await act(async () => {
    root.render(React.createElement(ConnectionDialog, {
      t: translate(language), engines, initial, onClose: () => {},
      onSave: async (input) => { saves.push(input) },
    }))
  })
  const dialog = dom.window.document.querySelector('[role="dialog"]') as HTMLElement
  assert.ok(dialog)
  return {
    dialog, requests, saves,
    async probe(): Promise<ConnectionInput> {
      const before = requests.length
      await click(button(dialog, translate(language)('test')))
      assert.equal(requests.length, before + 1, 'Test sends exactly one draft')
      const latest = requests[requests.length - 1]
      assert.equal(latest.action, 'connections.test')
      return latest.connection
    },
    async save(): Promise<ConnectionInput> {
      await click(button(dialog, translate(language)('save')))
      assert.equal(saves.length, 1, 'Save submits exactly one payload')
      return saves[0]
    },
  }
}

function tunnel(body: ConnectionInput): SshConnectionInput {
  assert.ok(body.ssh && body.ssh.enabled)
  return body.ssh
}
function owns(value: object, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(value, key)
}
function noSecretFlags(value: unknown): void {
  assert.doesNotMatch(JSON.stringify(value), /hasPassword|hasPrivateKey|hasPassphrase/)
}

test('creating an SSH password tunnel sends the same Test and Save payload, with the DB TLS name separate', async (context) => {
  const ui = await mount(context)
  const { dialog } = ui
  assert.equal(dialog.querySelector('input[type="checkbox"]'), null, 'SQLite has no SSH controls')
  await chooseEngine(dialog, 'MySQL')
  await toggle(dialog, true)
  assert.equal(field(dialog, t('sshPort')).value, '22')
  await click(button(dialog, t('test')))
  assert.equal(ui.requests.length, 0, 'missing required SSH fields never reach the Host')
  assert.match(dialog.textContent ?? '', /SSH host, user/)
  await change(field(dialog, t('name')), 'Production')
  await change(field(dialog, t('host')), 'db.internal')
  await change(field(dialog, t('port')), '3307')
  await change(field(dialog, t('user')), 'app')
  await change(field(dialog, t('password')), 'db-secret')
  await change(field(dialog, 'TLS / SSL'), 'verify-full')
  assert.equal(field(dialog, t('tlsServerName')).value, '')
  assert.equal(field(dialog, t('tlsServerName')).getAttribute('placeholder'), 'db.internal', 'blank TLS name defaults to DB host')
  await change(field(dialog, t('tlsServerName')), ' db-cert.internal ')
  await change(field(dialog, t('sshHost')), ' jump.example ')
  await change(field(dialog, t('sshPort')), '2222')
  await change(field(dialog, t('sshUsername')), ' deploy ')
  await change(field(dialog, t('sshHostFingerprint')), `${fingerprint}=`)
  await change(field(dialog, t('sshPassword')), 'ssh-secret')
  assert.match(dialog.textContent ?? '', /127\.0\.0\.1 means the jump host itself/)
  assert.match(dialog.textContent ?? '', /SSH does not replace database TLS/)
  assert.match(dialog.textContent ?? '', /trusted channel/)
  assert.equal(ui.requests.length, 0, 'typing and switching engines do not probe')
  const body = await ui.probe()
  assert.deepEqual(body, {
    name: 'Production', engine: 'mysql', group: '', host: 'db.internal', port: 3307, user: 'app', database: '', file: '',
    redisDb: 0, sslMode: 'verify-full', color: 'none', tlsServerName: 'db-cert.internal', password: 'db-secret',
    ssh: { enabled: true, host: 'jump.example', port: 2222, username: 'deploy', authType: 'password', hostFingerprint: `${fingerprint}=`, password: 'ssh-secret' },
  })
  assert.equal(ui.requests[0].id, undefined)
  noSecretFlags(body)
  assert.deepEqual(await ui.save(), body)
})

test('editing a password tunnel keeps all saved secrets when initially blank or typed then erased', async (context) => {
  const ui = await mount(context, connection())
  assert.equal(field(ui.dialog, t('password')).value, '')
  assert.equal(field(ui.dialog, t('sshPassword')).value, '')
  assert.match(field(ui.dialog, t('sshPassword')).closest('label')?.textContent ?? '', /Saved credential exists/)
  await change(field(ui.dialog, t('password')), 'temporary')
  await change(field(ui.dialog, t('password')), '')
  await change(field(ui.dialog, t('sshPassword')), 'temporary')
  await change(field(ui.dialog, t('sshPassword')), '')
  const body = await ui.probe()
  assert.equal(ui.requests[0].id, 'existing', 'Test merges against the saved connection')
  assert.ok(!owns(body, 'password'))
  for (const key of ['password', 'privateKey', 'passphrase']) assert.ok(!owns(tunnel(body), key))
  noSecretFlags(body)
  assert.deepEqual(await ui.save(), body)
})

test('editing a private-key tunnel never reads back key material and preserves key and passphrase', async (context) => {
  const initial = connection()
  initial.ssh = { ...initial.ssh!, authType: 'privateKey', hasPassword: false, hasPrivateKey: true, hasPassphrase: true }
  const ui = await mount(context, initial)
  assert.equal(field(ui.dialog, t('sshPrivateKey')).tagName, 'TEXTAREA')
  assert.equal(field(ui.dialog, t('sshPrivateKey')).value, '')
  assert.equal(field(ui.dialog, t('sshPassphrase')).value, '')
  assert.equal(ui.dialog.querySelector('input[type="file"]'), null, 'no arbitrary host file picker')
  assert.match(ui.dialog.textContent ?? '', /Saved private keys are never read back/)
  const body = await ui.probe()
  assert.ok(!owns(body, 'password'))
  for (const key of ['password', 'privateKey', 'passphrase']) assert.ok(!owns(tunnel(body), key))
  noSecretFlags(body)
  assert.deepEqual(await ui.save(), body)
})

test('only explicit clear actions send empty passwords and can be undone', async (context) => {
  const ui = await mount(context, connection())
  await clear(ui.dialog, t('password'))
  await clear(ui.dialog, t('sshPassword'))
  const cleared = await ui.probe()
  assert.equal(cleared.password, '')
  assert.equal(tunnel(cleared).password, '')
  await clear(ui.dialog, t('password'), true)
  await clear(ui.dialog, t('sshPassword'), true)
  const retained = await ui.probe()
  assert.ok(!owns(retained, 'password'))
  assert.ok(!owns(tunnel(retained), 'password'))
  await clear(ui.dialog, t('password'))
  await clear(ui.dialog, t('sshPassword'))
  assert.deepEqual(await ui.save(), cleared, 'clearing secrets is not blocked by UI validation')
})

test('private key and passphrase have independent explicit clear actions', async (context) => {
  const initial = connection()
  initial.ssh = { ...initial.ssh!, authType: 'privateKey', hasPassword: false, hasPrivateKey: true, hasPassphrase: true }
  const ui = await mount(context, initial)
  await clear(ui.dialog, t('sshPrivateKey'))
  let body = await ui.probe()
  assert.equal(tunnel(body).privateKey, '')
  assert.ok(!owns(tunnel(body), 'passphrase'))
  await clear(ui.dialog, t('sshPassphrase'))
  body = await ui.probe()
  assert.equal(tunnel(body).passphrase, '')
  assert.deepEqual(await ui.save(), body)
})

test('turning SSH off sends enabled:false without hidden SSH credentials', async (context) => {
  const ui = await mount(context, connection())
  await change(field(ui.dialog, t('sshPassword')), 'do-not-send')
  await toggle(ui.dialog, false)
  assert.equal(ui.dialog.querySelector('input[aria-label="SSH password"]'), null)
  const body = await ui.probe()
  assert.deepEqual(body.ssh, { enabled: false })
  assert.doesNotMatch(JSON.stringify(body), /do-not-send/)
  assert.deepEqual(await ui.save(), body)
})

test('switching to SQLite explicitly disables saved SSH without submitting hidden network credentials', async (context) => {
  const ui = await mount(context, connection())
  await change(field(ui.dialog, t('password')), 'hidden-db-secret')
  await change(field(ui.dialog, t('sshPassword')), 'hidden-ssh-secret')
  await chooseEngine(ui.dialog, 'SQLite')
  await change(field(ui.dialog, t('file')), 'C:/data/app.db')
  assert.equal(ui.dialog.querySelector('input[type="checkbox"]'), null)
  const body = await ui.probe()
  assert.equal(body.engine, 'sqlite')
  assert.equal(body.file, 'C:/data/app.db')
  assert.deepEqual(body.ssh, { enabled: false }, 'clear saved SSH instead of inheriting it during Host merge')
  for (const key of ['password', 'tlsServerName']) assert.ok(!owns(body, key))
  assert.doesNotMatch(JSON.stringify(body), /hidden-/)
  assert.deepEqual(await ui.save(), body)
})

test('switching SSH authentication erases incompatible drafts and clears saved credentials without leaking them', async (context) => {
  const ui = await mount(context, connection())
  await change(field(ui.dialog, t('sshPassword')), 'old-password-draft')
  await change(field(ui.dialog, t('sshAuthType')), 'privateKey')
  const key = '-----BEGIN OPENSSH PRIVATE KEY-----\n pasted-key \n-----END OPENSSH PRIVATE KEY-----\n'
  await change(field(ui.dialog, t('sshPrivateKey')), key)
  await change(field(ui.dialog, t('sshPassphrase')), 'key-passphrase')
  let body = await ui.probe()
  assert.equal(tunnel(body).password, '')
  assert.equal(tunnel(body).privateKey, key, 'key text is not trimmed')
  assert.equal(tunnel(body).passphrase, 'key-passphrase')
  assert.doesNotMatch(JSON.stringify(body), /old-password-draft/)
  await change(field(ui.dialog, t('sshAuthType')), 'password')
  assert.equal(field(ui.dialog, t('sshPassword')).value, '', 'returning does not resurrect a password draft')
  await change(field(ui.dialog, t('sshPassword')), 'new-password')
  body = await ui.probe()
  assert.equal(tunnel(body).password, 'new-password')
  assert.equal(tunnel(body).privateKey, '')
  assert.equal(tunnel(body).passphrase, '')
  assert.doesNotMatch(JSON.stringify(body), /pasted-key|key-passphrase/)
  await change(field(ui.dialog, t('sshAuthType')), 'privateKey')
  assert.equal(field(ui.dialog, t('sshPrivateKey')).value, '', 'returning does not resurrect a key draft')
  assert.equal(field(ui.dialog, t('sshPassphrase')).value, '')
  await change(field(ui.dialog, t('sshPrivateKey')), key)
  body = await ui.probe()
  noSecretFlags(body)
  assert.deepEqual(await ui.save(), body)
})

test('all network engines expose SSH; invalid SSH ports and unpinned fingerprints block Test and Save', async (context) => {
  const ui = await mount(context, connection())
  for (const label of ['PostgreSQL', 'SQL Server', 'Redis', 'MySQL']) {
    await chooseEngine(ui.dialog, label)
    assert.ok(ui.dialog.querySelector('input[type="checkbox"]'), `${label} supports SSH`)
  }
  for (const value of ['', '0', '65536', '22.5', '-1', '22abc']) {
    await change(field(ui.dialog, t('sshPort')), value)
    await click(button(ui.dialog, t('test')))
    await click(button(ui.dialog, t('save')))
    assert.equal(ui.requests.length, 0)
    assert.equal(ui.saves.length, 0)
    assert.match(ui.dialog.textContent ?? '', /whole number from 1 to 65535/)
  }
  await change(field(ui.dialog, t('sshPort')), '22')
  for (const value of ['', 'auto', 'SHA256:abc', `MD5:${'A'.repeat(43)}`]) {
    await change(field(ui.dialog, t('sshHostFingerprint')), value)
    await click(button(ui.dialog, t('test')))
    assert.equal(ui.requests.length, 0)
    assert.match(ui.dialog.textContent ?? '', /pinned SHA256 host fingerprint/)
  }
  await change(field(ui.dialog, t('sshHostFingerprint')), fingerprint)
  await ui.probe()
})

test('SQL Server keeps an existing unsupported verify-ca mode visible but refuses silent downgrade', async (context) => {
  const ui = await mount(context, connection({ engine: 'sqlserver', port: 1433, sslMode: 'verify-ca' }))
  const select = field(ui.dialog, 'TLS / SSL') as HTMLSelectElement
  assert.equal(select.value, 'verify-ca')
  await chooseEngine(ui.dialog, 'SQL Server')
  assert.equal(select.value, 'verify-ca', 'clicking the active engine does not silently downgrade TLS')
  assert.ok(select.querySelector<HTMLOptionElement>('option[value="verify-ca"]')?.disabled)
  assert.match(ui.dialog.textContent ?? '', /cannot verify the certificate chain without host-name verification/)
  await click(button(ui.dialog, t('test')))
  await click(button(ui.dialog, t('save')))
  assert.equal(ui.requests.length, 0)
  assert.equal(ui.saves.length, 0)
  await change(select, 'verify-full')
  const body = await ui.probe()
  assert.equal(body.sslMode, 'verify-full')
  assert.deepEqual(await ui.save(), body)
})

test('SSH and TLS safety guidance renders in Chinese as well as English', async (context) => {
  const ui = await mount(context, connection(), 'zh')
  assert.match(ui.dialog.textContent ?? '', /SSH 隧道/)
  assert.match(ui.dialog.textContent ?? '', /127\.0\.0\.1 指跳板机本机/)
  assert.match(ui.dialog.textContent ?? '', /SSH 不代替数据库 TLS/)
  assert.match(ui.dialog.textContent ?? '', /管理员的可信渠道/)
  assert.match(ui.dialog.textContent ?? '', /留空默认使用数据库主机/)
  const body = await ui.probe()
  noSecretFlags(body)
  assert.deepEqual(await ui.save(), body)
})
