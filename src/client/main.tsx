/**
 * Web panel entry.
 *
 * The page loads this bundle as a classic script and hands it a `require` that
 * resolves React from the application's own module table, so this plugin never
 * ships a second copy of React.
 */

import { DICTIONARIES } from './lib/i18n'
import { GridPanel } from './panel/GridPanel'

const NS = 'grid'
const PANEL_ID = 'grid'

/** Minimal shape of the browser plugin context this panel uses. */
interface ClientContext {
  effect: (callback: () => void | (() => void), label?: string) => void
  locale: {
    register: (namespace: string, dictionaries: Record<string, unknown>) => void
    bind: (namespace: string) => (key: string) => string
  }
  slots: {
    inject: (owner: string, callback: () => void) => void
    register: (options: Record<string, unknown>, component: (props: never) => JSX.Element) => () => void
  }
}

/** Sidebar entry icon: database cylinder with a highlighted data column. */
function GridIcon({ size = 20, active }: { size?: number; active?: boolean }): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
      <ellipse cx="12" cy="5.6" rx="7.1" ry="2.9" stroke="currentColor" strokeWidth={1.5} />
      <path d="M4.9 5.6v12.8c0 1.6 3.18 2.9 7.1 2.9s7.1-1.3 7.1-2.9V5.6" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      <path d="M4.9 9.9c0 1.6 3.18 2.9 7.1 2.9s7.1-1.3 7.1-2.9" stroke="currentColor" strokeWidth={1.5} />
      <path d="M4.9 14.2c0 1.6 3.18 2.9 7.1 2.9s7.1-1.3 7.1-2.9" stroke="currentColor" strokeWidth={1.5} />
      <rect x="10.55" y="9.55" width="2.9" height="10.9" rx="1.2" fill="var(--dsw-alias-brand-primary)" opacity={active === false ? 0.55 : 0.9} />
    </svg>
  )
}

function apply(ctx: ClientContext): void {
  ctx.effect(() => ctx.locale.register(NS, DICTIONARIES), 'grid: dictionaries')
  const t = ctx.locale.bind(NS)

  ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key: PANEL_ID, locale: NS }, GridPanel))
  ctx.slots.inject('sidebar.panellist', () =>
    ctx.slots.register(
      { name: 'sidebar.panellist', id: PANEL_ID, order: 15, label: () => t('panel'), locale: NS },
      GridIcon as unknown as (props: never) => JSX.Element,
    ),
  )
}

export default { inject: ['slots', 'locale'], apply }
