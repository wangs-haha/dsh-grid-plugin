/**
 * Unit tests for the export formatters.
 *
 * These run against the TypeScript source directly (Node strips the types), so
 * the escaping rules are checked without building the panel bundle first.
 */

import assert from 'node:assert/strict'
import { test } from 'node:test'

import { parseCsv, toInsertScript, toMarkdownTable } from '../src/client/lib/format.ts'

test('INSERT script quotes identifiers per engine and keeps types intact', () => {
  const columns = [{ name: 'id' }, { name: 'name' }, { name: 'score' }, { name: 'active' }]
  const rows = [{ id: 1, name: "O'Brien", score: 9.5, active: true }]

  const mysql = toInsertScript('mysql', { table: 'people', database: 'shop', schema: '' }, columns, rows)
  assert.equal(
    mysql,
    "INSERT INTO `shop`.`people` (`id`, `name`, `score`, `active`) VALUES (1, 'O''Brien', 9.5, TRUE);",
  )

  const postgres = toInsertScript('postgres', { table: 'people', database: 'shop', schema: 'public' }, columns, rows)
  assert.equal(
    postgres,
    'INSERT INTO "shop"."public"."people" ("id", "name", "score", "active") VALUES (1, \'O\'\'Brien\', 9.5, TRUE);',
  )

  // SQL Server has no boolean literal in a VALUES list.
  const sqlserver = toInsertScript('sqlserver', { table: 'people', database: 'shop', schema: 'dbo' }, columns, rows)
  assert.match(sqlserver, /, 1\);/)
  assert.ok(sqlserver.includes('1, \'O\'\'Brien\', 9.5, 1'))
})

test('INSERT script writes NULL, JSON and one statement per row', () => {
  const columns = [{ name: 'id' }, { name: 'meta' }]
  const rows = [
    { id: 1, meta: null },
    { id: 2, meta: { a: 1 } },
  ]
  const script = toInsertScript('sqlite', { table: 't', database: 'main', schema: '' }, columns, rows)
  const lines = script.split('\n')
  assert.equal(lines.length, 2)
  assert.match(lines[0], /VALUES \(1, NULL\);$/)
  assert.match(lines[1], /VALUES \(2, '\{"a":1\}'\);$/)
})

test('Markdown table escapes pipes and flattens newlines', () => {
  const columns = [{ name: 'id' }, { name: 'note' }]
  const rows = [
    { id: 1, note: 'a | b' },
    { id: 2, note: 'line1\nline2' },
    { id: 3, note: null },
  ]
  const markdown = toMarkdownTable(columns, rows)
  const lines = markdown.split('\n')
  assert.equal(lines[0], '| id | note |')
  assert.equal(lines[1], '| --- | --- |')
  assert.equal(lines[2], '| 1 | a \\| b |')
  assert.equal(lines[3], '| 2 | line1 line2 |')
  assert.equal(lines[4], '| 3 |  |')
})

test('CSV parsing survives quotes, commas and newlines', () => {
  const text = 'id,name,note\r\n1,"Ada, A.","said ""hi"""\r\n2,Lin,"line1\nline2"\r\n'
  const parsed = parseCsv(text)
  assert.deepEqual(parsed.header, ['id', 'name', 'note'])
  assert.deepEqual(parsed.rows, [
    ['1', 'Ada, A.', 'said "hi"'],
    ['2', 'Lin', 'line1\nline2'],
  ])
})

test('CSV parsing tolerates a BOM, a trailing blank line and short rows', () => {
  const parsed = parseCsv('\uFEFFa,b,c\n1,2\n\n3,4,5\n')
  assert.deepEqual(parsed.header, ['a', 'b', 'c'])
  // Every row is padded to the header width so the importer can zip them.
  assert.deepEqual(parsed.rows, [
    ['1', '2', ''],
    ['3', '4', '5'],
  ])
})

test('CSV parsing keeps a single empty field as a row', () => {
  // "," is a row of two empty fields; a lone "\n" is not a row at all.
  assert.deepEqual(parseCsv('a,b\n,\n').rows, [['', '']])
  assert.deepEqual(parseCsv('a,b\n').rows, [])
})
