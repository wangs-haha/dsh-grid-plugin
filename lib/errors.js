/**
 * The one error type that carries an HTTP status.
 *
 * It lives in its own module so that the registry (`connections.js`) and the
 * side stores (`extras.js`) can throw a 4xx without importing the router and
 * creating a cycle with it.
 */

/** An error that carries the HTTP status the route should answer with. */
export class GridError extends Error {
  /**
   * @param {string} message - user-facing message.
   * @param {number} [status] - HTTP status.
   */
  constructor(message, status = 400) {
    super(message)
    this.name = 'GridError'
    this.status = status
  }
}

/**
 * Read the HTTP status implied by an arbitrary thrown value.
 *
 * Validation helpers outside the router throw plain `Error`s that were being
 * reported as 500s; when one of those carries no status a bad request is the
 * better default than an internal error.
 * @param {unknown} error - the thrown value.
 * @returns {number} the status to answer with.
 */
export function statusOf(error) {
  const status = Number(/** @type {{ status?: unknown }} */ (error)?.status)
  return Number.isInteger(status) && status >= 400 && status <= 599 ? status : 500
}
