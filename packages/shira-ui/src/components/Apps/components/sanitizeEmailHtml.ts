import createDOMPurify from 'dompurify'

const allowedStyles: Record<string, RegExp> = {
  color: /^(#[0-9a-f]{3,8}|[a-z]+|rgba?\([\d.,%\s]+\))$/i,
  'background-color': /^(#[0-9a-f]{3,8}|[a-z]+|rgba?\([\d.,%\s]+\))$/i,
  'font-family': /^[a-z\d\s,"'-]+$/i,
  'font-size': /^\d+(\.\d+)?(px|em|rem|%)$/,
  'font-weight': /^(normal|bold|[1-9]00)$/,
  'font-style': /^(normal|italic|oblique)$/,
  'line-height': /^\d+(\.\d+)?(px|em|rem|%)?$/,
  'text-decoration': /^(none|underline|line-through)$/,
  'text-align': /^(left|right|center|justify)$/,
  width: /^(\d+(px|%)|auto)$/,
  height: /^(\d+(px|%)|auto)$/,
  'min-width': /^\d+px$/,
  'max-width': /^\d+(px|%)$/,
  'min-height': /^\d+px$/,
  border: /^(0|none|\d+(\.\d+)?px (solid|dashed|dotted|double) (#[0-9a-f]{3,8}|[a-z]+|rgba?\([\d.,%\s]+\)))$/i,
  'border-collapse': /^(collapse|separate)$/,
  padding: /^\d+px$/,
  margin: /^\d+px$/,
  'vertical-align': /^(top|middle|bottom|baseline)$/,
}

let purifier: ReturnType<typeof createDOMPurify>

// Sanitize at the rendering boundary, including emails saved before API sanitization.
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
      data.attrValue = Object.entries(allowedStyles)
        .flatMap(([property, pattern]) => {
          const value = style.getPropertyValue(property)
          return pattern.test(value) ? [`${property}: ${value}`] : []
        })
        .join('; ')
      data.keepAttr = Boolean(data.attrValue)
    })
  }

  if (!purifier.isSupported) return ''

  return purifier.sanitize(source, {
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
