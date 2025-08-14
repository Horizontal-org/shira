import { FunctionComponent, ReactNode } from 'react'
// import { Draggable } from "react-beautiful-dnd";
import { Draggable } from "@hello-pangea/dnd";
import { Body2Regular, Body3, Body3Bold, styled } from '@shira/ui';
import { DragItemOptions } from '../../../../DragItemOptions';
import { TextDragItem } from '../TextDragItem';
import { ImageDragItem } from '../ImageDragItem';
import { ImageObject, QuestionDragEditor, QuestionDragImage } from '../../../../../store/types/active_question';

interface Props {
  index: number;
  item: QuestionDragEditor | QuestionDragImage;
  onDelete: () => void  
  onChange: (item: QuestionDragEditor | QuestionDragImage) => void
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

              { item.contentType === 'editor' ? (<SmallText>Message text</SmallText>) : (<SmallText>Image</SmallText>)}
 
              <ContentWrapper>
                <DragItemOptions
                  dragHandleProps={draggableProvided.dragHandleProps}
                  onDelete={onDelete}
                />
                { item.contentType === 'editor' && (
                  <TextDragItem 
                    name={item.htmlId}
                    index={index}
                    initialValue={contentValue}
                    onChange={(value) => {
                      console.log("🚀 ~ value:", value)
                      // onChange({
                      //   ...item,
                      //   value
                      // })
                    }}
                  />
                )}
                { item.contentType === 'image' && (
                  <ImageDragItem 
                    index={index}
                    name={item.htmlId}
                    explanationId={item.explanation}
                    value={item.value}
                    onExplanationChange={(explId) => {
                      // onChange({
                      //   ...item,
                      //   // explId: explId
                      // })
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