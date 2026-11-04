/**
 * Render the UI harness in headless Edge and collect evidence.
 *
 * Uses the DevTools protocol over the built-in WebSocket so a single run can
 * return both the page geometry (for automated layout checks) and a PNG (for a
 * human to review). Not shipped with the plugin.
 *
 * Usage:
 *   node dev/cdp-shot.mjs --view table --out dev/shots/table.png
 *   node dev/cdp-shot.mjs --view sql --theme light --width 1280 --height 860
 */

import { spawn, spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
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

const view = option('view', 'tree')
const theme = option('theme', 'dark')
const width = Number(option('width', 1680))
const height = Number(option('height', 1050))
const outPath = option('out', join(root, 'dev', 'shots', view + '-' + theme + '.png'))
const dumpPath = option('metrics', join(root, 'dev', 'shots', view + '-' + theme + '.json'))
const port = Number(option('port', 9333))

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
/* A throwaway profile per run: a shared directory gets handed off to an
   instance that already owns it, which never opens the debugging port. */
const profile = mkdtempSync(join(tmpdir(), 'dsh-grid-shot-'))

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const url = 'file:///' + join(root, 'dev', 'harness.html').replace(/\\/g, '/') + '?view=' + view + '&theme=' + theme

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
  { stdio: 'ignore' },
)

let socket = null
let nextId = 0
const pending = new Map()

const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++nextId
    pending.set(id, { resolve, reject })
    socket.send(JSON.stringify({ id, method, params }))
    setTimeout(() => {
      if (pending.has(id)) {
        pending.delete(id)
        reject(new Error('timeout: ' + method))
      }
    }, 20000)
  })

async function connect() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch('http://127.0.0.1:' + port + '/json/list')
      const targets = await response.json()
      const page = targets.find((target) => target.type === 'page')
      if (page && page.webSocketDebuggerUrl) return page.webSocketDebuggerUrl
    } catch {
      // browser still starting
    }
    await sleep(250)
  }
  throw new Error('the browser did not expose a debugging target')
}

async function main() {
  const wsUrl = await connect()
  socket = new WebSocket(wsUrl)
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true })
    socket.addEventListener('error', reject, { once: true })
  })
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data)
    if (message.method === 'Runtime.exceptionThrown') {
      const details = message.params.exceptionDetails
      console.error('PAGE EXCEPTION:', details.text, details.exception && details.exception.description)
    }
    if (message.id && pending.has(message.id)) {
      const entry = pending.get(message.id)
      pending.delete(message.id)
      if (message.error) entry.reject(new Error(message.error.message))
      else entry.resolve(message.result)
    }
  })

  await send('Page.enable')
  await send('Runtime.enable')
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false })
  await send('Page.navigate', { url })

  let metrics = null
  for (let attempt = 0; attempt < 80; attempt += 1) {
    await sleep(200)
    const result = await send('Runtime.evaluate', {
      expression: 'window.__GRID_METRICS__ ? JSON.stringify(window.__GRID_METRICS__) : null',
      returnByValue: true,
    })
    const value = result.result && result.result.value
    if (value) {
      metrics = JSON.parse(value)
      break
    }
  }
  if (!metrics) {
    const debug = await send('Runtime.evaluate', {
      expression:
        'JSON.stringify({ keys: window.__HARNESS_KEYS__, title: document.title, text: (document.body.innerText || "").slice(0, 400) })',
      returnByValue: true,
    })
    throw new Error('the harness never reported metrics: ' + (debug.result && debug.result.value))
  }

  const shot = await send('Page.captureScreenshot', { format: 'png' })
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, Buffer.from(shot.data, 'base64'))
  writeFileSync(dumpPath, JSON.stringify(metrics, null, 2))
  console.log(JSON.stringify({ view, theme, out: outPath, metrics: dumpPath, overflowing: metrics.overflowing, rows: metrics.rows, tabs: metrics.tabs }))
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
    if (browser.pid) spawnSync('taskkill', ['/PID', String(browser.pid), '/T', '/F'], { stdio: 'ignore' })
    await sleep(300)
    rmSync(profile, { recursive: true, force: true })
  })
