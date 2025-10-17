type ImageEntry = { imageId: number; url: string };

export default function parseHtml(content: string, images: ImageEntry[] = []) {
  const doc = new DOMParser().parseFromString(content ?? "", "text/html");

  const parseAttachments = () => {
    const htmlAttachments = doc.querySelectorAll('[id*="component-attachment"]')
    const attachments = Array.from(htmlAttachments).map((a) => {
      return {
        name: a.textContent,
        position: a.getAttribute('data-position'),
        explanationPosition: a.getAttribute('data-explanation'),
        fileType: a.getAttribute('data-attachment-type')
      }
    })

    return attachments
  };

  const parseContent = (): HTMLElement => {
    if (images.length > 0) {
      doc.querySelectorAll('img[data-image-id]')
        .forEach((img) => {
          const imgElement = images.find(i => i.imageId === parseInt(img.getAttribute('data-image-id')))
          if (imgElement) {
            img.setAttribute("src", imgElement.url)
          }
        })
    }

    return doc.querySelector('[id*="component-text"]')
  }

  const parseCustomElement = (customElement: string) => {
    const element = doc.getElementById(customElement)
    const object = {
      textContent: element?.textContent || '',
      explanationPosition: element?.getAttribute('data-explanation') || null
    }

    return object
  }

  const parseExplanations = (dbExplanations: Array<{ position: number; text: string; index: number }>) => {
    const nodes = Array.from(doc.querySelectorAll<HTMLElement>('[data-explanation]'));
    const byIndex = new Map(dbExplanations.map(e => [String(e.index), e]));
    const seen = new Set<string>();
    const out: { index: string; text: string; position: string }[] = [];

    nodes.forEach((el, domOrder) => {
      const idx = el.getAttribute('data-explanation');
      if (!idx || seen.has(idx)) return;
      seen.add(idx);

      const dataPos = el.getAttribute('data-position');
      const db = byIndex.get(idx);
      const pos = dataPos ?? (db ? String(db.position) : String(domOrder + 1));
      const text = db?.text ?? (el.textContent?.trim() ?? '');

      out.push({ index: idx, text, position: pos });
    });

    if (out.length === 0) {
      return dbExplanations
        .slice()
        .sort((a, b) => a.position - b.position)
        .map(e => ({ index: String(e.index), position: String(e.position), text: e.text }));
    }

    out.sort((a, b) => Number(a.position) - Number(b.position));
    return out;
  };

  const parseDynamicContent = () => doc.getElementById('dynamic-content');

  return {
    parseAttachments,
    parseContent,
    parseCustomElement,
    parseExplanations,
    parseDynamicContent
  };
}
