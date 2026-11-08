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
import { getRecord, openSecret } from './connections.js'
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
 * Open a driver, failing instead of hanging when a host is unreachable.
 *
 * Drivers have their own connect timeouts, but a wrong host name can still keep
 * some clients retrying. The race guarantees the panel always gets an answer.
 * @param {object} driver - unopened driver.
 * @param {number} [timeoutMs] - how long to wait.
 * @returns {Promise<string>} the reported server version.
 */
async function openWithTimeout(driver, timeoutMs = OPEN_TIMEOUT_MS) {
  /** @type {NodeJS.Timeout|undefined} */
  let timer
  try {
    return await Promise.race([
      driver.open(),
      new Promise((_resolve, reject) => {
        timer = setTimeout(
          () => reject(new Error(`the database did not answer within ${Math.round(timeoutMs / 1000)}s`)),
          timeoutMs,
        )
        if (typeof timer.unref === 'function') timer.unref()
      }),
    ])
  } finally {
    if (timer) clearTimeout(timer)
  }
}

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
   *   createDriver?: (connection: object) => Promise<object> }} [options] - pool options.
   */
  constructor(options = {}) {
    this.idleMs = options.idleMs ?? IDLE_MS
    this.log = options.log ?? (() => {})
    this.createDriver = options.createDriver ?? createDriver
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
    return { ...record, password: openSecret(record.secret) }
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
    const pending = this.opening.get(key)
    if (pending) return pending
    if (this.disposed) throw new GridError('the Grid plugin has been unloaded', 503)

    const epoch = this.epochOf(key)
    const task = (async () => {
      const connection = record ?? this.resolveRecord(id)
      const driver = await this.createDriver(connection)
      let version
      try {
        version = await openWithTimeout(driver)
      } catch (error) {
        await driver.close().catch(() => {})
        throw error
      }
      if (this.disposed || this.epochOf(key) !== epoch) {
        // The user disconnected, edited or deleted the connection while the
        // handshake was in flight. Registering this session would resurrect the
        // credentials they just changed.
        await driver.close().catch(() => {})
        throw new GridError('the connection was closed while it was opening', 503)
      }
      const session = {
        id,
        lane,
        engine: connection.engine,
        connection,
        driver,
        version,
        active: 0,
        openedAt: Date.now(),
        lastUsed: Date.now(),
      }
      this.sessions.set(key, session)
      this.log(`[grid] opened ${connection.engine} session ${id} (${lane})`)
      return session
    })()
    this.opening.set(key, task)
    try {
      return await task
    } finally {
      this.opening.delete(key)
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

    const runOn = async (session) => {
      session.active = (session.active ?? 0) + 1
      try {
        const result = await operation(session)
        session.lastUsed = Date.now()
        return result
      } finally {
        session.active = Math.max(0, session.active - 1)
      }
    }

    const run = async () => {
      const session = await this.acquire(id, lane)
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
        if (!retry || !isDisconnectError(error)) throw error
        this.log(`[grid] session ${id} (${session.lane}) dropped, retrying once`)
        // Close only the session that failed. If another request already
        // replaced it, leave the healthy one alone.
        await this.closeLane(id, session.lane, session)
        return runOn(await this.acquire(id, lane))
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
    return session.driver.cancelQuery()
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
    if (!session) return false
    this.sessions.delete(key)
    try {
      await session.driver.close()
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
  async close(connectionId) {
    const id = String(connectionId ?? '')
    const lanes = new Set(['main', 'query'])
    for (const session of this.sessions.values()) {
      if (session.id === id) lanes.add(session.lane)
    }
    let closed = false
    for (const lane of lanes) {
      const key = SessionPool.keyOf(id, lane)
      const existed = this.sessions.has(key) || this.opening.has(key)
      if (await this.closeLane(id, lane)) closed = true
      else if (existed) closed = true
    }
    return closed
  }

  /**
   * Close every session; used when the plugin unloads.
   * @returns {Promise<void>}
   */
  async closeAll() {
    this.disposed = true
    const keys = new Set([...this.sessions.keys(), ...this.opening.keys()])
    await Promise.all(
      [...keys].map(async (key) => {
        const [id, lane] = key.split('\u0000')
        await this.closeLane(id, lane)
      }),
    )
    this.sessions.clear()
    this.opening.clear()
    this.queues.clear()
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
export async function testConnection(connection) {
  const driver = await createDriver(connection)
  const started = Date.now()
  try {
    const version = await openWithTimeout(driver)
    return { ok: true, latencyMs: Date.now() - started, serverVersion: version }
  } finally {
    await driver.close().catch(() => {})
  }
}
