/** TLS always authenticates the logical database identity, never a tunnel port. */
import { isIP } from 'node:net'
import { checkServerIdentity } from 'node:tls'
import { GridError } from '../errors.js'

function inlineCa(connection) {
  const ca = connection?.options?.sslCa
  return typeof ca === 'string' && ca.includes('BEGIN CERTIFICATE') ? ca : undefined
}

export function tlsMode(connection) {
  const mode = connection?.sslMode
  if (['disable', 'require', 'verify-ca', 'verify-full'].includes(mode)) return mode
  return connection?.ssl === true ? 'verify-full' : 'disable'
}

export function tlsIdentity(connection) {
  return String(connection.tlsServerName || connection.host)
}

/** Node TLS options used by pg and ioredis. Explicit identity callbacks also
 * handle IP certificates without sending an IP as SNI. */
export function tlsOptions(connection) {
  const mode = tlsMode(connection)
  if (mode === 'disable') return null
  const identity = tlsIdentity(connection)
  return {
    rejectUnauthorized: mode !== 'require',
    ...(inlineCa(connection) ? { ca: inlineCa(connection) } : {}),
    ...(!isIP(identity) ? { servername: identity } : {}),
    checkServerIdentity: mode === 'verify-full' ? (_host, certificate) => checkServerIdentity(identity, certificate) : () => undefined,
  }
}

/** mysql2 derives its TLS name from config.host and ignores ssl.servername.
 * Keep that name while a stream factory dials the actual database endpoint. */
export function mysqlTlsOptions(connection) {
  const mode = tlsMode(connection)
  if (mode === 'disable') return null
  if (mode === 'verify-full' && isIP(tlsIdentity(connection))) {
    throw new GridError('MySQL full TLS verification requires a DNS certificate name; set TLS server name to the database certificate DNS name')
  }
  return {
    rejectUnauthorized: mode !== 'require',
    verifyIdentity: mode === 'verify-full',
    ...(inlineCa(connection) ? { ca: inlineCa(connection) } : {}),
  }
}

export function mssqlTlsOptions(connection) {
  const mode = tlsMode(connection)
  if (mode === 'verify-ca') {
    throw new GridError('SQL Server does not support chain-only TLS verification; choose verify-full or another supported TLS mode')
  }
  return {
    encrypt: mode !== 'disable',
    trustServerCertificate: mode !== 'verify-full',
    serverName: tlsIdentity(connection),
    ...(inlineCa(connection) ? { cryptoCredentialsDetails: { ca: inlineCa(connection) } } : {}),
  }
}
