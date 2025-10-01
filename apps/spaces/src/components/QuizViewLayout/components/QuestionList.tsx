import { FunctionComponent, useState } from "react";
import { FiMenu, FiPlus, FiLoader } from 'react-icons/fi';
import { MdOutlineMenuBook } from "react-icons/md";
import { styled, TrashIcon, EditIcon, Button, CopyIcon, defaultTheme } from '@shira/ui'
import EmptyState from "./EmptyState";
import { DeleteModal } from "../../modals/DeleteModal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { duplicateQuestion } from "../../../fetch/quiz";
import { QuizQuestion } from "../../../store/slices/quiz";
import toast from "react-hot-toast";


interface QuestionsListProps {
  quizId: number;
  quizQuestions: QuizQuestion[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  onAddLibrary: (quizId: string) => void;

  onReorder: (newOrder: QuizQuestion[]) => void;
  onDuplicate: () => void;

}

export const QuestionsList: FunctionComponent<QuestionsListProps> = ({
  quizId,
  quizQuestions,
  onEdit,
  onDelete,
  onAdd,
  onAddLibrary,
  onReorder,
  onDuplicate
}) => {
  console.log("🚀 ~ quizQuestions:", quizQuestions)
  const [questionForDelete, handleQuestionForDelete] = useState(null)
  const [duplicatingQuestions, setDuplicatingQuestions] = useState(new Set())

  const handleDuplicateQuestion = async (questionId: string, questionName: string) => {
    setDuplicatingQuestions(prev => new Set(prev).add(questionId))

    try {
      await duplicateQuestion(quizId, parseInt(questionId))
      toast.success(`"Copy of ${questionName}" created successfully`, { duration: 3000 })
      onDuplicate() // Refresh the quiz data
    } catch (error) {
      toast.error('Failed to duplicate question', { duration: 3000 })
    } finally {
      setDuplicatingQuestions(prev => {
        const newSet = new Set(prev)
        newSet.delete(questionId)
        return newSet
      })
    }
  }

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

  if (!quizQuestions || quizQuestions.length === 0) {
    return <EmptyState onAdd={onAdd} />
  }

  return (
    <div>
      <Header>
        <Button
          leftIcon={<FiPlus size={16} />}
          text="Create question"
          type="primary"
          color={defaultTheme.colors.green7}
          onClick={onAdd}
        />
        <Button
          leftIcon={<MdOutlineMenuBook size={18} />}
          text="Add from library"
          type="primary"
          color={defaultTheme.colors.green7}
          onClick={() => onAddLibrary(quizId.toString())}
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
                  {(draggableProvided, snapshot) => {
                    const isBeingDuplicated = duplicatingQuestions.has(qq.question.id)
                    return (
                      <QuestionItem
                        ref={draggableProvided.innerRef}
                        isDragging={snapshot.isDragging}
                        {...draggableProvided.draggableProps}
                      >
                        <LeftSection>
                          <MenuIcon
                            {...draggableProvided.dragHandleProps}
                          >
                            {isBeingDuplicated ? (
                              <SpinningLoader size={20} color="#666" />
                            ) : (
                              <FiMenu size={20} color="#666" />
                            )}
                          </MenuIcon>
                          <QuestionTitle>
                            {isBeingDuplicated ? "Duplicating..." : qq.question.name}
                          </QuestionTitle>
                        </LeftSection>
                        <Actions>
                          <ActionButton onClick={() => onEdit(qq.question.id)}>
                            <EditIcon />
                          </ActionButton>
                          <ActionButton
                            onClick={() => handleDuplicateQuestion(qq.question.id, qq.question.name)}
                            disabled={isBeingDuplicated}
                          >
                            <CopyIcon color="#849D29" />
                          </ActionButton>
                          <ActionButton onClick={() => handleQuestionForDelete(qq.question)}>
                            <TrashIcon />
                          </ActionButton>
                        </Actions>
                      </QuestionItem>
                    )
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
      <DeleteModal
        title={`Are you sure you want to delete "${questionForDelete?.name}"?`}
        content={
          <div>
            Deleting this question is permanent and cannot be undone.
            <br /><br />
            <WarningNote>Note:</WarningNote> This question's Results will also be deleted, which will affect learners' average scores.
          </div>
        }
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
    </div>
  );
};



const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 16px;
  gap: 10px;
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

const WarningNote = styled.span`
  color: #d73527;
  font-weight: 500;
`;

const SpinningLoader = styled(FiLoader)`
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default QuestionsList;