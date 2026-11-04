/**
 * Build the Web panel.
 *
 * The Host half is plain ESM loaded by Node, so only the client is bundled.
 * The output must be a classic script that registers the lazy factory the page's
 * module table expects:
 *
 *   window.__ModuleLoader__.load({ id, factory(require) { … } })
 *
 * React stays external — the page provides it — so the bundle carries only this
 * plugin's own code plus its stylesheet.
 */

import { build } from 'esbuild'
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')
const dist = join(root, 'dist')
const temporary = join(dist, '.client.cjs')

mkdirSync(dist, { recursive: true })

const result = await build({
  entryPoints: [join(root, 'src', 'client', 'main.tsx')],
  outfile: temporary,
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  target: ['chrome120', 'edge120', 'firefox120', 'safari17'],
  jsx: 'automatic',
  minify: true,
  legalComments: 'none',
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  loader: { '.css': 'text' },
  define: { 'process.env.NODE_ENV': '"production"' },
  logLevel: 'warning',
})

const code = readFileSync(temporary, 'utf8')
rmSync(temporary, { force: true })

const wrapper = [
  'window.__ModuleLoader__.load({',
  "  id: '@local/dsh-grid',",
  '  factory(require) {',
  '    const module = { exports: {} };',
  '    const exports = module.exports;',
  code,
  '    return module.exports.default || module.exports;',
  '  },',
  '});',
  '',
].join('\n')

const target = join(dist, 'client.js')
writeFileSync(target, wrapper)
const size = Buffer.byteLength(wrapper, 'utf8')
console.log(`dist/client.js  ${(size / 1024).toFixed(1)} KB  (${result.warnings.length} warnings)`)
