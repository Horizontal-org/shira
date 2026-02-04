import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Sidebar, styled, H2, SubHeading3, Body1, Button, FilterButton, useAdminSidebar, BetaBanner, useTheme } from "@shira/ui";
import { FiPlus } from 'react-icons/fi';
import { shallow } from "zustand/shallow";

import { useStore } from "../../store";
import { formatDistance } from "date-fns";
import { enUS } from "date-fns/locale";
import { QuizSuccessStates, SUCCESS_MESSAGES } from "../../store/slices/quiz";
import toast from "react-hot-toast";
import { FilterStates } from "./constants";
import { DeleteModal } from "../modals/DeleteModal";
import { CreateQuizModal } from "../modals/CreateQuizModal";
import { UnpublishedQuizCopyLinkModal } from "../modals/UnpublishedQuizModal";
import { UnpublishQuizWithQuestionsModal } from "../modals/UnpublishQuizWithQuestionsModal";
import { DuplicateQuizModal } from "../modals/DuplicateQuizModal";
import { handleCopyUrlAndNotify } from "../../utils/quiz";
import { useTranslation } from "react-i18next";
import { getCurrentDateFNSLocales } from "../../language/dateUtils";
import { QuizVisibilityModal } from "../modals/QuizVisibilityModal";
import { useQuizCreationFlow } from "../../hooks/useQuizCreationFlow";
import { getQuizById } from "../../fetch/quiz";

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
  }), shallow)

  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const { isCollapsed, handleCollapse, menuItems } = useAdminSidebar(navigate)

  const [activeFilter, setActiveFilter] = useState<FilterStates>(FilterStates.all);
  const [cards, setCards] = useState([]);
  const [selectedCard, handleSelectedCard] = useState(null)
  const [quizHasQuestions, setQuizHasQuestions] = useState<Record<number, boolean>>({})

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [unpublishedQuizId, handleUnpublishedQuizId] = useState<number | null>(null);
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
    let isActive = true;

    const fetchQuizQuestions = async () => {
      const unpublishedCards = cards.filter((card) => !card.published);

      if (!unpublishedCards.length) {
        if (isActive) {
          setQuizHasQuestions({})
        }
        return;
      }

      await Promise.all(
        unpublishedCards.map(async (card) => {
          try {
            const quiz = await getQuizById(card.id);
            const hasQuestions = (quiz?.quizQuestions?.length ?? 0) > 0;
            if (isActive) {
              setQuizHasQuestions((prev) => (
                prev[card.id] === hasQuestions ? prev : { ...prev, [card.id]: hasQuestions }
              ));
            }
          } catch (error) {
            if (isActive) {
              setQuizHasQuestions((prev) => (
                prev[card.id] !== undefined ? prev : { ...prev, [card.id]: true }
              ));
            }
          }
        })
      );
    };

    if (cards.length) {
      fetchQuizQuestions();
    } else {
      setQuizHasQuestions({})
    };

    return () => {
      isActive = false;
    };
  }, [cards]);

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

  const applyPublishState = (cardId: number, published: boolean) => {
    updateQuiz({
      id: cardId,
      published
    }, published ? 'update_published' : 'update_unpublished');

    setCards(currentCards =>
      currentCards.map(card =>
        card.id === cardId
          ? { ...card, published }
          : card
      )
    );
  };

  const handleTogglePublished = async (
    cardId: number,
    shouldBePublished: boolean
  ) => {
    const fetchHasQuestions = async (fallbackOnError: boolean) => {
      try {
        const quiz = await getQuizById(cardId);
        return (quiz?.quizQuestions?.length ?? 0) > 0;
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
        return fallbackOnError;
      }
    };

    if (shouldBePublished) {
      const hasQuestions = await fetchHasQuestions(false);
      setQuizHasQuestions(prev => ({ ...prev, [cardId]: hasQuestions }));
      if (!hasQuestions) return;
    }

    if (!shouldBePublished) {
      const hasQuestions = await fetchHasQuestions(false);
      if (hasQuestions) {
        handleUnpublishedQuizId(cardId);
        setIsUnpublishQuizModalOpen(true);
        return;
      }
    }

    applyPublishState(cardId, shouldBePublished);
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
            {filteredCards.map((card) => {
              const hasQuestions = quizHasQuestions[card.id];
              const disablePublishToggle = hasQuestions === false && !card.published;

              return (
                <Card
                  id={`quiz-card-${card.id}`}
                  publishedText={t('quizzes.filter.published')}
                  unpublishedText={t('quizzes.filter.unpublished')}
                  onCardClick={() => {
                    navigate(`/quiz/${card.id}`)
                  }}
                  key={card.id}
                  title={card.title}
                  lastModified={getLastUpdateTime(card.latestGlobalUpdate)}
                  isPublished={card.published}
                  disablePublishToggle={disablePublishToggle}
                  disabledTooltipLabel={t('quiz.publish_toggle.disabled_tooltip')}
                  onCopyUrl={() => {
                    if (card.published) {
                      handleCopyUrlAndNotify(card.hash, t('success_messages.quiz_link_copied'));
                    } else {
                      handleCopyUrlAndNotify(card.hash, t('success_messages.quiz_link_copied'));
                      handleUnpublishedQuizId(card.id)
                      setIsUnpublishedQuizCopyLinkModalOpen(true);
                    }
                  }}
                  onTogglePublished={() => {
                    if (disablePublishToggle) {
                      return;
                    }
                    handleTogglePublished(card.id, !card.published);
                  }}
                  onEdit={() => {
                    navigate(`/quiz/${card.id}`)
                  }}
                  onDuplicate={() => { startDuplicateQuizFlow(card); }}
                  onDelete={() => {
                    handleSelectedCard(card)
                    setIsDeleteModalOpen(true)
                  }}
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
                <br /><br />
                <QuizWarningNote>
                  {t('modals.delete_quiz.note')}
                </QuizWarningNote>
                {t('modals.delete_quiz.message')}
              </div>
            )}
            setIsModalOpen={setIsDeleteModalOpen}
            onDelete={() => {
              deleteQuiz(selectedCard?.id)
              handleSelectedCard(null)
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
              if (!open) cancelFlow();
            }}
            title={title}
            setTitle={setTitle}
            onCreate={(title) => { handleTitleSubmit(title); }}
            onCancel={() => { cancelFlow(); }}
            keepModalOpen
          />

          <QuizVisibilityModal
            isModalOpen={isVisibilityModalOpen}
            onBack={() => { handleBackFromVisibility(); }}
            onConfirm={handleConfirmVisibility}
            isSubmitting={isSubmitting}
          />

          <UnpublishedQuizCopyLinkModal
            setIsModalOpen={setIsUnpublishedQuizCopyLinkModalOpen}
            isModalOpen={isUnpublishedQuizCopyLinkModalOpen}
            onConfirm={() => {
              if (unpublishedQuizId != null) handleTogglePublished(unpublishedQuizId, true);
              handleUnpublishedQuizId(null);
            }}
            onCancel={() => { handleUnpublishedQuizId(null); }}
          />

          <UnpublishQuizWithQuestionsModal
            isModalOpen={isUnpublishQuizModalOpen}
            setIsModalOpen={setIsUnpublishQuizModalOpen}
            onConfirm={() => {
              if (unpublishedQuizId !== null) {
                applyPublishState(unpublishedQuizId, false);
              }
              setIsUnpublishQuizModalOpen(false);
              handleUnpublishedQuizId(null);
            }}
            onCancel={() => {
              setIsUnpublishQuizModalOpen(false);
              handleUnpublishedQuizId(null);
            }}
          />

          <DuplicateQuizModal
            quiz={selectedQuizForDuplicate}
            isModalOpen={isDuplicateTitleModalOpen}
            title={title}
            setTitle={setTitle}
            onDuplicate={(title) => handleTitleSubmit(title)}
            onCancel={() => cancelFlow()}
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
  color: ${props => props.theme.colors.green7};
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
