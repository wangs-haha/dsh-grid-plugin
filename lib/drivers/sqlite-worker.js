/**
 * The SQLite worker.
 *
 * It exists for one reason: `node:sqlite` is synchronous, so running it on the
 * Host thread would freeze every other plugin, the panel's API calls and the
 * agent while a query runs. Everything below is a thin request/response loop
 * around `SqliteCore`.
 *
 * Results are posted as structured clones. `toJsonRow` has already turned
 * bigints and binary values into JSON-safe shapes, so nothing exotic crosses the
 * boundary.
 */

import { parentPort } from 'node:worker_threads'

import { SqliteCore } from './sqlite-core.js'

/** The open core, or null before `create`. */
let core = null

/**
 * Turn any thrown value into something `postMessage` can carry.
 * @param {unknown} error - the thrown value.
 * @returns {{ message: string, status: number, name: string }} the envelope.
 */
function describeError(error) {
  return {
    message: error instanceof Error ? error.message : String(error),
    status: Number(/** @type {{ status?: unknown }} */ (error)?.status) || 0,
    name: error instanceof Error ? error.name : 'Error',
  }
}

parentPort?.on('message', async (message) => {
  const { id, method, args } = message ?? {}
  try {
    if (method === 'create') {
      core = new SqliteCore(args?.[0] ?? {})
      parentPort?.postMessage({ id, ok: true, value: null })
      return
    }
    if (method === 'dispose') {
      await core?.close()
      core = null
      parentPort?.postMessage({ id, ok: true, value: null })
      return
    }
    if (!core) throw new Error('the SQLite worker is not open')
    if (typeof core[method] !== 'function') throw new Error(`unsupported SQLite operation: ${String(method)}`)
    const value = await core[method](...(args ?? []))
    parentPort?.postMessage({ id, ok: true, value })
  } catch (error) {
    parentPort?.postMessage({ id, ok: false, error: describeError(error) })
  }
})
