import { useState } from "react";
import { SetLinkModal } from "../../modals/SetLinkModal";
import { EditLinkModal } from "../../modals/EditLinkModal";

export const useLink = (editor: any) => {
  const handleEditorLinkBehaviour = (url: string) => {

    if (url === null) {
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
    editLinkModal
  }

}