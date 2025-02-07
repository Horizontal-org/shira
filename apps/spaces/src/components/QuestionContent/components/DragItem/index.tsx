import { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'
import { Draggable } from "react-beautiful-dnd";
import { DynamicComponentOptions } from '../../../DynamicComponentOptions';

interface Props {
  id: string;
  component: ReactNode;
  index: number;
  onDelete: () => void
}

export const DragItem: FunctionComponent<Props> = ({
  id,
  component,
  index,
  onDelete
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
            ref={draggableProvided.innerRef}
            isDragging={snapshot.isDragging}
            {...draggableProvided.draggableProps}
            >
            <DynamicComponentOptions
              dragHandleProps={draggableProvided.dragHandleProps}
              onDelete={onDelete}
            />
            { component }
          </Container>
        </>
      )}
    </Draggable>
    </>
  )
}

const Container = styled.div`
  padding: 4px 0;
  display: flex;
`