/**
 * The SQLite driver runs its queries on a worker thread.
 *
 * `node:sqlite` is synchronous, so the only way to prove the work really left the
 * main thread is to watch a timer keep ticking while a query runs. The rest of
 * the file covers the parts that are easy to get wrong at the boundary: error
 * status codes, truncation, closing, and the in-process fallback.
 */

import assert from 'node:assert/strict'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { after, before, test } from 'node:test'

import { create } from '../lib/drivers/sqlite.js'

const home = mkdtempSync(join(tmpdir(), 'grid-sqlite-'))
const file = join(home, 'worker.db')

before(async () => {
  const driver = create({ engine: 'sqlite', file })
  await driver.open()
  await driver.exec([
    'CREATE TABLE notes (id INTEGER PRIMARY KEY, body TEXT)',
    "INSERT INTO notes (body) VALUES ('first'), ('second')",
  ])
  await driver.close()
})

after(() => {
  rmSync(home, { recursive: true, force: true })
})

/** A query slow enough to observe, run entirely inside SQLite. */
const SLOW = `WITH RECURSIVE c(x) AS (SELECT 1 UNION ALL SELECT x + 1 FROM c WHERE x < 250000)
              SELECT count(*) AS n FROM c`

test('queries run off the main thread', async () => {
  const driver = create({ engine: 'sqlite', file })
  await driver.open()
  try {
    assert.equal(driver.fallback, null, 'the worker path was taken')
    assert.ok(driver.worker, 'a worker thread is running')

    let ticks = 0
    const timer = setInterval(() => {
      ticks += 1
    }, 1)
    try {
      const result = await driver.exec([SLOW])
      assert.equal(Number(result.results[0].rows[0].n), 250000)
    } finally {
      clearInterval(timer)
    }
    // With the synchronous driver this would be 0: the query would hold the
    // thread for its whole duration.
    assert.ok(ticks > 0, `the main thread kept running (${ticks} ticks)`)
  } finally {
    await driver.close()
  }
})

test('the same query on the in-process path does block the thread', async () => {
  // The positive control for the test above: if this ever starts ticking, the
  // comparison stopped measuring anything.
  const driver = create({ engine: 'sqlite', file })
  driver.startWorker = async () => {
    throw new Error('deliberately in-process')
  }
  await driver.open()
  try {
    assert.ok(driver.fallback, 'running in-process')
    let ticks = 0
    const timer = setInterval(() => {
      ticks += 1
    }, 1)
    try {
      const result = await driver.exec([SLOW])
      assert.equal(Number(result.results[0].rows[0].n), 250000)
    } finally {
      clearInterval(timer)
    }
    assert.equal(ticks, 0, 'a synchronous query owns the thread')
  } finally {
    await driver.close()
  }
})

test('results, errors and status codes survive the thread boundary', async () => {
  const driver = create({ engine: 'sqlite', file })
  await driver.open()
  try {
    const rows = await driver.select({
      database: 'main',
      table: 'notes',
      page: 1,
      pageSize: 10,
      orderBy: 'id',
      orderDir: 'asc',
    })
    assert.equal(rows.total, 2)
    assert.equal(rows.rows[1].body, 'second')

    // A user error keeps its HTTP status instead of becoming an internal one.
    const guarded = await driver
      .update({ database: 'main', table: 'notes', key: {}, changes: { body: 'x' } })
      .then(() => null, (error) => error)
    assert.equal(guarded?.status, 400)

    // And a SQL error comes back as a per-statement error, as before.
    const bad = await driver.exec(['SELECT * FROM nope'])
    assert.match(bad.results[0].error, /no such table/)
  } finally {
    await driver.close()
  }
})

test('closing terminates the worker', async () => {
  const driver = create({ engine: 'sqlite', file })
  await driver.open()
  const worker = driver.worker
  assert.ok(worker)
  await driver.close()
  assert.equal(driver.worker, null)
  // Requests after close fail instead of hanging.
  await assert.rejects(driver.exec(['SELECT 1']), /not running/)
})

test('a worker that cannot start falls back to in-process SQLite', async () => {
  const driver = create({ engine: 'sqlite', file })
  driver.startWorker = async () => {
    throw new Error('worker_threads are unavailable here')
  }
  await driver.open()
  try {
    assert.ok(driver.fallback, 'the in-process path is in use')
    assert.match(driver.fallbackReason, /unavailable/)
    const result = await driver.exec(['SELECT count(*) AS n FROM notes'])
    assert.equal(Number(result.results[0].rows[0].n), 2)
  } finally {
    await driver.close()
  }
})
