/**
 * Unit tests for the dialect helpers: statement splitting must not be fooled by
 * quotes or comments, and identifier/pagination rendering must match each
 * engine's syntax.
 */

import assert from 'node:assert/strict'
import { test } from 'node:test'

import {
  isReadOnly,
  leadingVerb,
  limitClause,
  maskLiterals,
  orderByClause,
  qualify,
  quoteIdent,
  splitStatements,
  toJsonValue,
} from '../lib/query.js'

test('splits plain statements and drops empties', () => {
  assert.deepEqual(splitStatements('SELECT 1; SELECT 2;'), ['SELECT 1', 'SELECT 2'])
  assert.deepEqual(splitStatements('  ;;  '), [])
  assert.deepEqual(splitStatements(''), [])
})

test('does not split inside single or double quotes', () => {
  assert.deepEqual(splitStatements("SELECT ';' AS a; SELECT 2"), ["SELECT ';' AS a", 'SELECT 2'])
  assert.deepEqual(splitStatements('SELECT "a;b" FROM t'), ['SELECT "a;b" FROM t'])
  assert.deepEqual(splitStatements("SELECT 'it''s; fine'"), ["SELECT 'it''s; fine'"])
  assert.deepEqual(splitStatements("SELECT 'a\\';b'"), ["SELECT 'a\\';b'"])
})

test('does not split inside backtick identifiers', () => {
  assert.deepEqual(splitStatements('SELECT `a;b` FROM t; SELECT 2'), ['SELECT `a;b` FROM t', 'SELECT 2'])
})

test('does not split inside comments', () => {
  assert.deepEqual(splitStatements('SELECT 1 -- ; not a split\n; SELECT 2'), [
    'SELECT 1 -- ; not a split',
    'SELECT 2',
  ])
  assert.deepEqual(splitStatements('SELECT /* ; */ 1; SELECT 2'), ['SELECT /* ; */ 1', 'SELECT 2'])
})

test('does not split inside a dollar-quoted body', () => {
  const script = 'CREATE FUNCTION f() RETURNS int AS $$ SELECT 1; $$ LANGUAGE sql; SELECT 2'
  assert.deepEqual(splitStatements(script), [
    'CREATE FUNCTION f() RETURNS int AS $$ SELECT 1; $$ LANGUAGE sql',
    'SELECT 2',
  ])
})

test('does not split inside a bracketed SQL Server identifier', () => {
  assert.deepEqual(splitStatements('SELECT [a;b] FROM t; SELECT 2'), ['SELECT [a;b] FROM t', 'SELECT 2'])
})

test('leading verb skips leading comments', () => {
  assert.equal(leadingVerb('-- comment\nSELECT 1'), 'select')
  assert.equal(leadingVerb('/* c */ INSERT INTO t VALUES (1)'), 'insert')
  assert.equal(leadingVerb(''), '')
})

test('read-only classification', () => {
  assert.equal(isReadOnly('SELECT * FROM t'), true)
  assert.equal(isReadOnly('  with x as (select 1) select * from x'), true)
  assert.equal(isReadOnly('EXPLAIN SELECT 1'), true)
  assert.equal(isReadOnly('SHOW TABLES'), true)
  assert.equal(isReadOnly('PRAGMA table_info(t)'), true)
  assert.equal(isReadOnly('INSERT INTO t VALUES (1)'), false)
  assert.equal(isReadOnly('DELETE FROM t'), false)
  assert.equal(isReadOnly('with x as (select 1) delete from t'), false)
  assert.equal(isReadOnly('UPDATE t SET a = 1'), false)
})

test('a read-only claim holds against statements that really write', () => {
  // `EXPLAIN ANALYZE` executes the plan, so the statement it explains runs.
  assert.equal(isReadOnly('EXPLAIN ANALYZE DELETE FROM t'), false)
  assert.equal(isReadOnly('explain (analyze, buffers) delete from t'), false)
  assert.equal(isReadOnly('EXPLAIN ANALYSE UPDATE t SET a = 1'), false)
  assert.equal(isReadOnly('EXPLAIN SELECT * FROM t'), true)

  // `SELECT … INTO` creates a table; MySQL writes a file; `FOR UPDATE` locks.
  assert.equal(isReadOnly('SELECT * INTO copy_of_t FROM t'), false)
  assert.equal(isReadOnly("SELECT * FROM t INTO OUTFILE '/tmp/x.csv'"), false)
  assert.equal(isReadOnly('SELECT * FROM t FOR UPDATE'), false)
  assert.equal(isReadOnly('SELECT * FROM t FOR SHARE'), false)

  // `PRAGMA name = value` mutates the database connection.
  assert.equal(isReadOnly('PRAGMA journal_mode = WAL'), false)
  assert.equal(isReadOnly('PRAGMA table_info(people)'), true)
  assert.equal(isReadOnly('PRAGMA main.table_info(people)'), true)
  assert.equal(isReadOnly('PRAGMA index_list(people)'), true)
  assert.equal(isReadOnly('PRAGMA user_version'), true)
  // The function-call form is the write form: this pair used to pass because
  // neither contains `=`.
  assert.equal(isReadOnly('PRAGMA user_version(123)'), false)
  assert.equal(isReadOnly('PRAGMA query_only(0)'), false)
  assert.equal(isReadOnly('PRAGMA journal_mode(WAL)'), false)
})

test('data inside a literal is not mistaken for a verb', () => {
  // The word "delete" here is a value, not a statement.
  assert.equal(isReadOnly("WITH x AS (SELECT 1) SELECT * FROM x WHERE note = 'delete me'"), true)
  assert.equal(isReadOnly("SELECT * FROM t WHERE action = 'drop table'"), true)
  assert.equal(isReadOnly("SELECT * FROM t WHERE name = 'insert' OR name = 'update'"), true)
  // Comments are data too.
  assert.equal(isReadOnly('WITH x AS (SELECT 1) SELECT * FROM x -- delete later'), true)

  // `REPLACE(x, 'a', 'b')` is a function, not the MySQL verb.
  assert.equal(isReadOnly("WITH x AS (SELECT name FROM t) SELECT REPLACE(name, 'a', 'b') FROM x"), true)
  assert.equal(isReadOnly('REPLACE INTO t VALUES (1)'), false)
})

test('masking literals keeps offsets aligned with the source', () => {
  const source = "SELECT 'a;b' AS x, \"y\" FROM t -- tail"
  const masked = maskLiterals(source)
  assert.equal(masked.length, source.length)
  assert.ok(!masked.includes('a;b'), 'the literal content is gone')
  assert.ok(masked.includes('SELECT '), 'the keywords survive')
  assert.ok(!masked.includes('tail'), 'the comment content is gone')
  assert.equal(masked.indexOf(' FROM '), source.indexOf(' FROM '), 'offsets are unchanged')
})

test('identifier quoting escapes the engine escape character', () => {
  assert.equal(quoteIdent('sqlite', 'a"b'), '"a""b"')
  assert.equal(quoteIdent('mysql', 'a`b'), '`a``b`')
  assert.equal(quoteIdent('postgres', 'a"b'), '"a""b"')
  assert.equal(quoteIdent('sqlserver', 'a]b'), '[a]]b]')
})

test('qualified names skip absent parts', () => {
  assert.equal(qualify('mysql', ['db', '', 'tbl']), '`db`.`tbl`')
  assert.equal(qualify('postgres', ['db', 'public', 'tbl']), '"db"."public"."tbl"')
})

test('order and pagination clauses', () => {
  assert.equal(orderByClause('mysql', 'id', 'desc'), ' ORDER BY `id` DESC')
  assert.equal(orderByClause('mysql', '', 'asc'), '')
  assert.equal(limitClause('sqlite', 10, 20, true), ' LIMIT 10 OFFSET 20')
  assert.equal(limitClause('sqlserver', 10, 20, true), ' OFFSET 20 ROWS FETCH NEXT 10 ROWS ONLY')
  assert.equal(
    limitClause('sqlserver', 10, 0, false),
    ' ORDER BY (SELECT NULL) OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY',
  )
})

test('values are made JSON-safe', () => {
  assert.equal(toJsonValue(null), null)
  assert.equal(toJsonValue(undefined), null)
  assert.equal(toJsonValue(42), 42)
  assert.equal(toJsonValue(2n ** 64n), '18446744073709551616')
  assert.equal(toJsonValue(new Date('2024-01-01T00:00:00Z')), '2024-01-01T00:00:00.000Z')
  assert.equal(toJsonValue(Buffer.from([0xab, 0xcd])), '0xabcd')
  assert.deepEqual(toJsonValue({ a: 1 }), { a: 1 })
})
