/** Real loopback sockets and a deterministic fake SSH client; no external DB. */
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { EventEmitter, once } from 'node:events'
import { createServer, connect } from 'node:net'
import { PassThrough } from 'node:stream'
import { test } from 'node:test'
import { TransportManager, verifyHostKey } from '../lib/transport.js'
import { SessionPool } from '../lib/session.js'
import { openDatabase } from '../lib/open.js'

const key = Buffer.from('deterministic host key bytes')
const fingerprint = 'SHA256:' + createHash('sha256').update(key).digest('base64').replace(/=$/, '')
const fields = (id = 'c1') => ({ id, engine: 'postgres', host: 'db.internal', port: 5432,
  ssh: { enabled: true, host: 'jump.example', port: 22, username: 'u', authType: 'password', password: 'do-not-log', hostFingerprint: fingerprint } })

function harness(options = {}) {
  const clients = []
  class Client extends EventEmitter {
    constructor() { super(); clients.push(this); this.forwards = []; this.destroyed = false }
    connect(config) {
      this.config = config
      if (options.manual) return
      queueMicrotask(() => {
        if (!config.hostVerifier(key)) this.emit('error', Object.assign(new Error('secret should not escape'), { level: 'client-ssh' }))
        else if (options.authError) this.emit('error', Object.assign(new Error('do-not-log'), { level: 'client-authentication' }))
        else this.emit('ready')
      })
    }
    forwardOut(src, port, host, targetPort, callback) {
      this.forwards.push({ src, port, host, targetPort, callback })
      if (options.pending) return
      const stream = new PassThrough()
      this.forwards.at(-1).stream = stream
      queueMicrotask(() => callback(options.forwardError ? new Error('private target details') : null, stream))
    }
    end() { this.ended = true }
    destroy() { this.destroyed = true }
  }
  return { clients, manager: new TransportManager({ loadClient: async () => Client, connectTimeoutMs: 100, ...options.manager }) }
}

async function socketFor(lease) {
  const socket = lease.connect()
  await once(socket, 'connect')
  return socket
}

const turn = () => new Promise((resolve) => setImmediate(resolve))

test('SHA256 host verifier rejects missing, malformed and changed fingerprints', () => {
  assert.equal(verifyHostKey(key, fingerprint), true)
  assert.equal(verifyHostKey(Buffer.from('attacker'), fingerprint), false)
  for (const value of ['', 'anything', null, 'MD5:abc', 'SHA256:a']) assert.equal(verifyHostKey(key, value), false)
})

test('lanes share one SSH client, own separate loopback listeners, and forward independent channels', async () => {
  const { manager, clients } = harness()
  try {
    const [main, query] = await Promise.all([manager.acquire(fields()), manager.acquire(fields())])
    assert.equal(clients.length, 1)
    assert.notEqual(main.port, query.port)
    assert.equal(main.endpoint().host, '127.0.0.1')
    const a = await socketFor(main)
    const b = await socketFor(query)
    a.write('main')
    b.write('query')
    assert.equal((await once(a, 'data'))[0].toString(), 'main')
    assert.equal((await once(b, 'data'))[0].toString(), 'query')
    assert.equal(clients[0].forwards.length, 2)
    assert.ok(clients[0].forwards.every((entry) => entry.host === 'db.internal' && entry.targetPort === 5432))
    await main.release()
    assert.equal(clients[0].destroyed, false)
    assert.throws(() => main.connect(), /closed/)
    b.write('still alive')
    assert.equal((await once(b, 'data'))[0].toString(), 'still alive')
    await query.release()
    assert.equal(clients[0].destroyed, true)
    assert.equal(manager.entries.size, 0)
  } finally { await manager.dispose() }
})

test('ephemeral probes and changed configurations never reuse persistent SSH clients', async () => {
  const { manager, clients } = harness()
  try {
    const first = await manager.acquire(fields())
    const probe = await manager.acquire(fields(), { ephemeral: true })
    const changed = await manager.acquire({ ...fields(), port: 5433 })
    assert.equal(clients.length, 3)
    await probe.release()
    first.assertOpen()
    changed.assertOpen()
    await first.release()
    const replacement = await manager.acquire(fields())
    await first.release()
    replacement.assertOpen()
    assert.equal(clients.length, 4)
  } finally { await manager.dispose() }
})

test('fingerprint/auth errors are staged, redacted, and leave no resources', async () => {
  for (const authError of [false, true]) {
    const { manager, clients } = harness({ authError })
    const connection = fields()
    if (!authError) connection.ssh.hostFingerprint = 'SHA256:' + Buffer.alloc(32).toString('base64').replace(/=$/, '')
    await assert.rejects(manager.acquire(connection), (error) => {
      assert.equal(error.code, authError ? 'SSH_AUTH' : 'SSH_HOST_KEY')
      assert.ok(!error.message.includes('do-not-log'))
      return true
    })
    assert.equal(manager.entries.size, 0)
    assert.equal(clients[0].destroyed, true)
    await manager.dispose()
  }
})

test('abort while SSH authentication is pending rejects now and ignores late ready', async () => {
  const { manager, clients } = harness({ manual: true })
  const controller = new AbortController()
  const pending = manager.acquire(fields(), { signal: controller.signal })
  await turn()
  controller.abort(new Error('cancelled test'))
  await assert.rejects(pending, /cancelled test/)
  clients[0].emit('ready')
  assert.equal(manager.entries.size, 0)
  assert.equal(clients[0].destroyed, true)
  await manager.dispose()
})

test('SSH failure invalidates every lease; missing package cannot affect direct connections', async () => {
  const { manager, clients } = harness()
  const [a, b] = await Promise.all([manager.acquire(fields()), manager.acquire(fields())])
  clients[0].emit('error', new Error('do-not-log'))
  assert.equal(a.closed, true)
  assert.equal(b.closed, true)
  assert.equal(manager.entries.size, 0)
  await manager.dispose()
  const missing = new TransportManager({ loadClient: async () => { throw new Error('missing') } })
  assert.equal(await missing.acquire({ engine: 'mysql' }), null)
  await assert.rejects(missing.acquire(fields()), /setup failed/)
  await missing.dispose()
})

test('late channel callback after release destroys the channel and cannot resurrect a listener', async () => {
  const { manager, clients } = harness({ pending: true })
  const lease = await manager.acquire(fields())
  const socket = await socketFor(lease)
  await turn()
  assert.equal(clients[0].forwards.length, 1)
  await lease.release()
  const late = new PassThrough()
  clients[0].forwards[0].callback(null, late)
  assert.equal(late.destroyed, true)
  assert.equal(lease.closed, true)
  socket.destroy()
  await manager.dispose()
})

test('forward failure terminates its listener without killing another lane', async () => {
  const { manager, clients } = harness({ pending: true })
  const [a, b] = await Promise.all([manager.acquire(fields()), manager.acquire(fields())])
  const socket = await socketFor(a)
  await turn()
  clients[0].forwards[0].callback(new Error('refused'))
  assert.equal(a.closed, true)
  b.assertOpen()
  socket.destroy()
  await manager.dispose()
})

test('total open timeout covers a late driver import and cleans its result without opening', async () => {
  const { manager } = harness()
  let release
  const gate = new Promise((resolve) => { release = resolve })
  let closes = 0
  let opens = 0
  const pending = openDatabase({ engine: 'sqlite' }, { transportManager: manager, timeoutMs: 10,
    createDriver: async () => { await gate; return { async open() { opens++ }, async close() { closes++ } } } })
  await assert.rejects(pending, /timed out/)
  release()
  await turn()
  assert.equal(opens, 0)
  assert.equal(closes, 1)
  await manager.dispose()
})

test('queued work cannot reopen a connection after explicit disconnect', async () => {
  let release
  const gate = new Promise((resolve) => { release = resolve })
  let calls = 0
  const pool = new SessionPool({ createDriver: async () => ({ open: async () => 'test', close: async () => {} }) })
  pool.resolveRecord = () => ({ id: 'c1', engine: 'postgres' })
  try {
    const first = pool.withSession('c1', async () => { calls++; await gate })
    const second = pool.withSession('c1', async () => { calls++ })
    const rejection = assert.rejects(second, /queued work was cancelled/)
    await turn()
    await pool.close('c1')
    release()
    await first
    await rejection
    assert.equal(calls, 1)
    assert.equal(pool.listOpen().length, 0)
  } finally { pool.dispose(); await pool.closeAll() }
})

test('SSH operation errors (including result.error) never replay and next request rebuilds', async () => {
  const { manager, clients } = harness()
  let operations = 0
  const pool = new SessionPool({ transportManager: manager, createDriver: async () => ({ open: async () => 'test', close: async () => {} }) })
  pool.resolveRecord = () => fields()
  try {
    await assert.rejects(pool.withSession('c1', async () => {
      operations++
      clients[0].emit('error', new Error('socket closed'))
      return { results: [{ error: 'connection lost' }] }
    }), /not replayed/)
    assert.equal(operations, 1)
    assert.equal(pool.listOpen().length, 0)
    await pool.withSession('c1', async () => { operations++ })
    assert.equal(clients.length, 2)
    assert.equal(operations, 2)
  } finally { pool.dispose(); await pool.closeAll() }
})

test('active cancellation prevents idle reap until side operation completes', async () => {
  let finish
  const pending = new Promise((resolve) => { finish = resolve })
  const pool = new SessionPool({ idleMs: 1, createDriver: async () => ({
    open: async () => 'test', close: async () => {}, cancelQuery: () => pending,
  }) })
  pool.resolveRecord = () => ({ engine: 'postgres', id: 'c1' })
  try {
    const session = await pool.acquire('c1', 'query')
    session.lastUsed = 0
    const cancelling = pool.cancel('c1')
    assert.equal(await pool.reap(), 0)
    finish({ cancelled: true })
    assert.equal((await cancelling).cancelled, true)
  } finally { pool.dispose(); await pool.closeAll() }
})
