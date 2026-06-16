import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { getApps, type App } from "../../../fetch/app";
import {
  DEFAULT_QUESTION_TEMPLATE_SORT,
  DEFAULT_PAGE_LIMIT,
  getQuestionTemplateLanguageOptions,
  getQuestionTemplateTagOptions,
  getQuestionTemplates,
  type LibraryQuestionTemplateDto,
  type QuestionTemplateFilterOption,
  type QuestionTemplateSortOption,
} from "../../../fetch/question_templates";

const SEARCH_DEBOUNCE_DELAY_MS = 300;

export const useQuestionTemplateList = () => {
  const { t } = useTranslation();
  const [questionTemplates, setQuestionTemplates] = useState<
    LibraryQuestionTemplateDto[]
  >([]);
  const [apps, setApps] = useState<App[]>([]);
  const [totalAvailableQuestions, setTotalAvailableQuestions] = useState(0);

  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);

  const [searchValue, setSearchValueState] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [sortOption, setSortOptionState] = useState<QuestionTemplateSortOption>(
    DEFAULT_QUESTION_TEMPLATE_SORT,
  );

  const [areFiltersOpen, setAreFiltersOpen] = useState(false);
  const [selectedLanguages, setSelectedLanguagesState] = useState<string[]>([]);
  const [selectedTags, setSelectedTagsState] = useState<string[]>([]);
  const [selectedAppType, setSelectedAppTypeState] = useState("");
  const [selectedType, setSelectedTypeState] = useState("");

  const [languageOptions, setLanguageOptions] = useState<QuestionTemplateFilterOption[]>([]);
  const [tagOptions, setTagOptions] = useState<QuestionTemplateFilterOption[]>([]);

  useEffect(() => {
    const debounceTimeout = window.setTimeout(() => {
      setDebouncedSearchValue(searchValue.trim());
    }, SEARCH_DEBOUNCE_DELAY_MS);

    return () => {
      window.clearTimeout(debounceTimeout);
    };
  }, [searchValue]);

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
    const loadQuestionTemplates = async () => {
      setLoading(true);

      try {
        const response = await getQuestionTemplates({
          page: pageIndex + 1,
          limit: DEFAULT_PAGE_LIMIT,
          search: debouncedSearchValue,
          sortOption,
          langTagCodes: selectedLanguages,
          tagSlugs: selectedTags,
          appType: selectedAppType || undefined,
          isPhishing: selectedType ? selectedType === "phishing" : undefined,
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
    pageIndex,
    selectedAppType,
    selectedLanguages,
    selectedTags,
    selectedType,
    sortOption,
  ]);

  useEffect(() => {
    if (!areFiltersOpen || (languageOptions.length > 0 && tagOptions.length > 0)) {
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
  }, [areFiltersOpen, languageOptions.length, tagOptions.length]);

  const appOptions = useMemo<QuestionTemplateFilterOption[]>(() => {
    const appTypes = [...new Set(apps.map((app) => app.type).filter(Boolean))];

    return appTypes.map((appType) => ({
      value: appType,
      label: t(`question_library.columns.app.${appType}_type`),
    }));
  }, [apps, t]);

  const total = totalAvailableQuestions;
  const pageCount = Math.max(1, Math.ceil(total / DEFAULT_PAGE_LIMIT));
  const hasActiveFilters =
    selectedLanguages.length > 0 ||
    selectedTags.length > 0 ||
    selectedAppType.length > 0 ||
    selectedType.length > 0;

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

  const setSortOption = (nextSortOption: QuestionTemplateSortOption) => {
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

  const setSelectedAppType = (nextValue: string) => {
    setSelectedAppTypeState(nextValue);
    setPageIndex(0);
  };

  const setSelectedType = (nextValue: string) => {
    setSelectedTypeState(nextValue);
    setPageIndex(0);
  };

  const clearAllFilters = () => {
    setSelectedLanguagesState([]);
    setSelectedTagsState([]);
    setSelectedAppTypeState("");
    setSelectedTypeState("");
    setPageIndex(0);
  };

  const paginationProps = {
    pageIndex,
    total,
    pageCount,
    pageSize: DEFAULT_PAGE_LIMIT,
    onFirstPage: () => {
      setPageIndex(0);
    },
    onPreviousPage: () => {
      setPageIndex((prev) => Math.max(0, prev - 1));
    },
    onNextPage: () => {
      setPageIndex((prev) => Math.min(pageCount - 1, prev + 1));
    },
    onLastPage: () => {
      setPageIndex(pageCount - 1);
    },
  };

  return {
    appOptions,
    apps,
    areFiltersOpen,
    clearAllFilters,
    hasActiveFilters,
    languageOptions,
    loading,
    pageIndex,
    paginationProps,
    questionTemplates,
    searchValue,
    selectedAppType,
    selectedLanguages,
    selectedTags,
    selectedType,
    setSearchValue,
    setSelectedAppType,
    setSelectedLanguages,
    setSelectedTags,
    setSelectedType,
    setSortOption,
    sortOption,
    tagOptions,
    toggleFilters,
    total,
  };
};
