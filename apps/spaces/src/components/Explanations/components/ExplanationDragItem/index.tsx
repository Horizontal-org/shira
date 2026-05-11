import { FunctionComponent, ReactNode } from 'react'
import { Draggable } from "react-beautiful-dnd";
import { Body3Bold, styled } from '@horizontal-org/shira-ui';
import { DragItemOptions } from '../../../DragItemOptions';

interface Props {
  id: string;
  component: ReactNode;
  index: number;
  onDelete: () => void
  title: string
  text: string
  selected: boolean
}

export const ExplanationDragItem: FunctionComponent<Props> = ({
  id,
  component,
  index,
  onDelete,
  title,
  text,
  selected
}) => {
  return (
    <>
      <Draggable
        draggableId={id}
        index={index}
      >
        {(draggableProvided, snapshot) => (
          <>
            <Container
              selected={selected}
              ref={draggableProvided.innerRef}
              isDragging={snapshot.isDragging}
              {...draggableProvided.draggableProps}
            >
              <ContentWrapper>
                <Body3Bold>{title}</Body3Bold>
                <div>
                  {component}
                </div>
              </ContentWrapper>

              <DragItemOptions
                dragHandleProps={draggableProvided.dragHandleProps}
                onDelete={onDelete}
              />
            </Container>
          </>
        )}
      </Draggable>
    </>
  )
}

const Container = styled.div<{ selected: boolean }>`
  padding: 12px;
  display: flex;
  border-radius: 16px;
  border: 2px solid ${props => props.theme.colors.green2};
  background: ${props => props.theme.colors.light.paleGreen};
  margin-bottom: 24px;

  ${props => props.selected && `
    background: #fff;
    border: 2px solid ${props.theme.secondary.base};
  `}
`

const ContentWrapper = styled.div`
  width: 100%;
`