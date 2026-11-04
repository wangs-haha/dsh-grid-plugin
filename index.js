/**
 * Host half of Grid: the database workbench plugin.
 *
 * Owns the connection registry, the session pool, the authenticated HTTP route
 * the browser panel calls, and the `grid_*` Agent tools. Everything that
 * touches a database goes through `lib/api.js`, so the panel and the model see
 * exactly the same behaviour.
 */

import { createRouter, GridError } from './lib/api.js'
import { dataDir, getRecord } from './lib/connections.js'
import { statusOf } from './lib/errors.js'
import { WorkspaceBindingStore } from './lib/extras.js'
import { SessionPool } from './lib/session.js'
import { registerGridTools } from './lib/tools.js'

/** The authenticated route the Client half posts every action to. */
export const ROUTE_PATH = '/api/grid'

/** Bundle row dependencies: the Web connection carrier that serves the route. */
export const inject = ['connection']

/** Largest request body accepted, before parsing. */
const MAX_BODY_BYTES = 2_000_000

/**
 * Plugin configuration is read defensively from the row's `config` map rather
 * than declared as a schema object: the two keys are optional, every default is
 * safe, and a plain plugin then loads even if a future Harness changes the
 * schema API. Documented keys:
 *
 * - `allowWrites` (boolean, default false): gate the `grid_execute` Agent tool.
 * - `idleMinutes` (number, default 10): close an idle database session.
 */

/**
 * Build one JSON response.
 * @param {unknown} body - JSON-serialisable payload.
 * @param {number} [status] - HTTP status.
 * @returns {Response} the response.
 */
function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  })
}

/**
 * Install the route and the tools.
 * @param {import('@deepseek-ai/cordis').Context} ctx - plugin context.
 * @param {{ allowWrites?: boolean, idleMinutes?: number }} [config] - plugin config.
 */
export function apply(ctx, config = {}) {
  const allowWrites = config.allowWrites === true
  const idleMinutes = Number.isFinite(config.idleMinutes) ? Number(config.idleMinutes) : 10

  const pool = new SessionPool({
    idleMs: Math.max(1, idleMinutes) * 60_000,
    log: (message) => ctx.logger?.info?.(message),
  })
  const dispatch = createRouter({
    pool,
    allowWrites,
    log: (message) => ctx.logger?.info?.(message),
    listWorkspaces: () =>
      (typeof ctx.get === 'function' ? ctx.get('workspaceRegistry') : undefined)?.list?.().map((workspace) => ({
        id: workspace.id,
        title: workspace.title,
        path: workspace.path,
      })) ?? [],
  })

  /**
   * Answer one browser request.
   * @param {Request} request - authenticated request.
   * @returns {Promise<Response>} JSON response.
   */
  async function handle(request) {
    const length = Number(request.headers.get('content-length') || 0)
    if (length > MAX_BODY_BYTES) return jsonResponse({ error: 'request body is too large' }, 413)
    let body
    try {
      // `content-length` is absent on a chunked request, so the real size is
      // checked after reading rather than trusted from the header.
      const text = await request.text()
      if (Buffer.byteLength(text, 'utf8') > MAX_BODY_BYTES) {
        return jsonResponse({ error: 'request body is too large' }, 413)
      }
      body = JSON.parse(text)
    } catch {
      return jsonResponse({ error: 'invalid JSON body' }, 400)
    }
    const action = typeof body?.action === 'string' ? body.action : ''
    try {
      const result = await dispatch(action, body)
      return jsonResponse({ ok: true, ...result })
    } catch (error) {
      const status = error instanceof GridError ? error.status : statusOf(error)
      const message = error instanceof Error ? error.message : String(error)
      if (status >= 500) ctx.logger?.warn?.(`[grid] ${action}: ${message}`)
      return jsonResponse({ error: message, action }, status)
    }
  }

  ctx.effect(
    () =>
      ctx.connection.fetch.register({
        path: ROUTE_PATH,
        methods: ['POST'],
        requestBody: 'buffered',
        fetch: handle,
      }),
    'grid: action route',
  )

  // The tool registry is optional: a profile without an agent still gets the
  // panel, it just has no `grid_*` tools.
  // Project bindings are read by both the tools and the system prompt, so the
  // store is created before either is wired up.
  const project = new WorkspaceBindingStore()
  const tools = typeof ctx.get === 'function' ? ctx.get('tools') : undefined
  if (tools) {
    ctx.effect(() => {
      const disposers = registerGridTools({
        tools,
        dispatch: async (action, payload) => dispatch(action, payload),
        allowWrites,
        resolveBinding: async (agent) => {
          if (!agent) return null
          const workingDirectory = typeof ctx.get === 'function' ? ctx.get('workingDirectory') : undefined
          if (!workingDirectory || typeof workingDirectory.ensure !== 'function') return null
          try {
            const cwd = await workingDirectory.ensure(agent)
            return project.resolveByPath(cwd)
          } catch {
            return null
          }
        },
        log: (message) => ctx.logger?.info?.(message),
      })
      return () => {
        for (const dispose of disposers) {
          try {
            dispose()
          } catch {
            // A tool already removed by its own scope teardown is fine.
          }
        }
      }
    }, 'grid: agent tools')
  } else {
    ctx.logger?.warn?.('[grid] the tool registry is not mounted; the panel still works')
  }

  ctx.effect(
    () => () => {
      pool.dispose()
      void pool.closeAll()
    },
    'grid: sessions',
  )


  // Project binding: a short, explicit block that tells the agent which database
  // this profile is about and that its access is read-only.
  const systemPrompt = typeof ctx.get === 'function' ? ctx.get('systemPrompt') : undefined
  if (systemPrompt) {
    ctx.effect(
      () =>
        systemPrompt.section({
          name: 'grid-project',
          order: 95,
          text: () => {
            const bindings = project.list()
            if (bindings.length === 0) return ''
            const lines = ['## Bound databases (Grid)']
            for (const binding of bindings) {
              const record = getRecord(binding.connectionId)
              if (!record) continue
              lines.push(
                '- ' +
                  (record.name || binding.connectionId) +
                  ' (' + record.engine + (binding.database ? ', ' + binding.database : '') + ')' +
                  ' → workspace ' + (binding.workspacePath || binding.workspaceId),
              )
            }
            if (lines.length === 1) return ''
            lines.push(
              'In a bound workspace, call grid_query / grid_inspect without connectionId: the binding supplies it.',
              allowWrites ? 'Write access is enabled.' : 'Access is read-only.',
            )
            return lines.join('\n')
          },
        }),
      'grid: project context',
    )
  }
  ctx.logger?.info?.(`[grid] ready · data ${dataDir()} · writes ${allowWrites ? 'enabled' : 'disabled'}`)
}
