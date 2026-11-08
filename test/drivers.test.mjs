/**
 * Driver integration tests.
 *
 * SQLite always runs. MySQL, PostgreSQL and Redis require an explicit
 * GRID_TEST_INTEGRATION=1 opt-in before probing the documented local fixtures.
 * These tests create/drop objects, so availability alone is never consent.
 */

import assert from 'node:assert/strict'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { after, test } from 'node:test'

/** Existing local database fixtures are separate from test-owned loopback servers. */
const integration = process.env.GRID_TEST_INTEGRATION === '1'
const externalDatabase = {
  skip: integration ? false : 'opt-in required: pnpm test:integration (writes disposable local fixtures)',
}

/** Temporary directory holding the SQLite fixture. */
const dir = mkdtempSync(join(tmpdir(), 'grid-driver-'))

after(() => {
  rmSync(dir, { recursive: true, force: true })
})

/**
 * Run the shared table contract against one engine.
 * @param {object} options - engine under test.
 * @param {string} options.label - human label for assertion messages.
 * @param {() => Promise<object>} options.create - builds the driver.
 * @param {object} options.scope - table scope for the engine.
 * @param {string} options.ddl - fixture DDL.
 * @param {(table: string) => string} [options.drop] - cleanup DDL.
 */
async function tableContract({ label, create, scope, ddl, drop }) {
  const driver = await create()
  try {
    await driver.open()
    await driver.exec([...(drop ? [drop(scope.table)] : []), ddl])

    const inserted = await driver.insert({ ...scope, values: { name: 'alpha', amount: 1.5 } })
    assert.equal(inserted.affected, 1, `${label}: insert affects one row`)

    const page = await driver.select({ ...scope, page: 1, pageSize: 100 })
    assert.equal(page.total, 1, `${label}: count sees the inserted row`)
    assert.equal(page.rows[0].name, 'alpha', `${label}: inserted value round-trips`)
    assert.ok(
      page.columns.some((column) => column.name === 'id'),
      `${label}: result columns include id`,
    )

    const key = { id: page.rows[0].id }
    const updated = await driver.update({ ...scope, key, changes: { name: 'beta' } })
    assert.equal(updated.affected, 1, `${label}: update affects one row`)
    const afterUpdate = await driver.select({ ...scope, page: 1, pageSize: 100 })
    assert.equal(afterUpdate.rows[0].name, 'beta', `${label}: update is visible`)

    const description = await driver.describe(scope)
    const names = description.columns.map((column) => column.name)
    assert.deepEqual(names.slice(0, 3), ['id', 'name', 'amount'], `${label}: columns are described in order`)
    assert.equal(description.columns.find((column) => column.name === 'id').primaryKey, true, `${label}: id is the primary key`)
    assert.ok(description.indexes.length >= 1, `${label}: at least one index is reported`)

    const sorted = await driver.select({ ...scope, page: 1, pageSize: 100, orderBy: 'name', orderDir: 'desc' })
    assert.equal(sorted.rows.length, 1, `${label}: ordering by a column works`)

    const removed = await driver.remove({ ...scope, key })
    assert.equal(removed.affected, 1, `${label}: delete affects one row`)
    const empty = await driver.select({ ...scope, page: 1, pageSize: 100 })
    assert.equal(empty.total, 0, `${label}: table is empty after delete`)

    const multi = await driver.exec(['SELECT 1 AS one', 'SELECT 2 AS two'])
    assert.equal(multi.results.length, 2, `${label}: two statements produce two results`)
    assert.equal(multi.results[0].rows[0].one, 1, `${label}: first result is addressable`)

    const failure = await driver.exec(['SELECT * FROM grid_no_such_table'])
    assert.ok(failure.results[0].error, `${label}: a failing statement reports an error instead of throwing`)
    assert.ok(failure.results[0].error.length > 0, `${label}: the error message is non-empty`)
  } finally {
    await driver.close().catch(() => {})
  }
}

/**
 * Try to open a driver, returning false when the server is unreachable.
 * @param {() => Promise<object>} create - driver factory.
 * @returns {Promise<boolean>} whether the server answered.
 */
async function canOpen(create) {
  const driver = await create()
  try {
    await Promise.race([
      driver.open(),
      new Promise((_resolve, reject) => setTimeout(() => reject(new Error('probe timeout')), 15_000)),
    ])
    return true
  } catch {
    return false
  } finally {
    await driver.close().catch(() => {})
  }
}

test('sqlite: full table contract', async () => {
  const { create } = await import('../lib/drivers/sqlite.js')
  const file = join(dir, 'probe.db')
  await tableContract({
    label: 'sqlite',
    create: () => create({ engine: 'sqlite', file }),
    scope: { database: 'main', table: 'grid_probe' },
    ddl: 'CREATE TABLE grid_probe (id INTEGER PRIMARY KEY, name TEXT NOT NULL, amount REAL)',
    drop: () => 'DROP TABLE IF EXISTS grid_probe',
  })
})

test('sqlite: databases and table listing', async () => {
  const { create } = await import('../lib/drivers/sqlite.js')
  const driver = await create({ engine: 'sqlite', file: join(dir, 'listing.db') })
  await driver.open()
  try {
    await driver.exec([
      'CREATE TABLE alpha (id INTEGER PRIMARY KEY)',
      'CREATE VIEW beta_view AS SELECT id FROM alpha',
    ])
    const databases = await driver.databases()
    assert.equal(databases[0].name, 'main')
    const tables = await driver.tables({ database: 'main' })
    assert.deepEqual(tables.map((table) => table.name).sort(), ['alpha', 'beta_view'])
    assert.equal(tables.find((table) => table.name === 'beta_view').kind, 'view')
    for (const table of tables) {
      assert.equal(typeof table.name, 'string')
      assert.ok(table.kind === 'table' || table.kind === 'view', 'the kind is normalized')
      assert.equal(typeof table.comment, 'string', 'every table carries a comment field')
      assert.ok(table.rows === null || typeof table.rows === 'number', 'rows is a number or null')
    }
  } finally {
    await driver.close()
  }
})

test('mysql: full table contract', externalDatabase, async (t) => {
  const { create } = await import('../lib/drivers/mysql.js')
  const options = {
    engine: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'gridpass',
    database: 'gridtest',
  }
  if (!(await canOpen(() => create(options)))) {
    t.skip('no MySQL server on 127.0.0.1:3306')
    return
  }
  await tableContract({
    label: 'mysql',
    create: () => create(options),
    scope: { database: 'gridtest', table: 'grid_probe' },
    ddl: 'CREATE TABLE grid_probe (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(64) NOT NULL, amount DOUBLE)',
    drop: () => 'DROP TABLE IF EXISTS grid_probe',
  })
})

test('postgres: full table contract', externalDatabase, async (t) => {
  const { create } = await import('../lib/drivers/postgres.js')
  const options = {
    engine: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'gridpass',
    database: 'gridtest',
  }
  if (!(await canOpen(() => create(options)))) {
    t.skip('no PostgreSQL server on 127.0.0.1:5432')
    return
  }
  await tableContract({
    label: 'postgres',
    create: () => create(options),
    scope: { schema: 'public', table: 'grid_probe' },
    ddl: 'CREATE TABLE grid_probe (id SERIAL PRIMARY KEY, name TEXT NOT NULL, amount DOUBLE PRECISION)',
    drop: () => 'DROP TABLE IF EXISTS grid_probe',
  })
})

test('postgres: database list carries schemas', externalDatabase, async (t) => {
  const { create } = await import('../lib/drivers/postgres.js')
  const driver = await create({
    engine: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'gridpass',
    database: 'gridtest',
  })
  try {
    await driver.open()
  } catch {
    t.skip('no PostgreSQL server on 127.0.0.1:5432')
    return
  }
  try {
    const databases = await driver.databases()
    assert.ok(databases.some((database) => database.name === 'gridtest'))
    const gridtest = databases.find((database) => database.name === 'gridtest')
    assert.ok(gridtest.schemas.includes('public'), 'public schema is listed')
    const tables = await driver.tables({ schema: 'public' })
    assert.ok(Array.isArray(tables))
  } finally {
    await driver.close()
  }
})

test('redis: scan, inspect and command', externalDatabase, async (t) => {
  const { create } = await import('../lib/drivers/redis.js')
  const driver = create({ engine: 'redis', host: '127.0.0.1', port: 6379, redisDb: 0 })
  try {
    await driver.open()
  } catch {
    t.skip('no Redis server on 127.0.0.1:6379')
    return
  }
  try {
    await driver.command({ command: 'DEL grid:probe:string grid:probe:hash grid:probe:list' })
    const stringReply = await driver.command({ command: 'SET grid:probe:string "hello world"' })
    assert.equal(stringReply.reply, 'OK')

    await driver.command({ command: 'HSET grid:probe:hash field value' })
    await driver.command({ command: 'RPUSH grid:probe:list a b c' })

    const scan = await driver.scan({ pattern: 'grid:probe:*' })
    assert.equal(scan.cursor, '0')
    const keys = scan.keys.map((entry) => entry.key).sort()
    assert.deepEqual(keys, ['grid:probe:hash', 'grid:probe:list', 'grid:probe:string'])
    assert.equal(scan.keys.find((entry) => entry.key === 'grid:probe:hash').type, 'hash')

    const stringView = await driver.inspectKey({ key: 'grid:probe:string' })
    assert.equal(stringView.type, 'string')
    assert.equal(stringView.value, 'hello world')

    const hashView = await driver.inspectKey({ key: 'grid:probe:hash' })
    assert.deepEqual(hashView.value, { field: 'value' })

    const listView = await driver.inspectKey({ key: 'grid:probe:list' })
    assert.deepEqual(listView.value, ['a', 'b', 'c'])
    assert.equal(listView.length, 3)

    const databases = await driver.databases()
    assert.ok(databases.length >= 1)
    assert.equal(databases[0].name, 'db0')

    const deleted = await driver.removeKey({ key: 'grid:probe:string' })
    assert.equal(deleted.deleted, 1)
  } finally {
    await driver.close()
  }
})
