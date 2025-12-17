import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Sidebar, styled, H2, SubHeading3, Body1, Button, FilterButton, useAdminSidebar, BetaBanner } from "@shira/ui";
import { FiPlus } from 'react-icons/fi';
import { shallow } from "zustand/shallow";

import { useStore } from "../../store";
import type { Quiz } from "../../store/slices/quiz";
import { formatDistance } from "date-fns";
import { enUS } from "date-fns/locale";
import { QuizSuccessStates, SUCCESS_MESSAGES } from "../../store/slices/quiz";
import toast from "react-hot-toast";
import { FilterStates } from "./constants";
import { DeleteModal } from "../modals/DeleteModal";
import { CreateQuizModal } from "../modals/CreateQuizModal";
import { UnpublishedQuizModal } from "../modals/UnpublishedQuizModal";
import { DuplicateQuizModal } from "../modals/DuplicateQuizModal";
import { handleCopyUrl, handleCopyUrlAndNotify } from "../../utils/quiz";
import { duplicateQuiz } from "../../fetch/quiz";
import { useTranslation } from "react-i18next";
import { getCurrentDateFNSLocales } from "../../language/dateUtils";
import { QuizVisibilityModal } from "../modals/QuizVisibilityModal";

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
  const navigate = useNavigate();
  const { isCollapsed, handleCollapse, menuItems } = useAdminSidebar(navigate)

  const [activeFilter, setActiveFilter] = useState<FilterStates>(FilterStates.all);
  const [cards, setCards] = useState([]);
  console.log("🚀 ~ cards:", cards)
  const [selectedCard, handleSelectedCard] = useState(null)

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);

  const [isDuplicating, setIsDuplicating] = useState(false);
  const [unpublishedQuizId, handleUnpublishedQuizId] = useState<number | null>(null);

  const [createQuizStep, setCreateQuizStep] = useState<1 | 2>(1);
  const [newQuizTitle, setNewQuizTitle] = useState("");
  const [selectedQuizForDuplicate, setSelectedQuizForDuplicate] = useState<Quiz | null>(null);
  const [quizFlowMode, setQuizFlowMode] = useState<"create" | "duplicate" | null>(null);

  useEffect(() => {
    fetchQuizzes()

    return () => {
      cleanQuizActionSuccess()
    }
  }, [])

  useEffect(() => {
    setCards(quizzes)
  }, [quizzes])


  useEffect(() => {
    if (t(SUCCESS_MESSAGES[quizActionSuccess])) {
      const message = t(SUCCESS_MESSAGES[quizActionSuccess]);
      toast.success(message, { duration: 3000 })

      if (quizActionSuccess !== QuizSuccessStates.delete) {
        fetchQuizzes()
      }

      cleanQuizActionSuccess()
    }
  }, [quizActionSuccess])

  const handleTogglePublished = (cardId: number, published: boolean) => {
    updateQuiz({
      id: cardId,
      published
    })

    setCards(currentCards =>
      currentCards.map(card =>
        card.id === cardId
          ? { ...card, published: !card.published }
          : card
      )
    );
  };

  const handleDuplicateQuiz = async (title: string, visibility: string) => {
    if (!selectedQuizForDuplicate) return;

    setIsDuplicating(true);

    try {
      await Promise.all([
        duplicateQuiz(selectedQuizForDuplicate.id, title, visibility),
        new Promise(resolve => setTimeout(resolve, 1000))
      ]);

      toast.success(t('success_messages.question_updated', { quiz_name: title }), { duration: 3000 });

      // Refresh the quizzes list to show the new duplicated quiz
      fetchQuizzes();
      resetQuizFlow();
    } catch (error) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.error(t('error_messages.duplicate_quiz_fail'), { duration: 3000 });
      console.error('Duplicate quiz error:', error);
    } finally {
      setIsDuplicating(false);
    }
  };

  const resetQuizFlow = () => {
    setCreateQuizStep(1);
    setIsCreateModalOpen(false);
    setIsDuplicateModalOpen(false);
    setNewQuizTitle("");
    setSelectedQuizForDuplicate(null);
    setQuizFlowMode(null);
  };

  const startCreateQuizFlow = () => {
    resetQuizFlow();
    setQuizFlowMode("create");
    setIsCreateModalOpen(true);
  };

  const startDuplicateQuizFlow = (quiz: Quiz) => {
    resetQuizFlow();
    setQuizFlowMode("duplicate");
    setSelectedQuizForDuplicate(quiz);
    setIsDuplicateModalOpen(true);
  };

  const handleDuplicateTitleSubmit = (title: string) => {
    setNewQuizTitle(title);
    setCreateQuizStep(2);
    setIsCreateModalOpen(true);
    setIsDuplicateModalOpen(false);
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
        <BetaBanner url="/support" />
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
                color="#849D29"
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
          </FilterButtonsContainer>

          <CardGrid id="card-grid">
            {filteredCards.map((card) => (
              <Card
                id={`quiz-card-${card.id}`}
                publishedText={t('quizzes.filter.published')}
                onCardClick={() => {
                  navigate(`/quiz/${card.id}`)
                }}
                key={card.id}
                title={card.title}
                lastModified={getLastUpdateTime(card.latestGlobalUpdate)}
                isPublished={card.published}
                onCopyUrl={() => {
                  if (card.published) {
                    handleCopyUrlAndNotify(card.hash)
                  } else {
                    handleCopyUrl(card.hash)
                    handleUnpublishedQuizId(card.id)
                  }
                }}
                onTogglePublished={() => handleTogglePublished(card.id, !card.published)}
                onEdit={() => {
                  navigate(`/quiz/${card.id}`)
                }}
                onDuplicate={() => { startDuplicateQuizFlow(card); }}
                onDelete={() => {
                  handleSelectedCard(card)
                  setIsDeleteModalOpen(true)
                }}
                isPublic={card.visibility === 'public'}
                visibilityText={
                  card.visibility === 'public'
                    ? t('quiz.visibility.public')
                    : t('quiz.visibility.private')}
              />
            ))}
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
              setIsDeleteModalOpen(false)
              handleSelectedCard(null)
            }}
            isModalOpen={isDeleteModalOpen}
          />

          <CreateQuizModal
            isModalOpen={quizFlowMode === "create" && isCreateModalOpen && createQuizStep === 1}
            setIsModalOpen={setIsCreateModalOpen}
            onCreate={(title) => {
              setNewQuizTitle(title);
              setCreateQuizStep(2);
            }}
            onCancel={() => { resetQuizFlow(); }}
            keepOpenOnPrimary
          />

          <QuizVisibilityModal
            isModalOpen={quizFlowMode !== null && isCreateModalOpen && createQuizStep === 2}
            setIsModalOpen={(open) => {
              if (!open) {
                resetQuizFlow();
              } else {
                setIsCreateModalOpen(true);
                setCreateQuizStep(2);
              }
            }}
            onBack={() => {
              setCreateQuizStep(1);
              if (quizFlowMode === "duplicate") {
                setIsCreateModalOpen(false);
                setIsDuplicateModalOpen(true);
              } else {
                setIsCreateModalOpen(true);
              }
            }}
            onConfirm={(visibility) => {
              if (quizFlowMode === "duplicate") {
                handleDuplicateQuiz(newQuizTitle, visibility);
              } else if (quizFlowMode === "create") {
                createQuiz(newQuizTitle, visibility.toString());
                resetQuizFlow();
              }
            }}
          />

          <UnpublishedQuizModal
            setIsModalOpen={() => { handleUnpublishedQuizId(null) }}
            isModalOpen={!!(unpublishedQuizId)}
            onConfirm={() => {
              handleTogglePublished(unpublishedQuizId, true)
            }}
          />

          <DuplicateQuizModal
            quiz={selectedQuizForDuplicate}
            isModalOpen={isDuplicateModalOpen}
            onDuplicate={(title) => {
              handleDuplicateTitleSubmit(title);
            }}
            onCancel={() => {
              resetQuizFlow();
            }}
            isLoading={isDuplicating}
            initialTitle={quizFlowMode === "duplicate" ? newQuizTitle : ""}
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
  color: #52752C;
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