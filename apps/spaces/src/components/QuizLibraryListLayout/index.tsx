import { Body1, CardPagination, EmptyState, styled } from "@horizontal-org/shira-ui";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { useStore } from "../../store";
import { QuizCard } from "./components/QuizCard";
import { QuizCardSkeleton } from "./components/QuizCardSkeleton";
import { QuizLibraryFilters } from "./components/QuizLibraryFilters";
import { QuizLibrarySearchInput } from "./components/QuizLibrarySearchInput";
import { QuizLibrarySortSelect } from "./components/QuizLibrarySortSelect";
import {
  DEFAULT_QUIZ_TEMPLATE_SORT,
  getQuizTemplateLanguageOptions,
  getQuizTemplateTagOptions,
  getQuizTemplates,
  type LibraryQuizDto,
  type LibraryQuizQuestionTemplateDto,
  type QuizTemplateFilterOption,
  type QuizTemplateSortOption,
} from "../../fetch/quiz_templates";
import { QuizLimitModal } from "../modals/QuizLimitModal";
import { ViewPlansModal } from "../modals/ViewPlansModal";
import { QuizLibraryPreviewModal } from "../modals/QuizLibraryPreviewModal";
import { useSub } from "../../hooks/useSub";
import { QuizLibraryFlowManagement } from "../QuizLibraryFlowManagement";

const DEFAULT_PAGE_SIZE = 10;
const SEARCH_DEBOUNCE_DELAY_MS = 200;
const DEFAULT_CREATOR_OPTIONS = ["Shira Team"];

const getQuizTemplateTimestamp = (createdAt: string) => {
  return new Date(createdAt).getTime();
};

const sortQuizTemplates = (
  quizzes: LibraryQuizDto[],
  sortOption: QuizTemplateSortOption,
) => {
  return [...quizzes].sort((firstQuiz, secondQuiz) => {
    const firstTitle = firstQuiz.title.trim().toLowerCase();
    const secondTitle = secondQuiz.title.trim().toLowerCase();

    if (sortOption === "createdAt-asc") {
      return getQuizTemplateTimestamp(firstQuiz.createdAt) - getQuizTemplateTimestamp(secondQuiz.createdAt);
    }

    if (sortOption === "title-asc") {
      return firstTitle.localeCompare(secondTitle);
    }

    if (sortOption === "title-desc") {
      return secondTitle.localeCompare(firstTitle);
    }

    return getQuizTemplateTimestamp(secondQuiz.createdAt) - getQuizTemplateTimestamp(firstQuiz.createdAt);
  });
};

const getAllQuizTemplates = async (
  search?: string,
  sortOption: QuizTemplateSortOption = DEFAULT_QUIZ_TEMPLATE_SORT,
  langTagCodes?: string[],
  tagSlugs?: string[],
): Promise<LibraryQuizDto[]> => {
  const firstPage = await getQuizTemplates({
    page: 1,
    limit: 100,
    search,
    sortOption,
    langTagCodes,
    tagSlugs,
  });

  const totalPages = Math.max(1, Math.ceil(firstPage.total / firstPage.limit));

  if (totalPages === 1) {
    return firstPage.data;
  }

  const remainingPages = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, index) => (
      getQuizTemplates({
        page: index + 2,
        limit: firstPage.limit,
        search,
        sortOption,
        langTagCodes,
        tagSlugs,
      })
    )),
  );

  return [
    ...firstPage.data,
    ...remainingPages.flatMap((page) => page.data),
  ];
};

export const QuizTemplatesListLayout: FunctionComponent = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const pageSize = DEFAULT_PAGE_SIZE;

  const [libraryQuizzes, setLibraryQuizzes] = useState<LibraryQuizDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);

  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [sortOption, setSortOption] = useState<QuizTemplateSortOption>(DEFAULT_QUIZ_TEMPLATE_SORT);

  const [areFiltersOpen, setAreFiltersOpen] = useState(false);

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCreator, setSelectedCreator] = useState("");

  const [languageOptions, setLanguageOptions] = useState<QuizTemplateFilterOption[]>([]);
  const [tagOptions, setTagOptions] = useState<QuizTemplateFilterOption[]>([]);
  const [totalAvailableQuizzes, setTotalAvailableQuizzes] = useState(0);
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
  const usesClientSideSorting = sortOption === "title-asc" || sortOption === "title-desc";

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  useEffect(() => {
    const debounceTimeout = window.setTimeout(() => {
      setDebouncedSearchValue(searchValue.trim());
    }, SEARCH_DEBOUNCE_DELAY_MS);

    return () => {
      window.clearTimeout(debounceTimeout);
    };
  }, [searchValue]);

  useEffect(() => {
    if (usesClientSideSorting) {
      return;
    }

    const loadQuizzes = async () => {
      setLoading(true);

      try {
        const response = await getQuizTemplates({
          page: pageIndex + 1,
          limit: pageSize,
          search: debouncedSearchValue,
          sortOption,
          langTagCodes: selectedLanguages,
          tagSlugs: selectedTags,
        });

        setLibraryQuizzes(response.data);
        setTotalAvailableQuizzes(response.total);
        setPageIndex((currentPageIndex) => {
          const nextPageIndex = Math.max(0, response.page - 1);

          return currentPageIndex === nextPageIndex ? currentPageIndex : nextPageIndex;
        });
      } catch (error) {
        console.error("Failed to get library quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    loadQuizzes();
  }, [debouncedSearchValue, pageIndex, pageSize, selectedLanguages, selectedTags, sortOption, usesClientSideSorting]);

  useEffect(() => {
    if (!usesClientSideSorting) {
      return;
    }

    const loadAllMatchingQuizzes = async () => {
      setLoading(true);

      try {
        const response = await getAllQuizTemplates(
          debouncedSearchValue,
          sortOption,
          selectedLanguages,
          selectedTags,
        );

        setLibraryQuizzes(response);
        setTotalAvailableQuizzes(response.length);
      } catch (error) {
        console.error("Failed to get library quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAllMatchingQuizzes();
  }, [debouncedSearchValue, selectedLanguages, selectedTags, sortOption, usesClientSideSorting]);

  useEffect(() => {
    if (!areFiltersOpen || (languageOptions.length > 0 && tagOptions.length > 0)) {
      return;
    }

    const loadFilterOptions = async () => {
      try {
        const [nextLanguageOptions, nextTagOptions] = await Promise.all([
          getQuizTemplateLanguageOptions(),
          getQuizTemplateTagOptions(),
        ]);

        setLanguageOptions(nextLanguageOptions);
        setTagOptions(nextTagOptions);
      } catch (error) {
        console.error("Failed to get quiz template filter options:", error);
      }
    };

    loadFilterOptions();
  }, [areFiltersOpen, languageOptions.length, tagOptions.length]);

  const creatorOptions = useMemo(
    () => DEFAULT_CREATOR_OPTIONS,
    [],
  );

  const sortedLibraryQuizzes = useMemo(
    () => sortQuizTemplates(libraryQuizzes, sortOption),
    [libraryQuizzes, sortOption],
  );

  const total = usesClientSideSorting ? sortedLibraryQuizzes.length : totalAvailableQuizzes;
  const visibleLibraryQuizzes = usesClientSideSorting
    ? sortedLibraryQuizzes.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
    : libraryQuizzes;
  const isGridLoading = loading;

  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const hasActiveSearch = debouncedSearchValue.length > 0;
  const showSearchEmptyState = hasActiveSearch && !isGridLoading && total === 0;

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

  const handleSortChange = (nextSortOption: QuizTemplateSortOption) => {
    setSortOption(nextSortOption);
    setPageIndex(0);
  };

  const handleToggleFilters = () => {
    setAreFiltersOpen((prev) => !prev);
  };

  const handleLanguageChange = (nextValue: string[]) => {
    setSelectedLanguages(nextValue);
    setPageIndex(0);
  };

  const handleTagChange = (nextValue: string[]) => {
    setSelectedTags(nextValue);
    setPageIndex(0);
  };

  const handleCreatorChange = (nextValue: string) => {
    setSelectedCreator(nextValue);
    setPageIndex(0);
  };

  return (
    <QuizLibraryFlowManagement>
      <PageContent id="quiz-library-list-layout">

        <PageInner>

          <Controls>
            <ControlsTopRow>
              <QuizLibrarySearchInput
                value={searchValue}
                onChange={handleSearchChange}
              />

              <ActionsGroup>
                <QuizLibrarySortSelect
                  sortOption={sortOption}
                  onSortChange={handleSortChange}
                />

                <QuizLibraryFilters
                  variant="toggle"
                  areFiltersOpen={areFiltersOpen}
                  onToggleFilters={handleToggleFilters}
                  languageOptions={languageOptions}
                  selectedLanguages={selectedLanguages}
                  onLanguageChange={handleLanguageChange}
                  tagOptions={tagOptions}
                  selectedTags={selectedTags}
                  onTagChange={handleTagChange}
                  creatorOptions={creatorOptions}
                  selectedCreator={selectedCreator}
                  onCreatorChange={handleCreatorChange}
                />
              </ActionsGroup>
            </ControlsTopRow>

            <QuizLibraryFilters
              variant="panel"
              areFiltersOpen={areFiltersOpen}
              onToggleFilters={handleToggleFilters}
              languageOptions={languageOptions}
              selectedLanguages={selectedLanguages}
              onLanguageChange={handleLanguageChange}
              tagOptions={tagOptions}
              selectedTags={selectedTags}
              onTagChange={handleTagChange}
              creatorOptions={creatorOptions}
              selectedCreator={selectedCreator}
              onCreatorChange={handleCreatorChange}
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
              {isGridLoading ? (
                Array.from({ length: pageSize }, (_, index) => (
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

          {!isGridLoading && visibleLibraryQuizzes.length > 0 && (
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
  gap: 16px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ActionsGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
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

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;
