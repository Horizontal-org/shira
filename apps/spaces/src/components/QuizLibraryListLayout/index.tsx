import { Body1, CardPagination, styled } from "@horizontal-org/shira-ui";
import { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { useStore } from "../../store";
import { QuizCard } from "./components/QuizCard";
import { QuizCardSkeleton } from "./components/QuizCardSkeleton";
import { QuizLibrarySearchInput } from "./components/QuizLibrarySearchInput";
import {
  getQuizTemplates,
  type LibraryQuizDto,
  type LibraryQuizQuestionTemplateDto,
} from "../../fetch/quiz_templates";
import { QuizLimitModal } from "../modals/QuizLimitModal";
import { ViewPlansModal } from "../modals/ViewPlansModal";
import { QuizLibraryPreviewModal } from "../modals/QuizLibraryPreviewModal";
import { useSub } from "../../hooks/useSub";
import { QuizLibraryFlowManagement } from "../QuizLibraryFlowManagement";

const DEFAULT_PAGE_SIZE = 10;

export const QuizTemplatesListLayout: FunctionComponent = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [libraryQuizzes, setLibraryQuizzes] = useState<LibraryQuizDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

  const [total, setTotal] = useState(0);
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

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  useEffect(() => {
    const debounceTimeout = window.setTimeout(() => {
      setDebouncedSearchValue(searchValue.trim());
    }, 200);

    return () => {
      window.clearTimeout(debounceTimeout);
    };
  }, [searchValue]);

  useEffect(() => {
    let isActive = true;

    const loadQuizzes = async () => {
      setLoading(true);

      try {
        const response = await getQuizTemplates({
          page: pageIndex + 1,
          limit: pageSize,
          search: debouncedSearchValue || undefined,
        });

        if (!isActive) {
          return;
        }

        setLibraryQuizzes(response.data);
        setTotal(response.total);
        setPageSize(response.limit);
        setPageIndex((currentPageIndex) => {
          const nextPageIndex = Math.max(0, response.page - 1);

          return currentPageIndex === nextPageIndex ? currentPageIndex : nextPageIndex;
        });
      } catch (error) {
        if (!isActive) {
          return;
        }

        console.error("Failed to get library quizzes:", error);
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadQuizzes();

    return () => {
      isActive = false;
    };
  }, [debouncedSearchValue, pageIndex, pageSize]);

  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const hasActiveSearch = debouncedSearchValue.length > 0;

  const paginationProps = {
    pageIndex,
    total,
    pageCount,
    pageSize,
    onFirstPage: () => { setPageIndex(0); },
    onPreviousPage: () => { setPageIndex((prev) => Math.max(0, prev - 1)); },
    onNextPage: () => { setPageIndex((prev) => Math.min(pageCount - 1, prev + 1)); },
    onLastPage: () => { setPageIndex(pageCount - 1); },
  };

  useEffect(() => {
    if (pageIndex <= pageCount - 1) {
      return;
    }

    setPageIndex(Math.max(0, pageCount - 1));
  }, [pageCount, pageIndex]);

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

  const handleUseTemplate = (
    quiz: LibraryQuizDto,
    questions?: LibraryQuizQuestionTemplateDto[],
  ) => {
    setPreviewQuiz(null);

    if (!canAddQuizzes(isSubActive, quizzes)) {
      setIsQuizLimitModalOpen(true);
      return;
    }

    navigate("/dashboard", {
      state: {
        addQuizFromTemplate: {
          quiz,
          questions,
        },
      },
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setPageIndex(0);
  };

  return (
    <QuizLibraryFlowManagement>
      <PageContent id="quiz-library-list-layout">

        <PageInner>

          <QuizLibrarySearchInput
            value={searchValue}
            onChange={handleSearchChange}
          />

          {hasActiveSearch && (
            <SearchResultsText>
              {t(
                total === 1
                  ? "quiz_library.search_results"
                  : "quiz_library.search_results_plural",
                {
                  count: total,
                  searchTerm: debouncedSearchValue,
                },
              )}
            </SearchResultsText>
          )}

          <PaginationWrapper>
            <CardPagination {...paginationProps} />
          </PaginationWrapper>

          <CardGrid id="quiz-card-grid" aria-busy={loading || undefined}>
            {loading ? (
              Array.from({ length: pageSize }, (_, index) => (
                <QuizCardSkeleton key={`quiz-card-skeleton-${index}`} />
              ))
            ) : (
              libraryQuizzes.map((quiz) => (
                <QuizCard
                  key={`${quiz.title}-${quiz.createdAt}`}
                  quiz={quiz}
                  searchTerm={debouncedSearchValue}
                  onViewTemplate={() => { handleOpenPreviewModal(quiz); }}
                  onUseTemplate={() => { handleUseTemplate(quiz); }}
                  onReportIssue={() => { navigate("/support"); }}
                />
              ))
            )}
          </CardGrid>

          {!loading && libraryQuizzes.length > 0 && (
            <PaginationWrapper>
              <CardPagination {...paginationProps} />
            </PaginationWrapper>
          )}
        </PageInner>

        <QuizLibraryPreviewModal
          quiz={previewQuiz}
          isOpen={!!previewQuiz}
          onClose={handleClosePreviewModal}
          onUseTemplate={(questions) => {
            if (previewQuiz) {
              handleUseTemplate(previewQuiz, questions);
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
  width: min(${props => props.theme.breakpoints.lg}, calc(100% - 32px));
  margin: 0 auto;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: calc(100% - 20px);
  }
`;

const PageInner = styled.div`
  padding: 0 8px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0;
  }
`;

const PaginationWrapper = styled.div`
  padding: 0 16px;
`;

const SearchResultsText = styled(Body1)`
  padding: 10px;
  font-size: 18px;
`;

const CardGrid = styled.div`
  padding: 12px;
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
