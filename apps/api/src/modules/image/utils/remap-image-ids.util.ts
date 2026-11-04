export function remapImageIds(content: string, imageIdMap: Map<number, number>): string {
  let remapped = content;
  for (const [oldId, newId] of imageIdMap) {
    remapped = remapped.replace(new RegExp(`data-image-id="${oldId}"`, "g"), `data-image-id="${newId}"`);
  }
  return remapped;
}
