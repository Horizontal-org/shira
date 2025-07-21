import { Button } from "@shira/ui";
import { FunctionComponent } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import { IoMdAdd } from "react-icons/io";
import { DraggableMessagingItem } from "../DraggableMessagingItem";
import { MessagingDragItem } from "../interfaces/MessagingDragItem";
import styled from "styled-components";

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
        <Button 
          onClick={() => {
            items.push({
              name: `image-${items.length + 1}`,
              value: null,
              type: 'image',
              position: items.length + 1
            })
            onChange(items)
          }}
          text="Add image"
          type="outline"    
          leftIcon={<IoMdAdd color="#5F6368" size={14}/>}        
        />
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

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 12px;
`