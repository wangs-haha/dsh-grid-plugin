import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { checkRepository, localLinkErrors, maintenancePolicyErrors, markdownTargets, skillErrors } from '../scripts/check-repo.mjs'
import { testPlan } from '../scripts/test.mjs'

test('repository contracts and local documentation targets are valid', () => {
  assert.deepEqual(checkRepository(), [])
})

test('Markdown targets include images and angle paths but exclude code examples', () => {
  const source = '[one](<a b.md#heading>) ![shot](shots/table.png) [web](https://example.test/)\n' +
    '`[not a link](missing.md)`\n\n```md\n[example](missing.md)\n```\n'
  assert.deepEqual(markdownTargets(source), ['a b.md#heading', 'shots/table.png', 'https://example.test/'])
})

test('local links resolve relative files, detect missing/escaping paths and ignore external links', () => {
  const root = mkdtempSync(join(tmpdir(), 'grid-repo-check-'))
  try {
    mkdirSync(join(root, 'docs'))
    writeFileSync(join(root, 'README.md'), '# Test\n')
    assert.deepEqual(localLinkErrors(root, 'docs/index.md', '[home](<../README.md#test>) [web](https://example.test/)'), [])
    assert.match(localLinkErrors(root, 'docs/index.md', '[bad](missing.md)')[0], /missing file target/)
    assert.match(localLinkErrors(root, 'docs/index.md', '[bad](../../outside.md)')[0], /inside the repository/)
    assert.match(localLinkErrors(root, 'docs/index.md', '[bad](%E0%A4%A)')[0], /invalid URL encoding/)
  } finally {
    // root is the unique mkdtemp result created above, never a user-supplied path.
    rmSync(root, { recursive: true, force: true })
  }
})

test('project skill requires a discoverable name and non-empty frontmatter description', () => {
  assert.deepEqual(skillErrors('---\nname: grid-maintenance\ndescription: "Maintain Grid"\n---\n# Skill\n'), [])
  assert.ok(skillErrors('# Missing frontmatter').length)
  assert.ok(skillErrors('---\nname: Grid_Maintenance\ndescription: \n---\n').length)
  assert.ok(skillErrors('---\nname: grid-maintenance\ndescription: "ok"\nuserInvocable: true\n---\n').length)
  for (const description of ['# comment only', 'null', 'true', '[unterminated', '""', '"   "', '"unclosed']) {
    assert.ok(skillErrors(`---\nname: grid-maintenance\ndescription: ${description}\n---\n`).length, description)
  }
})

test('test runner forcibly disables inherited database opt-in by default', () => {
  const plan = testPlan([], { GRID_TEST_INTEGRATION: '1', GRID_TEST_SENTINEL: 'preserved' })
  assert.equal(plan.env.GRID_TEST_INTEGRATION, '0')
  assert.equal(plan.env.GRID_TEST_SENTINEL, 'preserved')
  assert.equal(plan.args[0], '--test')
  assert.ok(plan.args.includes('test/drivers.test.mjs'))
  assert.ok(plan.args.includes('test/ui.test.ts'))
  assert.ok(plan.args.slice(1).every((file) => /^test\/[^/]+\.test\.(mjs|ts)$/.test(file)))
})

test('installation and test scripts keep the safe defaults', () => {
  const manifest = { scripts: { test: 'node scripts/test.mjs' } }
  assert.deepEqual(maintenancePolicyErrors(manifest, 'config:\n  allowWrites: false\n'), [])
  assert.ok(maintenancePolicyErrors(manifest, 'config:\n  allowWrites: true\n').length)
  assert.ok(maintenancePolicyErrors(manifest, 'config: {}\n').length)
  assert.ok(maintenancePolicyErrors(manifest, 'allowWrites: false\nallowWrites: true\n').length)
  assert.ok(maintenancePolicyErrors({ scripts: { test: 'node --test' } }, 'allowWrites: false\n').length)
})

test('database integration requires the exact explicit flag and rejects unknown arguments', () => {
  assert.equal(testPlan(['--integration'], {}).env.GRID_TEST_INTEGRATION, '1')
  assert.throws(() => testPlan(['--integraton']), /Usage/)
})
