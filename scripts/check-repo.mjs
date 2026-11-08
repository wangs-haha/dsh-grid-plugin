/** Repository-only checks: no network, dependency installation or auto-fixes. */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const repository = fileURLToPath(new URL('../', import.meta.url))

/** Inline links/images in prose; deliberately not a complete Markdown parser. */
export function markdownTargets(source) {
  const prose = source
    .replace(/(^|\n)(`{3,}|~{3,})[^\n]*\n[\s\S]*?\n\2[ \t]*(?=\n|$)/g, '$1')
    .replace(/`+[^`\n]*`+/g, '')
  return [...prose.matchAll(/!?\[[^\]\n]*\]\(\s*(?:<([^>\n]+)>|([^\s)]+))(?:\s+"[^"\n]*")?\s*\)/g)]
    .map((match) => match[1] ?? match[2])
}

/** Check file targets, not anchor spelling or external availability. */
export function localLinkErrors(root, markdownFile, source) {
  const errors = []
  for (const target of markdownTargets(source)) {
    if (/^(?:https?:|mailto:|#)/i.test(target)) continue
    let pathname
    try { pathname = decodeURIComponent(target.split(/[?#]/, 1)[0]) } catch {
      errors.push(`${markdownFile}: invalid URL encoding: ${target}`)
      continue
    }
    if (!pathname) continue
    const absolute = resolve(root, dirname(markdownFile), pathname)
    const pathFromRoot = relative(root, absolute)
    if (isAbsolute(pathname) || /^[a-z]:|^[/\\]/i.test(pathname) || pathFromRoot === '..' || pathFromRoot.startsWith(`..${sep}`)) {
      errors.push(`${markdownFile}: link must stay inside the repository: ${target}`)
    } else if (!existsSync(absolute) || !statSync(absolute).isFile()) {
      errors.push(`${markdownFile}: missing file target: ${target}`)
    }
  }
  return errors
}

/** Validate our intentionally simple two-field skill header, not arbitrary YAML. */
export function skillErrors(source) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(source)
  if (!match) return ['skill must start with a closed YAML frontmatter block']
  const errors = []
  if (!/^name: grid-maintenance\r?$/m.test(match[1])) errors.push('skill name must be grid-maintenance')
  const description = /^description: (.*)\r?$/m.exec(match[1])?.[1]?.trim()
  try {
    // JSON double-quoted strings are a safe YAML subset. Do not pretend a regex
    // can distinguish arbitrary YAML scalars, comments, arrays and mappings.
    const value = JSON.parse(description ?? '')
    if (typeof value !== 'string' || !value.trim()) throw new Error('not a description')
  } catch {
    errors.push('skill description must be a non-empty JSON double-quoted string (YAML-compatible)')
  }
  if (/^(?:disableModelInvocation|modelInvocable|userInvocable):/m.test(match[1])) errors.push('legacy invocation keys are unsupported')
  return errors
}

/** These defaults must not drift silently during packaging or script cleanup. */
export function maintenancePolicyErrors(manifest, patch) {
  const errors = []
  if (manifest.scripts?.test !== 'node scripts/test.mjs') errors.push('default test must use the safe repository test runner')
  const gates = [...patch.matchAll(/^\s*allowWrites:\s*([^\r\n]*)$/gm)]
  if (gates.length !== 1 || !/^false(?:\s+#.*)?\s*$/.test(gates[0]?.[1] ?? '')) {
    errors.push('install patch must contain one explicit allowWrites: false default')
  }
  return errors
}

function markdownFiles(root, directory = '') {
  const files = []
  for (const entry of readdirSync(join(root, directory), { withFileTypes: true })) {
    const path = join(directory, entry.name)
    // Root dependency/output trees are never traversed. Only maintained docs/skills.
    if (entry.isDirectory() && (directory || ['docs', '.agents'].includes(entry.name))) {
      files.push(...markdownFiles(root, path))
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(path)
    }
  }
  return files
}

export function checkRepository(root = repository) {
  const errors = []
  const required = [
    'AGENTS.md', 'CONTRIBUTING.md', 'SECURITY.md', '.editorconfig', '.gitattributes', '.gitignore',
    'README.md', 'CHANGELOG.md', 'LICENSE', 'pnpm-lock.yaml', '.github/workflows/ci.yml',
    'docs/README.md', 'docs/user-guide.md', 'docs/architecture.md', 'docs/development.md',
    'docs/testing.md', 'docs/security.md', 'docs/maintenance.md', 'docs/archive/README.md',
    '.agents/skills/grid-maintenance/SKILL.md', 'index.js', 'dist/client.js', 'cordis.patch.yml',
    'locale/en.json', 'locale/zh.json', 'icon.svg',
  ]
  for (const path of required) {
    if (!existsSync(join(root, path)) || !statSync(join(root, path)).isFile()) errors.push(`required file missing: ${path}`)
  }
  const manifest = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
  if (manifest.type !== 'module' || manifest.name !== '@local/dsh-grid') errors.push('keep the ESM Grid package identity')
  if (!/^pnpm@\d+\.\d+\.\d+$/.test(manifest.packageManager ?? '')) errors.push('pin an exact pnpm packageManager version')
  for (const path of ['index.js', 'lib', 'dist/client.js', 'cordis.patch.yml', 'locale/*.json', 'icon.svg', 'docs']) {
    if (!manifest.files?.includes(path)) errors.push(`install files must include: ${path}`)
  }
  for (const path of [manifest.exports?.['.'], manifest.exports?.['./client'], manifest.dsh?.bundle?.patch]) {
    if (typeof path !== 'string' || !existsSync(resolve(root, path))) errors.push(`missing runtime entry: ${path}`)
  }
  for (const driver of ['mysql2', 'pg', 'mssql', 'ioredis', 'ssh2']) {
    if (!manifest.optionalDependencies?.[driver] || manifest.dependencies?.[driver]) errors.push(`${driver} must remain optional`)
  }
  for (const name of ['build', 'test', 'test:integration', 'check', 'check:repo', 'locale:check', 'audit:ssh']) {
    if (!manifest.scripts?.[name]) errors.push(`required script missing: ${name}`)
  }
  for (const [name, command] of Object.entries(manifest.scripts ?? {})) {
    for (const match of command.matchAll(/\b(?:scripts|dev|test)\/[\w./-]+\.(?:mjs|js|ts)\b/g)) {
      if (!existsSync(join(root, match[0]))) errors.push(`script ${name}: missing ${match[0]}`)
    }
  }
  const patchPath = join(root, 'cordis.patch.yml')
  if (existsSync(patchPath)) errors.push(...maintenancePolicyErrors(manifest, readFileSync(patchPath, 'utf8')))
  for (const path of markdownFiles(root)) {
    const source = readFileSync(join(root, path), 'utf8')
    errors.push(...localLinkErrors(root, path, source))
    // Preserve historical prose without retroactively reformatting it.
    if (!path.replaceAll('\\', '/').startsWith('docs/archive/')) {
      if (source.includes('\r')) errors.push(`${path}: use LF line endings`)
      if (!source.endsWith('\n')) errors.push(`${path}: add a final newline`)
    }
  }
  const skillPath = join(root, '.agents/skills/grid-maintenance/SKILL.md')
  if (existsSync(skillPath)) errors.push(...skillErrors(readFileSync(skillPath, 'utf8')))
  return errors
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const errors = checkRepository()
  if (errors.length) {
    console.error(errors.map((error) => `- ${error}`).join('\n'))
    process.exitCode = 1
  } else {
    console.log('Repository contracts, local Markdown targets and project skill are valid')
  }
}
