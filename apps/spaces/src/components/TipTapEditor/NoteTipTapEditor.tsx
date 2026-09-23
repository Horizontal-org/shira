import { GeneralTooltip, styled, ExplanationButton, CharacterCount, Body4 } from '@horizontal-org/shira-ui'
import { useEditor, EditorContent } from '@tiptap/react'
import { MenuBar } from './components/MenuBar'
import { useExplanations } from './hooks/useExplanations'
import { uploadNoteImage, useImageUpload } from './hooks/useImageUpload'
import { useLink } from './hooks/useLink'
import { useTable } from './hooks/useTable'

import { EditorStyles } from './styles/EditorStyles'
import { getEmailExtensions, getNoteExtensions } from './config/editorExtensions'
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

export const NoteTipTapEditor = ({
  onChange,
  initialContent = null,
  maxLength,
  characterLimitErrorText
}: Props) => {
  const editorId = `component-text-1`
  const [characterCount, setCharacterCount] = useState(() => getTextContentLength(initialContent))

  const editor = useEditor({
    extensions: getNoteExtensions(),
    content: initialContent ?? null,
    onSelectionUpdate() { },
    onUpdate(props) {
      setCharacterCount(props.editor.getText().length)
      onChange(props.editor.getHTML())
    },
    onCreate() { }
  })

  const [imageUploadError, setImageUploadError] = useState<string | null>(null)

  const { t } = useTranslation()
  const isOverCharacterLimit = characterCount > maxLength

  useEffect(() => {
    setCharacterCount(getTextContentLength(initialContent))
  }, [initialContent])

  const images = useImageUpload(editor, {
    maxSizeInMB: 5,
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    uploadFunction: uploadNoteImage
  })

  const links = useLink(editor)

  return (
    <div>
      <EditorWrapper>
        <EditorStyles />
        <div></div>
        {links.setLinkModal}
        {links.editLinkModal}
        <EditorContainer>
          <div>
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

          </div>
          {images.isUploading && <LoadingOverlay />}
        </EditorContainer>

        <MenuBar
          editor={editor}
          setLink={links.setLink}
          onImageUpload={images.handleImageUpload}
          isImageSelected={images.isImageSelected}
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
    </div>
  )
}

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
  padding-inline-start: 10px;
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
`

const EditorColumn = styled.div`
  width: 100%;
`

const EditorContentWrapper = styled.div`
  width: 100%;
`
