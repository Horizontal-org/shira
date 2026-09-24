import { Button, BaseFloatingMenu, styled, AttachmentType, AddAttachmentModal } from "@horizontal-org/shira-ui";
import { FunctionComponent, useRef, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import { IoMdAdd } from "react-icons/io";
import { DraggableMessagingItem } from "../DraggableMessagingItem";

import { FiShare } from "react-icons/fi";
import { useImageUpload } from "../../../../../hooks/useImageUpload";
import { useStore } from "../../../../../store";
import { shallow } from "zustand/shallow";
import { QuestionDragEditor, QuestionDragImage, QuestionDragAttachment } from "../../../../../store/types/active_question";
import { useTranslation } from "react-i18next";
import { ErrorBanner } from "../../../../ErrorBanner";


interface Props {
  items: Array<QuestionDragEditor | QuestionDragImage | QuestionDragAttachment>
  content: Object
  onChange: (newItems: Array<Object>) => void
}

// do something about this :(
const castType = {
  'editor': 'text',
  'image': 'image',
  'attachment': 'attachment'
}

export const DraggableMessagingList: FunctionComponent<Props> = ({
  items,
  onChange,
}) => {

  const { t } = useTranslation();

  const [attachmentModalOpen, setAttachmentModalOpen] = useState(false);
  const [attachmentFilename, setAttachmentFilename] = useState('')
  const [attachmentFileType, setAttachmentFileType] = useState(AttachmentType.document)

  const {
    deleteExplanation,
  } = useStore((state) => ({
    deleteExplanation: state.deleteExplanation,
  }), shallow)

  const [imageFloatingMenu, handleImageFloatingMenu] = useState<boolean>(false)
  const [imageUploadError, setImageUploadError] = useState<string | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null);

  const reorder = (newItems, startIndex, endIndex) => {
    const result: Array<QuestionDragEditor | QuestionDragImage | QuestionDragAttachment> = Array.from(newItems);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result.map((r, i) => {
      return {
        ...r,
        htmlId: `component-${castType[r.contentType]}-${i + 1}`,
        position: i + 1
      }
    })
  }

  const remove = (deleteItem) => {
    const newItems = items
      .filter(i => i.htmlId !== deleteItem.htmlId)
      .map((r, i) => {
        return {
          ...r,
          htmlId: `component-${castType[r.contentType]}-${i + 1}`,
          position: i + 1
        }
      })
    onChange(newItems)
  }

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    )

    onChange(newItems)
  }

  const images = useImageUpload({
    maxSizeInMB: 5,
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  })

  const handleNewImage = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      const validationError = images.validateFile(selectedFile)

      if (validationError) {
        setImageUploadError(validationError)
        e.target.value = ''
        return
      }

      setImageUploadError(null)
      const newName = `component-image-${items.length + 1}`
      const newPosition = items.length + 1
      const newItems = [...items]
      newItems.push({
        draggableId: crypto.randomUUID(),
        htmlId: newName,
        value: null,
        contentType: 'image',
        position: newPosition,
        explanation: null
      })
      const index = newItems.length - 1
      onChange(newItems)

      try {
        const res = await images.onImageSelect(e)
        if (!res) {
          return
        }
        newItems[index] = {
          ...newItems[index],
          value: res
        } as QuestionDragImage
        onChange(newItems)
      } catch (e) {
        setImageUploadError(e instanceof Error ? e.message : String(e))
        onChange(items.filter((_item, itemIndex) => itemIndex !== index))
      }
    }
  }

  const cleanTextExplanations = (item: QuestionDragEditor) => {
    const htmlItemValue = new DOMParser().parseFromString(item.value as string, 'text/html')
    const textExplanations = htmlItemValue.querySelectorAll('[data-explanation]')
    Array.from(textExplanations).forEach(e => {
      deleteExplanation(parseInt(e.getAttribute('data-explanation')))
    })
  }

  return (
    <div id="draggable-messaging-list">
      <ButtonsWrapper>
        <div>
          <Button
            onClick={() => {
              const newItems = [...items]
              newItems.push({
                draggableId: crypto.randomUUID(),
                htmlId: `component-text-${items.length + 1}`,
                value: null,
                contentType: 'editor',
                position: items.length + 1
              })
              onChange(newItems)
            }}
            text={t('create_question.tabs.content.add_message_text')}
            type="outline"
            leftIcon={<IoMdAdd color="#5F6368" size={14} />}
          />
        </div>

        <ImageButtonWrapper>
          <Button
            onClick={() => {
              handleImageFloatingMenu(true)
            }}
            text={t('create_question.tabs.content.add_image_attachment')}
            type="outline"
            leftIcon={<IoMdAdd color="#5F6368" size={14} />}
            ref={buttonRef}
          />
          <BaseFloatingMenu
            isOpen={imageFloatingMenu}
            onClose={() => handleImageFloatingMenu(false)}
            elements={[
              {
                text: t('create_question.tabs.content.upload_image'),
                onClick: () => {
                  handleImageFloatingMenu(false)
                  images.handleImageUpload()
                },
                icon: <FiShare />
              }
            ]}
            anchorEl={buttonRef.current}
          />
          <HiddenFileInput
            ref={images.fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp,.jpg,.jpeg,.png,.gif,.webp"
            onChange={handleNewImage}
          />
        </ImageButtonWrapper>
        <AddAttachmentButtonWrapper>
          <Button
            onClick={() => setAttachmentModalOpen(true)}
            text={t("create_question.tabs.content.attachment_button")}
            type="outline"
            leftIcon={<IoMdAdd color="#5F6368" size={14} />}
          />
        </AddAttachmentButtonWrapper>
      </ButtonsWrapper>

      <AddAttachmentModal
        titleLabel={t("modals.attachment_file.title")}
        saveLabel={t("buttons.save")}
        cancelLabel={t("buttons.cancel")}
        fileNameLabel={t("modals.attachment_file.file_name")}
        fileTypeLabel={t("modals.attachment_file.file_type")}
        fileTypeExplanation={t("modals.attachment_file.explanation")}
        fileName={attachmentFilename}
        handleFileName={setAttachmentFilename}
        fileType={attachmentFileType}
        handleFileType={setAttachmentFileType}
        isOpen={attachmentModalOpen}
        onClose={() => setAttachmentModalOpen(false)}
        excludedFileTypes={[AttachmentType.image]}
        onSave={() => {
          const newItems = [...items]
          newItems.push({
            draggableId: crypto.randomUUID(),
            htmlId: `component-attachment-${items.length + 1}`,
            explanation: null,
            contentType: 'attachment',
            position: items.length + 1,
            value: {
              name: attachmentFilename,
              type: attachmentFileType
            }
          })
          onChange(newItems)
          setAttachmentFilename('')
          setAttachmentFileType(AttachmentType.document)
        }}
      />

      {imageUploadError && (
        <ErrorBanner role="alert" aria-live="polite">
          {imageUploadError}
        </ErrorBanner>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {items.map(((item, index) => (
                <DraggableMessagingItem
                  item={item}
                  key={item.draggableId}
                  index={index}
                  isImageUploading={item.contentType === 'image' && !item.value && images.isUploading}
                  onDelete={() => {
                    if (item.contentType === 'image' && item.explanation) {
                      deleteExplanation((parseInt(item.explanation)))
                    }

                    if (item.contentType === 'editor') {
                      cleanTextExplanations(item)
                    }

                    // here cycle trhough explanations inside index
                    remove(item)
                  }}
                />
              )))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

    </div>
  )
}

const AddAttachmentButtonWrapper = styled.div`
  margin-bottom: 24px;
`

const HiddenFileInput = styled.input`
  display: none;
`

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
`

const ImageButtonWrapper = styled.div`
  position: relative;
`
