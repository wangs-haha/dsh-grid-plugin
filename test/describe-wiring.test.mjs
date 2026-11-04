/**
 * Wiring tests for `describe()` on the two engines whose DDL is composed.
 *
 * The composers have their own unit tests, but those feed them the *right* shape.
 * These feed the driver a fake catalogue instead, so the seam between "what the
 * driver selects" and "what the composer expects" is covered — a projection that
 * drops `notNull` or `identity` used to render as a table where every column is
 * nullable, and no unit test of the composer could see it.
 */

import assert from 'node:assert/strict'
import { test } from 'node:test'

import { PostgresDriver } from '../lib/drivers/postgres.js'
import { SqlServerDriver } from '../lib/drivers/sqlserver.js'

/** A `pg` client stub that answers by matching the query text. */
function pgClient(answers) {
  return {
    query: async (sql) => {
      for (const [needle, rows] of answers) {
        if (String(sql).includes(needle)) return { rows }
      }
      return { rows: [] }
    },
  }
}

test('PostgreSQL renders a view as its definition, not as a table', async () => {
  const driver = new PostgresDriver({ engine: 'postgres', host: 'h', database: 'shop' })
  driver.client = pgClient([
    [
      'FROM pg_attribute a',
      [
        { name: 'id', type: 'bigint', notNull: false, identity: '', generated: '', defaultDef: null, comment: null, ordinal: 1 },
        { name: 'total', type: 'numeric', notNull: false, identity: '', generated: '', defaultDef: null, comment: null, ordinal: 2 },
      ],
    ],
    ['FROM pg_class c JOIN pg_namespace n', [{ kind: 'v', viewdef: ' SELECT o.id,\n    sum(o.total) AS total\n   FROM orders o\n  GROUP BY o.id;' }]],
    ['FROM pg_constraint', []],
    ['FROM pg_indexes', []],
    ['obj_description', [{ comment: 'Order totals' }]],
  ])

  const described = await driver.describe({ schema: 'shop', table: 'order_totals' })

  assert.match(described.ddl, /^CREATE VIEW "shop"\."order_totals" AS\nSELECT o\.id,/)
  assert.match(described.ddl, /COMMENT ON VIEW "shop"\."order_totals" IS 'Order totals';/)
  // The misleading part: a view must never be rendered as a table.
  assert.ok(!/CREATE TABLE/.test(described.ddl))
  // The trailing semicolon of the catalogue definition is not doubled.
  assert.ok(!/;;/.test(described.ddl))
})

test('PostgreSQL renders a materialized view with its own keyword', async () => {
  const driver = new PostgresDriver({ engine: 'postgres', host: 'h', database: 'shop' })
  driver.client = pgClient([
    ['FROM pg_attribute a', [{ name: 'id', type: 'bigint', notNull: false, identity: '', generated: '', defaultDef: null, comment: null, ordinal: 1 }]],
    ['FROM pg_class c JOIN pg_namespace n', [{ kind: 'm', viewdef: ' SELECT id FROM orders;' }]],
    ['FROM pg_constraint', []],
    ['FROM pg_indexes', [{ name: 'mv_id_idx', definition: 'CREATE INDEX mv_id_idx ON shop.mv USING btree (id)' }]],
    ['obj_description', [{ comment: '' }]],
  ])

  const described = await driver.describe({ schema: 'shop', table: 'mv' })
  assert.match(described.ddl, /^CREATE MATERIALIZED VIEW "shop"\."mv" AS\nSELECT id FROM orders;/)
})

test('PostgreSQL describe feeds real catalogue fields into the DDL', async () => {
  const driver = new PostgresDriver({ engine: 'postgres', host: 'h', database: 'shop' })
  driver.client = pgClient([
    [
      'FROM pg_attribute a',
      [
        { name: 'id', type: 'bigint', notNull: true, identity: 'a', generated: '', defaultDef: null, comment: null, ordinal: 1 },
        { name: 'email', type: 'text', notNull: true, identity: '', generated: '', defaultDef: null, comment: 'login', ordinal: 2 },
        { name: 'total', type: 'numeric(18,2)', notNull: false, identity: '', generated: '', defaultDef: '0', comment: null, ordinal: 3 },
      ],
    ],
    [
      'FROM pg_constraint',
      [{ name: 'users_pkey', type: 'p', definition: 'PRIMARY KEY (id)', cols: [1] }],
    ],
    ['FROM pg_indexes', [{ name: 'users_email_idx', definition: 'CREATE INDEX users_email_idx ON shop.users USING btree (email)' }]],
    ['obj_description', [{ comment: 'Accounts' }]],
  ])

  const described = await driver.describe({ schema: 'shop', table: 'users' })

  // The panel's projection stays boolean and marks the primary key.
  assert.equal(described.columns[0].nullable, false)
  assert.equal(described.columns[0].primaryKey, true, 'the PK is read from conkey, not from the definition text')
  assert.equal(described.columns[0].extra, 'identity')

  // And the DDL carries what INFORMATION_SCHEMA could not know.
  assert.match(described.ddl, /"id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL/)
  assert.match(described.ddl, /"total" numeric\(18,2\) DEFAULT 0/)
  assert.match(described.ddl, /ADD CONSTRAINT "users_pkey" PRIMARY KEY \(id\);/)
  assert.match(described.ddl, /CREATE INDEX users_email_idx ON shop\.users USING btree \(email\);/)
  assert.match(described.ddl, /COMMENT ON TABLE "shop"\."users" IS 'Accounts';/)
  assert.match(described.ddl, /COMMENT ON COLUMN "shop"\."users"\."email" IS 'login';/)
})

test('SQL Server returns a view definition verbatim instead of inventing a table', async () => {
  const driver = new SqlServerDriver({ engine: 'sqlserver', host: 'h', database: 'shop' })
  driver.pool = mssqlPool([
    ['FROM sys.objects o', [{ kind: 'V ', definition: "CREATE VIEW [dbo].[active_users] AS\nSELECT [id] FROM [dbo].[users] WHERE [active] = 1\n" }]],
    ['FROM sys.columns c', [{ ordinal: 1, name: 'id', typeName: 'bigint', maxLength: 8, precision: 19, scale: 0, nullable: true, identity: false, computed: false }]],
    ['FROM sys.index_columns ic', []],
    ['FROM sys.key_constraints kc', []],
    ['FROM sys.foreign_keys fk', []],
    ['FROM sys.check_constraints', []],
    ['FROM sys.indexes i', []],
  ])

  const described = await driver.describe({ schema: 'dbo', table: 'active_users' })
  assert.match(described.ddl, /^CREATE VIEW \[dbo\]\.\[active_users\] AS\nSELECT \[id\] FROM \[dbo\]\.\[users\]/)
  assert.ok(described.ddl.endsWith(';'), 'exactly one trailing semicolon')
  assert.ok(!/CREATE TABLE/.test(described.ddl), 'a view is never rendered as a table')
})

/** A `mssql` pool stub: `request()` returns a chainable request per query text. */
function mssqlPool(answers) {
  return {
    request() {
      const bindings = []
      /** @type {any} */
      const request = {
        input(name, value) {
          bindings.push([name, value])
          return request
        },
        async query(sql) {
          for (const [needle, recordset] of answers) {
            if (String(sql).includes(needle)) return { recordset, rowsAffected: [0] }
          }
          return { recordset: [], rowsAffected: [0] }
        },
      }
      return request
    },
  }
}

test('SQL Server describe feeds sys metadata into the DDL', async () => {
  const driver = new SqlServerDriver({ engine: 'sqlserver', host: 'h', database: 'shop' })
  driver.pool = mssqlPool([
    [
      'FROM sys.columns c',
      [
        {
          ordinal: 1, name: 'id', typeName: 'bigint', maxLength: 8, precision: 19, scale: 0,
          nullable: false, identity: true, computed: false, identitySeed: 1, identityIncrement: 1,
          computedDef: null, persisted: false, defaultDef: null, defaultName: null,
        },
        {
          ordinal: 2, name: 'email', typeName: 'nvarchar', maxLength: 200, precision: 0, scale: 0,
          nullable: false, identity: false, computed: false, computedDef: null, persisted: false,
          defaultDef: null, defaultName: null,
        },
      ],
    ],
    ['FROM sys.index_columns ic', [{ name: 'id' }]],
    [
      'FROM sys.key_constraints kc',
      [{ name: 'PK_users', kind: 'PK', typeDesc: 'CLUSTERED', cols: 'id' }],
    ],
    ['FROM sys.foreign_keys fk', []],
    ['FROM sys.check_constraints', [{ name: 'CK_users_email', definition: '([email]<>N\'\')', disabled: false }]],
    [
      'FROM sys.indexes i',
      [{ name: 'IX_users_email', isUnique: true, typeDesc: 'NONCLUSTERED', cols: 'email' }],
    ],
  ])

  const described = await driver.describe({ schema: 'dbo', table: 'users' })

  assert.equal(described.columns[0].nullable, false)
  assert.equal(described.columns[0].primaryKey, true)
  assert.equal(described.columns[0].extra, 'identity')
  // nvarchar(100 characters) arrives as max_length 200.
  assert.equal(described.columns[1].type, 'nvarchar(100)')

  assert.match(described.ddl, /\[id\] bigint IDENTITY\(1,1\) NOT NULL/)
  assert.match(described.ddl, /\[email\] nvarchar\(100\) NOT NULL/)
  assert.match(described.ddl, /ADD CONSTRAINT \[PK_users\] PRIMARY KEY CLUSTERED \(\[id\]\);/)
  assert.match(described.ddl, /ADD CONSTRAINT \[CK_users_email\] CHECK \(\[email\]<>N''\);/)
  assert.match(described.ddl, /CREATE UNIQUE NONCLUSTERED INDEX \[IX_users_email\] ON \[dbo\]\.\[users\] \(\[email\]\);/)

  // The index list the grid shows keeps constraint and non-constraint indexes.
  assert.deepEqual(
    described.indexes.map((index) => [index.name, index.columns, index.primary]),
    [
      ['PK_users', ['id'], true],
      ['IX_users_email', ['email'], false],
    ],
  )
})
