// Count email text, excluding HTML markup and embedded styles or scripts
export const getEmailTextLength = (content?: string): number => {
  if (!content) return 0;

  const { body } = new DOMParser().parseFromString(content, 'text/html')
  body.querySelectorAll('style, script').forEach(element => element.remove());
  return body.textContent?.length ?? 0;
}
