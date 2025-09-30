import { FunctionComponent, useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  Sidebar,
  styled,
  H2,
  SubHeading3,
  Body1,
  Button,
  FilterButton,
  useAdminSidebar,
  Modal,
  TextInput,
  BetaBanner
} from "@shira/ui";
import { FiPlus } from 'react-icons/fi';
import { shallow } from "zustand/shallow";

import { useStore } from "../../store";
import { compareAsc, formatDistance } from "date-fns";
import { QuizSuccessStates, SUCCESS_MESSAGES } from "../../store/slices/quiz";
import toast from "react-hot-toast";
import { FilterStates } from "./constants";
import { DeleteModal } from "../modals/DeleteModal";
import { CreateQuizModal } from "../modals/CreateQuizModal";
import { UnpublishedQuizModal } from "../modals/UnpublishedQuizModal";
import { DuplicateQuizModal } from "../modals/DuplicateQuizModal";
import { handleCopyUrl, handleCopyUrlAndNotify } from "../../utils/quiz";
import { duplicateQuiz } from "../../fetch/quiz";

interface Props {}

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
    
  const navigate = useNavigate();
  const { isCollapsed, handleCollapse, menuItems } = useAdminSidebar(navigate)

  const [activeFilter, setActiveFilter] = useState<FilterStates>(FilterStates.all);
  const [cards, setCards] = useState([]);
  console.log("🚀 ~ cards:", cards)
  const [selectedCard, handleSelectedCard] = useState(null)

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);
  const [selectedQuizForDuplicate, setSelectedQuizForDuplicate] = useState(null);
  const [isDuplicating, setIsDuplicating] = useState(false);
  const [unpublishedQuizId, handleUnpublishedQuizId] = useState<number | null>(null);
  

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
    if (SUCCESS_MESSAGES[quizActionSuccess]) {
      const message = SUCCESS_MESSAGES[quizActionSuccess]
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

  const handleDuplicateQuiz = async (title: string) => {
    if (!selectedQuizForDuplicate) return;

    setIsDuplicating(true);

    try {
      // Start both the API call and minimum 1-second delay
      const [result] = await Promise.all([
        duplicateQuiz(selectedQuizForDuplicate.id, title),
        new Promise(resolve => setTimeout(resolve, 1000))
      ]);

      toast.success(`"${title}" created successfully`, { duration: 3000 });

      // Refresh the quizzes list to show the new duplicated quiz
      fetchQuizzes();

      // Close modal and reset state
      setIsDuplicateModalOpen(false);
      setSelectedQuizForDuplicate(null);
    } catch (error) {
      // Even on error, ensure minimum 1-second delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.error('Failed to duplicate quiz', { duration: 3000 });
      console.error('Duplicate quiz error:', error);
    } finally {
      setIsDuplicating(false);
    }
  };                

  
  
  const filteredCards = cards.filter(card => {
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

  const compareDate = useCallback((lastUpdate) => {
    // force utc to locale parse
    const parsedLastUpdate = new Date(lastUpdate.replace(" ", "T") + "Z")    
    return formatDistance(
      parsedLastUpdate,
      new Date(), 
      { addSuffix: true }
    )    
  }, [filteredCards])

  return (
    <Container>
      <Sidebar 
        menuItems={menuItems} 
        onCollapse={handleCollapse}
        selectedItemLabel={menuItems.find(m => m.path === '/dashboard').label}
      />

      <MainContent $isCollapsed={isCollapsed}>
        <BetaBanner url="/support"/>
        <MainContentWrapper>
          <HeaderContainer>
            <StyledSubHeading3>{space && space.name}</StyledSubHeading3>
            <H2>Welcome to your dashboard </H2>
            <Body1>This is where you can manage quizzes. Quiz links are public, so remember to avoid sharing sensitive information in them.</Body1>
            <ButtonContainer>
              <Button
                type="primary"
                leftIcon={<FiPlus />}
                text="Create new quiz"
                onClick={() => {
                  setIsCreateModalOpen(true)
                }}
                color="#849D29"
              />
            </ButtonContainer>
          </HeaderContainer>

          <FilterButtonsContainer>
            <FilterButton 
              text="All quizzes"
              handleFilter={() => setActiveFilter(FilterStates.all)}
              isActive={activeFilter ===  FilterStates.all}
            />

            <FilterButton 
              text="Published"
              handleFilter={() => setActiveFilter(FilterStates.published)}
              isActive={activeFilter ===  FilterStates.published}
            />

            <FilterButton 
              text="Unpublished"
              handleFilter={() => setActiveFilter(FilterStates.unpublished)}
              isActive={activeFilter ===  FilterStates.unpublished}
            />
          </FilterButtonsContainer>

          <CardGrid>
            {filteredCards.map((card) => (
              <Card 
                onCardClick={() => {
                  navigate(`/quiz/${card.id}`)
                }}
                key={card.id}
                title={card.title}
                lastModified={compareDate(card.latestGlobalUpdate)}
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
                onDuplicate={() => {
                  setSelectedQuizForDuplicate(card);
                  setIsDuplicateModalOpen(true);
                }}
                onDelete={() => {
                  handleSelectedCard(card)
                  setIsDeleteModalOpen(true)
                }}
              />
            ))}
          </CardGrid>

          <DeleteModal
            title={`Are you sure you want to delete "${selectedCard?.title}"?`}
            content="Deleting this quiz is permanent and cannot be undone."
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
            setIsModalOpen={setIsCreateModalOpen}
            onCreate={(title) => { createQuiz(title) }}
            isModalOpen={isCreateModalOpen}
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
            setIsModalOpen={setIsDuplicateModalOpen}
            isModalOpen={isDuplicateModalOpen}
            onDuplicate={handleDuplicateQuiz}
            onCancel={() => {
              setIsDuplicateModalOpen(false);
              setSelectedQuizForDuplicate(null);
            }}
            isLoading={isDuplicating}
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
`

const MainContentWrapper = styled.div`
  padding: 50px;

`

const StyledSubHeading3 = styled(SubHeading3)`
  color: #52752C; 
`

const HeaderContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const FilterButtonsContainer = styled.div`
  margin-top: 8px;
  padding: 16px;
  display: flex;
  gap: 8px;
`

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
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-start;
`
