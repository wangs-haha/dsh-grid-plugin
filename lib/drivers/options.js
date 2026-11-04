/**
 * Per-connection execution policy.
 *
 * One knob, `options.queryTimeoutMs`, is translated into whatever each engine
 * calls a statement timeout. Engines that cannot honour it say so in their
 * driver rather than silently accepting the value.
 */

/** Timeout used when a connection does not name one. */
export const DEFAULT_QUERY_TIMEOUT_MS = 30_000

/** Bounds on an accepted timeout, so a typo cannot disable the guard. */
const MIN_QUERY_TIMEOUT_MS = 1_000
const MAX_QUERY_TIMEOUT_MS = 3_600_000

/**
 * Read the statement timeout of a connection.
 * @param {object} connection - normalized connection record.
 * @param {number} [fallback] - value used when absent or invalid.
 * @returns {number} milliseconds.
 */
export function queryTimeoutMs(connection, fallback = DEFAULT_QUERY_TIMEOUT_MS) {
  const raw = Number(connection?.options?.queryTimeoutMs)
  if (!Number.isFinite(raw) || raw <= 0) return fallback
  return Math.max(MIN_QUERY_TIMEOUT_MS, Math.min(MAX_QUERY_TIMEOUT_MS, Math.trunc(raw)))
}
