import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Sidebar,
  styled,
  useAdminSidebar,
  H2,
  Body1,
  Button,
  RenameIcon,
  CopyUrlIcon,
  DeleteIcon,
  Toggle,
  BetaBanner
} from "@shira/ui";
import { TabContainer } from './components/TabContainer'
import { shallow } from "zustand/shallow";
import { useStore } from "../../store";
import { getQuizById } from "../../fetch/quiz";
import { Quiz, QuizSuccessStates, SUCCESS_MESSAGES } from "../../store/slices/quiz";
import { DeleteModal } from "../modals/DeleteModal";
import { RenameQuizModal } from "../modals/RenameQuizModal";
import toast from "react-hot-toast";
import { useQuestionCRUD } from "../../fetch/question";
import { UnpublishedQuizModal } from "../modals/UnpublishedQuizModal";
import { handleCopyUrl, handleCopyUrlAndNotify } from "../../utils/quiz";


interface Props {}

export const QuizViewLayout: FunctionComponent<Props> = () => {

  const navigate = useNavigate();
  const { id } = useParams()
  
  const {
    updateQuiz,
    deleteQuiz,
    quizActionSuccess,
    cleanQuizActionSuccess,
    reorderQuiz
  } = useStore((state) => ({
    updateQuiz: state.updateQuiz,
    deleteQuiz: state.deleteQuiz,
    reorderQuiz: state.reorderQuiz,
    quizActionSuccess: state.quizActionSuccess,
    cleanQuizActionSuccess: state.cleanQuizActionSuccess,
  }), shallow)

  const { isCollapsed, handleCollapse, menuItems } = useAdminSidebar(navigate)
  const [isPublished, setIsPublished] = useState(false);

  const [quiz, handleQuiz] = useState<Quiz | null>(null)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isUnpublishedQuizModalOpen, setIsUnpublishedQuizModalOpen] = useState(false);
  const { destroy, actionFeedback } = useQuestionCRUD()
  
  const getQuiz = async () => {
    try {
      const parsedId = parseInt(id)      
      const quiz = await getQuizById(parsedId)

      handleQuiz(quiz)
      setIsPublished(quiz.published)
    } catch (err) {
      // if error navigate to dashboard
      navigate('/dashboard')
    }
  }

  useEffect(() => {
    // test date zones
    console.log(
      Date(),
      new Date()
    )
    
    getQuiz()

    return () => {
      cleanQuizActionSuccess()
    }
  }, [])

  useEffect(() => {
    if (SUCCESS_MESSAGES[quizActionSuccess]) {
      const message = SUCCESS_MESSAGES[quizActionSuccess]
      toast.success(message, { duration: 3000 })
  
      if (quizActionSuccess === QuizSuccessStates.delete) {
        navigate('/dashboard')
      } else {
        getQuiz()
      }
  
      cleanQuizActionSuccess()
    }
}, [quizActionSuccess])


  const handleTogglePublished = (cardId: number, published: boolean) => {
    updateQuiz({
      id: cardId,
      published: published
    })

    setIsPublished(published)    
  };


  return (
    <Container>
      <Sidebar 
        menuItems={menuItems}
        onCollapse={handleCollapse}
      />
     
      <MainContent $isCollapsed={isCollapsed}>
        <BetaBanner url="/support"/>
        <MainContentWrapper>

          { quiz ? (
            <>
              <Wrapper>
                <Header>
                  <div>
                    <H2>{quiz.title}</H2>
                    <Body1>Manage your quiz here, including adding, removing, and reordering questions</Body1>
                  </div>
                  <Toggle
                    size='big'
                    isEnabled={isPublished}
                    onToggle={() => { handleTogglePublished(quiz.id, !quiz.published) }}
                    rightLabel="Published"
                    leftLabel="Unpublished"
                  />
                </Header>
                <ButtonsContainer>
                  <LeftButtons>
                    <Button 
                      leftIcon={<RenameIcon />}
                      text="Rename"
                      type="outline"
                      onClick={() => { setIsRenameModalOpen(true) }}
                    />
                    <Button 
                      leftIcon={<CopyUrlIcon />}
                      text="Copy quiz link"
                      type="outline"
                      onClick={() => { 
                        if (quiz.published) {
                          handleCopyUrlAndNotify(quiz.hash)
                        } else {
                          handleCopyUrl(quiz.hash)
                          setIsUnpublishedQuizModalOpen(true)
                        }
                      }}
                    />
                    <Button 
                      leftIcon={<DeleteIcon />}
                      text="Delete"
                      type="outline"
                      onClick={() => { setIsDeleteModalOpen(true) }}
                    />
                  </LeftButtons>                
                </ButtonsContainer>
              </Wrapper>

              <TabContainer
                quizId={quiz.id}
                quizQuestions={quiz.quizQuestions}
                onEdit={(questionId) => { navigate(`/quiz/${id}/question/${questionId}`)}}
                onDelete={(id) => { destroy(quiz.id, id) }}
                onAdd={() => { navigate(`/quiz/${id}/question`) }}
                onAddLibrary={() => { navigate(`/question/library`) }}
                onReorder={(newQQOrder) => {
                  handleQuiz({
                    ...quiz,
                    quizQuestions: newQQOrder
                  })
                  reorderQuiz({
                    quizId: quiz.id,
                    newOrder: newQQOrder.map((qq) => {
                      return {
                        position: qq.position,
                        questionId: parseInt(qq.question.id)
                      }
                    })
                  })
                }}
              />

              <DeleteModal
                  title={`Are you sure you want to delete "${quiz.title}"`}
                  content={
                    <div>
                      Deleting this quiz is permanent and cannot be undone.
                      <br /><br />
                      <QuizWarningNote>Note:</QuizWarningNote> The quiz's Results will also be deleted.
                    </div>
                  }
                  setIsModalOpen={setIsDeleteModalOpen}
                  onDelete={() => { 
                    deleteQuiz(quiz.id) 
                  }}
                  onCancel={() => {
                    setIsDeleteModalOpen(false)
                  }}
                  isModalOpen={isDeleteModalOpen}
                />

                <UnpublishedQuizModal
                  setIsModalOpen={setIsUnpublishedQuizModalOpen}
                  isModalOpen={isUnpublishedQuizModalOpen}
                  onConfirm={() => {
                    handleTogglePublished(quiz.id, true)
                  }}
                />
        
                <RenameQuizModal
                  quiz={quiz}
                  setIsModalOpen={setIsRenameModalOpen}
                  onRename={(title) => { 
                    updateQuiz({
                      id: quiz.id,
                      title
                    }) 
                  }}
                  onCancel={() => {
                    setIsRenameModalOpen(false)
                  }}
                  isModalOpen={isRenameModalOpen}
                />
            </>
          ) : (
            <Header>
              <H2>Loading...</H2>
            </Header>
          )}         
        </MainContentWrapper>
      </MainContent>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  background: ${props => props.theme.colors.light.paleGrey};

  height: auto;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: block;
  }
`;

const MainContent = styled.div<{ $isCollapsed: boolean }>`
  flex: 1;
  margin-left: ${props => props.$isCollapsed ? '116px' : '264px'};
  transition: margin-left 0.3s ease;
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-left: 80px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-left: 0;
  }
`;

const MainContentWrapper = styled.div`
  padding: 24px 40px;
`

const Header = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
`

const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Separator = styled.span`
  color: ${props => props.theme.colors.dark.black};
  font-weight: 500;
`;

const Wrapper = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
`

const LeftButtons = styled.div`
  display: flex;
  gap: 8px;
`
const Footer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  margin: 16px;
`

const QuizWarningNote = styled.span`
  color: #d73527;
  font-weight: 500;
`;