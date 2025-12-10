import { FunctionComponent, useEffect, useMemo, useState } from "react";
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
  BetaBanner,
  Body2Regular
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
import { getQuizResults, PublicQuizResultsResponse } from "../../fetch/results";
import { useTranslation } from "react-i18next";
import { MdLockOutline } from "react-icons/md";

interface Props { }

export const QuizViewLayout: FunctionComponent<Props> = () => {

  const { t } = useTranslation();
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
  console.log("🚀 ~ QuizViewLayout ~ quiz:", quiz)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isUnpublishedQuizModalOpen, setIsUnpublishedQuizModalOpen] = useState(false);
  const { destroy, actionFeedback } = useQuestionCRUD()

  // results handling
  const [resultsData, setResultsData] = useState<PublicQuizResultsResponse | null>(null);
  const [resultsLoading, setResultsLoading] = useState(false);

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
    const fetchResults = async () => {
      setResultsLoading(true);
      try {
        const data = await getQuizResults(quiz.id);
        setResultsData(data);
      } catch (error) {
        console.error('Failed to fetch quiz results:', error);
      } finally {
        setResultsLoading(false);
      }
    }

    if (quiz) {
      fetchResults()
    }
  }, [quiz])
  // fetchResults();

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
    if (t(SUCCESS_MESSAGES[quizActionSuccess])) {
      const message = t(SUCCESS_MESSAGES[quizActionSuccess]);
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

  const hasResults = useMemo(() => {
    return resultsData && resultsData.metrics && !!(resultsData.metrics.completedCount)
  }, [resultsData])

  function getQuizVisibility() {
    const translationKey = `quiz.visibility.${quiz.visibility}`;
    return t(translationKey);
  };

  return (
    <Container>
      <Sidebar
        menuItems={menuItems}
        onCollapse={handleCollapse}
      />

      <MainContent $isCollapsed={isCollapsed}>
        <BetaBanner url="/support" />
        <MainContentWrapper>

          {quiz ? (
            <>
              <Wrapper>
                <ActionHeader>
                  <VisibilityTag>
                    <MdLockOutline size={16} />
                    <Body2Regular>{getQuizVisibility()}</Body2Regular>
                  </VisibilityTag>
                  <Toggle
                    size='big'
                    isEnabled={isPublished}
                    onToggle={() => { handleTogglePublished(quiz.id, !quiz.published) }}
                    rightLabel={t('quiz.publish_toggle.published')}
                    leftLabel={t('quiz.publish_toggle.unpublished')}
                  />
                </ActionHeader>
                <Header>
                  <div>
                    <H2 id="quiz-title">{quiz.title}</H2>
                    <Body1 id="quiz-subtitle">{t('quiz.subtitle')}</Body1>
                  </div>
                </Header>
                <ButtonsContainer>
                  <LeftButtons>
                    <Button
                      id="rename-quiz-button"
                      leftIcon={<RenameIcon />}
                      text={t('quiz.actions.rename')}
                      type="outline"
                      onClick={() => { setIsRenameModalOpen(true) }}
                    />
                    <Button
                      id="copy-link-button"
                      leftIcon={<CopyUrlIcon />}
                      text={t('quiz.actions.copy_link')}
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
                      id="delete-quiz-button"
                      leftIcon={<DeleteIcon />}
                      text={t('buttons.delete')}
                      type="outline"
                      onClick={() => { setIsDeleteModalOpen(true) }}
                    />
                  </LeftButtons>
                </ButtonsContainer>
              </Wrapper>

              <TabContainer
                quizId={quiz.id}
                quizQuestions={quiz.quizQuestions}
                resultsData={resultsData}
                resultsLoading={resultsLoading}
                hasResults={hasResults}
                onEdit={(questionId) => { navigate(`/quiz/${id}/question/${questionId}`) }}
                onDelete={(id) => { destroy(quiz.id, id) }}
                onAdd={() => { navigate(`/quiz/${id}/question`) }}
                onAddLibrary={() => { navigate(`/question/library`, { state: { quizId: quiz.id } }) }}
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
                onDuplicate={() => {
                  getQuiz()
                }}
              />

              <DeleteModal
                title={t('quizzes.actions.delete_modal.title', { quiz_name: quiz.title })}
                content={
                  <div>
                    {t('quizzes.actions.delete_modal.subtitle')}
                    <br /><br />
                    <QuizWarningNote>
                      {t('quizzes.actions.delete_modal.note')}
                    </QuizWarningNote>
                    {t('quizzes.actions.delete_modal.message')}
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
              <H2>{t('loading_message.loading')}</H2>
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

const ActionHeader = styled.div`
  padding: 0px 16px;
  display: flex;
  justify-content: space-between;
`

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

const QuizWarningNote = styled.span`
  color: #d73527;
  font-weight: 500;
`;

const VisibilityTag = styled.span`
  display: flex;
  align-items: center;
  border: 1px solid ${props => props.theme.colors.dark.darkGrey};
  border-radius: 12px;
  padding: 8px 12px;
  gap: 8px;
`;