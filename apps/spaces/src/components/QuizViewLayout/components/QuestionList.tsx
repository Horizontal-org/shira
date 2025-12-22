import { FunctionComponent, useState } from "react";
import { FiMenu, FiPlus, FiLoader } from 'react-icons/fi';
import { MdOutlineMenuBook } from "react-icons/md";
import { styled, TrashIcon, EditIcon, Button, defaultTheme } from '@shira/ui'
import { QuestionEmptyState } from "./QuestionEmptyState";
import { DeleteModal } from "../../modals/DeleteModal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { duplicateQuestion } from "../../../fetch/quiz";
import { QuizQuestion } from "../../../store/slices/quiz";
import toast from "react-hot-toast";
import DuplicateIcon from './DuplicateIcon'
import { QuizHasResultsModal } from "../../modals/QuizHasResultsModal";
import { useTranslation } from "react-i18next";

interface QuestionsListProps {
  quizId: number;
  quizQuestions: QuizQuestion[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  onAddLibrary: (quizId: string) => void;

  onReorder: (newOrder: QuizQuestion[]) => void;
  onDuplicate: () => void;
  hasResults: boolean
}

export const QuestionsList: FunctionComponent<QuestionsListProps> = ({
  quizId,
  quizQuestions,
  onEdit,
  onDelete,
  onAdd,
  onAddLibrary,
  onReorder,
  onDuplicate,
  hasResults
}) => {
  console.log("🚀 ~ quizQuestions:", quizQuestions)

  const { t } = useTranslation();
  const [questionForDelete, handleQuestionForDelete] = useState(null)
  const [confirmBeforeContinueModal, handleConfirmBeforeContinueModal] = useState<{
    confirmType: string
    confirmId?: string
  }>(null)

  const [duplicatingQuestions, setDuplicatingQuestions] = useState(new Set())

  const handleDuplicateQuestion = async (questionId: string) => {
    setDuplicatingQuestions(prev => new Set(prev).add(questionId))
    const questionName = quizQuestions.find(qq => qq.question.id === questionId).question.name
    try {
      await duplicateQuestion(quizId, parseInt(questionId))
      toast.success(t('success_messages.question_copied', { question_name: questionName }), { duration: 3000 })
      onDuplicate() // Refresh the quiz data
    } catch (error) {
      toast.error(t('error_messages.duplicate_question_fail'), { duration: 3000 })
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
    return <QuestionEmptyState onAdd={onAdd} onAddLibrary={onAddLibrary} quizId={String(quizId)} />
  }

  return (
    <div>
      <Header>
        <Button
          id="create-question-button"
          leftIcon={<FiPlus size={16} />}
          text={t('questions_tab.create_question_button')}
          type="primary"
          color={defaultTheme.colors.green7}
          onClick={() => {
            if (hasResults) {
              handleConfirmBeforeContinueModal({ confirmType: 'add' })
            } else {
              onAdd()
            }
          }}
        />
        <Button
          id="add-from-library-button"
          leftIcon={<MdOutlineMenuBook size={19} />}
          text={t('questions_tab.add_from_library_button')}
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
                      id={`question-item-${qq.question.id}`}
                      ref={draggableProvided.innerRef}
                      isDragging={snapshot.isDragging}
                      {...draggableProvided.draggableProps}
                    >
                      <LeftSection>
                        <MenuIcon
                          id={`drag-handle-${qq.question.id}`}
                          {...draggableProvided.dragHandleProps}
                        >
                          {isBeingDuplicated ? (
                            <SpinningLoader size={20} color="#666" />
                          ) : (
                            <FiMenu size={20} color="#666" />
                          )}
                        </MenuIcon>
                        <QuestionTitle id={`question-title-${qq.question.id}`}>
                          {isBeingDuplicated ? t('loading_messages.duplicating') : qq.question.name}
                        </QuestionTitle>
                      </LeftSection>
                      <Actions>
                        <ActionButton id={`edit-button-${qq.question.id}`} onClick={() => {
                          if (hasResults) {
                            handleConfirmBeforeContinueModal({ confirmType: 'edit', confirmId: qq.question.id })
                          } else {
                            onEdit(qq.question.id)
                          }
                        }}>
                          <EditIcon />
                        </ActionButton>
                        <ActionButton 
                          id={`duplicate-button-${qq.question.id}`}
                          onClick={() => {
                            if (hasResults) {
                            handleConfirmBeforeContinueModal({ confirmType: 'duplicate', confirmId: qq.question.id })
                          } else {
                            handleDuplicateQuestion(qq.question.id)
                          }
                          }}
                          disabled={isBeingDuplicated}
                        >
                          <DuplicateIconWrapper><DuplicateIcon /></DuplicateIconWrapper>
                        </ActionButton>
                        <ActionButton id={`delete-button-${qq.question.id}`} onClick={() => handleQuestionForDelete(qq.question)}>
                          <TrashIcon />
                        </ActionButton>
                      </Actions>
                    </QuestionItem>
                  )
                }}
              </Draggable>
            ))}
            { provided.placeholder }
          </List>
        )}
        </Droppable>
      </DragDropContext>
      <DeleteModal
        title={t('questions.delete.title', { question_name: questionForDelete?.name })}
        content={
          <div>
            {t('questions.delete.message')}
            <br /><br />
            <WarningNote>{t('questions.delete.note')}</WarningNote>
            {t('questions.delete.warning')}
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

      <QuizHasResultsModal
        title={t('modals.edit_question_confirmation.title')}
        content={
          <div>
            {t('modals.edit_question_confirmation.message')}
          </div>
        }
        setIsModalOpen={() => {
          handleConfirmBeforeContinueModal(null)
        }}
        onContinue={() => { 
          if (confirmBeforeContinueModal.confirmType === 'add') {
            onAdd()
          } else if  (confirmBeforeContinueModal.confirmType === 'edit') {
            onEdit(confirmBeforeContinueModal.confirmId)
          } else if (confirmBeforeContinueModal.confirmType === 'duplicate') {
            handleDuplicateQuestion(confirmBeforeContinueModal.confirmId)
          }
        }}
        onCancel={() => {
          handleConfirmBeforeContinueModal(null)
        }}
        isModalOpen={!!(confirmBeforeContinueModal)}
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

const DuplicateIconWrapper = styled.div`
  > svg {
    height: 20px;
    width: 20px;
  }
`;

export default QuestionsList;