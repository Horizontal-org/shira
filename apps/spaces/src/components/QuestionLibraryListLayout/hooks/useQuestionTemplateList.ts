import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { getApps, type App } from "../../../fetch/app";
import {
  DEFAULT_PAGE_LIMIT,
  DEFAULT_QUESTION_TEMPLATE_SORT,
  getQuestionTemplateLanguageOptions,
  getQuestionTemplateTagOptions,
  getQuestionTemplates,
  type LibraryQuestionTemplateDto,
  type QuestionTemplateFilterOption,
  type QuestionTemplateSortOption,
} from "../../../fetch/question_templates";
import { useDebouncedValue } from "./useDebouncedValue";
import { useQuestionTemplateFilters } from "./useQuestionTemplateFilters";

const SEARCH_DEBOUNCE_DELAY_MS = 300;

export const useQuestionTemplateList = () => {
  const { t } = useTranslation();
  const [questionTemplates, setQuestionTemplates] = useState<LibraryQuestionTemplateDto[]>([]);
  const [apps, setApps] = useState<App[]>([]);
  const [totalAvailableQuestions, setTotalAvailableQuestions] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [searchValue, setSearchValueState] = useState("");
  const [sortOption, setSortOptionState] = useState<QuestionTemplateSortOption>(
    DEFAULT_QUESTION_TEMPLATE_SORT,
  );
  const [languageOptions, setLanguageOptions] = useState<QuestionTemplateFilterOption[]>([]);
  const [tagOptions, setTagOptions] = useState<QuestionTemplateFilterOption[]>([]);

  const resetPagination = () => setPageIndex(0);

  const debouncedSearchValue = useDebouncedValue(
    searchValue.trim(),
    SEARCH_DEBOUNCE_DELAY_MS,
  );

  const filters = useQuestionTemplateFilters(resetPagination);

  useEffect(() => {
    const loadApps = async () => {
      try {
        const nextApps = await getApps();
        setApps(nextApps ?? []);
      } catch (error) {
        console.error("Failed to get apps for question templates:", error);
      }
    };

    loadApps();
  }, []);

  useEffect(() => {
    if (!filters.areFiltersOpen || (languageOptions.length > 0 && tagOptions.length > 0)) {
      return;
    }

    const loadFilterOptions = async () => {
      try {
        const [nextLanguageOptions, nextTagOptions] = await Promise.all([
          getQuestionTemplateLanguageOptions(),
          getQuestionTemplateTagOptions(),
        ]);

        setLanguageOptions(nextLanguageOptions);
        setTagOptions(nextTagOptions);
      } catch (error) {
        console.error("Failed to get question template filter options:", error);
      }
    };

    loadFilterOptions();
  }, [filters.areFiltersOpen, languageOptions.length, tagOptions.length]);

  const total = totalAvailableQuestions;
  const pageCount = Math.max(1, Math.ceil(total / DEFAULT_PAGE_LIMIT));

  const hasActiveSearch = debouncedSearchValue.length > 0;
  const showEmptyState = !loading && total === 0 && (hasActiveSearch || filters.hasActiveFilters);

  const appOptions = useMemo<QuestionTemplateFilterOption[]>(() => {
    const appTypes = [...new Set(apps.map((app) => app.type).filter(Boolean))];

    return appTypes.map((appType) => ({
      value: appType,
      label: t(`question_library.columns.app.${appType}_type`),
    }));
  }, [apps, t]);

  useEffect(() => {
    const loadQuestionTemplates = async () => {
      setLoading(true);

      try {
        const response = await getQuestionTemplates({
          page: pageIndex + 1,
          limit: DEFAULT_PAGE_LIMIT,
          search: debouncedSearchValue,
          sortOption,
          langTagCodes: filters.selectedLanguages,
          tagSlugs: filters.selectedTags,
          appType: filters.selectedAppType,
          isPhishing: filters.selectedType
            ? filters.selectedType === "phishing"
            : undefined,
        });

        setQuestionTemplates(response.data);
        setTotalAvailableQuestions(response.total);

        setPageIndex((currentPageIndex) => {
          const nextPageIndex = Math.max(0, response.page - 1);
          return currentPageIndex === nextPageIndex
            ? currentPageIndex
            : nextPageIndex;
        });
      } catch (error) {
        console.error("Failed to get question templates:", error);
      } finally {
        setLoading(false);
      }
    };

    loadQuestionTemplates();
  }, [
    debouncedSearchValue,
    filters.selectedAppType,
    filters.selectedLanguages,
    filters.selectedTags,
    filters.selectedType,
    pageIndex,
    sortOption,
  ]);

  useEffect(() => {
    if (pageIndex <= pageCount - 1) {
      return;
    }

    setPageIndex(Math.max(0, pageCount - 1));
  }, [pageCount, pageIndex]);

  const setSearchValue = (value: string) => {
    setSearchValueState(value);
    resetPagination();
  };

  const setSortOption = (nextSortOption: QuestionTemplateSortOption) => {
    setSortOptionState(nextSortOption);
    resetPagination();
  };

  return {
    ...filters,
    appOptions,
    apps,
    debouncedSearchValue,
    hasActiveSearch,
    languageOptions,
    loading,
    pageIndex,
    paginationProps: {
      pageIndex,
      total,
      pageCount,
      pageSize: DEFAULT_PAGE_LIMIT,
      onFirstPage: () => setPageIndex(0),
      onPreviousPage: () => setPageIndex((prev) => Math.max(0, prev - 1)),
      onNextPage: () => setPageIndex((prev) => Math.min(pageCount - 1, prev + 1)),
      onLastPage: () => setPageIndex(pageCount - 1),
    },
    questionTemplates,
    searchValue,
    setSearchValue,
    setSortOption,
    showEmptyState,
    sortOption,
    tagOptions,
    total,
  };
};
