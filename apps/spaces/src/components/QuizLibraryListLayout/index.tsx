import { Body1, H2, Pagination, Props, Sidebar, styled, SubHeading3, useAdminSidebar } from "@shira/ui";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileResponsivenessBanner } from "../MobileResponsivenessBanner";
import { t } from "i18next";
import { shallow } from "zustand/shallow";
import { useStore } from "../../store";
import { QuizCard } from "./components/QuizCard";
import { getLibraryQuizzes, type LibraryQuizDto } from "../../fetch/quiz_library";
import { LayoutContainer } from "../LayoutStyleComponents/LayoutContainer";
import { LayoutMainContent, LayoutMainContentWrapper } from "../LayoutStyleComponents/LayoutMainContent";
import { AddLibraryQuizModal } from "../modals/AddLibraryQuizModal";

const PAGE_SIZE = 10;

export const QuizLibraryListLayout: FunctionComponent<Props> = () => {

  const navigate = useNavigate();
  const { isCollapsed, handleCollapse, menuItems } = useAdminSidebar(navigate);

  const [quizzes, setQuizzes] = useState<LibraryQuizDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);

  const [selectedQuiz, setSelectedQuiz] = useState<LibraryQuizDto | null>(null);
  const [isAddQuizModalOpen, setIsAddQuizModalOpen] = useState(false);
  const [isSubmittingAddQuiz, setIsSubmittingAddQuiz] = useState(false);

  const { space, createQuiz, fetchQuizzes } = useStore((state) => ({
    space: state.space,
    createQuiz: state.createQuiz,
    fetchQuizzes: state.fetchQuizzes,
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
    void loadQuizzes();
  }, []);

  const total = quizzes.length;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const startIndex = pageIndex * PAGE_SIZE;
  const paginatedQuizzes = quizzes.slice(startIndex, startIndex + PAGE_SIZE);
  const canPreviousPage = pageIndex > 0;
  const canNextPage = pageIndex < pageCount - 1;

  useEffect(() => {
    setPageIndex((prev) => Math.min(prev, pageCount - 1));
  }, [pageCount]);

  const handleOpenAddQuizModal = (quiz: LibraryQuizDto) => {
    setSelectedQuiz(quiz);
    setIsAddQuizModalOpen(true);
  };

  const handleCloseAddQuizModal = () => {
    setIsAddQuizModalOpen(false);
    setSelectedQuiz(null);
  };

  const handleConfirmAddQuiz = async () => {
    if (!selectedQuiz) {
      return;
    }

    setIsSubmittingAddQuiz(true);

    try {
      await Promise.resolve(createQuiz(selectedQuiz.title, "public"));
      await fetchQuizzes();
      handleCloseAddQuizModal();
    } finally {
      setIsSubmittingAddQuiz(false);
    }
  };

  return (
    <LayoutContainer id="quiz-library-list-layout">
      <Sidebar
        menuItems={menuItems}
        onCollapse={handleCollapse}
        selectedItemLabel={menuItems.find(m => m.path === '/library').label}
      />
      <LayoutMainContent $isCollapsed={isCollapsed}>
        <MobileResponsivenessBanner />

        <LayoutMainContentWrapper>
          <HeaderContainer>
            <StyledSubHeading3 id="space-name">{space && space.name}</StyledSubHeading3>
            <H2 id="quiz-library-title">{t('dashboard.title')}</H2>
            <Body1 id="quiz-library-subtitle">{t('dashboard.subtitle')}</Body1>
          </HeaderContainer>

          {!loading && quizzes.length > 0 && (
            <PaginationWrapper>
              <Pagination
                pageIndex={pageIndex}
                pageSize={PAGE_SIZE}
                total={total}
                pageCount={pageCount}
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage}
                onFirstPage={() => { setPageIndex(0); }}
                onPreviousPage={() => { setPageIndex((prev) => Math.max(0, prev - 1)); }}
                onNextPage={() => { setPageIndex((prev) => Math.min(pageCount - 1, prev + 1)); }}
                onLastPage={() => { setPageIndex(pageCount - 1); }}
              />
            </PaginationWrapper>
          )}

          <CardGrid id="quiz-card-grid">
            {loading ? (
              <Body1>{t('loading_messages.loading')}</Body1>
            ) : (
              paginatedQuizzes.map((quiz) => (
                <QuizCard
                  key={`${quiz.title}-${quiz.createdAt}`}
                  quiz={quiz}
                  onCardClick={() => { }}
                  onMenuClick={() => {
                    handleOpenAddQuizModal(quiz);
                  }}
                />
              ))
            )}
          </CardGrid>

          {!loading && quizzes.length > 0 && (
            <PaginationWrapper>
              <Pagination
                pageIndex={pageIndex}
                pageSize={PAGE_SIZE}
                total={total}
                pageCount={pageCount}
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage}
                onFirstPage={() => { setPageIndex(0); }}
                onPreviousPage={() => { setPageIndex((prev) => Math.max(0, prev - 1)); }}
                onNextPage={() => { setPageIndex((prev) => Math.min(pageCount - 1, prev + 1)); }}
                onLastPage={() => { setPageIndex(pageCount - 1); }}
              />
            </PaginationWrapper>
          )}
        </LayoutMainContentWrapper>

        <AddLibraryQuizModal
          quiz={selectedQuiz}
          isModalOpen={isAddQuizModalOpen}
          onClose={handleCloseAddQuizModal}
          onConfirm={handleConfirmAddQuiz}
          isSubmitting={isSubmittingAddQuiz}
        />

      </LayoutMainContent>
    </LayoutContainer>
  );
};

const HeaderContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledSubHeading3 = styled(SubHeading3)`
  color: ${props => props.theme.colors.green7};
`;

const PaginationWrapper = styled.div`
  padding: 0 25px;
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
  }
`;
