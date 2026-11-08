/**
 * Tests for the connection registry: validation, CRUD, and the guarantee that
 * a password is sealed at rest and never appears in a public projection.
 */

import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { after, before, test } from 'node:test'

/** The temporary DSH home used for this file's registry. */
let home = ''

before(() => {
  home = mkdtempSync(join(tmpdir(), 'grid-test-'))
  process.env.DSH_HOME = home
})

after(() => {
  rmSync(home, { recursive: true, force: true })
})

/**
 * Re-import the module so it observes the current `DSH_HOME`.
 * @returns {Promise<typeof import('../lib/connections.js')>} the module.
 */
async function registry() {
  return import('../lib/connections.js')
}

test('creates a SQLite connection and never exposes the password', async () => {
  const { createConnection, listConnections, revealPassword } = await registry()
  const created = createConnection({
    name: 'local',
    engine: 'sqlite',
    file: 'C:/tmp/example.db',
    password: 'super-secret',
  })
  assert.equal(created.engine, 'sqlite')
  assert.equal(created.name, 'local')
  assert.equal(created.ssh, null)
  assert.equal(created.tlsServerName, '')
  assert.equal(created.hasPassword, true)
  assert.equal(Object.hasOwn(created, 'password'), false)
  assert.equal(Object.hasOwn(created, 'secret'), false)

  const listed = listConnections()
  assert.equal(listed.length, 1)
  assert.equal(JSON.stringify(listed).includes('super-secret'), false)
  assert.equal(revealPassword(created.id), 'super-secret')
})

test('the password is sealed on disk', async () => {
  const { createConnection } = await registry()
  const created = createConnection({ name: 'sealed', engine: 'sqlite', file: 'C:/tmp/sealed.db', password: 'hunter2' })
  const raw = readFileSync(join(home, 'dsh-grid', 'connections.json'), 'utf8')
  assert.equal(raw.includes('hunter2'), false)
  const parsed = JSON.parse(raw)
  const record = parsed.items.find((item) => item.id === created.id)
  assert.match(record.secret, /^v1:/)
})

test('an update keeps the stored password unless a new one is supplied', async () => {
  const { createConnection, updateConnection, revealPassword } = await registry()
  const created = createConnection({ name: 'keep', engine: 'sqlite', file: 'C:/tmp/keep.db', password: 'first' })
  const renamed = updateConnection(created.id, { name: 'renamed' })
  assert.equal(renamed.name, 'renamed')
  assert.equal(revealPassword(created.id), 'first')

  updateConnection(created.id, { password: '' })
  assert.equal(revealPassword(created.id), '')

  updateConnection(created.id, { password: 'second' })
  assert.equal(revealPassword(created.id), 'second')
})

test('validation rejects incomplete or impossible connections', async () => {
  const { createConnection } = await registry()
  assert.throws(() => createConnection({ engine: 'sqlite' }), /file path/)
  assert.throws(() => createConnection({ engine: 'mysql' }), /host is required/)
  assert.throws(() => createConnection({ engine: 'mysql', host: 'h', port: 70000 }), /port/)
  assert.throws(() => createConnection({ engine: 'redis', host: 'h', redisDb: 999 }), /database index/)
  assert.throws(() => createConnection({ engine: 'oracle', host: 'h' }), /unsupported engine/)
})

test('a network connection gets its engine default port', async () => {
  const { createConnection } = await registry()
  const created = createConnection({ name: 'pg', engine: 'postgres', host: '127.0.0.1', user: 'u' })
  assert.equal(created.port, 5432)
  const redis = createConnection({ name: 'r', engine: 'redis', host: '127.0.0.1' })
  assert.equal(redis.port, 6379)
  assert.equal(redis.redisDb, 0)
})

test('delete removes the record', async () => {
  const { createConnection, deleteConnection, listConnections } = await registry()
  const created = createConnection({ name: 'gone', engine: 'sqlite', file: 'C:/tmp/gone.db' })
  const before = listConnections().length
  assert.equal(deleteConnection(created.id), true)
  assert.equal(listConnections().length, before - 1)
  assert.equal(deleteConnection(created.id), false)
})

test('TLS verifies the certificate unless the mode says otherwise', async () => {
  const { createConnection } = await registry()

  // Asking for TLS without naming a mode gets full verification, not encryption
  // that would accept any certificate.
  const secure = createConnection({ name: 'secure', engine: 'mysql', host: 'db.internal', ssl: true })
  assert.equal(secure.sslMode, 'verify-full')
  assert.equal(secure.ssl, true)

  const bare = createConnection({ name: 'plain', engine: 'mysql', host: 'db.internal' })
  assert.equal(bare.sslMode, 'disable')
  assert.equal(bare.ssl, false)

  // The explicit opt-out survives a round trip and keeps `ssl` coherent.
  const loose = createConnection({ name: 'loose', engine: 'mysql', host: 'db.internal', sslMode: 'require' })
  assert.equal(loose.sslMode, 'require')
  assert.equal(loose.ssl, true)
})

test('a TLS mode is kept across a partial update', async () => {
  const { createConnection, updateConnection } = await registry()
  const created = createConnection({ name: 'keep', engine: 'postgres', host: 'db.internal', sslMode: 'verify-ca' })
  const updated = updateConnection(created.id, { name: 'renamed' })
  assert.equal(updated.sslMode, 'verify-ca')
})

test('a record written before sslMode existed reads back as the mode it connects with', async () => {
  const fs = await import('node:fs')
  const { join } = await import('node:path')
  const { listConnections, updateConnection } = await registry()
  // Hand-write a legacy record: `ssl: true` and no `sslMode`, which is what
  // version 0.4.0 stored. The runtime connects with verify-full, so the panel
  // must not display `require`.
  const file = join(process.env.DSH_HOME, 'dsh-grid', 'connections.json')
  const store = JSON.parse(fs.readFileSync(file, 'utf8'))
  store.items.push({
    id: 'c_legacy',
    name: 'legacy',
    engine: 'mysql',
    group: '',
    color: 'none',
    host: 'db.internal',
    port: 3306,
    user: 'u',
    database: '',
    file: '',
    redisDb: 0,
    ssl: true,
    options: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })
  fs.writeFileSync(file, JSON.stringify(store))

  const legacy = listConnections().find((entry) => entry.id === 'c_legacy')
  assert.equal(legacy.sslMode, 'verify-full')

  // Saving it must not silently weaken or strengthen it: it stays verify-full.
  assert.equal(updateConnection('c_legacy', { name: 'legacy 2' }).sslMode, 'verify-full')
})

test('validation failures carry a 400 so the route does not log them as internal', async () => {
  const { createConnection } = await registry()
  const error = (() => {
    try {
      createConnection({ engine: 'mysql' })
      return null
    } catch (caught) {
      return caught
    }
  })()
  assert.ok(error, 'the call throws')
  assert.equal(error.status, 400)
  assert.equal(error.name, 'GridError')
})
