import { GeneralTooltip, styled, ExplanationButton, CharacterCount, Body4 } from '@horizontal-org/shira-ui'
import { useEditor, EditorContent } from '@tiptap/react'
import { useExplanations } from './hooks/useExplanations'

import { getMessageExtensions } from './config/editorExtensions'
import { MessagesMenuBar } from './MessagesMenuBar'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLink } from './hooks/useLink'

interface Props {
  onChange: (body: string) => void;
  editorId: string;
  initialContent?: string
  maxLength?: number
  characterLimitErrorText?: string
}

const getTextContentLength = (content?: string | null) => {
  if (!content) {
    return 0
  }

  const container = window.document.createElement('div')
  container.innerHTML = content
  return container.textContent?.length ?? 0
}

export const MessageTipTapEditor = ({
  onChange,
  editorId,
  initialContent = null,
  maxLength,
  characterLimitErrorText
}: Props) => {
  const { t } = useTranslation()
  const [characterCount, setCharacterCount] = useState(() => getTextContentLength(initialContent))
  const isOverCharacterLimit = typeof maxLength === 'number' && characterCount > maxLength

  const editor = useEditor({
    extensions: getMessageExtensions(),
    content: initialContent ?? null,
    onSelectionUpdate() { },
    onUpdate(props) {
      setCharacterCount(props.editor.getText().length)
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

  useEffect(() => {
    setCharacterCount(getTextContentLength(initialContent))
  }, [initialContent])

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

            <EditorColumn>
              <EditorContent
                id={editorId}
                editor={editor}
                style={{ width: '100%' }}
              />
              {maxLength &&
                <CharacterLimitRow>
                  <CharacterLimitError $isVisible={isOverCharacterLimit}>
                    {isOverCharacterLimit ? characterLimitErrorText : ''}
                  </CharacterLimitError>
                  <CharacterCount
                    currentLength={characterCount}
                    maxLength={maxLength}
                  />
                </CharacterLimitRow>
              }
            </EditorColumn>

            <ExplanationButtonWrapper>
              <GeneralTooltip
                enabled={!explanations.canAddTextExplanation() && !explanations.isTextExplanationActive()}
                show={showExplanationButtonTooltip}
                setShow={setShowExplanationButtonTooltip}
                label={t('create_question.tabs.content.explanation_tooltip')}
              >
                <ExplanationButton
                  isText={true}
                  hasExplanation={!explanations.canAddTextExplanation() && explanations.hasAnyExplanation()}
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
  margin-inline-start: 8px;
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
  align-items: flex-start;
  justify-content: space-between;
`

const EditorColumn = styled.div`
  width: 100%;
`

const CharacterLimitRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  margin-top: 2px;
`

const CharacterLimitError = styled(Body4) <{ $isVisible: boolean }>`
  color: ${({ theme }) => theme.colors.error7};
  flex: 1;
  padding-inline-start: 10px;
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
`
