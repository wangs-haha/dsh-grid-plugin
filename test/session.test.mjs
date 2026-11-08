/**
 * Unit tests for the session pool's lane routing.
 *
 * No database is involved: the pool's record lookup and session opener are
 * replaced with stubs, so the decisions (which lane, when to reuse, what to
 * close) can be asserted directly.
 */

import assert from 'node:assert/strict'
import { test } from 'node:test'

import { SessionPool } from '../lib/session.js'

/**
 * Build a pool whose connections and sessions are stubs.
 * @param {string} engine - engine reported for the connection.
 * @returns {{ pool: SessionPool, opened: string[], closed: string[] }} the harness.
 */
function harness(engine) {
  const pool = new SessionPool({ idleMs: 60_000 })
  /** @type {string[]} */
  const opened = []
  /** @type {string[]} */
  const closed = []
  pool.resolveRecord = () => ({ id: 'c1', engine, host: 'h', options: {} })
  pool.openSession = async (id, lane, record) => {
    opened.push(lane)
    const session = {
      id,
      lane,
      engine,
      connection: record ?? { engine },
      driver: { close: async () => closed.push(lane) },
      version: `${engine} test`,
      openedAt: Date.now(),
      lastUsed: Date.now(),
    }
    pool.sessions.set(SessionPool.keyOf(id, lane), session)
    return session
  }
  return { pool, opened, closed }
}

test('typed SQL gets its own connection on engines that can use one', async () => {
  const { pool, opened } = harness('mysql')
  try {
    const first = await pool.acquire('c1', 'query')
    assert.equal(first.lane, 'query')
    assert.deepEqual(opened, ['query'])

    // The tree keeps its own lane, and each lane is reused rather than reopened.
    const main = await pool.acquire('c1', 'main')
    assert.equal(main.lane, 'main')
    assert.deepEqual(opened, ['query', 'main'])
    assert.equal(await pool.acquire('c1', 'query'), first)
    assert.deepEqual(opened, ['query', 'main'])
  } finally {
    pool.dispose()
  }
})

test('SQLite and SQL Server stay on one lane', async () => {
  for (const engine of ['sqlite', 'sqlserver']) {
    const { pool, opened } = harness(engine)
    try {
      const session = await pool.acquire('c1', 'query')
      assert.equal(session.lane, 'main', `${engine} has no second connection to give`)
      assert.deepEqual(opened, ['main'])
      // A later main-lane request reuses the same session.
      assert.equal(await pool.acquire('c1', 'main'), session)
      assert.deepEqual(opened, ['main'])
    } finally {
      pool.dispose()
    }
  }
})

test('closing a connection closes every lane and lists both', async () => {
  const { pool, closed } = harness('postgres')
  try {
    await pool.acquire('c1', 'main')
    await pool.acquire('c1', 'query')
    const listed = pool.listOpen()
    assert.equal(listed.length, 2)
    assert.deepEqual(listed.map((entry) => entry.lane).sort(), ['main', 'query'])

    assert.equal(await pool.close('c1'), true)
    assert.deepEqual(closed.sort(), ['main', 'query'])
    assert.equal(pool.listOpen().length, 0)
    assert.equal(await pool.close('c1'), false, 'already closed')
  } finally {
    pool.dispose()
  }
})

test('the reaper closes idle lanes independently', async () => {
  const { pool, closed } = harness('postgres')
  try {
    const main = await pool.acquire('c1', 'main')
    await pool.acquire('c1', 'query')
    // Only the main lane looks abandoned; the query lane was just used.
    main.lastUsed = Date.now() - 120_000
    const removed = await pool.reap()
    assert.equal(removed, 1)
    assert.deepEqual(closed, ['main'])
    assert.deepEqual(pool.listOpen().map((entry) => entry.lane), ['query'])
  } finally {
    pool.dispose()
  }
})

test('a cancelled statement is not retried', async () => {
  const { pool } = harness('mysql')
  try {
    const session = await pool.acquire('c1', 'query')
    session.driver.cancelled = true
    let attempts = 0
    await assert.rejects(
      pool.withSession(
        'c1',
        async () => {
          attempts += 1
          throw new Error('Connection lost: The server closed the connection.')
        },
        { lane: 'query' },
      ),
      /Connection lost/,
    )
    assert.equal(attempts, 1, 'the query was not replayed')
    assert.equal(session.driver.cancelled, false, 'the flag is cleared for the next request')
  } finally {
    pool.dispose()
  }
})
test('a handshake that finishes after close is not registered', async () => {
  let release
  const gate = new Promise((resolve) => { release = resolve })
  let closed = 0
  const pool = new SessionPool({
    createDriver: async () => ({
      async open() {
        await gate
        return 'test'
      },
      async close() {
        closed += 1
      },
    }),
  })
  pool.resolveRecord = () => ({ id: 'c1', engine: 'postgres' })
  try {
    const opening = pool.acquire('c1', 'main')
    const closing = pool.close('c1')
    release()
    await closing
    await assert.rejects(opening, /closed while it was opening/)
    assert.equal(pool.peek('c1', 'main'), undefined, 'the stale session is not in the pool')
    assert.equal(closed, 1, 'its driver was closed')
  } finally {
    pool.dispose()
    await pool.closeAll()
  }
})

test('queued work stays serial across a reconnect', async () => {
  let generation = 0
  let active = 0
  let maxActive = 0
  const pool = new SessionPool({
    createDriver: async () => {
      generation += 1
      const opened = generation
      return {
        async open() {
          return 'test'
        },
        async close() {},
        async exec(label) {
          active += 1
          maxActive = Math.max(maxActive, active)
          try {
            await new Promise((resolve) => setTimeout(resolve, 1))
            if (label === 'first' && opened === 1) throw new Error('Connection lost')
            return label
          } finally {
            active -= 1
          }
        },
      }
    },
  })
  pool.resolveRecord = () => ({ id: 'c1', engine: 'postgres' })
  try {
    const results = await Promise.all([
      pool.withSession('c1', (session) => session.driver.exec('first'), { lane: 'query' }),
      pool.withSession('c1', (session) => session.driver.exec('second'), { lane: 'query' }),
    ])
    assert.deepEqual(results, ['first', 'second'])
    assert.equal(maxActive, 1, 'the reconnect did not let two requests overlap')
  } finally {
    pool.dispose()
    await pool.closeAll()
  }
})
