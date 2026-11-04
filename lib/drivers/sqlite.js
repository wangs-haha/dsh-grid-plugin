/**
 * SQLite adapter over Node's built-in `node:sqlite`.
 *
 * No native module and no dependency install: Node ships the driver, so this is
 * the engine that works out of the box in every profile.
 *
 * The query work itself happens in `sqlite-worker.js` on a worker thread, because
 * `node:sqlite` is synchronous — running it here would freeze the whole Host for
 * the duration of a query. This class is only the async façade: every method
 * forwards one request and awaits one reply, which is exactly the shape the
 * session pool already expects. When a worker cannot be started at all, it falls
 * back to running `SqliteCore` in-process so the engine still works.
 */

import { Worker } from 'node:worker_threads'

import { GridError } from '../errors.js'
import { SqliteCore } from './sqlite-core.js'

/** Methods the facade forwards to the worker. */
const FORWARDED = [
  'databases',
  'tables',
  'describe',
  'estimateRows',
  'select',
  'update',
  'insert',
  'insertMany',
  'remove',
  'exec',
  'routines',
  'accounts',
]

export class SqliteDriver {
  /**
   * @param {object} connection - normalized connection record.
   */
  constructor(connection) {
    this.connection = connection
    this.engine = 'sqlite'
    this.version = ''
    /** @type {Worker|null} */
    this.worker = null
    /** @type {Map<number, { resolve: Function, reject: Function }>} */
    this.pending = new Map()
    this.nextId = 1
    /** @type {SqliteCore|null} */
    this.fallback = null
    this.closed = false
  }

  /**
   * Start the worker, or fall back to in-process execution.
   * @returns {Promise<void>}
   */
  async startWorker() {
    const worker = new Worker(new URL('./sqlite-worker.js', import.meta.url))
    await new Promise((resolve, reject) => {
      const onOnline = () => {
        worker.off('error', onError)
        resolve(undefined)
      }
      const onError = (error) => {
        worker.off('online', onOnline)
        reject(error)
      }
      worker.once('online', onOnline)
      worker.once('error', onError)
    })
    worker.on('message', (message) => this.onMessage(message))
    // A crashed worker must not leave callers waiting forever.
    worker.on('error', (error) => this.rejectAll(error))
    worker.on('exit', (code) => {
      this.worker = null
      if (code !== 0 && !this.closed) {
        this.rejectAll(new Error(`the SQLite worker stopped (exit code ${code})`))
      }
    })
    this.worker = worker
  }

  /**
   * Deliver one worker reply.
   * @param {{ id: number, ok: boolean, value?: unknown, error?: object }} message - the reply.
   * @returns {void}
   */
  onMessage(message) {
    const entry = this.pending.get(message?.id)
    if (!entry) return
    this.pending.delete(message.id)
    if (message.ok) {
      entry.resolve(message.value)
      return
    }
    const detail = message.error ?? {}
    entry.reject(new GridError(String(detail.message ?? 'the SQLite statement failed'), Number(detail.status) || 500))
  }

  /**
   * Fail every in-flight request.
   * @param {unknown} error - the cause.
   * @returns {void}
   */
  rejectAll(error) {
    for (const entry of this.pending.values()) entry.reject(error)
    this.pending.clear()
  }

  /**
   * Send one request to the worker and await its reply.
   * @param {string} method - core method name.
   * @param {unknown[]} args - arguments.
   * @returns {Promise<any>} the reply value.
   */
  async request(method, args) {
    const worker = this.worker
    if (!worker) throw new GridError('the SQLite worker is not running', 503)
    const id = this.nextId++
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject })
      worker.postMessage({ id, method, args })
    })
  }

  /**
   * Open the database file.
   * @returns {Promise<string>} the SQLite library version.
   */
  async open() {
    const file = this.connection.file
    if (!file) throw new GridError('a SQLite connection needs a database file path')
    try {
      await this.startWorker()
    } catch (error) {
      // A worker cannot be started in some embedded environments; the database
      // still has to work, it just blocks the thread while it does.
      await this.stopWorker()
      this.fallbackReason = error instanceof Error ? error.message : String(error)
      this.fallback = new SqliteCore(this.connection)
      this.version = await this.fallback.open()
      return this.version
    }
    const { secret: _secret, password: _password, ...safe } = this.connection
    await this.request('create', [safe])
    // A failure here is a real one (missing file, wrong format) and must reach
    // the caller rather than be retried in-process.
    this.version = await this.request('open', [])
    return this.version
  }

  /**
   * Tear the worker down without touching the fallback.
   * @returns {Promise<void>}
   */
  async stopWorker() {
    const worker = this.worker
    this.worker = null
    if (!worker) return
    try {
      await worker.terminate()
    } catch {
      // Already gone.
    }
  }

  /** @returns {Promise<void>} resolves after the handle is closed. */
  async close() {
    this.closed = true
    if (this.fallback) {
      await this.fallback.close()
      this.fallback = null
      return
    }
    if (this.worker) {
      try {
        await this.request('dispose', [])
      } catch {
        // A dead worker has nothing to dispose.
      }
      await this.stopWorker()
    }
    this.rejectAll(new Error('the SQLite connection was closed'))
  }

  /** @returns {Promise<string>} the server version string. */
  async serverVersion() {
    return this.version
  }

  /**
   * Run one core method, through the worker when it is available.
   * @param {string} method - core method name.
   * @param {unknown[]} args - arguments.
   * @returns {Promise<any>} the result.
   */
  call(method, args) {
    if (this.fallback) return this.fallback[method](...args)
    return this.request(method, args)
  }

  /**
   * SQLite offers no way to interrupt a statement already running: the driver is
   * synchronous, so the query holds the worker thread until it finishes.
   * @returns {Promise<{ cancelled: boolean, reason?: string }>} always unsupported.
   */
  async cancelQuery() {
    return { cancelled: false, reason: 'SQLite cannot cancel a running statement' }
  }
}

// One forwarding method per core operation. Written out rather than generated so
// the JSDoc types stay accurate at each call site.
for (const method of FORWARDED) {
  SqliteDriver.prototype[method] = function forward(...args) {
    return this.call(method, args)
  }
}

/**
 * Build an unopened SQLite driver.
 * @param {object} connection - normalized connection record.
 * @returns {SqliteDriver} the driver.
 */
export function create(connection) {
  return new SqliteDriver(connection)
}
