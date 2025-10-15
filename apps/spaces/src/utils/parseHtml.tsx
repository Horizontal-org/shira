const parseHtml = (
  content: any,
  images: Array<{ imageId: number; url: string }> = []
) => {
  const html = new DOMParser().parseFromString(content, 'text/html');

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

    return attachments;
  };

  const parseCustomElement = (customElement: string) => {
    const element = html.getElementById(customElement);
    console.log("🚀 ~ parseCustomElement ~ element:", element);

    const object = {
      textContent: element?.textContent || '',
      explanationPosition: element?.getAttribute('data-explanation') || null
    };

    return object;
  };

  const parseContent = (): HTMLElement => {

    // insert image urls
    if (images.length > 0) {
      html.querySelectorAll('img[data-image-id]')
        .forEach((img) => {
          const imgElement = images.find(i => i.imageId === parseInt(img.getAttribute('data-image-id')))
          if (imgElement) {
            img.setAttribute("src", imgElement.url)
          }
        })
    };

    console.log("🚀 ~ parseContent ~ element:", html.querySelector('[id*="component-text"]'));
    return html.querySelector('[id*="component-text"]');
  };

  const parseDynamicContent = () => html.getElementById('dynamic-content');

  return {
    parseAttachments,
    parseCustomElement,
    parseContent,
    parseDynamicContent
  };
}

export default parseHtml;