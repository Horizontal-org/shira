import { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_PAGE_LIMIT,
  DEFAULT_QUIZ_TEMPLATE_SORT,
  getQuizTemplateLanguageOptions,
  getQuizTemplateTagOptions,
  getQuizTemplates,
  type LibraryQuizDto,
  type QuizTemplateFilterOption,
  type QuizTemplateSortOption,
} from "../../../fetch/quiz_templates";

const SEARCH_DEBOUNCE_DELAY_MS = 200;

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

export const useQuizTemplateList = () => {
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

  const usesClientSideSorting = sortOption === "title-asc" || sortOption === "title-desc";

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
  }, [debouncedSearchValue, pageIndex, selectedLanguages, selectedTags, sortOption, usesClientSideSorting]);

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

  const sortedLibraryQuizzes = useMemo(
    () => sortQuizTemplates(libraryQuizzes, sortOption),
    [libraryQuizzes, sortOption],
  );

  const total = usesClientSideSorting ? sortedLibraryQuizzes.length : totalAvailableQuizzes;
  const visibleLibraryQuizzes = usesClientSideSorting
    ? sortedLibraryQuizzes.slice(pageIndex * DEFAULT_PAGE_LIMIT, (pageIndex + 1) * DEFAULT_PAGE_LIMIT)
    : libraryQuizzes;
  const pageCount = Math.max(1, Math.ceil(total / DEFAULT_PAGE_LIMIT));
  const hasActiveSearch = debouncedSearchValue.length > 0;
  const showSearchEmptyState = hasActiveSearch && !loading && total === 0;

  useEffect(() => {
    if (pageIndex <= pageCount - 1) {
      return;
    }

    setPageIndex(Math.max(0, pageCount - 1));
  }, [pageCount, pageIndex]);

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

  const handleClearAllFilters = () => {
    setSelectedLanguages([]);
    setSelectedTags([]);
    setSelectedCreator("");
    setPageIndex(0);
  };

  const paginationProps = {
    pageIndex,
    total,
    pageCount,
    pageSize: DEFAULT_PAGE_LIMIT,
    onFirstPage: () => { setPageIndex(0); },
    onPreviousPage: () => { setPageIndex((prev) => Math.max(0, prev - 1)); },
    onNextPage: () => { setPageIndex((prev) => Math.min(pageCount - 1, prev + 1)); },
    onLastPage: () => { setPageIndex(pageCount - 1); },
  };

  return {
    areFiltersOpen,
    debouncedSearchValue,
    handleClearAllFilters,
    handleCreatorChange,
    handleLanguageChange,
    handleSearchChange,
    handleSortChange,
    handleTagChange,
    handleToggleFilters,
    hasActiveSearch,
    isGridLoading: loading,
    languageOptions,
    pageCount,
    pageIndex,
    paginationProps,
    searchValue,
    selectedCreator,
    selectedLanguages,
    selectedTags,
    showSearchEmptyState,
    sortOption,
    tagOptions,
    total,
    visibleLibraryQuizzes,
  };
};
