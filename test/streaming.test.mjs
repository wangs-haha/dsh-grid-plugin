/**
 * Streaming row caps for MySQL and SQL Server.
 *
 * Both drivers now read results as they arrive instead of collecting the whole
 * set and slicing it. These tests drive the drivers with fake event emitters, so
 * the cap, the truncation flag and the error path are all exercised without a
 * server — which is the only way to check this here, since `SELECT * FROM huge`
 * is exactly what would blow up a live test anyway.
 */

import assert from 'node:assert/strict'
import { EventEmitter } from 'node:events'
import { test } from 'node:test'

import { MysqlDriver } from '../lib/drivers/mysql.js'
import { SqlServerDriver } from '../lib/drivers/sqlserver.js'

/** Rows are capped at 2000 by the drivers. */
const CAP = 2000

/**
 * A fake core connection whose `query()` returns an emitter the test drives.
 * @param {(emitter: EventEmitter) => void} script - what to emit.
 * @returns {{ query: (statement: string) => EventEmitter }} the fake.
 */
function mysqlCore(script) {
  return {
    query(statement) {
      const emitter = new EventEmitter()
      emitter.statement = statement
      // Emit on a later tick so the driver's listeners are attached first.
      setTimeout(() => script(emitter), 0)
      return emitter
    },
  }
}

/**
 * A fake `mssql` request the test drives.
 * @param {(request: EventEmitter & { stream?: boolean }) => void} script - what to emit.
 * @returns {object} the fake pool.
 */
function mssqlPool(script) {
  return {
    request() {
      const request = new EventEmitter()
      request.query = () => {
        setTimeout(() => script(request), 0)
        return Promise.resolve()
      }
      return request
    },
  }
}

test('MySQL stops reading at the cap and reports truncation', async () => {
  const driver = new MysqlDriver({ engine: 'mysql', host: 'h' })
  driver.client = {
    connection: mysqlCore((emitter) => {
      emitter.emit('fields', [{ name: 'id', type: 3 }, { name: 'score', type: 5 }])
      for (let index = 0; index < CAP + 5; index += 1) emitter.emit('result', { id: index, score: 1.5 })
      emitter.emit('end')
    }),
    query: async () => {
      throw new Error('the promise API should not be used when streaming is available')
    },
  }

  const result = await driver.exec(['SELECT * FROM big'])
  const first = result.results[0]
  assert.equal(result.statementCount, undefined, 'exec returns results only')
  assert.equal(first.rows.length, CAP, 'the read stops at the cap')
  assert.equal(first.truncated, true)
  assert.equal(first.rowCount, CAP)
  assert.deepEqual(first.columns.map((column) => [column.name, column.type]), [
    ['id', 'INT'],
    ['score', 'DOUBLE'],
  ])
  assert.deepEqual(first.rows[0], { id: 0, score: 1.5 })
})

test('MySQL reports an OkPacket when the statement returns no fields', async () => {
  const driver = new MysqlDriver({ engine: 'mysql', host: 'h' })
  driver.client = {
    connection: mysqlCore((emitter) => {
      emitter.emit('result', { affectedRows: 3, insertId: 42 })
      emitter.emit('end')
    }),
  }

  const result = await driver.exec(['INSERT INTO t (a) VALUES (1)'])
  const first = result.results[0]
  assert.equal(first.rows.length, 0)
  assert.equal(first.affected, 3)
  assert.equal(first.lastInsertId, 42)
})

test('a MySQL stream error becomes a per-statement error, not a throw', async () => {
  const driver = new MysqlDriver({ engine: 'mysql', host: 'h' })
  driver.client = {
    connection: mysqlCore((emitter) => {
      emitter.emit('error', new Error('ER_NO_SUCH_TABLE'))
    }),
  }

  const result = await driver.exec(['SELECT * FROM nope'])
  assert.match(result.results[0].error, /ER_NO_SUCH_TABLE/)
})

test('MySQL falls back to the promise API when streaming is unavailable', async () => {
  const driver = new MysqlDriver({ engine: 'mysql', host: 'h' })
  driver.client = {
    // No `.connection`, which is what an older driver build looks like.
    query: async () => [[{ id: 1 }, { id: 2 }, { id: 3 }], [{ name: 'id', type: 3 }]],
  }

  const result = await driver.exec(['SELECT id FROM t'])
  assert.equal(result.results[0].rows.length, 3)
  assert.deepEqual(result.results[0].columns, [{ name: 'id', type: 'INT' }])
})

test('SQL Server streams with the same cap', async () => {
  const driver = new SqlServerDriver({ engine: 'sqlserver', host: 'h' })
  driver.pool = mssqlPool((request) => {
    assert.equal(request.stream, true, 'stream mode is requested')
    request.emit('recordset', { id: { type: { declaration: 'int' } } })
    for (let index = 0; index < CAP + 3; index += 1) request.emit('row', { id: index })
    request.emit('done')
  })

  const result = await driver.exec(['SELECT * FROM big'])
  const first = result.results[0]
  assert.equal(first.rows.length, CAP)
  assert.equal(first.truncated, true)
  assert.deepEqual(first.columns, [{ name: 'id', type: 'int' }])
  assert.equal(driver.active, null, 'the active request is cleared')
})

test('SQL Server reports affected rows for a statement without a recordset', async () => {
  const driver = new SqlServerDriver({ engine: 'sqlserver', host: 'h' })
  driver.pool = mssqlPool((request) => {
    request.emit('rowsaffected', 7)
    request.emit('done')
  })

  const result = await driver.exec(['UPDATE t SET a = 1'])
  assert.equal(result.results[0].affected, 7)
  assert.equal(result.results[0].rows.length, 0)
})

test('a SQL Server stream error becomes a per-statement error', async () => {
  const driver = new SqlServerDriver({ engine: 'sqlserver', host: 'h' })
  driver.pool = mssqlPool((request) => {
    request.emit('error', new Error('Invalid object name'))
  })

  const result = await driver.exec(['SELECT * FROM nope'])
  assert.match(result.results[0].error, /Invalid object name/)
  assert.equal(driver.active, null)
})
