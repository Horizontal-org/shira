const useParseHTML = (
  content: any,
  images: Array<{ imageId: number; url: string }> = []
) => {
  const html = new DOMParser().parseFromString(content, 'text/html')

  const integrateImages = () => {
    console.log('images length -> ', images.length)
    // insert image urls
    if (images.length > 0) {
      html.querySelectorAll('img[data-image-id]')
        .forEach((img) => {
          const imgElement = images.find(i => i.imageId === parseInt(img.getAttribute('data-image-id')))
          console.log("🚀 found image element -> ", imgElement)
          if (imgElement) {
            img.setAttribute("src", imgElement.url)
          }
        })
    }

  }

  const parseAttachments = () => {
    const htmlAttachments = html.querySelectorAll('[id*="component-attachment"]')
    const attachments = Array.from(htmlAttachments).map((a) => {
      return {
        name: a.textContent,
        position: a.getAttribute('data-position'),
        explanationPosition: a.getAttribute('data-explanation'),
        fileType: a.getAttribute('data-attachment-type')
      }
    })

    return attachments
  }

  const parseCustomElement = (customElement: string) => {
    const element = html.getElementById(customElement)
    console.log("🚀 ~ parseCustomElement ~ element:", element)
    // if element has data-image-id ? 
    const object = {
      textContent: element?.textContent || '',
      explanationPosition: element?.getAttribute('data-explanation') || null
    }

    return object
  }

  const parseContent = (): HTMLElement => {
    integrateImages()
    return html.querySelector('[id*="component-text"]')
  }

  const parseDynamicContent = () => {
    integrateImages()
    return html.getElementById('dynamic-content')
  }

  return {
    parseAttachments,
    parseCustomElement,
    parseContent,
    parseDynamicContent
  }
}

export default useParseHTML