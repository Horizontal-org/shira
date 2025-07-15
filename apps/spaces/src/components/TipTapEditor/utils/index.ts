export function createResizeHandles(container, img, node, getPos, editor, isUpdatingRef) {
  const handles = ['nw', 'ne', 'sw', 'se'].map(direction => {
    const handle = document.createElement('div')
    handle.className = `resize-handle resize-${direction}`
    handle.style.cssText = `
      position: absolute;
      width: 8px;
      height: 8px;
      background: #2563eb;
      border: 1px solid white;
      border-radius: 2px;
      cursor: ${direction}-resize;
      display: none;
      z-index: 10;
    `
    
    const positions = {
      'nw': { top: '-4px', left: '-4px' },
      'ne': { top: '-4px', right: '-4px' },
      'sw': { bottom: '-4px', left: '-4px' },
      'se': { bottom: '-4px', right: '-4px' }
    }
    
    Object.assign(handle.style, positions[direction])
    container.appendChild(handle)
    
    return { element: handle, direction }
  })
  
  const showHandles = () => {
    container.style.borderColor = '#2563eb'
    handles.forEach(({ element }) => {
      element.style.display = 'block'
    })
  }
  
  const hideHandles = () => {
    container.style.borderColor = 'transparent'
    handles.forEach(({ element }) => {
      element.style.display = 'none'
    })
  }
  
  container.addEventListener('mouseenter', showHandles)
  container.addEventListener('mouseleave', hideHandles)
  
  setupResizeDrag(handles, img, node, getPos, editor, isUpdatingRef)
  
  const handleDocumentClick = (e) => {
    if (e.target && e.target instanceof Node && !container.contains(e.target)) {
      hideHandles()
    }
  }
  
  document.addEventListener('click', handleDocumentClick)
  
  return {
    showHandles,
    hideHandles,
    cleanup: () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }
}

function setupResizeDrag(handles, img, node, getPos, editor, isUpdatingRef) {
  let isResizing = false
  let startX, startWidth, startHeight, aspectRatio, currentDirection
  
  const handleMouseMove = (e) => {
    if (!isResizing) return
    e.preventDefault()
    
    const deltaX = e.clientX - startX
    let newWidth
    
    switch(currentDirection) {
      case 'se':
      case 'ne':
        newWidth = startWidth + deltaX
        break
      case 'sw':
      case 'nw':
        newWidth = startWidth - deltaX
        break
    }
    
    newWidth = Math.max(50, Math.min(500, newWidth))
    const newHeight = newWidth / aspectRatio
    
    img.style.width = `${newWidth}px`
    img.style.height = `${newHeight}px`
  }
  
  const handleMouseUp = () => {
    if (!isResizing) return
    
    isResizing = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    document.body.style.userSelect = ''
    
    const finalWidth = Math.round(img.offsetWidth)
    const finalHeight = Math.round(img.offsetHeight)
    
    if (typeof getPos === 'function') {
      isUpdatingRef = true
      
      setTimeout(() => {
        const pos = getPos()
        const currentNode = editor.state.doc.nodeAt(pos)
        const tr = editor.state.tr
        tr.setNodeMarkup(pos, null, {
          ...currentNode.attrs,
          width: finalWidth,
          height: finalHeight
        })
        editor.view.dispatch(tr)
        
        setTimeout(() => {
          isUpdatingRef = false
        }, 100)
      }, 0)
    }
  }
  
  handles.forEach(({ element, direction }) => {
    element.addEventListener('mousedown', (e) => {
      e.preventDefault()
      e.stopPropagation()
      
      isResizing = true
      currentDirection = direction
      startX = e.clientX
      startWidth = img.offsetWidth
      startHeight = img.offsetHeight
      aspectRatio = startWidth / startHeight
      
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.userSelect = 'none'
    })
  })
}