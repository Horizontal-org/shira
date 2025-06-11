import { useCallback } from 'react'
import { shallow } from 'zustand/shallow'
import { NodeSelection } from 'prosemirror-state'
import { useStore } from '../../../store'

export const useTable = (editor: any) => {
  const {
    addExplanation,
    explanationIndex,
    deleteExplanation
  } = useStore((state) => ({
    addExplanation: state.addExplanation,
    explanationIndex: state.explanationIndex,
    deleteExplanation: state.deleteExplanation
  }), shallow)

  const insertTable = useCallback((rows = 3, cols = 3, withHeaderRow = true) => {
    if (!editor) return false
    
    editor.chain().focus().insertTable({ 
      rows, 
      cols, 
      withHeaderRow 
    }).run()
    return true
  }, [editor])

  const addRowAbove = useCallback(() => {
    if (!editor) return false
    editor.chain().focus().addRowBefore().run()
    return true
  }, [editor])

  const addRowBelow = useCallback(() => {
    if (!editor) return false
    editor.chain().focus().addRowAfter().run()
    return true
  }, [editor])

  const deleteRow = useCallback(() => {
    if (!editor) return false
    editor.chain().focus().deleteRow().run()
    return true
  }, [editor])

  const addColumnLeft = useCallback(() => {
    if (!editor) return false
    editor.chain().focus().addColumnBefore().run()
    return true
  }, [editor])

  const addColumnRight = useCallback(() => {
    if (!editor) return false
    editor.chain().focus().addColumnAfter().run()
    return true
  }, [editor])

  const deleteColumn = useCallback(() => {
    if (!editor) return false
    editor.chain().focus().deleteColumn().run()
    return true
  }, [editor])

  const deleteTable = useCallback(() => {
    if (!editor) return false
    editor.chain().focus().deleteTable().run()
    return true
  }, [editor])

  const isInTable = useCallback(() => {
    if (!editor) return false
    return editor.isActive('tableRow') || editor.isActive('tableCell')
  }, [editor])

  // Table explanation methods
  const isTableCellSelected = useCallback(() => {
    if (!editor) return false
    const { selection } = editor.state
    return selection instanceof NodeSelection && 
           (selection.node.type.name === 'tableCell' || 
            selection.node.type.name === 'tableHeader')
  }, [editor])

  const selectedTableCellHasExplanation = useCallback(() => {
    if (!editor || !isTableCellSelected()) return false
    
    const { selection } = editor.state
    if (selection instanceof NodeSelection) {
      return !!selection.node.attrs['data-explanation']
    }
    return false
  }, [editor, isTableCellSelected])

  const addTableCellExplanation = useCallback(() => {
    if (!editor || !isTableCellSelected()) return false

    const newIndex = explanationIndex + 1
    const { selection } = editor.state
    
    if (selection instanceof NodeSelection) {
      const nodeType = selection.node.type.name === 'tableHeader' ? 'tableHeader' : 'tableCell'
      
      editor.chain().focus().updateAttributes(nodeType, {
        'data-explanation': newIndex
      }).run()
      
      addExplanation(newIndex, 'Table Cell')
      return true
    }
    return false
  }, [editor, explanationIndex, addExplanation, isTableCellSelected])

  const removeTableCellExplanation = useCallback(() => {
    if (!editor || !isTableCellSelected()) return false

    const { selection } = editor.state
    
    if (selection instanceof NodeSelection && 
        selection.node.attrs['data-explanation']) {
      
      const explanationIndex = selection.node.attrs['data-explanation']
      const nodeType = selection.node.type.name === 'tableHeader' ? 'tableHeader' : 'tableCell'
      
      editor.chain().focus().updateAttributes(nodeType, {
        'data-explanation': null
      }).run()
      
      deleteExplanation(explanationIndex)
      return true
    }
    return false
  }, [editor, deleteExplanation, isTableCellSelected])

  return {
    insertTable,
    addRowAbove,
    addRowBelow,
    deleteRow,
    addColumnLeft,
    addColumnRight,
    deleteColumn,
    deleteTable,
    isInTable: isInTable(),
    isTableCellSelected: isTableCellSelected(),
    selectedTableCellHasExplanation: selectedTableCellHasExplanation(),
    addTableCellExplanation,
    removeTableCellExplanation
  }
}