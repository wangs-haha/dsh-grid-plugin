/** Security review regressions. All opens use mocks; no network/DB is contacted. */
import assert from 'node:assert/strict'
import { EventEmitter } from 'node:events'
import { createRequire } from 'node:module'
import test from 'node:test'
import { SessionPool } from '../lib/session.js'
import { PostgresDriver } from '../lib/drivers/postgres.js'

const require = createRequire(import.meta.url)
const transportManager = () => ({ acquire: async () => null, close: async () => {}, dispose: async () => {} })
const deferred = () => {
  let resolve
  const promise = new Promise((done) => { resolve = done })
  return { promise, resolve }
}

function fakeSession(id, connection = {}) {
  return {
    id, lane: 'main', engine: 'mysql', driver: {}, active: 0,
    connection,
    close: async () => { connection._closed = true },
  }
}

test('a close in the await-acquire microtask gap cancels work before operation entry', async () => {
  const pool = new SessionPool({ transportManager: transportManager() })
  const session = fakeSession('review-close-gap')
  pool.sessions.set(SessionPool.keyOf(session.id, 'main'), session)
  let calls = 0
  let closing
  try {
    const work = pool.withSession(session.id, async () => { calls += 1; return 'must-not-run' }, { retry: false })
    // The first queued run reaches await acquire before this microtask starts;
    // the operation must check the generation again after that await.
    queueMicrotask(() => { closing = pool.close(session.id) })
    await assert.rejects(work, /closed|closing|cancelled/)
    await closing
    assert.equal(calls, 0)
  } finally {
    await pool.closeAll()
  }
})

test('a close during replacement acquire cannot replay a disconnected operation', async () => {
  const pool = new SessionPool({ transportManager: transportManager() })
  const oldSession = fakeSession('review-retry-gap')
  const replacement = fakeSession(oldSession.id)
  let acquisitions = 0
  let calls = 0
  let closing
  pool.acquire = async () => {
    acquisitions += 1
    if (acquisitions === 2) {
      closing = pool.close(oldSession.id)
      return replacement
    }
    return oldSession
  }
  try {
    await assert.rejects(pool.withSession(oldSession.id, async () => {
      calls += 1
      if (calls === 1) throw new Error('ECONNRESET')
      return 'must-not-replay'
    }), /closed|closing|cancelled/)
    await closing
    assert.equal(acquisitions, 2)
    assert.equal(calls, 1)
  } finally {
    await pool.closeAll()
  }
})

test('a stale runtime cannot execute even when still present in the session map', async () => {
  const pool = new SessionPool({ transportManager: transportManager() })
  const session = fakeSession('review-stale-runtime', { _closed: true })
  pool.sessions.set(SessionPool.keyOf(session.id, 'main'), session)
  let calls = 0
  try {
    await assert.rejects(pool.withSession(session.id, async () => { calls += 1 }, { retry: false }), /closed/)
    assert.equal(calls, 0)
  } finally {
    await pool.closeAll()
  }
})

test('closing an id aborts its in-flight probe before old credentials can finish opening', async () => {
  const started = deferred()
  const gate = deferred()
  let signal
  let closeCalls = 0
  const pool = new SessionPool({
    transportManager: transportManager(),
    openTimeoutMs: 1_000,
    createDriver: async (connection) => {
      signal = connection._signal
      return {
        open: async () => { started.resolve(); await gate.promise; return 'mock-version' },
        close: async () => { closeCalls += 1 },
        destroy() {},
      }
    },
  })
  const probe = pool.testConnection({ id: 'review-probe', engine: 'mysql', host: 'never-connected.invalid', password: 'old-configured-password' })
  const rejection = assert.rejects(probe, /closed|cancelled/)
  try {
    await started.promise
    await pool.close('review-probe')
    assert.equal(signal.aborted, true)
    await rejection
    assert.equal(pool.probeControllers.size, 0)
    assert.ok(closeCalls >= 1)
  } finally {
    gate.resolve()
    await pool.closeAll()
  }
})

test('a probe cannot enter while its id has an active close fence', async () => {
  const gate = deferred()
  let driverCalls = 0
  const manager = transportManager()
  manager.close = async () => gate.promise
  const pool = new SessionPool({ transportManager: manager, createDriver: async () => { driverCalls += 1; throw new Error('must not create driver') } })
  const closing = pool.close('review-fenced-probe')
  try {
    await assert.rejects(pool.testConnection({ id: 'review-fenced-probe', engine: 'mysql', host: 'never-connected.invalid' }), /closing/)
    assert.equal(driverCalls, 0)
  } finally {
    gate.resolve()
    await closing
    await pool.closeAll()
  }
})

let pgPath = ''
try { pgPath = require.resolve('pg') } catch { /* Optional package is never installed by tests. */ }

test('an explicitly cleared PG password never reads ambient PGPASSWORD or pgpass', { skip: !pgPath }, async () => {
  const oldPassword = process.env.PGPASSWORD
  const oldMode = process.env.PGSSLMODE
  process.env.PGPASSWORD = 'ambient-host-secret-never-authorized-for-draft'
  process.env.PGSSLMODE = 'no-verify'
  let client
  try {
    const { Client } = require('pg')
    const config = new PostgresDriver({ engine: 'postgres', host: 'untrusted-draft.invalid', port: 5432, user: 'configured-user', password: '', sslMode: 'disable' }).clientConfig()
    client = new Client(config)
    assert.equal(typeof client.password, 'function', 'password callback suppresses both ambient auth sources')
    assert.equal(client.ssl, false, 'explicit disable must not inherit PGSSLMODE')
    await new Promise((resolve) => client._getPassword(resolve))
    assert.equal(client.password, '')
    assert.equal(client.connectionParameters.password, '')
    assert.notEqual(client.password, process.env.PGPASSWORD)
  } finally {
    client?.connection?.stream?.destroy()
    if (oldPassword === undefined) delete process.env.PGPASSWORD
    else process.env.PGPASSWORD = oldPassword
    if (oldMode === undefined) delete process.env.PGSSLMODE
    else process.env.PGSSLMODE = oldMode
  }
})

test('PG sends tlsServerName as actual SNI while keeping the physical dial target separate', { skip: !pgPath }, () => {
  const pgDir = pgPath.slice(0, pgPath.lastIndexOf('index.js'))
  const pgStream = require(`${pgDir}stream.js`)
  const Connection = require(`${pgDir}connection.js`)
  const original = pgStream.getSecureStream
  let captured
  pgStream.getSecureStream = (options) => { captured = options; return new EventEmitter() }
  try {
    const logical = { engine: 'postgres', host: 'db-from-bastion.internal', port: 5432, tlsServerName: 'certificate.identity.internal', sslMode: 'verify-full' }
    const driver = new PostgresDriver(logical)
    const config = driver.clientConfig()
    const connection = new Connection({ stream: new EventEmitter(), ssl: config.ssl })
    connection.upgradeToSSL(config.host, () => {})
    assert.equal(captured.servername, logical.tlsServerName)
    assert.equal(config.host, logical.tlsServerName)
    // The stream factory still closes over the original connection, so the TLS
    // identity cannot become a DNS dial target or bypass a configured tunnel.
    const raw = config.stream()
    assert.equal(driver.connection._sockets.has(raw), true)
    raw.destroy()
    const certificate = { subject: { CN: logical.tlsServerName }, subjectaltname: `DNS:${logical.tlsServerName}` }
    assert.equal(captured.checkServerIdentity('127.0.0.1', certificate), undefined)
    assert.ok(captured.checkServerIdentity('127.0.0.1', { subjectaltname: 'DNS:wrong.identity.internal' }) instanceof Error)
  } finally {
    pgStream.getSecureStream = original
  }
})
