const useParseHTML = (
  content: any
) => {
  const html = new DOMParser().parseFromString(content, 'text/html')

  const parseAttachments = () => {
    const htmlAttachments = html.querySelectorAll('[id*="component-attachment"]')
    const attachments = Array.from(htmlAttachments).map((a) => {
      return {
        name: a.textContent,
        position: a.getAttribute('data-position'),
        explanationPosition: a.getAttribute('data-explanation')
      }
    })

    return attachments
  }

  const parseCustomElement = (customElement: string) => {
    const element = html.getElementById(customElement)

    const object = {
      textContent: element?.textContent || '',
      explanationPosition: element?.getAttribute('data-explanation') || null
    }

    return object
  }

  const parseContent = (): HTMLElement => html.querySelector('[id*="component-text"]')

  const parseDynamicContent = () => html.getElementById('dynamic-content')

  return {
    parseAttachments,
    parseCustomElement,
    parseContent,
    parseDynamicContent
  }
}

export default useParseHTML