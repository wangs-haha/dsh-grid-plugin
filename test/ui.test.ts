/**
 * UI test: loads the built bundle in jsdom, renders the real panel and drives
 * the layout the user asked for — select a connection, select a database, open
 * the Tables list, open a table, run a query from the toolbar.
 */

import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

import { JSDOM, VirtualConsole } from 'jsdom'
import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import { Fragment, jsx, jsxs } from 'react/jsx-runtime'

const here = dirname(fileURLToPath(import.meta.url))
const dict = JSON.parse(readFileSync(join(here, '..', 'locale', 'en.json'), 'utf8')) as Record<string, string>
const t = (key: string): string => (typeof dict[key] === 'string' ? dict[key] : key)

/** Build a jsdom window and expose the globals the bundle expects. */
function setupDom() {
  // React 18 still ships its IE11 `input` polyfill, which reaches for
  // `activeElement.attachEvent` when it dispatches a change event itself. jsdom
  // has no such method, so the throw happens inside React's own dispatch and
  // changes nothing about the test — but the default virtual console prints a
  // stack for it. Everything else stays visible.
  const virtualConsole = new VirtualConsole()
  virtualConsole.on('jsdomError', (error: Error) => {
    if (/attachEvent/.test(String(error?.message ?? ''))) return
    console.error(error)
  })
  const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
    url: 'http://127.0.0.1:51018/',
    pretendToBeVisual: true,
    virtualConsole,
  })
  const { window } = dom
  Object.assign(globalThis, {
    window,
    document: window.document,
    self: window,
    HTMLElement: window.HTMLElement,
    Element: window.Element,
    MouseEvent: window.MouseEvent,
    Event: window.Event,
    KeyboardEvent: window.KeyboardEvent,
    Blob: window.Blob,
    requestAnimationFrame: (callback: (time: number) => void) => window.setTimeout(() => callback(Date.now()), 0),
    cancelAnimationFrame: (handle: number) => window.clearTimeout(handle),
  })
  Object.defineProperty(globalThis, 'navigator', { value: window.navigator, configurable: true })
  if (!globalThis.URL.createObjectURL) {
    globalThis.URL.createObjectURL = () => 'blob:test'
    globalThis.URL.revokeObjectURL = () => {}
  }
  ;(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true
  return window
}

/** How many times the bundle has been loaded; each load needs its own import. */
let bundleLoads = 0

/**
 * Load the built bundle through a fake module loader.
 *
 * The import is cache-busted per call: a module body runs once, and the second
 * test needs the bundle to register itself against *its* window.
 */
async function loadBundle(window: JSDOM['window']) {
  let factory: ((require: (name: string) => unknown) => unknown) | null = null
  ;(window as unknown as { __ModuleLoader__: unknown }).__ModuleLoader__ = {
    load(definition: { factory: typeof factory }) {
      factory = definition.factory
    },
  }
  bundleLoads += 1
  await import(`../dist/client.js?load=${bundleLoads}`)
  assert.ok(factory, 'the bundle registered a factory')
  return (factory as unknown as (require: (name: string) => unknown) => { inject: string[]; apply: (ctx: unknown) => void })((name) => {
    if (name === 'react') return React
    if (name === 'react-dom') return ReactDOM
    if (name === 'react/jsx-runtime') return { jsx, jsxs, Fragment }
    throw new Error(`unexpected module ${name}`)
  })
}

/** The panel component a loaded bundle registers. */
type PanelComponent = (props: { t: (key: string) => string }) => JSX.Element

/**
 * Apply a loaded bundle and hand back the panel it registered.
 * @param client - the bundle's exports.
 * @returns the panel component.
 */
function panelOf(client: { apply: (ctx: unknown) => void }): PanelComponent {
  let Panel: PanelComponent | null = null
  client.apply({
    effect: (callback: () => void) => callback(),
    locale: { register: () => undefined, bind: () => t },
    slots: {
      inject: (_owner: string, callback: () => void) => callback(),
      register: (options: { name: string }, component: PanelComponent) => {
        if (options.name === 'main') Panel = component
        return () => undefined
      },
    },
  })
  assert.ok(Panel, 'the bundle registered a main panel')
  return Panel
}

/**
 * Fixture backend replies, keyed by action.
 *
 * A reply may be a function, which lets a test delay or hold a response (used to
 * observe the busy state); everything else is returned as-is.
 */
const DEFAULT_REPLIES: Record<string, unknown> = {
    meta: {
      engines: [
        { id: 'sqlite', label: 'SQLite', package: null, defaultPort: 0, kind: 'file', fields: ['file'], description: 'Local file' },
        { id: 'mysql', label: 'MySQL', package: 'mysql2', defaultPort: 3306, kind: 'network', fields: ['host'], description: 'TCP' },
      ],
      allowWrites: false,
      bindings: [],
      workspaces: [{ id: 'w1', title: 'dsh-grid-plugin', path: 'D:/work/code/dsh-grid-plugin' }],
    },
    'connections.list': {
      connections: [
        {
          id: 'c1',
          name: 'Local fixture',
          engine: 'sqlite',
          group: 'dev',
          color: 'green',
          host: '',
          port: 0,
          user: '',
          database: '',
          file: 'C:/tmp/a.db',
          redisDb: 0,
          ssl: false,
          hasPassword: false,
          createdAt: '',
          updatedAt: '',
        },
      ],
    },
    'connections.connect': { ok: true, serverVersion: 'SQLite 3.51.2', engine: 'sqlite' },
    databases: { databases: [{ name: 'main', schemas: [] }] },
    tables: { tables: [{ name: 'users', kind: 'table', rows: 2, comment: 'People' }] },
    rows: {
      columns: [
        { name: 'id', type: 'INTEGER' },
        { name: 'name', type: 'TEXT' },
      ],
      rows: [
        { id: 1, name: 'Ada' },
        { id: 2, name: 'Lin' },
      ],
      total: 2,
      page: 1,
      pageSize: 100,
      durationMs: 3,
    },
    columns: {
      columns: [
        { name: 'id', type: 'INTEGER', nullable: false, defaultValue: null, primaryKey: true, ordinal: 0, comment: '', extra: '' },
        { name: 'name', type: 'TEXT', nullable: true, defaultValue: null, primaryKey: false, ordinal: 1, comment: '', extra: '' },
      ],
      indexes: [{ name: 'PRIMARY', columns: ['id'], unique: true, primary: true }],
      ddl: 'CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)',
    },
    sql: {
      results: [{ statement: 'select 1', columns: [{ name: 'x' }], rows: [{ x: 1 }], rowCount: 1, durationMs: 2 }],
      statementCount: 1,
      durationMs: 2,
    },
    'queries.list': { queries: [] },
    'queries.save': {
      query: { id: 'q1', name: 'demo', sql: 'select 1', connectionId: 'c1', database: 'main', scope: 'user', createdAt: '', updatedAt: '' },
    },
    routines: { routines: [] },
    accounts: { accounts: [] },
    export: {
      columns: [
        { name: 'id', type: 'INTEGER' },
        { name: 'name', type: 'TEXT' },
      ],
      rows: [
        { id: 1, name: 'Ada' },
        { id: 2, name: 'Lin' },
      ],
      truncated: false,
      total: 2,
    },
    'rows.update': { affected: 1 },
}

/**
 * Install a fixture backend that records every action.
 * @param overrides - replies that replace the defaults for this test.
 * @returns the recorded calls.
 */
function stubFetch(overrides: Record<string, unknown> = {}) {
  const calls: Array<Record<string, unknown>> = []
  const replies: Record<string, unknown> = { ...DEFAULT_REPLIES, ...overrides }
  ;(globalThis as unknown as { fetch: unknown }).fetch = async (_url: string, init: { body: string }) => {
    const body = JSON.parse(init.body) as Record<string, unknown>
    calls.push(body)
    const entry = replies[String(body.action)] ?? {}
    const value = typeof entry === 'function' ? await (entry as () => unknown)() : entry
    return { ok: true, status: 200, json: async () => ({ ok: true, ...(value as Record<string, unknown>) }) }
  }
  return calls
}

/** Dispatch a click React will see. */
function fire(element: Element, kind = 'click'): void {
  element.dispatchEvent(new window.MouseEvent(kind, { bubbles: true, cancelable: true }))
}

/** React's `act`, typed for this file. */
const act = (React as unknown as { act: (callback: () => Promise<void> | void) => Promise<void> }).act

/** Let effects, promises and timers settle. */
const flush = async (times = 4): Promise<void> => {
  for (let index = 0; index < times; index += 1) {
    // eslint-disable-next-line no-await-in-loop
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 5))
    })
  }
}

/** Find the first button whose trimmed label matches. */
function buttonByText(container: ParentNode, label: string): Element {
  const found = [...container.querySelectorAll('button')].find((button) => (button.textContent ?? '').trim() === label)
  assert.ok(found, `a "${label}" button is rendered`)
  return found
}

/** Read the React props attached to a DOM node. */
function props(element: Element): Record<string, Function> {
  const key = Object.keys(element).find((name) => name.startsWith('__reactProps$'))
  return key ? ((element as unknown as Record<string, Record<string, Function>>)[key] ?? {}) : {}
}

/** Set a controlled field through its own handler. */
function type(element: Element, value: string): void {
  props(element).onChange?.({ target: { value }, currentTarget: { value }, preventDefault() {}, stopPropagation() {} })
}

test('the panel boots, browses and queries', async () => {
  const window = setupDom()
  const client = await loadBundle(window)
  assert.deepEqual(client.inject, ['slots', 'locale'])

  const registered: string[] = []
  let Panel: ((props: { t: (key: string) => string }) => JSX.Element) | null = null
  const ctx = {
    effect: (callback: () => void) => callback(),
    locale: { register: () => undefined, bind: () => t },
    slots: {
      inject: (_owner: string, callback: () => void) => callback(),
      register: (options: { name: string }, component: typeof Panel) => {
        registered.push(options.name)
        if (options.name === 'main') Panel = component
        return () => undefined
      },
    },
  }
  client.apply(ctx)
  assert.deepEqual(registered, ['main', 'sidebar.panellist'])
  assert.ok(Panel)

  const calls = stubFetch()
  const container = window.document.getElementById('root') as HTMLElement
  const root = createRoot(container)

  await act(async () => {
    root.render(React.createElement(Panel as unknown as () => JSX.Element, { t }))
  })
  await flush()

  // The layout is two columns: one tree pane and one workbench. The old middle
  // `object list` column must not exist.
  assert.equal(container.querySelectorAll('.dg-tree').length, 1, 'one tree pane')
  assert.equal(container.querySelectorAll('.dg-main').length, 1, 'one workbench pane')
  assert.equal(container.querySelectorAll('.dg-objects').length, 0, 'no middle column')

  assert.match(container.textContent ?? '', /Local fixture/)
  assert.ok(calls.some((call) => call.action === 'meta'))

  // Select the connection: it connects and lists databases.
  await act(async () => {
    fire(container.querySelector('.dg-trow') as Element)
  })
  await flush()
  assert.ok(calls.some((call) => call.action === 'connections.connect'))
  assert.ok(calls.some((call) => call.action === 'databases'))

  // Select the database: an overview tab opens.
  const databaseRow = [...container.querySelectorAll('.dg-trow-db')][0]
  assert.ok(databaseRow, 'the database node is rendered')
  await act(async () => {
    fire(databaseRow)
  })
  await flush()
  assert.ok([...container.querySelectorAll('.dg-tab')].length >= 1)
  assert.match(container.textContent ?? '', /main/)

  // The Tables action opens the relation list for the selected database.
  const tablesButton = [...container.querySelectorAll('button')].find((button) => (button.textContent ?? '').trim() === 'Tables')
  assert.ok(tablesButton, 'the toolbar lists Tables')
  await act(async () => {
    fire(tablesButton)
  })
  await flush()
  assert.ok(calls.some((call) => call.action === 'tables'))
  assert.match(container.textContent ?? '', /users/)

  // Double-clicking a relation opens its data.
  const relationRow = container.querySelector('.dg-list tbody tr') as Element
  assert.ok(relationRow, 'the relation list renders rows')
  await act(async () => {
    fire(relationRow, 'dblclick')
  })
  await flush(5)
  assert.ok(calls.some((call) => call.action === 'rows'))
  assert.match(container.textContent ?? '', /Ada/)

  // New query opens the console; Ctrl+Enter runs it.
  const queryButton = [...container.querySelectorAll('button')].find((button) => (button.textContent ?? '').trim() === 'New query')
  assert.ok(queryButton, 'the toolbar offers a query tab')
  await act(async () => {
    fire(queryButton as Element)
  })
  await flush(2)
  const editor = container.querySelector('.dg-sql-text') as HTMLTextAreaElement
  assert.ok(editor, 'the SQL editor renders')
  await act(async () => {
    type(editor, 'select 1')
  })
  await act(async () => {
    props(editor).onKeyDown?.({
      key: 'Enter',
      ctrlKey: true,
      preventDefault() {},
      stopPropagation() {},
      currentTarget: editor,
      target: editor,
    })
  })
  await flush(4)
  const sqlCall = calls.filter((call) => call.action === 'sql').pop()
  assert.ok(sqlCall, 'the console ran the statement')
  assert.equal(sqlCall?.sql, 'select 1')
  assert.ok(container.querySelector('.dg-tok-keyword'), 'keywords are highlighted')
  await act(async () => {
    root.unmount()
  })
})

test('the grid pauses on filters, exports INSERT scripts and marks an estimated total', async () => {
  const window = setupDom()
  const client = await loadBundle(window)
  // A SQL run that is held open, so the console's busy state can be observed;
  // the second run reports a capped result.
  let releaseQuery: () => void = () => {}
  const heldQuery = new Promise<void>((resolve) => {
    releaseQuery = resolve
  })
  let sqlRuns = 0
  const calls = stubFetch({
    sql: async () => {
      sqlRuns += 1
      if (sqlRuns === 1) await heldQuery
      return {
        results: [
          {
            statement: 'select 1',
            columns: [{ name: 'x' }],
            rows: [{ x: 1 }],
            rowCount: 1,
            durationMs: 2,
            truncated: sqlRuns > 1,
          },
        ],
        statementCount: 1,
        durationMs: 2,
      }
    },
    rows: {
      columns: [
        { name: 'id', type: 'INTEGER' },
        { name: 'name', type: 'TEXT' },
      ],
      rows: [
        { id: 1, name: 'Ada' },
        { id: 2, name: 'Lin' },
      ],
      total: 42000,
      totalKind: 'estimate',
      page: 1,
      pageSize: 100,
      durationMs: 1,
    },
  })
  const Panel = panelOf(client)
  const container = window.document.getElementById('root') as HTMLElement
  const root = createRoot(container)

  await act(async () => {
    root.render(React.createElement(Panel, { t }))
  })
  await flush()

  // Walk to the grid: connection, database, tables, then open the relation.
  await act(async () => {
    fire(container.querySelector('.dg-trow') as Element)
  })
  await flush()
  await act(async () => {
    fire([...container.querySelectorAll('.dg-trow-db')][0] as Element)
  })
  await flush()
  await act(async () => {
    fire(buttonByText(container, 'Tables'))
  })
  await flush()
  await act(async () => {
    fire(container.querySelector('.dg-list tbody tr') as Element, 'dblclick')
  })
  await flush(5)

  // An estimated total is labelled as such instead of pretending to be counted.
  const countRows = (): number => calls.filter((call) => call.action === 'rows').length
  const estimateChip = [...container.querySelectorAll('.dg-chip')].find((chip) => /≈/.test(chip.textContent ?? ''))
  assert.ok(estimateChip, 'the total carries the estimate marker')
  assert.match(estimateChip.textContent ?? '', /42000/)
  assert.match(estimateChip.getAttribute('title') ?? '', /estimate/)

  // Selecting a cell reports the selection, which is what the aggregates hang off.
  const firstCell = container.querySelector('.dg-grid tbody td:not(.dg-rownum)') as Element
  assert.ok(firstCell, 'the grid renders cells')
  await act(async () => {
    firstCell.dispatchEvent(new window.MouseEvent('mousedown', { bubbles: true, cancelable: true }))
    window.dispatchEvent(new window.MouseEvent('mouseup', { bubbles: true }))
  })
  await flush(2)
  assert.ok(container.querySelector('.dg-cell-selected'), 'the cell is marked selected')
  // The chip has to show the count, not just the word "Selection".
  assert.match(container.querySelector('.dg-pager')?.textContent ?? '', /Selection 1/)

  // Double-clicking a cell edits it in place; Enter writes it back by primary key.
  // The first cell is the row-number gutter, so `name` is the third.
  const nameCell = container.querySelector('.dg-grid tbody tr td:nth-child(3)') as Element
  await act(async () => {
    fire(nameCell, 'dblclick')
  })
  await flush(2)
  const cellEditor = container.querySelector('.dg-cell-editing input') as HTMLInputElement
  assert.ok(cellEditor, 'the cell turns into an input')
  await act(async () => {
    type(cellEditor, 'Ada2')
  })
  await act(async () => {
    props(cellEditor).onKeyDown?.({
      key: 'Enter',
      preventDefault() {},
      stopPropagation() {},
      currentTarget: cellEditor,
      target: cellEditor,
    })
  })
  await flush(3)
  const update = calls.filter((call) => call.action === 'rows.update').pop()
  assert.ok(update, 'the edit was written back')
  assert.deepEqual(update.key, { id: 1 }, 'the row is addressed by its primary key')
  assert.deepEqual(update.changes, { name: 'Ada2' })

  // Insert row asks the Host for a row of defaults.
  await act(async () => {
    fire(buttonByText(container, 'Insert row'))
  })
  await flush(3)
  const inserted = calls.filter((call) => call.action === 'rows.insert').pop()
  assert.ok(inserted, 'the button inserts through the Host')
  assert.deepEqual(inserted.values, {}, 'an empty row, so the column defaults apply')

  // The row-number cell opens an editor with every field, and only the edited
  // field is written back.
  await act(async () => {
    fire(container.querySelector('.dg-grid tbody .dg-rownum') as Element)
  })
  await flush(2)
  const dialog = window.document.querySelector('[role="dialog"]') as HTMLElement | null
  assert.ok(dialog, 'the row editor opens')
  assert.match(dialog?.textContent ?? '', /Edit row/)
  const dialogFields = [...(dialog?.querySelectorAll('input, textarea') ?? [])] as Array<
    HTMLInputElement | HTMLTextAreaElement
  >
  assert.equal(dialogFields.length, 2, 'one field per column')
  assert.equal(dialogFields[0].value, '1', 'the primary key is shown')
  assert.equal(dialogFields[1].value, 'Ada')
  // An integer gets a single line; a TEXT column gets room to breathe.
  assert.equal(dialogFields[0].tagName, 'INPUT')
  assert.equal(dialogFields[1].tagName, 'TEXTAREA')
  await act(async () => {
    type(dialogFields[1], 'Ada3')
  })
  const updatesBefore = calls.filter((call) => call.action === 'rows.update').length
  await act(async () => {
    fire(buttonByText(dialog as Element, 'Save'))
  })
  await flush(3)
  const edits = calls.filter((call) => call.action === 'rows.update')
  assert.equal(edits.length, updatesBefore + 1, 'one update for the whole row')
  assert.deepEqual(edits.pop()?.changes, { name: 'Ada3' }, 'unchanged fields are not sent')
  assert.ok(!window.document.querySelector('[role="dialog"]'), 'the editor closes on save')

  // Switching to Structure reuses the description the tab already fetched: the
  // Data/Structure toggle must not cost another round trip.
  const describesBefore = calls.filter((call) => call.action === 'columns').length
  await act(async () => {
    fire(buttonByText(container, 'Structure'))
  })
  await flush(2)
  assert.match(container.textContent ?? '', /DDL|Indexes|Columns/)
  await act(async () => {
    fire(buttonByText(container, 'Data'))
  })
  await flush(2)
  assert.equal(
    calls.filter((call) => call.action === 'columns').length,
    describesBefore,
    'neither direction refetched the structure',
  )

  // The Columns menu hides a column without refetching, and Show all brings it back.
  const headerNames = (): string[] =>
    [...container.querySelectorAll('.dg-grid thead th')].map((th) => (th.textContent ?? '').trim())
  assert.ok(headerNames().some((name) => name.includes('name')))
  await act(async () => {
    fire(buttonByText(container, 'Columns'))
  })
  const rowsBeforeHide = countRows()
  const nameToggle = [...window.document.querySelectorAll('.dg-ctxitem')].find((item) =>
    (item.textContent ?? '').includes('name'),
  )
  assert.ok(nameToggle, 'the menu lists the columns')
  await act(async () => {
    fire(nameToggle)
  })
  await flush(2)
  assert.ok(!headerNames().some((name) => name.includes('name')), 'the column is hidden')
  assert.equal(countRows(), rowsBeforeHide, 'hiding a column is local, not a refetch')

  await act(async () => {
    fire(buttonByText(container, 'Columns'))
  })
  const showAll = [...window.document.querySelectorAll('.dg-ctxitem')].find((item) =>
    (item.textContent ?? '').includes('Show all'),
  )
  assert.ok(showAll, 'the menu offers Show all once something is hidden')
  await act(async () => {
    fire(showAll)
  })
  await flush(2)
  assert.ok(headerNames().some((name) => name.includes('name')), 'the column is back')

  // The filter builder composes a WHERE clause from its controls.
  await act(async () => {
    fire(buttonByText(container, 'Filter builder'))
  })
  await flush(2)
  await act(async () => {
    fire(buttonByText(container, 'Add condition'))
  })
  await flush(2)
  // The builder row is the subbar that owns the selects.
  const builder = [...container.querySelectorAll('.dg-subbar')].find((element) => element.querySelector('select')) as
    | HTMLElement
    | undefined
  assert.ok(builder, 'the builder row is rendered')
  // The first select is the AND/OR joiner; the second is the condition's column.
  const columnSelect = builder.querySelectorAll('select')[1] as Element
  await act(async () => {
    props(columnSelect).onChange?.({ target: { value: 'name' } })
  })
  const valueInput = builder.querySelectorAll('input')[0] as Element
  await act(async () => {
    type(valueInput, 'Ada')
  })
  await act(async () => {
    fire(buttonByText(container, 'Apply'))
  })
  await flush(3)
  assert.equal(
    calls.filter((call) => call.action === 'rows').pop()?.where,
    `"name" = 'Ada'`,
    'the builder produced a quoted predicate',
  )

  // Typing a filter must not fire a query per keystroke.
  const before = countRows()
  const raw = container.querySelector('input[placeholder="Raw WHERE"]') as Element
  assert.ok(raw, 'the raw WHERE box is rendered')
  for (const value of ['n', 'na', 'nam']) {
    // eslint-disable-next-line no-await-in-loop
    await act(async () => {
      type(raw, value)
    })
  }
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 120))
  })
  assert.equal(countRows(), before, 'three keystrokes inside the debounce window sent nothing')

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 400))
  })
  assert.equal(countRows(), before + 1, 'the pause sends exactly one request')
  assert.equal(calls.filter((call) => call.action === 'rows').pop()?.where, 'nam')

  // Export produces a real INSERT script for the current scope.
  let captured: Blob | null = null
  const realCreate = globalThis.URL.createObjectURL
  const anchorProto = window.HTMLAnchorElement.prototype
  const realClick = anchorProto.click
  globalThis.URL.createObjectURL = (blob: Blob) => {
    captured = blob
    return 'blob:test'
  }
  anchorProto.click = function noop(): void {}
  try {
    await act(async () => {
      fire(buttonByText(container, 'Export'))
    })
    const item = [...window.document.querySelectorAll('.dg-ctxitem')].find((button) =>
      /INSERT/.test(button.textContent ?? ''),
    )
    assert.ok(item, 'the export menu offers INSERT statements')
    await act(async () => {
      fire(item)
    })
    await flush(3)
  } finally {
    globalThis.URL.createObjectURL = realCreate
    anchorProto.click = realClick
  }
  assert.ok(captured, 'a file was produced')
  const text = await (captured as Blob).text()
  assert.match(text, /^INSERT INTO "main"\."users" \("id", "name"\) VALUES \(1, 'Ada'\);$/m)

  // Import: a CSV whose header matches the table becomes one batch insert.
  const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement
  assert.ok(fileInput, 'the grid offers a CSV file picker')
  const file = new window.File(['id,name\n3,Bea\n4,Cy\n'], 'rows.csv', { type: 'text/csv' })
  // Drive the handler rather than dispatching a DOM event: React 18 still runs
  // its IE-era `change` polyfill for inputs, which jsdom cannot satisfy.
  await act(async () => {
    props(fileInput).onChange?.({ target: { files: [file], value: '' } })
  })
  await flush(4)
  const batch = calls.filter((call) => call.action === 'rows.insertMany').pop()
  assert.ok(batch, 'the import posted a batch')
  assert.deepEqual(batch.rows, [
    { id: '3', name: 'Bea' },
    { id: '4', name: 'Cy' },
  ])

  // A column the table does not have is refused instead of silently dropped.
  const wrong = new window.File(['id,nickname\n5,Di\n'], 'wrong.csv', { type: 'text/csv' })
  const beforeWrong = calls.filter((call) => call.action === 'rows.insertMany').length
  await act(async () => {
    props(fileInput).onChange?.({ target: { files: [wrong], value: '' } })
  })
  await flush(4)
  assert.equal(
    calls.filter((call) => call.action === 'rows.insertMany').length,
    beforeWrong,
    'a mismatched header never reaches the database',
  )

  // While a script runs, the console offers Cancel, and Cancel reaches the Host.
  await act(async () => {
    fire(buttonByText(container, 'New query'))
  })
  await flush(2)
  const editor = container.querySelector('.dg-sql-text') as HTMLTextAreaElement
  assert.ok(editor, 'the SQL editor renders')
  await act(async () => {
    type(editor, 'select 1')
  })
  await act(async () => {
    fire(buttonByText(container, 'Run'))
  })
  await flush(2)
  await act(async () => {
    fire(buttonByText(container, 'Cancel'))
  })
  await flush(2)
  assert.ok(
    calls.some((call) => call.action === 'sql.cancel'),
    'the cancel button asks the Host to stop the statement',
  )
  await act(async () => {
    releaseQuery()
    await heldQuery
  })
  await flush(3)

  // Beautify reformats the script in place, clause per line.
  await act(async () => {
    type(editor, 'select id, name from users where id = 1')
  })
  await act(async () => {
    fire(buttonByText(container, 'Beautify'))
  })
  await flush(2)
  assert.match(editor.value, /\n\s+FROM/, 'the clause moved to its own line')

  // Ctrl+Space opens completion with suggestions for the current word.
  await act(async () => {
    type(editor, 'sel')
  })
  await act(async () => {
    props(editor).onKeyDown?.({
      key: ' ',
      ctrlKey: true,
      preventDefault() {},
      stopPropagation() {},
      currentTarget: editor,
      target: editor,
    })
  })
  await flush(2)
  const completion = container.querySelector('.dg-complete') as HTMLElement | null
  assert.ok(completion, 'completion opens on Ctrl+Space')
  assert.ok(
    (completion?.querySelectorAll('.dg-complete-item').length ?? 0) > 0,
    'completion offers at least one suggestion',
  )

  // A capped result says so instead of letting the row count speak for itself.
  await act(async () => {
    fire(buttonByText(container, 'Run'))
  })
  await flush(3)
  assert.match(container.textContent ?? '', /capped/, 'the console admits the result was cut off')

  await act(async () => {
    root.unmount()
  })
})
