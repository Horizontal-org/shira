import { CardPagination, styled } from "@shira/ui";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { useStore } from "../../store";
import { QuizCard } from "./components/QuizCard";
import { QuizCardSkeleton } from "./components/QuizCardSkeleton";
import { QuizLibrarySearchInput } from "./components/QuizLibrarySearchInput";
import { getQuizTemplates, type LibraryQuizDto } from "../../fetch/quiz_library";
import { QuizLimitModal } from "../modals/QuizLimitModal";
import { ViewPlansModal } from "../modals/ViewPlansModal";
import { QuizLibraryPreviewModal } from "../modals/QuizLibraryPreviewModal";
import { useSub } from "../../hooks/useSub";
import { QuizLibraryFlowManagement } from "../QuizLibraryFlowManagement";

const PAGE_SIZE = 10;

export const QuizLibraryListLayout: FunctionComponent = () => {
  const navigate = useNavigate();

  const [libraryQuizzes, setLibraryQuizzes] = useState<LibraryQuizDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [previewQuiz, setPreviewQuiz] = useState<LibraryQuizDto | null>(null);
  const [isQuizLimitModalOpen, setIsQuizLimitModalOpen] = useState(false);
  const [isViewPlansModalOpen, setIsViewPlansModalOpen] = useState(false);

  const {
    fetchQuizzes,
    quizzes,
    subscription,
  } = useStore((state) => ({
    fetchQuizzes: state.fetchQuizzes,
    quizzes: state.quizzes,
    subscription: state.subscription,
  }), shallow);

  const { isSubActive } = useSub();

  const loadQuizzes = async () => {
    setLoading(true);

    try {
      const data = await getQuizTemplates();
      setLibraryQuizzes(data);
    } catch (error) {
      console.error("Failed to get library quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadQuizzes();
    void fetchQuizzes();
  }, []);

  const total = libraryQuizzes.length;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const startIndex = pageIndex * PAGE_SIZE;
  const paginatedQuizzes = libraryQuizzes.slice(startIndex, startIndex + PAGE_SIZE);

  useEffect(() => {
    setPageIndex((prev) => Math.min(prev, pageCount - 1));
  }, [pageCount]);

  const handleOpenPreviewModal = (quiz: LibraryQuizDto) => {
    setPreviewQuiz(quiz);
  };

  const handleClosePreviewModal = () => {
    setPreviewQuiz(null);
  };

  const openViewPlansFromLimitModal = () => {
    setIsQuizLimitModalOpen(false);
    setIsViewPlansModalOpen(true);
  };

  const canAddQuizzes = (isSubActive: boolean, currentQuizzes) => {
    return isSubActive || currentQuizzes.length < 3;
  };

  const handleUseTemplate = (quiz: LibraryQuizDto) => {
    setPreviewQuiz(null);

    if (!canAddQuizzes(isSubActive, quizzes)) {
      setIsQuizLimitModalOpen(true);
      return;
    }

    navigate("/dashboard", {
      state: {
        addQuizFromTemplate: {
          quiz,
        },
      },
    });
  };

  return (
    <QuizLibraryFlowManagement>
      <PageContent id="quiz-library-list-layout">

        <PageInner>

          <QuizLibrarySearchInput />

          <PaginationWrapper>
            <CardPagination
              pageIndex={pageIndex}
              total={total}
              pageCount={pageCount}
              onFirstPage={() => { setPageIndex(0); }}
              onPreviousPage={() => { setPageIndex((prev) => Math.max(0, prev - 1)); }}
              onNextPage={() => { setPageIndex((prev) => Math.min(pageCount - 1, prev + 1)); }}
              onLastPage={() => { setPageIndex(pageCount - 1); }}
            />
          </PaginationWrapper>

          <CardGrid id="quiz-card-grid" aria-busy={loading || undefined}>
            {loading ? (
              Array.from({ length: PAGE_SIZE }, (_, index) => (
                <QuizCardSkeleton key={`quiz-card-skeleton-${index}`} />
              ))
            ) : (
              paginatedQuizzes.map((quiz) => (
                <QuizCard
                  key={`${quiz.title}-${quiz.createdAt}`}
                  quiz={quiz}
                  onViewTemplate={() => { handleOpenPreviewModal(quiz); }}
                  onUseTemplate={() => { handleUseTemplate(quiz); }}
                  onReportIssue={() => { navigate("/support"); }}
                />
              ))
            )}
          </CardGrid>

          {!loading && libraryQuizzes.length > 0 && (
            <PaginationWrapper>
              <CardPagination
                pageIndex={pageIndex}
                total={total}
                pageCount={pageCount}
                onFirstPage={() => { setPageIndex(0); }}
                onPreviousPage={() => { setPageIndex((prev) => Math.max(0, prev - 1)); }}
                onNextPage={() => { setPageIndex((prev) => Math.min(pageCount - 1, prev + 1)); }}
                onLastPage={() => { setPageIndex(pageCount - 1); }}
              />
            </PaginationWrapper>
          )}
        </PageInner>

        <QuizLibraryPreviewModal
          quiz={previewQuiz}
          isOpen={!!previewQuiz}
          onClose={handleClosePreviewModal}
          onUseTemplate={() => {
            if (previewQuiz) {
              handleUseTemplate(previewQuiz);
            }
          }}
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
      </PageContent>
    </QuizLibraryFlowManagement>
  );
};

const PageContent = styled.div`
  width: min(1240px, calc(100% - 64px));
  margin: 0 auto;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: calc(100% - 32px);
  }
`;

const PageInner = styled.div`
  padding: 0 18px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0;
  }
`;

const PaginationWrapper = styled.div`
  padding: 0 25px;
`;

const CardGrid = styled.div`
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

    @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;
