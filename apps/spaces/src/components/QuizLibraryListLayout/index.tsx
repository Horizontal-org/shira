import { Body1, H2, Props, Sidebar, styled, SubHeading3, useAdminSidebar } from "@shira/ui";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileResponsivenessBanner } from "../MobileResponsivenessBanner";
import { t } from "i18next";
import { shallow } from "zustand/shallow";
import { useStore } from "../../store";
import { QuizCard } from "./components/QuizCard";
import { getLibraryQuizzes, type LibraryQuizDto } from "../../fetch/quiz_library";

export const QuizLibraryListLayout: FunctionComponent<Props> = () => {

  const navigate = useNavigate();
  const { isCollapsed, handleCollapse, menuItems } = useAdminSidebar(navigate);

  const [quizzes, setQuizzes] = useState<LibraryQuizDto[]>([]);
  const [loading, setLoading] = useState(false);

  const { space } = useStore((state) => ({
    space: state.space
  }), shallow)

  const loadQuizzes = async () => {
    setLoading(true);

    try {
      const data = await getLibraryQuizzes();
      setQuizzes(data);
    } catch (error) {
      console.error("Failed to get library quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  return (
    <Container id="quiz-library-list-layout">
      <Sidebar
        menuItems={menuItems}
        onCollapse={handleCollapse}
        selectedItemLabel={menuItems.find(m => m.path === '/library').label}
      />
      <MainContent $isCollapsed={isCollapsed}>
        <MobileResponsivenessBanner />

        <MainContentWrapper>
          <HeaderContainer>
            <StyledSubHeading3 id="space-name">{space && space.name}</StyledSubHeading3>
            <H2 id="quiz-library-title">{t('dashboard.title')}</H2>
            <Body1 id="quiz-library-subtitle">{t('dashboard.subtitle')}</Body1>
          </HeaderContainer>

          <CardGrid id="quiz-card-grid">
            {loading ? (
              <Body1>{t('loading_messages.loading')}</Body1>
            ) : (
              quizzes.map((quiz) => (
                <QuizCard
                  key={`${quiz.title}-${quiz.createdAt}`}
                  quiz={quiz}
                  onCardClick={() => { }}
                />
              ))
            )}
          </CardGrid>
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

const HeaderContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledSubHeading3 = styled(SubHeading3)`
  color: ${props => props.theme.colors.green7};
`;

const MainContentWrapper = styled.div`
  padding: 24px 40px;
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
