import { styled } from '@shira/ui'
import { useEditor, EditorContent } from '@tiptap/react'
import { MenuBar } from './MenuBar'
import { useExplanations } from './hooks/useExplanations'
import { useImageUpload } from './hooks/useImageUpload'
import { useLink } from './hooks/useLink'
import { useTable } from './hooks/useTable'

import { MessageEditorStyles } from './styles/MessageEditorStyles'
import { getMessageExtensions } from './config/editorExtensions'
import { LoadingOverlay } from '../LoadingOverlay/LoadingOverlay'
import { MessagesMenuBar } from './MessagesMenuBar'

interface Props {
  onChange: (body: string) => void;
  editorId: string;
  initialContent?: string
}

export const MessageTipTapEditor = ({
  onChange,
  editorId,
  initialContent = null
}: Props) => {

  const editor = useEditor({
    extensions: getMessageExtensions(),
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

  // Connect editor events to hooks
  if (editor) {
    editor.off('selectionUpdate').on('selectionUpdate', explanations.handleSelectionUpdate)
  }

  return (
    <Wrapper>
      <EditorWrapper>
        <MessageEditorStyles />
        <div></div>        
        <EditorContainer>
          <MessagesMenuBar 
            editor={editor}           
            onAddTextExplanation={explanations.addTextExplanation}
            onRemoveTextExplanation={explanations.removeTextExplanation}        
            canAddTextExplanation={explanations.canAddTextExplanation()}
            isTextExplanationActive={explanations.isTextExplanationActive()}
          />
          <EditorContent id={editorId} editor={editor} />
        </EditorContainer>
      </EditorWrapper>

      {/* <ExplanationButton
        active={ref.current && selectedExplanationIndex + '' == ref.current.getAttribute('data-explanation')}
        onClick={() => {
          // const hasExplanation = ref.current.getAttribute('data-explanation')
          // if (hasExplanation) {
          //   changeSelected(parseInt(hasExplanation))
          // } else {
          //   const index = explanationIndex + 1
          //   ref.current.setAttribute('data-explanation', index + '')
          //   addExplanation(index, label)
          //   onChange(
          //     index,
          //     ref.current.value,
          //   )
          // }
        }}
      /> */}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-left: 8px;
  display: flex-
  align-items: flex-end;
`

const EditorWrapper = styled.div`
  display: inline-block;
  width: 100%;
`

const EditorContainer = styled.div`
  position: relative;
`