import { FunctionComponent, ReactNode } from 'react'
// import { Draggable } from "react-beautiful-dnd";
import { Draggable } from "@hello-pangea/dnd";
import { Body2Regular, Body3, Body3Bold, styled } from '@shira/ui';
import { DragItemOptions } from '../../../../DragItemOptions';
import { ImageObject, MessagingDragItem } from '../interfaces/MessagingDragItem';
import { TextDragItem } from '../TextDragItem';
import { ImageDragItem } from '../ImageDragItem';

interface Props {
  index: number;
  item: MessagingDragItem;
  onDelete: () => void  
  onChange: (item: MessagingDragItem) => void
  contentValue: string | null 
}

export const DraggableMessagingItem: FunctionComponent<Props> = ({  
  index,
  item,
  onDelete,  
  onChange,
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

              { item.type === 'text' ? (<SmallText>Message text</SmallText>) : (<SmallText>Image</SmallText>)}
 
              <ContentWrapper>
                <DragItemOptions
                  dragHandleProps={draggableProvided.dragHandleProps}
                  onDelete={onDelete}
                />
                { item.type === 'text' && (
                  <TextDragItem 
                    name={item.name}
                    initialValue={contentValue}
                    onChange={(value) => {
                      onChange({
                        ...item,
                        value
                      })
                    }}
                  />
                )}
                { item.type === 'image' && (
                  <ImageDragItem 
                    name={item.name}
                    explanationId={item.explId || null}
                    value={item.value as ImageObject}
                    onExplanationChange={(explId) => {
                      onChange({
                        ...item,
                        explId: explId
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

const SmallText = styled.div`
  font-size: 14px;
  font-weight: 600;
  padding-bottom: 4px;
`