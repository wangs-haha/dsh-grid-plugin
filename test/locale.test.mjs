/**
 * The client embeds both dictionaries (a browser bundle cannot import JSON),
 * and the Plugin Manager reads `locale/*.json`. This test keeps the two in sync.
 */

import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const source = readFileSync(join(root, 'src', 'client', 'lib', 'i18n.ts'), 'utf8')

/**
 * Extract one dictionary literal from the i18n module.
 * @param {'en' | 'zh'} name - dictionary name.
 */
function dictionary(name) {
  const pattern = new RegExp(`export const ${name}: Dictionary = (\\{[\\s\\S]*?\\n\\})`, 'm')
  const match = pattern.exec(source)
  assert.ok(match, `the ${name} dictionary is present`)
  return new Function(`return ${match[1]}`)()
}

test('the embedded dictionaries match locale/*.json', () => {
  for (const name of ['en', 'zh']) {
    const embedded = dictionary(name)
    const onDisk = JSON.parse(readFileSync(join(root, 'locale', `${name}.json`), 'utf8'))
    assert.deepEqual(onDisk, embedded, `${name}.json is out of sync; run scripts/export-locale.mjs`)
  }
})

test('both dictionaries define the same keys and the display metadata', () => {
  const en = dictionary('en')
  const zh = dictionary('zh')
  assert.deepEqual(Object.keys(en).sort(), Object.keys(zh).sort())
  for (const value of [en, zh]) {
    assert.ok(value.meta.title.length > 0)
    assert.ok(value.meta.description.length > 20)
    assert.ok(value.panel.length > 0)
  }
})

test('no dictionary value is left empty', () => {
  for (const name of ['en', 'zh']) {
    const value = dictionary(name)
    const empty = Object.entries(value).filter(([key, entry]) => key !== 'meta' && typeof entry === 'string' && entry.trim() === '')
    assert.deepEqual(empty, [], `${name} has empty labels`)
  }
})
