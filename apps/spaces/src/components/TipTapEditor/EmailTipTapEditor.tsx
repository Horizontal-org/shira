import { GeneralTooltip, styled, ExplanationButton, CharacterCount, Body4 } from '@horizontal-org/shira-ui'
import { useEditor, EditorContent } from '@tiptap/react'
import { MenuBar } from './components/MenuBar'
import { useExplanations } from './hooks/useExplanations'
import { useImageUpload } from './hooks/useImageUpload'
import { useLink } from './hooks/useLink'
import { useTable } from './hooks/useTable'

import { EditorStyles } from './styles/EditorStyles'
import { getEmailExtensions } from './config/editorExtensions'
import { LoadingOverlay } from '../LoadingOverlay/LoadingOverlay'
import { useTranslation } from 'react-i18next'
import { useEffect, useMemo, useState } from 'react'
import { ErrorBanner as BaseErrorBanner } from '../ErrorBanner'

interface Props {
  onChange: (body: string) => void;
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

export const EmailTipTapEditor = ({
  onChange,
  initialContent = null,
  maxLength,
  characterLimitErrorText
}: Props) => {
  const editorId = `component-text-1`
  const [characterCount, setCharacterCount] = useState(() => getTextContentLength(initialContent))

  const editor = useEditor({
    extensions: getEmailExtensions(),
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
  const [showExplanationButtonTooltip, setShowExplanationButtonTooltip] = useState(false)
  const [imageUploadError, setImageUploadError] = useState<string | null>(null)

  const { t } = useTranslation()
  const isOverCharacterLimit = characterCount > maxLength

  useEffect(() => {
    setCharacterCount(getTextContentLength(initialContent))
  }, [initialContent])

  const images = useImageUpload(editor, {
    maxSizeInMB: 5,
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  })

  const links = useLink(editor)
  const tables = useTable(editor)
  const selectedImageExplanationIndex = images.getSelectedImageExplanationIndex()
  const isExplanationButtonSelected =
    explanations.isTextExplanationSelected() ||
    selectedImageExplanationIndex === explanations.selectedExplanation

  // Connect editor events to hooks
  if (editor) {
    editor.off('selectionUpdate').on('selectionUpdate', explanations.handleSelectionUpdate)
  }

  const showHasExplanation = useMemo(() => {
    if (images.selectedImageHasExplanation) {
      return true
    }
    if (!explanations.canAddTextExplanation() && explanations.hasAnyExplanation()) {
      return true
    }
    return false
  }, [explanations, images])

  return (
    <Wrapper>
      <EditorWrapper>
        <EditorStyles />
        <div></div>
        {links.setLinkModal}
        {links.editLinkModal}
        <EditorContainer>
          <EditorContentWithExplanation>
            <EditorColumn>
              <EditorContentWrapper>
                <EditorContent id={editorId} editor={editor} />
              </EditorContentWrapper>

              {maxLength && (
                <CharacterLimitRow>
                  <CharacterLimitError $isVisible={isOverCharacterLimit}>
                    {isOverCharacterLimit ? characterLimitErrorText : ''}
                  </CharacterLimitError>
                  <CharacterCount
                    currentLength={characterCount}
                    maxLength={maxLength}
                  />
                </CharacterLimitRow>
              )}
            </EditorColumn>

            <GeneralTooltip
              enabled={!explanations.canAddTextExplanation() && !explanations.isTextExplanationActive() && !images.selectedImageHasExplanation}
              show={showExplanationButtonTooltip}
              setShow={setShowExplanationButtonTooltip}
              label={t('create_question.tabs.content.explanation_tooltip')}
            >
              <ExplanationButton
                isText={true}
                hasExplanation={showHasExplanation}
                active={isExplanationButtonSelected}
                disabled={!explanations.canAddTextExplanation() && !explanations.isTextExplanationActive() && !images.selectedImageHasExplanation}
                onClick={() => {
                  if (images.isImageSelected) {
                    explanations.addImageExplanation()
                  } else if (explanations.canAddTextExplanation()) {
                    explanations.addTextExplanation()
                  }
                }}
              />
            </GeneralTooltip>
          </EditorContentWithExplanation>
          {images.isUploading && <LoadingOverlay />}
        </EditorContainer>

        <MenuBar
          editor={editor}
          setLink={links.setLink}
          onImageUpload={images.handleImageUpload}
          isImageSelected={images.isImageSelected}

          isInTable={tables.isInTable}
          isTableCellSelected={tables.isTableCellSelected}
          selectedTableCellHasExplanation={tables.selectedTableCellHasExplanation}
          onInsertTable={tables.insertTable}
          onAddTableCellExplanation={tables.addTableCellExplanation}
          onRemoveTableCellExplanation={tables.removeTableCellExplanation}
          onAddRowAbove={tables.addRowAbove}
          onAddRowBelow={tables.addRowBelow}
          onDeleteRow={tables.deleteRow}
          onAddColumnLeft={tables.addColumnLeft}
          onAddColumnRight={tables.addColumnRight}
          onDeleteColumn={tables.deleteColumn}
          onDeleteTable={tables.deleteTable}
        />
        <HiddenFileInput
          ref={images.fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp,.jpg,.jpeg,.png,.gif,.webp"
          onChange={async (event) => {
            try {
              await images.onImageSelect(event)
              setImageUploadError(null)
            } catch (error) {
              setImageUploadError(error instanceof Error ? error.message : String(error))
            }
          }}
        />
        {imageUploadError && (
          <ErrorBanner role="alert" aria-live="polite">
            {imageUploadError}
          </ErrorBanner>
        )}
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
  max-width: 100%;
`

const HiddenFileInput = styled.input`
  display: none;
`

const EditorContainer = styled.div`
  position: relative;
`

const ErrorBanner = styled(BaseErrorBanner)`
  margin-top: 20px;
`

const CharacterLimitRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  margin-top: 2px;
  margin-bottom: 10px;
`

const CharacterLimitError = styled(Body4) <{ $isVisible: boolean }>`
  color: ${({ theme }) => theme.colors.error7};
  flex: 1;
  padding-left: 10px;
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
`

const EditorContentWithExplanation = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  align-items: flex-start;
`

const EditorColumn = styled.div`
  width: 100%;
`

const EditorContentWrapper = styled.div`
  width: 100%;
`
