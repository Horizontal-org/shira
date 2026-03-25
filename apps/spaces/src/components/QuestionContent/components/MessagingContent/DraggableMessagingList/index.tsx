import { Button, BaseFloatingMenu, useTheme, styled } from "@shira/ui";
import { FunctionComponent, useRef, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import { IoMdAdd } from "react-icons/io";
import { DraggableMessagingItem } from "../DraggableMessagingItem";

import { FiShare } from "react-icons/fi";
import { useImageUpload } from "../../../../../hooks/useImageUpload";
import { useStore } from "../../../../../store";
import { shallow } from "zustand/shallow";
import { QuestionDragEditor, QuestionDragImage } from "../../../../../store/types/active_question";
import { useTranslation } from "react-i18next";

interface Props {
  items: Array<QuestionDragEditor | QuestionDragImage>
  content: Object
  onChange: (newItems: Array<Object>) => void
}

// do something about this :(
const castType = {
  'editor': 'text',
  'image': 'image'
}

export const DraggableMessagingList: FunctionComponent<Props> = ({
  items,
  onChange,
}) => {

  const { t } = useTranslation();

  const {
    deleteExplanation,
  } = useStore((state) => ({
    deleteExplanation: state.deleteExplanation,
  }), shallow)

  const [imageFloatingMenu, handleImageFloatingMenu] = useState<boolean>(false)
  const [imageUploadError, setImageUploadError] = useState<string | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null);

  const reorder = (newItems, startIndex, endIndex) => {
    const result: Array<QuestionDragEditor | QuestionDragImage> = Array.from(newItems);
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
      </ButtonsWrapper>

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

const HiddenFileInput = styled.input`
  display: none;
`

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
`

const ErrorBanner = styled.div`
  background: ${(props) => props.theme.colors.light.paleRed};
  color: ${(props) => props.theme.colors.error9};
  padding: 16px 24px;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 600;
  width: fit-content;
  max-width: min(100%, 880px);
`

const ImageButtonWrapper = styled.div`
  position: relative;
`