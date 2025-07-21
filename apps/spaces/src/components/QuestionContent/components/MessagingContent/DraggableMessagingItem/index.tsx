import { FunctionComponent, ReactNode } from 'react'
import { Draggable } from "react-beautiful-dnd";
import { Body2Regular, Body3, Body3Bold, styled } from '@shira/ui';
import { DragItemOptions } from '../../../../DragItemOptions';
import { MessagingDragItem } from '../interfaces/MessagingDragItem';
import { TextDragItem } from '../TextDragItem';

interface Props {
  index: number;
  item: MessagingDragItem;
  onDelete: () => void  
  onChange: (item: MessagingDragItem) => void
}

export const DraggableMessagingItem: FunctionComponent<Props> = ({  
  index,
  item,
  onDelete,  
  onChange
}) => {
  return (
    <>
    <Draggable 
      draggableId={item.position + ''} 
      index={index}
    >
      {(draggableProvided, snapshot) => (
        <>
          <Container
            ref={draggableProvided.innerRef}
            isDragging={snapshot.isDragging}
            {...draggableProvided.draggableProps}
          >
            <Wrapper>

              { item.type === 'text' ? (<Body2Regular>Message text</Body2Regular>) : (<Body2Regular>Image</Body2Regular>)}
 
              <ContentWrapper>
                <DragItemOptions
                  dragHandleProps={draggableProvided.dragHandleProps}
                  onDelete={onDelete}
                />
                { item.type === 'text' && (
                  <TextDragItem 
                    name={item.name}
                    onChange={(value) => {
                      onChange({
                        ...item,
                        value
                      })
                    }}
                  />
                )}              
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