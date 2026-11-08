/**
 * Session pool: one live driver per connection id and lane.
 *
 * A workbench keeps sessions open between requests so the browser does not pay
 * a TCP + auth round-trip per click. Sessions expire when idle, and a dropped
 * socket is retried once against a fresh driver before the error reaches the
 * user.
 *
 * There are two lanes. Everything a click needs — the object tree, a page of
 * rows, a table's structure — uses `main`. SQL the user typed runs on `query`,
 * its own connection, so a report that takes thirty seconds no longer freezes
 * the tree behind it. SQLite and SQL Server are exempt: SQLite's driver is
 * synchronous (a second connection would wait on the same thread and add lock
 * contention), and `mssql` already multiplexes one pool internally.
 */

import { createDriver } from './drivers/index.js'
import { getRecord, connectionWithSecrets } from './connections.js'
import { openDatabase, closeDriver } from './open.js'
import { TransportManager, transportError } from './transport.js'
import { GridError } from './errors.js'

/** Idle lifetime of an unused session. */
const IDLE_MS = 10 * 60 * 1000

/** How often the reaper runs. */
const REAP_INTERVAL_MS = 60 * 1000

/** Error text that means the socket is gone rather than the SQL being wrong. */
const DISCONNECT_HINTS = [
  'connection lost',
  'econnreset',
  'econnrefused',
  'epipe',
  'socket hang up',
  'not open',
  'closed',
  'server closed the connection',
  'terminating connection',
  'connection terminated',
  'client has encountered a connection error',
]

/** Engines that gain nothing from a second connection. */
const SINGLE_LANE_ENGINES = new Set(['sqlite', 'sqlserver'])

/** Upper bound on one driver handshake. */
const OPEN_TIMEOUT_MS = 20_000

/**
 * Decide whether an error means the session should be rebuilt.
 * @param {unknown} error - the thrown value.
 * @returns {boolean} true when reconnecting is worth one attempt.
 */
export function isDisconnectError(error) {
  const message = String(error instanceof Error ? error.message : error ?? '').toLowerCase()
  return DISCONNECT_HINTS.some((hint) => message.includes(hint))
}

export class SessionPool {
  /**
   * @param {{ idleMs?: number, log?: (message: string) => void,
   *   createDriver?: (connection: object) => Promise<object>,
   *   transportManager?: TransportManager, openTimeoutMs?: number }} [options] - pool options.
   */
  constructor(options = {}) {
    this.idleMs = options.idleMs ?? IDLE_MS
    this.log = options.log ?? (() => {})
    this.createDriver = options.createDriver ?? createDriver
    this.transportManager = options.transportManager ?? new TransportManager()
    this.openTimeoutMs = options.openTimeoutMs ?? OPEN_TIMEOUT_MS
    this.connectionEpochs = new Map()
    this.closing = new Map()
    this.controllers = new Map()
    this.probeControllers = new Map()
    /** @type {Map<string, object>} */
    this.sessions = new Map()
    /** @type {Map<string, Promise<object>>} */
    this.opening = new Map()
    /**
     * One serial queue per connection+lane, independent of the driver that
     * happens to be current. A queue used to live on the session object, so a
     * reconnect stranded queued work on the old session and let a later request
     * run concurrently with the retry.
     * @type {Map<string, Promise<unknown>>}
     */
    this.queues = new Map()
    /**
     * Monotonic per-key generation. Closing a lane bumps it, so a handshake
     * that finishes afterwards cannot put the old credentials back in the pool.
     * @type {Map<string, number>}
     */
    this.epochs = new Map()
    this.disposed = false
    this.timer = setInterval(() => {
      void this.reap()
    }, REAP_INTERVAL_MS)
    // Do not keep the Host process alive just for the reaper.
    if (typeof this.timer.unref === 'function') this.timer.unref()
  }

  /**
   * Read the generation of one pool key.
   * @param {string} key - pool key.
   * @returns {number} the current generation.
   */
  epochOf(key) {
    return this.epochs.get(key) ?? 0
  }

  /**
   * Invalidate every handshake currently in flight for one key.
   * @param {string} key - pool key.
   * @returns {void}
   */
  bumpEpoch(key) {
    this.epochs.set(key, this.epochOf(key) + 1)
  }

  /**
   * Resolve the lane a request will really use. The queue key has to be this
   * one: on SQLite both lanes are the same connection, and two separate queues
   * would let two requests overlap on it.
   * @param {string} connectionId - connection id.
   * @param {'main'|'query'} lane - requested lane.
   * @returns {'main'|'query'} the effective lane.
   */
  effectiveLane(connectionId, lane = 'main') {
    if (lane !== 'query') return 'main'
    const id = String(connectionId ?? '')
    const queryOpen = this.sessions.get(SessionPool.keyOf(id, 'query'))
    if (queryOpen) return 'query'
    const mainOpen = this.sessions.get(SessionPool.keyOf(id, 'main'))
    const engine = mainOpen?.engine ?? this.resolveRecord(id).engine
    return SINGLE_LANE_ENGINES.has(engine) ? 'main' : 'query'
  }

  /**
   * Build a driver for a stored connection, including its password.
   * @param {string} connectionId - connection id.
   * @returns {object} the connection record with `password` attached.
   */
  resolveRecord(connectionId) {
    const record = getRecord(connectionId)
    if (!record) throw new GridError('connection not found', 404)
    return connectionWithSecrets(record)
  }

  /**
   * Map a connection id and lane onto the key the pool stores.
   * @param {string} connectionId - connection id.
   * @param {'main'|'query'} lane - session lane.
   * @returns {string} the pool key.
   */
  static keyOf(connectionId, lane) {
    return `${String(connectionId ?? '')}\u0000${lane}`
  }

  /**
   * Decide which lane a request actually gets.
   * @param {object} connection - normalized connection record.
   * @param {'main'|'query'} lane - requested lane.
   * @returns {'main'|'query'} the lane the engine can support.
   */
  laneFor(connection, lane) {
    if (lane !== 'query') return 'main'
    return SINGLE_LANE_ENGINES.has(connection?.engine) ? 'main' : 'query'
  }

  /**
   * Read the open session of one lane without opening it.
   * @param {string} connectionId - connection id.
   * @param {'main'|'query'} [lane] - session lane.
   * @returns {object|undefined} the session.
   */
  peek(connectionId, lane = 'main') {
    return this.sessions.get(SessionPool.keyOf(connectionId, lane))
  }

  /**
   * Open (or reuse) the session of one connection and lane.
   * @param {string} connectionId - connection id.
   * @param {'main'|'query'} [lane] - requested lane.
   * @returns {Promise<object>} the session.
   */
  async acquire(connectionId, lane = 'main') {
    const id = String(connectionId ?? '')
    if (this.disposed || this.closing.has(id)) throw new GridError('the connection is closing or the Grid plugin has been unloaded', 503)
    const mainOpen = this.sessions.get(SessionPool.keyOf(id, 'main'))
    const queryOpen = this.sessions.get(SessionPool.keyOf(id, 'query'))

    /** @type {'main'|'query'} */
    let target
    if (lane !== 'query') {
      target = 'main'
    } else if (queryOpen) {
      target = 'query'
    } else if (mainOpen) {
      // The engine decides whether a second connection is worth opening.
      target = SINGLE_LANE_ENGINES.has(mainOpen.engine) ? 'main' : 'query'
    } else {
      // Nothing is open: resolve the record now, so the engine is known before
      // the session is registered under a lane, and reuse it for the driver.
      const record = this.resolveRecord(id)
      return this.openSession(id, this.laneFor(record, lane), record)
    }

    const open = target === 'main' ? mainOpen : queryOpen
    if (open?.transport?.closed) {
      await this.closeLane(id, target, open)
      return this.openSession(id, target)
    }
    if (open) {
      open.lastUsed = Date.now()
      return open
    }
    return this.openSession(id, target)
  }

  /**
   * Open one session and register it under its lane.
   * @param {string} id - connection id.
   * @param {'main'|'query'} lane - session lane.
   * @param {object} [record] - already-resolved connection record.
   * @returns {Promise<object>} the session.
   */
  async openSession(id, lane, record) {
    const key = SessionPool.keyOf(id, lane)
    if (this.disposed || this.closing.has(id)) throw new GridError('the connection is closing or the Grid plugin has been unloaded', 503)
    const pending = this.opening.get(key)
    if (pending) return pending
    const epoch = this.epochOf(key)
    const controller = new AbortController()
    this.controllers.set(key, controller)
    const task = (async () => {
      const connection = record ?? this.resolveRecord(id)
      const opened = await openDatabase(connection, {
        transportManager: this.transportManager,
        createDriver: this.createDriver,
        signal: controller.signal,
        timeoutMs: this.openTimeoutMs,
      })
      const { driver, version, transport } = opened
      if (this.disposed || this.epochOf(key) !== epoch) {
        await opened.close()
        throw new GridError('the connection was closed while it was opening', 503)
      }
      const session = {
        id, lane, engine: connection.engine,
        connection: opened.connection, driver, version, transport,
        close: opened.close,
        active: 0, openedAt: Date.now(), lastUsed: Date.now(),
      }
      this.sessions.set(key, session)
      session.unlinkTransport = transport?.onFailure(() => {
        if (this.sessions.get(key) === session) {
          this.sessions.delete(key)
          this.bumpEpoch(key)
        }
      })
      this.log(`[grid] opened ${connection.engine} session ${id} (${lane})`)
      return session
    })()
    this.opening.set(key, task)
    try {
      return await task
    } finally {
      if (this.opening.get(key) === task) this.opening.delete(key)
      if (this.controllers.get(key) === controller) this.controllers.delete(key)
    }
  }

  /**
   * Run one operation against a session, rebuilding it once when the socket
   * turns out to be dead.
   *
   * Work is serialised per connection+lane, not per session object, so a
   * reconnect cannot make an old request overlap a new one.
   * @param {string} connectionId - connection id.
   * @param {(session: object) => Promise<T>} operation - the work.
   * @param {{ retry?: boolean, lane?: 'main'|'query' }} [options] - retry control and lane.
   * @returns {Promise<T>} the operation result.
   * @template T
   */
  async withSession(connectionId, operation, options = {}) {
    const id = String(connectionId ?? '')
    const lane = this.effectiveLane(id, options.lane ?? 'main')
    const key = SessionPool.keyOf(id, lane)
    const retry = options.retry !== false
    const generation = this.connectionEpochs.get(id) ?? 0
    const assertGeneration = () => {
      if (this.disposed || this.closing.has(id) || (this.connectionEpochs.get(id) ?? 0) !== generation) {
        throw new GridError('the connection was closed; queued work was cancelled', 503)
      }
    }
    assertGeneration()

    const runOn = async (session) => {
      assertGeneration()
      if (session.connection?._closed) throw new GridError('the database session was closed', 503)
      session.transport?.assertOpen()
      session.active = (session.active ?? 0) + 1
      try {
        const result = await operation(session)
        if (session.transport?.closed) throw transportError('SSH connection was lost; execution results may be unknown; the operation was not replayed')
        session.lastUsed = Date.now()
        return result
      } finally {
        session.active = Math.max(0, session.active - 1)
      }
    }

    const run = async () => {
      assertGeneration()
      const session = await this.acquire(id, lane)
      assertGeneration()
      try {
        return await runOn(session)
      } catch (error) {
        // A cancelled statement can surface as a broken socket (the driver may
        // have dropped it to stop the query). Retrying it would run the query
        // the user just cancelled, so the request fails as asked.
        if (session.driver?.cancelled) {
          session.driver.cancelled = false
          throw error
        }
        assertGeneration()
        // A lost SSH transport invalidates all its channels. Never replay an
        // in-flight operation, including drivers returning per-statement errors.
        if (session.transport?.closed) throw transportError('SSH connection was lost; execution results may be unknown; the operation was not replayed')
        if (!retry || !isDisconnectError(error)) throw error
        this.log(`[grid] session ${id} (${session.lane}) dropped, retrying once`)
        // Close only the session that failed. If another request already
        // replaced it, leave the healthy one alone.
        await this.closeLane(id, session.lane, session)
        const replacement = await this.acquire(id, lane)
        assertGeneration()
        return runOn(replacement)
      }
    }

    const previous = this.queues.get(key) ?? Promise.resolve()
    const current = previous.then(run, run)
    const tail = current.catch(() => undefined)
    this.queues.set(key, tail)
    void tail.then(() => {
      if (this.queues.get(key) === tail) this.queues.delete(key)
    })
    return current
  }

  /**
   * Cancel whatever is running on one lane.
   *
   * This deliberately bypasses the execution queue: a cancel that waited for
   * the statement it is cancelling would never arrive. It also never opens a
   * session, because there is nothing running when none is open.
   * @param {string} connectionId - connection id.
   * @param {'main'|'query'} [lane] - lane to cancel.
   * @returns {Promise<{ cancelled: boolean, reason?: string }>} the outcome.
   */
  async cancel(connectionId, lane = 'query') {
    const id = String(connectionId ?? '')
    const effective = this.effectiveLane(id, lane)
    const session = this.sessions.get(SessionPool.keyOf(id, effective))
    if (!session) {
      const record = getRecord(id)
      if (record?.engine === 'sqlite') {
        return { cancelled: false, reason: 'SQLite cannot cancel a running statement' }
      }
      return { cancelled: false, reason: 'no statement is running on this connection' }
    }
    if (typeof session.driver?.cancelQuery !== 'function') {
      return { cancelled: false, reason: 'this engine cannot cancel a running statement' }
    }
    session.active = (session.active ?? 0) + 1
    let timer
    try {
      session.transport?.assertOpen()
      return await Promise.race([
        session.driver.cancelQuery(),
        new Promise((resolve) => {
          timer = setTimeout(() => {
            session.driver.cancelled = true
            void this.closeLane(id, effective, session)
            resolve({ cancelled: false, reason: 'the cancellation timed out; the session was closed and execution results may be unknown' })
          }, 10_000)
        }),
      ])
    } finally {
      clearTimeout(timer)
      session.active = Math.max(0, session.active - 1)
      session.lastUsed = Date.now()
    }
  }

  /**
   * Read one open session without opening it.
   * @param {string} connectionId - connection id.
   * @returns {object|undefined} the session.
   */
  get(connectionId) {
    return this.peek(connectionId, 'main')
  }

  /**
   * Close one lane of a connection.
   * @param {string} connectionId - connection id.
   * @param {'main'|'query'} lane - session lane.
   * @param {object} [expected] - only close the session when it is this object.
   * @returns {Promise<boolean>} whether a session was open.
   */
  async closeLane(connectionId, lane, expected) {
    const key = SessionPool.keyOf(connectionId, lane)
    const session = this.sessions.get(key)
    if (expected && session !== expected) return false
    // Invalidate an in-flight handshake first: its success must not register
    // the session after this close returned. The handshake itself notices the
    // new generation and closes its driver, so this does not have to wait for a
    // slow host to time out.
    this.bumpEpoch(key)
    this.controllers.get(key)?.abort(transportError('the connection was closed while it was opening'))
    this.controllers.delete(key)
    this.opening.delete(key)
    if (!session) return false
    this.sessions.delete(key)
    session.unlinkTransport?.()
    try {
      if (session.close) await session.close()
      else await closeDriver(session.driver)
    } catch (error) {
      this.log(`[grid] closing ${session.id} (${lane}) failed: ${error instanceof Error ? error.message : String(error)}`)
    }
    return true
  }

  /**
   * Close every lane of one connection.
   * @param {string} connectionId - connection id.
   * @returns {Promise<boolean>} whether any session was open.
   */
  close(connectionId) {
    const id = String(connectionId ?? '')
    if (this.closing.has(id)) return this.closing.get(id)
    this.connectionEpochs.set(id, (this.connectionEpochs.get(id) ?? 0) + 1)
    for (const [controller, probeId] of this.probeControllers) {
      if (probeId === id) controller.abort(transportError('the connection was closed while it was opening'))
    }
    const lanes = new Set(['main', 'query'])
    for (const session of this.sessions.values()) {
      if (session.id === id) lanes.add(session.lane)
    }
    const existed = [...lanes].some((lane) => {
      const key = SessionPool.keyOf(id, lane)
      return this.sessions.has(key) || this.opening.has(key)
    })
    // Install a connection-wide fence before closing either lane. Queued work
    // captured the previous generation and cannot resurrect a disconnected id.
    const task = Promise.resolve().then(async () => {
      await Promise.all([...lanes].map((lane) => this.closeLane(id, lane)))
      await this.transportManager.close(id)
      return existed
    }).finally(() => {
      if (this.closing.get(id) === task) this.closing.delete(id)
    })
    this.closing.set(id, task)
    return task
  }

  /**
   * Close every session; used when the plugin unloads.
   * @returns {Promise<void>}
   */
  async closeAll() {
    this.disposed = true
    clearInterval(this.timer)
    for (const controller of this.probeControllers.keys()) controller.abort(transportError('the Grid plugin has been unloaded'))
    for (const controller of this.controllers.values()) controller.abort(transportError('the connection was closed while it was opening'))
    const transportClosing = this.transportManager.dispose()
    const keys = new Set([...this.sessions.keys(), ...this.opening.keys()])
    await Promise.all(
      [...keys].map(async (key) => {
        const [id, lane] = key.split('\u0000')
        await this.closeLane(id, lane)
      }),
    )
    await transportClosing
    await Promise.allSettled([...this.closing.values()])
    this.sessions.clear()
    this.opening.clear()
    this.controllers.clear()
    this.queues.clear()
  }

  /** A probe has an isolated listener/client and participates in unload. */
  async testConnection(connection) {
    if (this.disposed || this.closing.has(connection.id)) throw new GridError('the connection is closing or the Grid plugin has been unloaded', 503)
    const controller = new AbortController()
    this.probeControllers.set(controller, connection.id)
    try {
      const opened = await openDatabase(connection, {
        transportManager: this.transportManager, createDriver: this.createDriver,
        signal: controller.signal, ephemeral: true, timeoutMs: this.openTimeoutMs,
      })
      try {
        return { ok: true, latencyMs: opened.latencyMs, serverVersion: opened.version }
      } finally {
        await opened.close()
      }
    } finally {
      this.probeControllers.delete(controller)
    }
  }

  /**
   * Every open session, with how long it has been unused.
   * @returns {Array<{ id: string, lane: string, engine: string, idleMs: number, version: string }>}
   */
  listOpen() {
    const now = Date.now()
    return [...this.sessions.values()].map((session) => ({
      id: session.id,
      lane: session.lane,
      engine: session.engine,
      idleMs: now - session.lastUsed,
      version: session.version,
    }))
  }

  /**
   * Close sessions that have been idle past the lifetime.
   *
   * A lane with a request in progress is never idle: closing it would fail the
   * operation the user is waiting for.
   * @returns {Promise<number>} how many were closed.
   */
  async reap() {
    const now = Date.now()
    const stale = [...this.sessions.values()].filter(
      (session) => (session.active ?? 0) === 0 && now - session.lastUsed > this.idleMs,
    )
    await Promise.all(stale.map((session) => this.closeLane(session.id, session.lane, session)))
    return stale.length
  }

  /**
   * Stop the reaper. Sessions are closed by `closeAll`, which the plugin's
   * disposer calls first.
   * @returns {void}
   */
  dispose() {
    clearInterval(this.timer)
    this.disposed = true
  }
}

/**
 * Test one connection without keeping a session.
 * @param {object} connection - fields with a plain `password`.
 * @returns {Promise<{ ok: boolean, latencyMs: number, serverVersion: string }>}
 */
export async function testConnection(connection, options = {}) {
  const transportManager = new TransportManager()
  try {
    const opened = await openDatabase(connection, { ...options, transportManager, ephemeral: true })
    try {
      return { ok: true, latencyMs: opened.latencyMs, serverVersion: opened.version }
    } finally {
      await opened.close()
    }
  } finally {
    await transportManager.dispose()
  }
}
