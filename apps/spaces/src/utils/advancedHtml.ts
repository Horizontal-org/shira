import { parser } from '@lezer/html'

export interface HtmlIssue {
  code: 'syntax'
  from: number
  to: number
}

export function htmlSyntaxIssues(source: string): HtmlIssue[] {
  const issues: HtmlIssue[] = []
  const unterminatedTag = /<\/?[a-z][^<>]*$/i.exec(source)
  if (unterminatedTag) {
    issues.push({
      code: 'syntax',
      from: unterminatedTag.index,
      to: source.length,
    })
  }

  parser.parse(source).iterate({
    enter(node) {
      // Email providers often emit recoverable markup (for example, a slash
      // before an image attribute). Browsers repair these zero-width parser
      // warnings, so only block errors that identify an actual source range.
      if (
        (node.type.isError && node.from !== node.to) ||
        node.name === 'MismatchedCloseTag'
      )
        issues.push({ code: 'syntax', from: node.from, to: node.to })
      if (
        node.name === 'Element' &&
        node.node.firstChild?.name === 'OpenTag' &&
        node.node.lastChild?.name !== 'CloseTag'
      ) {
        const tag = node.node.firstChild.getChild('TagName')
        const name = tag ? source.slice(tag.from, tag.to).toLowerCase() : ''
        const optionalOrVoid = [
          'html',
          'head',
          'body',
          'p',
          'li',
          'dt',
          'dd',
          'rt',
          'rp',
          'optgroup',
          'option',
          'colgroup',
          'thead',
          'tbody',
          'tfoot',
          'tr',
          'td',
          'th',
          'area',
          'base',
          'br',
          'col',
          'embed',
          'hr',
          'img',
          'input',
          'link',
          'meta',
          'param',
          'source',
          'track',
          'wbr',
        ]
        if (name && !optionalOrVoid.includes(name))
          issues.push({ code: 'syntax', from: node.from, to: node.to })
      }
    },
  })
  return issues
}
