/** Data and structure of one relation. */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { api } from '../lib/api'
import { csvField, displayValue, download, fmt, parseCsv, slug, toInsertScript, toMarkdownTable } from '../lib/format'
import { FILTER_OPERATORS, buildWhere, quoteIdent, type FilterCondition, type FilterOperator } from '../lib/sql'
import type { ColumnInfo, DescribeResult, RowsResult, Tab } from '../lib/types'
import { Banner, Button, Empty, Field, Icon, IconButton, Input, Menu, Modal, Segmented, Select, Spinner, TextArea } from '../ui/kit'

interface TableViewProps {
  t: (key: string) => string
  tab: Extract<Tab, { kind: 'table' }>
  engine: string
  notify: (message: string, tone?: 'info' | 'error' | 'success') => void
  onNewQuery?: () => void
}

const PAGE_SIZES = [50, 100, 200, 500]

/**
 * Decide whether a column should get a multi-line field.
 *
 * JSON, XML and free text never fit on one line, and a long `varchar` does not
 * either; everything else stays a single-line input.
 * @param {string} type - the column type as the engine reports it.
 * @returns {boolean} true for types that deserve room.
 */
function isLongText(type: string): boolean {
  const text = String(type ?? '').toLowerCase()
  if (/\b(json|jsonb|xml|text|clob|ntext|longtext|mediumtext|bytea)\b/.test(text)) return true
  const sized = /(?:var)?char(?:acter varying)?\s*\(\s*(\d+)\s*\)/.exec(text)
  return sized ? Number(sized[1]) > 120 : false
}

export function TableView(props: TableViewProps): JSX.Element {
  const { t, tab, engine } = props
  const [view, setView] = useState<'data' | 'structure'>('data')
  const scope = { connectionId: tab.connectionId, database: tab.database, schema: tab.schema, table: tab.table }
  const scopeKey = `${scope.connectionId}|${scope.database}|${scope.schema}|${scope.table}`

  // The description belongs to the tab, not to whichever view is showing: the
  // grid needs it for primary keys and the structure view needs it for the DDL,
  // so fetching it in both meant a round trip on every Data/Structure toggle.
  const [meta, setMeta] = useState<DescribeResult | null>(null)
  const [metaError, setMetaError] = useState('')
  const [metaTick, setMetaTick] = useState(0)
  useEffect(() => {
    let cancelled = false
    api
      .describe(scope.connectionId, scope.database, scope.schema, scope.table)
      .then((result) => {
        if (!cancelled) {
          setMeta(result)
          setMetaError('')
        }
      })
      .catch((cause: unknown) => {
        if (!cancelled) setMetaError(cause instanceof Error ? cause.message : String(cause))
      })
    return () => {
      cancelled = true
    }
  }, [scopeKey, metaTick])

  return (
    <div className="dg-content">
      <div className="dg-subbar">
        <Icon name={tab.tableKind === 'view' ? 'view' : 'table'} size={12} />
        <span className="dg-mono">{tab.table}</span>
        <span className="dg-chip">{tab.database || 'main'}</span>
        {tab.schema ? <span className="dg-chip">{tab.schema}</span> : null}
        <div className="dg-spacer" />
        <Segmented
          value={view}
          onChange={setView}
          options={[
            { value: 'data', label: t('data') },
            { value: 'structure', label: t('structure') },
          ]}
        />
      </div>
      {view === 'data' ? (
        <DataGrid
          t={t}
          scope={scope}
          engine={engine}
          notify={props.notify}
          meta={meta}
          onRefreshMeta={() => setMetaTick((value) => value + 1)}
          onNewQuery={props.onNewQuery}
        />
      ) : (
        <StructureView t={t} meta={meta} error={metaError} onRefresh={() => setMetaTick((value) => value + 1)} />
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */

interface Scope {
  connectionId: string
  database: string
  schema: string
  table: string
}

function DataGrid({
  t,
  scope,
  engine,
  notify,
  meta,
  onRefreshMeta,
  onNewQuery,
}: {
  t: (k: string) => string
  scope: Scope
  engine: string
  notify: TableViewProps['notify']
  meta: DescribeResult | null
  onRefreshMeta: () => void
  onNewQuery?: () => void
}): JSX.Element {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(100)
  const [sort, setSort] = useState<{ column: string; dir: '' | 'asc' | 'desc' }>({ column: '', dir: '' })
  const [where, setWhere] = useState('')
  const [builderOpen, setBuilderOpen] = useState(false)
  const [conditions, setConditions] = useState<FilterCondition[]>([])
  const [joiner, setJoiner] = useState<'AND' | 'OR'>('AND')
  const [data, setData] = useState<RowsResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selection, setSelection] = useState<{ top: number; left: number; bottom: number; right: number } | null>(null)
  const [editing, setEditing] = useState<{ row: number; column: number; value: string } | null>(null)
  const [tick, setTick] = useState(0)
  const [exportMenu, setExportMenu] = useState<{ x: number; y: number } | null>(null)
  const [importing, setImporting] = useState(false)
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([])
  const [rowEditor, setRowEditor] = useState<{ rowIndex: number; draft: Record<string, string> } | null>(null)
  const [savingRow, setSavingRow] = useState(false)
  const [columnMenu, setColumnMenu] = useState<{ x: number; y: number } | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const dragging = useRef(false)
  const gridRef = useRef<HTMLTableElement>(null)

  const scopeKey = `${scope.connectionId}|${scope.database}|${scope.schema}|${scope.table}`

  // `where` changes on every keystroke, so the request is debounced; it is also
  // the only input that triggers a database round-trip per character.
  const [whereDraft, setWhereDraft] = useState('')
  useEffect(() => {
    if (whereDraft === where) return undefined
    const timer = setTimeout(() => {
      setWhere(whereDraft)
      setPage(1)
    }, 320)
    return () => clearTimeout(timer)
  }, [whereDraft, where])

  // The total only has to be loaded when the scope changes; paging reuses it.
  // `exactWanted` is raised by the Refresh button, which is the user saying they
  // want the real number rather than the engine's estimate.
  const countedKey = useRef('')
  const exactWanted = useRef(false)
  const scopeQuery = `${scopeKey}|${where}|${sort.column}|${sort.dir}`

  useEffect(() => {
    const controller = new AbortController()
    let cancelled = false
    setLoading(true)
    setError('')
    const total =
      exactWanted.current ? 'exact' : countedKey.current === scopeQuery ? 'none' : 'auto'
    api
      .rows(
        { ...scope, page, pageSize, orderBy: sort.column, orderDir: sort.dir, where, total },
        controller.signal,
      )
      .then((result) => {
        if (cancelled) return
        countedKey.current = scopeQuery
        exactWanted.current = false
        // A page fetched without a total carries `total: null`; keep the number
        // the pager already showed instead of resetting it to zero.
        setData((previous) => ({
          ...result,
          total: typeof result.total === 'number' ? result.total : previous?.total ?? result.rows.length,
          totalKind: result.totalKind === 'none' && previous ? previous.totalKind : result.totalKind,
        }))
      })
      .catch((cause: unknown) => {
        if (cancelled) return
        if (cause instanceof DOMException && cause.name === 'AbortError') return
        setError(cause instanceof Error ? cause.message : String(cause))
        setData(null)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
      controller.abort()
    }
  }, [scopeKey, page, pageSize, sort.column, sort.dir, where, tick, scopeQuery])

  const columns: ColumnInfo[] = meta?.columns ?? []
  const primaryKey = useMemo(() => columns.filter((column) => column.primaryKey).map((column) => column.name), [columns])
  const rows = data?.rows ?? []
  const total = data?.total ?? 0
  const pages = Math.max(1, Math.ceil(total / pageSize))
  const readOnly = primaryKey.length === 0

  // What the grid actually renders: a column can be hidden from the Columns menu,
  // and every index that addresses a cell (selection, editing, aggregates, copy)
  // refers to this list rather than to the raw result columns.
  const gridColumns = (data?.columns ?? []).filter((column) => !hiddenColumns.includes(column.name))

  // The editor dialog labels each field with what `describe` knows (primary key,
  // nullability); the result columns carry only names, so they are the fallback.
  const editorFields = (columns.length > 0
    ? columns.map((column) => ({
        name: column.name,
        type: column.type,
        primaryKey: Boolean(column.primaryKey),
        nullable: column.nullable,
      }))
    : (data?.columns ?? []).map((column) => ({
        name: column.name,
        type: column.type ?? '',
        primaryKey: false,
        nullable: true,
      })))

  const reload = useCallback(() => {
    countedKey.current = ''
    exactWanted.current = true
    setTick((value) => value + 1)
    // Refresh means "show me the current state", which includes the structure:
    // a column added elsewhere would otherwise stay invisible until the tab is
    // reopened.
    onRefreshMeta()
  }, [onRefreshMeta])

  // Selection and inline editing address cells by index, so they cannot survive a
  // page turn, a re-sort or a refetch: the indices would point at other rows.
  useEffect(() => {
    setSelection(null)
    setEditing(null)
  }, [scopeKey, page, pageSize, where, tick])

  const aggregate = useMemo(() => {
    if (!selection || !data) return null
    const values: number[] = []
    let cells = 0
    for (let r = selection.top; r <= selection.bottom; r += 1) {
      const row = rows[r]
      if (!row) continue
      for (let c = selection.left; c <= selection.right; c += 1) {
        const column = gridColumns[c]
        if (!column) continue
        cells += 1
        const value = Number(row[column.name])
        if (!Number.isNaN(value) && row[column.name] !== null) values.push(value)
      }
    }
    if (values.length === 0) return { cells, count: 0, sum: 0, avg: 0 }
    const sum = values.reduce((a, b) => a + b, 0)
    return { cells, count: values.length, sum, avg: sum / values.length }
  }, [selection, data, rows])

  const toggleSort = (name: string): void => {
    setSort((current) =>
      current.column !== name ? { column: name, dir: 'asc' } : current.dir === 'asc' ? { column: name, dir: 'desc' } : { column: '', dir: '' },
    )
    setPage(1)
  }

  const copySelection = async (): Promise<void> => {
    if (!selection || !data) return
    const lines: string[] = []
    for (let r = selection.top; r <= selection.bottom; r += 1) {
      const row = rows[r]
      if (!row) continue
      lines.push(gridColumns.slice(selection.left, selection.right + 1).map((column) => csvField(row[column.name])).join('\t'))
    }
    try {
      await navigator.clipboard.writeText(lines.join('\n'))
      notify(t('copied'), 'success')
    } catch {
      notify(t('error'), 'error')
    }
  }

  const commitEdit = async (rowIndex: number, columnIndex: number, original: unknown): Promise<void> => {
    const cell = editing
    setEditing(null)
    if (!cell) return
    const before = original === null || original === undefined ? '' : String(original)
    if (cell.value === before) return
    if (readOnly) return notify(t('noPrimaryKey'), 'error')
    const row = rows[rowIndex]
    if (!row) return
    const key: Record<string, unknown> = {}
    for (const name of primaryKey) key[name] = row[name]
    const column = gridColumns[columnIndex]
    if (!column) return
    try {
      await api.updateRow({ ...scope, key, changes: { [column.name]: cell.value === '' && original === null ? null : cell.value } })
      notify(t('cellSaved'), 'success')
      reload()
    } catch (cause) {
      notify(cause instanceof Error ? cause.message : String(cause), 'error')
    }
  }

  const removeRow = async (rowIndex: number): Promise<void> => {
    const row = rows[rowIndex]
    if (!row || readOnly) return
    if (!window.confirm(t('confirmDelete'))) return
    const key: Record<string, unknown> = {}
    for (const name of primaryKey) key[name] = row[name]
    try {
      await api.deleteRow({ ...scope, key })
      notify(t('deleted'), 'success')
      reload()
    } catch (cause) {
      notify(cause instanceof Error ? cause.message : String(cause), 'error')
    }
  }

  const exportAs = async (kind: 'csv' | 'json' | 'insert' | 'markdown'): Promise<void> => {
    try {
      const result = await api.exportRows({ ...scope, where, orderBy: sort.column, orderDir: sort.dir })
      const base = slug(scope.table)
      if (kind === 'csv') {
        const names = result.columns.map((column) => column.name)
        const text = [names.map(csvField).join(',')]
          .concat(result.rows.map((row) => names.map((name) => csvField(row[name])).join(',')))
          .join('\r\n')
        download(`${base}.csv`, 'text/csv', text)
      } else if (kind === 'json') {
        download(`${base}.json`, 'application/json', JSON.stringify(result.rows, null, 2))
      } else if (kind === 'insert') {
        download(`${base}.sql`, 'application/sql', toInsertScript(engine, scope, result.columns, result.rows))
      } else {
        download(`${base}.md`, 'text/markdown', toMarkdownTable(result.columns, result.rows))
      }
      if (result.truncated) notify(fmt(t('exportTruncated'), { n: result.rows.length }), 'info')
    } catch (cause) {
      notify(cause instanceof Error ? cause.message : String(cause), 'error')
    }
  }

  /** Rows per request while importing: small enough to stay under the body limit. */
  const IMPORT_CHUNK = 200

  const importFile = async (file: File): Promise<void> => {
    const text = await file.text()
    const parsed = parseCsv(text)
    if (parsed.header.length === 0 || parsed.rows.length === 0) {
      notify(t('importEmpty'), 'error')
      return
    }
    const known = new Set((columns.length ? columns : (data?.columns ?? [])).map((column) => column.name))
    if (known.size === 0) {
      notify(t('importNoColumns'), 'error')
      return
    }
    // A header this table does not have is almost always a wrong file, and
    // silently dropping the column would import the wrong data.
    const unknown = parsed.header.filter((name) => !known.has(name))
    if (unknown.length > 0) {
      notify(fmt(t('importUnknownColumns'), { cols: unknown.join(', ') }), 'error')
      return
    }
    const rows = parsed.rows.map((cells) => {
      /** @type {Record<string, unknown>} */
      const row: Record<string, unknown> = {}
      parsed.header.forEach((name, index) => {
        const cell = cells[index] ?? ''
        // An empty cell is written as NULL so the column's default or NULL-ness
        // decides, rather than storing an empty string in a numeric column.
        row[name] = cell === '' ? null : cell
      })
      return row
    })

    setImporting(true)
    let inserted = 0
    try {
      for (let start = 0; start < rows.length; start += IMPORT_CHUNK) {
        const chunk = rows.slice(start, start + IMPORT_CHUNK)
        // eslint-disable-next-line no-await-in-loop
        const result = await api.insertRows({ ...scope, rows: chunk })
        inserted += result.inserted
      }
      notify(fmt(t('importDone'), { n: inserted }), 'success')
      reload()
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : String(cause)
      notify(fmt(t('importFailed'), { n: inserted, error: message }), 'error')
    } finally {
      setImporting(false)
    }
  }

  /**
   * Start a new row.
   *
   * The row is inserted with its defaults, then the user fills it in through the
   * same in-place editing as any other cell.
   */
  const insertRow = async (): Promise<void> => {
    try {
      const result = await api.insertRow({ ...scope, values: {} })
      notify(result.affected > 0 ? t('rowInserted') : t('insertRowFailed'), result.affected > 0 ? 'success' : 'error')
      reload()
    } catch (cause) {
      notify(cause instanceof Error ? cause.message : String(cause), 'error')
    }
  }

  /**
   * Open the row editor for one row of the current page.
   *
   * Every field is shown at once, which is the point: filling a wide row one cell
   * at a time means losing your place, and the same primary key addresses the row
   * either way.
   * @param {number} rowIndex - index into the current page.
   * @returns {void}
   */
  const openRowEditor = (rowIndex: number): void => {
    const row = rows[rowIndex]
    if (!row || readOnly) return
    const draft: Record<string, string> = {}
    for (const column of data?.columns ?? []) {
      const value = row[column.name]
      draft[column.name] = value === null || value === undefined ? '' : String(value)
    }
    setRowEditor({ rowIndex, draft })
  }

  /**
   * Write back only the fields that changed.
   * @returns {Promise<void>}
   */
  const saveRowEditor = async (): Promise<void> => {
    const open = rowEditor
    const row = open ? rows[open.rowIndex] : undefined
    if (!open || !row) return
    const changes: Record<string, unknown> = {}
    for (const column of data?.columns ?? []) {
      const before = row[column.name]
      const beforeText = before === null || before === undefined ? '' : String(before)
      const afterText = open.draft[column.name] ?? ''
      if (afterText === beforeText) continue
      // An emptied field becomes NULL on a nullable column, and an empty string
      // everywhere else — the grid cannot know which the user meant, and this is
      // the reading that cannot corrupt a number column.
      const info = columns.find((entry) => entry.name === column.name)
      changes[column.name] = afterText === '' && (info?.nullable ?? true) ? null : afterText
    }
    if (Object.keys(changes).length === 0) {
      setRowEditor(null)
      return
    }
    const key: Record<string, unknown> = {}
    for (const name of primaryKey) key[name] = row[name]
    setSavingRow(true)
    try {
      await api.updateRow({ ...scope, key, changes })
      notify(t('rowSaved'), 'success')
      setRowEditor(null)
      reload()
    } catch (cause) {
      notify(cause instanceof Error ? cause.message : String(cause), 'error')
    } finally {
      setSavingRow(false)
    }
  }

  const selectCell = (row: number, column: number, extend: boolean): void => {
    setSelection((current) =>
      extend && current
        ? { top: Math.min(current.top, row), left: Math.min(current.left, column), bottom: Math.max(current.bottom, row), right: Math.max(current.right, column) }
        : { top: row, left: column, bottom: row, right: column },
    )
  }

  const onKeyDown = (event: React.KeyboardEvent): void => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'c') {
      event.preventDefault()
      void copySelection()
      return
    }
    if (!selection) return
    const moves: Record<string, [number, number]> = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] }
    const move = moves[event.key]
    if (!move) return
    event.preventDefault()
    const top = Math.max(0, Math.min(rows.length - 1, selection.top + move[0]))
    const left = Math.max(0, Math.min(gridColumns.length - 1, selection.left + move[1]))
    selectCell(top, left, event.shiftKey)
  }

  const header = gridColumns.map((column, index) => (
    <th
      key={column.name}
      className={sort.column === column.name ? 'dg-th-sorted' : ''}
      onClick={() => toggleSort(column.name)}
      title={column.name}
    >
      {column.name}
      {sort.column === column.name ? <span className="dg-sortmark">{sort.dir === 'desc' ? '▼' : '▲'}</span> : null}
      {/* A real glyph, not the ⚿ character: that codepoint has no coverage in
          the UI fonts and rendered as a tofu box. */}
      {primaryKey.includes(column.name) ? (
        <span className="dg-colkey" title={t('primaryKey')}>
          <Icon name="key" size={10} />
        </span>
      ) : null}
      <span
        className="dg-colresize"
        onMouseDown={(event) => {
          event.stopPropagation()
          const startX = event.clientX
          const cell = (event.target as HTMLElement).parentElement
          const startWidth = cell?.offsetWidth ?? 160
          const move = (moveEvent: MouseEvent): void => {
            if (cell) cell.style.width = `${Math.max(60, startWidth + moveEvent.clientX - startX)}px`
          }
          const up = (): void => {
            window.removeEventListener('mousemove', move)
            window.removeEventListener('mouseup', up)
          }
          window.addEventListener('mousemove', move)
          window.addEventListener('mouseup', up)
        }}
        onClick={(event) => event.stopPropagation()}
      />
    </th>
  ))

  return (
    <div className="dg-content">
      {readOnly ? <Banner tone="info">{t('noPrimaryKey')}</Banner> : null}
      {error ? (
        <Banner tone="error" onClose={() => setError('')}>
          {error}
        </Banner>
      ) : null}
      <div className="dg-subbar">
        <Button
          size="sm"
          active={Boolean(where)}
          onClick={() => {
            const next = buildWhere(engine, { joiner, conditions })
            setWhereDraft(next)
            setWhere(next)
            setPage(1)
          }}
        >
          <Icon name="filter" size={11} />
          {t('filter')}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setBuilderOpen((value) => !value)}>
          {t('filterBuilder')}
        </Button>
        <Input
          value={whereDraft}
          placeholder={t('rawWhere')}
          style={{ flex: 1, minWidth: 120, maxWidth: 380 }}
          onChange={(event) => setWhereDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              setWhere(whereDraft)
              setPage(1)
            }
          }}
        />
        {where ? (
          <Button size="sm" variant="ghost" onClick={() => { setWhereDraft(''); setWhere(''); setConditions([]); setPage(1) }}>
            {t('clear')}
          </Button>
        ) : null}
        {onNewQuery && engine !== 'redis' ? (
          <Button size="sm" variant="tonal" onClick={onNewQuery} title={t('newQuery')}>
            <Icon name="play" size={10} />
            {t('newQuery')}
          </Button>
        ) : null}
        <div className="dg-spacer" />
        <span className="dg-chip" title={data?.totalKind === 'estimate' ? t('estimatedTotal') : undefined}>
          {data?.totalKind === 'estimate' ? '≈ ' : ''}
          <b>{total}</b> {t('rows')}
        </span>
        <IconButton icon="refresh" title={t('refresh')} onClick={reload} />
        <Button size="sm" variant="ghost" onClick={() => void insertRow()}>
          {t('insertRow')}
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept=".csv,text/csv"
          style={{ display: 'none' }}
          onChange={(event) => {
            const file = event.target.files?.[0]
            if (file) void importFile(file)
            // Allow importing the same file twice in a row.
            event.target.value = ''
          }}
        />
        <Button size="sm" variant="ghost" disabled={importing} onClick={() => fileRef.current?.click()}>
          {importing ? <Spinner /> : null}
          {t('importCsv')}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={(event) => {
            const box = event.currentTarget.getBoundingClientRect()
            setColumnMenu({ x: box.left, y: box.bottom + 2 })
          }}
        >
          {t('columnChooser')}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={(event) => {
            const box = event.currentTarget.getBoundingClientRect()
            setExportMenu({ x: box.left, y: box.bottom + 2 })
          }}
        >
          {t('exportAs')}
        </Button>
      </div>
      {builderOpen ? (
        <div className="dg-subbar" style={{ gap: 6, flexWrap: 'wrap' }}>
          <Select value={joiner} onChange={(event) => setJoiner(event.target.value as 'AND' | 'OR')}>
            <option value="AND">{t('matchAll')}</option>
            <option value="OR">{t('matchAny')}</option>
          </Select>
          {conditions.map((condition, index) => (
            <span key={index} className="dg-row" style={{ gap: 3 }}>
              <Select
                value={condition.column}
                
                onChange={(event) =>
                  setConditions((current) => current.map((entry, position) => (position === index ? { ...entry, column: event.target.value } : entry)))
                }
              >
                {columns.map((column) => (
                  <option key={column.name} value={column.name}>
                    {column.name}
                  </option>
                ))}
              </Select>
              <Select
                value={condition.op}
                
                onChange={(event) =>
                  setConditions((current) =>
                    current.map((entry, position) => (position === index ? { ...entry, op: event.target.value as FilterOperator } : entry)),
                  )
                }
              >
                {FILTER_OPERATORS.map((op) => (
                  <option key={op} value={op}>
                    {op}
                  </option>
                ))}
              </Select>
              <Input
                value={condition.value}
                style={{ width: 120 }}
                onChange={(event) =>
                  setConditions((current) => current.map((entry, position) => (position === index ? { ...entry, value: event.target.value } : entry)))
                }
              />
              <IconButton icon="x" title={t('delete')} size={10} onClick={() => setConditions((current) => current.filter((_e, p) => p !== index))} />
            </span>
          ))}
          <Button size="sm" onClick={() => setConditions((current) => current.concat({ column: columns[0]?.name ?? '', op: '=', value: '' }))}>
            <Icon name="plus" size={10} />
            {t('addCondition')}
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={() => {
              setWhere(buildWhere(engine, { joiner, conditions }))
              setPage(1)
            }}
          >
            {t('apply')}
          </Button>
        </div>
      ) : null}
      <div className="dg-grid-wrap">
        {loading && !data ? <div className="dg-sqlmsg"><Spinner label={t('loading')} /></div> : null}
        {data && rows.length === 0 ? <Empty title={t('emptyTable')} /> : null}
        {data && rows.length > 0 ? (
          <table className="dg-grid" ref={gridRef} tabIndex={0} onKeyDown={onKeyDown}>
            <thead>
              <tr>
                <th className="dg-rownum">#</th>
                {header}
                <th style={{ width: 26 }} />
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td
                    className={`dg-rownum${readOnly ? '' : ' dg-rownum-editable'}`}
                    title={readOnly ? undefined : t('editRow')}
                    onClick={() => openRowEditor(rowIndex)}
                  >
                    {(page - 1) * pageSize + rowIndex + 1}
                  </td>
                  {gridColumns.map((column, columnIndex) => {
                    const cell = displayValue(row[column.name], t('null'))
                    const selected =
                      selection && rowIndex >= selection.top && rowIndex <= selection.bottom && columnIndex >= selection.left && columnIndex <= selection.right
                    if (editing && editing.row === rowIndex && editing.column === columnIndex) {
                      return (
                        <td key={column.name} className="dg-cell-editing">
                          <input
                            autoFocus
                            value={editing.value}
                            onChange={(event) => setEditing({ ...editing, value: event.target.value })}
                            onBlur={() => void commitEdit(rowIndex, columnIndex, row[column.name])}
                            onKeyDown={(event) => {
                              if (event.key === 'Enter') {
                                event.preventDefault()
                                void commitEdit(rowIndex, columnIndex, row[column.name])
                              }
                              if (event.key === 'Escape') setEditing(null)
                            }}
                          />
                        </td>
                      )
                    }
                    return (
                      <td
                        key={column.name}
                        className={`${selected ? 'dg-cell-selected' : ''}${cell.isNull ? ' dg-null' : ''}${
                          /int|numeric|decimal|real|double|float|money/i.test(column.type ?? '') ? ' dg-cell-num' : ''
                        }`}
                        title={cell.isNull ? t('null') : cell.text}
                        onMouseDown={(event) => {
                          dragging.current = true
                          gridRef.current?.focus()
                          selectCell(rowIndex, columnIndex, event.shiftKey)
                          const up = (): void => {
                            dragging.current = false
                            window.removeEventListener('mouseup', up)
                          }
                          window.addEventListener('mouseup', up)
                        }}
                        onMouseEnter={() => {
                          if (dragging.current) selectCell(rowIndex, columnIndex, false)
                        }}
                        onDoubleClick={() => {
                          if (readOnly) return notify(t('noPrimaryKey'), 'error')
                          setEditing({ row: rowIndex, column: columnIndex, value: cell.isNull ? '' : String(row[column.name]) })
                        }}
                      >
                        {cell.text}
                      </td>
                    )
                  })}
                  <td>
                    <IconButton icon="trash" title={t('deleteRow')} size={11} onClick={() => void removeRow(rowIndex)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
      <div className="dg-pager">
        <IconButton icon="chevronLeft" title={t('prev')} size={11} disabled={page <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))} />
        <span>{fmt(t('page'), { page, pages })}</span>
        <IconButton icon="chevron" title={t('next')} size={11} disabled={page >= pages} onClick={() => setPage((value) => Math.min(pages, value + 1))} />
        <div className="dg-spacer" />
        {aggregate && aggregate.cells > 0 ? (
          <>
            <span className="dg-chip">{fmt(t('selection'), { n: aggregate.cells })}</span>
            {aggregate.count > 0 ? <span className="dg-chip">{t('sum')} <b>{aggregate.sum.toFixed(2)}</b></span> : null}
            {aggregate.count > 0 ? <span className="dg-chip">{t('avg')} <b>{aggregate.avg.toFixed(2)}</b></span> : null}
          </>
        ) : null}
        <span>{t('pageSize')}</span>
        <Select
          value={String(pageSize)}
          onChange={(event) => {
            setPageSize(Number(event.target.value))
            setPage(1)
          }}
        >
          {PAGE_SIZES.map((size) => (
            <option key={size} value={String(size)}>
              {size}
            </option>
          ))}
        </Select>
      </div>
      {columnMenu ? (
        <Menu
          x={columnMenu.x}
          y={columnMenu.y}
          onClose={() => setColumnMenu(null)}
          items={[
            ...(data?.columns ?? []).map((column) => {
              /* A tick means "shown", which is the convention every column
                 picker uses; the old `·` prefix read as a stray character. */
              const shown = !hiddenColumns.includes(column.name)
              return {
                label: column.name,
                icon: shown ? 'check' : undefined,
                onClick: () =>
                  setHiddenColumns((current) =>
                    current.includes(column.name)
                      ? current.filter((name) => name !== column.name)
                      : current.concat(column.name),
                  ),
              }
            }),
            ...(hiddenColumns.length > 0
              ? [{ separator: true }, { label: t('showAll'), icon: 'columns', onClick: () => setHiddenColumns([]) }]
              : []),
          ]}
        />
      ) : null}
      {exportMenu ? (
        <Menu
          x={exportMenu.x}
          y={exportMenu.y}
          onClose={() => setExportMenu(null)}
          items={[
            { label: t('exportCsv'), onClick: () => void exportAs('csv') },
            { label: t('exportJson'), onClick: () => void exportAs('json') },
            { label: t('exportInsert'), onClick: () => void exportAs('insert') },
            { label: t('exportMarkdown'), onClick: () => void exportAs('markdown') },
          ]}
        />
      ) : null}
      {rowEditor ? (
        <Modal
          title={`${t('editRow')} · ${(page - 1) * pageSize + rowEditor.rowIndex + 1}`}
          width={560}
          busy={savingRow}
          onClose={() => setRowEditor(null)}
          footer={
            <>
              <Button onClick={() => setRowEditor(null)}>{t('cancel')}</Button>
              <Button variant="primary" disabled={savingRow} onClick={() => void saveRowEditor()}>
                {t('save')}
              </Button>
            </>
          }
        >
          <div className="dg-form">
            {editorFields.map((column) => {
              const value = rowEditor.draft[column.name] ?? ''
              const change = (next: string): void =>
                setRowEditor((current) =>
                  current ? { ...current, draft: { ...current.draft, [column.name]: next } } : current,
                )
              return (
                <Field key={column.name} label={`${column.name}${column.primaryKey ? ' · PK' : ''}`}>
                  {isLongText(column.type) ? (
                    <TextArea rows={3} value={value} onChange={(event) => change(event.target.value)} />
                  ) : (
                    <Input
                      value={value}
                      placeholder={column.nullable ? t('null') : ''}
                      onChange={(event) => change(event.target.value)}
                    />
                  )}
                </Field>
              )
            })}
          </div>
        </Modal>
      ) : null}
    </div>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * The structure of the open table.
 *
 * It renders the description the tab already fetched, so switching to this view
 * costs nothing; Refresh asks for a new one.
 */
function StructureView({
  t,
  meta,
  error: describeError,
  onRefresh,
}: {
  t: (k: string) => string
  meta: DescribeResult | null
  error: string
  onRefresh: () => void
}): JSX.Element {
  const data = meta
  if (describeError) return <Banner tone="error">{describeError}</Banner>
  if (!data) return <div className="dg-sqlmsg"><Spinner label={t('loading')} /></div>

  return (
    <div className="dg-struct">
      <div className="dg-struct-col dg-struct-col-fields">
        <div className="dg-struct-head">
          {t('columns')}
          <span className="dg-badge">{data.columns.length}</span>
          <div className="dg-spacer" />
          {/* The description is shared with the data view, so this is the only
              place that can ask for a fresh one. */}
          <IconButton icon="refresh" title={t('refresh')} size={11} onClick={onRefresh} />
        </div>
        <div className="dg-struct-body" style={{ padding: 0 }}>
          {/* Fixed layout with declared widths: the four columns used to force
              the table wider than its pane, so Default was clipped and the pane
              grew a horizontal scrollbar. */}
          <table className="dg-grid dg-grid-fixed" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ width: '30%' }}>{t('name')}</th>
                <th style={{ width: '34%' }}>{t('type')}</th>
                <th style={{ width: '12%' }}>{t('nullable')}</th>
                <th style={{ width: '24%' }}>{t('default')}</th>
              </tr>
            </thead>
            <tbody>
              {data.columns.map((column) => (
                <tr key={column.name}>
                  <td>
                    <span className="dg-row">
                      {column.primaryKey ? <Icon name="key" size={10} /> : null}
                      <span className="dg-mono dg-truncate">{column.name}</span>
                    </span>
                  </td>
                  <td className="dg-mono dg-truncate" title={column.type}>
                    {column.type}
                  </td>
                  <td>{column.nullable ? 'YES' : 'NO'}</td>
                  <td className="dg-mono dg-truncate" title={column.defaultValue ?? ''}>
                    {column.defaultValue === null ? '—' : String(column.defaultValue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="dg-struct-col dg-struct-col-indexes">
        <div className="dg-struct-head">
          {t('indexes')}
          <span className="dg-badge">{data.indexes.length}</span>
        </div>
        <div className="dg-struct-body">
          {data.indexes.length === 0 ? (
            <div className="dg-muted">{t('noIndexes')}</div>
          ) : (
            data.indexes.map((index) => (
              <div key={index.name} className="dg-idx">
                {index.primary ? <Icon name="key" size={10} /> : null}
                <span className="dg-mono">{index.name}</span>
                <span className="dg-tag">{index.unique ? 'unique' : 'index'}</span>
                <span className="dg-muted dg-truncate">{index.columns.join(', ')}</span>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="dg-struct-col dg-struct-col-ddl">
        <div className="dg-struct-head">{t('ddl')}</div>
        <div className="dg-struct-body">
          <pre className="dg-pre">{data.ddl || '—'}</pre>
        </div>
      </div>
    </div>
  )
}

/** Build the SQL that opens a table in the console. */
export function selectFrom(engine: string, table: string): string {
  return `SELECT * FROM ${quoteIdent(engine, table)} LIMIT 100;`
}
