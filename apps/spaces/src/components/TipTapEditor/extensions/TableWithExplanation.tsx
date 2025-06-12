
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableHeader from '@tiptap/extension-table-header'
import TableCell from '@tiptap/extension-table-cell'

export const TableCellWithExplanation = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      'data-explanation': {
        default: null,
      },
    }
  },
  renderHTML({ HTMLAttributes }) {
    return ['td', HTMLAttributes, 0]
  },
  addNodeView() {
    return ({ node, getPos, editor }) => {
      const cell = document.createElement('td')
      
      Object.entries(node.attrs).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          cell.setAttribute(key, value.toString())
        }
      })

      if (node.attrs['data-explanation']) {
        cell.style.backgroundColor = '#F3F9CF'
        cell.style.border = '2px solid #F3F9CF'
        cell.classList.add('has-explanation')
      }

      cell.addEventListener('click', (e) => {
        e.stopPropagation()
        if (typeof getPos === 'function') {
          const pos = getPos()
          editor.commands.setNodeSelection(pos)
        }
      })

      return {
        dom: cell,
        contentDOM: cell,
        update: (updatedNode) => {
          if (updatedNode.type.name !== 'tableCell') return false
          
          Array.from(cell.attributes).forEach(attr => {
            if (attr.name !== 'style' && attr.name !== 'class') {
              cell.removeAttribute(attr.name)
            }
          })
          
          Object.entries(updatedNode.attrs).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
              cell.setAttribute(key, value.toString())
            }
          })
          
          if (updatedNode.attrs['data-explanation']) {
            cell.style.backgroundColor = '#F3F9CF'
            cell.style.border = '2px solid #F3F9CF'
            cell.classList.add('has-explanation')
          } else {
            cell.style.backgroundColor = ''
            cell.style.border = ''
            cell.classList.remove('has-explanation')
          }
          
          return true
        }
      }
    }
  }
})

export const TableHeaderWithExplanation = TableHeader.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      'data-explanation': {
        default: null,
      },
    }
  },
  renderHTML({ HTMLAttributes }) {
    return ['th', HTMLAttributes, 0]
  },
  addNodeView() {
    return ({ node, getPos, editor }) => {
      const header = document.createElement('th')
      
      Object.entries(node.attrs).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          header.setAttribute(key, value.toString())
        }
      })

      if (node.attrs['data-explanation']) {
        header.style.backgroundColor = '#F3F9CF'
        header.style.border = '2px solid #F3F9CF'
        header.classList.add('has-explanation')
      }

      header.addEventListener('click', (e) => {
        e.stopPropagation()
        if (typeof getPos === 'function') {
          const pos = getPos()
          editor.commands.setNodeSelection(pos)
        }
      })

      return {
        dom: header,
        contentDOM: header,
        update: (updatedNode) => {
          if (updatedNode.type.name !== 'tableHeader') return false
          
          Array.from(header.attributes).forEach(attr => {
            if (attr.name !== 'style' && attr.name !== 'class') {
              header.removeAttribute(attr.name)
            }
          })
          
          Object.entries(updatedNode.attrs).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
              header.setAttribute(key, value.toString())
            }
          })
          
          if (updatedNode.attrs['data-explanation']) {
            header.style.backgroundColor = '#F3F9CF'
            header.style.border = '2px solid #F3F9CF'
            header.classList.add('has-explanation')
          } else {
            header.style.backgroundColor = ''
            header.style.border = ''
            header.classList.remove('has-explanation')
          }
          
          return true
        }
      }
    }
  }
})

export const TableWithExplanation = Table.configure({
  resizable: true,
})

export const TableRowWithExplanation = TableRow

export const getTableExtensions = () => [
  TableWithExplanation,
  TableRowWithExplanation,
  TableHeaderWithExplanation,
  TableCellWithExplanation,
]