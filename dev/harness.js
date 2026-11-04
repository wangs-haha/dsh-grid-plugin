/* Drives the real client.js against the fixture backend so the panel can be
   rendered, measured and screenshotted outside DSH. Not shipped with the plugin. */

;(function () {
  const params = new URLSearchParams(location.search)
  const view = params.get('view') || 'tree'
  const theme = params.get('theme') || 'dark'
  const dump = params.get('dump') === '1'
  if (theme === 'light') document.body.classList.add('light')

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
  const factory = window.__MODULE_FACTORY__
  if (!factory) {
    document.body.textContent = 'client.js did not register a factory'
    return
  }

  const module = factory((name) => {
    if (name === 'react') return window.React
    if (name === 'react-dom') return window.ReactDOM
    if (name === 'react/jsx-runtime') return window.ReactJSXRuntime
    throw new Error('unexpected module ' + name)
  })

  /** @type {Record<string, Function>} */
  const captured = {}
  let dictionaries = null
  const ctx = {
    effect: (callback) => callback(),
    locale: {
      register(_namespace, value) {
        dictionaries = value
      },
      bind() {
        return (key) => (dictionaries && dictionaries.zh && dictionaries.zh[key]) || key
      },
    },
    slots: {
      inject(_owner, callback) {
        callback()
      },
      register(options, component) {
        captured[options.name + ':' + (options.key || options.id || '')] = component
        return () => {}
      },
    },
  }
  module.apply(ctx)
  window.__HARNESS_KEYS__ = Object.keys(captured)

  const Panel = captured['main:grid'] || captured['main:']
  const t = (key) => (dictionaries && dictionaries.zh && dictionaries.zh[key]) || key
  window.ReactDOM.createRoot(document.getElementById('root')).render(window.React.createElement(Panel, { t }))

  const click = (element) =>
    element.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true }))
  const dblclick = (element) =>
    element.dispatchEvent(new window.MouseEvent('dblclick', { bubbles: true, cancelable: true }))

  async function waitFor(predicate, timeout = 6000) {
    const started = Date.now()
    while (Date.now() - started < timeout) {
      const value = predicate()
      if (value) return value
      await sleep(40)
    }
    return null
  }

  const textOf = (element) => (element ? element.textContent || '' : '')
  const findByText = (selector, text) => [...document.querySelectorAll(selector)].find((el) => textOf(el).includes(text))

  const drivers = {
    async empty() {},
    async tree() {
      const row = await waitFor(() => document.querySelector('.dg-trow'))
      if (row) click(row)
      await sleep(400)
    },
    async objects() {
      await drivers.tree()
      const database = await waitFor(() => findByText('.dg-trow', 'shop'))
      if (database) click(database)
      await sleep(300)
      // The relations list is a toolbar action, not the middle column the old
      // layout had: this driver used to wait for `.dg-objtable`, which no longer
      // exists, so every view built on it silently stopped at the overview.
      const tables = await waitFor(() => findByText('button', '表'))
      if (tables) click(tables)
      await waitFor(() => document.querySelector('.dg-list tbody tr'))
    },
    async table() {
      await drivers.objects()
      const rows = [...document.querySelectorAll('.dg-list tbody tr')]
      const row = rows.find((entry) => textOf(entry).includes('users')) || rows[0]
      if (row) dblclick(row)
      await waitFor(() => document.querySelector('.dg-grid tbody tr'))
    },
    async structure() {
      await drivers.table()
      const button = await waitFor(() => findByText('button', '结构'))
      if (button) click(button)
      await sleep(400)
    },
    async sql() {
      await drivers.objects()
      const button = await waitFor(() => findByText('button', '新建查询'))
      if (button) click(button)
      const area = await waitFor(() => document.querySelector('.dg-sql-text'))
      if (area) {
        const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set
        setter.call(
          area,
          "SELECT u.id, u.email, u.plan, u.mrr\nFROM users u\nWHERE u.status = 'active'\n  AND u.mrr > 0\nORDER BY u.mrr DESC\nLIMIT 100;",
        )
        area.dispatchEvent(new window.Event('input', { bubbles: true }))
      }
      await sleep(300)
      const run = await waitFor(() => findByText('button', '执行'))
      if (run) click(run)
      await sleep(500)
    },
    async redis() {
      const rows = await waitFor(() => document.querySelectorAll('.dg-trow'))
      const redisRow = [...rows].find((row) => textOf(row).includes('Redis'))
      if (redisRow) click(redisRow)
      await sleep(400)
      const db = await waitFor(() => findByText('.dg-trow', 'db0'))
      if (db) click(db)
      await waitFor(() => document.querySelector('.dg-rkey'))
      const key = await waitFor(() => findByText('.dg-rkey', 'user:1001:profile'))
      if (key) click(key)
      await sleep(400)
    },
    async dialog() {
      const button = await waitFor(() => findByText('button', '新建连接'))
      if (button) click(button)
      await waitFor(() => document.querySelector('.dg-modal'))
    },
    async filter() {
      await drivers.table()
      // The filter builder is an inline row, not a modal.
      const button = await waitFor(() => findByText('button', '筛选构建器'))
      if (button) click(button)
      await waitFor(() => document.querySelector('.dg-subbar select'))
    },
  }

  /** Page geometry, used as the objective UI check in place of a human eye. */
  function collectMetrics() {
    const box = (selector) => {
      const element = document.querySelector(selector)
      if (!element) return null
      const rect = element.getBoundingClientRect()
      return {
        x: Math.round(rect.x),
        y: Math.round(rect.y),
        w: Math.round(rect.width),
        h: Math.round(rect.height),
        scrollW: element.scrollWidth,
        scrollH: element.scrollHeight,
      }
    }
    const overflowing = []
    const scrollable = (element) => {
      for (let node = element.parentElement; node && node !== document.body; node = node.parentElement) {
        const overflow = window.getComputedStyle(node).overflowX
        if (overflow === 'auto' || overflow === 'scroll' || overflow === 'hidden') return true
      }
      return false
    }
    for (const element of document.querySelectorAll('.dg-root *')) {
      const rect = element.getBoundingClientRect()
      if (rect.width > 0 && rect.right > window.innerWidth + 1 && !scrollable(element)) {
        overflowing.push((element.className || element.tagName).toString().slice(0, 60))
        if (overflowing.length > 8) break
      }
    }
    return {
      viewport: { w: window.innerWidth, h: window.innerHeight },
      toolbar: box('.dg-toolbar'),
      tree: box('.dg-tree'),
      objects: box('.dg-objects'),
      main: box('.dg-main'),
      status: box('.dg-status'),
      grid: box('.dg-grid'),
      gridWrap: box('.dg-grid-wrap'),
      rows: document.querySelectorAll('.dg-grid tbody tr').length,
      objectRows: document.querySelectorAll('.dg-objtable tbody tr').length,
      tabs: document.querySelectorAll('.dg-tab').length,
      docOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      toolbarClipped: [...document.querySelectorAll('.dg-toolbar > *')].filter((element) => {
        const rect = element.getBoundingClientRect()
        return rect.width > 0 && rect.right > window.innerWidth + 1
      }).length,
      text: (document.querySelector('.dg-root') ? document.querySelector('.dg-root').innerText : '').slice(0, 900),
      overflowing,
      title: document.title,
    }
  }

  ;(async () => {
    await sleep(120)
    try {
      await (drivers[view] || drivers.tree)()
    } catch (error) {
      document.title = 'error: ' + (error && error.message)
    }
    await sleep(500)
    const metrics = collectMetrics()
    window.__GRID_METRICS__ = metrics
    if (dump) {
      const pre = document.createElement('pre')
      pre.id = 'report'
      pre.textContent = JSON.stringify(metrics)
      document.body.appendChild(pre)
    }
    document.title = 'ready:' + view
  })()
})()
