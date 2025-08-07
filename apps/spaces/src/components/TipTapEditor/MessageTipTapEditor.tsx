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
import { ExplanationButton } from '../Explanations/components/ExplanationButton'
import { useEffect } from 'react'

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

  console.log('EDITORID', editorId)
  const explanations = useExplanations(editor, editorId)

  // Connect editor events to hooks
  if (editor) {
    editor.off('selectionUpdate').on('selectionUpdate', explanations.handleSelectionUpdate)
  }

  useEffect(() => {      
    return () => {

      // if (explanationId) {
      //   deleteExplanation(explanationId)
      // }
    }
  }, [])


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
          <EditorContentWithExplanation>
            <EditorContent 
              id={editorId} 
              editor={editor} 
              style={{ width: '100%' }}
            />
            <ExplanationButtonWrapper>
              <ExplanationButton
                active={explanations.isTextExplanationActive()}
                disabled={!explanations.canAddTextExplanation()}
                onClick={() => {
                  explanations.addTextExplanation()
                }}
              />
            </ExplanationButtonWrapper>
          </EditorContentWithExplanation>
        </EditorContainer>
      </EditorWrapper>      
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-left: 8px;
`

const ExplanationButtonWrapper = styled.div`
  padding-bottom: 12px;
`

const EditorWrapper = styled.div`
  display: inline-block;
  width: 100%;
`

const EditorContainer = styled.div`
  position: relative;
`

const EditorContentWithExplanation =  styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  align-items: center;
`