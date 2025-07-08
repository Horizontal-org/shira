import { useState } from "react";
import { SetLinkModal } from "../../modals/SetLinkModal";

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
  
  const [showModal, handleShowModal] = useState(null)

  const setLink = () => {
    handleShowModal(true)
  }

  const linkModal = showModal 
    ?
      <SetLinkModal 
        onCancel={() => { handleShowModal(false) }}
        previous={editor.getAttributes('link').href}
        onSubmit={(url) => {
          handleEditorLinkBehaviour(url)
          handleShowModal(false)
        }}
      />
    : null

  return {
    setLink,
    linkModal
  }

}