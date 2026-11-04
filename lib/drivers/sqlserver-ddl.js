/**
 * SQL Server DDL composition.
 *
 * SQL Server cannot hand out a table's definition the way PostgreSQL's
 * `pg_get_constraintdef` does, so the text has to be assembled from `sys.*`. That
 * assembly lives here, apart from the driver, so it can be unit-tested against
 * fixture metadata — the driver's only job is to produce the rows this expects.
 */

import { qualify, quoteIdent } from '../query.js'

/**
 * Render a column's type, including length or precision where the type takes one.
 * @param {{ typeName: string, typeSchema?: string, userDefined?: boolean,
 *   maxLength?: number, precision?: number, scale?: number }} column - type metadata.
 * @returns {string} the type as it would be written in DDL.
 */
export function sqlServerType(column) {
  const name = String(column.typeName ?? '')
  if (column.userDefined) {
    return column.typeSchema ? `${quoteIdent('sqlserver', column.typeSchema)}.${quoteIdent('sqlserver', name)}` : quoteIdent('sqlserver', name)
  }
  const lengthTypes = new Set(['char', 'varchar', 'nchar', 'nvarchar', 'binary', 'varbinary'])
  const rounded = new Set(['decimal', 'numeric'])
  const scaled = new Set(['datetime2', 'time', 'datetimeoffset'])

  if (lengthTypes.has(name)) {
    const raw = Number(column.maxLength ?? 0)
    if (raw === -1) return `${name}(max)`
    // `max_length` is in bytes; the Unicode types need two per character.
    const chars = name.startsWith('n') ? Math.floor(raw / 2) : raw
    return chars > 0 ? `${name}(${chars})` : name
  }
  if (rounded.has(name)) {
    const precision = Number(column.precision ?? 18)
    const scale = Number(column.scale ?? 0)
    return `${name}(${precision}, ${scale})`
  }
  if (scaled.has(name)) {
    const scale = Number(column.scale ?? 7)
    return `${name}(${scale})`
  }
  return name
}

/**
 * Render one column definition.
 * @param {object} column - row from the metadata query.
 * @returns {string} the definition, without a trailing comma.
 */
function columnLine(column) {
  const name = quoteIdent('sqlserver', column.name)
  if (column.computed && column.computedDef) {
    // A computed column has no type and no nullability of its own.
    return `${name} AS ${column.computedDef}${column.persisted ? ' PERSISTED' : ''}`
  }
  const parts = [name, sqlServerType(column)]
  if (column.identity) {
    const seed = Number(column.identitySeed ?? 1)
    const increment = Number(column.identityIncrement ?? 1)
    parts.push(`IDENTITY(${seed},${increment})`)
  }
  parts.push(column.nullable ? 'NULL' : 'NOT NULL')
  if (column.defaultDef) {
    // A named default is part of the schema, so keep its name.
    const constraint = column.defaultName ? `CONSTRAINT ${quoteIdent('sqlserver', column.defaultName)} ` : ''
    parts.push(`${constraint}DEFAULT ${column.defaultDef}`)
  }
  return parts.join(' ')
}

/**
 * Build the DDL for one table.
 * @param {{ schema: string, table: string, columns: object[], constraints?: object[],
 *   indexes?: object[] }} input - catalogue metadata.
 * @returns {string} the DDL, or '' when there are no columns.
 */
export function buildSqlServerDdl(input) {
  const columns = Array.isArray(input.columns) ? input.columns : []
  if (columns.length === 0) return ''
  const target = qualify('sqlserver', [input.schema, input.table])

  const statements = [`CREATE TABLE ${target} (\n${columns.map((column) => `  ${columnLine(column)}`).join(',\n')}\n);`]

  for (const constraint of input.constraints ?? []) {
    const definition = String(constraint.definition ?? '').trim()
    if (!definition) continue
    statements.push(
      `ALTER TABLE ${target} ADD CONSTRAINT ${quoteIdent('sqlserver', constraint.name)} ${definition};`,
    )
  }

  for (const index of input.indexes ?? []) {
    const definition = String(index.definition ?? '').trim()
    if (definition) statements.push(`${definition};`)
  }

  return statements.join('\n\n')
}
