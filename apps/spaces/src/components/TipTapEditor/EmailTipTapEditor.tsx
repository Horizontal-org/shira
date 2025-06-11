import { styled } from '@shira/ui'
import { useEditor, EditorContent } from '@tiptap/react'
import { MenuBar } from './MenuBar'
import { useExplanations } from './hooks/useExplanations'
import { useImageUpload } from './hooks/useImageUpload'
import { useLink } from './hooks/useLink'

import { EditorStyles } from './styles/EditorStyles'
import { getEditorExtensions } from './config/editorExtensions'

interface Props {
  onChange: (body: string) => void;
  initialContent?: string
}

export const EmailTipTapEditor = ({
  onChange,
  initialContent = null
}: Props) => {
  const editorId = `component-text-1`

  const editor = useEditor({
    extensions: getEditorExtensions(),
    content: initialContent ?? null,
    onSelectionUpdate() {  },
    onUpdate(props) {
      onChange(props.editor.getHTML())
      
      setTimeout(() => {
        explanations.cleanupOrphanedExplanations()
      }, 500)
    },
    onCreate() {}
  })

  const explanations = useExplanations(editor, editorId)
  const images = useImageUpload(editor, {
    maxSizeInMB: 5,
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  })
  const links = useLink(editor)

  // Connect editor events to hooks
  if (editor) {
    editor.off('selectionUpdate').on('selectionUpdate', explanations.handleSelectionUpdate)
  }

  return (
    <Wrapper>
      <EditorWrapper>
        <EditorStyles />
        <div></div>
        <EditorContent id={editorId} editor={editor} />
        <MenuBar 
          editor={editor} 
          setLink={links.setLink}
          onImageUpload={images.handleImageUpload}
          isImageSelected={images.isImageSelected}
          selectedImageHasExplanation={images.selectedImageHasExplanation}
          onAddTextExplanation={explanations.addTextExplanation}
          onRemoveTextExplanation={explanations.removeTextExplanation}
          onAddImageExplanation={explanations.addImageExplanation}
          onRemoveImageExplanation={explanations.removeImageExplanation}
          canAddTextExplanation={explanations.canAddTextExplanation()}
          isTextExplanationActive={explanations.isTextExplanationActive()}
        />
        <HiddenFileInput
          ref={images.fileInputRef}
          type="file"
          accept="image/*"
          onChange={images.onImageSelect}
        />
      </EditorWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 20px 0;
`

const EditorWrapper = styled.div`
  display: inline-block;
  width: 100%;
`

const HiddenFileInput = styled.input`
  display: none;
`