import { FunctionComponent, ReactNode, useEffect, useRef } from 'react'
import { Draggable } from "@hello-pangea/dnd";
import { Attachment, styled } from '@shira/ui';
import { DragItemOptions } from '../../../../DragItemOptions';
import { shallow } from 'zustand/shallow';
import { useStore } from '../../../../../store';
import { ExplanationButton } from '../../../../Explanations/components/ExplanationButton';
import { QuestionDragAttachment } from '../../../../../store/types/active_question';

interface Props {
  index: number;
  item: QuestionDragAttachment;
  onDelete: () => void  
}

export const DraggableAttachmentItem: FunctionComponent<Props> = ({  
  index,
  item,
  onDelete,  
}) => {
  console.log("🚀 ~ DraggableAttachmentItem ~ item:", item)

  const {
    addExplanation,
    explanationIndex,      
    changeSelected,
    selectedExplanation,
    updateActiveQuestionDraggableItem
  } = useStore((state) => ({
    addExplanation: state.addExplanation,
    explanationIndex: state.explanationIndex,
    changeSelected: state.changeSelected,
    selectedExplanation: state.selectedExplanation,
    updateActiveQuestionDraggableItem: state.updateActiveQuestionDraggableItem
  }), shallow)
    console.log("🚀 ~ DraggableAttachmentItem ~ selectedExplanation:", selectedExplanation)
    
   const ref = useRef(null)
  
  return (
    <>
    <Draggable 
      draggableId={item.draggableId} 
      index={index}
    >
      {(draggableProvided, snapshot) => (
        <>
          <Container
            ref={draggableProvided.innerRef}
            {...draggableProvided.draggableProps}
          >
            <Wrapper>
              <ContentWrapper>
                <DragItemOptions
                  dragHandleProps={draggableProvided.dragHandleProps}
                  onDelete={onDelete}
                />
                <AttachmentWrapper
                  ref={ref}
                >
                  <Attachment                     
                    name={item.value.name}
                    type={item.value.type}
                  />                   
                </AttachmentWrapper>
                <ExplanationButton
                  active={selectedExplanation && selectedExplanation + '' === item.explanation}
                  disabled={false}
                    onClick={() => {
                      if (item.explanation) {
                        changeSelected(parseInt(item.explanation))
                      } else {
                        const newExplanationIndex = explanationIndex + 1
                        addExplanation(newExplanationIndex, '')
                        updateActiveQuestionDraggableItem(index, 'explanation', newExplanationIndex + '')
                      }
                  }}
                />
              </ContentWrapper>
            </Wrapper>
            
          </Container>
        </>
      )}
    </Draggable>
    </>
  )
}


const Wrapper = styled.div`
  padding: 12px 0;
`

const Container = styled.div``

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

const AttachmentWrapper = styled.div`
  padding-left: 20px;
`