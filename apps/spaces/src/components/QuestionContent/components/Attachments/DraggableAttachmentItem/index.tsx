import { FunctionComponent, ReactNode } from 'react'
import { Draggable } from "@hello-pangea/dnd";
import { styled } from '@shira/ui';
import { DragItemOptions } from '../../../../DragItemOptions';
import { AttachmenDragItem } from '..';

interface Props {
  index: number;
  item: AttachmenDragItem;
  onDelete: () => void  
  contentValue: string | null 
}

export const DraggableAttachmentItem: FunctionComponent<Props> = ({  
  index,
  item,
  onDelete,  
  contentValue
}) => {
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
             
                
              </ContentWrapper>
            </Wrapper>
            
          </Container>
        </>
      )}
    </Draggable>
    </>
  )
}


const Wrapper = styled.div``

const Container = styled.div``

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

const SmallText = styled.div`
  font-size: 14px;
  font-weight: 600;
  padding-bottom: 4px;
`