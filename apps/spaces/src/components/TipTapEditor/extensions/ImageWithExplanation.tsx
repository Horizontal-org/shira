import Image from '@tiptap/extension-image'

export const ImageWithExplanation = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      'data-explanation': {
        default: null,
      },
    }
  },
  renderHTML({ HTMLAttributes }) {
    return ['img', HTMLAttributes]
  },
  addNodeView() {
    return ({ node, getPos, editor }) => {
      const container = document.createElement('div')
      container.className = 'image-container'
      container.style.position = 'relative'
      container.style.display = 'inline-block'
      
      const img = document.createElement('img')
      img.src = node.attrs.src
      img.alt = node.attrs.alt || ''
      img.style.maxWidth = '100%'
      img.style.height = 'auto'
      
      // Add explanation indicator if image has explanation
      if (node.attrs['data-explanation']) {
        img.style.border = '2px solid #F3F9CF'
        img.style.borderRadius = '4px'
        img.classList.add('has-explanation')
        img.setAttribute('data-explanation', node.attrs['data-explanation'])
      }

      // Handle click to select image for explanation
      img.addEventListener('click', () => {
        if (typeof getPos === 'function') {
          const pos = getPos()
          editor.commands.setNodeSelection(pos)
        }
      })

      container.appendChild(img)
      return {
        dom: container,
        update: (updatedNode) => {
          if (updatedNode.type.name !== 'image') return false
          img.src = updatedNode.attrs.src
          img.alt = updatedNode.attrs.alt || ''
          
          // Update explanation styling
          if (updatedNode.attrs['data-explanation']) {
            img.style.border = '2px solid #F3F9CF'
            img.style.borderRadius = '4px'
            img.classList.add('has-explanation')
            img.setAttribute('data-explanation', updatedNode.attrs['data-explanation'])
          } else {
            img.style.border = 'none'
            img.classList.remove('has-explanation')
            img.removeAttribute('data-explanation')
          }
          return true
        }
      }
    }
  }
})