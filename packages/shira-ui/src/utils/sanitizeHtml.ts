import DOMPurify from 'dompurify'

// Question/template HTML can come from the external library service and is
// re-injected via dangerouslySetInnerHTML, so it must be sanitized client-side.
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'A' && node.hasAttribute('href')) {
    node.setAttribute('target', '_blank')
    node.setAttribute('rel', 'noopener noreferrer')
  }
})

export function sanitizeHtml(html?: string | null): string {
  if (!html) return ''

  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ['style', 'form', 'input', 'button', 'textarea', 'select', 'option'],
    ADD_ATTR: ['target']
  })
}
