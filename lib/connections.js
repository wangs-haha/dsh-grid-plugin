/**
 * Connection registry: validation, encrypted secrets, and durable storage.
 *
 * Passwords never leave this module in plain text. They are sealed with
 * AES-256-GCM under a random key that lives in its own `0600` file beside the
 * registry, and every outward-facing projection (`publicConnection`) drops the
 * ciphertext and keeps only `hasPassword`.
 */

import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto'
import { chmodSync, existsSync, mkdirSync, readFileSync, renameSync, statSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

import { GridError } from './errors.js'

/** Engines this plugin knows about. */
export const ENGINES = ['sqlite', 'mysql', 'postgres', 'sqlserver', 'redis']

/** Default TCP port per engine. */
export const DEFAULT_PORTS = {
  mysql: 3306,
  postgres: 5432,
  sqlserver: 1433,
  redis: 6379,
}

/** Environment colours borrowed from Navicat conventions. */
export const COLORS = ['none', 'red', 'yellow', 'green']

/**
 * TLS modes, weakest first.
 *
 * `require` encrypts without checking the certificate, which stops passive
 * sniffing but not an active attacker. `verify-full` is the default because a
 * connection that only *looks* encrypted is worse than one that refuses.
 */
export const SSL_MODES = ['disable', 'require', 'verify-ca', 'verify-full']

/** Mode used when a connection asks for TLS without naming one. */
export const DEFAULT_SSL_MODE = 'verify-full'

/** Storage format version; bumped when the registry shape changes. */
const STORE_VERSION = 1

/** Registry file name inside the data directory. */
const STORE_FILE = 'connections.json'

/** Key file name inside the data directory. */
const KEY_FILE = 'key'

/**
 * Resolve the plugin data directory.
 * @returns {string} absolute directory path.
 */
export function dataDir() {
  const home = process.env.DSH_HOME || join(homedir(), '.dsh')
  return join(home, 'dsh-grid')
}

/**
 * Ensure the data directory exists with restrictive permissions.
 * @returns {string} the directory path.
 */
function ensureDataDir() {
  const dir = dataDir()
  mkdirSync(dir, { recursive: true, mode: 0o700 })
  return dir
}

/** Cached registry key so repeated operations do not re-read the file. */
let cachedKey = null

/**
 * Load the registry key, creating it on first use.
 * @returns {Buffer} the 32-byte key.
 */
function registryKey() {
  if (cachedKey) return cachedKey
  const file = join(ensureDataDir(), KEY_FILE)
  if (existsSync(file)) {
    const bytes = readFileSync(file)
    if (bytes.length !== 32) throw new GridError(`the Grid key file is corrupt: ${file}`, 500)
    cachedKey = bytes
    return cachedKey
  }
  const bytes = randomBytes(32)
  writeFileSync(file, bytes, { mode: 0o600 })
  try {
    chmodSync(file, 0o600)
  } catch {
    // Windows ACLs do not map onto POSIX modes; a failure here is not fatal.
  }
  cachedKey = bytes
  return cachedKey
}

/**
 * Seal a password.
 * @param {string} plain - the password.
 * @returns {string} the `v1:`-prefixed sealed value.
 */
export function sealSecret(plain) {
  const value = String(plain ?? '')
  if (!value) return ''
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', registryKey(), iv)
  const ciphertext = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()
  return `v1:${Buffer.concat([iv, tag, ciphertext]).toString('base64url')}`
}

/**
 * Open a sealed password.
 * @param {string} sealed - the stored value.
 * @returns {string} the plain password, or '' when absent or unreadable.
 */
export function openSecret(sealed) {
  const text = String(sealed ?? '')
  if (!text) return ''
  if (!text.startsWith('v1:')) return ''
  try {
    const bytes = Buffer.from(text.slice(3), 'base64url')
    if (bytes.length < 29) return ''
    const iv = bytes.subarray(0, 12)
    const tag = bytes.subarray(12, 28)
    const ciphertext = bytes.subarray(28)
    const decipher = createDecipheriv('aes-256-gcm', registryKey(), iv)
    decipher.setAuthTag(tag)
    return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('utf8')
  } catch {
    // A rotated or damaged key makes old secrets unreadable; report no password
    // rather than failing the whole connection list.
    return ''
  }
}

/**
 * Read the registry from disk.
 * @returns {{ version: number, items: object[] }} the parsed store.
 */
function readStore() {
  const file = join(dataDir(), STORE_FILE)
  if (!existsSync(file)) return { version: STORE_VERSION, items: [] }
  try {
    const parsed = JSON.parse(readFileSync(file, 'utf8'))
    const items = Array.isArray(parsed?.items) ? parsed.items : []
    return { version: STORE_VERSION, items: items.filter((item) => item && typeof item === 'object') }
  } catch {
    // A corrupt registry is preserved next to the new one instead of deleted.
    try {
      renameSync(file, `${file}.corrupt-${Date.now()}`)
    } catch {
      // Ignore: the caller will start from an empty registry either way.
    }
    return { version: STORE_VERSION, items: [] }
  }
}

/**
 * Write the registry atomically.
 * @param {{ version: number, items: object[] }} store - the store to persist.
 * @returns {void}
 */
function writeStore(store) {
  const dir = ensureDataDir()
  const file = join(dir, STORE_FILE)
  const temp = `${file}.tmp-${process.pid}`
  writeFileSync(temp, `${JSON.stringify(store, null, 2)}\n`, { mode: 0o600 })
  renameSync(temp, file)
  try {
    if (statSync(file).mode & 0o077) chmodSync(file, 0o600)
  } catch {
    // Windows: nothing to tighten.
  }
}

/**
 * Trim a string field to a maximum length.
 * @param {unknown} value - raw value.
 * @param {number} max - maximum length.
 * @returns {string} the trimmed string.
 */
function text(value, max) {
  return String(value ?? '').trim().slice(0, max)
}

/**
 * Validate and normalize one connection input.
 *
 * Absent optional fields keep their previous value when `base` is provided,
 * which is what makes partial updates safe.
 * @param {unknown} input - raw connection fields.
 * @param {object} [base] - the existing record for an update.
 * @returns {object} the normalized record (without `secret`).
 */
export function normalizeConnection(input, base = null) {
  const raw = input && typeof input === 'object' ? input : {}
  const engine = ENGINES.includes(raw.engine) ? raw.engine : base?.engine
  if (!ENGINES.includes(engine)) throw new GridError(`unsupported engine: ${String(raw.engine)}`)

  const color = COLORS.includes(raw.color) ? raw.color : base?.color ?? 'none'
  const host = text(raw.host ?? base?.host ?? '', 255)
  const user = text(raw.user ?? base?.user ?? '', 128)
  const database = text(raw.database ?? base?.database ?? '', 128)
  const file = text(raw.file ?? base?.file ?? '', 1024)
  const group = text(raw.group ?? base?.group ?? '', 64)
  // `ssl` is the historical boolean. A record that asks for TLS without naming a
  // mode now gets full certificate verification; `require` is the explicit
  // opt-out for hosts behind a self-signed certificate.
  const legacySsl = raw.ssl === true || (raw.ssl === undefined && base?.ssl === true)
  const requestedMode = SSL_MODES.includes(raw.sslMode)
    ? raw.sslMode
    : SSL_MODES.includes(base?.sslMode)
      ? base.sslMode
      : legacySsl
        ? DEFAULT_SSL_MODE
        : 'disable'
  const sslMode = engine === 'sqlite' ? 'disable' : requestedMode
  const portRaw = raw.port ?? base?.port
  const port = Number.parseInt(String(portRaw ?? DEFAULT_PORTS[engine] ?? 0), 10)
  const redisDb = Number.parseInt(String(raw.redisDb ?? base?.redisDb ?? 0), 10)

  if (engine === 'sqlite') {
    if (!file) throw new GridError('a SQLite connection needs a database file path')
  } else {
    if (!host) throw new GridError('host is required')
    if (!Number.isInteger(port) || port <= 0 || port > 65535) throw new GridError('port must be between 1 and 65535')
  }
  if (engine === 'redis' && (!Number.isInteger(redisDb) || redisDb < 0 || redisDb > 255)) {
    throw new GridError('redis database index must be between 0 and 255')
  }

  const name = text(raw.name ?? base?.name ?? '', 80) ||
    (engine === 'sqlite' ? file.split(/[\\/]/).pop() || 'SQLite' : `${host}:${port}`)

  return {
    id: text(raw.id ?? base?.id ?? '', 64),
    name,
    engine,
    group,
    color,
    host,
    port: engine === 'sqlite' ? 0 : port,
    user,
    database,
    file: engine === 'sqlite' ? file : '',
    redisDb: engine === 'redis' ? redisDb : 0,
    ssl: sslMode !== 'disable',
    sslMode,
    options: sanitizeOptions(raw.options ?? base?.options),
    createdAt: base?.createdAt ?? new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

/**
 * Report whether a mode verifies the server certificate.
 * @param {string} mode - one of `SSL_MODES`.
 * @returns {boolean} true when the certificate chain is checked.
 */
export function verifiesCertificate(mode) {
  return mode === 'verify-ca' || mode === 'verify-full'
}

/**
 * Keep plugin-specific driver options JSON-safe and shallow.
 * @param {unknown} value - candidate options object.
 * @returns {Record<string, unknown>} a shallow, serializable copy.
 */
function sanitizeOptions(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  /** @type {Record<string, unknown>} */
  const out = {}
  for (const [key, entry] of Object.entries(value).slice(0, 32)) {
    if (typeof key !== 'string' || !/^[A-Za-z0-9_.-]{1,64}$/.test(key)) continue
    if (entry === null || ['string', 'number', 'boolean'].includes(typeof entry)) out[key] = entry
  }
  return out
}

/**
 * Produce a new connection id.
 * @returns {string} the id.
 */
function newId() {
  return `c_${randomBytes(9).toString('hex')}`
}

/**
 * Project a stored record for the browser: no ciphertext, only `hasPassword`.
 * @param {object} record - stored record.
 * @returns {object} the public shape.
 */
export function publicConnection(record) {
  return {
    id: record.id,
    name: record.name,
    engine: record.engine,
    group: record.group ?? '',
    color: record.color ?? 'none',
    host: record.host ?? '',
    port: record.port ?? 0,
    user: record.user ?? '',
    database: record.database ?? '',
    file: record.file ?? '',
    redisDb: record.redisDb ?? 0,
    ssl: record.ssl === true,
    sslMode: SSL_MODES.includes(record.sslMode) ? record.sslMode : record.ssl === true ? DEFAULT_SSL_MODE : 'disable',
    hasPassword: Boolean(record.secret),
    createdAt: record.createdAt ?? '',
    updatedAt: record.updatedAt ?? '',
  }
}

/**
 * List every stored connection in creation order.
 * @returns {object[]} public projections.
 */
export function listConnections() {
  return readStore().items.map(publicConnection)
}

/**
 * Read one raw stored record (still carrying its ciphertext).
 * @param {string} id - connection id.
 * @returns {object|undefined} the record.
 */
export function getRecord(id) {
  return readStore().items.find((item) => item.id === String(id ?? ''))
}

/**
 * Read the plain password of one connection.
 * @param {string} id - connection id.
 * @returns {string} the password, or ''.
 */
export function revealPassword(id) {
  const record = getRecord(id)
  return record ? openSecret(record.secret) : ''
}

/**
 * Create a connection.
 * @param {object} input - connection fields, optionally with `password`.
 * @returns {object} the public projection of the new record.
 */
export function createConnection(input) {
  const store = readStore()
  const normalized = normalizeConnection(input)
  normalized.id = newId()
  const record = {
    ...normalized,
    secret: sealSecret(input?.password ?? ''),
  }
  store.items.push(record)
  writeStore(store)
  return publicConnection(record)
}

/**
 * Update a connection, leaving the stored secret untouched unless a new
 * password was supplied.
 * @param {string} id - connection id.
 * @param {object} patch - partial fields.
 * @returns {object} the public projection of the updated record.
 */
export function updateConnection(id, patch) {
  const store = readStore()
  const index = store.items.findIndex((item) => item.id === String(id ?? ''))
  if (index === -1) throw new GridError('connection not found', 404)
  const base = store.items[index]
  const normalized = normalizeConnection({ ...patch, id: base.id }, base)
  const hasPasswordField = patch && Object.prototype.hasOwnProperty.call(patch, 'password')
  const record = {
    ...normalized,
    id: base.id,
    createdAt: base.createdAt,
    secret: hasPasswordField ? sealSecret(patch.password ?? '') : base.secret ?? '',
  }
  store.items[index] = record
  writeStore(store)
  return publicConnection(record)
}

/**
 * Delete a connection.
 * @param {string} id - connection id.
 * @returns {boolean} whether a record was removed.
 */
export function deleteConnection(id) {
  const store = readStore()
  const before = store.items.length
  store.items = store.items.filter((item) => item.id !== String(id ?? ''))
  if (store.items.length === before) return false
  writeStore(store)
  return true
}
