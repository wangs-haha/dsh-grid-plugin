/** SQL console: highlighted editor with completion, result tabs and query saving. */

import { useEffect, useMemo, useRef, useState } from 'react'

import { api } from '../lib/api'
import { displayValue, fmt } from '../lib/format'
import { SQL_FUNCTIONS, SQL_KEYWORDS, beautifySql, caretPoint, tokenizeSql } from '../lib/sql'
import type { SqlResult, StatementResult, Tab } from '../lib/types'
import { Banner, Button, Empty, Field, Icon, IconButton, Input, Modal, Spinner } from '../ui/kit'

interface SqlViewProps {
  t: (key: string) => string
  tab: Extract<Tab, { kind: 'sql' }>
  tables: string[]
  notify: (message: string, tone?: 'info' | 'error' | 'success') => void
  onSaved: () => void
}

interface Completion {
  items: Array<{ label: string; kind: string }>
  index: number
  left: number
  top: number
  start: number
  end: number
}

export function SqlView(props: SqlViewProps): JSX.Element {
  const { t, tab } = props
  const [text, setText] = useState(tab.initialSql ?? '')
  const [result, setResult] = useState<SqlResult | null>(null)
  const [active, setActive] = useState(0)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [summary, setSummary] = useState('')
  const [completion, setCompletion] = useState<Completion | null>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [saveOpen, setSaveOpen] = useState(false)
  const [saveName, setSaveName] = useState('')
  const areaRef = useRef<HTMLTextAreaElement>(null)
  const highlightRef = useRef<HTMLPreElement>(null)

  const lineCount = useMemo(() => text.split('\n').length, [text])

  const candidates = useMemo(() => {
    const list: Array<{ label: string; kind: string }> = []
    for (const name of props.tables) list.push({ label: name, kind: 'table' })
    for (const word of SQL_FUNCTIONS) list.push({ label: word, kind: 'fn' })
    for (const word of SQL_KEYWORDS) list.push({ label: word, kind: 'kw' })
    return list
  }, [props.tables])

  useEffect(() => {
    if (!tab.initialSql) return
    setText(tab.initialSql)
  }, [tab.id, tab.initialSql])

  const openCompletion = (force: boolean): void => {
    const area = areaRef.current
    if (!area) return
    const caret = area.selectionStart
    const prefix = /([A-Za-z_][A-Za-z0-9_]*)$/.exec(text.slice(0, caret))?.[1] ?? ''
    if (!prefix && !force) return setCompletion(null)
    const lower = prefix.toLowerCase()
    const seen = new Set<string>()
    const items = candidates
      .filter((item) => {
        const label = item.label.toLowerCase()
        if (lower && !label.startsWith(lower)) return false
        if (seen.has(label)) return false
        seen.add(label)
        return true
      })
      .slice(0, 14)
    if (items.length === 0) return setCompletion(null)
    const point = caretPoint(area, caret - prefix.length)
    setCompletion({ items, index: 0, left: point.left, top: point.top + 18, start: caret - prefix.length, end: caret })
  }

  const acceptCompletion = (): void => {
    if (!completion) return
    const item = completion.items[completion.index]
    if (!item) return
    const caret = completion.start + item.label.length
    setText(`${text.slice(0, completion.start)}${item.label}${text.slice(completion.end)}`)
    setCompletion(null)
    requestAnimationFrame(() => {
      const area = areaRef.current
      if (!area) return
      area.focus()
      area.selectionStart = area.selectionEnd = caret
    })
  }

  const run = async (script: string): Promise<void> => {
    const sql = script.trim()
    if (!sql) return props.notify(t('noStatements'), 'info')
    setBusy(true)
    setError('')
    try {
      const outcome = await api.sql({ connectionId: tab.connectionId, database: tab.database, sql })
      setResult(outcome)
      setActive(0)
      const failed = outcome.results.find((entry) => entry.error)
      const first = outcome.results[0]
      setSummary(failed ? fmt(t('queryFailed'), { ms: outcome.durationMs }) : fmt(t('queryOk'), { n: first?.rowCount ?? 0, ms: outcome.durationMs }))
      // A capped result is not a complete answer; say so rather than letting the
      // row count speak for itself.
      if (outcome.results.some((entry) => entry.truncated)) setError(t('resultTruncated'))
      if (failed?.error) setError(failed.error)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause))
      setResult(null)
      setSummary('')
    } finally {
      setBusy(false)
    }
  }

  /**
   * Stop the statement on the server, not just in this tab.
   *
   * The Host runs typed SQL on its own connection, so the cancel request does
   * not have to wait for the running query to return.
   */
  const cancel = async (): Promise<void> => {
    try {
      const outcome = await api.sqlCancel(tab.connectionId)
      props.notify(
        outcome.cancelled ? t('queryCancelled') : outcome.reason || t('cancelUnsupported'),
        outcome.cancelled ? 'info' : 'error',
      )
    } catch (cause) {
      props.notify(cause instanceof Error ? cause.message : String(cause), 'error')
    }
  }

  const runCurrent = (): void => {
    const area = areaRef.current
    if (area && area.selectionStart !== area.selectionEnd) void run(text.slice(area.selectionStart, area.selectionEnd))
    else void run(text)
  }

  const explain = (): void => {
    const first = text.split(';').map((part) => part.trim()).filter(Boolean)[0]
    if (!first) return props.notify(t('noStatements'), 'info')
    void run(/^explain\b/i.test(first) ? first : `EXPLAIN ${first}`)
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (completion) {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        return setCompletion({ ...completion, index: (completion.index + 1) % completion.items.length })
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        return setCompletion({ ...completion, index: (completion.index - 1 + completion.items.length) % completion.items.length })
      }
      if (event.key === 'Enter' || event.key === 'Tab') {
        event.preventDefault()
        return acceptCompletion()
      }
      if (event.key === 'Escape') {
        event.preventDefault()
        return setCompletion(null)
      }
    }
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault()
      return runCurrent()
    }
    if (event.ctrlKey && event.key === ' ') {
      event.preventDefault()
      return openCompletion(true)
    }
    if (event.key === 'Tab') {
      event.preventDefault()
      const area = event.currentTarget
      const start = area.selectionStart
      const end = area.selectionEnd
      setText(`${text.slice(0, start)}  ${text.slice(end)}`)
      requestAnimationFrame(() => {
        area.selectionStart = area.selectionEnd = start + 2
      })
    }
  }

  const current: StatementResult | null = result?.results[active] ?? null

  const renderResult = (): JSX.Element => {
    if (!result) return <Empty title={t('runHint')} hint={t('completionHint')} />
    if (!current) return <Empty title={t('emptyResult')} />
    if (current.error) {
      return (
        <div style={{ padding: 9 }}>
          <div className="dg-err">{current.error}</div>
          <pre className="dg-pre" style={{ marginTop: 7, opacity: 0.7 }}>
            {current.statement}
          </pre>
        </div>
      )
    }
    if (current.columns.length === 0) {
      return (
        <div className="dg-sqlmsg">
          {fmt(t('affected'), { n: current.affected ?? 0 })} · {current.durationMs} ms
        </div>
      )
    }
    return (
      <div className="dg-grid-wrap">
        <table className="dg-grid" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th className="dg-rownum">#</th>
              {current.columns.map((column) => (
                <th key={column.name}>{column.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {current.rows.map((row, index) => (
              <tr key={index}>
                <td className="dg-rownum">{index + 1}</td>
                {current.columns.map((column) => {
                  const cell = displayValue(row[column.name], t('null'))
                  return (
                    <td key={column.name} className={cell.isNull ? 'dg-null' : ''} title={cell.text}>
                      {cell.text}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="dg-sql">
      <div className="dg-sql-top">
        <div className="dg-editor">
          <div className="dg-gutter" aria-hidden>
            <div style={{ transform: `translateY(${-scrollTop}px)` }}>
              {Array.from({ length: lineCount }, (_, index) => index + 1).join('\n')}
            </div>
          </div>
          <div className="dg-code">
            <pre className="dg-hl" ref={highlightRef} aria-hidden>
              {tokenizeSql(text).map((token, index) =>
                token.type === 'ws' ? token.value : (
                  <span key={index} className={`dg-tok dg-tok-${token.type === 'plain' ? 'ident' : token.type}`}>
                    {token.value}
                  </span>
                ),
              )}
              <span>{'\u200b'}</span>
            </pre>
            <textarea
              ref={areaRef}
              className="dg-sql-text"
              value={text}
              spellCheck={false}
              placeholder="SELECT * FROM ..."
              onChange={(event) => {
                setText(event.target.value)
                requestAnimationFrame(() => openCompletion(false))
              }}
              onScroll={(event) => {
                setScrollTop(event.currentTarget.scrollTop)
                if (highlightRef.current) {
                  const target = event.currentTarget
                  highlightRef.current.scrollTop = target.scrollTop
                  highlightRef.current.scrollLeft = target.scrollLeft
                }
              }}
              onKeyDown={onKeyDown}
              onBlur={() => setTimeout(() => setCompletion(null), 120)}
            />
            {completion ? (
              <div className="dg-complete" style={{ left: completion.left, top: completion.top }}>
                {completion.items.map((item, index) => (
                  <div
                    key={`${item.kind}-${item.label}`}
                    className={`dg-complete-item${index === completion.index ? ' dg-complete-item-on' : ''}`}
                    onMouseDown={(event) => {
                      event.preventDefault()
                      setCompletion({ ...completion, index })
                      requestAnimationFrame(acceptCompletion)
                    }}
                  >
                    <span>{item.label}</span>
                    <span className="dg-complete-kind">{item.kind}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <div className="dg-sqlbar">
          <Button size="sm" variant="primary" disabled={busy} onClick={runCurrent}>
            {busy ? <Spinner /> : <Icon name="play" size={10} />}
            {t('run')}
          </Button>
          {busy ? (
            <Button size="sm" variant="danger" onClick={() => void cancel()}>
              {t('cancelQuery')}
            </Button>
          ) : null}
          <Button size="sm" disabled={busy} onClick={explain}>
            {t('explain')}
          </Button>
          <Button size="sm" onClick={() => setText(beautifySql(text))}>
            <Icon name="wand" size={10} />
            {t('beautify')}
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setSaveName(saveName || `Query ${new Date().toISOString().slice(0, 16).replace('T', ' ')}`)
              setSaveOpen(true)
            }}
          >
            <Icon name="bookmark" size={10} />
            {t('saveQuery')}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => { setText(''); setResult(null); setError(''); setSummary('') }}>
            {t('clear')}
          </Button>
          <span className="dg-muted dg-hint">
            {t('runHint')}
          </span>
          <div className="dg-spacer" />
          {summary ? <span className="dg-chip">{summary}</span> : null}
        </div>
      </div>
      {result && result.results.length > 1 ? (
        <div className="dg-rtabs">
          {result.results.map((entry, index) => (
            <button
              key={index}
              type="button"
              className={`dg-rtab${index === active ? ' dg-rtab-active' : ''}`}
              onClick={() => setActive(index)}
            >
              {entry.error ? <Icon name="alert" size={10} /> : null}
              {fmt(t('result'), { n: index + 1 })} · {entry.rowCount}
            </button>
          ))}
        </div>
      ) : null}
      {error && !current?.error ? (
        <Banner tone="error" onClose={() => setError('')}>
          {error}
        </Banner>
      ) : null}
      <div className="dg-results">{renderResult()}</div>
      {saveOpen ? (
        <Modal
          title={t('saveQuery')}
          width={420}
          onClose={() => setSaveOpen(false)}
          footer={
            <>
              <Button onClick={() => setSaveOpen(false)}>{t('cancel')}</Button>
              <Button
                variant="primary"
                onClick={() => {
                  void (async () => {
                    try {
                      await api.saveQuery({
                        name: saveName.trim() || 'Query',
                        sql: text,
                        connectionId: tab.connectionId,
                        database: tab.database,
                        scope: 'user',
                      })
                      setSaveOpen(false)
                      props.notify(t('querySaved'), 'success')
                      props.onSaved()
                    } catch (cause) {
                      props.notify(cause instanceof Error ? cause.message : String(cause), 'error')
                    }
                  })()
                }}
              >
                {t('save')}
              </Button>
            </>
          }
        >
          <Field label={t('queryName')}>
            <Input value={saveName} autoFocus onChange={(event) => setSaveName(event.target.value)} />
          </Field>
          <pre className="dg-pre" style={{ maxHeight: 160, overflow: 'auto' }}>
            {text}
          </pre>
        </Modal>
      ) : null}
    </div>
  )
}
