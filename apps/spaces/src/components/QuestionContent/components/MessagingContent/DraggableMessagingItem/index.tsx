import { FunctionComponent } from 'react'
import { Draggable } from "@hello-pangea/dnd";
import { styled } from '@horizontal-org/shira-ui';
import { TextDragItem } from '../TextDragItem';
import { AttachmentDragItem } from '../AttachmentDragItem';
import { ImageDragItem } from '../ImageDragItem';
import { QuestionDragEditor, QuestionDragImage, QuestionDragAttachment } from '../../../../../store/types/active_question';
import { QuestionContentDragItemOptions } from '../../QuestionContentDragItemOptions';

interface Props {
  index: number;
  item: QuestionDragEditor | QuestionDragImage | QuestionDragAttachment;
  onDelete: () => void
  isImageUploading?: boolean
}

export const DraggableMessagingItem: FunctionComponent<Props> = ({
  index,
  item,
  onDelete,
  isImageUploading = false,
}) => {
  return (
    <>
      <Draggable
        draggableId={item.draggableId}
        index={index}
      >
        {(draggableProvided) => (
          <>
            <Container
              ref={draggableProvided.innerRef}
              {...draggableProvided.draggableProps}
            >
              <Wrapper>

                {item.contentType === 'editor' && (<SmallText>Message text</SmallText>)}
                {item.contentType === 'image' && (<SmallText>Image</SmallText>)}
                {item.contentType === 'attachment' && (<SmallText>Attachment</SmallText>)}

                <ContentWrapper>
                  <QuestionContentDragItemOptions
                    dragHandleProps={draggableProvided.dragHandleProps}
                    onDelete={onDelete}
                    typeOffset={item.contentType === 'editor' ? '52px' : ''}
                  />
                  {item.contentType === 'editor' && (
                    <TextDragItem
                      name={item.htmlId}
                      index={index}
                      initialValue={item.value}
                    />
                  )}
                  {item.contentType === 'image' && (
                    <ImageDragItem
                      index={index}
                      explanationId={item.explanation}
                      value={item.value}
                      uploadError={item.uploadError}
                      uploadFilename={item.uploadFilename}
                      isLoading={isImageUploading}
                    />
                  )}

                  {item.contentType === 'attachment' && (
                    <AttachmentDragItem
                      name={item.value.name}
                      explanationId={item.explanation}
                      index={index}
                      type={item.value.type}
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
  margin: 10px 0 30px 0;
`

const SmallText = styled.div`
  font-size: 14px;
  font-weight: 600;
  padding-bottom: 4px;
`
