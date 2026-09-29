import { parser } from '@lezer/html'

export interface ExplanationMarkRange {
  from: number
  to: number
  index: number
}

export const getExplanationMarkRanges = (source: string): ExplanationMarkRange[] => {
  const ranges: ExplanationMarkRange[] = []

  parser.parse(source).iterate({
    enter(node) {
      if (node.name !== 'Element') return

      const openTag = node.node.getChild('OpenTag')
      const closeTag = node.node.getChild('CloseTag')
      const tagName = openTag?.getChild('TagName')
      if (!openTag || !closeTag || !tagName) return
      if (source.slice(tagName.from, tagName.to).toLowerCase() !== 'mark') return

      const match = source
        .slice(openTag.from, openTag.to)
        .match(/\bdata-explanation\s*=\s*(?:"(\d+)"|'(\d+)'|(\d+)(?=\s|>))/i)
      if (!match || openTag.to >= closeTag.from) return

      ranges.push({
        from: openTag.to,
        to: closeTag.from,
        index: Number(match[1] ?? match[2] ?? match[3]),
      })
    },
  })

  return ranges
}
