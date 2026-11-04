/**
 * Unit tests for the SQL Server DDL composition.
 *
 * The driver gathers `sys.*` rows; this checks the text those rows produce. The
 * type rules deserve the detail they get here — `max_length` is in bytes, so
 * `nvarchar(100)` arrives as 200, and getting that wrong silently changes what a
 * copied script creates.
 */

import assert from 'node:assert/strict'
import { test } from 'node:test'

import { buildSqlServerDdl, sqlServerType } from '../lib/drivers/sqlserver-ddl.js'

test('length, precision and Unicode types are rendered from sys metadata', () => {
  // nvarchar(100) is 200 bytes; varchar(100) is 100.
  assert.equal(sqlServerType({ typeName: 'nvarchar', maxLength: 200 }), 'nvarchar(100)')
  assert.equal(sqlServerType({ typeName: 'varchar', maxLength: 100 }), 'varchar(100)')
  assert.equal(sqlServerType({ typeName: 'nchar', maxLength: 20 }), 'nchar(10)')
  assert.equal(sqlServerType({ typeName: 'nvarchar', maxLength: -1 }), 'nvarchar(max)')
  assert.equal(sqlServerType({ typeName: 'varbinary', maxLength: -1 }), 'varbinary(max)')
  assert.equal(sqlServerType({ typeName: 'decimal', precision: 18, scale: 2 }), 'decimal(18, 2)')
  assert.equal(sqlServerType({ typeName: 'datetime2', scale: 3 }), 'datetime2(3)')
  // Types that take no arguments keep their bare name.
  assert.equal(sqlServerType({ typeName: 'bigint' }), 'bigint')
  assert.equal(sqlServerType({ typeName: 'uniqueidentifier' }), 'uniqueidentifier')
  // A user-defined type is schema-qualified instead of guessed at.
  assert.equal(sqlServerType({ typeName: 'money_code', typeSchema: 'dbo', userDefined: true }), '[dbo].[money_code]')
})

test('columns render identity, computed and named defaults', () => {
  const ddl = buildSqlServerDdl({
    schema: 'dbo',
    table: 'users',
    columns: [
      { name: 'id', typeName: 'bigint', identity: true, identitySeed: 1, identityIncrement: 1, nullable: false },
      { name: 'email', typeName: 'nvarchar', maxLength: 200, nullable: false },
      {
        name: 'total',
        typeName: 'decimal',
        precision: 18,
        scale: 2,
        nullable: false,
        defaultDef: '((0))',
        defaultName: 'DF_users_total',
      },
      { name: 'full', computed: true, computedDef: '([email]+[nick])', persisted: true },
    ],
  })
  assert.equal(
    ddl,
    [
      'CREATE TABLE [dbo].[users] (',
      '  [id] bigint IDENTITY(1,1) NOT NULL,',
      '  [email] nvarchar(100) NOT NULL,',
      '  [total] decimal(18, 2) NOT NULL CONSTRAINT [DF_users_total] DEFAULT ((0)),',
      '  [full] AS ([email]+[nick]) PERSISTED',
      ');',
    ].join('\n'),
  )
})

test('a non-default identity seed is preserved', () => {
  const ddl = buildSqlServerDdl({
    schema: 'dbo',
    table: 't',
    columns: [{ name: 'id', typeName: 'int', identity: true, identitySeed: 1000, identityIncrement: 5, nullable: false }],
  })
  assert.match(ddl, /\[id\] int IDENTITY\(1000,5\) NOT NULL/)
})

test('constraints and indexes are separate statements', () => {
  const ddl = buildSqlServerDdl({
    schema: 'shop',
    table: 'orders',
    columns: [{ name: 'id', typeName: 'int', nullable: false }],
    constraints: [
      { name: 'PK_orders', definition: 'PRIMARY KEY CLUSTERED ([id])' },
      { name: 'UQ_orders_ref', definition: 'UNIQUE NONCLUSTERED ([ref])' },
      {
        name: 'FK_orders_tenant',
        definition: 'FOREIGN KEY ([tenant_id]) REFERENCES [dbo].[tenants] ([id]) ON DELETE CASCADE',
      },
      { name: 'CK_orders_total', definition: 'CHECK ([total] >= (0))' },
      { name: 'skipped', definition: '' },
    ],
    indexes: [{ name: 'IX_orders_ref', definition: 'CREATE UNIQUE NONCLUSTERED INDEX [IX_orders_ref] ON [shop].[orders] ([ref])' }],
  })
  assert.match(ddl, /ALTER TABLE \[shop\]\.\[orders\] ADD CONSTRAINT \[PK_orders\] PRIMARY KEY CLUSTERED \(\[id\]\);/)
  assert.match(
    ddl,
    /ADD CONSTRAINT \[FK_orders_tenant\] FOREIGN KEY \(\[tenant_id\]\) REFERENCES \[dbo\]\.\[tenants\] \(\[id\]\) ON DELETE CASCADE;/,
  )
  assert.match(ddl, /ADD CONSTRAINT \[CK_orders_total\] CHECK \(\[total\] >= \(0\)\);/)
  assert.ok(!/skipped/.test(ddl), 'an empty definition is not emitted as a broken statement')
  assert.match(ddl, /CREATE UNIQUE NONCLUSTERED INDEX \[IX_orders_ref\] ON \[shop\]\.\[orders\] \(\[ref\]\);/)
})

test('a table with no columns has no DDL', () => {
  assert.equal(buildSqlServerDdl({ schema: 'dbo', table: 'gone', columns: [] }), '')
})
