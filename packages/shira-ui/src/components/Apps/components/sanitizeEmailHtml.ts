import createDOMPurify from 'dompurify'
import { EMAIL_ALLOWED_STYLE_NAMES } from '../../../constants/emailSanitization'

const SAFE_COLOR = /^(transparent|#[0-9a-f]{3,8}|rgba?\([^)]+\)|[a-z]+)$/i
const SAFE_LENGTH = /^(0|auto|inherit|\d+(\.\d+)?(px|em|rem|%))$/i
const SAFE_SPACING = /^(0|\d+(\.\d+)?(px|em|rem|%))(\s+(0|\d+(\.\d+)?(px|em|rem|%))){0,3}$/i
const SAFE_FONT_FAMILY = /^[\w\s"',.-]+$/i
const SAFE_FONT_WEIGHT = /^(normal|bold|[1-9]00)$/i
const SAFE_LINE_HEIGHT = /^(normal|\d+(\.\d+)?(%|px|em|rem)?)$/i
const SAFE_TEXT_ALIGN = /^(left|right|center|justify|-webkit-center)$/i
const SAFE_TEXT_DECORATION = /^(none|underline|line-through)$/i
const SAFE_BORDER = /^(0|none|\d+(\.\d+)?px\s+(solid|dashed|dotted)\s+.+)$/i

const EMAIL_STYLE_RULES: Record<(typeof EMAIL_ALLOWED_STYLE_NAMES)[number], RegExp> = {
  'background-color': SAFE_COLOR,
  border: SAFE_BORDER,
  'border-radius': SAFE_LENGTH,
  'border-spacing': SAFE_LENGTH,
  'border-style': /^(none|solid|dashed|dotted)$/i,
  color: SAFE_COLOR,
  display: /^(none|block|inline|inline-block|table|table-row|table-cell)$/i,
  'font-family': SAFE_FONT_FAMILY,
  'font-size': SAFE_LENGTH,
  'font-weight': SAFE_FONT_WEIGHT,
  height: SAFE_LENGTH,
  'line-height': SAFE_LINE_HEIGHT,
  margin: SAFE_SPACING,
  'max-height': SAFE_LENGTH,
  'max-width': SAFE_LENGTH,
  'min-height': SAFE_LENGTH,
  'min-width': SAFE_LENGTH,
  opacity: /^(0(\.\d+)?|1(\.0+)?)$/,
  overflow: /^(visible|hidden|auto)$/i,
  padding: SAFE_SPACING,
  'table-layout': /^(auto|fixed)$/i,
  'text-align': SAFE_TEXT_ALIGN,
  'text-decoration': SAFE_TEXT_DECORATION,
  width: SAFE_LENGTH,
  'word-break': /^(normal|break-all|break-word)$/i,
  'word-wrap': /^(normal|break-word)$/i,
}

let purifier: ReturnType<typeof createDOMPurify>

export const sanitizeEmailHtml = (source: string): string => {
  if (typeof window === 'undefined') return ''

  if (!purifier) {
    purifier = createDOMPurify(window)
    if (!purifier.isSupported) return ''

    purifier.addHook('uponSanitizeAttribute', (_node, data) => {
      if (data.attrName === 'src' || data.attrName === 'href') {
        try {
          const url = new URL(data.attrValue, window.location.href)
          data.keepAttr = ['http:', 'https:', 'mailto:'].includes(url.protocol)
        } catch {
          data.keepAttr = false
        }
        return
      }
      if (data.attrName !== 'style') return

      const style = document.createElement('span').style
      style.cssText = data.attrValue
      data.attrValue = EMAIL_ALLOWED_STYLE_NAMES
        .flatMap((property) => {
          const value = style.getPropertyValue(property)
          return EMAIL_STYLE_RULES[property].test(value) ? [`${property}: ${value}`] : []
        })
        .join('; ')
      data.keepAttr = Boolean(data.attrValue)
    })
  }

  if (!purifier.isSupported) return ''

  return purifier.sanitize(source, {
    FORBID_TAGS: ['script', 'style'],
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'sub', 'sup',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li',
      'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'colgroup', 'col',
      'blockquote', 'hr', 'a', 'span', 'div', 'mark', 'img',
    ],
    ALLOWED_ATTR: [
      'class', 'id', 'style', 'dir', 'href', 'title', 'src', 'alt',
      'width', 'height', 'colspan', 'rowspan', 'data-image-id',
      'data-original-width', 'data-original-height', 'data-original-filename',
      'data-explanation', 'data-position', 'data-attachment-type',
    ],
    ALLOW_DATA_ATTR: false,
    ALLOW_ARIA_ATTR: false,
  })
}
