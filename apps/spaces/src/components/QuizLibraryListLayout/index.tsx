import { Body1, CardPagination, EmptyState, styled } from "@horizontal-org/shira-ui";
import { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { useStore } from "../../store";
import { QuizCard } from "./components/QuizCard";
import { QuizCardSkeleton } from "./components/QuizCardSkeleton";
import { QuizLibraryFilters } from "./components/QuizLibraryFilters";
import { QuizLibraryFiltersToggle } from "./components/QuizLibraryFiltersToggle";
import { QuizLibrarySearchInput } from "./components/QuizLibrarySearchInput";
import { QuizLibrarySortSelect } from "./components/QuizLibrarySortSelect";
import {
  DEFAULT_CREATOR_OPTIONS,
  DEFAULT_PAGE_LIMIT,
  type LibraryQuizDto,
  type LibraryQuizQuestionTemplateDto,
} from "../../fetch/quiz_templates";
import { QuizLimitModal } from "../modals/QuizLimitModal";
import { ViewPlansModal } from "../modals/ViewPlansModal";
import { QuizLibraryPreviewModal } from "../modals/QuizLibraryPreviewModal";
import { useSub } from "../../hooks/useSub";
import { QuizLibraryFlowManagement } from "../QuizLibraryFlowManagement";
import { useQuizTemplateList } from "./hooks/useQuizTemplateList";

export const QuizTemplatesListLayout: FunctionComponent = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
  const {
    areFiltersOpen,
    debouncedSearchValue,
    clearAllFilters,
    hasActiveSearch,
    languageOptions,
    loading,
    paginationProps,
    searchValue,
    selectedCreator,
    selectedLanguages,
    selectedTags,
    setSearchValue,
    setSelectedCreator,
    setSelectedLanguages,
    setSelectedTags,
    setSortOption,
    showSearchEmptyState,
    sortOption,
    tagOptions,
    total,
    toggleFilters,
    visibleLibraryQuizzes,
  } = useQuizTemplateList();

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

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

  return (
    <QuizLibraryFlowManagement>
      <PageContent id="quiz-library-list-layout">

        <PageInner>

          <Controls>
            <ControlsTopRow>
              <QuizLibrarySearchInput
                value={searchValue}
                onChange={setSearchValue}
              />

              <ActionsGroup>
                <QuizLibrarySortSelect
                  sortOption={sortOption}
                  onSortChange={setSortOption}
                />

                <QuizLibraryFiltersToggle
                  areFiltersOpen={areFiltersOpen}
                  onToggleFilters={toggleFilters}
                />
              </ActionsGroup>
            </ControlsTopRow>

            <QuizLibraryFilters
              showFilters={areFiltersOpen}
              languageOptions={languageOptions}
              selectedLanguages={selectedLanguages}
              onLanguageChange={setSelectedLanguages}
              tagOptions={tagOptions}
              selectedTags={selectedTags}
              onTagChange={setSelectedTags}
              creatorOptions={Array.of(DEFAULT_CREATOR_OPTIONS)}
              selectedCreator={selectedCreator}
              onCreatorChange={setSelectedCreator}
              onClearAll={clearAllFilters}
            />
          </Controls>

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

          {!showSearchEmptyState && (
            <PaginationWrapper>
              <CardPagination {...paginationProps} />
            </PaginationWrapper>
          )}

          {showSearchEmptyState ? (
            <SearchEmptyStateWrapper>
              <EmptyState
                subtitle={(
                  <SearchEmptyStateContent>
                    <SearchEmptyStateTitle>
                      {t("quiz_library.empty_search.title")}
                    </SearchEmptyStateTitle>
                    <SearchEmptyStateSubtitle>
                      {t("quiz_library.empty_search.subtitle")}
                    </SearchEmptyStateSubtitle>
                  </SearchEmptyStateContent>
                )}
              />
            </SearchEmptyStateWrapper>
          ) : (
            <CardGrid id="quiz-card-grid">
              {loading ? (
                Array.from({ length: DEFAULT_PAGE_LIMIT }, (_, index) => (
                  <QuizCardSkeleton key={`quiz-card-skeleton-${index}`} />
                ))
              ) : (
                visibleLibraryQuizzes.map((quiz) => (
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
          )}

          {!loading && visibleLibraryQuizzes.length > 0 && (
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

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ControlsTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ActionsGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-left: auto;
  flex-shrink: 0;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    margin-left: 0;
  }
`;

const PaginationWrapper = styled.div`
  padding: 0 16px;
`;

const SearchResultsText = styled(Body1)`
  padding: 10px;
`;

const SearchEmptyStateWrapper = styled.div`
  min-height: 540px;
  padding: 48px 16px 72px;
`;

const SearchEmptyStateContent = styled.span`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SearchEmptyStateTitle = styled.span`
  margin: 0 0 12px;
  color: ${props => props.theme.colors.dark.black};
  font-size: 28px;
  font-weight: 600;
  line-height: 1.2;
`;

const SearchEmptyStateSubtitle = styled.span`
  max-width: 560px;
  margin: 0;
  color: ${props => props.theme.colors.dark.darkGrey};
  font-size: 18px;
  font-weight: 300;
  line-height: 1.5;
`;

const CardGrid = styled.div`
  padding: 12px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  align-items: stretch;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;
