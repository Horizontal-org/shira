import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Sidebar,
  styled,
  useAdminSidebar,
  Tab,
  Toggle,
  H2,
  Body1,
  Button,
  RenameIcon,
  CopyUrlIcon,
  DeleteIcon
} from "@shira/ui";
import { QuestionsList } from './QuestionList'
import { FiPlus } from "react-icons/fi";
import { shallow } from "zustand/shallow";
import { useStore } from "../../store";
import { getQuizById } from "../../fetch/quiz";
import { Quiz, QuizSuccessStates, SUCCESS_MESSAGES } from "../../store/slices/quiz";
import { DeleteQuizModal } from "../modals/DeleteQuizModal";
import { RenameQuizModal } from "../modals/RenameQuizModal";
import toast from "react-hot-toast";

interface Props {}

export const QuizViewLayout: FunctionComponent<Props> = () => {

  const navigate = useNavigate();
  const { id } = useParams()
  
  const {
    updateQuiz,
    deleteQuiz,    
    quizActionSuccess,
    cleanQuizActionSuccess
  } = useStore((state) => ({
    updateQuiz: state.updateQuiz,
    deleteQuiz: state.deleteQuiz,
    quizActionSuccess: state.quizActionSuccess,
    cleanQuizActionSuccess: state.cleanQuizActionSuccess
  }), shallow)

  const { isCollapsed, handleCollapse, menuItems } = useAdminSidebar(navigate)
  const [isPublished, setIsPublished] = useState(false);
  const [quiz, handleQuiz] = useState<Quiz | null>(null)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);

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


  const handleCopyUrl = async (hash: string) => {
    try {
      const quizUrl = `${process.env.REACT_APP_PUBLIC_URL}/quiz/${hash}`;
      await navigator.clipboard.writeText(quizUrl);
      
      toast.success('The public quiz link has been copied to your clipboard.', { duration: 3000 })
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  }
  
  return (
    <Container>
      <Sidebar 
        menuItems={menuItems} 
        onCollapse={handleCollapse}      
      />
     
      <MainContent $isCollapsed={isCollapsed}>        
        { quiz ? (
          <>
            <Wrapper>
              <Header>
                <div>
                  <H2>{quiz.title}</H2>
                  <Body1>Manage your quiz here, including adding, removing, and reordering questions</Body1>
                </div>
                <Toggle 
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
                    onClick={() => { handleCopyUrl(quiz.hash) }}
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

            <QuestionsList
              questions={quiz.questions}
              onEdit={(id) => console.log('Edit question', id)}
              onDelete={(id) => console.log('Delete question', id)}
              onAdd={() => console.log('Add new question')}
            />

            {(quiz.questions && quiz.questions.length > 0) && (
              <Footer>
                <Button 
                  text="Cancel"
                  type="outline"
                  onClick={() => {
                    navigate('/dashboard')
                  }}
                />

                <Button 
                  text="Save changes"
                  type="primary"
                  color="#849D29"
                />
              </Footer>                
            )}
            
             <DeleteQuizModal
                quiz={quiz}
                setIsModalOpen={setIsDeleteModalOpen}
                onDelete={(id) => { 
                  deleteQuiz(id) 
                }}
                onCancel={() => {
                  setIsDeleteModalOpen(false)
                }}
                isModalOpen={isDeleteModalOpen}
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
  padding: 24px;
  margin-left: ${props => props.$isCollapsed ? '100px' : '300px'};
  transition: margin-left 0.3s ease;
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-left: 80px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-left: 0;
  }
`;

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