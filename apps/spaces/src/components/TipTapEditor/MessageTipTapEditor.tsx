import { GeneralTooltip, styled } from '@shira/ui'
import { useEditor, EditorContent } from '@tiptap/react'
import { useExplanations } from './hooks/useExplanations'

import { MessageEditorStyles } from './styles/MessageEditorStyles'
import { getMessageExtensions } from './config/editorExtensions'
import { MessagesMenuBar } from './MessagesMenuBar'
import { ExplanationButton } from '../Explanations/components/ExplanationButton'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLink } from './hooks/useLink'

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

  const { t } = useTranslation()
  const editor = useEditor({
    extensions: getMessageExtensions(),
    content: initialContent ?? null,
    onSelectionUpdate() { },
    onUpdate(props) {
      onChange(props.editor.getHTML())

      setTimeout(() => {
        explanations.cleanupOrphanedExplanations()
      }, 500)
    },
    onCreate() { }
  })

  const explanations = useExplanations(editor, editorId)

  const links = useLink(editor)

  // Connect editor events to hooks
  if (editor) {
    editor.off('selectionUpdate').on('selectionUpdate', explanations.handleSelectionUpdate)
  }

  const [showExplanationButtonTooltip, setShowExplanationButtonTooltip] = useState(false)

  return (
    <Wrapper>
      <EditorWrapper>
        <div></div>
        {links.setLinkModal}
        {links.editLinkModal}
        <EditorContainer>
          <MessagesMenuBar
            editor={editor}
            setLink={links.setLink}
          />
          <EditorContentWithExplanation>
            <EditorContent
              id={editorId}
              editor={editor}
              style={{ width: '100%' }}
            />
            <ExplanationButtonWrapper>
              <GeneralTooltip
                enabled={!explanations.canAddTextExplanation() && !explanations.isTextExplanationActive()}
                show={showExplanationButtonTooltip}
                setShow={setShowExplanationButtonTooltip}
                label={t('create_question.tabs.content.explanation_tooltip')}
              >
                <ExplanationButton
                  isText={true}
                  hasExplanation={explanations.hasAnyExplanation()}
                  active={explanations.isTextExplanationSelected()}
                  disabled={!explanations.canAddTextExplanation() && !explanations.isTextExplanationActive()}
                  onClick={() => {
                    explanations.addTextExplanation()
                  }}
                />
              </GeneralTooltip>
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

const ExplanationButtonWrapper = styled.div``

const EditorWrapper = styled.div`
  display: inline-block;
  width: 100%;
`

const EditorContainer = styled.div`
  position: relative;
`

const EditorContentWithExplanation = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`
