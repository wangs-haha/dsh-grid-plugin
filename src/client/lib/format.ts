/**
 * Formatting helpers shared by every view.
 *
 * The explicit `.ts` extension on the one import is what lets Node's type
 * stripping load this module on its own, so the escaping rules below can be
 * unit-tested without going through the bundle.
 */

import { quoteIdent } from './sql.ts'

/** Replace `{name}` placeholders. */
export function fmt(template: string, values?: Record<string, unknown>): string {
  return String(template).replace(/\{(\w+)\}/g, (match, key: string) =>
    values && values[key] !== undefined ? String(values[key]) : match,
  )
}

export interface DisplayCell {
  text: string
  isNull: boolean
  numeric: boolean
}

/** Format one value for a grid cell. */
export function displayValue(value: unknown, nullLabel: string, limit = 300): DisplayCell {
  if (value === null || value === undefined) return { text: nullLabel, isNull: true, numeric: false }
  if (typeof value === 'object') {
    try {
      const text = JSON.stringify(value)
      return { text: text.length > limit ? `${text.slice(0, limit)}…` : text, isNull: false, numeric: false }
    } catch {
      return { text: String(value), isNull: false, numeric: false }
    }
  }
  const text = String(value)
  return {
    text: text.length > limit ? `${text.slice(0, limit)}…` : text,
    isNull: false,
    numeric: typeof value === 'number',
  }
}

/** Escape one CSV field. */
export function csvField(value: unknown): string {
  if (value === null || value === undefined) return ''
  const text = typeof value === 'object' ? JSON.stringify(value) : String(value)
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

/** Convert a value into a number, or null when it is not numeric. */
export function asNumber(value: unknown): number | null {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null
  if (typeof value === 'string' && value.trim() !== '' && !Number.isNaN(Number(value))) return Number(value)
  return null
}

/** Filesystem-friendly fragment for a download name. */
export function slug(value: string): string {
  return String(value || 'table').replace(/[^\w.-]+/g, '_').slice(0, 60)
}

/** Trigger a browser download of generated text. */
export function download(filename: string, mime: string, text: string): void {
  const blob = new Blob([text], { type: `${mime};charset=utf-8` })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

/**
 * Render one value as a SQL literal for an `INSERT` script.
 *
 * Numbers and booleans stay unquoted, `null` becomes `NULL`, and anything else
 * becomes a quoted string with `'` doubled. Objects (JSON columns) are written
 * back as JSON text.
 * @param {unknown} value - cell value.
 * @param {string} engine - engine key, for boolean spelling.
 * @returns {string} the literal.
 */
export function sqlValue(value: unknown, engine: string): string {
  if (value === null || value === undefined) return 'NULL'
  if (typeof value === 'number') return Number.isFinite(value) ? String(value) : 'NULL'
  if (typeof value === 'boolean') return engine === 'sqlserver' ? (value ? '1' : '0') : value ? 'TRUE' : 'FALSE'
  const text = typeof value === 'object' ? JSON.stringify(value) : String(value)
  return `'${text.replace(/'/g, "''")}'`
}

/**
 * Build an `INSERT INTO … VALUES …` script, one statement per row.
 * @param {string} engine - engine key.
 * @param {{ table: string, database: string, schema: string }} scope - target.
 * @param {Array<{ name: string }>} columns - result columns.
 * @param {Record<string, unknown>[]} rows - the rows.
 * @returns {string} the script.
 */
export function toInsertScript(
  engine: string,
  scope: { table: string; database: string; schema: string },
  columns: Array<{ name: string }>,
  rows: Record<string, unknown>[],
): string {
  const parts = [scope.database, ...(engine === 'postgres' || engine === 'sqlserver' ? [scope.schema] : []), scope.table]
  const target = parts.filter(Boolean).map((part) => quoteIdent(engine, part)).join('.')
  const names = columns.map((column) => quoteIdent(engine, column.name)).join(', ')
  return rows
    .map((row) => `INSERT INTO ${target} (${names}) VALUES (${columns.map((column) => sqlValue(row[column.name], engine)).join(', ')});`)
    .join('\n')
}

/**
 * Build a Markdown table. Pipes and newlines are escaped so the table survives a
 * paste into a document.
 * @param {Array<{ name: string }>} columns - result columns.
 * @param {Record<string, unknown>[]} rows - the rows.
 * @returns {string} the Markdown table.
 */
export function toMarkdownTable(columns: Array<{ name: string }>, rows: Record<string, unknown>[]): string {
  const cell = (value: unknown): string => {
    if (value === null || value === undefined) return ''
    const text = typeof value === 'object' ? JSON.stringify(value) : String(value)
    return text.replace(/\|/g, '\\|').replace(/\r?\n/g, ' ')
  }
  const head = `| ${columns.map((column) => cell(column.name)).join(' | ')} |`
  const rule = `| ${columns.map(() => '---').join(' | ')} |`
  const body = rows.map((row) => `| ${columns.map((column) => cell(row[column.name])).join(' | ')} |`)
  return [head, rule, ...body].join('\n')
}

/**
 * Parse CSV text into a header and rows.
 *
 * A small state machine rather than a `split(',')`: quoted fields may contain
 * commas, newlines and doubled quotes, and a file saved by Excel is full of all
 * three. A leading byte-order mark is dropped, and rows shorter than the header
 * are padded with empty strings so every row has the same shape.
 * @param {string} text - the file contents.
 * @returns {{ header: string[], rows: string[][] }} the parsed table.
 */
export function parseCsv(text: string): { header: string[]; rows: string[][] } {
  const source = String(text ?? '').replace(/^\uFEFF/, '')
  const records: string[][] = []
  let record: string[] = []
  let field = ''
  let quoted = false
  let index = 0

  const endField = (): void => {
    record.push(field)
    field = ''
  }
  const endRecord = (): void => {
    endField()
    // Excel writes a trailing empty line; it is not a row.
    if (record.length > 1 || record[0] !== '') records.push(record)
    record = []
  }

  while (index < source.length) {
    const char = source[index]
    if (quoted) {
      if (char === '"') {
        if (source[index + 1] === '"') {
          field += '"'
          index += 2
          continue
        }
        quoted = false
        index += 1
        continue
      }
      field += char
      index += 1
      continue
    }
    if (char === '"' && field === '') {
      quoted = true
      index += 1
      continue
    }
    if (char === ',') {
      endField()
      index += 1
      continue
    }
    if (char === '\r') {
      // A CRLF pair ends one record, not two.
      index += source[index + 1] === '\n' ? 2 : 1
      endRecord()
      continue
    }
    if (char === '\n') {
      index += 1
      endRecord()
      continue
    }
    field += char
    index += 1
  }
  if (field !== '' || record.length > 0) endRecord()

  const [header = [], ...rows] = records
  const width = header.length
  return {
    header: header.map((name) => name.trim()),
    rows: rows.map((cells) => {
      const padded = cells.slice(0, width)
      while (padded.length < width) padded.push('')
      return padded
    }),
  }
}

/** Human-readable byte size. */export function humanSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  let value = bytes
  let unit = 0
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024
    unit += 1
  }
  return `${value.toFixed(unit === 0 ? 0 : 1)} ${units[unit]}`
}

/** Compact relative time such as "2h ago". */
export function relativeTime(iso: string): string {
  const then = Date.parse(iso)
  if (Number.isNaN(then)) return ''
  const seconds = Math.max(1, Math.round((Date.now() - then) / 1000))
  if (seconds < 60) return `${seconds}s`
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`
  if (seconds < 86400) return `${Math.round(seconds / 3600)}h`
  return `${Math.round(seconds / 86400)}d`
}
