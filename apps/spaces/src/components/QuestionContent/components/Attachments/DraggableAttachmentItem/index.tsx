import { FunctionComponent, ReactNode, useEffect, useRef } from 'react'
import { Draggable } from "@hello-pangea/dnd";
import { Attachment, styled } from '@shira/ui';
import { DragItemOptions } from '../../../../DragItemOptions';
import { AttachmenDragItem } from '..';
import { shallow } from 'zustand/shallow';
import { useStore } from '../../../../../store';
import { ExplanationButton } from '../../../../Explanations/components/ExplanationButton';
import { subscribe, unsubscribe } from '../../../../../utils/customEvent';

interface Props {
  index: number;
  item: AttachmenDragItem;
  onDelete: () => void  
  contentValue: string | null 
  onExplanationChange: (explId: number) => void
}

export const DraggableAttachmentItem: FunctionComponent<Props> = ({  
  index,
  item,
  onDelete,  
  contentValue,
  onExplanationChange,
}) => {

  const {
    addExplanation,
    explanationIndex,      
    changeSelected,
    selectedExplanation
  } = useStore((state) => ({
    addExplanation: state.addExplanation,
    explanationIndex: state.explanationIndex,
    changeSelected: state.changeSelected,
    selectedExplanation: state.selectedExplanation
  }), shallow)
    

   const ref = useRef(null)
  
    const subscribeToDelete = (newExplId) => {
      subscribe('delete-explanation', (event) => {
        if (newExplId === event.detail.deleteIndex) {
          console.log("HEREHERE" ,event.detail.deleteIndex)
          ref.current.removeAttribute('data-explanation')
          onExplanationChange(null)
        }        
      })
    }

    useEffect(() => {      
      return () => {
        unsubscribe('delete-explanation')
      }
    }, [])

    useEffect(() => {
      if(item.explId && ref) {
        ref.current.setAttribute('data-explanation', item.explId)
        subscribeToDelete(item.explId)
      }
    }, [item.explId, ref])

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
                  active={selectedExplanation && selectedExplanation === item.explId}
                  disabled={false}
                    onClick={() => {
                      if (item.explId) {
                        changeSelected(item.explId)
                      } else {
                        const index = explanationIndex + 1
                        ref.current.setAttribute('data-explanation', index + '')
                        addExplanation(index, '')
                        onExplanationChange(index)
                        // subscribeToDelete(index)
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