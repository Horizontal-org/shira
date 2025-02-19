import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Sidebar,
  styled,
  H2,
  SubHeading3,
  Body1,
  Button,
  FilterButton,
  useAdminSidebar
} from "@shira/ui";
import { FiPlus } from 'react-icons/fi';
import { FilterStates, cardData } from "./constants";
interface Props {}

export const DashboardLayout: FunctionComponent<Props> = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<FilterStates>(FilterStates.all);
  const [cards, setCards] = useState(cardData);
  const { isCollapsed, handleCollapse, menuItems } = useAdminSidebar(navigate)
  const handleTogglePublished = (cardId: number) => {
    setCards(currentCards => 
      currentCards.map(card => 
        card.id === cardId 
          ? { ...card, isPublished: !card.isPublished }
          : card
      )
    );
  };

  const handleCopyUrl = async (cardId: number) => {
    try {
      //mock url, change this later to the correct url
      const quizUrl = `https://shira.app/quiz/${cardId}`;
      await navigator.clipboard.writeText(quizUrl);
      
      // show toast msg
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  };
  
  const filteredCards = cards.filter(card => {
    switch (activeFilter) {
      case FilterStates.published:
        return card.isPublished;
      case FilterStates.unpublished:
        return !card.isPublished;
      case FilterStates.all:
      default:
        return true;
    }
  });
  
  return (
    <Container>
      <Sidebar 
        menuItems={menuItems} 
        onCollapse={handleCollapse}
      
      />

      <MainContent $isCollapsed={isCollapsed}>
        <HeaderContainer>
          <SubHeading3 color="#52752C">Stitching Justice Collective</SubHeading3>
          <H2>Welcome to your dashboard </H2>
          <Body1>This is where you can manage quizzes. Quiz links are public, so remember to avoid sharing sensitive information in them.</Body1>
          <ButtonContainer>
            <Button
              type="primary"
              leftIcon={<FiPlus />}
              text="Create new quiz"
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
          {filteredCards.map((card, index) => (
            <Card 
              key={index}
              title={card.title}
              lastModified={card.lastModified}
              isPublished={card.isPublished}
              onCopyUrl={() => handleCopyUrl(card.id)}
              onTogglePublished={() => handleTogglePublished(card.id)}
              onEdit={() => console.log("editing")}
              onDelete={() => console.log("delete")}
            />
          ))}
        </CardGrid>
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

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-start;
`


