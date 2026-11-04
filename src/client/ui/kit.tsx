/** Reusable primitives: the panel never re-declares a button or a dialog. */

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

/* -------------------------------------------------------------------------- */
/* Icons                                                                       */
/* -------------------------------------------------------------------------- */

const PATHS: Record<string, string> = {
  plus: 'M12 5v14M5 12h14',
  refresh: 'M20 11a8 8 0 1 0-2.3 5.7M20 5v6h-6',
  play: 'M8 5v14l11-7z',
  trash: 'M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3',
  pencil: 'M4 20h4L20 8l-4-4L4 16z',
  chevron: 'M9 6l6 6-6 6',
  chevronLeft: 'M15 6l-6 6 6 6',
  database: 'M12 3c4 0 7 1.3 7 3s-3 3-7 3-7-1.3-7-3 3-3 7-3zM5 6v12c0 1.7 3 3 7 3s7-1.3 7-3V6',
  table: 'M4 5h16v14H4zM4 10h16M10 10v9',
  view: 'M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  key: 'M14 4a6 6 0 1 0-5.2 8.9L4 18v2h3v-3h3v-3h2.2A6 6 0 0 0 14 4z',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM16 16l4 4',
  download: 'M12 4v10M8 11l4 4 4-4M5 19h14',
  x: 'M6 6l12 12M18 6L6 18',
  check: 'M5 13l4 4L19 7',
  plug: 'M9 3v6M15 3v6M6 9h12v3a6 6 0 0 1-12 0zM12 18v3',
  unplug: 'M9 3v6M15 3v6M6 9h12v3a6 6 0 0 1-6 6M12 18v3M4 4l16 16',
  filter: 'M4 5h16l-6 7v6l-4 2v-8z',
  folder: 'M3 6h6l2 2h10v11H3z',
  copy: 'M9 9h10v10H9zM5 15V5h10',
  alert: 'M12 4l9 16H3zM12 10v4M12 17h.01',
  columns: 'M4 5h16M4 12h16M4 19h16',
  wand: 'M4 20l10-10M14 5l1.5 1.5M18 3l1 2 2 .5-2 1.5.5 2-2-1-2 1 .5-2-2-1.5 2-.5z',
  history: 'M12 8v5l3 2M4 12a8 8 0 1 0 3-6.2M4 4v4h4',
  function: 'M9 4c-2 0-3 1-3 3v10c0 2-1 3-3 3M6 11h7M15 14l5 6M20 14l-5 6',
  user: 'M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM4 21a8 8 0 0 1 16 0',
  bookmark: 'M6 4h12v17l-6-4-6 4z',
  archive: 'M4 4h16v4H4zM5 8h14v12H5zM9 13h6',
  link: 'M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1',
  info: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 11v6M12 8h.01',
}

export function Icon({ name, size = 14 }: { name: string; size?: number }): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
    >
      <path d={PATHS[name] ?? PATHS.table} />
    </svg>
  )
}

/* -------------------------------------------------------------------------- */
/* Controls                                                                    */
/* -------------------------------------------------------------------------- */

type ButtonVariant = 'default' | 'primary' | 'danger' | 'ghost'

export function Button(props: {
  children?: ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  variant?: ButtonVariant
  size?: 'sm' | 'md'
  disabled?: boolean
  active?: boolean
  title?: string
  type?: 'button' | 'submit'
}): JSX.Element {
  const classes = ['dg-btn']
  if (props.variant && props.variant !== 'default') classes.push(`dg-btn-${props.variant}`)
  if (props.size === 'sm') classes.push('dg-btn-sm')
  if (props.active) classes.push('dg-btn-active')
  return (
    <button
      type={props.type ?? 'button'}
      className={classes.join(' ')}
      onClick={props.onClick}
      disabled={props.disabled}
      title={props.title}
      aria-label={props.title}
      aria-pressed={props.active}
    >
      {props.children}
    </button>
  )
}

export function IconButton(props: {
  icon: string
  title: string
  onClick?: () => void
  disabled?: boolean
  active?: boolean
  size?: number
}): JSX.Element {
  return (
    <button
      type="button"
      className={`dg-iconbtn${props.active ? ' dg-btn-active' : ''}`}
      title={props.title}
      aria-label={props.title}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <Icon name={props.icon} size={props.size ?? 13} />
    </button>
  )
}

export function Field(props: { label: string; hint?: string; wide?: boolean; children?: ReactNode }): JSX.Element {
  return (
    <label className={`dg-field${props.wide ? ' dg-field-wide' : ''}`}>
      <span className="dg-field-label">{props.label}</span>
      {props.children}
      {props.hint ? <span className="dg-field-hint">{props.hint}</span> : null}
    </label>
  )
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }): JSX.Element {
  const { className, ...rest } = props
  return <input {...rest} className={`dg-input${className ? ` ${className}` : ''}`} />
}

/**
 * A multi-line field, for values that do not fit on one line (JSON, notes, SQL).
 *
 * It shares the input styling so a form can mix both without looking assembled
 * from two kits.
 */
export function TextArea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { className?: string },
): JSX.Element {
  const { className, ...rest } = props
  return <textarea {...rest} className={`dg-input dg-textarea${className ? ` ${className}` : ''}`} />
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>): JSX.Element {
  return <select {...props} className={`dg-input dg-select${props.className ? ` ${props.className}` : ''}`} />
}

export function Spinner({ label }: { label?: string }): JSX.Element {
  return (
    <span className="dg-spinner-row">
      <span className="dg-spinner" aria-hidden />
      {label ? <span>{label}</span> : null}
    </span>
  )
}

export function Empty({ title, hint, children }: { title: string; hint?: string; children?: ReactNode }): JSX.Element {
  return (
    <div className="dg-empty">
      <div className="dg-empty-title">{title}</div>
      {hint ? <div className="dg-empty-hint">{hint}</div> : null}
      {children}
    </div>
  )
}

export function Banner(props: { tone?: 'info' | 'error' | 'success'; children?: ReactNode; onClose?: () => void }): JSX.Element | null {
  if (!props.children) return null
  return (
    <div className={`dg-banner dg-banner-${props.tone ?? 'info'}`} role="status">
      <Icon name={props.tone === 'error' ? 'alert' : 'check'} size={12} />
      <span className="dg-banner-text">{props.children}</span>
      {props.onClose ? (
        <button type="button" className="dg-iconbtn dg-iconbtn-tiny" onClick={props.onClose} aria-label="dismiss">
          <Icon name="x" size={10} />
        </button>
      ) : null}
    </div>
  )
}

export function Segmented<T extends string>(props: {
  value: T
  options: Array<{ value: T; label: string }>
  onChange: (value: T) => void
}): JSX.Element {
  return (
    <div className="dg-seg">
      {props.options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={option.value === props.value ? 'dg-seg-on' : ''}
          onClick={() => props.onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export function StatusDot({ status }: { status: 'closed' | 'opening' | 'open' | 'error' }): JSX.Element {
  const suffix = status === 'open' ? ' dg-dot-open' : status === 'error' ? ' dg-dot-error' : status === 'opening' ? ' dg-dot-busy' : ''
  return <span className={`dg-dot${suffix}`} />
}

/* -------------------------------------------------------------------------- */
/* Overlays                                                                    */
/* -------------------------------------------------------------------------- */

export function Modal(props: {
  title: string
  onClose: () => void
  children?: ReactNode
  footer?: ReactNode
  width?: number
  busy?: boolean
}): JSX.Element {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && !props.busy) {
        event.stopPropagation()
        props.onClose()
      }
    }
    document.addEventListener('keydown', onKey)
    const timer = setTimeout(() => closeRef.current?.focus(), 0)
    return () => {
      document.removeEventListener('keydown', onKey)
      clearTimeout(timer)
    }
  }, [props.busy, props.onClose])

  return createPortal(
    <div
      className="dg-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !props.busy) props.onClose()
      }}
    >
      <div
        className="dg-modal"
        style={{ width: `${props.width ?? 520}px` }}
        role="dialog"
        aria-modal="true"
        aria-label={props.title}
      >
        <div className="dg-modal-head">
          <span className="dg-modal-title">{props.title}</span>
          <button
            ref={closeRef}
            type="button"
            className="dg-iconbtn"
            onClick={() => !props.busy && props.onClose()}
            aria-label="close"
          >
            <Icon name="x" size={13} />
          </button>
        </div>
        <div className="dg-modal-body">{props.children}</div>
        {props.footer ? <div className="dg-modal-foot">{props.footer}</div> : null}
      </div>
    </div>,
    document.body,
  )
}

export interface MenuItem {
  label?: string
  icon?: string
  hint?: string
  danger?: boolean
  disabled?: boolean
  separator?: boolean
  onClick?: () => void
}

export function Menu(props: { x: number; y: number; items: MenuItem[]; onClose: () => void }): JSX.Element {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onDown = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) props.onClose()
    }
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') props.onClose()
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [props.onClose])

  const items = props.items.filter(Boolean)
  return createPortal(
    <div
      ref={ref}
      className="dg-ctxmenu"
      role="menu"
      style={{
        left: `${Math.min(props.x, window.innerWidth - 200)}px`,
        top: `${Math.min(props.y, Math.max(8, window.innerHeight - 40 - items.length * 26))}px`,
      }}
    >
      {items.map((item, index) =>
        item.separator ? (
          <div key={`sep-${index}`} className="dg-ctxsep" />
        ) : (
          <button
            key={`${item.label}-${index}`}
            type="button"
            role="menuitem"
            className={`dg-ctxitem${item.danger ? ' dg-ctxitem-danger' : ''}`}
            disabled={item.disabled}
            onClick={() => {
              props.onClose()
              if (!item.disabled) item.onClick?.()
            }}
          >
            {item.icon ? <Icon name={item.icon} size={12} /> : null}
            {item.label}
            {item.hint ? <span className="dg-ctxhint">{item.hint}</span> : null}
          </button>
        ),
      )}
    </div>,
    document.body,
  )
}

export function Splitter(props: {
  width: number
  setWidth: (width: number) => void
  min: number
  max: number
  onDragging?: (dragging: boolean) => void
}): JSX.Element {
  const start = (event: React.MouseEvent): void => {
    event.preventDefault()
    const startX = event.clientX
    const startWidth = props.width
    props.onDragging?.(true)
    const move = (moveEvent: MouseEvent): void => {
      props.setWidth(Math.max(props.min, Math.min(props.max, startWidth + moveEvent.clientX - startX)))
    }
    const up = (): void => {
      props.onDragging?.(false)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
  }
  return <div className="dg-split" role="separator" aria-orientation="vertical" onMouseDown={start} />
}

export function style(properties: CSSProperties): CSSProperties {
  return properties
}
