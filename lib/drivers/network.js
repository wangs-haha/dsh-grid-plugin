/** Separate database identity from the socket destination, including cancellation
 * side connections. All delayed socket creation checks the owning lease. */
import { Socket } from 'node:net'
import { transportError } from '../transport.js'

export function assertConnecting(connection) {
  if (connection._closed) throw transportError('database connection was closed')
  if (connection._signal?.aborted) throw connection._signal.reason ?? transportError('database connection was cancelled')
  connection._transport?.assertOpen()
}

export function createSocket(connection) {
  assertConnecting(connection)
  if (connection._transport) return track(connection._transport.createSocket(), connection)
  class DatabaseSocket extends Socket {
    connect() {
      assertConnecting(connection)
      const port = connection.port || { mysql: 3306, postgres: 5432, sqlserver: 1433, redis: 6379 }[connection.engine]
      return super.connect({ host: connection.host, port })
    }
  }
  const socket = new DatabaseSocket()
  socket.on('error', () => {})
  return track(socket, connection)
}

function track(socket, connection) {
  connection._sockets ??= new Set()
  connection._sockets.add(socket)
  const onAbort = () => socket.destroy()
  connection._signal?.addEventListener('abort', onAbort, { once: true })
  socket.once('close', () => {
    connection._sockets.delete(socket)
    connection._signal?.removeEventListener('abort', onAbort)
  })
  if (connection._signal?.aborted) socket.destroy()
  return socket
}

export function connectSocket(connection) {
  const socket = createSocket(connection)
  socket.setNoDelay(true)
  socket.setKeepAlive(true, 10_000)
  return socket.connect()
}

export function openSocket(connection, signal) {
  assertConnecting(connection)
  if (connection._transport) return connection._transport.openSocket(signal).then((socket) => track(socket, connection))
  return new Promise((resolve, reject) => {
    let settled = false
    const socket = createSocket(connection)
    const finish = (error) => {
      if (settled) return
      settled = true
      signal?.removeEventListener('abort', onAbort)
      socket.removeListener('error', onError)
      socket.removeListener('connect', onConnect)
      socket.removeListener('close', onClose)
      if (error) { socket.destroy(); reject(error) }
      else resolve(socket)
    }
    const onAbort = () => finish(signal.reason ?? transportError('database connection was cancelled'))
    const onError = (error) => finish(error)
    const onConnect = () => finish()
    const onClose = () => finish(transportError('database socket closed while connecting'))
    socket.once('error', onError)
    socket.once('connect', onConnect)
    socket.once('close', onClose)
    if (signal?.aborted) return onAbort()
    signal?.addEventListener('abort', onAbort, { once: true })
    try { socket.connect() } catch (error) { finish(error) }
  })
}
