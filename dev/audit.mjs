/**
 * Run the visual audit against the harness in headless Edge.
 *
 * One browser, one page, one navigation per case; `dev/audit-page.js` is
 * evaluated in the page and the measurements are printed as a table. This is the
 * objective counterpart to a screenshot: it answers "is this text readable",
 * "do these two surfaces differ", "is hover visible", in numbers.
 *
 * Usage:
 *   node dev/audit.mjs                       # every case
 *   node dev/audit.mjs --views table,sql --themes light
 */

import { spawn, spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')

const args = process.argv.slice(2)
const option = (name, fallback) => {
  const index = args.indexOf('--' + name)
  return index === -1 ? fallback : args[index + 1]
}

const views = option('views', 'tree,table,structure,sql,dialog,filter,redis').split(',').filter(Boolean)
const themes = option('themes', 'light,dark').split(',').filter(Boolean)
const width = Number(option('width', 1680))
const height = Number(option('height', 1000))
const port = Number(option('port', 9341))

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
/* A throwaway profile per run. A shared one is a trap: Edge hands a second
   launch off to the instance that already owns the directory, so the debugging
   port is never opened and the run fails with "no debugging target". */
const profile = mkdtempSync(join(tmpdir(), 'dsh-grid-audit-'))
const auditScript = readFileSync(join(here, 'audit-page.js'), 'utf8')
const sleep = (ms) => new Promise((done) => setTimeout(done, ms))

const browser = spawn(
  EDGE,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--allow-file-access-from-files',
    '--remote-debugging-port=' + port,
    '--user-data-dir=' + profile,
    'about:blank',
  ],
  { stdio: ['ignore', 'ignore', 'pipe'] },
)

let browserStderr = ''
browser.stderr?.on('data', (chunk) => {
  browserStderr += String(chunk)
  if (browserStderr.length > 4000) browserStderr = browserStderr.slice(-4000)
})

let socket = null
let nextId = 0
const pending = new Map()

const send = (method, params = {}) =>
  new Promise((done, fail) => {
    const id = ++nextId
    pending.set(id, { done, fail })
    socket.send(JSON.stringify({ id, method, params }))
    setTimeout(() => {
      if (pending.has(id)) {
        pending.delete(id)
        fail(new Error('timeout: ' + method))
      }
    }, 25000)
  })

async function connect() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch('http://127.0.0.1:' + port + '/json/list')
      const targets = await response.json()
      const page = targets.find((target) => target.type === 'page')
      if (page && page.webSocketDebuggerUrl) return page.webSocketDebuggerUrl
    } catch {
      // still starting
    }
    await sleep(200)
  }
  throw new Error('the browser did not expose a debugging target. ' + browserStderr.trim().slice(0, 600))
}

async function evaluate(expression) {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: false })
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text + ' ' + (result.exceptionDetails.exception?.description ?? ''))
  return result.result?.value
}

const pad = (value, widthTo) => String(value).padEnd(widthTo)

async function main() {
  socket = new WebSocket(await connect())
  await new Promise((done, fail) => {
    socket.addEventListener('open', done, { once: true })
    socket.addEventListener('error', fail, { once: true })
  })
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data)
    if (message.id && pending.has(message.id)) {
      const entry = pending.get(message.id)
      pending.delete(message.id)
      if (message.error) entry.fail(new Error(message.error.message))
      else entry.done(message.result)
    }
  })

  await send('Page.enable')
  await send('Runtime.enable')
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false })

  const report = []
  for (const theme of themes) {
    for (const view of views) {
      const url =
        'file:///' + join(root, 'dev', 'harness.html').replace(/\\/g, '/') + '?view=' + view + '&theme=' + theme
      await send('Page.navigate', { url })
      let ready = null
      for (let attempt = 0; attempt < 90; attempt += 1) {
        await sleep(150)
        ready = await evaluate('window.__GRID_METRICS__ ? 1 : 0')
        if (ready) break
      }
      if (!ready) {
        report.push({ theme, view, error: 'harness never reported metrics' })
        continue
      }
      const audit = await evaluate(auditScript)
      const metrics = await evaluate('window.__GRID_METRICS__')
      report.push({ theme, view, ...audit, overflow: metrics?.overflowing ?? [], docOverflow: Boolean(metrics?.docOverflow) })
    }
  }

  /* -- readable output ---------------------------------------------------- */
  const lines = []
  lines.push('view        theme  text  <4.5  worst-text            icon<3  min-surface-delta  min-feedback  targets<24  font-sizes')
  for (const entry of report) {
    if (entry.error) {
      lines.push(pad(entry.view, 12) + pad(entry.theme, 7) + entry.error)
      continue
    }
    const worstText = entry.text.worst[0] ? `${entry.text.worst[0].ratio} ${entry.text.worst[0].element}` : '-'
    const minSurface = entry.surfaces.length ? Math.min(...entry.surfaces.map((s) => s.delta)) : NaN
    const minFeedback = entry.feedback.length ? Math.min(...entry.feedback.map((s) => s.delta)) : NaN
    lines.push(
      pad(entry.view, 12) +
        pad(entry.theme, 7) +
        pad(entry.text.total, 6) +
        pad(entry.text.below, 6) +
        pad(worstText, 22) +
        pad(entry.icons.thin, 8) +
        pad(Number.isNaN(minSurface) ? '-' : minSurface, 19) +
        pad(Number.isNaN(minFeedback) ? '-' : minFeedback, 14) +
        pad(entry.targets.count, 12) +
        (entry.fontSizes || []).join(','),
    )
  }
  console.log(lines.join('\n'))
  console.log('\n--- detail ---------------------------------------------------------')
  for (const entry of report) {
    if (entry.error) continue
    const bad = entry.surfaces.filter((s) => s.delta < 0.01)
    const faint = entry.feedback.filter((s) => s.delta < 0.012)
    if (bad.length || faint.length || entry.text.below || entry.icons.thin || entry.targets.count || entry.tofu.length) {
      console.log(`\n${entry.view} / ${entry.theme}`)
      for (const entry2 of entry.surfaces) console.log(`  surface ${pad(entry2.pair, 40)} ${entry2.a} vs ${entry2.b}  Δl=${entry2.delta}`)
      for (const item of entry.feedback) console.log(`  feedback ${pad(item.token, 18)} Δl=${item.delta}  ${item.colour}`)
      for (const item of entry.text.worst) console.log(`  text ${item.ratio}  ${item.size}px  ${item.element}  ${item.fg} on ${item.bg}`)
      for (const item of entry.icons.worst) console.log(`  icon ${item.ratio}  ${item.element}`)
      for (const item of entry.targets.below24) console.log(`  target ${item.w}×${item.h}  ${item.element}`)
      if (entry.overflow.length) console.log('  overflow:', entry.overflow.join(', '))
      for (const item of entry.stray) console.log(`  stray .${item.className} flex=${item.flex} overflow=${item.overflow}`)
      if (entry.tofu.length) console.log(`  tofu glyph in: ${entry.tofu.join(', ')}`)
      if (entry.colkey.count) console.log(`  primary-key marks: ${entry.colkey.count}, drawn as SVG: ${entry.colkey.drawing}`)
    }
  }
  const failed = report.filter((entry) => !entry.error && (entry.text.below > 0 || entry.icons.thin > 0))
  const flat = report.filter(
    (entry) => !entry.error && entry.surfaces.some((s) => s.delta < 0.01 && /dg-tree|dg-toolbar|dg-tabs|dg-subbar/.test(s.pair)),
  )
  const marked = report.filter((entry) => !entry.error && entry.colkey?.count > 0)
  const drawn = marked.filter((entry) => entry.colkey.drawing).length
  const tofuCases = report.filter((entry) => !entry.error && entry.tofu?.length)
  console.log(
    `\nsummary: ${report.length} cases, ${failed.length} with contrast failures, ${flat.length} with a flat pane, ` +
      `${report.filter((entry) => !entry.error && entry.targets.count > 0).length} with a sub-24px target, ` +
      `${tofuCases.length} with an uncovered glyph; primary-key marks drawn as SVG in ${drawn}/${marked.length} cases`,
  )
  if (process.env.AUDIT_STRICT && (failed.length || flat.length)) process.exitCode = 1
}

main()
  .catch((error) => {
    console.error('FAILED', error.message)
    process.exitCode = 1
  })
  .finally(async () => {
    try {
      socket && socket.close()
    } catch {}
    /* Edge spawns a tree of helper processes; killing only the one we started
       leaves renderers holding the profile and the next run cannot start. */
    if (browser.pid) spawnSync('taskkill', ['/PID', String(browser.pid), '/T', '/F'], { stdio: 'ignore' })
    await sleep(300)
    rmSync(profile, { recursive: true, force: true })
  })
