/** Host-only SSH transport. A connection shares one SSH client; each driver owns
 * a loopback listener, so force-closing a lane cannot kill another lane. */
import { createHash, timingSafeEqual } from 'node:crypto'
import { createServer, Socket } from 'node:net'
import { GridError } from './errors.js'

export function transportError(message, code = 'SSH_CLOSED') {
  const error = new GridError(message, 503)
  error.code = code
  return error
}

export function verifyHostKey(key, fingerprint) {
  if (typeof fingerprint !== 'string' || !/^SHA256:[A-Za-z0-9+/]{43}=?$/.test(fingerprint)) return false
  const expected = Buffer.from(fingerprint.slice(7), 'base64')
  const actual = createHash('sha256').update(key).digest()
  return expected.length === actual.length && timingSafeEqual(expected, actual)
}

const loadClient = async () => {
  try {
    const module = await import('ssh2')
    return module.Client ?? module.default.Client
  } catch {
    throw transportError('SSH support is not installed; install the optional ssh2 dependency in the plugin directory', 'SSH_UNAVAILABLE')
  }
}

export class TransportManager {
  constructor(options = {}) {
    this.loadClient = options.loadClient ?? loadClient
    this.createServer = options.createServer ?? createServer
    this.connectTimeoutMs = options.connectTimeoutMs ?? 20_000
    this.channelTimeoutMs = options.channelTimeoutMs ?? 10_000
    this.maxSockets = options.maxSockets ?? 64
    this.entries = new Map()
    this.disposed = false
  }

  /** Acquire a driver-owned listener. Only the authenticated SSH client is shared. */
  async acquire(connection, { signal, ephemeral = false } = {}) {
    if (this.disposed) throw transportError('the Grid transport has been unloaded')
    if (!connection.ssh?.enabled) return null
    if (connection.engine === 'sqlite') throw new GridError('SQLite does not support an SSH TCP tunnel')
    if (signal?.aborted) throw signal.reason ?? transportError('SSH connection was cancelled')
    const snapshot = JSON.stringify({
      id: connection.id, updatedAt: connection.updatedAt, engine: connection.engine,
      host: connection.host, port: connection.port, ssh: connection.ssh,
    })
    // Hashes are internal keys only; neither credentials nor this hash are logged.
    const key = ephemeral ? Symbol('probe') : createHash('sha256').update(snapshot).digest('hex')
    let entry = this.entries.get(key)
    if (!entry || entry.closed) {
      entry = this.newEntry(key, connection)
      this.entries.set(key, entry)
    }
    const lease = this.newLease(entry)
    const onAbort = () => {
      void lease.release(signal.reason ?? transportError('SSH connection was cancelled'))
    }
    signal?.addEventListener('abort', onAbort, { once: true })
    try {
      if (signal?.aborted) onAbort()
      await Promise.race([
        entry.ready,
        lease.failure.then((error) => { throw error }),
      ])
      lease.assertOpen()
      await this.listen(lease)
      lease.assertOpen()
      return lease
    } catch (error) {
      await lease.release()
      throw error
    } finally {
      signal?.removeEventListener('abort', onAbort)
    }
  }

  newEntry(key, connection) {
    const entry = {
      key, id: connection.id, targetHost: connection.host, targetPort: connection.port,
      leases: new Set(), closed: false, client: null, reject: null, error: null,
    }
    entry.ready = new Promise((resolve, reject) => {
      entry.reject = reject
      entry.timer = setTimeout(() => {
        this.closeEntry(entry, transportError('SSH connection timed out', 'SSH_TIMEOUT'))
      }, this.connectTimeoutMs)
      Promise.resolve().then(async () => {
        const Client = await this.loadClient()
        if (entry.closed) return
        const client = entry.client = new Client()
        client.on('error', (error) => {
          const code = entry.hostRejected ? 'SSH_HOST_KEY' :
            error?.level === 'client-authentication' ? 'SSH_AUTH' : 'SSH_CLOSED'
          const message = code === 'SSH_HOST_KEY' ? 'SSH host fingerprint does not match the configured SHA256 fingerprint' :
            code === 'SSH_AUTH' ? 'SSH authentication failed; check the selected authentication method and credentials' :
              'SSH connection failed or was lost'
          this.closeEntry(entry, transportError(message, code))
        })
        client.on('end', () => this.closeEntry(entry, transportError('SSH connection was lost')))
        client.on('close', () => this.closeEntry(entry, transportError('SSH connection was closed')))
        client.once('ready', () => {
          if (entry.closed) {
            client.end()
            client.destroy?.()
            return
          }
          clearTimeout(entry.timer)
          entry.reject = null
          resolve(entry)
        })
        const ssh = connection.ssh
        if (ssh.authType === 'password' && !ssh.password) {
          throw transportError('an SSH password is required', 'SSH_AUTH')
        }
        if (ssh.authType === 'privateKey' && !ssh.privateKey) {
          throw transportError('an SSH private key is required', 'SSH_AUTH')
        }
        if (!['password', 'privateKey'].includes(ssh.authType)) {
          throw transportError('unsupported SSH authentication method', 'SSH_AUTH')
        }
        client.connect({
          host: ssh.host, port: ssh.port || 22, username: ssh.username,
          ...(ssh.authType === 'password' ? { password: ssh.password } :
            { privateKey: ssh.privateKey, ...(ssh.passphrase ? { passphrase: ssh.passphrase } : {}) }),
          hostVerifier: (keyBytes) => {
            const accepted = verifyHostKey(keyBytes, ssh.hostFingerprint)
            if (!accepted) entry.hostRejected = true
            return accepted
          },
          readyTimeout: this.connectTimeoutMs,
          keepaliveInterval: 15_000,
          keepaliveCountMax: 3,
          tryKeyboard: false,
          agentForward: false,
        })
      }).catch((error) => {
        this.closeEntry(entry, error?.code === 'SSH_UNAVAILABLE' || error?.code === 'SSH_AUTH' ? error :
          transportError('SSH connection setup failed; check the key format, credentials and server configuration', 'SSH_SETUP'))
      })
    })
    // A manager may be disposed before an acquire caller starts awaiting ready.
    entry.ready.catch(() => {})
    return entry
  }

  newLease(entry) {
    const manager = this
    let resolveFailure
    const lease = {
      entry, server: null, port: 0, closed: false, error: null,
      sockets: new Set(), channels: new Set(), listeners: new Set(),
      failure: new Promise((resolve) => { resolveFailure = resolve }),
      assertOpen() {
        if (lease.closed || entry.closed) {
          throw lease.error ?? entry.error ?? transportError('the SSH tunnel is closed')
        }
      },
      endpoint() {
        lease.assertOpen()
        if (!lease.port) throw transportError('the SSH tunnel is not ready')
        return { host: '127.0.0.1', port: lease.port }
      },
      /** Allocation and connect are both guarded against stale-generation dialling. */
      createSocket() {
        lease.assertOpen()
        class TunnelSocket extends Socket {
          connect() {
            return super.connect(lease.endpoint())
          }
        }
        const socket = new TunnelSocket()
        lease.sockets.add(socket)
        socket.on('error', () => {})
        socket.once('close', () => lease.sockets.delete(socket))
        return socket
      },
      connect() {
        const socket = lease.createSocket()
        return socket.connect()
      },
      openSocket(signal) {
        return new Promise((resolve, reject) => {
          let socket
          let settled = false
          const finish = (error) => {
            if (settled) return
            settled = true
            signal?.removeEventListener('abort', onAbort)
            socket?.removeListener('error', onError)
            socket?.removeListener('connect', onConnect)
            socket?.removeListener('close', onClose)
            if (error) {
              socket?.destroy()
              reject(error)
            } else resolve(socket)
          }
          const onAbort = () => finish(signal.reason ?? transportError('SSH socket was cancelled'))
          const onError = (error) => finish(error)
          const onConnect = () => finish()
          const onClose = () => finish(lease.error ?? transportError('SSH socket closed while connecting'))
          if (signal?.aborted) return onAbort()
          try {
            socket = lease.createSocket()
            socket.once('error', onError)
            socket.once('connect', onConnect)
            socket.once('close', onClose)
            signal?.addEventListener('abort', onAbort, { once: true })
            socket.connect()
          } catch (error) {
            finish(error)
          }
        })
      },
      onFailure(callback) {
        if (lease.error) callback(lease.error)
        else lease.listeners.add(callback)
        return () => lease.listeners.delete(callback)
      },
      release(error = transportError('the SSH tunnel was closed')) {
        if (lease.closePromise) return lease.closePromise
        if (lease.closed) return Promise.resolve()
        lease.closed = true
        lease.error = error
        resolveFailure(error)
        lease.rejectListen?.(error)
        for (const callback of lease.listeners) {
          try { callback(error) } catch { /* A consumer cannot interrupt cleanup. */ }
        }
        lease.listeners.clear()
        for (const socket of lease.sockets) socket.destroy()
        for (const channel of lease.channels) channel.destroy()
        lease.sockets.clear()
        lease.channels.clear()
        lease.closePromise = new Promise((resolve) => {
          if (!lease.server) return resolve()
          let timer
          const done = () => { clearTimeout(timer); resolve() }
          timer = setTimeout(done, 1_000)
          try { lease.server.close(done) } catch { done() }
        })
        entry.leases.delete(lease)
        if (entry.leases.size === 0) manager.closeEntry(entry, error)
        return lease.closePromise
      },
    }
    entry.leases.add(lease)
    return lease
  }

  listen(lease) {
    return new Promise((resolve, reject) => {
      lease.rejectListen = reject
      try {
        lease.assertOpen()
        const server = lease.server = this.createServer((socket) => this.forward(lease, socket))
        server.on('error', () => {
          void lease.release(transportError('the local SSH tunnel listener failed', 'SSH_LISTEN'))
        })
        server.once('listening', () => {
          if (lease.closed) {
            try { server.close() } catch { /* Already closed. */ }
            return
          }
          const address = server.address()
          if (!address || typeof address === 'string') {
            void lease.release(transportError('the SSH tunnel did not obtain a TCP port', 'SSH_LISTEN'))
            return
          }
          lease.port = address.port
          lease.rejectListen = null
          resolve()
        })
        server.listen({ host: '127.0.0.1', port: 0, exclusive: true })
      } catch {
        void lease.release(transportError('the local SSH tunnel could not be opened', 'SSH_LISTEN'))
      }
    })
  }

  forward(lease, socket) {
    const { entry } = lease
    socket.on('error', () => {})
    if (lease.closed || entry.closed || lease.sockets.size >= this.maxSockets) {
      socket.destroy()
      return
    }
    lease.sockets.add(socket)
    socket.pause()
    socket.setNoDelay(true)
    let pending = true
    let channel = null
    const timer = setTimeout(() => {
      pending = false
      socket.destroy()
      void lease.release(transportError('SSH forwarding to the database timed out', 'SSH_FORWARD_TIMEOUT'))
    }, this.channelTimeoutMs)
    socket.once('close', () => {
      pending = false
      clearTimeout(timer)
      lease.sockets.delete(socket)
      channel?.destroy()
    })
    try {
      entry.client.forwardOut('127.0.0.1', socket.remotePort || 0,
        entry.targetHost, entry.targetPort, (error, stream) => {
          clearTimeout(timer)
          if (!pending || lease.closed || entry.closed || socket.destroyed) {
            stream?.destroy()
            return
          }
          pending = false
          if (error) {
            socket.destroy()
            stream?.destroy()
            void lease.release(transportError('SSH forwarding was refused or the database target is unreachable', 'SSH_FORWARD'))
            return
          }
          channel = stream
          lease.channels.add(stream)
          stream.on('error', () => socket.destroy())
          stream.once('close', () => {
            lease.channels.delete(stream)
            socket.destroy()
          })
          socket.pipe(stream).pipe(socket)
          socket.resume()
        })
    } catch {
      clearTimeout(timer)
      socket.destroy()
      void lease.release(transportError('SSH forwarding failed', 'SSH_FORWARD'))
    }
  }

  /** Enter the terminal state synchronously, before any asynchronous close. */
  closeEntry(entry, error = transportError('the SSH transport was closed')) {
    if (entry.closed) return entry.closePromise ?? Promise.resolve()
    entry.closed = true
    entry.error = error
    clearTimeout(entry.timer)
    entry.reject?.(error)
    entry.reject = null
    if (this.entries.get(entry.key) === entry) this.entries.delete(entry.key)
    const tasks = [...entry.leases].map((lease) => lease.release(error))
    try { entry.client?.end() } catch { /* Failed handshake. */ }
    try { entry.client?.destroy?.() } catch { /* Already destroyed. */ }
    entry.closePromise = Promise.allSettled(tasks).then(() => undefined)
    return entry.closePromise
  }

  close(connectionId) {
    return Promise.all([...this.entries.values()]
      .filter((entry) => entry.id === connectionId)
      .map((entry) => this.closeEntry(entry))).then(() => undefined)
  }

  dispose() {
    this.disposed = true
    return Promise.all([...this.entries.values()].map((entry) => this.closeEntry(entry))).then(() => undefined)
  }
}
