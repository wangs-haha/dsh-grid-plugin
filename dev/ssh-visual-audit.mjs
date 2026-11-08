/**
 * File-fixture-only SSH visual regression audit. Never contacts the Host GUI or
 * a real database, and never reads real SSH credentials.
 *
 * Usage (from the repository root, with dependencies already available):
 *   pnpm build
 *   node dev/ssh-visual-audit.mjs
 *
 * Requires Windows, Edge at its standard installation path and pwsh on PATH.
 * Loads the built client through dev/harness.html. Asserts the long SSH private-
 * key form at 1280/700/390px in both themes, including scrolling and footer hit tests.
 * Also checks the simplified General form and responsive field grouping.
 * Writes twelve SSH PNGs, six General PNGs and metrics under ignored dev/shots/.
 * Uses a unique OS-temp browser profile and only closes processes using that
 * exact profile; it never attaches to the user's browser or an existing port.
 */
import assert from 'node:assert/strict'
import { spawn, spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = resolve(import.meta.dirname, '..')
const shots = resolve(root, 'dev', 'shots')
mkdirSync(shots, { recursive: true })
const tempRoot = realpathSync(tmpdir())
const profilePrefix = 'dsh-grid-ssh-visual-'
const profileAbsolute = realpathSync(mkdtempSync(join(tempRoot, profilePrefix)))

function assertOwnedProfile() {
  assert.equal(dirname(profileAbsolute).toLowerCase(), tempRoot.toLowerCase(), 'only remove the generated OS-temp profile')
  assert.ok(basename(profileAbsolute).startsWith(profilePrefix), 'profile must have this audit\'s generated prefix')
  assert.equal(realpathSync(profileAbsolute).toLowerCase(), profileAbsolute.toLowerCase(), 'profile target must not be redirected')
}
assertOwnedProfile()

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
let browser
let browserError
let ws
let nextId = 0
const pending = new Map()
const errors = []
const delay = (ms) => new Promise((done) => setTimeout(done, ms))

function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++nextId
    const timer = setTimeout(() => { pending.delete(id); reject(new Error('CDP timeout: ' + method)) }, 8000)
    pending.set(id, { resolve, reject, timer })
    try { ws.send(JSON.stringify({ id, method, params })) } catch (error) { clearTimeout(timer); pending.delete(id); reject(error) }
  })
}
async function evaluate(expression) {
  const response = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
  if (response.exceptionDetails) throw new Error(response.exceptionDetails.exception?.description || response.exceptionDetails.text)
  return response.result.value
}
async function browserTarget() {
  const started = Date.now()
  while (Date.now() - started < 8000) {
    if (browserError) throw browserError
    const portFile = join(profileAbsolute, 'DevToolsActivePort')
    if (existsSync(portFile)) {
      const port = Number(readFileSync(portFile, 'utf8').split(/\r?\n/)[0])
      try {
        const response = await fetch(`http://127.0.0.1:${port}/json/list`, { signal: AbortSignal.timeout(500) })
        const targets = await response.json()
        const page = targets.find((target) => target.type === 'page')
        if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl
      } catch { /* Wait for our own fresh browser's debugging listener. */ }
    }
    await delay(50)
  }
  throw new Error('our throwaway Edge never exposed a page target')
}

const configure = String(async function () {
  const tick = () => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done)))
  const started = Date.now()
  while (!document.querySelector('.dg-modal')) {
    if (Date.now() - started > 6000) throw new Error('dialog missing: ' + document.body.innerText.slice(0, 300))
    await tick()
  }
  const dialog = document.querySelector('.dg-modal')
  const field = (label) => {
    const wrapper = [...dialog.querySelectorAll('label.dg-field')].find((entry) => entry.querySelector('.dg-field-label')?.textContent === label)
    const control = wrapper?.querySelector('input, select, textarea')
    if (!control) throw new Error('missing field ' + label)
    return control
  }
  const set = async (label, value) => {
    const element = field(label)
    if (!element.getClientRects().length) throw new Error('field is hidden; select its tab first: ' + label)
    const prototype = element.tagName === 'SELECT' ? HTMLSelectElement.prototype : element.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype
    Object.getOwnPropertyDescriptor(prototype, 'value').set.call(element, value)
    element.dispatchEvent(new Event(element.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true }))
    await tick()
  }
  const engine = [...dialog.querySelectorAll('.dg-engine-name')].find((entry) => entry.textContent.includes('MySQL'))
  if (!engine) throw new Error('MySQL card missing')
  engine.closest('button').click(); await tick()
  const selectTab = async (id) => {
    const button = dialog.querySelector('#tab-btn-' + id)
    if (!button) throw new Error('missing dialog tab: ' + id)
    button.click(); await tick()
    if (button.getAttribute('aria-selected') !== 'true') throw new Error('tab did not activate: ' + id)
    document.querySelector('.dg-modal-body').scrollTop = 0
    await tick()
  }
  await set('名称', 'SSH 私钥连接 · 视觉夹具')
  await set('主机', '127.0.0.1')
  await set('用户名', 'database_fixture')
  await selectTab('ssl')
  await set('TLS / SSL', 'verify-full')
  await set('TLS 服务器名', 'database.example.test')
  await selectTab('ssh')
  const enable = dialog.querySelector('#tab-pane-ssh input[type="checkbox"]')
  if (!enable) throw new Error('SSH enable checkbox missing')
  enable.click(); await tick()
  await set('SSH 主机', 'jump.example.test')
  await set('SSH 用户名', 'fixture_user')
  await set('固定 SSH 主机指纹', 'SHA256:' + 'A'.repeat(43))
  await set('SSH 认证方式', 'privateKey')
  // Deliberately fake content. No real key, host credential or file is read.
  await set('SSH 私钥', '-----BEGIN OPENSSH PRIVATE KEY-----\nVISUAL_FIXTURE_ONLY_NOT_A_REAL_KEY\n' + 'A'.repeat(160) + '\n-----END OPENSSH PRIVATE KEY-----')
  const area = field('SSH 私钥')
  if (area.tagName !== 'TEXTAREA') throw new Error('private key textarea missing')
  document.querySelector('.dg-modal-body').scrollTop = 0
  await tick()
  return { privateKey: true, tls: field('TLS 服务器名').value, sshChecked: dialog.querySelector('input[type="checkbox"]').checked }
})

const collect = String(function () {
  const modal = document.querySelector('.dg-modal')
  const body = modal.querySelector('.dg-modal-body')
  const foot = modal.querySelector('.dg-modal-foot')
  const rect = (node) => {
    const box = node.getBoundingClientRect()
    return { x: box.x, y: box.y, w: box.width, h: box.height, bottom: box.bottom, right: box.right, clientW: node.clientWidth, clientH: node.clientHeight, scrollW: node.scrollWidth, scrollH: node.scrollHeight, scrollTop: node.scrollTop, overflowX: getComputedStyle(node).overflowX, overflowY: getComputedStyle(node).overflowY }
  }
  const buttons = [...foot.querySelectorAll('button')].map((node) => {
    const box = node.getBoundingClientRect()
    const at = document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2)
    return { text: node.innerText.trim(), disabled: node.disabled, hit: node === at || node.contains(at), ...rect(node) }
  })
  const oversize = [...modal.querySelectorAll('*')].filter((node) => {
    const box = node.getBoundingClientRect(), parent = body.getBoundingClientRect()
    return box.width > 0 && (box.right > parent.right + 1 || box.left < parent.left - 1)
  }).map((node) => ({ tag: node.tagName, className: String(node.className).slice(0, 80), ...rect(node) })).slice(0, 10)
  const passphrase = modal.querySelector('input[aria-label="私钥口令（可选）"]')
  const key = modal.querySelector('textarea[aria-label="SSH 私钥"]')
  return { viewport: { w: innerWidth, h: innerHeight }, modal: rect(modal), body: rect(body), footer: rect(foot), buttons, document: rect(document.documentElement), oversize, passphrase: rect(passphrase), key: rect(key), active: document.activeElement?.getAttribute('aria-label') }
})

const reports = []
try {
  browser = spawn(edge, ['--headless=new', '--edge-skip-compat-layer-relaunch', '--disable-extensions', '--disable-background-networking', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--allow-file-access-from-files', '--remote-debugging-port=0', '--user-data-dir=' + profileAbsolute, 'about:blank'], { stdio: 'ignore' })
  browser.once('error', (error) => { browserError = error })
  const wsUrl = await browserTarget()
  ws = new WebSocket(wsUrl)
  await new Promise((resolve, reject) => { ws.addEventListener('open', resolve, { once: true }); ws.addEventListener('error', reject, { once: true }) })
  ws.addEventListener('message', (event) => {
    const message = JSON.parse(event.data)
    if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text)
    if (!message.id) return
    const entry = pending.get(message.id)
    if (!entry) return
    clearTimeout(entry.timer); pending.delete(message.id)
    if (message.error) entry.reject(new Error(message.error.message))
    else entry.resolve(message.result)
  })
  await send('Page.enable')
  await send('Runtime.enable')
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
  for (const theme of ['dark', 'light']) {
    for (const width of [1280, 700, 390]) {
      const height = 860
      await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false })
      const url = pathToFileURL(resolve(root, 'dev', 'harness.html'))
      url.search = new URLSearchParams({ view: 'dialog', theme, visual: String(Date.now()) }).toString()
      await send('Page.navigate', { url: url.href })
      const setup = await evaluate(`(${configure})()`)
      assert.equal(setup.privateKey, true); assert.equal(setup.sshChecked, true)
      for (const position of ['top', 'bottom']) {
        if (position === 'bottom') await evaluate(`(async()=>{const body=document.querySelector('.dg-modal-body');body.scrollTop=body.scrollHeight;await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));const input=document.querySelector('input[aria-label="私钥口令（可选）"]');input.focus({preventScroll:true});return true})()`)
        const metrics = await evaluate(`(${collect})()`)
        const out = resolve(shots, `ssh-${width}x${height}-${theme}-${position}.png`)
        const screenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
        writeFileSync(out, Buffer.from(screenshot.data, 'base64'))
        const report = { theme, width, height, position, file: out, ...metrics }
        reports.push(report)
        assert.ok(metrics.modal.x >= 0 && metrics.modal.right <= width + 1, 'modal stays within viewport horizontally')
        assert.ok(metrics.modal.y >= 0 && metrics.modal.bottom <= height + 1, 'modal stays within viewport vertically')
        assert.ok(metrics.body.scrollH > metrics.body.clientH, 'long SSH form scrolls inside modal body')
        assert.ok(metrics.body.scrollW <= metrics.body.clientW + 1, 'modal body has no horizontal overflow')
        assert.ok(metrics.document.scrollW <= width + 1, 'page has no horizontal overflow')
        for (const label of ['测试连接', '保存']) {
          const action = metrics.buttons.find((button) => button.text === label)
          assert.ok(action && action.hit && !action.disabled && action.y >= 0 && action.bottom <= height, `${label} is visible and hit-testable at ${position}`)
        }
        if (position === 'bottom') {
          assert.ok(metrics.body.scrollTop > 0, 'body can scroll down')
          assert.ok(metrics.passphrase.y >= metrics.body.y && metrics.passphrase.bottom <= metrics.body.bottom, 'last credential field is reachable without hiding footer')
          assert.equal(metrics.active, '私钥口令（可选）', 'last field can receive focus')
        }
        console.log(JSON.stringify({ width, height, theme, position, bodyH: metrics.body.clientH, scrollH: metrics.body.scrollH, scrollTop: metrics.body.scrollTop, horizontalOverflow: metrics.body.scrollW - metrics.body.clientW, footerReachable: true, out }))
      }
      // Inspect the actual simplified General pane, not hidden SSH/TLS inputs.
      await evaluate(`(async()=>{document.querySelector('#tab-btn-general').click();await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));document.querySelector('.dg-modal-body').scrollTop=0;return true})()`)
      const general = await evaluate(`(() => {
        const modal = document.querySelector('.dg-modal')
        const body = modal.querySelector('.dg-modal-body')
        const pane = modal.querySelector('#tab-pane-general')
        const field = label => [...pane.querySelectorAll('label.dg-field')].find(entry => entry.querySelector('.dg-field-label')?.textContent === label)?.querySelector('input')
        const box = node => { const r = node.getBoundingClientRect(); return { x:r.x, y:r.y, w:r.width, h:r.height, right:r.right, bottom:r.bottom } }
        const host = field('主机'), port = field('端口'), user = field('用户名'), password = field('密码')
        const engines = [...modal.querySelectorAll('.dg-engine')].map(node => { const r = node.getBoundingClientRect(); const hit = document.elementFromPoint(r.x+r.width/2,r.y+r.height/2); return { ...box(node), hit: node === hit || node.contains(hit) } })
        return { theme:${JSON.stringify(theme)}, width:${width}, pane:'general', modal:box(modal), clientW:body.clientWidth, scrollW:body.scrollWidth, host:box(host), port:box(port), user:box(user), password:box(password), engines, optionsOpen:pane.querySelector('details').open, nameRequired:field('名称').required }
      })()`)
      const generalShot = await send('Page.captureScreenshot', { format:'png', captureBeyondViewport:false })
      const generalPath = resolve(shots, `connection-${width}x${height}-${theme}.png`)
      writeFileSync(generalPath, Buffer.from(generalShot.data, 'base64'))
      reports.push({ ...general, file:generalPath })
      assert.equal(general.optionsOpen, false, 'low-frequency organization options stay collapsed')
      assert.equal(general.nameRequired, false, 'automatic naming keeps name optional')
      assert.ok(general.scrollW <= general.clientW + 1, 'General form has no horizontal overflow')
      assert.ok(general.engines.every(engine => engine.hit && engine.w > 0 && engine.right <= general.modal.right), 'all engines are fully reachable')
      assert.ok(Math.abs(general.host.y - general.port.y) < 1, 'host and port share a row')
      if (width >= 700) assert.ok(Math.abs(general.user.y - general.password.y) < 1, 'credentials share a row at desktop widths')
      else assert.ok(general.password.y > general.user.y, 'credentials stack on narrow screens')
      console.log(JSON.stringify({ pane:'general', width, theme, horizontalOverflow:general.scrollW-general.clientW, out:generalPath }))
    }
  }
  assert.deepEqual(errors, [], 'fixture has no uncaught browser exception')
} catch (error) {
  errors.push(error.stack || String(error))
  console.error('AUDIT FAILED:', error.message)
  process.exitCode = 1
} finally {
  // Edge may relaunch its compatibility wrapper. Match the exact user-data-dir
  // argument for this generated profile, never an image name or stale launcher PID.
  try { if (ws?.readyState === WebSocket.OPEN) await send('Browser.close') } catch {}
  for (const entry of pending.values()) { clearTimeout(entry.timer); entry.reject(new Error('visual audit cleanup')) }
  pending.clear()
  try { ws?.close() } catch {}
  try {
    assertOwnedProfile()
    const escaped = profileAbsolute.replace(/'/g, "''")
    const cleanup = String.raw`
$ErrorActionPreference = 'Stop'
$profile = '${escaped}'
$pathPattern = [regex]::Escape($profile)
$argumentPattern = '(?i)(?:^|\s)(?:"--user-data-dir=' + $pathPattern + '"|--user-data-dir="' + $pathPattern + '"|--user-data-dir=' + $pathPattern + ')(?=\s|$)'
function Get-OwnedEdgeProcess {
  Get-CimInstance Win32_Process -Filter "Name = 'msedge.exe'" | Where-Object { $_.CommandLine -and $_.CommandLine -match $argumentPattern }
}
foreach ($process in (Get-OwnedEdgeProcess | Where-Object { $_.CommandLine -notmatch '(?:^|\s)"?--type=' })) {
  taskkill /PID $process.ProcessId /T /F | Out-Null
}
foreach ($process in (Get-OwnedEdgeProcess)) {
  taskkill /PID $process.ProcessId /T /F | Out-Null
}
`
    const result = spawnSync('pwsh', ['-NoProfile', '-Command', cleanup], { stdio: 'inherit', timeout: 10000 })
    if (result.error) throw result.error
    if (result.status !== 0) throw new Error('owned browser cleanup exited with status ' + result.status)
    assertOwnedProfile()
    rmSync(profileAbsolute, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 })
  } catch (error) {
    errors.push('profile cleanup: ' + error.message)
    process.exitCode = 1
  }
  writeFileSync(resolve(shots, 'ssh-visual-metrics.json'), JSON.stringify({ reports, errors, browserPid: browser?.pid, profileRemoved: !existsSync(profileAbsolute) }, null, 2))
  console.log(JSON.stringify({ cleanup: true, browserPid: browser?.pid, profileRemoved: !existsSync(profileAbsolute), reports: reports.length }))
}
