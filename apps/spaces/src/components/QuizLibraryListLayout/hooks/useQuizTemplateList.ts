import { useEffect, useState } from "react";
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

const SEARCH_DEBOUNCE_DELAY_MS = 300;

export const useQuizTemplateList = () => {
  const [libraryQuizzes, setLibraryQuizzes] = useState<LibraryQuizDto[]>([]);
  const [totalAvailableQuizzes, setTotalAvailableQuizzes] = useState(0);

  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);

  const [searchValue, setSearchValueState] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [sortOption, setSortOptionState] = useState<QuizTemplateSortOption>(DEFAULT_QUIZ_TEMPLATE_SORT);

  const [areFiltersOpen, setAreFiltersOpen] = useState(false);
  const [selectedLanguages, setSelectedLanguagesState] = useState<string[]>([]);
  const [selectedTags, setSelectedTagsState] = useState<string[]>([]);
  const [selectedCreator, setSelectedCreatorState] = useState("");

  const [languageOptions, setLanguageOptions] = useState<QuizTemplateFilterOption[]>([]);
  const [tagOptions, setTagOptions] = useState<QuizTemplateFilterOption[]>([]);

  useEffect(() => {
    const debounceTimeout = window.setTimeout(() => {
      setDebouncedSearchValue(searchValue.trim());
    }, SEARCH_DEBOUNCE_DELAY_MS);

    return () => {
      window.clearTimeout(debounceTimeout);
    };
  }, [searchValue]);

  useEffect(() => {
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
  }, [debouncedSearchValue, pageIndex, selectedLanguages, selectedTags, sortOption]);

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

  const total = totalAvailableQuizzes;
  const visibleLibraryQuizzes = libraryQuizzes;

  const pageCount = Math.max(1, Math.ceil(total / DEFAULT_PAGE_LIMIT));
  const hasActiveSearch = debouncedSearchValue.length > 0;
  const hasActiveFilters = selectedLanguages.length > 0
    || selectedTags.length > 0
    || selectedCreator.length > 0;

  const showEmptyState = !loading && total === 0 && (hasActiveSearch || hasActiveFilters);

  useEffect(() => {
    if (pageIndex <= pageCount - 1) {
      return;
    }

    setPageIndex(Math.max(0, pageCount - 1));
  }, [pageCount, pageIndex]);

  const setSearchValue = (value: string) => {
    setSearchValueState(value);
    setPageIndex(0);
  };

  const setSortOption = (nextSortOption: QuizTemplateSortOption) => {
    setSortOptionState(nextSortOption);
    setPageIndex(0);
  };

  const toggleFilters = () => {
    setAreFiltersOpen((prev) => !prev);
  };

  const setSelectedLanguages = (nextValue: string[]) => {
    setSelectedLanguagesState(nextValue);
    setPageIndex(0);
  };

  const setSelectedTags = (nextValue: string[]) => {
    setSelectedTagsState(nextValue);
    setPageIndex(0);
  };

  const setSelectedCreator = (nextValue: string) => {
    setSelectedCreatorState(nextValue);
    setPageIndex(0);
  };

  const clearAllFilters = () => {
    setSelectedLanguagesState([]);
    setSelectedTagsState([]);
    setSelectedCreatorState("");
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
    clearAllFilters,
    hasActiveFilters,
    hasActiveSearch,
    languageOptions,
    loading,
    pageCount,
    pageIndex,
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
  };
};
