export const remapHtml = (content) => {
  const remap = Object.keys(content).map((o) => {
    return content[o]  
  }).join()

  const html = new DOMParser().parseFromString(`<div>${remap}</div>`, 'text/html')
  return html
}