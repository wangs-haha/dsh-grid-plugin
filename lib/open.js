/** One bounded opener for persistent sessions and isolated draft probes. */
import { createDriver as defaultCreateDriver } from './drivers/index.js'
import { transportError } from './transport.js'

/** A grace period is bounded even when a driver's graceful end never resolves. */
export async function closeDriver(driver, graceMs = 1_000) {
  if (!driver) return
  let timer
  try {
    await Promise.race([
      Promise.resolve().then(() => driver.close()).catch(() => {}),
      new Promise((resolve) => {
        timer = setTimeout(() => { try { driver.destroy?.() } catch { /* Already closed. */ } resolve() }, graceMs)
      }),
    ])
  } finally {
    clearTimeout(timer)
  }
}

export async function openDatabase(connection, options) {
  const { transportManager, signal, createDriver = defaultCreateDriver, timeoutMs = 20_000 } = options
  const controller = new AbortController()
  const runtime = { ...connection, _signal: controller.signal }
  let driver = null
  let transport = null
  let closePromise = null
  let closing = false
  let unlinkTransport = () => {}
  let rejectAbort
  const aborted = new Promise((_resolve, reject) => { rejectAbort = reject })
  // Observed even if a synchronously aborted caller never reaches Promise.race.
  aborted.catch(() => {})
  const close = () => {
    if (closePromise) return closePromise
    closing = true
    unlinkTransport()
    runtime._closed = true
    signal?.removeEventListener('abort', onParentAbort)
    closePromise = (async () => {
      // Mark the runtime closed before graceful end: no delayed side connection
      // may be created, but established database sockets can still send QUIT.
      await closeDriver(driver)
      controller.abort(transportError('database connection was closed'))
      try { driver?.destroy?.() } catch { /* Best-effort force close. */ }
      await transport?.release()
    })()
    return closePromise
  }
  const abort = (reason) => {
    if (controller.signal.aborted) return
    runtime._closed = true
    controller.abort(reason)
    rejectAbort(reason)
    // Stop accepting/forwarding immediately, not after graceful close.
    void transport?.release(reason)
    try { driver?.destroy?.() } catch { /* Already closed. */ }
    void close()
  }
  const onParentAbort = () => abort(signal.reason ?? transportError('the connection was closed while it was opening'))
  signal?.addEventListener('abort', onParentAbort, { once: true })
  const timer = setTimeout(() => abort(transportError('the database/SSH connection timed out', 'CONNECTION_TIMEOUT')), timeoutMs)
  const started = Date.now()
  try {
    if (signal?.aborted) onParentAbort()
    const task = (async () => {
      if (controller.signal.aborted) throw controller.signal.reason
      transport = await transportManager.acquire(runtime, { signal: controller.signal, ephemeral: options.ephemeral })
      if (closing || controller.signal.aborted) {
        await transport?.release()
        throw controller.signal.reason ?? transportError('the connection was closed while it was opening')
      }
      runtime._transport = transport
      unlinkTransport = transport?.onFailure(abort) ?? (() => {})
      driver = await createDriver(runtime)
      if (closing || controller.signal.aborted) {
        await closeDriver(driver)
        throw controller.signal.reason ?? transportError('the connection was closed while it was opening')
      }
      const version = await driver.open()
      if (closing || controller.signal.aborted) {
        await closeDriver(driver)
        throw controller.signal.reason ?? transportError('the connection was closed while it was opening')
      }
      transport?.assertOpen()
      return { driver, transport, connection: runtime, version, close, latencyMs: Date.now() - started }
    })()
    return await Promise.race([task, aborted])
  } catch (error) {
    abort(error)
    await close()
    throw error
  } finally {
    clearTimeout(timer)
  }
}
