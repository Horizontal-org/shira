import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Sidebar, styled, H2, SubHeading3, Body1, EmptyState, FilterButton, useAdminSidebar, DashboardCard } from "@horizontal-org/shira-ui";
import { shallow } from "zustand/shallow";
import { useStore } from "../../store";
import { formatDistance } from "date-fns";
import { enUS } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { QuizSuccessStates, SUCCESS_MESSAGES } from "../../store/slices/quiz";
import toast from "react-hot-toast";
import { FilterStates } from "./constants";
import { DeleteModal } from "../modals/DeleteModal";
import { CreateQuizModal } from "../modals/CreateQuizModal";
import { UnpublishedQuizCopyLinkModal } from "../modals/UnpublishedQuizModal";
import { UnpublishQuizWithQuestionsModal } from "../modals/UnpublishQuizWithQuestionsModal";
import { DuplicateQuizModal } from "../modals/DuplicateQuizModal";
import { QuizVisibilityModal } from "../modals/QuizVisibilityModal";
import { handleCopyUrlAndNotify } from "../../utils/quiz";
import { getCurrentDateFNSLocales } from "../../language/dateUtils";
import { useQuizCreationFlow } from "../../hooks/useQuizCreationFlow";
import { CreateQuizButton } from "./components/CreateQuizButton";
import { useSub } from "../../hooks/useSub";
import { usePublicLibrary } from "../../hooks/usePublicLibrary";
import { CheckoutSuccessModal } from "../modals/CheckoutSuccessModal";
import { QuizLimitModal } from "../modals/QuizLimitModal";
import { ViewPlansModal } from "../modals/ViewPlansModal";
import { FirstLoginModal } from "../modals/FirstLoginModal";
import { MobileResponsivenessBanner } from "../MobileResponsivenessBanner";
import { UseAQuizTemplateButton } from "../QuizLibraryListLayout/components/UseAQuizTemplateButton";
import { AddQuizFromTemplateModal } from "../modals/AddQuizFromTemplateModal";
import { LibraryQuizDto, type LibraryQuizQuestionTemplateDto } from "../../fetch/quiz_templates";
import { customMenuItems } from "../../utils/customMenuItems";
import { DisplayNameModal } from "../modals/DisplayNameModal";
import { useTemplateSubmission } from "../../hooks/useTemplateSubmission";

interface Props { }

interface DashboardLocationState {
  fromLogin?: boolean;
  addQuizFromTemplate?: {
    quiz: LibraryQuizDto;
    questions?: LibraryQuizQuestionTemplateDto[];
  };
}

const FIRST_LOGIN_MODAL_MS = 5 * 60 * 1000; // 5 minutes

export const DashboardLayout: FunctionComponent<Props> = () => {

  const {
    fetchQuizzes,
    updateQuiz,
    deleteQuiz,
    validateQuizName,
    createQuiz,
    quizzes,
    space,
    user,
    subscription,
    quizActionSuccess,
    cleanQuizActionSuccess,
    cleanQuizzes
  } = useStore((state) => ({
    fetchQuizzes: state.fetchQuizzes,
    updateQuiz: state.updateQuiz,
    validateQuizName: state.validateQuizName,
    createQuiz: state.createQuiz,
    deleteQuiz: state.deleteQuiz,
    quizzes: state.quizzes,
    space: state.space,
    user: state.user,
    subscription: state.subscription,
    quizActionSuccess: state.quizActionSuccess,
    cleanQuizActionSuccess: state.cleanQuizActionSuccess,

    cleanQuizzes: state.cleanQuizzes
  }), shallow)

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation() as { pathname: string; state?: DashboardLocationState };

  const [searchParams, setSearchParams] = useSearchParams();
  const {
    isCollapsed,
    handleCollapse,
    menuItems
  } =
    useAdminSidebar(navigate, customMenuItems.map(item => ({
      ...item,
      label: t(item.label)
    })));

  const { isSubActive, isSelfHosted } = useSub()
  const { isPublicLibraryEnabled } = usePublicLibrary()

  const [activeFilter, setActiveFilter] = useState<FilterStates>(FilterStates.all);
  const [cards, setCards] = useState([]);
  const [selectedCard, handleSelectedCard] = useState(null)
  const [unpublishedQuizId, setUnpublishedQuizId] = useState<number | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const {
    isDisplayNameModalOpen,
    cancelTemplateSubmission,
    continueTemplateSubmission,
    startTemplateSubmission,
  } = useTemplateSubmission(space?.publicId);
  const [isUnpublishedQuizCopyLinkModalOpen, setIsUnpublishedQuizCopyLinkModalOpen] = useState(false);
  const [isUnpublishQuizModalOpen, setIsUnpublishQuizModalOpen] = useState(false);
  const [isCheckoutSuccessModalOpen, setIsCheckoutSuccessModalOpen] = useState(
    searchParams.get("checkout") === "success"
  );
  const [isQuizLimitModalOpen, setIsQuizLimitModalOpen] = useState(false);
  const [isViewPlansModalOpen, setIsViewPlansModalOpen] = useState(false);
  const [isFirstLoginModalOpen, setIsFirstLoginModalOpen] = useState(false);

  const {
    selectedQuizForDuplicate,
    selectedTemplateQuiz,
    templateTitleError,
    isSubmitting,
    submittingQuizId,
    isCreateTitleModalOpen,
    isDuplicateTitleModalOpen,
    isTemplateTitleModalOpen,
    isVisibilityModalOpen,
    startCreateQuizFlow,
    startDuplicateQuizFlow,
    startTemplateQuizFlow,
    moveToVisibilityStep,
    handleBackFromVisibility,
    handleConfirmVisibility,
    cancelFlow,
    clearTemplateTitleError,
  } = useQuizCreationFlow({
    createQuiz,
    fetchQuizzes,
    t
  });

  useEffect(() => {
    fetchQuizzes()

    return () => {
      cleanQuizActionSuccess();
      cleanQuizzes();
    }
  }, []);

  useEffect(() => {
    setCards(quizzes)
  }, [quizzes]);

  useEffect(() => {
    if (t(SUCCESS_MESSAGES[quizActionSuccess])) {
      const message = t(SUCCESS_MESSAGES[quizActionSuccess]);
      toast.success(message, { duration: 3000 })

      if (quizActionSuccess !== QuizSuccessStates.delete) {
        fetchQuizzes()
      }

      cleanQuizActionSuccess()
    }
  }, [quizActionSuccess]);

  useEffect(() => {
    setIsCheckoutSuccessModalOpen(searchParams.get("checkout") === "success");
  }, [searchParams]);

  const isRecentlyCreated = Date.now() - new Date(user.createdAt).getTime() <= FIRST_LOGIN_MODAL_MS;
  const isFromLogin = Boolean(location.state?.fromLogin);

  useEffect(() => {
    setIsFirstLoginModalOpen(
      Boolean(
        isFromLogin &&
        isRecentlyCreated &&
        !isSelfHosted &&
        searchParams.get("checkout") !== "success"
      )
    );
  }, [isFromLogin, isRecentlyCreated, isSelfHosted, searchParams]);

  useEffect(() => {
    const templateSelection = location.state?.addQuizFromTemplate;
    const templateQuiz = templateSelection?.quiz;

    if (!templateQuiz) {
      return;
    }

    startTemplateQuizFlow(templateQuiz, templateSelection?.questions);

    const nextState = { ...(location.state || {}) };
    delete nextState.addQuizFromTemplate;

    navigate(location.pathname, {
      replace: true,
      state: nextState,
    });
  }, [location.pathname, location.state, navigate]);

  const closeCheckoutSuccessModal = () => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete("checkout");
    setSearchParams(nextSearchParams, { replace: true });
    setIsCheckoutSuccessModalOpen(false);
  };

  const openViewPlansFromLimitModal = () => {
    setIsQuizLimitModalOpen(false);
    setIsViewPlansModalOpen(true);
  };

  const closeFirstLoginModal = () => {
    setIsFirstLoginModalOpen(false);
  };

  const openViewPlansFromFirstLoginModal = () => {
    closeFirstLoginModal();
    setIsViewPlansModalOpen(true);
  };

  const planName = subscription?.type
    ? t(`modals.first_login.plan_names.${subscription.type.toLowerCase().trim()}`)
    : t("modals.first_login.plan_names.starter");

  const applyPublishState = (cardId: number, published: boolean) => {
    updateQuiz({
      id: cardId,
      published
    }, published ? 'update_published' : 'update_unpublished');

    setCards(currentCards =>
      currentCards.map(card =>
        card.id === cardId
          ? { ...card, published: !card.published }
          : card
      )
    );
  };

  const togglePublished = (card: any) => {
    const hasQuestions = card.questionsCount;
    const isPublished = card.published;
    const shouldPublish = !isPublished;

    // don't publish empty quizzes
    if (shouldPublish && !hasQuestions) return;

    // confirm before unpublishing quizzes with questions
    if (!shouldPublish && hasQuestions) {
      setUnpublishedQuizId(card.id);
      setIsUnpublishQuizModalOpen(true);
      return;
    }

    applyPublishState(card.id, shouldPublish);
  };

  const filteredCards = cards.filter((card) => {
    switch (activeFilter) {
      case FilterStates.published:
        return card.published;
      case FilterStates.unpublished:
        return !card.published;
      case FilterStates.all:
      default:
        return true;
    }
  });

  const hasQuizzes = cards.length > 0;

  const getLastUpdateTime = useCallback(
    (lastUpdate: string) => {
      const parsedLastUpdate = new Date(lastUpdate.replace(" ", "T") + "Z");

      const locales = getCurrentDateFNSLocales()
      const locale = locales[i18n.language] ?? enUS;

      const time = formatDistance(parsedLastUpdate, new Date(), {
        addSuffix: true,
        locale,
      });

      return t('quizzes.last_modified', { date: time });
    }, [filteredCards, i18n.language]);

  return (
    <Container id="dashboard-layout">
      <Sidebar
        menuItems={menuItems}
        onCollapse={handleCollapse}
        selectedItemLabel={menuItems.find(m => m.path === '/dashboard').label}
      />

      <MainContent $isCollapsed={isCollapsed}>
        <MobileResponsivenessBanner />
        <MainContentWrapper>
          <HeaderContainer>
            <StyledSubHeading3 id="space-name">{space && space.name}</StyledSubHeading3>
            <H2 id="dashboard-title">{t('dashboard.title')}</H2>
            <Body1 id="dashboard-subtitle">{t('dashboard.subtitle')}</Body1>

            <HeaderActions>
              <CreateQuizButton
                isSubActive={isSubActive}
                quizCount={quizzes ? quizzes.length : 0}
                startCreateQuizFlow={startCreateQuizFlow}
                onLimitReached={() => setIsQuizLimitModalOpen(true)}
              />

              <UseAQuizTemplateButton
                isSubActive={isSubActive}
                quizCount={quizzes ? quizzes.length : 0}
                disabled={!isPublicLibraryEnabled}
                onLimitReached={() => setIsQuizLimitModalOpen(true)}
              />
            </HeaderActions>
          </HeaderContainer>

          {hasQuizzes ? (
            <>
              <FilterButtonsContainer>
                <FilterButton
                  id="filter-all-quizzes"
                  text={t('quizzes.filter.all_quizzes')}
                  handleFilter={() => setActiveFilter(FilterStates.all)}
                  isActive={activeFilter === FilterStates.all}
                />

                <FilterButton
                  id="filter-published-quizzes"
                  text={t('quizzes.filter.published')}
                  handleFilter={() => setActiveFilter(FilterStates.published)}
                  isActive={activeFilter === FilterStates.published}
                />

                <FilterButton
                  id="filter-unpublished-quizzes"
                  text={t('quizzes.filter.unpublished')}
                  handleFilter={() => setActiveFilter(FilterStates.unpublished)}
                  isActive={activeFilter === FilterStates.unpublished}
                />
              </FilterButtonsContainer>

              <CardGrid id="card-grid">
                {filteredCards.map((card) => {
                  const isPublished = card.published;

                  return (
                    <DashboardCard
                      id={`quiz-card-${card.id}`}
                      title={card.title}
                      publishedText={t('quizzes.filter.published')}
                      unpublishedText={t('quizzes.filter.unpublished')}
                      lastModified={getLastUpdateTime(card.latestGlobalUpdate)}
                      isPublished={isPublished}
                      disablePublishToggle={!card.questionsCount && !isPublished}
                      disabledTooltipLabel={t('quiz.publish_toggle.disabled_tooltip')}
                      visibilityText={
                        card.visibility === 'public'
                          ? t('quiz.visibility.public')
                          : t('quiz.visibility.private')}
                      isPublic={card.visibility === 'public'}
                      onClick={() => {
                        navigate(`/quiz/${card.id}`)
                      }}
                      key={card.id}
                      onCopyUrl={() => {
                        handleCopyUrlAndNotify(card.hash, t('success_messages.quiz_link_copied'));
                        if (!isPublished) {
                          setUnpublishedQuizId(card.id);
                          setIsUnpublishedQuizCopyLinkModalOpen(true);
                        }
                      }}
                      onTogglePublished={() => { togglePublished(card) }}
                      onEdit={() => {
                        navigate(`/quiz/${card.id}`)
                      }}
                      onDuplicate={() => {
                        startDuplicateQuizFlow(card);
                      }}
                      onSubmitAsTemplate={() => {
                        startTemplateSubmission({
                          path: `/quiz/${card.id}/submit-template`,
                          state: { quizTitle: card.title },
                        });
                      }}
                      onDelete={() => {
                        handleSelectedCard(card)
                        setIsDeleteModalOpen(true)
                      }}
                      showLoading={isSubmitting && submittingQuizId === card.id}
                      loadingLabel={t('loading_messages.duplicating')}
                      canDuplicate={isSubActive || quizzes.length < 3}
                    />
                  );
                })}
              </CardGrid>
            </>
          ) : (
            <DashboardEmptyState>
              <EmptyState subtitle={t('dashboard.empty_state')} />
            </DashboardEmptyState>
          )}

          <DeleteModal
            title={t('modals.delete_quiz.title', { quiz_name: selectedCard?.title })}
            content={(
              <div>
                {t('modals.delete_quiz.subtitle')}
                {selectedCard?.hasResults && (
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
            )}
            setIsModalOpen={setIsDeleteModalOpen}
            onDelete={() => {
              setIsDeleteModalOpen(false);
              deleteQuiz(selectedCard?.id)
              handleSelectedCard(null);
            }}
            onCancel={() => {
              setIsDeleteModalOpen(false);
              handleSelectedCard(null);
            }}
            isModalOpen={isDeleteModalOpen}
          />

          <CreateQuizModal
            isModalOpen={isCreateTitleModalOpen}
            setIsModalOpen={(open) => {
              if (!open) {
                cancelFlow();
              }
            }}
            validateQuizName={validateQuizName}
            onCreate={moveToVisibilityStep}
            onCancel={() => {
              cancelFlow();
            }}
            keepModalOpen
          />

          <QuizVisibilityModal
            isModalOpen={isVisibilityModalOpen}
            onBack={handleBackFromVisibility}
            onConfirm={handleConfirmVisibility}
            isSubmitting={isSubmitting}
            privateForbidden={!isSubActive}
          />

          <UnpublishedQuizCopyLinkModal
            setIsModalOpen={setIsUnpublishedQuizCopyLinkModalOpen}
            isModalOpen={isUnpublishedQuizCopyLinkModalOpen}
            onConfirm={() => {
              if (unpublishedQuizId == null) return;
              applyPublishState(unpublishedQuizId, true);
              setUnpublishedQuizId(null);
            }}
            onCancel={() => setUnpublishedQuizId(null)}
          />

          <UnpublishQuizWithQuestionsModal
            isModalOpen={isUnpublishQuizModalOpen}
            setIsModalOpen={setIsUnpublishQuizModalOpen}
            onConfirm={() => {
              if (unpublishedQuizId) {
                applyPublishState(unpublishedQuizId, false);
              }
              setIsUnpublishQuizModalOpen(false);
              setUnpublishedQuizId(null);
            }}
            onCancel={() => {
              setIsUnpublishQuizModalOpen(false);
              setUnpublishedQuizId(null);
            }}
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

          <AddQuizFromTemplateModal
            quiz={selectedTemplateQuiz}
            isModalOpen={isTemplateTitleModalOpen}
            onClose={cancelFlow}
            onConfirm={moveToVisibilityStep}
            validateQuizName={validateQuizName}
            isSubmitting={isSubmitting}
            submitError={templateTitleError}
            onSubmitErrorClear={clearTemplateTitleError}
          />

          <CheckoutSuccessModal
            isModalOpen={isCheckoutSuccessModalOpen}
            onClose={closeCheckoutSuccessModal}
          />

          <DisplayNameModal
            isOpen={isDisplayNameModalOpen}
            onCancel={cancelTemplateSubmission}
            onSave={continueTemplateSubmission}
          />

          <FirstLoginModal
            isModalOpen={isFirstLoginModalOpen}
            onClose={closeFirstLoginModal}
            onViewPlans={openViewPlansFromFirstLoginModal}
            planName={planName}
          />

          <QuizLimitModal
            isModalOpen={isQuizLimitModalOpen}
            onClose={() => setIsQuizLimitModalOpen(false)}
            onViewPlans={openViewPlansFromLimitModal}
          />

          <ViewPlansModal
            isModalOpen={isViewPlansModalOpen}
            onClose={() => setIsViewPlansModalOpen(false)}
            organizationId={subscription.organizationId}
          />

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

  @media(max-width: ${props => props.theme.breakpoints.sm}) {
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
  padding: 50px;
`;

const StyledSubHeading3 = styled(SubHeading3)`
  color: ${props => props.theme.colors.green7};
`;

const HeaderContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const FilterButtonsContainer = styled.div`
  margin-top: 2px;
  padding: 16px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const CardGrid = styled.div`
  padding: 16px;
  display: grid;
  gap: 20px;
  justify-content: start;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 320px));

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr));
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const DashboardEmptyState = styled.div`
  min-height: 400px;
`;

const QuizWarningNote = styled.span`
  color: ${(props) => props.theme.colors.error7};
  font-weight: 500;
`;

const QuizWarningLine = styled.span`
  display: inline;
`;
