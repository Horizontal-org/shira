import { useCallback, useEffect, useRef } from 'react'
import { shallow } from 'zustand/shallow'
import { NodeSelection } from 'prosemirror-state'
import { useStore } from '../../../store'
import { subscribe, unsubscribe } from '../../../utils/customEvent'

export const useExplanations = (editor: any, editorId: string) => {
  const markExplanationsFrameRef = useRef<number | null>(null)

  const {
    changeSelected,
    selectedExplanation,
    storeExplanations,
    deleteExplanation,
    addExplanation,
    explanationIndex,
    getExplanationIds
  } = useStore((state) => ({
    changeSelected: state.changeSelected,
    selectedExplanation: state.selectedExplanation,
    storeExplanations: state.explanations,
    deleteExplanation: state.deleteExplanation,
    addExplanation: state.addExplanation,
    explanationIndex: state.explanationIndex,
    getExplanationIds: state.getExplanationIds
  }), shallow)

  const getTextExplanationIndexFromSelection = useCallback(() => {
    if (!editor) return null

    const editorElement = document.getElementById(editorId)
    const domSelection = typeof window !== 'undefined' ? window.getSelection() : null

    if (editorElement && domSelection) {
      const candidateNodes = [domSelection.anchorNode, domSelection.focusNode]

      for (const candidateNode of candidateNodes) {
        if (!candidateNode) continue

        const candidateElement =
          candidateNode instanceof Element
            ? candidateNode
            : candidateNode.parentElement

        const explanationElement = candidateElement?.closest?.('mark[data-explanation]')
        const explanationIndex = explanationElement?.getAttribute('data-explanation')

        if (explanationElement && editorElement.contains(explanationElement) && explanationIndex) {
          return Number(explanationIndex)
        }
      }
    }

    const { selection, storedMarks } = editor.state

    const getExplanationIndexFromMarks = (marks = []) => {
      const explanationMark = marks.find(mark => mark.type.name === 'explanation')
      const explanationIndex = explanationMark?.attrs?.['data-explanation']

      return explanationIndex ? Number(explanationIndex) : null
    }

    if (selection.from !== selection.to) {
      let explanationIndex = null

      editor.state.doc.nodesBetween(selection.from, selection.to, (node) => {
        if (explanationIndex !== null) return false

        explanationIndex = getExplanationIndexFromMarks(node.marks ?? [])
        return explanationIndex === null
      })

      if (explanationIndex !== null) {
        return explanationIndex
      }
    }

    return (
      getExplanationIndexFromMarks(selection.$from?.marks() ?? []) ??
      getExplanationIndexFromMarks(selection.$to?.marks() ?? []) ??
      getExplanationIndexFromMarks(selection.$from?.nodeAfter?.marks ?? []) ??
      getExplanationIndexFromMarks(selection.$from?.nodeBefore?.marks ?? []) ??
      getExplanationIndexFromMarks(selection.$to?.nodeAfter?.marks ?? []) ??
      getExplanationIndexFromMarks(selection.$to?.nodeBefore?.marks ?? []) ??
      getExplanationIndexFromMarks(storedMarks ?? [])
    )
  }, [editor, editorId])

  const markExplanations = useCallback((selectedExplanation) => {
    if (!editorId) return

    const explanations = document.getElementById(editorId)?.querySelectorAll('[data-explanation]')
    if (!explanations) return

    if (markExplanationsFrameRef.current !== null) {
      cancelAnimationFrame(markExplanationsFrameRef.current)
      markExplanationsFrameRef.current = null
    }

    explanations.forEach((element) => {
      element.classList.remove('mark-active')

      if (element.tagName === 'IMG' && element instanceof HTMLElement && element.classList.contains('has-explanation')) {
        element.style.border = '2px solid #F3F9CF'
      }
    })

    markExplanationsFrameRef.current = requestAnimationFrame(() => {
      explanations.forEach((element) => {
        const explanationIndex = element.getAttribute('data-explanation')

        if (selectedExplanation !== null && Number(explanationIndex) === selectedExplanation) {
          element.classList.add('mark-active')

          if (element.tagName === 'IMG' && element instanceof HTMLElement) {
            element.style.border = '2px solid #FCC934'
          }
        }
      })

      markExplanationsFrameRef.current = null
    })
  }, [editorId])

  const cleanDeletedExplanations = useCallback((deleteIndex) => {
    if (!editor) return

    const { tr } = editor.state
    let hasChanges = false

    editor.state.doc.descendants((node, pos) => {
      if (node.isText) {
        node.marks.forEach(mark => {
          if (Number(mark.attrs['data-explanation']) === deleteIndex) {
            tr.removeMark(pos, pos + node.nodeSize, mark.type)
            hasChanges = true
          }
        })
      }

      if (
        ['image', 'tableCell', 'tableHeader'].includes(node.type.name) &&
        Number(node.attrs['data-explanation']) === deleteIndex
      ) {
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

    const editorExplanationIndexes = new Set<number>()

    editor.state.doc.descendants((node) => {
      node.marks.forEach(mark => {
        const explanationIndex = mark.attrs['data-explanation']

        if (explanationIndex) {
          editorExplanationIndexes.add(Number(explanationIndex))
        }
      })

      const nodeExplanationIndex = node.attrs?.['data-explanation']

      if (
        ['image', 'tableCell', 'tableHeader'].includes(node.type.name) &&
        nodeExplanationIndex
      ) {
        editorExplanationIndexes.add(Number(nodeExplanationIndex))
      }
    })

    document.querySelectorAll('[id*="component-text"]').forEach((component) => {
      component.querySelectorAll('[data-explanation]').forEach((explanation) => {
        const explanationIndex = explanation.getAttribute('data-explanation')

        if (explanationIndex) {
          editorExplanationIndexes.add(Number(explanationIndex))
        }
      })
    })

    const activeQuestionIds = getExplanationIds()
    const activeExplanationIndexes = new Set([
      ...activeQuestionIds,
      ...editorExplanationIndexes
    ])

    const orphanedExplanations = storeExplanations.filter(explanation =>
      !activeExplanationIndexes.has(explanation.index)
    )

    orphanedExplanations.forEach(orphan => {
      deleteExplanation(orphan.index)
    })
  }, [editor, storeExplanations, deleteExplanation, getExplanationIds])

  const handleSelectionUpdate = useCallback(() => {
    if (!editor) return

    const { selection } = editor.state
    const selectedTextExplanationIndex = getTextExplanationIndexFromSelection()

    if (selectedTextExplanationIndex !== null) {
      if (selectedTextExplanationIndex !== selectedExplanation) {
        changeSelected(selectedTextExplanationIndex)
      }

      return
    }

    if (selection instanceof NodeSelection && selection.node.type.name === 'image') {
      const explanationIndex = selection.node.attrs['data-explanation']
      const normalizedExplanationIndex = explanationIndex ? Number(explanationIndex) : null

      if (normalizedExplanationIndex !== null && normalizedExplanationIndex !== selectedExplanation) {
        changeSelected(normalizedExplanationIndex)
      } else if (normalizedExplanationIndex === null && selectedExplanation !== null) {
        changeSelected(null)
      }

      return
    }

    if (selectedExplanation !== null) {
      changeSelected(null)
    }
  }, [editor, selectedExplanation, changeSelected, getTextExplanationIndexFromSelection])

  const addTextExplanation = useCallback(() => {
    if (!editor) return false

    const { from, to } = editor.state.selection
    const hasSelection = from !== to
    const canAdd = hasSelection && getTextExplanationIndexFromSelection() === null

    if (!canAdd) return false

    const newIndex = explanationIndex + 1

    editor.chain().focus().setExplanation({
      'data-explanation': newIndex
    }).run()

    addExplanation(newIndex)

    return true
  }, [editor, explanationIndex, addExplanation, getTextExplanationIndexFromSelection])

  const removeTextExplanation = useCallback(() => {
    if (!editor) return false

    const deleteIndex = getTextExplanationIndexFromSelection()

    if (deleteIndex === null) {
      return false
    }

    deleteExplanation(deleteIndex)
    cleanDeletedExplanations(deleteIndex)
    editor.chain().focus().unsetExplanation().run()

    return true
  }, [editor, deleteExplanation, cleanDeletedExplanations, getTextExplanationIndexFromSelection])

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

    if (
      selection instanceof NodeSelection &&
      selection.node.type.name === 'image' &&
      selection.node.attrs['data-explanation']
    ) {
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

    return from !== to && getTextExplanationIndexFromSelection() === null
  }, [editor, getTextExplanationIndexFromSelection])

  const getActiveTextExplanationIndex = useCallback(() => {
    return getTextExplanationIndexFromSelection()
  }, [getTextExplanationIndexFromSelection])

  const isTextExplanationActive = useCallback(() => {
    return getTextExplanationIndexFromSelection() !== null
  }, [getTextExplanationIndexFromSelection])

  const isTextExplanationSelected = useCallback(() => {
    return getActiveTextExplanationIndex() === selectedExplanation
  }, [getActiveTextExplanationIndex, selectedExplanation])

  const hasAnyExplanation = useCallback(() => {
    if (!editor) return false

    let foundExplanation = false

    editor.state.doc.descendants((node) => {
      if (foundExplanation) {
        return false
      }

      const hasMarkedExplanation = node.marks?.some(mark =>
        Boolean(mark.attrs['data-explanation'])
      )
      const hasNodeExplanation = Boolean(node.attrs?.['data-explanation'])

      if (hasMarkedExplanation || hasNodeExplanation) {
        foundExplanation = true
        return false
      }

      return true
    })

    return foundExplanation
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
  }, [cleanDeletedExplanations, editor])

  useEffect(() => {
    const handlePointerDownOutside = (event: MouseEvent | PointerEvent) => {
      if (selectedExplanation === null) return

      const target = event.target

      if (!(target instanceof Node)) return

      const editorElement = document.getElementById(editorId)
      const explanationsElement = document.getElementById('explanations-wrapper')

      const isInsideEditor = Boolean(editorElement?.contains(target))
      const isInsideExplanationsPanel = Boolean(explanationsElement?.contains(target))

      if (!isInsideEditor && !isInsideExplanationsPanel) {
        changeSelected(null)
      }
    }

    document.addEventListener('pointerdown', handlePointerDownOutside)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDownOutside)
    }
  }, [changeSelected, editorId, selectedExplanation])

  useEffect(() => {
    markExplanations(selectedExplanation)
  }, [selectedExplanation, markExplanations])

  useEffect(() => {
    return () => {
      if (markExplanationsFrameRef.current !== null) {
        cancelAnimationFrame(markExplanationsFrameRef.current)
      }
    }
  }, [])

  return {
    selectedExplanation,
    storeExplanations,
    addTextExplanation,
    removeTextExplanation,
    canAddTextExplanation,
    getActiveTextExplanationIndex,
    isTextExplanationActive,
    isTextExplanationSelected,
    hasAnyExplanation,
    addImageExplanation,
    removeImageExplanation,
    handleSelectionUpdate,
    cleanupOrphanedExplanations,
    markExplanations,
    cleanDeletedExplanations
  }
}