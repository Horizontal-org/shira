import { Extension, Node } from '@tiptap/core'
import TextStyle from '@tiptap/extension-text-style'

// Keep nested HTML containers editable instead of flattening them into paragraphs.
export const HtmlContainer = Node.create({
  name: 'htmlContainer',
  group: 'block',
  content: 'block+',
  parseHTML() {
    return [{ tag: 'div' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', HTMLAttributes, 0]
  },
})

export const AdvancedTextStyle = TextStyle.extend({
  parseHTML() {
    return [{ tag: 'span' }]
  },
})

const styleProperties = [
  'color', 'background-color', 'font-size', 'font-family', 'font-weight',
  'font-style', 'text-decoration', 'text-align', 'line-height', 'width',
  'height', 'max-width', 'min-width', 'padding', 'margin', 'border',
  'border-collapse', 'vertical-align',
]

export const HtmlFormatting = Extension.create({
  name: 'htmlFormatting',
  addGlobalAttributes() {
    return [{
      types: ['htmlContainer', 'paragraph', 'heading', 'textStyle', 'table',
        'tableRow', 'tableCell', 'tableHeader', 'image', 'blockquote',
        'bulletList', 'orderedList', 'listItem'],
      attributes: {
        style: {
          default: null,
          parseHTML: (element: HTMLElement) => {
            const styles = styleProperties.flatMap(property => {
              const value = element.style.getPropertyValue(property)
              return value && !/url\s*\(|expression\s*\(/i.test(value)
                ? [`${property}: ${value}`] : []
            })
            return styles.join('; ') || null
          },
          renderHTML: attributes => attributes.style ? { style: attributes.style } : {},
        },
      },
    }]
  },
})
