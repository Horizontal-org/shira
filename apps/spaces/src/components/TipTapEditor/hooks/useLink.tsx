import { useState } from "react";
import { NodeSelection } from 'prosemirror-state';
import { SetLinkModal } from "../../modals/SetLinkModal";
import { EditLinkModal } from "../../modals/EditLinkModal";

export const useLink = (editor: any) => {
  const handleEditorLinkBehaviour = (url: string) => {

    if (url === null) {
      return
    }

    const { selection } = editor.state
    if (selection instanceof NodeSelection && selection.node.type.name === 'image') {
      // Handle image link
      if (url === '') {
        // Remove link from image
        editor.chain().focus().updateAttributes('image', {
          link: null
        }).run()
      } else {
        // Add/update link on image
        editor.chain().focus().updateAttributes('image', {
          link: url
        }).run()
      }
      return
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }
  
  const [showSetModal, handleShowSetModal] = useState<boolean>(false)
  const [editModalText, handleEditModalText] = useState<string | null>(null)

  const isImageSelected = () => {
    if (!editor) return false
    const { selection } = editor.state
    return selection instanceof NodeSelection && selection.node?.type.name === 'image'
  }

  const getCurrentLink = () => {
    if (isImageSelected()) {
      const { selection } = editor.state
      return selection.node.attrs.link || null
    }
    return editor.getAttributes('link').href || null
  }

  const setLink = (url = null) => {
    if (url) {
      handleEditModalText(url)
    } else {
      handleShowSetModal(true)
    }
  }

  const setLinkModal = showSetModal 
    ?
      <SetLinkModal 
        onCancel={() => { handleShowSetModal(false) }}
        previous={editor.getAttributes('link').href}
        onSubmit={(url) => {
          handleEditorLinkBehaviour(url)
          handleShowSetModal(false)
        }}
      />
    : null

  const editLinkModal = editModalText 
    ?
      <EditLinkModal 
        url={editModalText}
        onCancel={() => { 
          handleEditModalText(null) 
        }}
        onSubmit={(url) => {
          handleEditorLinkBehaviour(url)
          handleEditModalText(null)
        }}
      />
    : null

  return {
    setLink,
    setLinkModal,
    editLinkModal,
    isImageSelected,
    getCurrentLink
  }

}