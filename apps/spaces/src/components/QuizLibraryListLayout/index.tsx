import { CardPagination, LibraryFilterToggleButton, styled } from "@horizontal-org/shira-ui";
import { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { useStore } from "../../store";
import { QuizCard } from "./components/QuizCard";
import { QuizCardSkeleton } from "./components/QuizCardSkeleton";
import { QuizTemplateFilters } from "./components/QuizTemplateFilters";
import {
  DEFAULT_CREATOR_OPTIONS,
  type LibraryQuizDto,
  type LibraryQuizQuestionTemplateDto,
} from "../../fetch/quiz_templates";
import { QuizLimitModal } from "../modals/QuizLimitModal";
import { ViewPlansModal } from "../modals/ViewPlansModal";
import { QuizLibraryPreviewModal } from "../modals/QuizLibraryPreviewModal";
import { useSub } from "../../hooks/useSub";
import { QuizLibraryFlowManagement } from "../QuizLibraryFlowManagement";
import { useQuizTemplateList } from "./hooks/useQuizTemplateList";
import { LibrarySearchEmptyState } from "../LibrarySearchEmptyState";
import {
  LibraryToolbar,
  LibraryToolbarSearchInput,
  LibraryToolbarSortSelect,
} from "../LibraryControlsLayout";
import { LibraryPaginationContainer } from "../TemplatePaginationWrapper";

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
    hasLoadedOnce,
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
    showEmptyState,
    sortOption,
    tagOptions,
    total,
    toggleFilters,
    visibleLibraryQuizzes,
  } = useQuizTemplateList();
  const showLoadingSkeleton = loading && (!hasLoadedOnce || visibleLibraryQuizzes.length === 0);

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

  const shouldShowPagination = !showLoadingSkeleton && !showEmptyState;

  return (
    <QuizLibraryFlowManagement>
      <PageContent id="quiz-library-list-layout">
        <PageInner>
          <LibraryToolbar
            searchControl={(
              <LibraryToolbarSearchInput
                value={searchValue}
                onChange={setSearchValue}
                placeholder={t("quiz_library.search_placeholder")}
              />
            )}
            actions={(
              <>
                <LibraryToolbarSortSelect
                  value={sortOption}
                  options={[
                    {
                      value: "createdAt-desc",
                      label: t("quiz_library.sort_options.newest_to_oldest"),
                    },
                    {
                      value: "createdAt-asc",
                      label: t("quiz_library.sort_options.oldest_to_newest"),
                    },
                    {
                      value: "title-asc",
                      label: t("quiz_library.sort_options.quiz_name_asc"),
                    },
                    {
                      value: "title-desc",
                      label: t("quiz_library.sort_options.quiz_name_desc"),
                    },
                  ]}
                  prefix={`${t("quiz_library.sort_by")}:`}
                  ariaLabel={t("quiz_library.sort_by")}
                  onChange={(value) => setSortOption(value as typeof sortOption)}
                />

                <LibraryFilterToggleButton
                  text={t("quiz_library.filters")}
                  isOpen={areFiltersOpen}
                  onClick={toggleFilters}
                />
              </>
            )}
            searchSummary={hasActiveSearch
              ? t(
                total === 1
                  ? "quiz_library.search_results"
                  : "quiz_library.search_results_plural",
                {
                  count: total,
                  searchTerm: debouncedSearchValue,
                },
              )
              : undefined}
            filters={areFiltersOpen ? (
              <QuizTemplateFilters
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
            ) : undefined}
          />

          {showLoadingSkeleton ? (
            <QuizCardSkeleton />
          ) : (
            <>
              {shouldShowPagination && (
                <LibraryPaginationContainer>
                  <CardPagination {...paginationProps} />
                </LibraryPaginationContainer>
              )}

              {showEmptyState ? (
                <LibrarySearchEmptyState
                  title={t("library.empty_search.title")}
                  subtitle={t("library.empty_search.subtitle")}
                />
              ) : (
                <CardGrid id="quiz-card-grid">
                  {visibleLibraryQuizzes.map((quiz) => (
                    <QuizCard
                      key={`${quiz.title}-${quiz.createdAt}`}
                      quiz={quiz}
                      searchTerm={debouncedSearchValue}
                      onViewTemplate={() => handleOpenPreviewModal(quiz)}
                      onUseTemplate={() => handleUseTemplate(quiz)}
                      onReportIssue={() => navigate("/support")}
                    />
                  ))}
                </CardGrid>
              )}
            </>
          )}

          {shouldShowPagination && (
            <LibraryPaginationContainer>
              <CardPagination {...paginationProps} />
            </LibraryPaginationContainer>
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
