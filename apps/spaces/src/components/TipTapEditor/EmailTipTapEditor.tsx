import { GeneralTooltip, styled } from '@shira/ui'
import { useEditor, EditorContent } from '@tiptap/react'
import { MenuBar } from './components/MenuBar'
import { useExplanations } from './hooks/useExplanations'
import { useImageUpload } from './hooks/useImageUpload'
import { useLink } from './hooks/useLink'
import { useTable } from './hooks/useTable'

import { EditorStyles } from './styles/EditorStyles'
import { getEmailExtensions } from './config/editorExtensions'
import { LoadingOverlay } from '../LoadingOverlay/LoadingOverlay'
import { ExplanationButton } from '../Explanations/components/ExplanationButton'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

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
    extensions: getEmailExtensions(),
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
  const [showExplanationButtonTooltip, setShowExplanationButtonTooltip] = useState(false)
  const { t } = useTranslation()

  const images = useImageUpload(editor, {
    maxSizeInMB: 5,
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  })

  const links = useLink(editor)
  const tables = useTable(editor)

  // Connect editor events to hooks
  if (editor) {
    editor.off('selectionUpdate').on('selectionUpdate', explanations.handleSelectionUpdate)
  }

  return (
    <Wrapper>
      <EditorWrapper>
        <EditorStyles />
        <div></div>
        {links.setLinkModal}
        {links.editLinkModal}
        <EditorContainer>
          <EditorContentWithExplanation>
            <EditorContentWrapper>
              <EditorContent id={editorId} editor={editor} />
            </EditorContentWrapper>
            <GeneralTooltip
              enabled={!explanations.canAddTextExplanation() && !explanations.isTextExplanationActive() && !images.selectedImageHasExplanation}
              show={showExplanationButtonTooltip}
              setShow={setShowExplanationButtonTooltip}
              label={t('create_question.tabs.content.explanation_tooltip')}
            >
              <ExplanationButton
                isText={true}
                active={explanations.isTextExplanationActive() || images.selectedImageHasExplanation}
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
  max-width: 100%;
`

const HiddenFileInput = styled.input`
  display: none;
`

const EditorContainer = styled.div`
  position: relative;
`

const EditorContentWithExplanation = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  align-items: center;
`

const EditorContentWrapper = styled.div`
  width: 100%;
`