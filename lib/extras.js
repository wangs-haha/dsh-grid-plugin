/**
 * Feature stores that sit beside the query path: saved queries and the
 * workspace binding the agent reads.
 *
 * Neither talks to a database: they are small JSON files under the plugin data
 * directory, written atomically and read on demand.
 */

import { copyFileSync, existsSync, readFileSync, renameSync, unlinkSync, writeFileSync } from 'node:fs'
import { randomBytes } from 'node:crypto'
import { join } from 'node:path'

import { dataDir, ensureDataDir } from './connections.js'
import { GridError } from './errors.js'

/** Read a JSON file, returning `fallback` when it is missing or damaged. */
function readJson(file, fallback) {
  if (!existsSync(file)) return fallback
  try {
    return JSON.parse(readFileSync(file, 'utf8'))
  } catch {
    return fallback
  }
}

/** Write JSON atomically with Windows file-lock fallback. */
function writeJson(file, value) {
  ensureDataDir()
  const temp = `${file}.tmp-${process.pid}-${Date.now()}`
  const content = `${JSON.stringify(value, null, 2)}\n`
  writeFileSync(temp, content, 'utf8')
  try {
    renameSync(temp, file)
  } catch {
    try {
      copyFileSync(temp, file)
      unlinkSync(temp)
    } catch {
      writeFileSync(file, content, 'utf8')
    }
  }
}

/** Stable id with a readable prefix. */
function newId(prefix) {
  return `${prefix}_${randomBytes(6).toString('hex')}`
}

/* -------------------------------------------------------------------------- */
/* Saved queries                                                               */
/* -------------------------------------------------------------------------- */

export class SavedQueries {
  constructor() {
    this.file = join(dataDir(), 'queries.json')
  }

  /** @returns {object[]} every saved query, newest first. */
  list() {
    const store = readJson(this.file, { version: 1, items: [] })
    const items = Array.isArray(store.items) ? store.items : []
    return items.slice().sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)))
  }

  /**
   * Save or update one query, matched by name + target.
   * @param {{ name: string, sql: string, connectionId: string, database: string, scope?: string }} input - the query.
   * @returns {object} the stored record.
   */
  save(input) {
    const name = String(input.name ?? '').trim().slice(0, 120)
    const sql = String(input.sql ?? '').trim()
    if (!name) throw new GridError('a query needs a name')
    if (!sql) throw new GridError('a query needs SQL')
    const store = readJson(this.file, { version: 1, items: [] })
    const items = Array.isArray(store.items) ? store.items : []
    const existing = items.find(
      (item) => item.name === name && item.connectionId === String(input.connectionId ?? '') && item.database === String(input.database ?? ''),
    )
    const now = new Date().toISOString()
    if (existing) {
      existing.sql = sql
      existing.updatedAt = now
      existing.scope = input.scope === 'agent' ? 'agent' : existing.scope
      writeJson(this.file, { version: 1, items })
      return existing
    }
    const record = {
      id: newId('q'),
      name,
      sql,
      connectionId: String(input.connectionId ?? ''),
      database: String(input.database ?? ''),
      scope: input.scope === 'agent' ? 'agent' : 'user',
      createdAt: now,
      updatedAt: now,
    }
    items.push(record)
    writeJson(this.file, { version: 1, items })
    return record
  }

  /** @returns {boolean} whether a record was removed. */
  remove(id) {
    const store = readJson(this.file, { version: 1, items: [] })
    const items = Array.isArray(store.items) ? store.items : []
    const next = items.filter((item) => item.id !== String(id))
    if (next.length === items.length) return false
    writeJson(this.file, { version: 1, items: next })
    return true
  }
}

/* -------------------------------------------------------------------------- */
/* Workspace bindings                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Binds a workspace directory to one connection and database.
 *
 * The agent resolves the binding from its session's working directory, so a
 * conversation in one workspace reads that workspace's database without being
 * told which connection to use.
 */
export class WorkspaceBindingStore {
  constructor() {
    this.file = join(dataDir(), 'bindings.json')
  }

  /** @returns {object[]} every binding, in creation order. */
  list() {
    const store = readJson(this.file, { version: 1, items: [] })
    const items = Array.isArray(store.items) ? store.items : []
    return items.filter((item) => item && item.connectionId && item.workspaceId)
  }

  /**
   * Bind (or rebind) one workspace.
   * @param {{ workspaceId: string, workspacePath?: string, connectionId: string, database?: string }} input - the binding.
   * @returns {object} the stored binding.
   */
  bind(input) {
    const workspaceId = String(input.workspaceId || '')
    if (!workspaceId) throw new GridError('workspaceId is required')
    if (!input.connectionId) throw new GridError('connectionId is required')
    const record = {
      workspaceId,
      workspacePath: String(input.workspacePath || ''),
      connectionId: String(input.connectionId),
      database: String(input.database || ''),
      createdAt: new Date().toISOString(),
    }
    const items = this.list().filter((item) => item.workspaceId !== workspaceId)
    items.push(record)
    writeJson(this.file, { version: 1, items })
    return record
  }

  /** @returns {boolean} whether a binding was removed. */
  unbind(workspaceId) {
    const items = this.list()
    const next = items.filter((item) => item.workspaceId !== String(workspaceId))
    if (next.length === items.length) return false
    writeJson(this.file, { version: 1, items: next })
    return true
  }

  /**
   * Resolve the binding whose workspace directory contains `cwd`.
   * @param {string} cwd - absolute directory of the calling session.
   * @returns {object|null} the most specific match.
   */
  resolveByPath(cwd) {
    if (!cwd) return null
    const normalized = String(cwd).replace(/\\/g, '/').replace(/\/+$/, '').toLowerCase()
    let best = null
    for (const item of this.list()) {
      const path = String(item.workspacePath || '').replace(/\\/g, '/').replace(/\/+$/, '').toLowerCase()
      if (!path) continue
      if (normalized === path || normalized.startsWith(`${path}/`)) {
        if (!best || path.length > best.path.length) best = { ...item, path }
      }
    }
    return best
  }

  /**
   * Resolve binding by cwd and/or workspaceId.
   * @param {string|{ cwd?: string, workspaceId?: string }} criteria
   * @returns {object|null}
   */
  resolve(criteria) {
    if (!criteria) return null
    if (typeof criteria === 'string') return this.resolveByPath(criteria)
    const { cwd, workspaceId } = criteria
    if (workspaceId) {
      const match = this.list().find((item) => String(item.workspaceId) === String(workspaceId))
      if (match) return match
    }
    if (cwd) return this.resolveByPath(cwd)
    return null
  }
}
