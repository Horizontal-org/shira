import { parser } from '@lezer/html'
import { SyntaxNode } from '@lezer/common'

export interface ExplanationMarkRange {
  from: number
  to: number
  index: number
}

export interface AnnotatableHtmlElement {
  from: number
  to: number
  insertionPosition: number
  explanationIndex: number | null
}

const explanationAttributePattern =
  /\bdata-explanation\s*=\s*(?:"(\d+)"|'(\d+)'|(\d+)(?=\s|\/?>))/i

const getExplanationIndex = (source: string, openTag: { from: number; to: number }) => {
  const match = source.slice(openTag.from, openTag.to).match(explanationAttributePattern)
  return match ? Number(match[1] ?? match[2] ?? match[3]) : null
}

const getOpenTag = (element: any) =>
  element?.getChild('OpenTag') ?? element?.getChild('SelfClosingTag') ?? null

const getTagName = (source: string, openTag: SyntaxNode | null) => {
  const tagName = openTag?.getChild('TagName')
  return tagName ? source.slice(tagName.from, tagName.to).toLowerCase() : ''
}

const findAncestor = (node: any, name: string) => {
  let candidate = node
  while (candidate && candidate.name !== name) candidate = candidate.parent
  return candidate
}

const findTagAt = (tree: any, position: number, bias: -1 | 1) => {
  let candidate = tree.resolve(position, bias)
  while (
    candidate &&
    candidate.name !== 'OpenTag' &&
    candidate.name !== 'SelfClosingTag'
  ) {
    candidate = candidate.parent
  }
  return candidate
}

export const getAnnotatableHtmlElement = (
  source: string,
  from: number,
  to: number,
): AnnotatableHtmlElement | null => {
  const tree = parser.parse(source)
  const startTag = findTagAt(tree, from, 1) ?? findTagAt(tree, from, -1)
  const endTag = findTagAt(tree, to, to === from ? 1 : -1) ?? findTagAt(tree, to, -1)
  const startIsInsideTag = startTag && from >= startTag.from && from < startTag.to
  const endIsInsideTag = endTag && (
    to === from
      ? to >= endTag.from && to < endTag.to
      : to > endTag.from && to <= endTag.to
  )

  if (
    !startTag || !endTag || !startIsInsideTag || !endIsInsideTag ||
    startTag.from !== endTag.from || startTag.to !== endTag.to
  ) {
    return null
  }

  const element = findAncestor(startTag, 'Element')
  const endToken = startTag.getChild('EndTag')
  const name = getTagName(source, startTag)
  if (!element || !endToken || ['mark', 'script', 'style', 'title'].includes(name)) return null

  return {
    from: element.from,
    to: element.to,
    insertionPosition: endToken.from,
    explanationIndex: getExplanationIndex(source, startTag),
  }
}

// Finds the closest annotated element containing the current source selection
export const getHtmlExplanationAtSelection = (
  source: string,
  from: number,
  to: number,
): number | null => {
  const tree = parser.parse(source)
  const startNode = tree.resolve(from, 1)
  const endNode = tree.resolve(to, to === from ? 1 : -1)

  let element = findAncestor(startNode, 'Element')
  while (element) {
    if (element.from <= endNode.from && element.to >= endNode.to) {
      const openTag = getOpenTag(element)
      if (openTag) {
        const index = getExplanationIndex(source, openTag)
        if (index !== null) return index
      }
    }
    element = findAncestor(element.parent, 'Element')
  }

  return null
}

export const getExplanationMarkRanges = (source: string): ExplanationMarkRange[] => {
  const ranges: ExplanationMarkRange[] = []

  parser.parse(source).iterate({
    enter(node) {
      if (node.name !== 'Element') return

      const openTag = getOpenTag(node.node)
      const closeTag = node.node.getChild('CloseTag')
      if (!openTag) return

      const index = getExplanationIndex(source, openTag)
      if (index === null) return

      const highlightsMarkContent =
        getTagName(source, openTag) === 'mark' && closeTag && openTag.to < closeTag.from
      ranges.push({
        from: highlightsMarkContent ? openTag.to : openTag.from,
        to: highlightsMarkContent ? closeTag.from : openTag.to,
        index,
      })
    },
  })

  return ranges
}

export const removeHtmlExplanation = (source: string, explanationIndex: number) => {
  const removals: Array<{ from: number; to: number }> = []

  parser.parse(source).iterate({
    enter(node) {
      if (node.name !== 'Element') return

      const openTag = getOpenTag(node.node)
      if (!openTag || getExplanationIndex(source, openTag) !== explanationIndex) return

      const closeTag = node.node.getChild('CloseTag')
      if (getTagName(source, openTag) === 'mark' && closeTag) {
        removals.push({ from: openTag.from, to: openTag.to })
        removals.push({ from: closeTag.from, to: closeTag.to })
        return
      }

      const tagSource = source.slice(openTag.from, openTag.to)
      const attributes = /\s+data-explanation\s*=\s*(?:"(\d+)"|'(\d+)'|(\d+)(?=\s|\/?>))/ig
      let match: RegExpExecArray | null
      while ((match = attributes.exec(tagSource))) {
        const index = Number(match[1] ?? match[2] ?? match[3])
        if (index === explanationIndex) {
          removals.push({
            from: openTag.from + match.index,
            to: openTag.from + match.index + match[0].length,
          })
        }
      }
    },
  })

  return removals
    .sort((a, b) => b.from - a.from)
    .reduce((value, removal) =>
      value.slice(0, removal.from) + value.slice(removal.to), source)
}
