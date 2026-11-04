/**
 * Export the client dictionaries to `locale/*.json`.
 *
 * The browser bundle cannot import JSON, so `src/client/lib/i18n.ts` is the
 * single source of truth and this script mirrors it for the Plugin Manager,
 * which reads `meta.title` and `meta.description` without activating the plugin.
 *
 * Usage: node scripts/export-locale.mjs [--check]
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const source = readFileSync(join(root, 'src', 'client', 'lib', 'i18n.ts'), 'utf8')

/**
 * Extract one dictionary object literal by its export name.
 * @param {'en' | 'zh'} name - dictionary to read.
 */
function extract(name) {
  const pattern = new RegExp(`export const ${name}: Dictionary = (\\{[\\s\\S]*?\\n\\})`, 'm')
  const match = pattern.exec(source)
  if (!match) throw new Error(`cannot find the ${name} dictionary`)
  return new Function(`return ${match[1]}`)()
}

const en = extract('en')
const zh = extract('zh')

const enKeys = Object.keys(en).sort()
const zhKeys = Object.keys(zh).sort()
const missingInZh = enKeys.filter((key) => !zhKeys.includes(key))
const missingInEn = zhKeys.filter((key) => !enKeys.includes(key))
if (missingInZh.length || missingInEn.length) {
  console.error('dictionary key mismatch', { missingInZh, missingInEn })
  process.exit(1)
}

const enPath = join(root, 'locale', 'en.json')
const zhPath = join(root, 'locale', 'zh.json')
const expectedEn = `${JSON.stringify(en, null, 2)}\n`
const expectedZh = `${JSON.stringify(zh, null, 2)}\n`

if (process.argv.includes('--check')) {
  if (readFileSync(enPath, 'utf8') !== expectedEn || readFileSync(zhPath, 'utf8') !== expectedZh) {
    console.error('locale/*.json is out of date; run node scripts/export-locale.mjs')
    process.exit(1)
  }
  console.log(`locale files are in sync (${enKeys.length} keys)`)
  process.exit(0)
}

writeFileSync(enPath, expectedEn)
writeFileSync(zhPath, expectedZh)
console.log(`wrote locale/en.json and locale/zh.json (${enKeys.length} keys)`)
