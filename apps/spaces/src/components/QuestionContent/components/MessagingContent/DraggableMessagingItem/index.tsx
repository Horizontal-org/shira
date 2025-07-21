import { FunctionComponent, ReactNode } from 'react'
// import { Draggable } from "react-beautiful-dnd";
import { Draggable } from "@hello-pangea/dnd";
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
      draggableId={item.name} 
      index={index}
    >
      {(draggableProvided, snapshot) => (
        <>
          <Container
            ref={draggableProvided.innerRef}
            {...draggableProvided.draggableProps}
          >
            <Wrapper>

              { item.type === 'text' ? (<SmallText>Message text</SmallText>) : (<SmallText>Image</SmallText>)}
 
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

const Container = styled.div`
  padding-top: 18px;
`

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
`

const SmallText = styled.div`
  font-size: 14px;
  font-weight: 600;
`