/** Run only repository-owned test files; existing database writes require opt-in. */
import { spawnSync } from 'node:child_process'
import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))

export function testPlan(args = [], inheritedEnv = process.env) {
  if (args.some((arg) => arg !== '--integration')) throw new Error('Usage: node scripts/test.mjs [--integration]')
  const files = readdirSync(new URL('../test/', import.meta.url))
    .filter((name) => /\.test\.(mjs|ts)$/.test(name))
    .sort()
    .map((name) => `test/${name}`)
  if (!files.length) throw new Error('No repository test files found')
  return {
    args: ['--test', ...files],
    // Do not let an inherited opt-in silently change the safe default.
    env: { ...inheritedEnv, GRID_TEST_INTEGRATION: args.includes('--integration') ? '1' : '0' },
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const plan = testPlan(process.argv.slice(2))
  const result = spawnSync(process.execPath, plan.args, { cwd: root, stdio: 'inherit', env: plan.env })
  if (result.error) throw result.error
  process.exitCode = result.status ?? 1
}
