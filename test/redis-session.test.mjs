import assert from 'node:assert/strict'
import { test } from 'node:test'
import { RedisDriver } from '../lib/drivers/redis.js'
import { beautifySql } from '../src/client/lib/sql.ts'

test('a raw SELECT cannot make a scoped delete hit another database', async () => {
  const driver = new RedisDriver({ engine: 'redis', redisDb: 0 })
  let actualDb = 0
  const deleted = []
  driver.client = {
    async call(...args) {
      if (String(args[0]).toUpperCase() === 'SELECT') actualDb = Number(args[1])
      return 'OK'
    },
    async select(index) {
      actualDb = index
      return 'OK'
    },
    async del(key) {
      deleted.push({ db: actualDb, key })
      return 1
    },
  }
  await driver.command({ command: 'SELECT 1' })
  const result = await driver.removeKey({ key: 'same-key', database: 0 })
  assert.equal(actualDb, 0, 'the requested database is selected again')
  assert.deepEqual(deleted, [{ db: 0, key: 'same-key' }])
  assert.equal(result.database, 0)
})

test('Beautify keeps the contents of string and quoted identifiers intact', () => {
  const source = "SELECT 'a  b' AS v, \"two  spaces\" FROM t WHERE note = 'line1\nline2'"
  const formatted = beautifySql(source)
  assert.match(formatted, /'a  b'/, 'the double space survived')
  assert.match(formatted, /"two  spaces"/, 'the quoted identifier survived')
  assert.match(formatted, /'line1\nline2'/, 'the newline in the literal survived')
  assert.match(formatted, /\n\s+FROM t/, 'clauses are still split onto lines')
})
