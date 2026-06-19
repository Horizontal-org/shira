import { FunctionComponent, useMemo, useRef } from 'react'
import { Draggable } from "@hello-pangea/dnd";
import { Attachment, styled, ExplanationButton } from '@horizontal-org/shira-ui';
import { shallow } from 'zustand/shallow';
import { useStore } from '../../../../../store';
import { QuestionDragAttachment } from '../../../../../store/types/active_question';
import { QuestionContentDragItemOptions } from '../../QuestionContentDragItemOptions';

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

  const ref = useRef(null)

  const isExplanationActive = useMemo(() => {
    return selectedExplanation && selectedExplanation + '' === item.explanation
  }, [selectedExplanation, item.explanation])

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
                  <QuestionContentDragItemOptions
                    dragHandleProps={draggableProvided.dragHandleProps}
                    onDelete={onDelete}
                    typeOffset=''
                  />
                  <AttachmentWrapper
                    ref={ref}
                  >
                    <Attachment
                      name={item.value.name}
                      type={item.value.type}
                      active={isExplanationActive}
                    />
                  </AttachmentWrapper>

                  <ExplanationButton
                    hasExplanation={Boolean(item.explanation)}
                    active={isExplanationActive}
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
