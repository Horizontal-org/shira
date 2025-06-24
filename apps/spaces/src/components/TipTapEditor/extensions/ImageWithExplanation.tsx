import Image from '@tiptap/extension-image'
import { createResizeHandles } from '../utils'

export const ImageWithExplanation = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      'width': { default: null },
      'height': { default: null },
      'data-original-width': { default: null },
      'data-original-height': { default: null },
      'data-explanation': { default: null },
    }
  },
  
  renderHTML({ HTMLAttributes }) {
    return ['img', HTMLAttributes]
  },
  
  addNodeView() {
    return ({ node, getPos, editor }) => {
      let isUpdating = false
      
      const container = document.createElement('div')
      container.className = 'image-resize-container'
      container.style.cssText = `
        position: relative;
        display: inline-block;
        border: 2px dashed transparent;
        transition: border-color 0.2s ease;
      `
      
      const img = document.createElement('img')
      img.src = node.attrs.src
      img.alt = node.attrs.alt || ''
      img.style.cssText = `
        display: block;
        cursor: pointer;
        object-fit: contain;
        border-radius: 4px;
      `
      
      const setImageDimensions = (width, height) => {
        img.style.width = `${width}px`
        img.style.height = `${height}px`
      }
      
      if (node.attrs.width && node.attrs.height) {
        setImageDimensions(node.attrs.width, node.attrs.height)
      }
      
      const updateExplanationStyling = () => {
        if (node.attrs['data-explanation']) {
          img.style.border = '2px solid #F3F9CF'
          img.style.borderRadius = '4px'
          img.classList.add('has-explanation')
          img.setAttribute('data-explanation', node.attrs['data-explanation'])
        } else {
          if (!node.attrs['data-explanation']) {
            img.style.border = 'none'
          }
          img.classList.remove('has-explanation')
          img.removeAttribute('data-explanation')
        }
      }
      
      updateExplanationStyling()
      
      const handles = createResizeHandles(container, img, node, getPos, editor, () => isUpdating)

      img.addEventListener('click', (e) => {
        e.stopPropagation()
        if (typeof getPos === 'function') {
          const pos = getPos()
          editor.commands.setNodeSelection(pos)
          handles.showHandles()
        }
      })
      
      img.onload = () => {
        if (!node.attrs.width || !node.attrs.height) {
          const originalWidth = img.naturalWidth
          const originalHeight = img.naturalHeight
          const aspectRatio = originalWidth / originalHeight
          
          const maxWidth = 300
          const maxHeight = 200
          
          let defaultWidth, defaultHeight
          if (originalWidth > maxWidth || originalHeight > maxHeight) {
            if (aspectRatio > maxWidth / maxHeight) {
              defaultWidth = maxWidth
              defaultHeight = Math.round(maxWidth / aspectRatio)
            } else {
              defaultHeight = maxHeight
              defaultWidth = Math.round(maxHeight * aspectRatio)
            }
          } else {
            defaultWidth = originalWidth
            defaultHeight = originalHeight
          }
          
          setImageDimensions(defaultWidth, defaultHeight)
          
          if (typeof getPos === 'function') {
            isUpdating = true
            setTimeout(() => {
              const pos = getPos()
              const tr = editor.state.tr
              tr.setNodeMarkup(pos, null, {
                ...node.attrs,
                width: defaultWidth,
                height: defaultHeight,
                'data-original-width': originalWidth,
                'data-original-height': originalHeight
              })
              editor.view.dispatch(tr)
              isUpdating = false
            }, 0)
          }
        }
      }

      container.appendChild(img)
      
      return {
        dom: container,
        update: (updatedNode) => {
          if (updatedNode.type.name !== 'image') return false
          
          if (isUpdating) {
            console.log('Skipping update during resize')
            return true
          }
          
          img.src = updatedNode.attrs.src
          img.alt = updatedNode.attrs.alt || ''
          
          if (updatedNode.attrs.width && updatedNode.attrs.height) {
            setImageDimensions(updatedNode.attrs.width, updatedNode.attrs.height)
          }
          
          node = updatedNode
          updateExplanationStyling()
          
          return true
        },
        destroy() {
          if (handles?.cleanup) {
            handles.cleanup()
          }
        }
      }
    }
  }
})
