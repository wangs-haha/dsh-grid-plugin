/**
 * SQL text utilities shared by every engine adapter.
 *
 * Nothing here talks to a database. The module owns the two things that are
 * easy to get wrong per dialect: splitting a script into statements without
 * being fooled by quotes or comments, and rendering identifiers, ordering and
 * pagination.
 */

/** Engines whose identifier quoting this module knows. */
const QUOTES = {
  sqlite: { open: '"', close: '"', escape: '"', escapeWith: '""' },
  mysql: { open: '`', close: '`', escape: '`', escapeWith: '``' },
  postgres: { open: '"', close: '"', escape: '"', escapeWith: '""' },
  sqlserver: { open: '[', close: ']', escape: ']', escapeWith: ']]' },
}

/** Statement verbs that never mutate data, for the read-only classifier. */
const READ_ONLY_VERBS = new Set([
  'select',
  'show',
  'describe',
  'desc',
  'explain',
  'pragma',
  'values',
  'table',
  'with',
])

/** Mutating verbs hidden inside a `WITH` prefix, checked case-insensitively. */
const WRITE_VERBS = /\b(insert|update|delete|merge|drop|alter|create|truncate|grant|revoke|call|exec|execute)\b|\breplace\b(?!\s*\()/i

/** Clauses that take write locks or create objects even under a `SELECT`. */
const WRITING_SELECT = /\b(?:into|outfile|dumpfile)\b|\bfor\s+(?:update|share|no\s+key\s+update|key\s+share)\b|\block\s+in\s+share\s+mode\b/i

/** `EXPLAIN` variants that run the statement they describe. */
const ANALYSING_EXPLAIN = /\bexplain\b[\s\S]*?\banaly[sz]e\b/i

/**
 * PRAGMAs that only read, even when they take a table or index argument.
 *
 * A PRAGMA is the one SQLite statement whose meaning depends on whether it is
 * called with an argument: `PRAGMA table_info(t)` reads, `PRAGMA
 * user_version(123)` writes. Rather than guess from `=`, the classifier names
 * the read-only forms and rejects everything else.
 */
const READ_ONLY_PRAGMAS = new Set([
  'table_info',
  'table_xinfo',
  'table_list',
  'index_list',
  'index_info',
  'index_xinfo',
  'foreign_key_list',
  'foreign_key_check',
  'database_list',
  'collation_list',
  'function_list',
  'module_list',
  'pragma_list',
  'compile_options',
  'integrity_check',
  'quick_check',
  'freelist_count',
  'page_count',
  'page_size',
  'schema_version',
  'user_version',
  'journal_mode',
  'auto_vacuum',
  'encoding',
  'application_id',
  'data_version',
])

/**
 * Read the name of a PRAGMA statement.
 * @param {string} statement - one masked statement.
 * @returns {{ name: string, hasArgs: boolean }} the pragma name and argument form.
 */
function pragmaOf(statement) {
  const match = /\bpragma\s+(?:[A-Za-z_][A-Za-z0-9_]*\s*\.\s*)?([A-Za-z_][A-Za-z0-9_]*)\s*(\(|$|\s)/i.exec(
    statement,
  )
  if (!match) return { name: '', hasArgs: false }
  return { name: match[1].toLowerCase(), hasArgs: match[2] === '(' }
}

/**
 * Read one quoted run starting at `start`, returning the index just past the
 * closing quote. Backslash escapes are honoured for `'` and `"` because MySQL
 * accepts them by default.
 * @param {string} text - the full script.
 * @param {number} start - index of the opening quote.
 * @param {string} quote - the quote character.
 * @returns {number} index after the closing quote, or the text length.
 */
function skipQuoted(text, start, quote) {
  let index = start + 1
  const backslash = quote === "'" || quote === '"'
  while (index < text.length) {
    const char = text[index]
    if (backslash && char === '\\') {
      index += 2
      continue
    }
    if (char === quote) {
      // A doubled quote is an escaped quote, not the end of the run.
      if (text[index + 1] === quote) {
        index += 2
        continue
      }
      return index + 1
    }
    index += 1
  }
  return text.length
}

/**
 * Skip a `/* *\/` block comment or a `--` / `#` line comment.
 * @param {string} text - the full script.
 * @param {number} start - index of the first comment character.
 * @returns {number} index just past the comment, or -1 when `start` is not a comment.
 */
function skipComment(text, start) {
  if (text[start] === '-' && text[start + 1] === '-') {
    const end = text.indexOf('\n', start)
    return end === -1 ? text.length : end
  }
  if (text[start] === '#') {
    const end = text.indexOf('\n', start)
    return end === -1 ? text.length : end
  }
  if (text[start] === '/' && text[start + 1] === '*') {
    const end = text.indexOf('*/', start + 2)
    return end === -1 ? text.length : end + 2
  }
  return -1
}

/**
 * Skip a PostgreSQL dollar-quoted string (`$$ … $$` / `$tag$ … $tag$`).
 * @param {string} text - the full script.
 * @param {number} start - index of the leading `$`.
 * @returns {number} index past the closing tag, or -1 when this is not a dollar quote.
 */
function skipDollarQuote(text, start) {
  const match = /^\$[A-Za-z_][A-Za-z0-9_]*\$|^\$\$/.exec(text.slice(start))
  if (!match) return -1
  const tag = match[0]
  const end = text.indexOf(tag, start + tag.length)
  return end === -1 ? text.length : end + tag.length
}

/**
 * Split a script into individual statements on top-level semicolons.
 *
 * Quoted strings, quoted identifiers, line comments, block comments and
 * PostgreSQL dollar-quoted bodies are skipped, so a `;` inside any of them does
 * not split the statement. Empty statements are dropped.
 * @param {string} sql - the script.
 * @returns {string[]} trimmed, non-empty statements.
 */
export function splitStatements(sql) {
  const text = String(sql ?? '')
  const statements = []
  let buffer = ''
  let index = 0
  while (index < text.length) {
    const char = text[index]
    const commentEnd = skipComment(text, index)
    if (commentEnd !== -1) {
      buffer += text.slice(index, commentEnd)
      index = commentEnd
      continue
    }
    if (char === "'" || char === '"' || char === '`') {
      const end = skipQuoted(text, index, char)
      buffer += text.slice(index, end)
      index = end
      continue
    }
    if (char === '[') {
      // SQL Server bracketed identifier: `]]` escapes a closing bracket.
      let cursor = index + 1
      while (cursor < text.length) {
        if (text[cursor] === ']') {
          if (text[cursor + 1] === ']') {
            cursor += 2
            continue
          }
          cursor += 1
          break
        }
        cursor += 1
      }
      buffer += text.slice(index, cursor)
      index = cursor
      continue
    }
    if (char === '$') {
      const end = skipDollarQuote(text, index)
      if (end !== -1) {
        buffer += text.slice(index, end)
        index = end
        continue
      }
    }
    if (char === ';') {
      const statement = buffer.trim()
      if (statement) statements.push(statement)
      buffer = ''
      index += 1
      continue
    }
    buffer += char
    index += 1
  }
  const tail = buffer.trim()
  if (tail) statements.push(tail)
  return statements
}

/**
 * Report the leading keyword of one statement, lowercased.
 * @param {string} statement - a single statement.
 * @returns {string} the verb, or '' when the statement is only comments.
 */
export function leadingVerb(statement) {
  const text = String(statement ?? '')
    .replace(/^\s*(?:(?:--|#)[^\n]*(?:\n|$)|\/\*[\s\S]*?\*\/\s*)*/g, '')
    .trimStart()
  const match = /^[A-Za-z_]+/.exec(text)
  return match ? match[0].toLowerCase() : ''
}

/**
 * Blank out comments and quoted runs so a keyword scan cannot be fooled by
 * data.
 *
 * Without this, `… WHERE note = 'delete me'` looks like a `DELETE`, and a
 * quoted identifier called `"update"` looks like an update. Every masked
 * character becomes a space, so offsets stay aligned with the original text.
 * @param {string} text - the statement.
 * @returns {string} the statement with literal content removed.
 */
export function maskLiterals(text) {
  const source = String(text ?? '')
  const blank = (chunk) => chunk.replace(/[^\n]/g, ' ')
  let out = ''
  let index = 0
  while (index < source.length) {
    const commentEnd = skipComment(source, index)
    if (commentEnd !== -1) {
      out += blank(source.slice(index, commentEnd))
      index = commentEnd
      continue
    }
    const char = source[index]
    if (char === "'" || char === '"' || char === '`') {
      const end = skipQuoted(source, index, char)
      out += char + blank(source.slice(index + 1, Math.max(index + 1, end - 1))) + (end > index + 1 ? char : '')
      index = end
      continue
    }
    if (char === '[') {
      const end = source.indexOf(']', index + 1)
      const stop = end === -1 ? source.length : end + 1
      out += '[' + blank(source.slice(index + 1, stop - 1)) + ']'
      index = stop
      continue
    }
    if (char === '$') {
      const end = skipDollarQuote(source, index)
      if (end !== -1) {
        out += blank(source.slice(index, end))
        index = end
        continue
      }
    }
    out += char
    index += 1
  }
  return out
}

/**
 * Decide whether one statement can only read.
 *
 * The classifier is deliberately conservative: it never trusts data, and it
 * knows the constructs that turn a `SELECT` into a write (`INTO`, `FOR UPDATE`)
 * or an `EXPLAIN` into an execution (`ANALYZE`). It is a guard rail, not the
 * security boundary — a database-level read-only transaction is.
 * @param {string} statement - a single statement.
 * @returns {boolean} true when the statement is a pure read.
 */
export function isReadOnly(statement) {
  const verb = leadingVerb(statement)
  if (!verb) return false
  const masked = maskLiterals(statement)

  if (verb === 'explain') {
    // `EXPLAIN ANALYZE DELETE …` really deletes: the plan is executed.
    return !ANALYSING_EXPLAIN.test(masked)
  }
  if (verb === 'pragma') {
    // `PRAGMA journal_mode = WAL` writes, and so does `PRAGMA
    // user_version(123)`: a table-valued pragma takes its argument in
    // parentheses, so the old `=`-only check let the write form through.
    if (/=/.test(masked)) return false
    const { name, hasArgs } = pragmaOf(masked)
    if (!READ_ONLY_PRAGMAS.has(name)) return false
    // Tables such as `table_info` quote an identifier in parentheses and only
    // read; scalar pragmas that take a value in parentheses write.
    return hasArgs ? /^(table_|index_|foreign_key_list$)/.test(name) : true
  }
  if (verb === 'with') {
    return !WRITE_VERBS.test(masked) && !WRITING_SELECT.test(masked)
  }
  if (!READ_ONLY_VERBS.has(verb)) return false
  if (verb === 'select' || verb === 'table' || verb === 'values') {
    return !WRITING_SELECT.test(masked)
  }
  return true
}

/**
 * Quote one identifier for an engine.
 * @param {string} engine - engine key.
 * @param {string} name - raw identifier.
 * @returns {string} the quoted identifier.
 */
export function quoteIdent(engine, name) {
  const quote = QUOTES[engine] || QUOTES.sqlite
  const value = String(name ?? '')
  return `${quote.open}${value.split(quote.escape).join(quote.escapeWith)}${quote.close}`
}

/**
 * Quote and join a qualified name, skipping absent parts.
 * @param {string} engine - engine key.
 * @param {Array<string|null|undefined>} parts - database, schema, table.
 * @returns {string} the qualified identifier.
 */
export function qualify(engine, parts) {
  return parts
    .filter((part) => typeof part === 'string' && part.length > 0)
    .map((part) => quoteIdent(engine, part))
    .join('.')
}

/**
 * Build an `ORDER BY` clause.
 * @param {string} engine - engine key.
 * @param {string} orderBy - column name, or '' for none.
 * @param {string} orderDir - 'asc' or 'desc'.
 * @returns {string} the clause including its leading space, or ''.
 */
export function orderByClause(engine, orderBy, orderDir) {
  const column = String(orderBy ?? '').trim()
  if (!column) return ''
  const direction = String(orderDir ?? '').toLowerCase() === 'desc' ? 'DESC' : 'ASC'
  return ` ORDER BY ${quoteIdent(engine, column)} ${direction}`
}

/**
 * Build the pagination tail for a page of rows.
 *
 * SQL Server needs an `ORDER BY` before `OFFSET`; when the caller has not
 * chosen one, a constant ordering is used so paging still works.
 * @param {string} engine - engine key.
 * @param {number} limit - page size, already clamped.
 * @param {number} offset - rows to skip.
 * @param {boolean} hasOrder - whether the statement already ends in an ORDER BY.
 * @returns {string} the clause including its leading space.
 */
export function limitClause(engine, limit, offset, hasOrder) {
  const size = Math.max(0, Math.trunc(Number(limit) || 0))
  const skip = Math.max(0, Math.trunc(Number(offset) || 0))
  if (engine === 'sqlserver') {
    const order = hasOrder ? '' : ' ORDER BY (SELECT NULL)'
    return `${order} OFFSET ${skip} ROWS FETCH NEXT ${size} ROWS ONLY`
  }
  return ` LIMIT ${size} OFFSET ${skip}`
}

/** How many characters of a serialized value the grid keeps. */
const VALUE_LIMIT = 4000

/**
 * Convert one driver value into something JSON-safe for the browser.
 *
 * Big integers become strings when they exceed the safe range (a driver cannot
 * round-trip them through `JSON.parse` otherwise), dates become ISO strings,
 * binary becomes a short hex preview and everything else is left to
 * `JSON.stringify`.
 * @param {unknown} value - the raw driver value.
 * @returns {unknown} a JSON-safe value.
 */
export function toJsonValue(value) {
  if (value === null || value === undefined) return null
  const type = typeof value
  if (type === 'string' || type === 'boolean') return value
  if (type === 'number') return Number.isFinite(value) ? value : String(value)
  if (type === 'bigint') {
    return value <= BigInt(Number.MAX_SAFE_INTEGER) && value >= BigInt(Number.MIN_SAFE_INTEGER)
      ? Number(value)
      : value.toString()
  }
  if (value instanceof Date) return value.toISOString()
  if (value instanceof Uint8Array) {
    const hex = Buffer.from(value).toString('hex')
    return hex.length > 64 ? `${hex.slice(0, 64)}…(${value.length} bytes)` : `0x${hex}`
  }
  if (Array.isArray(value)) return value.map(toJsonValue)
  if (type === 'object') {
    // pg returns json/jsonb already parsed into plain objects.
    try {
      const text = JSON.stringify(value)
      return text.length > VALUE_LIMIT ? `${text.slice(0, VALUE_LIMIT)}…` : JSON.parse(text)
    } catch {
      return String(value)
    }
  }
  return String(value)
}

/**
 * Convert one result row into a JSON-safe object, keeping column order.
 * @param {Record<string, unknown>} row - raw driver row.
 * @returns {Record<string, unknown>} the converted row.
 */
export function toJsonRow(row) {
  /** @type {Record<string, unknown>} */
  const out = {}
  for (const key of Object.keys(row)) out[key] = toJsonValue(row[key])
  return out
}
