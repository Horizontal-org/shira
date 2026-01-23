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
  Body2Regular,
  defaultTheme,
  Body4
} from "@shira/ui";
import { TabContainer } from './components/TabContainer'
import { shallow } from "zustand/shallow";
import { useStore } from "../../store";
import { getQuizById } from "../../fetch/quiz";
import { Quiz, QuizSuccessStates, SUCCESS_MESSAGES } from "../../store/slices/quiz";
import { DeleteModal } from "../modals/DeleteModal";
import toast from "react-hot-toast";
import { useQuestionCRUD } from "../../fetch/question";
import { UnpublishedQuizModal } from "../modals/UnpublishedQuizModal";
import { handleCopyUrl, handleCopyUrlAndNotify } from "../../utils/quiz";
import { getQuizResults, PublicQuizResultsResponse } from "../../fetch/results";
import { useTranslation } from "react-i18next";
import { MdLockOutline } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { FiCopy } from "react-icons/fi";
import { RenameQuizModal } from "../modals/RenameQuizModal";
import { QuizVisibilityModal } from "../modals/QuizVisibilityModal";
import { DuplicateQuizModal } from "../modals/DuplicateQuizModal";
import { useQuizCreationFlow } from "../../hooks/useQuizCreationFlow";

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
    reorderQuiz,
    createQuiz,
    fetchQuizzes
  } = useStore((state) => ({
    updateQuiz: state.updateQuiz,
    deleteQuiz: state.deleteQuiz,
    reorderQuiz: state.reorderQuiz,
    quizActionSuccess: state.quizActionSuccess,
    cleanQuizActionSuccess: state.cleanQuizActionSuccess,
    createQuiz: state.createQuiz,
    fetchQuizzes: state.fetchQuizzes,
  }), shallow)

  const { isCollapsed, handleCollapse, menuItems } = useAdminSidebar(navigate)
  const [isPublished, setIsPublished] = useState(false);

  const [quiz, handleQuiz] = useState<Quiz | null>(null)
  console.log("🚀 ~ QuizViewLayout ~ quiz:", quiz)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isUnpublishedQuizModalOpen, setIsUnpublishedQuizModalOpen] = useState(false);
  const [showPublishTooltip, setShowPublishTooltip] = useState(false);

  const { destroy } = useQuestionCRUD()
  const {
    title,
    setTitle,
    selectedQuizForDuplicate,
    isSubmitting,
    isDuplicateTitleModalOpen,
    isVisibilityModalOpen,
    startDuplicateQuizFlow,
    handleTitleSubmit,
    handleBackFromVisibility,
    handleConfirmVisibility,
    cancelFlow
  } = useQuizCreationFlow({
    createQuiz,
    fetchQuizzes,
    t
  });

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
  };

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
  }, []);

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
  }, [quizActionSuccess]);

  const handleTogglePublished = (cardId: number, published: boolean) => {
    updateQuiz({
      id: cardId,
      published: published
    }, published ? 'update_published' : 'update_unpublished')

    setIsPublished(published)
  };

  const hasResults = useMemo(() => {
    return resultsData && resultsData.metrics && !!(resultsData.metrics.completedCount)
  }, [resultsData])

  const hasQuestions = useMemo(() => {
    return (quiz?.quizQuestions?.length ?? 0) > 0
  }, [quiz])

  const disablePublishToggle = !hasQuestions && !isPublished;

  function getQuizVisibility() {
    const translationKey = `quiz.visibility.${quiz.visibility}`;
    return t(translationKey);
  };

  return (
    <Container>
      <Sidebar
        menuItems={menuItems}
        onCollapse={handleCollapse}
        selectedItemLabel={menuItems.find(m => m.path === '/dashboard').label}
      />

      <MainContent $isCollapsed={isCollapsed}>
        <BetaBanner url="https://shira.app/beta-user" />
        <MainContentWrapper>

          {quiz ? (
            <>
              <Wrapper>
                <ActionHeader>
                  <VisibilityTag>
                    {quiz.visibility && quiz.visibility === 'private' && (
                      <MdLockOutline size={16} color={defaultTheme.colors.dark.darkGrey} />
                    )}
                    {quiz.visibility && quiz.visibility === 'public' && (
                      <TbWorld size={16} color={defaultTheme.colors.dark.darkGrey} />
                    )}
                    <Body2Regular>{getQuizVisibility()}</Body2Regular>
                  </VisibilityTag>

                  <PublishToggleWrapper
                    $showHelpCursor={disablePublishToggle}
                    onMouseEnter={() => {
                      if (disablePublishToggle) {
                        setShowPublishTooltip(true)
                      }
                    }}
                    onMouseLeave={() => { setShowPublishTooltip(false) }}
                    onFocus={() => {
                      if (disablePublishToggle) {
                        setShowPublishTooltip(true)
                      }
                    }}
                    onBlur={() => { setShowPublishTooltip(false) }}
                    tabIndex={disablePublishToggle ? 0 : -1}
                  >
                    <Toggle
                      size='big'
                      isEnabled={isPublished}
                      onToggle={() => {
                        if (disablePublishToggle) { return }
                        handleTogglePublished(quiz.id, !quiz.published)
                      }}
                      rightLabel={t('quiz.publish_toggle.published')}
                      leftLabel={t('quiz.publish_toggle.unpublished')}
                      disabled={disablePublishToggle}
                    />
                    {disablePublishToggle && showPublishTooltip && (
                      <PublishToggleTooltip role="tooltip">
                        <Body4>{t('quiz.publish_toggle.disabled_tooltip')}</Body4>
                      </PublishToggleTooltip>
                    )}
                  </PublishToggleWrapper>

                </ActionHeader>
                <Header>
                  <div>
                    <H2 id="quiz-title">{quiz.title}</H2>
                    <Body1 id="quiz-subtitle">{t(`quiz.${quiz.visibility}_subtitle`)}</Body1>
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
                      id="duplicate-quiz-button"
                      leftIcon={<FiCopy size={16} />}
                      text={t('quiz.actions.duplicate')}
                      type="outline"
                      onClick={() => {
                        if (quiz) {
                          startDuplicateQuizFlow(quiz);
                        }
                      }}
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
                quizTitle={quiz.title}
                quizQuestions={quiz.quizQuestions}
                quizVisibility={quiz.visibility}
                quizPublished={quiz.published}
                resultsData={resultsData}
                resultsLoading={resultsLoading}
                hasResults={hasResults}
                onEdit={(questionId) => { navigate(`/quiz/${id}/question/${questionId}`) }}
                onPublish={() => handleTogglePublished(quiz.id, true)}
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
                title={t('modals.delete_quiz.title', { quiz_name: quiz.title })}
                content={
                  <div>
                    {t('modals.delete_quiz.subtitle')}
                    <br /><br />
                    <QuizWarningNote>
                      {t('modals.delete_quiz.note')}
                    </QuizWarningNote>
                    {t('modals.delete_quiz.message')}
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

              <DuplicateQuizModal
                quiz={selectedQuizForDuplicate}
                isModalOpen={isDuplicateTitleModalOpen}
                title={title}
                setTitle={setTitle}
                onDuplicate={(newTitle) => { handleTitleSubmit(newTitle); }}
                onCancel={() => { cancelFlow(); }}
                isLoading={isSubmitting}
              />

              <QuizVisibilityModal
                isModalOpen={isVisibilityModalOpen}
                onBack={() => { handleBackFromVisibility(); }}
                onConfirm={handleConfirmVisibility}
                isSubmitting={isSubmitting}
              />
            </>
          ) : (
            <Header>
              <H2>{t('loading_messages.loading')}</H2>
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
`;

const Header = styled.div`
  padding: 16px;
  gap: 12px;
  display: grid;
  justify-content: space-between;
`;

const ActionHeader = styled.div`
  padding: 0px 16px;
  display: flex;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
`;

const LeftButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const QuizWarningNote = styled.span`
  color: #d73527;
  font-weight: 500;
`;

const PublishToggleWrapper = styled.div<{ $showHelpCursor: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;

  ${props => props.$showHelpCursor && `
    cursor: help;

    button:disabled {
      cursor: help !important;
    }
  `}
`;

const PublishToggleTooltip = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 6px;
  padding: 4px 8px;
  background-color: ${(props) => props.theme.colors.dark.black};
  color: ${(props) => props.theme.colors.light.white};
  border-radius: 10px;
  width: max-content;
  max-width: 520px;
  white-space: nowrap;
  z-index: 1000;
`;

const VisibilityTag = styled.span`
  display: flex;
  align-items: center;
  border: 1px solid ${props => props.theme.colors.dark.darkGrey};
  border-radius: 12px;
  padding: 8px 12px;
  gap: 8px;
`;
