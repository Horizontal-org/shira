import { useCallback, useEffect } from 'react'
import { shallow } from 'zustand/shallow'
import { NodeSelection } from 'prosemirror-state'
import { useStore } from '../../../store'
import { subscribe, unsubscribe } from '../../../utils/customEvent'

export const useExplanations = (editor: any, editorId: string) => {
  const {
    changeSelected,
    selectedExplanation,
    storeExplanations,
    deleteExplanation,
    addExplanation,
    explanationIndex
  } = useStore((state) => ({
    changeSelected: state.changeSelected,
    selectedExplanation: state.selectedExplanation,
    storeExplanations: state.explanations,
    deleteExplanation: state.deleteExplanation,
    addExplanation: state.addExplanation,
    explanationIndex: state.explanationIndex
  }), shallow)

  const markExplanations = useCallback((selectedExplanation) => { 
    if (!editorId) return
    
    const explanations = document.getElementById(editorId)?.querySelectorAll('[data-explanation]')
    if (!explanations) return

    explanations.forEach((e) => {        
      if (e.classList.contains('mark-active')) {
        e.classList.remove('mark-active')
      }

      if (e.tagName === 'IMG' && e instanceof HTMLElement) {
        if (e.classList.contains('has-explanation')) {
          e.style.border = '2px solid #F3F9CF'
        }
      }
    })

    setTimeout(() => {
      explanations.forEach((e) => {
        const dataExplanation = e.getAttribute('data-explanation')
        if (parseInt(dataExplanation) === +selectedExplanation) {          
          e.classList.add('mark-active')

          if (e.tagName === 'IMG' && e instanceof HTMLElement) {
            e.style.border = '2px solid #FCC934'
          }
        }
      })
    }, 100)
  }, [editorId])

  const cleanDeletedExplanations = useCallback((deleteIndex) => {
    if (!editor) return
    
    const { tr } = editor.state
    let hasChanges = false

    editor.state.doc.descendants((node, pos) => {
      if (node.isText) {
        node.marks.forEach(mark => {
          if (mark.attrs['data-explanation'] === +deleteIndex) {
            tr.removeMark(pos, pos + node.nodeSize, mark.type)
            hasChanges = true
          }
        })
      }
      
      if (node.type.name === 'image' && node.attrs['data-explanation'] === +deleteIndex) {
        tr.setNodeMarkup(pos, null, {
          ...node.attrs,
          'data-explanation': null
        })
        hasChanges = true
      }

      if ((node.type.name === 'tableCell' || node.type.name === 'tableHeader') && 
          node.attrs['data-explanation'] === +deleteIndex) {
        tr.setNodeMarkup(pos, null, {
          ...node.attrs,
          'data-explanation': null
        })
        hasChanges = true
      }
    })

    if (hasChanges) {
      editor.view.dispatch(tr)
    }
  }, [editor])

  const cleanupOrphanedExplanations = useCallback(() => {
    if (!editor) return
    
    const activeExplanationIndexes = new Set()

    editor.state.doc.descendants((node) => {
      node.marks.forEach(mark => {
        if (mark.attrs['data-explanation']) {
          activeExplanationIndexes.add(parseInt(mark.attrs['data-explanation']))
        }
      })
      
      if (node.type.name === 'image' && node.attrs['data-explanation']) {
        activeExplanationIndexes.add(parseInt(node.attrs['data-explanation']))
      }

      if ((node.type.name === 'tableCell' || node.type.name === 'tableHeader') && node.attrs['data-explanation']) {
        activeExplanationIndexes.add(parseInt(node.attrs['data-explanation']))
      }
    })

    const allExplanationElements = document.querySelectorAll('[data-explanation]')
    allExplanationElements.forEach(element => {
      const explanationIndex = element.getAttribute('data-explanation')
      if (explanationIndex) {
        activeExplanationIndexes.add(parseInt(explanationIndex))
      }
    })

    const orphanedExplanations = storeExplanations.filter(explanation => 
      !activeExplanationIndexes.has(explanation.index)
    ) 

    orphanedExplanations.forEach(orphan => {
      console.log(`Cleaning up orphaned explanation: ${orphan.index}`)
      deleteExplanation(orphan.index)
    })
  }, [editor, storeExplanations, deleteExplanation])

  const handleSelectionUpdate = useCallback(() => {
    if (!editor) return

    const { selection } = editor.state
    
    if (editor.isActive('explanation')) {
      const dataIndex = editor.getAttributes('explanation')['data-explanation']
      if (dataIndex !== selectedExplanation) {
        changeSelected(dataIndex)
      }
    } 

    else if (selection instanceof NodeSelection && selection.node.type.name === 'image') {
      const explanationIndex = selection.node.attrs['data-explanation']
      if (explanationIndex && explanationIndex !== selectedExplanation) {
        changeSelected(explanationIndex)
      } else if (!explanationIndex && selectedExplanation !== null) {
        changeSelected(null)
      }
    } 
    else {
      if (selectedExplanation !== null) {
        changeSelected(null)
      }
    }
  }, [editor, selectedExplanation, changeSelected])

  const addTextExplanation = useCallback(() => {
    if (!editor) return false

    const { from, to } = editor.state.selection
    const hasSelection = from !== to
    const canAdd = hasSelection && !editor.isActive('explanation')

    if (canAdd) {
      const newIndex = explanationIndex + 1
      editor.chain().focus().setExplanation({
        'data-explanation': newIndex,
      }).run()
      addExplanation(newIndex)
      return true
    }
    return false
  }, [editor, explanationIndex, addExplanation])

  const removeTextExplanation = useCallback(() => {
    if (!editor || !editor.isActive('explanation')) return false

    const deleteIndex = editor.getAttributes('explanation')['data-explanation']
    deleteExplanation(deleteIndex)
    editor.chain().focus().unsetExplanation().run()
    return true
  }, [editor, deleteExplanation])

  const addImageExplanation = useCallback(() => {
    if (!editor) return false

    const { selection } = editor.state
    
    if (selection instanceof NodeSelection && selection.node.type.name === 'image') {
      const newIndex = explanationIndex + 1
      
      editor.chain().focus().updateAttributes('image', {
        'data-explanation': newIndex
      }).run()
      
      addExplanation(newIndex, 'Image')
      return true
    }
    return false
  }, [editor, explanationIndex, addExplanation])

  const removeImageExplanation = useCallback(() => {
    if (!editor) return false

    const { selection } = editor.state
    
    if (selection instanceof NodeSelection && 
        selection.node.type.name === 'image' && 
        selection.node.attrs['data-explanation']) {
      
      const explanationIndex = selection.node.attrs['data-explanation']
      
      editor.chain().focus().updateAttributes('image', {
        'data-explanation': null
      }).run()
      
      deleteExplanation(explanationIndex)
      return true
    }
    return false
  }, [editor, deleteExplanation])

  const canAddTextExplanation = useCallback(() => {
    if (!editor) return false
    const { from, to } = editor.state.selection
    return from !== to && !editor.isActive('explanation')
  }, [editor])

  const isTextExplanationActive = useCallback(() => {
    return editor?.isActive('explanation') || false
  }, [editor])

  useEffect(() => {
    if (!editor) return

    const handleDeleteExplanation = (event) => {
      cleanDeletedExplanations(event.detail.deleteIndex)
    }

    subscribe('delete-explanation', handleDeleteExplanation)

    return () => {
      unsubscribe('delete-explanation', handleDeleteExplanation)
    }
  }, [cleanDeletedExplanations])

  useEffect(() => {
    markExplanations(selectedExplanation)
  }, [selectedExplanation, markExplanations])

  return {
    selectedExplanation,
    storeExplanations,
    addTextExplanation,
    removeTextExplanation,
    canAddTextExplanation,
    isTextExplanationActive,
    addImageExplanation,
    removeImageExplanation,
    handleSelectionUpdate,
    cleanupOrphanedExplanations,
    markExplanations,
    cleanDeletedExplanations
  }
}