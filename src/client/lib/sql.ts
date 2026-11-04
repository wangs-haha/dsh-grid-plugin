/** SQL text utilities used by the editor and the filter builder. */

export interface SqlToken {
  type: 'ws' | 'comment' | 'string' | 'number' | 'keyword' | 'function' | 'plain' | 'ident' | 'punct' | 'operator' | 'variable'
  value: string
}

const SQL_KEYWORDS = new Set(
  (
    'select from where group by order having limit offset join inner left right full outer cross on as and or not in is null ' +
    'like ilike between exists case when then else end union all distinct insert into values update set delete create table view ' +
    'index alter add drop truncate primary key foreign references unique default constraint cascade returning with recursive ' +
    'asc desc explain analyze show describe use begin commit rollback transaction if temporary materialized over partition ' +
    'window rows range current row unbounded preceding following fetch next only for share nowait'
  ).split(/\s+/),
)

const SQL_FUNCTIONS = new Set(
  (
    'count sum avg min max coalesce nullif cast convert round floor ceil abs length lower upper trim ltrim rtrim substr substring ' +
    'replace concat concat_ws now current_timestamp current_date current_time date_trunc extract date_part to_char to_date ' +
    'row_number rank dense_rank ntile lag lead first_value last_value json_extract array_agg string_agg group_concat ifnull ' +
    'greatest least random uuid gen_random_uuid'
  ).split(/\s+/),
)

const CLAUSE_BREAKS = [
  'SELECT',
  'FROM',
  'WHERE',
  'GROUP BY',
  'ORDER BY',
  'HAVING',
  'LIMIT',
  'OFFSET',
  'UNION ALL',
  'UNION',
  'INSERT INTO',
  'VALUES',
  'UPDATE',
  'SET',
  'DELETE FROM',
  'RETURNING',
  'LEFT JOIN',
  'RIGHT JOIN',
  'INNER JOIN',
  'FULL JOIN',
  'JOIN',
]

export { SQL_KEYWORDS, SQL_FUNCTIONS }

/** Split SQL text into contiguous highlighted tokens. */
export function tokenizeSql(text: string): SqlToken[] {
  const source = String(text ?? '')
  const tokens: SqlToken[] = []
  let index = 0
  const push = (type: SqlToken['type'], value: string): void => {
    if (!value) return
    const last = tokens[tokens.length - 1]
    if (last && last.type === type) last.value += value
    else tokens.push({ type, value })
  }

  while (index < source.length) {
    const char = source[index] as string
    const rest = source.slice(index)

    if (char === '-' && source[index + 1] === '-') {
      const end = source.indexOf('\n', index)
      const stop = end === -1 ? source.length : end
      push('comment', source.slice(index, stop))
      index = stop
      continue
    }
    if (char === '/' && source[index + 1] === '*') {
      const end = source.indexOf('*/', index + 2)
      const stop = end === -1 ? source.length : end + 2
      push('comment', source.slice(index, stop))
      index = stop
      continue
    }
    if (char === "'" || char === '"' || char === '`') {
      let cursor = index + 1
      while (cursor < source.length) {
        if (source[cursor] === '\\') {
          cursor += 2
          continue
        }
        if (source[cursor] === char) {
          if (source[cursor + 1] === char) {
            cursor += 2
            continue
          }
          cursor += 1
          break
        }
        cursor += 1
      }
      push(char === "'" ? 'string' : 'ident', source.slice(index, cursor))
      index = cursor
      continue
    }
    if (char === '$' && /^\$[A-Za-z_]*\$/.test(rest)) {
      const tag = /^\$[A-Za-z_]*\$/.exec(rest)![0]
      const end = source.indexOf(tag, index + tag.length)
      const stop = end === -1 ? source.length : end + tag.length
      push('string', source.slice(index, stop))
      index = stop
      continue
    }
    if (/[0-9]/.test(char) || (char === '.' && /[0-9]/.test(source[index + 1] ?? ''))) {
      const match = /^[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?/.exec(rest)
      push('number', match ? match[0] : char)
      index += match ? match[0].length : 1
      continue
    }
    if (/[A-Za-z_@:]/.test(char)) {
      const match = /^[A-Za-z_@:][A-Za-z0-9_$@:]*/.exec(rest)
      const word = match![0]
      const lower = word.toLowerCase()
      const after = source[index + word.length]
      if (char === '@' || char === ':') push('variable', word)
      else if (SQL_KEYWORDS.has(lower)) push('keyword', word)
      else if (after === '(' || SQL_FUNCTIONS.has(lower)) push('function', word)
      else push('plain', word)
      index += word.length
      continue
    }
    if (/[(),;]/.test(char)) {
      push('punct', char)
      index += 1
      continue
    }
    if (/[=<>!+\-*/%|]/.test(char)) {
      const match = /^(?:<>|!=|<=|>=|\|\||::|[-+*/%=<>])/.exec(rest)
      push('operator', match ? match[0] : char)
      index += match ? match[0].length : 1
      continue
    }
    push('ws', char)
    index += 1
  }
  return tokens
}

/** Reformat a script with one clause per line. Returns the input when it cannot improve it. */
export function beautifySql(text: string): string {
  const source = String(text ?? '').trim()
  if (!source) return ''
  const tokens = tokenizeSql(source)
  const parts: string[] = []
  let buffer = ''
  let depth = 0
  const flush = (): void => {
    const value = buffer.replace(/\s+/g, ' ').trim()
    if (value) parts.push(value)
    buffer = ''
  }

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index] as SqlToken
    if (token.type === 'ws') {
      buffer += ' '
      continue
    }
    if (token.type === 'comment') {
      flush()
      parts.push(token.value.trim())
      continue
    }
    if (token.type === 'punct') {
      if (token.value === '(') depth += 1
      if (token.value === ')') depth = Math.max(0, depth - 1)
      buffer += token.value
      continue
    }
    if (token.type === 'keyword') {
      let word = token.value.toUpperCase()
      const spacer = tokens[index + 1]
      const after = tokens[index + 2]
      if (spacer && spacer.type === 'ws' && after && after.type === 'keyword') {
        const pair = `${word} ${after.value.toUpperCase()}`
        if (CLAUSE_BREAKS.includes(pair)) {
          word = pair
          index += 2
        }
      }
      if (depth === 0 && CLAUSE_BREAKS.includes(word)) {
        flush()
        buffer = `${word} `
        continue
      }
      buffer += `${word} `
      continue
    }
    buffer += token.value
  }
  flush()
  if (parts.length < 2) return source
  return parts.join('\n  ').replace(/[ \t]+$/gm, '')
}

/** Quote an identifier the way an engine expects. */
export function quoteIdent(engine: string, name: string): string {
  const source = String(name ?? '')
  if (engine === 'mysql') return '`' + source.replace(/`/g, '``') + '`'
  if (engine === 'sqlserver') return '[' + source.replace(/]/g, ']]') + ']'
  return '"' + source.replace(/"/g, '""') + '"'
}
/** Render a value as a SQL literal. */
export function sqlLiteral(value: string): string {
  const text = String(value ?? '').trim()
  if (text === '') return "''"
  if (/^-?\d+(\.\d+)?$/.test(text)) return text
  if (/^(null|true|false)$/i.test(text)) return text.toUpperCase()
  return `'${text.replace(/'/g, "''")}'`
}

export const FILTER_OPERATORS = ['=', '<>', '>', '>=', '<', '<=', 'LIKE', 'NOT LIKE', 'IN', 'BETWEEN', 'IS NULL', 'IS NOT NULL'] as const
export type FilterOperator = (typeof FILTER_OPERATORS)[number]

export interface FilterCondition {
  column: string
  op: FilterOperator
  value: string
}

export interface FilterState {
  joiner: 'AND' | 'OR'
  conditions: FilterCondition[]
}

/** Build a `WHERE` expression from structured conditions. */
export function buildWhere(engine: string, state: FilterState): string {
  const parts: string[] = []
  for (const condition of state.conditions) {
    if (!condition.column) continue
    const column = quoteIdent(engine, condition.column)
    const op = condition.op
    if (op === 'IS NULL' || op === 'IS NOT NULL') {
      parts.push(`${column} ${op}`)
      continue
    }
    const value = String(condition.value ?? '')
    if (value === '') continue
    if (op === 'IN') {
      const items = value.split(',').map(sqlLiteral).filter(Boolean)
      if (items.length === 0) continue
      parts.push(`${column} IN (${items.join(', ')})`)
      continue
    }
    if (op === 'BETWEEN') {
      const items = value.split(',').map(sqlLiteral)
      if (items.length < 2) continue
      parts.push(`${column} BETWEEN ${items[0]} AND ${items[1]}`)
      continue
    }
    parts.push(`${column} ${op} ${sqlLiteral(value)}`)
  }
  return parts.join(` ${state.joiner} `)
}

/** Compute the caret's screen position inside a textarea using a mirror element. */
export function caretPoint(area: HTMLTextAreaElement, caret: number): { left: number; top: number } {
  const mirror = document.createElement('div')
  const style = window.getComputedStyle(area)
  const properties: string[] = [
    'fontFamily',
    'fontSize',
    'fontWeight',
    'lineHeight',
    'letterSpacing',
    'padding',
    'border',
    'whiteSpace',
    'wordWrap',
    'tabSize',
  ]
  for (const property of properties) {
    ;(mirror.style as unknown as Record<string, string>)[property] = (style as unknown as Record<string, string>)[property] as string
  }
  mirror.style.position = 'absolute'
  mirror.style.visibility = 'hidden'
  mirror.style.width = `${area.clientWidth}px`
  mirror.style.whiteSpace = 'pre-wrap'
  mirror.style.overflowWrap = 'break-word'
  mirror.textContent = area.value.slice(0, caret)
  const marker = document.createElement('span')
  marker.textContent = '\u200b'
  mirror.appendChild(marker)
  document.body.appendChild(mirror)
  const left = marker.offsetLeft - area.scrollLeft
  const top = marker.offsetTop - area.scrollTop
  document.body.removeChild(mirror)
  return { left: Math.max(0, left), top }
}
