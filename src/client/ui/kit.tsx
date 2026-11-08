/**
 * Reusable Ant Design styled primitives: buttons, forms, cards, dividers, layout splitters and dialogs.
 * Built following Ant Design 5.0 design specifications while adapting cleanly to the DSH environment.
 */

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
  database: 'M21 5c0 1.66-4.03 3-9 3S3 6.66 3 5s4.03-3 9-3 9 1.34 9 3z M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5 M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3',
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
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  eye: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  eyeOff: 'M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z',
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
/* Buttons (Ant Design 5 Button specification)                                 */
/* -------------------------------------------------------------------------- */

type ButtonVariant = 'default' | 'primary' | 'danger' | 'ghost' | 'tonal' | 'dashed' | 'link' | 'text'
type ButtonSize = 'sm' | 'md' | 'lg'

export function Button(props: {
  children?: ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  active?: boolean
  loading?: boolean
  title?: string
  className?: string
  type?: 'button' | 'submit'
  icon?: string
  block?: boolean
  style?: CSSProperties
}): JSX.Element {
  const classes = ['dg-btn', 'ant-btn']
  if (props.className) classes.push(props.className)
  if (props.variant && props.variant !== 'default') {
    classes.push(`dg-btn-${props.variant}`)
    classes.push(`ant-btn-${props.variant}`)
  } else {
    classes.push('ant-btn-default')
  }
  if (props.size) {
    classes.push(`dg-btn-${props.size}`)
    classes.push(`ant-btn-${props.size}`)
  }
  if (props.active) classes.push('dg-btn-active', 'ant-btn-active')
  if (props.loading) classes.push('ant-btn-loading')
  if (props.block) classes.push('ant-btn-block')

  return (
    <button
      type={props.type ?? 'button'}
      className={classes.join(' ')}
      onClick={props.onClick}
      disabled={props.disabled || props.loading}
      title={props.title}
      aria-label={props.title}
      aria-pressed={props.active}
      style={props.style}
    >
      {props.loading ? <Spinner /> : props.icon ? <Icon name={props.icon} size={props.size === 'sm' ? 11 : 13} /> : null}
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
  className?: string
  variant?: 'default' | 'text' | 'primary'
}): JSX.Element {
  return (
    <button
      type="button"
      className={`dg-iconbtn ant-btn ant-btn-icon-only${props.active ? ' dg-btn-active' : ''}${props.className ? ` ${props.className}` : ''}`}
      title={props.title}
      aria-label={props.title}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <Icon name={props.icon} size={props.size ?? 13} />
    </button>
  )
}

/* -------------------------------------------------------------------------- */
/* Forms & Inputs (Ant Design Form / Input specification)                      */
/* -------------------------------------------------------------------------- */

export function Field(props: {
  label: string
  hint?: string
  required?: boolean
  wide?: boolean
  children?: ReactNode
  className?: string
  style?: CSSProperties
}): JSX.Element {
  return (
    <label
      className={`dg-field ant-form-item${props.wide ? ' dg-field-wide' : ''}${props.required ? ' dg-field-required ant-form-item-required' : ''}${props.className ? ` ${props.className}` : ''}`}
      style={props.style}
    >
      <span className="dg-field-label ant-form-item-label">{props.label}</span>
      {props.children}
      {props.hint ? <span className="dg-field-hint ant-form-item-explain">{props.hint}</span> : null}
    </label>
  )
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }): JSX.Element {
  const { className, ...rest } = props
  return <input {...rest} className={`dg-input ant-input${className ? ` ${className}` : ''}`} />
}

export function TextArea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { className?: string },
): JSX.Element {
  const { className, ...rest } = props
  return <textarea {...rest} className={`dg-input dg-textarea ant-input ant-input-textarea${className ? ` ${className}` : ''}`} />
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>): JSX.Element {
  return <select {...props} className={`dg-input dg-select ant-select${props.className ? ` ${props.className}` : ''}`} />
}

/* -------------------------------------------------------------------------- */
/* Cards (Ant Design Card specification)                                       */
/* -------------------------------------------------------------------------- */

export function Card(props: {
  title?: ReactNode
  extra?: ReactNode
  children?: ReactNode
  hoverable?: boolean
  size?: 'default' | 'small'
  bordered?: boolean
  className?: string
  style?: CSSProperties
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}): JSX.Element {
  const classes = ['dg-card', 'ant-card']
  if (props.hoverable) classes.push('dg-card-hoverable', 'ant-card-hoverable')
  if (props.size === 'small') classes.push('dg-card-sm', 'ant-card-small')
  if (props.bordered === false) classes.push('ant-card-borderless')
  if (props.className) classes.push(props.className)

  return (
    <div className={classes.join(' ')} style={props.style} onClick={props.onClick}>
      {props.title || props.extra ? (
        <div className="dg-card-head ant-card-head">
          <div className="dg-card-head-title ant-card-head-title">{props.title}</div>
          {props.extra ? <div className="dg-card-extra ant-card-extra">{props.extra}</div> : null}
        </div>
      ) : null}
      <div className="dg-card-body ant-card-body">{props.children}</div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Dividers & Layout (Ant Design Divider specification)                        */
/* -------------------------------------------------------------------------- */

export function Divider(props: {
  type?: 'horizontal' | 'vertical'
  children?: ReactNode
  orientation?: 'left' | 'center' | 'right'
  dashed?: boolean
  className?: string
  style?: CSSProperties
}): JSX.Element {
  const { type = 'horizontal', orientation = 'center', dashed = false, children, className = '', style } = props
  if (type === 'vertical') {
    return <span className={`dg-divider ant-divider dg-divider-vertical ant-divider-vertical${dashed ? ' ant-divider-dashed' : ''} ${className}`} style={style} role="separator" />
  }
  return (
    <div
      className={`dg-divider ant-divider dg-divider-horizontal ant-divider-horizontal${children ? ` dg-divider-with-text ant-divider-with-text ant-divider-with-text-${orientation}` : ''}${dashed ? ' ant-divider-dashed' : ''} ${className}`}
      style={style}
      role="separator"
    >
      {children ? <span className="dg-divider-inner-text ant-divider-inner-text">{children}</span> : null}
    </div>
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

/* -------------------------------------------------------------------------- */
/* Tags & Badges (Ant Design Tag & Badge specification)                        */
/* -------------------------------------------------------------------------- */

export function Tag(props: {
  children?: ReactNode
  color?: 'blue' | 'green' | 'gold' | 'red' | 'cyan' | 'purple' | 'default'
  bordered?: boolean
  icon?: string
  className?: string
  style?: CSSProperties
  onClick?: () => void
}): JSX.Element {
  const colorClass = props.color && props.color !== 'default' ? ` dg-tag-${props.color} ant-tag-${props.color}` : ''
  return (
    <span
      className={`dg-tag ant-tag${colorClass}${props.bordered === false ? ' ant-tag-borderless' : ''}${props.className ? ` ${props.className}` : ''}`}
      style={props.style}
      onClick={props.onClick}
    >
      {props.icon ? <Icon name={props.icon} size={11} /> : null}
      {props.children}
    </span>
  )
}

export function Badge(props: {
  count?: ReactNode
  status?: 'success' | 'processing' | 'default' | 'error' | 'warning'
  text?: ReactNode
  children?: ReactNode
  className?: string
}): JSX.Element {
  if (props.status || props.text) {
    return (
      <span className={`dg-badge-status ant-badge ant-badge-status${props.className ? ` ${props.className}` : ''}`}>
        <span className={`dg-badge-status-dot ant-badge-status-dot dg-badge-status-${props.status ?? 'default'} ant-badge-status-${props.status ?? 'default'}`} />
        {props.text ? <span className="dg-badge-status-text ant-badge-status-text">{props.text}</span> : null}
        {props.children}
      </span>
    )
  }
  return (
    <span className={`dg-badge ant-badge${props.className ? ` ${props.className}` : ''}`}>
      {props.children}
      {props.count !== undefined ? <sup className="ant-badge-count">{props.count}</sup> : null}
    </span>
  )
}

export function StatusDot({ status }: { status: 'closed' | 'opening' | 'open' | 'error' }): JSX.Element {
  const suffix = status === 'open' ? ' dg-dot-open ant-badge-status-success' : status === 'error' ? ' dg-dot-error ant-badge-status-error' : status === 'opening' ? ' dg-dot-busy ant-badge-status-processing' : ' ant-badge-status-default'
  return <span className={`dg-dot${suffix}`} />
}

/* -------------------------------------------------------------------------- */
/* Alerts & Banners (Ant Design Alert specification)                           */
/* -------------------------------------------------------------------------- */

export function Alert(props: {
  type?: 'info' | 'success' | 'warning' | 'error'
  message?: ReactNode
  description?: ReactNode
  showIcon?: boolean
  closable?: boolean
  onClose?: () => void
  className?: string
  style?: CSSProperties
  children?: ReactNode
}): JSX.Element | null {
  const type = props.type ?? 'info'
  const content = props.children ?? props.message
  if (!content) return null
  const iconName = type === 'error' ? 'alert' : type === 'warning' ? 'alert' : type === 'success' ? 'check' : 'info'

  return (
    <div
      className={`dg-banner ant-alert dg-banner-${type} ant-alert-${type}${props.description ? ' ant-alert-with-description' : ''}${props.className ? ` ${props.className}` : ''}`}
      style={props.style}
      role="alert"
    >
      {props.showIcon !== false ? (
        <span className="ant-alert-icon">
          <Icon name={iconName} size={props.description ? 16 : 14} />
        </span>
      ) : null}
      <div className="ant-alert-content">
        <div className="dg-banner-text ant-alert-message">{content}</div>
        {props.description ? <div className="ant-alert-description">{props.description}</div> : null}
      </div>
      {props.closable || props.onClose ? (
        <button type="button" className="dg-iconbtn dg-iconbtn-tiny ant-alert-close-icon" onClick={props.onClose} aria-label="close">
          <Icon name="x" size={10} />
        </button>
      ) : null}
    </div>
  )
}

export function Banner(props: {
  tone?: 'info' | 'error' | 'success' | 'warning'
  children?: ReactNode
  onClose?: () => void
}): JSX.Element | null {
  return <Alert type={props.tone ?? 'info'} onClose={props.onClose} children={props.children} />
}

/* -------------------------------------------------------------------------- */
/* Other Ant Design Primitives (Segmented, Empty, Spin)                        */
/* -------------------------------------------------------------------------- */

export function Segmented<T extends string>(props: {
  value: T
  options: Array<{ value: T; label: string }>
  onChange: (value: T) => void
  size?: 'sm' | 'md'
}): JSX.Element {
  return (
    <div className={`dg-seg ant-segmented${props.size === 'sm' ? ' ant-segmented-sm' : ''}`}>
      <div className="ant-segmented-group">
        {props.options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`ant-segmented-item${option.value === props.value ? ' dg-seg-on ant-segmented-item-selected' : ''}`}
            onClick={() => props.onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export function Spinner({ label }: { label?: string }): JSX.Element {
  return (
    <span className="dg-spinner-row ant-spin ant-spin-spinning">
      <span className="dg-spinner ant-spin-dot" aria-hidden />
      {label ? <span className="ant-spin-text">{label}</span> : null}
    </span>
  )
}

export function Empty({ title, hint, children }: { title: string; hint?: string; children?: ReactNode }): JSX.Element {
  return (
    <div className="dg-empty ant-empty">
      <div className="ant-empty-image">
        <Icon name="database" size={36} />
      </div>
      <div className="dg-empty-title ant-empty-description">{title}</div>
      {hint ? <div className="dg-empty-hint">{hint}</div> : null}
      {children ? <div className="ant-empty-footer">{children}</div> : null}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Overlays (Ant Design Modal & Menu specification)                            */
/* -------------------------------------------------------------------------- */

export function Modal(props: {
  title: string
  subtitle?: string
  icon?: string
  onClose: () => void
  children?: ReactNode
  footer?: ReactNode
  width?: number
  className?: string
  busy?: boolean
}): JSX.Element {
  const closeRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(props.onClose)
  onCloseRef.current = props.onClose
  const busyRef = useRef(props.busy)
  busyRef.current = props.busy

  useEffect(() => {
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && !busyRef.current) {
        event.stopPropagation()
        onCloseRef.current()
      }
    }
    document.addEventListener('keydown', onKey)
    const timer = setTimeout(() => closeRef.current?.focus(), 0)
    return () => {
      document.removeEventListener('keydown', onKey)
      clearTimeout(timer)
    }
  }, [])

  return createPortal(
    <div
      className="dg-backdrop ant-modal-root"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !props.busy) props.onClose()
      }}
    >
      <div
        className={`dg-modal ant-modal${props.className ? ` ${props.className}` : ''}`}
        style={{ width: `${props.width ?? 560}px` }}
        role="dialog"
        aria-modal="true"
        aria-label={props.title}
      >
        <div className="dg-modal-head ant-modal-header">
          <div className="dg-modal-title-wrap ant-modal-title">
            {props.icon ? (
              <span className="dg-modal-icon-badge">
                <Icon name={props.icon} size={15} />
              </span>
            ) : null}
            <div>
              <div className="dg-modal-title">{props.title}</div>
              {props.subtitle ? <div className="dg-modal-subtitle">{props.subtitle}</div> : null}
            </div>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="dg-iconbtn ant-modal-close"
            onClick={() => !props.busy && props.onClose()}
            aria-label="close"
          >
            <Icon name="x" size={13} />
          </button>
        </div>
        <div className="dg-modal-body ant-modal-body">{props.children}</div>
        {props.footer ? <div className="dg-modal-foot ant-modal-footer">{props.footer}</div> : null}
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
      className="dg-ctxmenu ant-dropdown-menu"
      role="menu"
      style={{
        left: `${Math.min(props.x, window.innerWidth - 200)}px`,
        top: `${Math.min(props.y, Math.max(8, window.innerHeight - 40 - items.length * 28))}px`,
      }}
    >
      {items.map((item, index) =>
        item.separator ? (
          <div key={`sep-${index}`} className="dg-ctxsep ant-dropdown-menu-item-divider" />
        ) : (
          <button
            key={`${item.label}-${index}`}
            type="button"
            role="menuitem"
            className={`dg-ctxitem ant-dropdown-menu-item${item.danger ? ' dg-ctxitem-danger ant-dropdown-menu-item-danger' : ''}`}
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

export function style(properties: CSSProperties): CSSProperties {
  return properties
}
