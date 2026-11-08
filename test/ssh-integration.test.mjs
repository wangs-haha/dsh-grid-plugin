/** End-to-end SSH/TCP and TLS tests against local protocol fixtures, never a
 * user's database. ssh2 runs its JS fallback (install scripts are unnecessary). */
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { once } from 'node:events'
import { readFileSync } from 'node:fs'
import { createServer, connect } from 'node:net'
import { createSecureContext, TLSSocket } from 'node:tls'
import { test } from 'node:test'
import { TransportManager } from '../lib/transport.js'
import { openDatabase } from '../lib/open.js'

let ssh2
try { ssh2 = (await import('ssh2')).default } catch { /* optional dependency */ }
const enabled = { skip: !ssh2 && 'optional ssh2 dependency is not installed', timeout: 10_000 }
const tlsKey = readFileSync(new URL('./fixtures/tls-key.pem', import.meta.url))
const tlsCert = readFileSync(new URL('./fixtures/tls-cert.pem', import.meta.url))
const secureContext = createSecureContext({ key: tlsKey, cert: tlsCert })
const i32 = (value) => { const b = Buffer.alloc(4); b.writeInt32BE(value); return b }
const i16 = (value) => { const b = Buffer.alloc(2); b.writeInt16BE(value); return b }
const cstr = (value) => Buffer.from(value + '\0')
const packet = (type, payload = Buffer.alloc(0)) => Buffer.concat([Buffer.from(type), i32(payload.length + 4), payload])
const ready = () => packet('Z', Buffer.from('I'))

async function localServer(onConnection) {
  const sockets = new Set()
  const server = createServer((socket) => {
    sockets.add(socket)
    socket.on('error', () => {})
    socket.once('close', () => sockets.delete(socket))
    onConnection(socket)
  })
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  return { port: server.address().port, sockets,
    close: async () => { for (const socket of sockets) socket.destroy(); if (server.listening) await new Promise((resolve) => server.close(resolve)) } }
}

async function jump(targetPort, { privateAuth = false, refuse = false } = {}) {
  const { private: hostKey, public: hostPublic } = ssh2.utils.generateKeyPairSync('ed25519')
  const { private: userKey, public: userPublic } = ssh2.utils.generateKeyPairSync('ed25519', { cipher: 'aes256-cbc', passphrase: 'fixture-passphrase' })
  const fingerprint = 'SHA256:' + createHash('sha256').update(ssh2.utils.parseKey(hostPublic).getPublicSSH()).digest('base64').replace(/=$/, '')
  const allowed = ssh2.utils.parseKey(userPublic).getPublicSSH()
  const clients = new Set()
  const sockets = new Set()
  const forwards = []
  const server = new ssh2.Server({ hostKeys: [hostKey] }, (client) => {
    clients.add(client)
    client.on('error', () => {})
    client.once('close', () => clients.delete(client))
    client.on('authentication', (ctx) => {
      if (ctx.username !== 'fixture') return ctx.reject()
      if (!privateAuth && ctx.method === 'password' && ctx.password === 'fixture-password') return ctx.accept()
      if (privateAuth && ctx.method === 'publickey' && ctx.key.data.equals(allowed) &&
          (!ctx.signature || ssh2.utils.parseKey(userPublic).verify(ctx.blob, ctx.signature, ctx.hashAlgo))) return ctx.accept()
      ctx.reject()
    })
    client.on('ready', () => client.on('tcpip', (accept, reject, info) => {
      forwards.push(info)
      if (refuse || info.destIP !== 'remote.database.internal' || info.destPort !== targetPort) return reject()
      const socket = connect({ host: '127.0.0.1', port: targetPort })
      sockets.add(socket)
      socket.on('error', reject)
      socket.once('close', () => sockets.delete(socket))
      socket.once('connect', () => {
        const channel = accept()
        channel.on('error', () => socket.destroy())
        channel.once('close', () => socket.destroy())
        socket.pipe(channel).pipe(socket)
      })
    }))
  })
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  let closing
  return { forwards, clients, config: {
    enabled: true, host: '127.0.0.1', port: server.address().port, username: 'fixture', hostFingerprint: fingerprint,
    authType: privateAuth ? 'privateKey' : 'password',
    ...(privateAuth ? { privateKey: userKey, passphrase: 'fixture-passphrase' } : { password: 'fixture-password' }),
  }, close: () => {
    if (closing) return closing
    for (const socket of sockets) socket.destroy()
    for (const client of clients) client.end()
    // ssh2.Server wraps net.Server and does NOT expose .listening.
    closing = new Promise((resolve) => server.close(resolve))
    return closing
  } }
}

function row(name, value, oid = 25) {
  const field = Buffer.concat([cstr(name), i32(0), i16(0), i32(oid), i16(-1), i32(-1), i16(0)])
  const string = Buffer.from(String(value))
  return Buffer.concat([packet('T', Buffer.concat([i16(1), field])),
    packet('D', Buffer.concat([i16(1), i32(string.length), string])), packet('C', cstr('SELECT 1')), ready()])
}

async function postgresFixture() {
  const names = []
  const server = await localServer((rawSocket) => {
    let socket = rawSocket
    let buffer = Buffer.alloc(0)
    let startup = true
    function input(data) {
      buffer = Buffer.concat([buffer, data])
      while (buffer.length >= (startup ? 8 : 5)) {
        const size = buffer.readInt32BE(startup ? 0 : 1)
        const length = size + (startup ? 0 : 1)
        if (buffer.length < length) return
        const message = buffer.subarray(0, length)
        buffer = buffer.subarray(length)
        if (startup) {
          if (message.readInt32BE(4) === 80877103) {
            socket.write('S')
            socket.removeListener('data', input)
            socket = new TLSSocket(socket, { isServer: true, secureContext })
            socket.on('error', () => socket.destroy())
            socket.once('secure', () => names.push(socket.servername))
            socket.on('data', input)
            continue
          }
          startup = false
          socket.write(Buffer.concat([packet('R', i32(0)), packet('K', Buffer.concat([i32(42), i32(999)])), ready()]))
        } else {
          const type = message[0]
          if (type === 88) { socket.end(); return }
          assert.equal(type, 81, 'fixture accepts simple query protocol')
          const sql = message.subarray(5).toString().replace(/\0$/, '')
          if (/^SET/i.test(sql)) socket.write(Buffer.concat([packet('C', cstr('SET')), ready()]))
          else if (/pg_backend_pid/i.test(sql)) socket.write(row('pid', 42, 23))
          else if (/SHOW server_version/i.test(sql)) socket.write(row('server_version', '16.0-fixture'))
          else socket.write(row('one', 1, 23))
        }
      }
    }
    socket.on('data', input)
  })
  return { ...server, names }
}

async function redisFixture() {
  const commands = []
  const server = await localServer((socket) => {
    let buffer = ''
    socket.on('data', (data) => {
      buffer += data.toString()
      while (buffer) {
        const lines = buffer.split('\r\n')
        if (!/^\*\d+$/.test(lines[0])) return
        const count = Number(lines[0].slice(1))
        let pos = lines[0].length + 2
        const argv = []
        for (let index = 0; index < count; index++) {
          const end = buffer.indexOf('\r\n', pos)
          if (end < 0) return
          const size = Number(buffer.slice(pos + 1, end))
          pos = end + 2
          if (buffer.length < pos + size + 2) return
          argv.push(buffer.slice(pos, pos + size))
          pos += size + 2
        }
        buffer = buffer.slice(pos)
        commands.push(argv)
        switch (argv[0].toLowerCase()) {
          case 'info': {
            const info = '# Server\r\nredis_version:7.0.0-fixture\r\nloading:0\r\n'
            socket.write(`$${Buffer.byteLength(info)}\r\n${info}\r\n`)
            break
          }
          case 'ping': socket.write('+PONG\r\n'); break
          case 'quit': socket.end('+OK\r\n'); break
          default: socket.write('+OK\r\n')
        }
      }
    })
  })
  return { ...server, commands }
}

test('real SSH password and encrypted-private-key authentication forward bytes', enabled, async (t) => {
  for (const privateAuth of [false, true]) {
    const echo = await localServer((socket) => socket.pipe(socket))
    t.after(() => echo.close())
    const ssh = await jump(echo.port, { privateAuth })
    t.after(() => ssh.close())
    const manager = new TransportManager()
    t.after(() => manager.dispose())
    try {
      const lease = await manager.acquire({ id: 'echo', engine: 'postgres', host: 'remote.database.internal', port: echo.port, ssh: ssh.config })
      const socket = lease.connect()
      await once(socket, 'connect')
      const response = once(socket, 'data')
      socket.write('real SSH roundtrip')
      assert.equal((await response)[0].toString(), 'real SSH roundtrip')
      await lease.release()
      assert.equal(manager.entries.size, 0)
      assert.equal(ssh.forwards.length, 1)
    } finally { await manager.dispose(); await ssh.close(); await echo.close() }
  }
})

test('real PostgreSQL client negotiates TLS through SSH using the database identity, not its dial address', enabled, async (t) => {
  const pg = await postgresFixture()
  t.after(() => pg.close())
  const ssh = await jump(pg.port)
  t.after(() => ssh.close())
  const manager = new TransportManager()
  t.after(() => manager.dispose())
  try {
    const connection = { id: 'pg', engine: 'postgres', host: 'remote.database.internal', port: pg.port,
      user: 'fixture', database: 'fixture', ssh: ssh.config, sslMode: 'verify-full',
      tlsServerName: 'database.example.test', options: { sslCa: tlsCert.toString() } }
    const opened = await openDatabase(connection, { transportManager: manager, timeoutMs: 4_000 })
    assert.equal(opened.version, 'PostgreSQL 16.0-fixture')
    assert.equal((await opened.driver.client.query('SELECT 1 AS one')).rows[0].one, 1)
    assert.ok(pg.names.includes('database.example.test'))
    await opened.close()
    await assert.rejects(openDatabase({ ...connection, tlsServerName: 'wrong.example.test' }, { transportManager: manager, timeoutMs: 4_000 }), /Hostname\/IP does not match|not in the cert/i)
    assert.equal(manager.entries.size, 0)
  } finally { await manager.dispose(); await ssh.close(); await pg.close() }
})

test('real Redis driver opens, authenticates and sends commands through SSH without offline replay', enabled, async (t) => {
  const redis = await redisFixture()
  t.after(() => redis.close())
  const ssh = await jump(redis.port)
  t.after(() => ssh.close())
  const manager = new TransportManager()
  t.after(() => manager.dispose())
  try {
    const opened = await openDatabase({ id: 'redis', engine: 'redis', host: 'remote.database.internal', port: redis.port,
      password: 'db-password', ssh: ssh.config, sslMode: 'disable' }, { transportManager: manager, timeoutMs: 4_000 })
    assert.equal(opened.version, 'Redis 7.0.0-fixture')
    assert.equal(await opened.driver.client.ping(), 'PONG')
    assert.ok(redis.commands.some((command) => command[0].toLowerCase() === 'auth'))
    assert.equal(opened.driver.client.options.enableOfflineQueue, false)
    await opened.close()
    assert.equal(manager.entries.size, 0)
  } finally { await manager.dispose(); await ssh.close(); await redis.close() }
})

test('real SSH host-key mismatch and authentication failure are rejected and redacted', enabled, async (t) => {
  const echo = await localServer((socket) => socket.pipe(socket))
  t.after(() => echo.close())
  const ssh = await jump(echo.port)
  t.after(() => ssh.close())
  const manager = new TransportManager()
  t.after(() => manager.dispose())
  const connection = { id: 'bad', engine: 'postgres', host: 'remote.database.internal', port: echo.port, ssh: ssh.config }
  try {
    await assert.rejects(manager.acquire({ ...connection, ssh: { ...ssh.config, hostFingerprint: 'SHA256:' + Buffer.alloc(32).toString('base64').replace(/=$/, '') } }), { code: 'SSH_HOST_KEY' })
    await assert.rejects(manager.acquire({ ...connection, ssh: { ...ssh.config, password: 'wrong-password' } }), (error) => {
      assert.equal(error.code, 'SSH_AUTH')
      assert.ok(!error.message.includes('wrong-password'))
      return true
    })
    assert.equal(manager.entries.size, 0)
    assert.equal(ssh.forwards.length, 0)
  } finally { await manager.dispose(); await ssh.close(); await echo.close() }
})
