import { Button, BaseFloatingMenu } from "@shira/ui";
import { FunctionComponent, useRef, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import { IoMdAdd } from "react-icons/io";
import styled from "styled-components";
import { FiShare } from "react-icons/fi";
import { useImageUpload } from "../../../../../hooks/useImageUpload";
import toast from "react-hot-toast";
import { useStore } from "../../../../../store";
import { shallow } from "zustand/shallow";
import { DraggableAttachmentItem } from "../DraggableAttachmentItem";
import { AttachmenDragItem } from "..";


interface Props {
  items: Array<AttachmenDragItem>
  content: Object
  onChange: (newItems: Array<AttachmenDragItem>) => void
}

export const DraggableAttachmentList: FunctionComponent<Props> = ({
  items,
  content,
  onChange,
}) => {

  const {
    deleteExplanation,
  } = useStore((state) => ({
    deleteExplanation: state.deleteExplanation,
  }), shallow)
  
  const reorder = (newItems, startIndex, endIndex) => {
    const result: Array<AttachmenDragItem> = Array.from(newItems);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result.map((r, i) => {
      return {
        ...r,
        name: `component-attachment-${i + 1}`,
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
          name: `component-attachment-${i + 1}`,
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

  // const cleanTextExplanations = (item: MessagingDragItem) => {
  //   const htmlItemValue = new DOMParser().parseFromString(item.value as string, 'text/html')
  //   const textExplanations = htmlItemValue.querySelectorAll('[data-explanation]') 
  //   Array.from(textExplanations).forEach(e => {      
  //     deleteExplanation(parseInt(e.getAttribute('data-explanation')))
  //   })
  // }

  return (
    <div>
      {/* <ButtonsWrapper>
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
      </ButtonsWrapper> */}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >          
              { items.map(((item, index) => (
                <DraggableAttachmentItem
                  item={item}
                  contentValue={content[item.name]}
                  key={item.draggableId}
                  index={index}
                  onExplanationChange={(explId) => {
                    const newItems = [...items]
                    console.log("🚀 ~ newItems:", newItems)
                    newItems[index] = { 
                      ...newItems[index], 
                      explId: explId
                    }
                    console.log("🚀 ~ newItems:", newItems)
                    onChange(newItems)
                  }}
                  onDelete={() => {
                    if (item.explId) {
                      deleteExplanation(item.explId)
                    }
                    // if (item.type === 'text') {
                    //   cleanTextExplanations(item)
                    // }
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