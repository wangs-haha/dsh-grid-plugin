/**
 * Unit tests for the per-connection execution policy: one `queryTimeoutMs`
 * option becomes each engine's own timeout, and a typo cannot disable it.
 */

import assert from 'node:assert/strict'
import { test } from 'node:test'

import { DEFAULT_QUERY_TIMEOUT_MS, queryTimeoutMs } from '../lib/drivers/options.js'

test('a connection without a timeout gets the default', () => {
  assert.equal(queryTimeoutMs({}), DEFAULT_QUERY_TIMEOUT_MS)
  assert.equal(queryTimeoutMs({ options: {} }), DEFAULT_QUERY_TIMEOUT_MS)
  assert.equal(queryTimeoutMs({ options: { queryTimeoutMs: 'soon' } }), DEFAULT_QUERY_TIMEOUT_MS)
  assert.equal(queryTimeoutMs({ options: { queryTimeoutMs: -5 } }), DEFAULT_QUERY_TIMEOUT_MS)
})

test('an explicit timeout is honoured and bounded', () => {
  assert.equal(queryTimeoutMs({ options: { queryTimeoutMs: 5000 } }), 5000)
  assert.equal(queryTimeoutMs({ options: { queryTimeoutMs: '2500' } }), 2500)
  // Below one second is raised, above an hour is lowered.
  assert.equal(queryTimeoutMs({ options: { queryTimeoutMs: 10 } }), 1000)
  assert.equal(queryTimeoutMs({ options: { queryTimeoutMs: 99_999_999 } }), 3_600_000)
})
