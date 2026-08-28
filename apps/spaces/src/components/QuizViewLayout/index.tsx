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
  Body2Regular,
  defaultTheme,
  Body4,
  GeneralTooltip
} from "@horizontal-org/shira-ui";
import { TabContainer } from './components/TabContainer'
import { shallow } from "zustand/shallow";
import { useStore } from "../../store";
import { getQuizById } from "../../fetch/quiz";
import { Quiz, QuizSuccessStates, SUCCESS_MESSAGES } from "../../store/slices/quiz";
import { DeleteModal } from "../modals/DeleteModal";
import toast from "react-hot-toast";
import { useQuestionCRUD } from "../../fetch/question";
import { UnpublishedQuizCopyLinkModal } from "../modals/UnpublishedQuizModal";
import { UnpublishQuizWithQuestionsModal } from "../modals/UnpublishQuizWithQuestionsModal";
import { handleCopyUrlAndNotify } from "../../utils/quiz";
import { getQuizResults, QuizResultsResponse } from "../../fetch/results";
import { useTranslation } from "react-i18next";
import { MdLockOutline } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { FiCopy, FiUpload } from "react-icons/fi";
import { RenameQuizModal } from "../modals/RenameQuizModal";
import { QuizVisibilityModal } from "../modals/QuizVisibilityModal";
import { DuplicateQuizModal } from "../modals/DuplicateQuizModal";
import { useQuizCreationFlow } from "../../hooks/useQuizCreationFlow";
import { useSub } from "../../hooks/useSub";
import { MobileResponsivenessBanner } from "../MobileResponsivenessBanner";
import { customMenuItems } from "../../utils/customMenuItems";
import { DisplayNameModal } from "../modals/DisplayNameModal";
import { useTemplateSubmission } from "../../hooks/useTemplateSubmission";

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
    validateQuizName,
    reorderQuiz,
    createQuiz,
    fetchQuizzes,
    quizzes,
    space,
  } = useStore((state) => ({
    updateQuiz: state.updateQuiz,
    deleteQuiz: state.deleteQuiz,
    reorderQuiz: state.reorderQuiz,
    quizActionSuccess: state.quizActionSuccess,
    cleanQuizActionSuccess: state.cleanQuizActionSuccess,
    validateQuizName: state.validateQuizName,
    createQuiz: state.createQuiz,
    fetchQuizzes: state.fetchQuizzes,
    quizzes: state.quizzes,
    space: state.space,
  }), shallow)
  console.log("🚀 ~ QuizViewLayout ~ quizzes:", quizzes)

  const { isCollapsed, handleCollapse, menuItems } = useAdminSidebar(
    navigate,
    customMenuItems.map((item) => ({
      ...item,
      label: t(item.label),
    })),
  )
  const [isPublished, setIsPublished] = useState(false);

  const { isSubActive } = useSub()
  const hasReachedLimit = useMemo(() => quizzes.length >= 3, [quizzes.length])
  const [showDuplicateTooltip, setShowDuplicateTooltip] = useState(false)

  const [quiz, handleQuiz] = useState<Quiz | null>(null)
  console.log("🚀 ~ QuizViewLayout ~ quiz:", quiz)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const {
    isDisplayNameModalOpen,
    cancelTemplateSubmission,
    continueTemplateSubmission,
    startTemplateSubmission,
  } = useTemplateSubmission(space?.publicId);

  const [isUnpublishedQuizModalOpen, setIsUnpublishedQuizModalOpen] = useState(false);
  const [isUnpublishQuizModalOpen, setIsUnpublishQuizModalOpen] = useState(false);
  const [showPublishTooltip, setShowPublishTooltip] = useState(false);
  const [showCopyLinkTooltip, setShowCopyLinkTooltip] = useState(false);
  const [showSubmitAsTemplateTooltip, setShowSubmitAsTemplateTooltip] = useState(false);

  const { destroy } = useQuestionCRUD()
  const {
    selectedQuizForDuplicate,
    isSubmitting,
    isDuplicateTitleModalOpen,
    isVisibilityModalOpen,
    startDuplicateQuizFlow,
    moveToVisibilityStep,
    handleBackFromVisibility,
    handleConfirmVisibility,
    cancelFlow
  } = useQuizCreationFlow({
    createQuiz,
    fetchQuizzes,
    t
  });

  // results handling
  const [resultsData, setResultsData] = useState<QuizResultsResponse | null>(null);
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

  useEffect(() => {
    // test date zones
    console.log(
      Date(),
      new Date()
    )

    getQuiz()
    fetchQuizzes()

    return () => {
      cleanQuizActionSuccess()
    }
  }, [id]);

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

  const handleAssessmentModeChange = (quizId: number, assessmentMode: boolean) => {
    updateQuiz({
      id: quizId,
      assessmentMode: assessmentMode
    }, 'update_assessment_mode')

    handleQuiz({
      ...quiz,
      assessmentMode: assessmentMode
    })
  }

  const hasResults = useMemo(() => {
    return resultsData && resultsData.metrics && !!(resultsData.metrics.completedCount)
  }, [resultsData])

  const hasQuestions = useMemo(() => {
    return (quiz?.quizQuestions?.length ?? 0) > 0
  }, [quiz])

  const disablePublishToggle = !hasQuestions && !isPublished;
  const disableCopyLinkButton = quiz?.visibility === 'public' && !hasQuestions;

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
        <MobileResponsivenessBanner />
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
                        if (isPublished && hasQuestions) {
                          setIsUnpublishQuizModalOpen(true);
                          return;
                        }
                        handleTogglePublished(quiz.id, !isPublished)
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
                  <H2 id="quiz-title">{quiz.title}</H2>
                  <Body1 id="quiz-subtitle">{t(`quiz.${quiz.visibility}_subtitle`)}</Body1>
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

                    <GeneralTooltip
                      enabled={!isSubActive && hasReachedLimit}
                      show={showDuplicateTooltip}
                      setShow={setShowDuplicateTooltip}
                      label={t('dashboard.create_limit_reached')}
                    >
                      <Button
                        id="duplicate-quiz-button"
                        leftIcon={<FiCopy size={16} />}
                        text={t('quiz.actions.duplicate')}
                        type="outline"
                        disabled={!isSubActive && hasReachedLimit}
                        onClick={() => {
                          if (quiz) {
                            startDuplicateQuizFlow(quiz);
                          }
                        }}
                      />
                    </GeneralTooltip>

                    {quiz.visibility !== 'private' && (
                      <PublishToggleWrapper
                        $showHelpCursor={disableCopyLinkButton}
                        onMouseEnter={() => {
                          if (disableCopyLinkButton) {
                            setShowCopyLinkTooltip(true)
                          }
                        }}
                        onMouseLeave={() => { setShowCopyLinkTooltip(false) }}
                        onFocus={() => {
                          if (disableCopyLinkButton) {
                            setShowCopyLinkTooltip(true)
                          }
                        }}
                        onBlur={() => { setShowCopyLinkTooltip(false) }}
                        tabIndex={disableCopyLinkButton ? 0 : -1}
                      >
                        <Button
                          id="copy-link-button"
                          leftIcon={<CopyUrlIcon />}
                          text={t('quiz.actions.copy_link')}
                          type="outline"
                          disabled={disableCopyLinkButton}
                          onClick={() => {
                            if (disableCopyLinkButton) { return }
                            if (quiz.published) {
                              handleCopyUrlAndNotify(quiz.hash, t('success_messages.quiz_link_copied'));
                            } else {
                              setIsUnpublishedQuizModalOpen(true)
                            }
                          }}
                        />
                        {disableCopyLinkButton && showCopyLinkTooltip && (
                          <PublishToggleTooltip role="tooltip">
                            <Body4>{t('quiz.actions.copy_link_disabled_tooltip')}</Body4>
                          </PublishToggleTooltip>
                        )}
                      </PublishToggleWrapper>
                    )}

                    <PublishToggleWrapper
                      $showHelpCursor={!hasQuestions}
                      onMouseEnter={() => {
                        if (!hasQuestions) {
                          setShowSubmitAsTemplateTooltip(true)
                        }
                      }}
                      onMouseLeave={() => { setShowSubmitAsTemplateTooltip(false) }}
                      onFocus={() => {
                        if (!hasQuestions) {
                          setShowSubmitAsTemplateTooltip(true)
                        }
                      }}
                      onBlur={() => { setShowSubmitAsTemplateTooltip(false) }}
                      tabIndex={!hasQuestions ? 0 : -1}
                    >
                      <Button
                        id="submit-quiz-as-template-button"
                        leftIcon={<FiUpload size={16} />}
                        text={t('quiz.actions.submit_as_template')}
                        type="outline"
                        disabled={!hasQuestions}
                        onClick={() => {
                          if (!hasQuestions) { return }
                          startTemplateSubmission({
                            path: `/quiz/${id}/submit-template`,
                            state: { quizTitle: quiz.title },
                          });
                        }}
                      />
                      {!hasQuestions && showSubmitAsTemplateTooltip && (
                        <PublishToggleTooltip role="tooltip">
                          <Body4>{t('quiz.actions.submit_as_template_disabled_tooltip')}</Body4>
                        </PublishToggleTooltip>
                      )}
                    </PublishToggleWrapper>

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
                quizAssessmentMode={quiz.assessmentMode}
                hasQuestions={hasQuestions}
                resultsData={resultsData}
                resultsLoading={resultsLoading}
                hasResults={hasResults}
                onEdit={(questionId) => { navigate(`/quiz/${id}/question/${questionId}`) }}
                onPublish={() => handleTogglePublished(quiz.id, true)}
                onAssessmentModeChange={(assessmentMode) => handleAssessmentModeChange(quiz.id, assessmentMode)}
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
                onSubmitAsTemplate={(questionId) => {
                  const question = quiz.quizQuestions.find((item) => item.question.id === questionId)?.question;
                  startTemplateSubmission({
                    path: `/quiz/${id}/question/${questionId}/submit-template`,
                    state: { questionName: question?.name },
                  });
                }}
              />

              <DeleteModal
                title={t('modals.delete_quiz.title', { quiz_name: quiz.title })}
                content={
                  <div>
                    {t('modals.delete_quiz.subtitle')}
                    {hasResults && (
                      <>
                        <br /><br />
                        <QuizWarningLine>
                          <QuizWarningNote>
                            {t('modals.delete_quiz.note')}
                          </QuizWarningNote>
                          {t('modals.delete_quiz.message')}
                        </QuizWarningLine>
                      </>
                    )}
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

              <UnpublishedQuizCopyLinkModal
                setIsModalOpen={setIsUnpublishedQuizModalOpen}
                isModalOpen={isUnpublishedQuizModalOpen}
                onConfirm={() => {
                  handleCopyUrlAndNotify(quiz.hash, t('success_messages.quiz_link_copied'));
                  handleTogglePublished(quiz.id, true);
                  handleCopyUrlAndNotify(quiz.hash, t('success_messages.quiz_link_copied'));
                }}
                onCancel={() => {
                  handleCopyUrlAndNotify(quiz.hash, t('success_messages.quiz_link_copied'));
                }}
              />

              <UnpublishQuizWithQuestionsModal
                isModalOpen={isUnpublishQuizModalOpen}
                setIsModalOpen={setIsUnpublishQuizModalOpen}
                onConfirm={() => {
                  handleTogglePublished(quiz.id, false);
                }}
              />

              <RenameQuizModal
                quiz={quiz}
                setIsModalOpen={setIsRenameModalOpen}
                validateQuizName={validateQuizName}
                onRename={(newTitle) => {
                  updateQuiz({
                    id: quiz.id,
                    title: newTitle,
                  });
                }}
                onCancel={() => {
                  setIsRenameModalOpen(false)
                }}
                isModalOpen={isRenameModalOpen}
              />

              <DuplicateQuizModal
                quiz={selectedQuizForDuplicate}
                isModalOpen={isDuplicateTitleModalOpen}
                validateQuizName={validateQuizName}
                onDuplicate={moveToVisibilityStep}
                onCancel={() => {
                  cancelFlow();
                }}
                isLoading={isSubmitting}
              />

              <QuizVisibilityModal
                isModalOpen={isVisibilityModalOpen}
                onBack={() => { handleBackFromVisibility(); }}
                onConfirm={handleConfirmVisibility}
                isSubmitting={isSubmitting}
                privateForbidden={!isSubActive}
              />

              <DisplayNameModal
                isOpen={isDisplayNameModalOpen}
                onCancel={cancelTemplateSubmission}
                onSave={continueTemplateSubmission}
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
  margin-inline-start: ${props => props.$isCollapsed ? '116px' : '264px'};
  transition: margin-inline-start 0.3s ease;
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-inline-start: 80px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-inline-start: 0;
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
  color: ${(props) => props.theme.colors.error7};
  font-weight: 500;
`;

const QuizWarningLine = styled.span`
  display: inline;
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
  inset-inline-start: 50%;
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
