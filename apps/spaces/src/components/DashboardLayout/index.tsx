import { FunctionComponent, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Sidebar, styled, H2, SubHeading3, Body1, Button, FilterButton, useAdminSidebar, BetaBanner, useTheme } from "@shira/ui";
import { FiPlus } from 'react-icons/fi';
import { shallow } from "zustand/shallow";
import toast from "react-hot-toast";
import { formatDistance } from "date-fns";
import { enUS } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { useStore } from "../../store";
import { QuizSuccessStates, SUCCESS_MESSAGES } from "../../store/slices/quiz";
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

interface Props { }

export const DashboardLayout: FunctionComponent<Props> = () => {

  const {
    fetchQuizzes,
    updateQuiz,
    deleteQuiz,
    createQuiz,
    quizzes,
    space,
    quizActionSuccess,
    cleanQuizActionSuccess
  } = useStore((state) => ({
    fetchQuizzes: state.fetchQuizzes,
    updateQuiz: state.updateQuiz,
    createQuiz: state.createQuiz,
    deleteQuiz: state.deleteQuiz,
    quizzes: state.quizzes,
    space: state.space,
    quizActionSuccess: state.quizActionSuccess,
    cleanQuizActionSuccess: state.cleanQuizActionSuccess
  }), shallow);

  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const { isCollapsed, handleCollapse, menuItems } = useAdminSidebar(navigate);

  const [activeFilter, setActiveFilter] = useState<FilterStates>(FilterStates.all);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState<any>(null);

  const [unpublishedQuizId, setUnpublishedQuizId] = useState<number | null>(null);
  const [unpublishQuizId, setUnpublishQuizId] = useState<number | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUnpublishedQuizCopyLinkModalOpen, setIsUnpublishedQuizCopyLinkModalOpen] = useState(false);
  const [isUnpublishQuizModalOpen, setIsUnpublishQuizModalOpen] = useState(false);

  const {
    title,
    setTitle,
    selectedQuizForDuplicate,
    isSubmitting,
    submittingQuizId,
    isCreateTitleModalOpen,
    isDuplicateTitleModalOpen,
    isVisibilityModalOpen,
    startCreateQuizFlow,
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

  useEffect(() => {
    fetchQuizzes()

    return () => {
      cleanQuizActionSuccess()
    }
  }, [])

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

  function getHasQuestions(card) {
    return Number(card?.questionsCount ?? 0) > 0;
  }

  const applyPublishState = useCallback((quizId: number, nextPublished: boolean, hasQuestions: boolean) => {
    if (nextPublished && !hasQuestions) return;

    updateQuiz(
      { id: quizId, published: nextPublished },
      nextPublished ? "update_published" : "update_unpublished"
    );
  }, [updateQuiz]);

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
    },
    [filteredCards, i18n.language]
  );

  const handleTogglePublished = useCallback((card) => {
    const hasQuestions = getHasQuestions(card);

    if (card.published && hasQuestions) {
      setUnpublishQuizId(card.id);
      setIsUnpublishQuizModalOpen(true);
      return;
    }

    applyPublishState(card.id, !card.published, hasQuestions);
  }, [applyPublishState, getHasQuestions]);

  const handleConfirmCopyLinkModal = useCallback(() => {
    const quiz = cards.find((card) => card.id === unpublishedQuizId);
    if (!quiz) {
      setUnpublishedQuizId(null);
      return;
    }

    const hasQuestions = getHasQuestions(quiz);
    handleCopyUrlAndNotify(quiz.hash, t("success_messages.quiz_link_copied"));
    applyPublishState(quiz.id, true, hasQuestions);

    setUnpublishedQuizId(null);
  }, [cards, unpublishedQuizId, getHasQuestions, t, applyPublishState]);

  const handleCancelCopyLinkModal = useCallback(() => {
    const quiz = cards.find((card) => card.id === unpublishedQuizId);
    if (cards.find((card) => card.id === unpublishedQuizId)) {
      handleCopyUrlAndNotify(quiz.hash, t("success_messages.quiz_link_copied"));
    }
    setUnpublishedQuizId(null);
  }, [cards, unpublishedQuizId, t]);

  const handleConfirmUnpublishModal = useCallback(() => {
    const quiz = cards.find((card) => card.id === unpublishQuizId);
    if (quiz) {
      applyPublishState(quiz.id, false, true);
    }
    setUnpublishQuizId(null);
    setIsUnpublishQuizModalOpen(false);
  }, [cards, unpublishQuizId, applyPublishState]);

  return (
    <Container id="dashboard-layout">
      <Sidebar
        menuItems={menuItems}
        onCollapse={handleCollapse}
        selectedItemLabel={menuItems.find(m => m.path === '/dashboard').label}
      />

      <MainContent $isCollapsed={isCollapsed}>
        <BetaBanner url="https://shira.app/beta-user" />

        <MainContentWrapper>
          <HeaderContainer>
            <StyledSubHeading3 id="space-name">{space && space.name}</StyledSubHeading3>
            <H2 id="dashboard-title">{t('dashboard.title')}</H2>
            <Body1 id="dashboard-subtitle">{t('dashboard.subtitle')}</Body1>
            <ButtonContainer>
              <Button
                id="create-quiz-button"
                type="primary"
                leftIcon={<FiPlus />}
                text={t('dashboard.create_quiz_button')}
                onClick={() => { startCreateQuizFlow(); }}
                color={theme.colors.green7}
              />
            </ButtonContainer>
          </HeaderContainer>

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
          </FilterButtonsContainer >

          <CardGrid id="card-grid">
            {filteredCards.map((card: any) => {
              const hasQuestions = getHasQuestions(card);
              const disablePublishToggle = !hasQuestions && !card.published;

              return (
                <Card
                  id={`quiz-card-${card.id}`}
                  key={card.id}
                  title={card.title}
                  lastModified={getLastUpdateTime(card.latestGlobalUpdate)}
                  isPublished={card.published}
                  publishedText={t('quizzes.filter.published')}
                  unpublishedText={t('quizzes.filter.unpublished')}
                  disablePublishToggle={disablePublishToggle}
                  disabledTooltipLabel={t('quiz.publish_toggle.disabled_tooltip')}
                  onCardClick={() => navigate(`/quiz/${card.id}`)}
                  onEdit={() => navigate(`/quiz/${card.id}`)}
                  onDuplicate={() => startDuplicateQuizFlow(card)}
                  onDelete={() => {
                    setSelectedCard(card);
                    setIsDeleteModalOpen(true);
                  }}
                  onCopyUrl={() => {
                    if (card.published) {
                      handleCopyUrlAndNotify(card.hash, t("success_messages.quiz_link_copied"));
                      return;
                    }
                    setUnpublishedQuizId(card.id);
                    setIsUnpublishedQuizCopyLinkModalOpen(true);
                  }}
                  onTogglePublished={() => handleTogglePublished(card)}
                  showLoading={isSubmitting && submittingQuizId === card.id}
                  loadingLabel={t('loading_messages.duplicating')}
                  isPublic={card.visibility === 'public'}
                  visibilityText={
                    card.visibility === 'public'
                      ? t('quiz.visibility.public')
                      : t('quiz.visibility.private')}
                />
              );
            })}
          </CardGrid>

          <DeleteModal
            title={t('modals.delete_quiz.title', { quiz_name: selectedCard?.title })}
            content={(
              <div>
                {t('modals.delete_quiz.subtitle')}
                <QuizWarningNote>
                  {t('modals.delete_quiz.note')}
                </QuizWarningNote>
                {t('modals.delete_quiz.message')}
              </div>
            )}
            setIsModalOpen={setIsDeleteModalOpen}
            onDelete={() => {
              deleteQuiz(selectedCard?.id);
              setSelectedCard(null);
            }}
            onCancel={() => {
              setIsDeleteModalOpen(false);
              setSelectedCard(null);
            }}
            isModalOpen={isDeleteModalOpen}
          />

          <CreateQuizModal
            isModalOpen={isCreateTitleModalOpen}
            setIsModalOpen={(open) => {
              if (!open) cancelFlow();
            }}
            title={title}
            setTitle={setTitle}
            onCreate={(title) => { handleTitleSubmit(title); }}
            onCancel={cancelFlow}
            keepModalOpen
          />

          <QuizVisibilityModal
            isModalOpen={isVisibilityModalOpen}
            onBack={handleBackFromVisibility}
            onConfirm={handleConfirmVisibility}
            isSubmitting={isSubmitting}
          />

          <UnpublishedQuizCopyLinkModal
            setIsModalOpen={setIsUnpublishedQuizCopyLinkModalOpen}
            isModalOpen={isUnpublishedQuizCopyLinkModalOpen}
            onConfirm={handleConfirmCopyLinkModal}
            onCancel={handleCancelCopyLinkModal}
          />

          <UnpublishQuizWithQuestionsModal
            isModalOpen={isUnpublishQuizModalOpen}
            setIsModalOpen={setIsUnpublishQuizModalOpen}
            onConfirm={handleConfirmUnpublishModal}
            onCancel={() => {
              setUnpublishQuizId(null);
              setIsUnpublishQuizModalOpen(false);
            }}
          />

          <DuplicateQuizModal
            quiz={selectedQuizForDuplicate}
            isModalOpen={isDuplicateTitleModalOpen}
            title={title}
            setTitle={setTitle}
            onDuplicate={(title) => handleTitleSubmit(title)}
            onCancel={cancelFlow}
            isLoading={isSubmitting}
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
  padding: 50px;
`;

const StyledSubHeading3 = styled(SubHeading3)`
  color: ${(props) => props.theme.colors.green7};
`;

const HeaderContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FilterButtonsContainer = styled.div`
  margin-top: 8px;
  padding: 16px;
  display: flex;
  gap: 8px;
`;

const CardGrid = styled.div`
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

   @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const QuizWarningNote = styled.span`
  color: #d73527;
  font-weight: 500;
`;
