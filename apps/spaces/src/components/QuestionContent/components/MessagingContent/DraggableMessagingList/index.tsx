import { Button, BaseFloatingMenu } from "@shira/ui";
import { FunctionComponent, useRef, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import { IoMdAdd } from "react-icons/io";
import { DraggableMessagingItem } from "../DraggableMessagingItem";
import { ImageObject, MessagingDragItem } from "../interfaces/MessagingDragItem";
import styled from "styled-components";
import { FiShare } from "react-icons/fi";
import { useImageUpload } from "../../../../../hooks/useImageUpload";
import toast from "react-hot-toast";
import { useStore } from "../../../../../store";
import { shallow } from "zustand/shallow";


interface Props {
  items: Array<MessagingDragItem>
  content: Object
  onChange: (newItems: Array<Object>) => void
  onRemapContent: (newContent: Object) => void
}

export const DraggableMessagingList: FunctionComponent<Props> = ({
  items,
  content,
  onChange,
  onRemapContent,  
}) => {

  const {
    deleteExplanation,
  } = useStore((state) => ({
    deleteExplanation: state.deleteExplanation,
  }), shallow)
    

  const [imageFloatingMenu, handleImageFloatingMenu] = useState<boolean>(false)
  const buttonRef = useRef<HTMLButtonElement>(null);

  const reorder = (newItems, startIndex, endIndex) => {
    const result: Array<MessagingDragItem> = Array.from(newItems);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result.map((r, i) => {
      return {
        ...r,
        name: `component-${r.type}-${i + 1}`,
        position: i + 1
      }
    })
  }
  
  const remove = (deleteItem) => {
    const newItems = items
      .filter(i => i.name !== deleteItem.name)
      .map((r, i) => {
        return {
          ...r,
          name: `component-${r.type}-${i + 1}`,
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

  const handleNewImage = async(e) => {
    if (e.target.files && e.target.files.length > 0 ) {
      const newName = `component-image-${items.length + 1}`
      const newPosition = items.length + 1
      items.push({
        draggableId: crypto.randomUUID(),
        name: newName,
        value: null,
        type: 'image',
        position: newPosition
      })
      const index = items.length - 1
      onChange(items)

      try {
        const res = await images.onImageSelect(e)    
        const newItems = [...items];
        newItems[index] = { ...newItems[index], value: res as ImageObject};
        onChange(newItems)
      } catch (e) {
        const newItems = items.filter((item, itemIndex) =>  itemIndex !== index)
        onChange(newItems)
      }      
    }
    
  }

  const cleanTextExplanations = (item: MessagingDragItem) => {
    console.log("🚀 ~ cleanTextExplanations ~ item:", item)
    const htmlItemValue = new DOMParser().parseFromString(item.value as string, 'text/html')
    const textExplanations = htmlItemValue.querySelectorAll('[data-explanation]') 
    Array.from(textExplanations).forEach(e => {      
      deleteExplanation(parseInt(e.getAttribute('data-explanation')))
    })
  }

  return (
    <div>
      <ButtonsWrapper>
        <Button 
          onClick={() => {
            items.push({
              draggableId: crypto.randomUUID(),
              name: `component-text-${items.length + 1}`,
              value: null,
              type: 'text',
              position: items.length + 1
            })
            onChange(items)
          }}
          text="Add message text"
          type="outline"    
          leftIcon={<IoMdAdd color="#5F6368" size={14}/>}
        />

        <ImageButtonWrapper>
          <Button 
            onClick={() => {
              handleImageFloatingMenu(true)              
            }}
            text="Add image"
            type="outline"    
            leftIcon={<IoMdAdd color="#5F6368" size={14}/>}        
            ref={buttonRef}
          />
          <BaseFloatingMenu          
            isOpen={imageFloatingMenu}
            onClose={() => handleImageFloatingMenu(false)}
            elements={[
              {
                text: 'Upload from computer',
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
            accept="image/*"
            onChange={handleNewImage}
          />
        </ImageButtonWrapper>
      </ButtonsWrapper>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >          
              { items.map(((item, index) => (
                <DraggableMessagingItem
                  item={item}
                  contentValue={content[item.name]}
                  key={item.draggableId}
                  index={index}  
                  onChange={(newItem) => {
                    const newItems = [...items];
                    newItems[index] = { 
                      ...newItems[index], 
                      value: newItem.value,
                      explId: newItem.explId || null
                    }
                    onChange(newItems)
                  }}                
                  onDelete={() => {
                    if (item.explId) {
                      deleteExplanation(item.explId)
                    }
                    if (item.type === 'text') {
                      cleanTextExplanations(item)
                    }
                    // here cycle trhough explanations inside index
                    remove(item)
                  }}
                />
              ))) }
              { provided.placeholder }
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

const ImageButtonWrapper = styled.div`
  position: relative;
`