/** SSH registry and draft-probe tests; no driver or real DB is ever opened. */
import assert from 'node:assert/strict'
import { randomBytes } from 'node:crypto'
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs'
import * as moduleHooks from 'node:module'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { after, before, test } from 'node:test'

import {
  connectionWithSecrets,
  createConnection,
  getRecord,
  listConnections,
  normalizeConnection,
  openSecret,
  publicConnection,
  resolveConnectionInput,
  sealSecret,
  updateConnection,
} from '../lib/connections.js'

let home = ''
const previousHome = process.env.DSH_HOME
const hostFingerprint = `SHA256:${Buffer.alloc(32, 1).toString('base64').replace(/=$/, '')}`
const privateKey = '  -----BEGIN OPENSSH PRIVATE KEY-----\nuntouched-key-content\n-----END OPENSSH PRIVATE KEY-----\n  '
const database = { engine: 'postgres', host: 'db.internal', user: 'db-user', sslMode: 'verify-full' }
const ssh = { enabled: true, host: 'bastion.internal', port: 22, username: 'ssh-user', authType: 'password', hostFingerprint }
const storePath = () => join(home, 'dsh-grid', 'connections.json')
const storedJson = () => readFileSync(storePath(), 'utf8')
const runtime = (id) => connectionWithSecrets(getRecord(id))

before(() => {
  home = mkdtempSync(join(tmpdir(), 'grid-ssh-config-'))
  process.env.DSH_HOME = home
})

after(() => {
  if (previousHome === undefined) delete process.env.DSH_HOME
  else process.env.DSH_HOME = previousHome
  rmSync(home, { recursive: true, force: true })
})

function assertNoSecretFields(value) {
  assert.equal(Object.hasOwn(value, 'secret'), false)
  if (value.ssh) {
    for (const field of ['passwordSecret', 'privateKeySecret', 'passphraseSecret']) {
      assert.equal(Object.hasOwn(value.ssh, field), false)
    }
  }
}

function assertPublic(value) {
  assertNoSecretFields(value)
  assert.equal(Object.hasOwn(value, 'password'), false)
  if (value.ssh) {
    for (const field of ['password', 'privateKey', 'passphrase']) assert.equal(Object.hasOwn(value.ssh, field), false)
  }
}

test('new drafts and missing-key decryption never create any files', () => {
  const draft = resolveConnectionInput({ ...database, password: 'draft-db-secret', ssh: { ...ssh, password: 'draft-ssh-secret' } })
  assert.equal(draft.password, 'draft-db-secret')
  assert.equal(draft.ssh.password, 'draft-ssh-secret')
  const sealed = `v1:${randomBytes(40).toString('base64url')}`
  const old = resolveConnectionInput({}, { ...database, secret: sealed, ssh: { ...ssh, passwordSecret: sealed } })
  assert.equal(old.password, '')
  assert.equal(old.ssh.password, '')
  assert.deepEqual(readdirSync(home), [])
})

test('password SSH exposes only presence flags and stores independent AES-GCM secrets', () => {
  const created = createConnection({
    ...database,
    password: 'db-secret-not-on-disk',
    tlsServerName: 'certificate.internal',
    ssh: { ...ssh, password: 'ssh-secret-not-on-disk', privateKey: 'ignored-key-secret', passphrase: 'ignored-passphrase-secret' },
  })
  assertPublic(created)
  assert.deepEqual(created.ssh, { ...ssh, hasPassword: true, hasPrivateKey: false, hasPassphrase: false })
  assert.equal(created.tlsServerName, 'certificate.internal')
  const record = getRecord(created.id)
  assert.match(record.secret, /^v1:/)
  assert.match(record.ssh.passwordSecret, /^v1:/)
  assert.equal(record.ssh.privateKeySecret, '')
  assert.equal(record.ssh.passphraseSecret, '')
  assert.notEqual(record.secret, record.ssh.passwordSecret)
  assert.equal(openSecret(record.secret), 'db-secret-not-on-disk')
  assert.equal(openSecret(record.ssh.passwordSecret), 'ssh-secret-not-on-disk')
  for (const plain of ['db-secret-not-on-disk', 'ssh-secret-not-on-disk', 'ignored-key-secret', 'ignored-passphrase-secret']) {
    assert.equal(storedJson().includes(plain), false)
    assert.equal(JSON.stringify(listConnections()).includes(plain), false)
  }
  const resolved = runtime(created.id)
  assertNoSecretFields(resolved)
  assert.equal(resolved.password, 'db-secret-not-on-disk')
  assert.equal(resolved.ssh.password, 'ssh-secret-not-on-disk')
  assert.equal(resolved.ssh.privateKey, '')
  assert.equal(resolved.ssh.passphrase, '')
  assert.equal(resolved.updatedAt, record.updatedAt)
})

test('private-key content and passphrase are encrypted without trimming', () => {
  const created = createConnection({ ...database, ssh: { ...ssh, authType: 'privateKey', privateKey, passphrase: '  key passphrase  ' } })
  assertPublic(created)
  assert.equal(created.ssh.hasPassword, false)
  assert.equal(created.ssh.hasPrivateKey, true)
  assert.equal(created.ssh.hasPassphrase, true)
  const record = getRecord(created.id)
  assert.equal(record.ssh.passwordSecret, '')
  assert.match(record.ssh.privateKeySecret, /^v1:/)
  assert.match(record.ssh.passphraseSecret, /^v1:/)
  assert.equal(storedJson().includes('untouched-key-content'), false)
  assert.equal(storedJson().includes('key passphrase'), false)
  assert.equal(runtime(created.id).ssh.privateKey, privateKey)
  assert.equal(runtime(created.id).ssh.passphrase, '  key passphrase  ')
  assert.equal(runtime(created.id).ssh.password, '')
})

test('partial updates preserve omitted config and ciphertext, while empty strings clear independently', () => {
  const created = createConnection({ ...database, password: 'db-keep', tlsServerName: 'cert.internal', ssh: { ...ssh, authType: 'privateKey', privateKey, passphrase: 'keep-passphrase' } })
  const original = getRecord(created.id)
  updateConnection(created.id, { name: 'renamed' })
  assert.deepEqual(getRecord(created.id).ssh, original.ssh)
  assert.equal(getRecord(created.id).secret, original.secret)
  updateConnection(created.id, { ssh: { host: 'other-bastion.internal' } })
  const changed = getRecord(created.id)
  assert.equal(changed.ssh.host, 'other-bastion.internal')
  assert.equal(changed.ssh.privateKeySecret, original.ssh.privateKeySecret)
  assert.equal(changed.ssh.passphraseSecret, original.ssh.passphraseSecret)
  assert.equal(changed.tlsServerName, 'cert.internal')
  updateConnection(created.id, { password: '', tlsServerName: '', ssh: { passphrase: '' } })
  const cleared = runtime(created.id)
  assert.equal(cleared.password, '')
  assert.equal(cleared.tlsServerName, '')
  assert.equal(cleared.ssh.privateKey, privateKey)
  assert.equal(cleared.ssh.passphrase, '')
  updateConnection(created.id, { ssh: { privateKey: '' } })
  assert.equal(runtime(created.id).ssh.privateKey, '')
  assert.equal(publicConnection(getRecord(created.id)).ssh.hasPrivateKey, false)

  const passwordConnection = createConnection({ ...database, ssh: { ...ssh, password: 'keep-or-clear' } })
  updateConnection(passwordConnection.id, { ssh: { port: 2222, password: undefined } })
  assert.equal(runtime(passwordConnection.id).ssh.password, 'keep-or-clear')
  updateConnection(passwordConnection.id, { ssh: { password: '' } })
  assert.equal(runtime(passwordConnection.id).ssh.password, '')
  assert.equal(publicConnection(getRecord(passwordConnection.id)).ssh.hasPassword, false)
})

test('disabling SSH with null or enabled:false erases all SSH configuration and secrets', () => {
  for (const disabled of [null, { enabled: false, host: 'ignored', password: 'do-not-persist' }]) {
    const created = createConnection({ ...database, password: 'database-unaffected', ssh: { ...ssh, authType: 'privateKey', privateKey, passphrase: 'remove-me' } })
    assert.equal(resolveConnectionInput({ ssh: disabled }, getRecord(created.id)).ssh, null)
    const updated = updateConnection(created.id, { ssh: disabled })
    assert.equal(updated.ssh, null)
    assert.equal(getRecord(created.id).ssh, null)
    assert.equal(runtime(created.id).password, 'database-unaffected')
    updateConnection(created.id, { ssh })
    const reenabled = runtime(created.id)
    assert.equal(reenabled.ssh.password, '')
    assert.equal(reenabled.ssh.privateKey, '')
    assert.equal(reenabled.ssh.passphrase, '')
  }
})

test('switching authentication clears the other mode and never resurrects old credentials', () => {
  const created = createConnection({ ...database, ssh: { ...ssh, password: 'old-password' } })
  const base = getRecord(created.id)
  const draft = resolveConnectionInput({ ssh: { authType: 'privateKey', privateKey, passphrase: 'new-passphrase' } }, base)
  assert.equal(draft.ssh.password, '')
  assert.equal(draft.ssh.privateKey, privateKey)
  updateConnection(created.id, { ssh: { authType: 'privateKey', privateKey, passphrase: 'new-passphrase', password: 'must-ignore' } })
  assert.equal(getRecord(created.id).ssh.passwordSecret, '')
  updateConnection(created.id, { ssh: { authType: 'password', password: 'new-password', privateKey: 'must-ignore', passphrase: 'must-ignore' } })
  assert.equal(runtime(created.id).ssh.password, 'new-password')
  assert.equal(getRecord(created.id).ssh.privateKeySecret, '')
  assert.equal(getRecord(created.id).ssh.passphraseSecret, '')
  updateConnection(created.id, { ssh: { authType: 'privateKey' } })
  assert.equal(runtime(created.id).ssh.privateKey, '')
  assert.equal(runtime(created.id).ssh.passphrase, '')
  assert.equal(runtime(created.id).ssh.password, '')
})

test('draft resolving shares update merge/clear rules but changes neither records nor files', () => {
  const created = createConnection({ ...database, password: 'stored-db-password', ssh: { ...ssh, password: 'stored-ssh-password' } })
  const base = getRecord(created.id)
  const frozen = JSON.stringify(base)
  const disk = storedJson()
  const key = readFileSync(join(home, 'dsh-grid', 'key'))
  const filenames = readdirSync(join(home, 'dsh-grid'))
  const kept = resolveConnectionInput({ name: 'unsaved', ssh: { port: '2222' } }, base)
  assert.equal(kept.password, 'stored-db-password')
  assert.equal(kept.ssh.password, 'stored-ssh-password')
  assert.equal(kept.ssh.port, 2222)
  const clear = resolveConnectionInput({ password: '', ssh: { password: '' } }, base)
  assert.equal(clear.password, '')
  assert.equal(clear.ssh.password, '')
  const replace = resolveConnectionInput({ password: 'unsaved-db', ssh: { password: 'unsaved-ssh' } }, base)
  assert.equal(replace.password, 'unsaved-db')
  assert.equal(replace.ssh.password, 'unsaved-ssh')
  assert.equal(JSON.stringify(base), frozen)
  assert.equal(storedJson(), disk)
  assert.deepEqual(readFileSync(join(home, 'dsh-grid', 'key')), key)
  assert.deepEqual(readdirSync(join(home, 'dsh-grid')), filenames)
  updateConnection(created.id, { password: '', ssh: { password: '' } })
  const persisted = runtime(created.id)
  assert.deepEqual(persisted.ssh, clear.ssh)
  assert.equal(persisted.password, clear.password)
})

test('fingerprints require a canonical 32-byte SHA256 digest and normalize optional padding', () => {
  for (const encoding of [hostFingerprint, `${hostFingerprint}=`]) {
    assert.equal(normalizeConnection({ ...database, ssh: { ...ssh, hostFingerprint: encoding } }).ssh.hostFingerprint, hostFingerprint)
  }
  const canonicalZero = `SHA256:${Buffer.alloc(32).toString('base64').replace(/=$/, '')}`
  const invalid = [
    '', null, 7, 'MD5:aa:bb', hostFingerprint.toLowerCase(), ` ${hostFingerprint}`, `${hostFingerprint}\n`,
    hostFingerprint.slice(0, -1), `${hostFingerprint}==`, hostFingerprint.replace('/', '_'),
    `SHA256:${Buffer.alloc(31).toString('base64')}`, `SHA256:${Buffer.alloc(33).toString('base64')}`,
    `${canonicalZero.slice(0, -1)}B`, `SHA256:${'-'.repeat(43)}`,
  ].filter((value) => value !== hostFingerprint)
  for (const value of invalid) {
    assert.throws(() => normalizeConnection({ ...database, ssh: { ...ssh, hostFingerprint: value } }), /ssh.hostFingerprint/, String(value))
  }
})

test('SSH strictly validates host, username, port, authType and object shape', () => {
  const bad = {
    host: ['', null, 12, ' bad.internal', 'bad.internal ', 'bad host', 'bad\nhost', 'bad\u0000host', 'bad\u200bhost', 'a'.repeat(256), 'https://host', 'host:22', '../host', '-bad', 'a..b'],
    username: ['', null, {}, ' user', 'user name', 'user\n', 'user\u0000', 'user\u200b', 'a'.repeat(129)],
    port: ['', '22tail', '22.5', '2e1', '0x16', ' 22', '22 ', true, false, null, [], {}, -1, 0, 65536, 22.5, Infinity, NaN],
    authType: ['', null, false, 'agent', 'keyboard-interactive', 'Password', 'privatekey'],
    enabled: ['true', 'false', null, 0, 1],
  }
  for (const [field, values] of Object.entries(bad)) {
    for (const value of values) {
      assert.throws(() => normalizeConnection({ ...database, ssh: { ...ssh, [field]: value } }), new RegExp(`ssh.${field}`), `${field}: ${String(value)}`)
    }
  }
  for (const value of [true, false, '', 'ssh', 1, []]) {
    assert.throws(() => normalizeConnection({ ...database, ssh: value }), /ssh must/)
  }
  for (const host of ['bastion.example', '127.0.0.1', '::1', '2001:db8::1']) {
    assert.equal(normalizeConnection({ ...database, ssh: { ...ssh, host } }).ssh.host, host)
  }
  for (const port of [1, '22', 65535]) assert.equal(normalizeConnection({ ...database, ssh: { ...ssh, port } }).ssh.port, Number(port))
  const noPort = { ...ssh }
  delete noPort.port
  assert.equal(normalizeConnection({ ...database, ssh: noPort }).ssh.port, 22)
})

test('secret fields reject coercion and enforce UTF-8 bounds without truncating', () => {
  for (const field of ['password', 'privateKey', 'passphrase']) {
    for (const value of [null, false, 10, {}, []]) {
      assert.throws(() => resolveConnectionInput({ ...database, ssh: { ...ssh, authType: 'privateKey', [field]: value } }), new RegExp(`ssh.${field}`))
    }
    const max = field === 'privateKey' ? 128 * 1024 : 16 * 1024
    const exact = 'é'.repeat(max / 2)
    const normalized = resolveConnectionInput({ ...database, ssh: { ...ssh, authType: field === 'password' ? 'password' : 'privateKey', [field]: exact } })
    assert.equal(normalized.ssh[field], exact)
    assert.throws(() => resolveConnectionInput({ ...database, ssh: { ...ssh, [field]: `${exact}a` } }), new RegExp(`ssh.${field} must be at most`))
  }
  assert.throws(() => resolveConnectionInput({ ...database, password: {} }), /password must be a string/)
  assert.throws(() => resolveConnectionInput({ ...database, password: 'a'.repeat(16 * 1024 + 1) }), /password must be at most/)
  assert.equal(resolveConnectionInput({ ...database, password: '  db spaces  ' }).password, '  db spaces  ')
})

test('SQLite rejects enabled SSH, including an engine switch, but may disable it in the same patch', () => {
  assert.throws(() => createConnection({ engine: 'sqlite', file: 'never-opened.db', ssh }), /SQLite.*SSH/)
  const created = createConnection({ ...database, ssh })
  assert.throws(() => resolveConnectionInput({ engine: 'sqlite', file: 'never-opened.db' }, getRecord(created.id)), /SQLite.*SSH/)
  const resolved = resolveConnectionInput({ engine: 'sqlite', file: 'never-opened.db', ssh: null }, getRecord(created.id))
  assert.equal(resolved.ssh, null)
  assert.equal(resolved.engine, 'sqlite')
})

test('SSH and TLS identity cannot enter through options, forged storage secrets or presence flags', () => {
  const created = createConnection({
    ...database,
    secret: sealSecret('forged-db-secret'),
    options: { ssh: 'injected-ssh-config', 'ssh.password': 'injected-ssh-password', sshHost: 'injected-ssh-host', password: 'injected-password', privateKey: 'injected-privateKey', passphrase: 'injected-passphrase', tlsServerName: 'injected-tls', connectTimeout: 1234 },
    ssh: { ...ssh, passwordSecret: sealSecret('forged-ssh-secret'), hasPassword: true, hasPrivateKey: true, hasPassphrase: true },
  })
  const record = getRecord(created.id)
  assert.equal(record.secret, '')
  assert.equal(record.ssh.passwordSecret, '')
  assert.equal(created.ssh.hasPassword, false)
  assert.equal(created.ssh.hasPrivateKey, false)
  assert.equal(created.ssh.hasPassphrase, false)
  assert.equal(created.tlsServerName, '')
  assert.deepEqual(record.options, { connectTimeout: 1234 })
  assert.equal(runtime(created.id).password, '')
  assert.equal(runtime(created.id).ssh.password, '')
  const noSsh = resolveConnectionInput({ ...database, options: { ssh: { ...ssh, password: 'never-accepted' }, sshHost: 'never-accepted' } })
  assert.equal(noSsh.ssh, null)
  assert.deepEqual(noSsh.options, {})
})

test('invalid writes do not change the registry or create credentials', () => {
  const before = storedJson()
  assert.throws(() => createConnection({ ...database, password: 'must-not-seal', ssh: { ...ssh, port: '22suffix', password: 'must-not-seal-either' } }), /ssh.port/)
  const created = createConnection({ ...database, ssh: { ...ssh, password: 'untouched-after-invalid' } })
  const afterCreate = storedJson()
  assert.throws(() => updateConnection(created.id, { password: 'must-not-overwrite', ssh: { username: 'invalid username', password: 'must-not-overwrite-either' } }), /ssh.username/)
  assert.equal(storedJson(), afterCreate)
  assert.equal(runtime(created.id).ssh.password, 'untouched-after-invalid')
  assert.equal(afterCreate.includes('must-not-seal'), false)
  assert.equal(afterCreate.includes('must-not-overwrite'), false)
  assert.notEqual(afterCreate, before)
})

test('tlsServerName has an empty default, preserves omissions, clears explicitly, and rejects invalid identities', () => {
  assert.equal(normalizeConnection(database).tlsServerName, '')
  const maxName = [63, 63, 63, 63].map((n) => 'a'.repeat(n)).join('.')
  assert.equal(maxName.length, 255)
  for (const value of ['', 'db.internal', '127.0.0.1', '2001:db8::1', maxName]) {
    assert.equal(normalizeConnection({ ...database, tlsServerName: value }).tlsServerName, value)
  }
  for (const value of [null, false, 1, {}, [], 'a'.repeat(256), ' db.internal', 'db.internal ', 'a b', 'a\nb', 'a\u0000b', 'a\u007fb', 'a\u200bb', 'https://db.internal', 'db:443', '*.internal']) {
    assert.throws(() => normalizeConnection({ ...database, tlsServerName: value }), /tlsServerName/)
  }
})

test('legacy direct records and the original database secret remain runtime-compatible', () => {
  const legacy = { id: 'legacy', ...database, port: 5432, secret: sealSecret('legacy-db-password'), options: { application_name: 'legacy' } }
  const publicValue = publicConnection(legacy)
  assert.equal(publicValue.ssh, null)
  assert.equal(publicValue.tlsServerName, '')
  assert.equal(publicValue.hasPassword, true)
  const resolved = connectionWithSecrets(legacy)
  assert.equal(resolved.password, 'legacy-db-password')
  assert.equal(resolved.ssh, null)
  assert.equal(resolved.tlsServerName, '')
  assert.equal(resolved.sslMode, 'verify-full')
  assert.deepEqual(resolved.options, { application_name: 'legacy' })
  assertNoSecretFields(resolved)
})

// A scoped in-process loader supplies only the probe function. All router and
// connection-registry code stays real; loading/calling DB drivers is impossible.
test('connections.test resolves saved/draft credentials and respects explicit clears without writing', { skip: typeof moduleHooks.registerHooks !== 'function' }, async () => {
  const captured = []
  const symbol = Symbol.for('grid.ssh-config.test.probe')
  globalThis[symbol] = async (connection) => {
    captured.push(connection)
    return { ok: true, latencyMs: 0, serverVersion: 'mock-no-network' }
  }
  const sessionUrl = new URL('../lib/session.js', import.meta.url).href
  const hook = moduleHooks.registerHooks({
    load(url, context, nextLoad) {
      if (url === sessionUrl) return {
        format: 'module',
        shortCircuit: true,
        source: 'export const isDisconnectError = () => false; export const testConnection = connection => globalThis[Symbol.for("grid.ssh-config.test.probe")](connection)',
      }
      return nextLoad(url, context)
    },
  })
  try {
    const { createRouter } = await import('../lib/api.js')
    const dispatch = createRouter({ pool: {} })
    const response = await dispatch('connections.create', { connection: { ...database, password: 'probe-db-secret', ssh: { ...ssh, password: 'probe-ssh-secret' } } })
    const created = response.connection
    assertPublic(created)
    assert.equal(response.probe.ok, true)
    assert.equal(captured.at(-1).password, 'probe-db-secret')
    assert.equal(captured.at(-1).ssh.password, 'probe-ssh-secret')
    assertNoSecretFields(captured.at(-1))
    const disk = storedJson()
    await dispatch('connections.test', { id: created.id })
    assert.equal(captured.at(-1).password, 'probe-db-secret')
    assert.equal(captured.at(-1).ssh.password, 'probe-ssh-secret')
    assertNoSecretFields(captured.at(-1))
    await dispatch('connections.test', { id: created.id, connection: { name: 'unsaved-probe', ssh: { port: 2200 } } })
    assert.equal(captured.at(-1).password, 'probe-db-secret')
    assert.equal(captured.at(-1).ssh.password, 'probe-ssh-secret')
    assert.equal(captured.at(-1).ssh.port, 2200)
    await dispatch('connections.test', { id: created.id, connection: { password: '', ssh: { password: '' } } })
    assert.equal(captured.at(-1).password, '')
    assert.equal(captured.at(-1).ssh.password, '')
    await dispatch('connections.test', { connection: { id: created.id, ssh: null } })
    assert.equal(captured.at(-1).password, 'probe-db-secret')
    assert.equal(captured.at(-1).ssh, null)
    await dispatch('connections.test', { id: created.id, connection: { ssh: { authType: 'privateKey', privateKey, passphrase: 'probe-passphrase' } } })
    assert.equal(captured.at(-1).ssh.password, '')
    assert.equal(captured.at(-1).ssh.privateKey, privateKey)
    assert.equal(captured.at(-1).ssh.passphrase, 'probe-passphrase')
    await dispatch('connections.test', { connection: { ...database, ssh: { ...ssh, password: 'draft-only-password' } } })
    assert.equal(captured.at(-1).ssh.password, 'draft-only-password')
    await assert.rejects(dispatch('connections.test', { id: 'missing', connection: database }), /connection not found/)
    await assert.rejects(dispatch('connections.test', { id: created.id, connection: { ssh: { port: '22suffix' } } }), /ssh.port/)
    assert.equal(storedJson(), disk)
    assert.equal(existsSync(join(home, 'dsh-grid', 'connections.json')), true)
  } finally {
    hook.deregister()
    delete globalThis[symbol]
  }
})
