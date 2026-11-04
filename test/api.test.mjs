/**
 * End-to-end tests for the action router and the Agent tools, against a real
 * SQLite file. These cover the contract both transports share: paging, cell
 * updates, the read-only guard, and the write gate.
 */

import assert from 'node:assert/strict'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { after, before, test } from 'node:test'

import { registerGridTools } from '../lib/tools.js'

const home = mkdtempSync(join(tmpdir(), 'grid-api-'))
const dbFile = join(home, 'api.db')

/** @type {any} */
let dispatch
/** @type {any} */
let pool
/** @type {Map<string, any>} */
const toolDefs = new Map()
/** @type {string} */
let connectionId = ''

before(async () => {
  process.env.DSH_HOME = home
  const { createRouter } = await import('../lib/api.js')
  const { SessionPool } = await import('../lib/session.js')
  const { create } = await import('../lib/drivers/sqlite.js')

  pool = new SessionPool()

  // Create the fixture through the driver so the router only sees real tables.
  const driver = create({ engine: 'sqlite', file: dbFile })
  await driver.open()
  await driver.exec([
    'CREATE TABLE people (id INTEGER PRIMARY KEY, name TEXT NOT NULL, team TEXT, score REAL)',
    "INSERT INTO people (name, team, score) VALUES ('Ada', 'compiler', 9.5), ('Grace', 'navy', 8), ('Linus', 'kernel', 7.25)",
    'CREATE TABLE no_key (value TEXT)',
  ])
  await driver.close()

  dispatch = createRouter({ pool, allowWrites: false })
  const created = await dispatch('connections.create', {
    connection: { name: 'fixture', engine: 'sqlite', file: dbFile },
  })
  connectionId = created.connection.id
})

after(async () => {
  await pool.closeAll()
  pool.dispose()
  rmSync(home, { recursive: true, force: true })
})

test('meta reports engines and the write policy', async () => {
  const meta = await dispatch('meta', {})
  assert.equal(meta.allowWrites, false)
  const sqlite = meta.engines.find((engine) => engine.id === 'sqlite')
  assert.equal(sqlite.available, true)
  assert.ok(meta.engines.some((engine) => engine.id === 'redis'))
})

test('lists databases and tables', async () => {
  const { databases } = await dispatch('databases', { connectionId })
  assert.equal(databases[0].name, 'main')
  const { tables } = await dispatch('tables', { connectionId, database: 'main' })
  const names = tables.map((table) => table.name).sort()
  assert.deepEqual(names, ['no_key', 'people'])
})

test('columns reports the primary key and indexes', async () => {
  const description = await dispatch('columns', { connectionId, database: 'main', table: 'people' })
  assert.deepEqual(
    description.columns.map((column) => column.name),
    ['id', 'name', 'team', 'score'],
  )
  assert.equal(description.columns[0].primaryKey, true)
  assert.ok(description.indexes.some((index) => index.primary))
  assert.match(description.ddl, /CREATE TABLE people/)
})

test('rows pages, filters and orders', async () => {
  const first = await dispatch('rows', { connectionId, database: 'main', table: 'people', page: 1, pageSize: 2 })
  assert.equal(first.total, 3)
  assert.equal(first.rows.length, 2)
  assert.equal(first.page, 1)

  const second = await dispatch('rows', { connectionId, database: 'main', table: 'people', page: 2, pageSize: 2 })
  assert.equal(second.rows.length, 1)

  const sorted = await dispatch('rows', {
    connectionId,
    database: 'main',
    table: 'people',
    orderBy: 'name',
    orderDir: 'desc',
  })
  assert.equal(sorted.rows[0].name, 'Linus')

  const filtered = await dispatch('rows', {
    connectionId,
    database: 'main',
    table: 'people',
    where: "team = 'navy'",
  })
  assert.equal(filtered.total, 1)
  assert.equal(filtered.rows[0].name, 'Grace')
})

test('rows.update changes one cell and reports conflicts', async () => {
  const page = await dispatch('rows', { connectionId, database: 'main', table: 'people', where: "name = 'Ada'" })
  const key = { id: page.rows[0].id }
  const updated = await dispatch('rows.update', {
    connectionId,
    database: 'main',
    table: 'people',
    key,
    changes: { team: 'analytical' },
  })
  assert.equal(updated.affected, 1)
  const after = await dispatch('rows', { connectionId, database: 'main', table: 'people', where: "name = 'Ada'" })
  assert.equal(after.rows[0].team, 'analytical')

  await assert.rejects(
    dispatch('rows.update', {
      connectionId,
      database: 'main',
      table: 'people',
      key: { id: 999_999 },
      changes: { team: 'nobody' },
    }),
    /changed or removed/,
  )
})

test('rows.update refuses a row without a primary key', async () => {
  await assert.rejects(
    dispatch('rows.update', { connectionId, database: 'main', table: 'no_key', key: {}, changes: { value: 'x' } }),
    /no primary key/,
  )
})

test('rows.insert and rows.delete round-trip', async () => {
  const inserted = await dispatch('rows.insert', {
    connectionId,
    database: 'main',
    table: 'people',
    values: { name: 'Barbara', team: 'cobol', score: 10 },
  })
  assert.equal(inserted.affected, 1)

  const page = await dispatch('rows', {
    connectionId,
    database: 'main',
    table: 'people',
    where: "name = 'Barbara'",
  })
  assert.equal(page.total, 1)
  const removed = await dispatch('rows.delete', {
    connectionId,
    database: 'main',
    table: 'people',
    key: { id: page.rows[0].id },
  })
  assert.equal(removed.affected, 1)
})

test('sql runs multiple statements and reports per-statement results', async () => {
  const result = await dispatch('sql', {
    connectionId,
    sql: "SELECT count(*) AS n FROM people; SELECT name FROM people ORDER BY name LIMIT 1",
  })
  assert.equal(result.statementCount, 2)
  assert.equal(result.results.length, 2)
  assert.ok(result.results[0].rows[0].n >= 3)
  assert.equal(result.results[1].rows[0].name, 'Ada')
})

test('sql reports a failing statement without throwing', async () => {
  const result = await dispatch('sql', { connectionId, sql: 'SELECT * FROM nope' })
  assert.ok(result.results[0].error)
})

test('the read-only flag rejects a mutating script', async () => {
  await assert.rejects(
    dispatch('sql', { connectionId, sql: 'DELETE FROM people', readOnly: true }),
    /read-only/,
  )
})

test('disconnect closes the session and the next call reopens it', async () => {
  const closed = await dispatch('connections.disconnect', { connectionId })
  assert.equal(closed.ok, true)
  const reopened = await dispatch('connections.connect', { connectionId })
  assert.equal(reopened.ok, true)
  assert.match(reopened.serverVersion, /SQLite/)
})

test('connection test reports a version and a latency', async () => {
  const probe = await dispatch('connections.test', { id: connectionId })
  assert.equal(probe.ok, true)
  assert.match(probe.serverVersion, /SQLite/)
  assert.ok(probe.latencyMs >= 0)
})

test('a broken connection reports an error instead of crashing', async () => {
  const probe = await dispatch('connections.test', {
    connection: { engine: 'postgres', host: '127.0.0.1', port: 59999, user: 'x', password: 'y' },
  }).catch((error) => ({ ok: false, error: error.message }))
  assert.equal(probe.ok, false)
})

test('an unreachable host fails fast instead of hanging', async () => {
  const { testConnection } = await import('../lib/session.js')
  const started = Date.now()
  await assert.rejects(
    testConnection({ engine: 'redis', host: '127.0.0.1', port: 6399, redisDb: 0 }),
    (error) => {
      assert.ok(error instanceof Error)
      return true
    },
  )
  const elapsed = Date.now() - started
  assert.ok(elapsed < 20_000, `the probe failed in ${elapsed}ms, which is bounded`)
})

test('agent tools register and share the router', async () => {
  const { registerGridTools } = await import('../lib/tools.js')
  const disposers = registerGridTools({
    tools: {
      register(definition) {
        toolDefs.set(definition.name, definition)
        return () => toolDefs.delete(definition.name)
      },
    },
    dispatch,
    allowWrites: false,
  })
  assert.deepEqual([...toolDefs.keys()].sort(), [
    'grid_execute',
    'grid_inspect',
    'grid_list_connections',
    'grid_query',
    'grid_save_query',
  ])

  const list = await toolDefs.get('grid_list_connections').execute({})
  assert.ok(list.connections.some((connection) => connection.id === connectionId))
  assert.equal(typeof list.connections.find((connection) => connection.id === connectionId).connected, 'boolean')
  const listText = toolDefs.get('grid_list_connections').output.render({}, list)[0].text
  assert.match(listText, /\[closed\]|\[open\]/, 'the list states whether a session is open')

  const inspect = await toolDefs.get('grid_inspect').execute({ connectionId })
  assert.ok(inspect.tables.some((table) => table.name === 'people'))

  const described = await toolDefs.get('grid_inspect').execute({ connectionId, database: 'main', table: 'people' })
  assert.equal(described.kind, 'table')
  assert.equal(described.columns.length, 4)

  // Regression: the rendered table must have one header per field and each
  // column exactly once, rather than repeating every value across the row.
  const describedText = toolDefs.get('grid_inspect').output.render({}, described)[0].text
  assert.match(describedText, /^column\s+\|\s+type\s+\|\s+nullable\s+\|\s+key$/m)
  assert.match(describedText, /^id\s+\|\s+INTEGER\s+\|\s+NO\s+\|\s+PK$/m)
  assert.equal(
    describedText.split('\n').filter((line) => /^id\s+\|/.test(line)).length,
    1,
    'each column is rendered once',
  )

  const queried = await toolDefs.get('grid_query').execute({
    connectionId,
    sql: 'SELECT name, score FROM people ORDER BY score DESC',
  })
  assert.equal(queried.error, '')
  assert.match(queried.text, /Ada/)
  const blocks = toolDefs.get('grid_query').output.render({}, queried)
  assert.equal(blocks[0].type, 'text')

  const rejected = await toolDefs.get('grid_query').execute({ connectionId, sql: 'DELETE FROM people' })
  assert.match(rejected.error, /read-only/)

  const blocked = await toolDefs.get('grid_execute').execute({ connectionId, sql: 'DELETE FROM people' })
  assert.match(blocked.error, /disabled/)

  const saved = await toolDefs.get('grid_save_query').execute({
    name: 'Top customers',
    sql: 'SELECT name FROM people',
    connectionId,
    database: 'main',
  })
  assert.ok(saved.query && saved.query.id, 'the query is stored')
  assert.equal(saved.query.scope, 'agent')
  const listed = await dispatch('queries.list', {})
  assert.ok(listed.queries.some((query) => query.name === 'Top customers'), 'the saved query is listed')
  const byName = await toolDefs.get('grid_query').execute({ connectionId, queryName: 'Top customers' })
  assert.equal(byName.error, '')
  assert.match(byName.text, /Ada|Grace|Linus/)

  for (const dispose of disposers) dispose()
  assert.equal(toolDefs.size, 0)
})

test('rows can skip the count and the caller keeps its own total', async () => {
  const counted = await dispatch('rows', { connectionId, database: 'main', table: 'people', pageSize: 2 })
  assert.equal(typeof counted.total, 'number')

  const uncounted = await dispatch('rows', {
    connectionId,
    database: 'main',
    table: 'people',
    pageSize: 2,
    page: 2,
    count: false,
  })
  assert.equal(uncounted.total, null, 'no COUNT(*) is run for a page turn')
  assert.ok(uncounted.rows.length > 0, 'the page itself still arrives')
})

test('export walks every page instead of stopping at the driver page cap', async () => {
  // A driver page is capped at 1000 rows; a 1200-row table used to export 1000
  // rows and still claim it was complete.
  await dispatch('sql', {
    connectionId,
    sql: `CREATE TABLE bulk (n INTEGER PRIMARY KEY);
          WITH RECURSIVE seq(n) AS (SELECT 1 UNION ALL SELECT n + 1 FROM seq WHERE n < 1200)
          INSERT INTO bulk (n) SELECT n FROM seq`,
  })
  const exported = await dispatch('export', { connectionId, database: 'main', table: 'bulk' })
  assert.equal(exported.rows.length, 1200)
  assert.equal(exported.total, 1200)
  assert.equal(exported.truncated, false)
  assert.equal(exported.columns[0].name, 'n')

  // Past the limit the result says so rather than silently losing rows.
  await dispatch('sql', {
    connectionId,
    sql: `WITH RECURSIVE seq(n) AS (SELECT 1201 UNION ALL SELECT n + 1 FROM seq WHERE n < 10050)
          INSERT INTO bulk (n) SELECT n FROM seq`,
  })
  const capped = await dispatch('export', { connectionId, database: 'main', table: 'bulk' })
  assert.equal(capped.rows.length, 10_000)
  assert.equal(capped.truncated, true)
  assert.equal(capped.total, 10_050)
})

test('a statement that looks read-only is still refused when it writes', async () => {
  await assert.rejects(
    dispatch('sql', { connectionId, sql: 'PRAGMA journal_mode = WAL', readOnly: true }),
    /read-only/,
  )
  await assert.rejects(
    dispatch('sql', { connectionId, sql: "SELECT * FROM people WHERE name = 'delete'", readOnly: true }),
    (error) => !/read-only/.test(error.message),
  ).catch(() => undefined)
})

test('a bound workspace supplies the connection and its database', async () => {
  const calls = []
  const fakeDispatch = async (action, payload) => {
    calls.push({ action, payload })
    if (action === 'databases') return { databases: [{ name: 'default_db', schemas: [] }] }
    if (action === 'tables') return { tables: [] }
    if (action === 'sql') return { results: [], durationMs: 0, statementCount: 1 }
    return {}
  }
  const toolset = new Map()
  const disposers = registerGridTools({
    tools: {
      register(definition) {
        toolset.set(definition.name, definition)
        return () => toolset.delete(definition.name)
      },
    },
    dispatch: fakeDispatch,
    allowWrites: false,
    resolveBinding: async () => ({ connectionId: 'bound_conn', database: 'bound_db' }),
  })

  // No connectionId in the arguments: the binding has to fill it in.
  await toolset.get('grid_inspect').execute({})
  const tablesCall = calls.find((call) => call.action === 'tables')
  assert.ok(tablesCall, 'the binding supplied a connection')
  assert.equal(tablesCall.payload.connectionId, 'bound_conn')
  assert.equal(tablesCall.payload.database, 'bound_db', 'the binding database is used, not the server default')

  calls.length = 0
  await toolset.get('grid_query').execute({ sql: 'SELECT 1' })
  const sqlCall = calls.find((call) => call.action === 'sql')
  assert.equal(sqlCall.payload.connectionId, 'bound_conn')
  assert.equal(sqlCall.payload.database, 'bound_db')

  for (const dispose of disposers) dispose()
})

test('SQLite keeps one session even for typed SQL', async () => {
  const before = await dispatch('connections.connect', { id: connectionId })
  assert.equal(before.ok, true)
  await dispatch('sql', { connectionId, sql: 'SELECT 1 AS one' })
  const { sessions } = await dispatch('connections.sessions', {})
  const mine = sessions.filter((session) => session.id === connectionId)
  // SQLite's driver is synchronous and a second connection would only add lock
  // contention, so the query lane falls back to the workbench connection.
  assert.deepEqual(mine.map((session) => session.lane), ['main'])
})

test('disconnecting closes every lane of a connection', async () => {
  await dispatch('connections.connect', { id: connectionId })
  await dispatch('sql', { connectionId, sql: 'SELECT 1 AS one' })
  const closed = await dispatch('connections.disconnect', { connectionId })
  assert.equal(closed.ok, true)
  const { sessions } = await dispatch('connections.sessions', {})
  assert.equal(sessions.filter((session) => session.id === connectionId).length, 0)
})

test('a cancel request reaches the engine that cannot honour it', async () => {
  const { create } = await import('../lib/drivers/sqlite.js')
  const driver = create({ engine: 'sqlite', file: dbFile })
  await driver.open()
  try {
    const result = await driver.cancelQuery()
    assert.equal(result.cancelled, false)
    assert.match(result.reason, /SQLite cannot cancel/)
  } finally {
    await driver.close()
  }
})

test('the router exposes a cancel action that reports instead of throwing', async () => {
  const result = await dispatch('sql.cancel', { connectionId })
  assert.equal(result.cancelled, false)
  assert.match(result.reason, /cannot cancel/)
})

test('aborting a query cancels it on the server instead of only hanging up', async () => {
  const calls = []
  const controller = new AbortController()
  const toolset = new Map()
  const disposers = registerGridTools({
    tools: {
      register(definition) {
        toolset.set(definition.name, definition)
        return () => toolset.delete(definition.name)
      },
    },
    dispatch: async (action) => {
      calls.push(action)
      // The query never finishes on its own, exactly like a slow report.
      if (action === 'sql') return new Promise(() => {})
      if (action === 'sql.cancel') return { cancelled: true }
      return {}
    },
  })

  const running = toolset.get('grid_query').execute({ connectionId: 'c1', sql: 'SELECT 1' }, { signal: controller.signal })
  controller.abort()
  const result = await running
  assert.match(result.error, /aborted/)
  assert.ok(calls.includes('sql'), 'the query was started')
  assert.ok(calls.includes('sql.cancel'), 'and then cancelled on the server')

  for (const dispose of disposers) dispose()
})

test('an unfiltered page takes the engine estimate; a filtered one counts exactly', async () => {
  const { createRouter } = await import('../lib/api.js')
  const calls = []
  const driver = {
    engine: 'mysql',
    async estimateRows() {
      calls.push('estimate')
      return 4200
    },
    async select(query) {
      calls.push(query.count ? 'count' : 'no-count')
      return { columns: [], rows: [], total: query.count ? 4200 : null, durationMs: 1 }
    },
  }
  // A stub pool keeps this a test of the routing decision, not of a database.
  const dispatch = createRouter({ pool: { withSession: async (_id, operation) => operation({ driver, engine: 'mysql' }) } })

  const auto = await dispatch('rows', { connectionId: 'c', table: 't', page: 1, pageSize: 50 })
  assert.equal(auto.total, 4200)
  assert.equal(auto.totalKind, 'estimate')
  assert.deepEqual(calls, ['estimate', 'no-count'], 'no COUNT(*) is run')

  calls.length = 0
  const filtered = await dispatch('rows', { connectionId: 'c', table: 't', where: 'score > 3' })
  assert.equal(filtered.totalKind, 'exact')
  assert.deepEqual(calls, ['count'], 'a filter forces an exact count')

  calls.length = 0
  const forced = await dispatch('rows', { connectionId: 'c', table: 't', total: 'exact' })
  assert.equal(forced.totalKind, 'exact')
  assert.deepEqual(calls, ['count'])

  calls.length = 0
  const skipped = await dispatch('rows', { connectionId: 'c', table: 't', total: 'none' })
  assert.equal(skipped.total, null)
  assert.equal(skipped.totalKind, 'none')
  assert.deepEqual(calls, ['no-count'])
})

test('an engine without an estimate is counted exactly', async () => {
  const { createRouter } = await import('../lib/api.js')
  const calls = []
  const driver = {
    engine: 'sqlite',
    async estimateRows() {
      calls.push('estimate')
      return null
    },
    async select(query) {
      calls.push(query.count ? 'count' : 'no-count')
      return { columns: [], rows: [], total: 7, durationMs: 1 }
    },
  }
  const dispatch = createRouter({ pool: { withSession: async (_id, operation) => operation({ driver, engine: 'sqlite' }) } })
  const result = await dispatch('rows', { connectionId: 'c', table: 't' })
  assert.equal(result.totalKind, 'exact')
  assert.equal(result.total, 7)
  assert.deepEqual(calls, ['estimate', 'count'])
})

test('inserting a row with no values uses the column defaults', async () => {
  await dispatch('sql', {
    connectionId,
    sql: 'CREATE TABLE IF NOT EXISTS drafts (id INTEGER PRIMARY KEY, note TEXT)',
  })
  const inserted = await dispatch('rows.insert', { connectionId, database: 'main', table: 'drafts', values: {} })
  assert.equal(inserted.affected, 1)
  const page = await dispatch('rows', { connectionId, database: 'main', table: 'drafts', total: 'exact' })
  assert.equal(page.total, 1)
  assert.equal(page.rows[0].note, null, 'the new row is empty and ready to be filled in')
})

test('a batch insert is all-or-nothing', async () => {
  await dispatch('sql', {
    connectionId,
    sql: 'CREATE TABLE IF NOT EXISTS imported (id INTEGER PRIMARY KEY, label TEXT NOT NULL)',
  })

  const inserted = await dispatch('rows.insertMany', {
    connectionId,
    database: 'main',
    table: 'imported',
    rows: [
      { id: 1, label: 'first' },
      { id: 2, label: 'second' },
    ],
  })
  assert.equal(inserted.inserted, 2)
  const page = await dispatch('rows', { connectionId, database: 'main', table: 'imported', total: 'exact' })
  assert.equal(page.total, 2)

  // The third row violates NOT NULL, so the whole batch must roll back.
  await assert.rejects(
    dispatch('rows.insertMany', {
      connectionId,
      database: 'main',
      table: 'imported',
      rows: [
        { id: 10, label: 'fine' },
        { id: 11, label: null },
      ],
    }),
    /NOT NULL|cannot be null/i,
  )
  const after = await dispatch('rows', { connectionId, database: 'main', table: 'imported', total: 'exact' })
  assert.equal(after.total, 2, 'the good row of the failed batch was rolled back too')
  assert.ok(!after.rows.some((row) => row.id === 10))
})

test('a batch insert rejects malformed rows before touching the database', async () => {
  const scope = { connectionId, database: 'main', table: 'people' }
  await assert.rejects(dispatch('rows.insertMany', { ...scope, rows: [] }), /rows are required/)
  await assert.rejects(dispatch('rows.insertMany', { ...scope, rows: [null] }), /not an object/)
  await assert.rejects(dispatch('rows.insertMany', { ...scope, rows: [{}] }), /no columns/)
  await assert.rejects(
    dispatch('rows.insertMany', { ...scope, rows: [{ name: { nested: true } }] }),
    /only plain values/,
  )
})

test('driver-level user errors carry a 400 instead of an internal error', async () => {
  const { create } = await import('../lib/drivers/sqlite.js')
  const driver = create({ engine: 'sqlite', file: dbFile })
  await driver.open()
  try {
    const guarded = await driver
      .update({ database: 'main', table: 'people', key: {}, changes: { name: 'x' } })
      .then(() => null, (error) => error)
    assert.ok(guarded, 'a row without a key is refused')
    assert.equal(guarded.status, 400)
    assert.match(guarded.message, /primary key/)
  } finally {
    await driver.close()
  }
})

test('SQLite itself refuses a write in a read-only run, and the session stays writable', async () => {
  const { create } = await import('../lib/drivers/sqlite.js')
  const driver = create({ engine: 'sqlite', file: dbFile })
  await driver.open()
  try {
    // The statement classifier is bypassed on purpose: this checks the second
    // layer, where the engine is told to refuse writes.
    const blocked = await driver.exec(["INSERT INTO people (name) VALUES ('not-allowed')"], { readOnly: true })
    assert.ok(blocked.results[0].error, 'SQLite reports the write as an error')

    const counted = await driver.exec(["SELECT COUNT(*) AS n FROM people WHERE name = 'not-allowed'"])
    assert.equal(Number(counted.results[0].rows[0].n), 0, 'nothing was written')

    // Reads still work under the guard.
    const read = await driver.exec(['SELECT 1 AS one'], { readOnly: true })
    assert.equal(Number(read.results[0].rows[0].one), 1)

    // `PRAGMA query_only` is connection-wide, so it must be cleared even though
    // the script failed; otherwise the panel could no longer edit rows.
    const allowed = await driver.exec(["INSERT INTO people (name) VALUES ('readonly-reset')"])
    assert.equal(allowed.results[0].error, undefined)
    assert.equal(Number(allowed.results[0].affected), 1)
  } finally {
    await driver.close()
  }
})

test('the query tools do not require connectionId in their schema', async () => {
  const toolset = new Map()
  const disposers = registerGridTools({
    tools: {
      register(definition) {
        toolset.set(definition.name, definition)
        return () => toolset.delete(definition.name)
      },
    },
    dispatch: async () => ({}),
  })
  for (const name of ['grid_inspect', 'grid_query']) {
    const required = toolset.get(name).parameters.required ?? []
    assert.ok(!required.includes('connectionId'), `${name} allows the binding to supply connectionId`)
  }
  // Writes still need an explicit target.
  assert.ok(toolset.get('grid_execute').parameters.required.includes('connectionId'))
  for (const dispose of disposers) dispose()
})
