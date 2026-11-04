/**
 * TLS options shared by the network drivers.
 *
 * The connection record carries `sslMode` (see `connections.js`). `require`
 * encrypts without proving who answered, which is the honest choice for a host
 * with a self-signed certificate; everything stronger verifies the chain, and
 * `verify-full` also checks that the certificate names the host we dialled.
 */

/** A certificate supplied inline through `options.sslCa`. */
function inlineCa(connection) {
  const ca = connection?.options?.sslCa
  return typeof ca === 'string' && ca.includes('BEGIN CERTIFICATE') ? ca : undefined
}

/**
 * The effective mode of a connection, tolerating records written before
 * `sslMode` existed.
 * @param {object} connection - normalized connection record.
 * @returns {'disable'|'require'|'verify-ca'|'verify-full'} the mode.
 */
export function tlsMode(connection) {
  const mode = connection?.sslMode
  if (mode === 'disable' || mode === 'require' || mode === 'verify-ca' || mode === 'verify-full') return mode
  return connection?.ssl === true ? 'verify-full' : 'disable'
}

/**
 * Build Node `tls.connect` options for MySQL, PostgreSQL and Redis.
 * @param {object} connection - normalized connection record.
 * @returns {{ rejectUnauthorized: boolean, ca?: string, servername?: string }|null} options, or null for plaintext.
 */
export function tlsOptions(connection) {
  const mode = tlsMode(connection)
  if (mode === 'disable') return null
  /** @type {{ rejectUnauthorized: boolean, ca?: string, servername?: string }} */
  const options = { rejectUnauthorized: mode !== 'require' }
  const ca = inlineCa(connection)
  if (ca) options.ca = ca
  // Hostname verification only makes sense when the chain is verified at all.
  if (mode === 'verify-full' && connection?.host) options.servername = String(connection.host)
  return options
}

/**
 * Build the `tedious` TLS block for SQL Server, whose option names differ.
 * @param {object} connection - normalized connection record.
 * @returns {{ encrypt: boolean, trustServerCertificate: boolean, cryptoCredentialsDetails?: object }} the block.
 */
export function mssqlTlsOptions(connection) {
  const mode = tlsMode(connection)
  const verify = mode === 'verify-ca' || mode === 'verify-full'
  /** @type {{ encrypt: boolean, trustServerCertificate: boolean, cryptoCredentialsDetails?: object }} */
  const options = { encrypt: mode !== 'disable', trustServerCertificate: !verify }
  const ca = inlineCa(connection)
  if (ca) options.cryptoCredentialsDetails = { ca }
  return options
}
