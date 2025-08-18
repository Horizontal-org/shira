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
import { QuestionDragAttachment, QuestionDragEditor } from "../../../../../store/types/active_question";


interface Props {
  items: Array<QuestionDragAttachment>
  onChange: (newItems: Array<QuestionDragAttachment>) => void
}

export const DraggableAttachmentList: FunctionComponent<Props> = ({
  items,
  onChange,
}) => {

  const {
    deleteExplanation,
  } = useStore((state) => ({
    deleteExplanation: state.deleteExplanation,
  }), shallow)
  
  const reorder = (newItems, startIndex, endIndex) => {
    const result: Array<QuestionDragAttachment> = Array.from(newItems);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result.map((r, i) => {
      return {
        ...r,
        htmlId: `component-attachment-${i + 1}`,
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
          htmlId: `component-attachment-${i + 1}`,
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


  return (
    <div>
    
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
                  key={item.draggableId}
                  index={index}
                  onDelete={() => {
                    if (item.explanation && item.explanation.length > 0) {
                      deleteExplanation(parseInt(item.explanation))
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