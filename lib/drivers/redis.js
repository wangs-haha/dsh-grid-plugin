/**
 * Redis adapter over `ioredis`.
 *
 * Redis has no tables, so this driver exposes a key-space surface instead:
 * `SCAN` with a type filter, one key inspection per type, and a raw command
 * console. `lib/api.js` routes to these methods only for the redis engine.
 */

import { GridError } from '../errors.js'
import { queryTimeoutMs } from './options.js'
import { tlsOptions } from './tls.js'

/** Keys returned per `SCAN` page. */
const SCAN_PAGE = 100

/** Collection entries returned per key inspection. */
const COLLECTION_LIMIT = 500

/** Bytes of a string value kept for display. */
const STRING_LIMIT = 64 * 1024

/**
 * Read a collection page-by-page instead of fetching it whole.
 *
 * `SMEMBERS` on a large set loads every member just to show 500 of them.
 * @param {import('ioredis').default} client - open client.
 * @param {'sscan'|'hscan'|'zscan'} command - the incremental scanner.
 * @param {string} key - the collection key.
 * @returns {Promise<string[]>} up to `COLLECTION_LIMIT` flat reply entries.
 */
async function scanCollection(client, command, key) {
  /** @type {string[]} */
  const entries = []
  let cursor = '0'
  do {
    // `zscan` returns member/score pairs, `hscan` field/value pairs.
    const [next, batch] = await client.call(command, key, cursor, 'COUNT', COLLECTION_LIMIT)
    cursor = String(next ?? '0')
    for (const entry of batch ?? []) {
      if (entries.length >= COLLECTION_LIMIT) break
      entries.push(String(entry))
    }
  } while (cursor !== '0' && entries.length < COLLECTION_LIMIT)
  return entries
}

/**
 * Split a Redis command line into argv, honouring single and double quotes and
 * backslash escapes.
 * @param {string} text - the typed command.
 * @returns {string[]} the tokens.
 */
export function tokenizeCommand(text) {
  const source = String(text ?? '')
  /** @type {string[]} */
  const tokens = []
  let current = ''
  let quote = ''
  let hasToken = false
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index]
    if (quote) {
      if (char === '\\' && index + 1 < source.length) {
        current += source[index + 1]
        index += 1
        continue
      }
      if (char === quote) {
        quote = ''
        continue
      }
      current += char
      continue
    }
    if (char === '"' || char === "'") {
      quote = char
      hasToken = true
      continue
    }
    if (/\s/.test(char)) {
      if (hasToken) {
        tokens.push(current)
        current = ''
        hasToken = false
      }
      continue
    }
    current += char
    hasToken = true
  }
  if (hasToken) tokens.push(current)
  return tokens
}

/**
 * Stringify one Redis reply for the browser without losing its shape.
 * @param {unknown} value - raw reply.
 * @returns {unknown} JSON-safe value.
 */
function serializeReply(value) {
  if (value === null || value === undefined) return null
  if (typeof value === 'string' || typeof value === 'number') return value
  if (typeof value === 'bigint') return value.toString()
  if (Buffer.isBuffer(value)) {
    const text = value.toString('utf8')
    return text.length > STRING_LIMIT ? `${text.slice(0, STRING_LIMIT)}…` : text
  }
  if (Array.isArray(value)) return value.map(serializeReply)
  if (typeof value === 'object') {
    /** @type {Record<string, unknown>} */
    const out = {}
    for (const [key, entry] of Object.entries(value)) out[key] = serializeReply(entry)
    return out
  }
  return String(value)
}

export class RedisDriver {
  /**
   * @param {object} connection - normalized connection record.
   */
  constructor(connection) {
    this.connection = connection
    this.engine = 'redis'
    /** @type {import('ioredis').default|null} */
    this.client = null
    this.version = ''
    this.currentDb = connection.redisDb ?? 0
  }

  /**
   * Open one client in the configured database.
   * @returns {Promise<string>} the server version.
   */
  async open() {
    const { default: Redis } = await import('ioredis')
    const { connection } = this
    const client = new Redis({
      host: connection.host,
      port: connection.port || 6379,
      password: connection.password || undefined,
      db: connection.redisDb || 0,
      lazyConnect: true,
      connectTimeout: 5_000,
      // Fail fast on an unreachable host: without this ioredis retries forever
      // and the panel would spin instead of reporting the failure.
      retryStrategy: () => null,
      enableOfflineQueue: false,
      maxRetriesPerRequest: 0,
      // Rejects a command that never answers instead of leaving the panel waiting.
      commandTimeout: queryTimeoutMs(connection),
      ...(tlsOptions(connection) ? { tls: tlsOptions(connection) } : {}),
    })
    client.on('error', () => {
      // ioredis emits errors on the client; the request path reports them too.
    })
    await client.connect()
    const info = await client.info('server')
    const match = /redis_version:([^\r\n]+)/.exec(String(info))
    this.client = client
    this.version = `Redis ${match ? match[1] : ''}`.trim()
    return this.version
  }

  /** @returns {Promise<void>} resolves after the client is closed. */
  async close() {
    if (this.client) {
      const client = this.client
      this.client = null
      try {
        await client.quit()
      } catch {
        client.disconnect()
      }
    }
  }

  /** @returns {import('ioredis').default} the open client. */
  handle() {
    if (!this.client) throw new Error('the Redis connection is not open')
    return this.client
  }

  /** @returns {Promise<string>} the server version. */
  async serverVersion() {
    return this.version
  }

  /**
   * List logical databases. The server's configured count is used when it can
   * be read (many managed servers deny `CONFIG`), otherwise the Redis default.
   * @returns {Promise<Array<{ name: string, schemas: string[] }>>}
   */
  async databases() {
    let count = 16
    try {
      const reply = await this.handle().config('GET', 'databases')
      const value = Array.isArray(reply) ? Number(reply[1]) : 16
      if (Number.isInteger(value) && value > 0 && value <= 256) count = value
    } catch {
      count = 16
    }
    return Array.from({ length: count }, (_, index) => ({ name: `db${index}`, schemas: [] }))
  }

  /**
   * Switch the logical database of this session.
   * @param {number|string} index - database index.
   * @param {boolean} [force] - send `SELECT` even when the cache agrees.
   * @returns {Promise<void>}
   */
  async select(index, force = false) {
    const target = Math.max(0, Math.trunc(Number(index) || 0))
    // The cache can be stale when a raw command changed the connection's
    // database, so scoped operations force the switch instead of trusting it.
    if (!force && target === this.currentDb) return
    await this.handle().select(target)
    this.currentDb = target
  }

  /**
   * Scan one page of keys.
   * @param {{ cursor?: string|number, pattern?: string, type?: string, database?: number }} request
   * @returns {Promise<{ cursor: string, keys: Array<{ key: string, type: string, ttl: number }> }>}
   */
  async scan(request = {}) {
    if (request.database !== undefined) await this.select(request.database, true)
    const client = this.handle()
    const cursor = String(request.cursor ?? '0')
    const pattern = String(request.pattern ?? '').trim() || '*'
    const type = String(request.type ?? '').trim()
    const reply = type
      ? await client.scan(cursor, 'MATCH', pattern, 'COUNT', SCAN_PAGE, 'TYPE', type)
      : await client.scan(cursor, 'MATCH', pattern, 'COUNT', SCAN_PAGE)
    const [next, names] = reply
    const keyNames = names || []
    // One pipeline instead of two round-trips per key: a 100-key page was 200
    // sequential commands.
    let types = []
    let ttls = []
    if (keyNames.length > 0) {
      const pipeline = client.pipeline()
      for (const name of keyNames) {
        pipeline.type(name)
        pipeline.ttl(name)
      }
      const replies = await pipeline.exec()
      const flat = (replies ?? []).map(([error, value]) => (error ? null : value))
      types = flat.filter((_value, index) => index % 2 === 0)
      ttls = flat.filter((_value, index) => index % 2 === 1)
    }
    const keys = keyNames.map((name, index) => ({
      key: name,
      type: String(types[index] ?? ''),
      ttl: Number(ttls[index] ?? -1),
    }))
    return { cursor: String(next ?? '0'), keys }
  }

  /**
   * Read one key's value according to its type.
   * @param {{ key: string, database?: number }} request - the key.
   * @returns {Promise<{ key: string, type: string, ttl: number, length: number|null, value: unknown, truncated: boolean }>}
   */
  async inspectKey(request) {
    if (request.database !== undefined) await this.select(request.database, true)
    const client = this.handle()
    const key = String(request.key ?? '')
    if (!key) throw new GridError('a key is required')
    const [type, ttl] = await Promise.all([client.type(key), client.ttl(key)])
    let value = null
    let length = null
    let truncated = false
    if (type === 'string') {
      const raw = await client.get(key)
      const text = raw === null ? null : String(raw)
      length = text === null ? 0 : text.length
      if (text !== null && text.length > STRING_LIMIT) {
        value = text.slice(0, STRING_LIMIT)
        truncated = true
      } else {
        value = text
      }
    } else if (type === 'hash') {
      length = await client.hlen(key)
      const flat = await scanCollection(client, 'hscan', key)
      if (length > COLLECTION_LIMIT) truncated = true
      /** @type {Record<string, string>} */
      const fields = {}
      for (let index = 0; index < flat.length; index += 2) {
        if (flat[index] === undefined) break
        fields[String(flat[index])] = String(flat[index + 1] ?? '')
      }
      value = fields
    } else if (type === 'list') {
      length = await client.llen(key)
      const entries = await client.lrange(key, 0, COLLECTION_LIMIT - 1)
      truncated = length > COLLECTION_LIMIT
      value = entries.map((entry) => String(entry))
    } else if (type === 'set') {
      length = await client.scard(key)
      // `SMEMBERS` would load the whole set to show 500 members.
      const entries = await scanCollection(client, 'sscan', key)
      truncated = length > entries.length
      value = entries
    } else if (type === 'zset') {
      length = await client.zcard(key)
      const flat = await scanCollection(client, 'zscan', key)
      truncated = length > COLLECTION_LIMIT
      /** @type {Array<{ member: string, score: number }>} */
      const pairs = []
      for (let index = 0; index < flat.length; index += 2) {
        if (flat[index] === undefined) break
        pairs.push({ member: String(flat[index]), score: Number(flat[index + 1]) })
      }
      value = pairs
    } else if (type === 'stream') {
      length = await client.xlen(key)
      const entries = await client.xrange(key, '-', '+', 'COUNT', COLLECTION_LIMIT)
      truncated = length > COLLECTION_LIMIT
      value = entries.map(([id, fields]) => ({ id, fields: serializeReply(fields) }))
    }
    return { key, type, ttl, length, value, truncated, database: this.currentDb }
  }

  /**
   * Run one raw command.
   * @param {{ command: string }} request - the typed command line.
   * @returns {Promise<{ command: string, tokens: string[], durationMs: number, reply: unknown }>}
   */
  async command(request) {
    const tokens = tokenizeCommand(request.command)
    if (tokens.length === 0) throw new GridError('enter a Redis command')
    const started = Date.now()
    const reply = await this.handle().call(...tokens)
    // A raw `SELECT n` moves the connection; keep the cache honest so a later
    // scoped operation does not delete a same-named key in the wrong database.
    if (String(tokens[0]).toUpperCase() === 'SELECT') {
      const index = Number(tokens[1])
      if (Number.isInteger(index) && index >= 0) this.currentDb = index
    }
    return { command: tokens[0].toUpperCase(), tokens, durationMs: Date.now() - started, reply: serializeReply(reply) }
  }

  /**
   * Delete one key.
   *
   * The database index is required: `select()` mutates the shared session, so a
   * delete that trusted the current index could remove a same-named key from a
   * different logical database.
   * @param {{ key: string, database?: number }} request - the key and its database.
   * @returns {Promise<{ deleted: number, database: number }>}
   */
  async removeKey(request) {
    if (request.database !== undefined) await this.select(request.database, true)
    const deleted = await this.handle().del(String(request.key ?? ''))
    return { deleted: Number(deleted ?? 0), database: this.currentDb }
  }

  /**
   * Redis has no table listing, so this method exists only to keep the driver
   * shape uniform; it returns the key count of the current database.
   * @returns {Promise<Array<{ name: string, kind: string, rows: number }>>}
   */
  async tables() {
    const size = await this.handle().dbsize()
    return [{ name: `keys (${size})`, kind: 'namespace', rows: Number(size) }]
  }
  /**
   * A Redis command is bounded by the connection's `commandTimeout`; there is no
   * separate cancel channel.
   * @returns {Promise<{ cancelled: boolean, reason?: string }>} always unsupported.
   */
  async cancelQuery() {
    return { cancelled: false, reason: 'Redis commands are bounded by the command timeout' }
  }

  /**
   * Redis has no stored routines.
   * @returns {Promise<object[]>} an empty list.
   */
  async routines() {
    return []
  }

  /**
   * Redis has no account catalogue to list.
   * @returns {Promise<object[]>} an empty list.
   */
  async accounts() {
    return []
  }
}

/**
 * Build an unopened Redis driver.
 * @param {object} connection - normalized connection record.
 * @returns {RedisDriver} the driver.
 */
export function create(connection) {
  return new RedisDriver(connection)
}
