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


interface Props {
  items: Array<MessagingDragItem>
  content: Object
  onChange: (newItems: Array<Object>) => void
  onContentChange: (id: string, value: string) => void
}

export const DraggableMessagingList: FunctionComponent<Props> = ({
  items,
  content,
  onChange,
  onContentChange
}) => {

  const [imageFloatingMenu, handleImageFloatingMenu] = useState<boolean>(false)
  const buttonRef = useRef<HTMLButtonElement>(null);

  const reorder = (newItems, startIndex, endIndex) => {
    const result: Array<Object> = Array.from(newItems);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result.map((r, i) => {
      return {
        ...r,
        position: i + 1
      }
    })
  }
  
  const remove = (deleteItem) => {
    console.log("🚀 ~ remove ~ deleteItem:", deleteItem)
    const newItems = items.filter(i => i.name !== deleteItem.name)
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
    console.log("🚀 ~ onDragEnd ~ newItems:", newItems)

    onChange(newItems)
  }
        
  const images = useImageUpload({
    maxSizeInMB: 5,
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  })

  const handleNewImage = async(e) => {
    if (e.target.files && e.target.files.length > 0 ) {
      items.push({
        name: `image-${items.length + 1}`,
        value: null,
        type: 'image',
        position: items.length + 1
      })
      const index = items.length - 1
      onChange(items)

      try {
        const res = await images.onImageSelect(e)    
        console.log("🚀 ~ handleNewImage ~ res:", res)
      
        const newItems = [...items];
        newItems[index] = { ...newItems[index], value: res as ImageObject};
        onChange(newItems)
      } catch (e) {
        const newItems = items.filter((item, itemIndex) =>  itemIndex !== index)
        onChange(newItems)
      }      
    }
    
  }

  return (
    <div>

      <ButtonsWrapper>
        <Button 
          onClick={() => {
            items.push({
              name: `text-${items.length + 1}`,
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
                  key={item.name + ''}
                  index={index}  
                  onChange={(newItem) => {
                    const newItems = [...items];
                    newItems[index] = { ...newItems[index], value: newItem.value };
                    onChange(newItems)
                  }}                
                  onDelete={() => {
                    // TODO clean Explanations, take example from attacments
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