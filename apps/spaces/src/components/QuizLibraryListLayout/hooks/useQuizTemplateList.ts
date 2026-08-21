import { type SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DEFAULT_PAGE_LIMIT,
  DEFAULT_QUIZ_TEMPLATE_SORT,
  getQuizTemplateCreators,
  getQuizTemplates,
  type LibraryQuizDto,
  type QuizTemplateSortOption,
} from "../../../fetch/quiz_templates";
import {
  getLibraryLanguageOptions,
  getLibraryTagOptions,
  type LibraryFilterOption,
} from "../../../fetch/library_metadata";
import { type TemplateFilterOption } from "../../LibraryControlsLayout/TemplateFilters";
import { usePaginationProps } from "../../../hooks/usePaginationProps";

const SEARCH_DEBOUNCE_DELAY_MS = 300;

export const useQuizTemplateList = () => {
  const { i18n } = useTranslation();
  const [libraryQuizzes, setLibraryQuizzes] = useState<LibraryQuizDto[]>([]);
  const [totalAvailableQuizzes, setTotalAvailableQuizzes] = useState(0);

  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndexState] = useState(0);

  const [searchValue, setSearchValueState] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [sortOption, setSortOptionState] = useState<QuizTemplateSortOption>(DEFAULT_QUIZ_TEMPLATE_SORT);

  const [areFiltersOpen, setAreFiltersOpen] = useState(false);
  const [selectedLanguages, setSelectedLanguagesState] = useState<string[]>([]);
  const [selectedTags, setSelectedTagsState] = useState<string[]>([]);
  const [selectedCreator, setSelectedCreatorState] = useState("");

  const [languageOptions, setLanguageOptions] = useState<LibraryFilterOption[]>([]);
  const [tagOptions, setTagOptions] = useState<LibraryFilterOption[]>([]);
  const [creatorOptions, setCreatorOptions] = useState<TemplateFilterOption[]>([]);

  useEffect(() => {
    const debounceTimeout = window.setTimeout(() => {
      setDebouncedSearchValue(searchValue.trim());
    }, SEARCH_DEBOUNCE_DELAY_MS);

    return () => {
      window.clearTimeout(debounceTimeout);
    };
  }, [searchValue]);

  useEffect(() => {
    let isCurrentRequest = true;

    const loadQuizzes = async () => {
      setLoading(true);

      try {
        const response = await getQuizTemplates({
          page: pageIndex + 1,
          search: debouncedSearchValue,
          sortOption,
          langTagCodes: selectedLanguages,
          tagSlugs: selectedTags,
          author: selectedCreator,
        });

        if (!isCurrentRequest) {
          return;
        }

        setLibraryQuizzes(response.data);
        setTotalAvailableQuizzes(response.total);
        setPageIndexState((currentPageIndex) => {
          const nextPageIndex = Math.max(0, response.page - 1);
          return currentPageIndex === nextPageIndex
            ? currentPageIndex
            : nextPageIndex;
        });
      } catch (error) {
        if (isCurrentRequest) {
          console.error("Failed to get library quizzes:", error);
        }
      } finally {
        if (isCurrentRequest) {
          setLoading(false);
        }
      }
    };

    loadQuizzes();

    return () => {
      isCurrentRequest = false;
    };
  }, [debouncedSearchValue, i18n.language, pageIndex, selectedCreator, selectedLanguages, selectedTags, sortOption]);

  useEffect(() => {
    setLanguageOptions([]);
    setTagOptions([]);
  }, [i18n.language]);

  useEffect(() => {
    if (!areFiltersOpen || (languageOptions.length > 0 && tagOptions.length > 0 && creatorOptions.length > 0)) {
      return;
    }

    const loadFilterOptions = async () => {
      try {
        const [nextLanguageOptions, nextTagOptions, nextCreators] = await Promise.all([
          getLibraryLanguageOptions(),
          getLibraryTagOptions(),
          getQuizTemplateCreators(),
        ]);

        setLanguageOptions(nextLanguageOptions);
        setTagOptions(nextTagOptions);
        setCreatorOptions(nextCreators.map((creator) => ({
          value: creator.publicSpaceId,
          label: creator.displayName.trim(),
        })));
      } catch (error) {
        console.error("Failed to get quiz template filter options:", error);
      }
    };

    loadFilterOptions();
  }, [areFiltersOpen, creatorOptions.length, i18n.language, languageOptions.length, tagOptions.length]);

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

    setPageIndexState(Math.max(0, pageCount - 1));
  }, [pageCount, pageIndex]);

  const setPageIndex = (nextPageIndex: SetStateAction<number>) => {
    setLoading(true);
    setPageIndexState(nextPageIndex);
  };

  const setSearchValue = (value: string) => {
    setLoading(true);
    setSearchValueState(value);
    setPageIndexState(0);
  };

  const setSortOption = (nextSortOption: QuizTemplateSortOption) => {
    setLoading(true);
    setSortOptionState(nextSortOption);
    setPageIndexState(0);
  };

  const toggleFilters = () => {
    setAreFiltersOpen((prev) => !prev);
  };

  const setSelectedLanguages = (nextValue: string[]) => {
    setLoading(true);
    setSelectedLanguagesState(nextValue);
    setPageIndexState(0);
  };

  const setSelectedTags = (nextValue: string[]) => {
    setLoading(true);
    setSelectedTagsState(nextValue);
    setPageIndexState(0);
  };

  const setSelectedCreator = (nextValue: string) => {
    setLoading(true);
    setSelectedCreatorState(nextValue);
    setPageIndexState(0);
  };

  const clearAllFilters = () => {
    setLoading(true);
    setSelectedLanguagesState([]);
    setSelectedTagsState([]);
    setSelectedCreatorState("");
    setPageIndexState(0);
  };

  const paginationProps = usePaginationProps({
    pageIndex,
    pageCount,
    pageSize: DEFAULT_PAGE_LIMIT,
    setPageIndex,
    total,
  });

  return {
    areFiltersOpen,
    debouncedSearchValue,
    clearAllFilters,
    creatorOptions,
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
