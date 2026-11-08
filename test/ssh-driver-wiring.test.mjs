/** Exercise the real driver open/close/cancel adapters with only vendor packages
 * mocked. SSH sockets are in-memory lease-owned Duplexes, never direct TCP.
 * Real SSH/TLS/protocol coverage lives in the transport integration tests. */
import assert from 'node:assert/strict'
import { EventEmitter, once } from 'node:events'
import * as moduleHooks from 'node:module'
import { Duplex } from 'node:stream'
import { TLSSocket } from 'node:tls'
import { test } from 'node:test'

import { MysqlDriver } from '../lib/drivers/mysql.js'
import { PostgresDriver } from '../lib/drivers/postgres.js'
import { RedisDriver } from '../lib/drivers/redis.js'
import { SqlServerDriver } from '../lib/drivers/sqlserver.js'

const symbol = Symbol.for('grid.ssh-driver-wiring.mocks')
const classes = { mysql: MysqlDriver, postgres: PostgresDriver, sqlserver: SqlServerDriver, redis: RedisDriver }
const ports = { mysql: 3306, postgres: 5432, sqlserver: 1433, redis: 6379 }
const packageIds = { 'mysql2/promise': 'mysql', pg: 'postgres', mssql: 'sqlserver', ioredis: 'redis' }
const prefix = 'grid-ssh-driver-mock:'

class LeaseSocket extends Duplex {
  constructor(lease) {
    super()
    this.lease = lease
    this.connecting = false
    this.connectCalls = []
    this.writes = []
    this.on('error', () => {})
  }
  _read() {}
  _write(chunk, _encoding, callback) { this.writes.push(Buffer.from(chunk)); callback() }
  connect(...args) {
    this.lease.assertOpen()
    this.connectCalls.push(args)
    this.connecting = true
    queueMicrotask(() => {
      if (!this.destroyed) { this.connecting = false; this.emit('connect') }
    })
    return this
  }
  setNoDelay(value) { this.noDelay = value; return this }
  setKeepAlive(value, delay) { this.keepAlive = [value, delay]; return this }
  setTimeout() { return this }
}

function fixture(engine, patch = {}) {
  const controller = new AbortController()
  const lease = {
    closed: false, sockets: [], openSignals: [],
    assertOpen() { if (this.closed) throw new Error('test SSH lease is closed') },
    createSocket() {
      this.assertOpen()
      const socket = new LeaseSocket(this)
      this.sockets.push(socket)
      return socket
    },
    async openSocket(signal) {
      this.assertOpen()
      signal?.throwIfAborted()
      this.openSignals.push(signal)
      const socket = this.createSocket()
      const connected = once(socket, 'connect')
      const onAbort = () => socket.destroy(signal.reason)
      signal?.addEventListener('abort', onAbort, { once: true })
      try { socket.connect(); await connected; return socket } finally { signal?.removeEventListener('abort', onAbort) }
    },
  }
  const connection = {
    engine, host: 'database.from.jump.invalid', port: ports[engine], user: 'db-user', password: 'db-password',
    database: 'application', redisDb: 4, sslMode: 'verify-full', tlsServerName: 'certificate.database.test',
    options: { queryTimeoutMs: 4321 },
    ssh: { enabled: true, host: 'jump.invalid', username: 'ssh-user', password: 'ssh-secret-not-for-driver' },
    _signal: controller.signal, _transport: lease,
    ...patch,
  }
  return { connection, lease, controller, driver: new classes[engine](connection) }
}

function state() {
  return { mysql: [], postgres: [], sqlserver: [], redis: [], failMysqlCancel: false, failPgCancel: false, failRedisQuit: false, redisInfo: null }
}

/** No mock may silently simulate a direct connection when an adapter omits its
 * stream/connector. Requiring a LeaseSocket makes that regression fail here. */
function installMocks(current) {
  const assertSocket = (socket) => assert.ok(socket instanceof LeaseSocket, 'the vendor package receives a lease-owned SSH socket')
  globalThis[symbol] = {
    async mysql(config) {
      assert.equal(typeof config.stream, 'function', 'mysql2 must use the stream factory')
      const socket = config.stream()
      assertSocket(socket)
      await once(socket, 'connect')
      const client = {
        config, socket, queries: [], connection: new EventEmitter(), ended: false, destroyed: false,
        async query(sql) {
          this.queries.push(sql)
          if (sql.includes('KILL QUERY') && current.failMysqlCancel) throw new Error('mock KILL refused')
          if (sql.includes('SELECT VERSION()')) return [[{ version: '8.fixture', id: 91 }], []]
          return [[], []]
        },
        async end() { this.ended = true; socket.destroy() },
        destroy() { this.destroyed = true; socket.destroy() },
      }
      current.mysql.push(client)
      return client
    },
    postgres(config) {
      assert.equal(typeof config.stream, 'function', 'pg must use the stream factory')
      const socket = config.stream()
      assertSocket(socket)
      const client = Object.assign(new EventEmitter(), {
        config, socket, queries: [], ended: false, connection: { stream: socket },
        async connect() {
          const connected = once(socket, 'connect')
          socket.connect(config.port, config.host)
          await connected
        },
        async query(sql, values) {
          this.queries.push({ sql, values })
          if (sql.includes('pg_cancel_backend')) {
            if (current.failPgCancel) throw new Error('mock cancel refused')
            return { rows: [{ cancelled: true }] }
          }
          if (sql.includes('pg_backend_pid')) return { rows: [{ pid: 73 }] }
          if (sql.includes('SHOW server_version')) return { rows: [{ server_version: '17.fixture' }] }
          return { rows: [] }
        },
        async end() { this.ended = true; socket.destroy() },
      })
      current.postgres.push(client)
      return client
    },
    sqlserver(config) {
      assert.equal(typeof config.options.connector, 'function', 'tedious must use a fixed-target custom connector')
      const connectorController = new AbortController()
      const pool = Object.assign(new EventEmitter(), {
        config, connectorController, sockets: [], requests: [], closed: false,
        async connect() {
          const socket = await config.options.connector({ host: config.server, port: config.port }, () => { throw new Error('must not run direct DNS lookup') }, connectorController.signal)
          assertSocket(socket)
          this.sockets.push(socket)
          return this
        },
        request() {
          const request = Object.assign(new EventEmitter(), {
            cancelled: false,
            cancel() { this.cancelled = true; this.emit('error', new Error('mock request cancelled')) },
            query(sql) {
              if (this.stream) return this
              return Promise.resolve({ recordset: [{ version: 'Fixture SQL Server\nmore' }] })
            },
          })
          this.requests.push(request)
          return request
        },
        async close() { this.closed = true; for (const socket of this.sockets) socket.destroy() },
      })
      current.sqlserver.push(pool)
      return pool
    },
    redis(config) {
      assert.equal(typeof config.Connector, 'function', 'ioredis must use the lease-bound custom connector')
      const connector = new config.Connector(config)
      const client = Object.assign(new EventEmitter(), {
        config, connector, disconnected: false, quitCalled: false,
        async connect() {
          this.stream = await connector.connect()
          if (config.tls) assert.ok(this.stream instanceof TLSSocket, 'Redis TLS wraps the SSH stream, not a new direct connection')
          else assertSocket(this.stream)
          return this
        },
        async info(section) { assert.equal(section, 'server'); return current.redisInfo ? await current.redisInfo : 'redis_version:7.fixture\r\n' },
        async quit() {
          this.quitCalled = true
          if (current.failRedisQuit) throw new Error('mock quit failed')
          connector.disconnect()
        },
        disconnect() { this.disconnected = true; connector.disconnect() },
      })
      current.redis.push(client)
      return client
    },
  }
}

function mockedPackageSource(id) {
  const target = `globalThis[Symbol.for('grid.ssh-driver-wiring.mocks')]`
  if (id === 'mysql') return `export const createConnection = config => ${target}.mysql(config)`
  if (id === 'postgres') return `export class Client { constructor(config) { return ${target}.postgres(config) } }`
  if (id === 'sqlserver') return `export default { ConnectionPool: class { constructor(config) { return ${target}.sqlserver(config) } } }`
  return `export default class Redis { constructor(config) { return ${target}.redis(config) } }`
}

function tlsConfig(engine, current) {
  const config = current[engine][0].config
  return engine === 'mysql' ? config.ssl : engine === 'postgres' ? config.ssl : engine === 'redis' ? config.tls : config.options
}
function lateSocket(engine, current) {
  const client = current[engine][0]
  if (engine === 'mysql' || engine === 'postgres') return () => client.config.stream()
  if (engine === 'redis') return () => client.connector.connect()
  return () => client.config.options.connector({ host: client.config.server, port: client.config.port }, null, new AbortController().signal)
}

// Keep hooks and mock state scoped to this file's single sequential parent test.
// Older supported Node releases without registerHooks skip rather than load the
// real optional packages or accidentally dial a network endpoint.
test('SSH network driver package wiring', { skip: typeof moduleHooks.registerHooks !== 'function', timeout: 20_000 }, async (t) => {
  const hook = moduleHooks.registerHooks({
    resolve(specifier, context, nextResolve) {
      if (Object.hasOwn(packageIds, specifier)) return { url: `${prefix}${packageIds[specifier]}`, shortCircuit: true }
      return nextResolve(specifier, context)
    },
    load(url, context, nextLoad) {
      if (url.startsWith(prefix)) return { format: 'module', shortCircuit: true, source: mockedPackageSource(url.slice(prefix.length)) }
      return nextLoad(url, context)
    },
  })
  try {
    await t.test('MySQL open and KILL QUERY side connection both use fresh tunnel sockets and database TLS identity', async (context) => {
      const current = state(); installMocks(current)
      const { driver, connection, lease } = fixture('mysql')
      context.after(() => driver.destroy())
      assert.equal(await driver.open(), 'MySQL 8.fixture')
      const main = current.mysql[0]
      assert.equal(main.config.host, connection.tlsServerName)
      assert.equal(main.config.port, connection.port)
      assert.equal(main.config.user, connection.user)
      assert.equal(main.config.password, connection.password)
      assert.equal(main.config.database, connection.database)
      assert.equal(main.config.ssl.rejectUnauthorized, true)
      assert.equal(main.config.ssl.verifyIdentity, true)
      assert.equal(main.socket.noDelay, true)
      assert.deepEqual(main.socket.keepAlive, [true, 10_000])
      assert.ok(main.queries.some((sql) => sql.includes('MAX_EXECUTION_TIME = 4321')))
      assert.deepEqual(await driver.cancelQuery(), { cancelled: true })
      assert.equal(lease.sockets.length, 2)
      const side = current.mysql[1]
      assert.notEqual(main.socket, side.socket)
      assert.equal(side.config.host, connection.tlsServerName)
      assert.equal(side.config.ssl.verifyIdentity, true)
      assert.deepEqual(side.queries, ['KILL QUERY 91'])
      assert.equal(side.ended, true)
      assert.equal(main.socket.destroyed, false)
      assert.doesNotMatch(JSON.stringify(main.config), /ssh-secret-not-for-driver|jump\.invalid/)
      await driver.close()
      assert.equal(main.ended, true)
      assert.equal(main.socket.destroyed, true)
      assert.throws(() => main.config.stream(), /closed/)
      assert.equal(lease.sockets.length, 2, 'closing cannot allocate a stale side channel')
    })

    await t.test('MySQL refused cancellation closes the side client and marks the main query as non-replayable', async (context) => {
      const current = state(); current.failMysqlCancel = true; installMocks(current)
      const { driver } = fixture('mysql')
      context.after(() => driver.destroy())
      await driver.open()
      const result = await driver.cancelQuery()
      assert.equal(result.cancelled, false)
      assert.match(result.reason, /KILL refused/)
      assert.equal(driver.cancelled, true)
      assert.equal(current.mysql[0].destroyed, true)
      assert.equal(current.mysql[1].ended, true)
    })

    await t.test('PostgreSQL open and cancellation retain custom SNI identity without changing the lease socket destination', async (context) => {
      const current = state(); installMocks(current)
      const { driver, connection, lease } = fixture('postgres')
      context.after(() => driver.destroy())
      assert.equal(await driver.open(), 'PostgreSQL 17.fixture')
      const main = current.postgres[0]
      assert.equal(main.config.host, connection.tlsServerName, 'pg overwrites SSL servername from config.host, so host must be the TLS identity')
      assert.equal(main.config.ssl.servername, connection.tlsServerName)
      assert.equal(main.config.ssl.rejectUnauthorized, true)
      assert.equal(typeof main.config.password, 'function', 'a password callback prevents ambient pg credential lookup')
      assert.equal(main.config.password(), connection.password)
      assert.equal(main.config.database, connection.database)
      assert.ok(main.queries.some(({ sql }) => sql === 'SET statement_timeout = 4321'))
      assert.equal(main.config.ssl.checkServerIdentity('127.0.0.1', { subjectaltname: `DNS:${connection.tlsServerName}` }), undefined)
      assert.equal(main.config.ssl.checkServerIdentity('127.0.0.1', { subjectaltname: 'DNS:wrong.test' }).code, 'ERR_TLS_CERT_ALTNAME_INVALID')
      assert.deepEqual(await driver.cancelQuery(), { cancelled: true })
      assert.equal(lease.sockets.length, 2)
      const side = current.postgres[1]
      assert.notEqual(main.socket, side.socket)
      assert.equal(side.config.host, connection.tlsServerName)
      assert.deepEqual(side.queries, [{ sql: 'SELECT pg_cancel_backend($1) AS cancelled', values: [73] }])
      assert.equal(side.ended, true)
      assert.equal(main.socket.destroyed, false)
      await driver.close()
      assert.equal(main.ended, true)
      assert.throws(() => side.config.stream(), /closed/)
    })

    await t.test('PostgreSQL failed cancellation still closes the short-lived side connection', async (context) => {
      const current = state(); current.failPgCancel = true; installMocks(current)
      const { driver } = fixture('postgres')
      context.after(() => driver.destroy())
      await driver.open()
      const result = await driver.cancelQuery()
      assert.equal(result.cancelled, false)
      assert.match(result.reason, /cancel refused/)
      assert.equal(current.postgres[1].ended, true)
      assert.equal(current.postgres[0].socket.destroyed, false)
    })

    await t.test('PostgreSQL empty or omitted password and TLS off cannot fall back to ambient PGPASSWORD/PGSSLMODE', async (context) => {
      const previous = { PGPASSWORD: process.env.PGPASSWORD, PGSSLMODE: process.env.PGSSLMODE }
      process.env.PGPASSWORD = 'ambient-password-must-not-leak'
      process.env.PGSSLMODE = 'require'
      context.after(() => {
        for (const [name, value] of Object.entries(previous)) {
          if (value === undefined) delete process.env[name]
          else process.env[name] = value
        }
      })
      for (const password of ['', undefined]) {
        const current = state(); installMocks(current)
        const { driver } = fixture('postgres', { sslMode: 'disable', password })
        context.after(() => driver.destroy())
        await driver.open()
        await driver.cancelQuery()
        assert.equal(current.postgres.length, 2)
        for (const client of current.postgres) {
          assert.equal(typeof client.config.password, 'function')
          assert.equal(await client.config.password(), '', 'empty credentials never become an environment password or pgpass lookup')
          assert.equal(client.config.ssl, false, 'explicit false blocks PGSSLMODE fallback on main and cancel connections')
        }
        await driver.close()
      }
    })

    await t.test('SQL Server actual open uses fixed-target connector and fresh lease sockets for every pool connection', async (context) => {
      const current = state(); installMocks(current)
      const { driver, connection, lease, controller } = fixture('sqlserver')
      context.after(() => driver.destroy())
      assert.equal(await driver.open(), 'SQL Server Fixture SQL Server')
      const pool = current.sqlserver[0]
      assert.equal(pool.config.server, connection.host)
      assert.equal(pool.config.options.serverName, connection.tlsServerName)
      assert.equal(pool.config.options.encrypt, true)
      assert.equal(pool.config.options.trustServerCertificate, false)
      assert.equal(pool.config.requestTimeout, 4321)
      assert.equal(pool.config.password, connection.password)
      const connector = pool.config.options.connector
      const sideSignal = new AbortController().signal
      const side = await connector({ host: connection.host, port: connection.port }, () => { throw new Error('unexpected DNS lookup') }, sideSignal)
      assert.equal(lease.openSignals[1], sideSignal)
      assert.equal(lease.sockets.length, 2)
      assert.notEqual(pool.sockets[0], side)
      assert.throws(() => connector({ host: 'redirected.invalid', port: connection.port }, null, sideSignal), /redirects are not supported/)
      assert.throws(() => connector({ host: connection.host, port: 9999 }, null, sideSignal), /redirects are not supported/)
      assert.equal(lease.sockets.length, 2, 'redirect rejection never allocates or falls back to direct TCP')
      const cancelled = new AbortController(); cancelled.abort(new Error('test cancelled connector'))
      await assert.rejects(connector({ host: connection.host, port: connection.port }, null, cancelled.signal), /cancelled connector/)
      assert.equal(lease.sockets.length, 2)
      const pending = driver.exec(['SELECT long_running_query'])
      assert.equal(driver.active, pool.requests[pool.requests.length - 1])
      assert.deepEqual(await driver.cancelQuery(), { cancelled: true })
      const result = await pending
      assert.match(result.results[0].error, /request cancelled/)
      assert.equal(lease.sockets.length, 2, 'request cancellation does not create another TCP connection')
      controller.abort(new Error('test runtime abort'))
      assert.ok(lease.sockets.every((socket) => socket.destroyed), 'all pool sockets participate in runtime abort')
      await driver.close()
      assert.equal(pool.closed, true)
      await assert.rejects(async () => connector({ host: connection.host, port: connection.port }, null, sideSignal), /closed/)
    })

    await t.test('Redis actual open uses its custom connector with retries/offline queue disabled and graceful close', async (context) => {
      const current = state(); installMocks(current)
      const { driver, connection, lease } = fixture('redis', { sslMode: 'disable' })
      context.after(() => driver.destroy())
      assert.equal(await driver.open(), 'Redis 7.fixture')
      const client = current.redis[0]
      assert.equal(client.config.host, connection.host)
      assert.equal(client.config.password, connection.password)
      assert.equal(client.config.db, 4)
      assert.equal(client.config.tls, undefined)
      assert.equal(client.config.enableOfflineQueue, false)
      assert.equal(client.config.maxRetriesPerRequest, 0)
      assert.equal(client.config.retryStrategy(1), null)
      assert.equal(client.config.retryStrategy(10), null)
      assert.equal(client.config.commandTimeout, 4321)
      assert.equal(client.config.lazyConnect, true)
      assert.equal(lease.sockets.length, 1)
      assert.equal(client.stream, lease.sockets[0])
      await driver.close()
      assert.equal(client.quitCalled, true)
      assert.equal(client.stream.destroyed, true)
      assert.equal(client.connector.connecting, false)
      await assert.rejects(client.connector.connect(), /closed/)
      assert.equal(lease.sockets.length, 1)
    })

    await t.test('Redis TLS wraps only the existing lease socket, keeps database identity and falls back to disconnect on quit failure', async (context) => {
      const current = state(); current.failRedisQuit = true; installMocks(current)
      const { driver, connection, lease } = fixture('redis')
      context.after(() => driver.destroy())
      await driver.open()
      const client = current.redis[0]
      assert.ok(client.stream instanceof TLSSocket)
      assert.equal(client.config.tls.servername, connection.tlsServerName)
      assert.equal(client.config.tls.rejectUnauthorized, true)
      assert.equal(client.config.tls.checkServerIdentity('127.0.0.1', { subjectaltname: `DNS:${connection.tlsServerName}` }), undefined)
      assert.equal(lease.sockets.length, 1, 'TLS must not allocate a second direct network socket')
      await driver.close()
      assert.equal(client.quitCalled, true)
      assert.equal(client.disconnected, true)
      assert.equal(client.stream.destroyed, true)
    })

    await t.test('Redis late INFO completion after abort/destroy cannot resurrect a successful open', async (context) => {
      const current = state()
      let resolveInfo
      current.redisInfo = new Promise((resolve) => { resolveInfo = resolve })
      installMocks(current)
      const { driver, lease, controller } = fixture('redis', { sslMode: 'disable' })
      context.after(() => driver.destroy())
      const pending = driver.open()
      // Await the stub client entering INFO without timers or polling.
      let enteredInfo
      const ready = new Promise((resolve) => { enteredInfo = resolve })
      const originalRedis = globalThis[symbol].redis
      globalThis[symbol].redis = (config) => {
        const client = originalRedis(config)
        const info = client.info.bind(client)
        client.info = (...args) => { enteredInfo(); return info(...args) }
        return client
      }
      await ready
      controller.abort(new Error('test Redis aborted'))
      driver.destroy()
      resolveInfo('redis_version:late\r\n')
      await assert.rejects(pending, /closed|aborted/)
      assert.equal(driver.client, null)
      assert.ok(lease.sockets.every((socket) => socket.destroyed))
      assert.equal(current.redis[0].disconnected, true)
    })

    for (const engine of Object.keys(classes)) {
      await t.test(`${engine}: TLS disabled keeps the DB hostname while sockets remain lease-owned`, async (context) => {
        const current = state(); installMocks(current)
        const { driver, connection, lease } = fixture(engine, { sslMode: 'disable' })
        context.after(() => driver.destroy())
        await driver.open()
        const config = current[engine][0].config
        assert.equal(engine === 'sqlserver' ? config.server : config.host, connection.host)
        if (engine === 'sqlserver') assert.equal(config.options.encrypt, false)
        else assert.equal(tlsConfig(engine, current), engine === 'postgres' ? false : undefined)
        assert.equal(lease.sockets.length, 1)
        await driver.close()
        assert.equal(connection._closed, undefined, 'close must not poison the caller connection object')
        assert.equal(connection._sockets, undefined, 'runtime socket ownership belongs to the driver snapshot')
        const reopened = new classes[engine](connection)
        context.after(() => reopened.destroy())
        await reopened.open()
        assert.equal(lease.sockets.length, 2, 'a new driver can reuse the unmodified input after close')
        await reopened.close()
      })

      await t.test(`${engine}: pre-abort and closed SSH lease prevent vendor client/socket allocation`, async () => {
        const current = state(); installMocks(current)
        const aborted = fixture(engine)
        const reason = new Error('pre-aborted runtime')
        aborted.controller.abort(reason)
        await assert.rejects(aborted.driver.open(), (error) => error === reason)
        assert.equal(current[engine].length, 0)
        assert.equal(aborted.lease.sockets.length, 0)
        const closed = fixture(engine)
        closed.lease.closed = true
        await assert.rejects(closed.driver.open(), /SSH lease is closed/)
        assert.equal(current[engine].length, 0)
        assert.equal(closed.lease.sockets.length, 0)
      })

      await t.test(`${engine}: abort destroys every allocated socket and delayed factories cannot bypass the closed lease`, async (context) => {
        const current = state(); installMocks(current)
        const { driver, lease, controller } = fixture(engine, { sslMode: 'disable' })
        context.after(() => driver.destroy())
        await driver.open()
        const delayed = lateSocket(engine, current)
        controller.abort(new Error('runtime aborted'))
        assert.ok(lease.sockets.every((socket) => socket.destroyed))
        await assert.rejects(async () => delayed(), /runtime aborted/)
        assert.equal(lease.sockets.length, 1)
        driver.destroy()
        await assert.rejects(async () => delayed(), /closed/)
        assert.equal(lease.sockets.length, 1)
      })

      await t.test(`${engine}: expired SSH lease blocks late pool/reconnect sockets without direct fallback`, async (context) => {
        const current = state(); installMocks(current)
        const { driver, lease } = fixture(engine, { sslMode: 'disable' })
        context.after(() => driver.destroy())
        await driver.open()
        const delayed = lateSocket(engine, current)
        lease.closed = true
        await assert.rejects(async () => delayed(), /SSH lease is closed/)
        assert.equal(lease.sockets.length, 1)
      })
    }
  } finally {
    hook.deregister()
    delete globalThis[symbol]
  }
})
