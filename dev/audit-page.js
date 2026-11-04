/* In-page UI audit. Runs inside the harness page and returns measurements only.
 *
 * Every number here comes from the rendered page: colours are normalised through
 * a 1x1 canvas (so `color-mix()` and `color(srgb …)` resolve the same way the
 * compositor resolves them), translucent backgrounds are composited down the
 * ancestor chain, and contrast uses the WCAG 2.x formula. The point is to make
 * "the panel is unreadable / flat" a measurement instead of an opinion.
 */
(() => {
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  const paint = canvas.getContext('2d', { willReadFrequently: true })

  /** Normalise any CSS colour string to linear-friendly sRGB bytes + alpha. */
  const colour = (value) => {
    paint.clearRect(0, 0, 1, 1)
    paint.fillStyle = '#000000'
    paint.fillStyle = value
    paint.fillRect(0, 0, 1, 1)
    const [r, g, b, a] = paint.getImageData(0, 0, 1, 1).data
    return { r, g, b, a: a / 255 }
  }

  /** Source-over composite of `fg` onto `bg`. */
  const over = (fg, bg) => ({
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
    a: 1,
  })

  const luminance = ({ r, g, b }) => {
    const channel = (value) => {
      const v = value / 255
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    }
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
  }

  const contrast = (a, b) => {
    const x = luminance(a)
    const y = luminance(b)
    return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
  }

  /* CIE L*. Absolute luminance differences are useless in dark themes, where
     every surface sits in the bottom 2% of the scale: a step that looks obvious
     there scores a hundredth of the same step in light mode. */
  const lightness = ({ r, g, b }) => {
    const channel = (value) => {
      const v = value / 255
      return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    }
    const y = 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
    return y > 0.008856 ? 116 * Math.cbrt(y) - 16 : 903.3 * y
  }

  const hex = ({ r, g, b }) =>
    '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')

  /** The colour actually seen behind `element`. */
  const backdrop = (element) => {
    const layers = []
    for (let node = element; node; node = node.parentElement) {
      const value = colour(getComputedStyle(node).backgroundColor)
      if (value.a > 0) {
        layers.push(value)
        if (value.a >= 1) break
      }
    }
    let base = { r: 255, g: 255, b: 255, a: 1 }
    for (let index = layers.length - 1; index >= 0; index -= 1) base = over(layers[index], base)
    return base
  }

  const visible = (element) => {
    const style = getComputedStyle(element)
    if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return false
    const rect = element.getBoundingClientRect()
    return rect.width > 0 && rect.height > 0
  }

  const label = (element) => {
    const name = String(element.className || '').toString().trim().split(/\s+/).filter(Boolean).slice(0, 2).join('.')
    return (element.tagName.toLowerCase() + (name ? '.' + name : '')).slice(0, 48)
  }

  /* -- 1. text contrast ---------------------------------------------------- */
  const text = []
  const icons = []
  for (const element of document.querySelectorAll('.dg-root *')) {
    if (!visible(element)) continue
    const style = getComputedStyle(element)
    const size = parseFloat(style.fontSize) || 0
    const owns = [...element.childNodes].some(
      (node) => node.nodeType === 3 && (node.textContent || '').trim().length > 0,
    )
    /* The SQL editor paints its glyphs with the highlight layer underneath and
       leaves the textarea itself transparent; measuring it would report 1:1. */
    const transparent =
      colour(style.color).a === 0 || colour(style.webkitTextFillColor || style.color).a === 0
    /* A sort arrow or key mark is a state indicator sitting next to its label:
       WCAG 1.4.11 applies (3:1), not the text threshold. */
    const isStateGlyph = element.closest('.dg-sortmark, .dg-colkey') !== null
    if (owns && !transparent && !isStateGlyph) {
      const bg = backdrop(element)
      const fg = over(colour(style.color), bg)
      text.push({ element: label(element), size, ratio: Number(contrast(fg, bg).toFixed(2)), fg: hex(fg), bg: hex(bg) })
    } else if (element.tagName.toLowerCase() === 'svg' || element.closest('button')) {
      // An icon-only control: the glyph carries the meaning, so 3:1 applies.
      if (element.querySelector('svg') || element.tagName.toLowerCase() === 'svg') {
        const bg = backdrop(element)
        const fg = over(colour(style.color), bg)
        icons.push({ element: label(element), ratio: Number(contrast(fg, bg).toFixed(2)) })
      }
    }
  }

  const below = text.filter((entry) => entry.ratio < 4.5).sort((a, b) => a.ratio - b.ratio)
  const thinIcons = icons.filter((entry) => entry.ratio < 3).sort((a, b) => a.ratio - b.ratio)

  /* -- 2. surface separation ---------------------------------------------- */
  const box = (selector) => document.querySelector(selector)
  const surfaceOf = (selector) => {
    const element = box(selector)
    if (!element) return null
    const colourValue = backdrop(element)
    return { selector, colour: hex(colourValue), lightness: Number(lightness(colourValue).toFixed(2)) }
  }
  const pairs = [
    ['.dg-toolbar', '.dg-main'],
    ['.dg-tree', '.dg-main'],
    ['.dg-tabs', '.dg-content'],
    ['.dg-subbar', '.dg-grid-wrap'],
    ['.dg-pager', '.dg-grid-wrap'],
    ['.dg-status', '.dg-main'],
    ['.dg-chip', '.dg-toolbar'],
    ['.dg-card', '.dg-content'],
  ]
  const surfaces = []
  for (const [a, b] of pairs) {
    const first = surfaceOf(a)
    const second = surfaceOf(b)
    if (first && second && a !== b) {
      surfaces.push({
        pair: a + ' | ' + b,
        a: first.colour,
        b: second.colour,
        delta: Number(Math.abs(first.lightness - second.lightness).toFixed(2)),
      })
    }
  }

  /* -- 3. interaction feedback -------------------------------------------- */
  /* Hover/pressed/zebra cannot be forced onto a pseudo-class, so the token is
     painted onto a probe element and composited over its real backdrop. */
  const root = box('.dg-root') || document.body
  const probe = (declaration, host) => {
    const target = host || root
    /* The backdrop has to be read from the host *before* the probe exists,
       otherwise the probe's own background is what the walk finds and every
       token measures as a zero difference. */
    const base = backdrop(target)
    const element = document.createElement('span')
    element.style.cssText = 'position:absolute;width:1px;height:1px;' + declaration
    target.appendChild(element)
    const own = colour(getComputedStyle(element).backgroundColor)
    element.remove()
    return { composed: over(own, base), base }
  }
  const feedback = []
  const feedbackHost = box('.dg-grid tbody td') || root
  for (const [name, declaration] of [
    ['--dg-hover', 'background: var(--dg-hover)'],
    ['--dg-pressed', 'background: var(--dg-pressed)'],
    ['--dg-zebra', 'background: var(--dg-zebra)'],
    ['--dg-surface-2', 'background: var(--dg-surface-2)'],
    ['--dg-accent-soft', 'background: var(--dg-accent-soft)'],
  ]) {
    const { composed, base } = probe(declaration, feedbackHost)
    feedback.push({
      token: name,
      delta: Number(Math.abs(lightness(composed) - lightness(base)).toFixed(2)),
      colour: hex(composed),
    })
  }

  /* -- 4. target size and type scale ------------------------------------- */
  const small = []
  for (const element of document.querySelectorAll('.dg-root button, .dg-root input, .dg-root select, .dg-root textarea, .dg-root [role="button"]')) {
    if (!visible(element)) continue
    const rect = element.getBoundingClientRect()
    if (rect.width < 24 || rect.height < 24) {
      small.push({ element: label(element), w: Math.round(rect.width), h: Math.round(rect.height) })
    }
  }
  const sizes = new Set()
  for (const element of document.querySelectorAll('.dg-root *')) {
    if (!visible(element)) continue
    sizes.add(parseFloat(getComputedStyle(element).fontSize))
  }

  /* -- 5. names that had no rule ----------------------------------------- */
  const stray = []
  for (const className of ['dg-results', 'dg-rownum-editable']) {
    const element = document.querySelector('.' + className)
    if (element) {
      const style = getComputedStyle(element)
      stray.push({ className, flex: style.flexGrow, overflow: style.overflow })
    }
  }

  /* -- 6. glyphs that no UI font covers ----------------------------------- */
  /* U+26BF was used as the primary-key mark and rendered as a tofu box. */
  const unsupported = '\u26bf'
  const tofu = []
  for (const element of document.querySelectorAll('.dg-root *')) {
    const own = [...element.childNodes]
      .filter((node) => node.nodeType === 3)
      .map((node) => node.textContent || '')
      .join('')
    if (own.includes(unsupported)) tofu.push(label(element))
  }
  const colkey = {
    count: document.querySelectorAll('.dg-colkey').length,
    drawing: Boolean(document.querySelector('.dg-colkey svg')),
  }

  return {
    text: { total: text.length, below: below.length, worst: below.slice(0, 6), all: text.slice(0, 0) },
    icons: { total: icons.length, thin: thinIcons.length, worst: thinIcons.slice(0, 4) },
    surfaces,
    feedback,
    targets: { below24: small.slice(0, 8), count: small.length },
    fontSizes: [...sizes].sort((a, b) => a - b),
    stray,
    tofu,
    colkey,
  }
})()
