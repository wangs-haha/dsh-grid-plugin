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
   * @param {{ idleMs?: number, log?: (message: string) => void }} [options] - pool options.
   */
  constructor(options = {}) {
    this.idleMs = options.idleMs ?? IDLE_MS
    this.log = options.log ?? (() => {})
    /** @type {Map<string, object>} */
    this.sessions = new Map()
    /** @type {Map<string, Promise<object>>} */
    this.opening = new Map()
    this.timer = setInterval(() => {
      void this.reap()
    }, REAP_INTERVAL_MS)
    // Do not keep the Host process alive just for the reaper.
    if (typeof this.timer.unref === 'function') this.timer.unref()
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

    const task = (async () => {
      const connection = record ?? this.resolveRecord(id)
      const driver = await createDriver(connection)
      let version
      try {
        version = await openWithTimeout(driver)
      } catch (error) {
        await driver.close().catch(() => {})
        throw error
      }
      const session = {
        id,
        lane,
        engine: connection.engine,
        connection,
        driver,
        version,
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
   * @param {string} connectionId - connection id.
   * @param {(session: object) => Promise<T>} operation - the work.
   * @param {{ retry?: boolean, lane?: 'main'|'query' }} [options] - retry control and lane.
   * @returns {Promise<T>} the operation result.
   * @template T
   */
  async withSession(connectionId, operation, options = {}) {
    const retry = options.retry !== false
    const lane = options.lane ?? 'main'
    const session = await this.acquire(connectionId, lane)
    if (!session._queue) session._queue = Promise.resolve()
    const run = async () => {
      try {
        const result = await operation(session)
        session.lastUsed = Date.now()
        return result
      } catch (error) {
        // A cancelled statement can surface as a broken socket (the driver may have
        // dropped it to stop the query). Retrying it would run the query the user
        // just cancelled, so the request fails as asked.
        if (session.driver?.cancelled) {
          session.driver.cancelled = false
          throw error
        }
        if (!retry || !isDisconnectError(error)) throw error
        this.log(`[grid] session ${connectionId} (${session.lane}) dropped, retrying once`)
        await this.closeLane(connectionId, session.lane)
        const fresh = await this.acquire(connectionId, session.lane)
        const result = await operation(fresh)
        fresh.lastUsed = Date.now()
        return result
      }
    }
    const current = session._queue.then(run, run)
    session._queue = current.catch(() => {})
    return current
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
   * @returns {Promise<boolean>} whether a session was open.
   */
  async closeLane(connectionId, lane) {
    const key = SessionPool.keyOf(connectionId, lane)
    const session = this.sessions.get(key)
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
    const lanes = [...this.sessions.values()].filter((session) => session.id === id).map((session) => session.lane)
    if (lanes.length === 0) return false
    await Promise.all(lanes.map((lane) => this.closeLane(id, lane)))
    return true
  }

  /**
   * Close every session; used when the plugin unloads.
   * @returns {Promise<void>}
   */
  async closeAll() {
    const open = [...this.sessions.values()]
    await Promise.all(open.map((session) => this.closeLane(session.id, session.lane)))
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
   * @returns {Promise<number>} how many were closed.
   */
  async reap() {
    const now = Date.now()
    const stale = [...this.sessions.values()].filter((session) => now - session.lastUsed > this.idleMs)
    await Promise.all(stale.map((session) => this.closeLane(session.id, session.lane)))
    return stale.length
  }

  /**
   * Stop the reaper. Sessions are closed by `closeAll`, which the plugin's
   * disposer calls first.
   * @returns {void}
   */
  dispose() {
    clearInterval(this.timer)
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
