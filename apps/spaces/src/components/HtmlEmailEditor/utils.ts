import { sanitizeEmailHtml } from '@horizontal-org/shira-ui'

export const previewHtml = (
  source: string,
  images: Record<string, string> = {}
) => {
  const template = document.createElement('template')
  template.innerHTML = source
  template.content.querySelectorAll('img[data-image-id]').forEach((image) => {
    const url = images[image.getAttribute('data-image-id')]
    if (url && /^https?:\/\//i.test(url)) image.setAttribute('src', url)
  })
  return sanitizeEmailHtml(template.innerHTML)
}
