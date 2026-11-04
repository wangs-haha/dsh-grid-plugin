/**
 * Engine registry and lazy driver loading.
 *
 * Only SQLite is part of Node itself. The four network engines resolve their
 * package with a dynamic import so a profile that lacks one still loads the
 * plugin, lists its connections, and reports a precise "install this" message
 * for that engine alone.
 */

/** Public engine catalogue, also served to the browser for the connection form. */
export const ENGINES = [
  {
    id: 'sqlite',
    label: 'SQLite',
    package: null,
    defaultPort: 0,
    kind: 'file',
    fields: ['file'],
    description: 'A local database file. Works with no extra install.',
  },
  {
    id: 'mysql',
    label: 'MySQL / MariaDB',
    package: 'mysql2',
    defaultPort: 3306,
    kind: 'network',
    fields: ['host', 'port', 'user', 'password', 'database'],
    description: 'MySQL 5.7+ and MariaDB 10.x over TCP.',
  },
  {
    id: 'postgres',
    label: 'PostgreSQL',
    package: 'pg',
    defaultPort: 5432,
    kind: 'network',
    fields: ['host', 'port', 'user', 'password', 'database'],
    description: 'PostgreSQL 12+ with database and schema levels.',
  },
  {
    id: 'sqlserver',
    label: 'SQL Server',
    package: 'mssql',
    defaultPort: 1433,
    kind: 'network',
    fields: ['host', 'port', 'user', 'password', 'database'],
    description: 'Microsoft SQL Server 2017+ over TDS.',
  },
  {
    id: 'redis',
    label: 'Redis',
    package: 'ioredis',
    defaultPort: 6379,
    kind: 'network',
    fields: ['host', 'port', 'password', 'redisDb'],
    description: 'Redis 6+ key browser and command console.',
  },
]

/** Lookup table by engine id. */
const BY_ID = new Map(ENGINES.map((engine) => [engine.id, engine]))

/**
 * Read the catalogue entry of one engine.
 * @param {string} id - engine id.
 * @returns {object|undefined} the entry.
 */
export function engineInfo(id) {
  return BY_ID.get(String(id ?? ''))
}

/** Cache of driver availability, keyed by engine id. */
const AVAILABILITY = new Map()

/**
 * Report which engines can open a connection in this process.
 * @returns {Promise<Array<object>>} the catalogue with `available` and `error`.
 */
export async function engineAvailability() {
  const results = []
  for (const engine of ENGINES) {
    if (!engine.package) {
      results.push({ ...engine, available: true })
      continue
    }
    if (AVAILABILITY.has(engine.id)) {
      results.push({ ...engine, ...AVAILABILITY.get(engine.id) })
      continue
    }
    try {
      await import(engine.package)
      const state = { available: true }
      AVAILABILITY.set(engine.id, state)
      results.push({ ...engine, ...state })
    } catch (error) {
      const state = {
        available: false,
        error: `the ${engine.label} driver is not installed (run "pnpm add ${engine.package}" in the plugin directory)`,
        detail: error instanceof Error ? error.message : String(error),
      }
      // Availability is not cached so a freshly installed package is picked up
      // on the next request without restarting the Host.
      results.push({ ...engine, ...state })
    }
  }
  return results
}

/**
 * Build the driver for one connection.
 * @param {object} connection - normalized connection record.
 * @returns {Promise<object>} an unopened driver implementing the engine surface.
 */
export async function createDriver(connection) {
  switch (connection.engine) {
    case 'sqlite':
      return (await import('./sqlite.js')).create(connection)
    case 'mysql':
      return (await import('./mysql.js')).create(connection)
    case 'postgres':
      return (await import('./postgres.js')).create(connection)
    case 'sqlserver':
      return (await import('./sqlserver.js')).create(connection)
    case 'redis':
      return (await import('./redis.js')).create(connection)
    default:
      throw new Error(`unsupported engine: ${String(connection.engine)}`)
  }
}
