import { FunctionComponent, useEffect, useState } from "react";
import { FiMenu, FiPlus } from 'react-icons/fi';
import { Button, styled, SubHeading1, TrashIcon, EditIcon } from '@shira/ui'
import EmptyState from "./EmptyState";
import { DeleteModal } from "../../modals/DeleteModal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ReorderQuizPayload } from "../../../fetch/quiz";
import { QuizQuestion } from "../../../store/slices/quiz";


interface QuestionsListProps {
  quizQuestions: QuizQuestion[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  onReorder: (newOrder: QuizQuestion[]) => void
}

export const  QuestionsList: FunctionComponent<QuestionsListProps> = ({
  quizQuestions,
  onEdit,
  onDelete,
  onAdd,
  onReorder
}) => {
  console.log("🚀 ~ quizQuestions:", quizQuestions)
  const [questionForDelete, handleQuestionForDelete] = useState(null)

  const reorder = (startIndex, endIndex) => {
    const plainList: QuizQuestion[] = Array.from(quizQuestions);
    const [removed] = plainList.splice(startIndex, 1);
    plainList.splice(endIndex, 0, removed);
  
    return plainList.map((r, i) => {
      return {
        ...r,
        position: i + 1
      }
    })
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      result.source.index,
      result.destination.index
    );

    onReorder(items)
  }

  if(!quizQuestions || quizQuestions.length === 0) {
    return <EmptyState onAdd={onAdd}/>
  }
  
  return (
    <Container>
      <Header>
        <SubHeading1>Questions</SubHeading1>
        <Button
          leftIcon={<FiPlus size={16} />}
          text="Add question"
          type="primary"
          color="#849D29"
          onClick={onAdd}
        />
      </Header>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
        {(provided, snapshot) => (
          <List
            {...provided.droppableProps}
            ref={provided.innerRef}    
          >
            {quizQuestions.sort((a, b) => {
              return a.position - b.position
            }).map((qq, i) => (
              <Draggable 
                draggableId={qq.position + ''} 
                index={i}
                id={qq.position + ''}   
                key={qq.position + ''} 
              >
                {(draggableProvided, snapshot) => (
                  <QuestionItem 
                    ref={draggableProvided.innerRef}
                    isDragging={snapshot.isDragging}
                    {...draggableProvided.draggableProps}
                  >
                    <LeftSection>
                      <MenuIcon
                        {...draggableProvided.dragHandleProps}
                      >
                        <FiMenu size={20} color="#666" />
                      </MenuIcon>
                      <QuestionTitle>{qq.question.name}</QuestionTitle>
                    </LeftSection>
                    <Actions>
                      <ActionButton onClick={() => onEdit(qq.question.id)}>
                        <EditIcon />
                      </ActionButton>
                      <ActionButton onClick={() => handleQuestionForDelete(qq.question)}>
                        <TrashIcon />
                      </ActionButton>
                    </Actions>
                  </QuestionItem>
                )}
              </Draggable>
            ))}
            { provided.placeholder }
          </List>
        )}
        </Droppable>
      </DragDropContext>
      <DeleteModal
        title={`Are you sure you want to delete "${questionForDelete?.name}"?`}
        content="Deleting this question is permanent and cannot be undone."
        setIsModalOpen={() => {
          handleQuestionForDelete(null)
        }}
        onDelete={() => { 
          onDelete(questionForDelete?.id) 
        }}
        onCancel={() => {
          handleQuestionForDelete(null)
        }}
        isModalOpen={!!(questionForDelete)}
      />
    </Container>
  );
};

const Container = styled.div`
  background: white;
  border-radius: 32px;
  padding: 32px;
  margin: 16px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const QuestionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;

  &:hover {
    background: ${props => props.theme.colors.light.paleGrey};
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
`;

const MenuIcon = styled.div`
  height: 20px;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

const QuestionTitle = styled.div`
  font-size: 14px;
  height: 20px;
  color: ${props => props.theme.colors.dark.black};
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${props => props.theme.colors.light.paleGreen};
  }
`;

export default QuestionsList;