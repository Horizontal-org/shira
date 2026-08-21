import { type SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getApps, type App } from "../../../fetch/app";
import {
  DEFAULT_PAGE_LIMIT,
  DEFAULT_QUESTION_TEMPLATE_SORT,
  getQuestionTemplates,
  type LibraryQuestionTemplateDto,
  type QuestionTemplateFilterOption,
  type QuestionTemplateSortOption,
} from "../../../fetch/question_templates";
import { usePaginationProps } from "../../../hooks/usePaginationProps";
import { useDebouncedValue } from "./useDebouncedValue";
import { useQuestionTemplateFilterOptions } from "./useQuestionTemplateFilterOptions";
import { useQuestionTemplateFilters } from "./useQuestionTemplateFilters";

export const useQuestionTemplateList = () => {
  const { t, i18n } = useTranslation();
  const [questionTemplates, setQuestionTemplates] = useState<LibraryQuestionTemplateDto[]>([]);
  const [apps, setApps] = useState<App[]>([]);
  const [totalAvailableQuestions, setTotalAvailableQuestions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndexState] = useState(0);
  const [searchValue, setSearchValueState] = useState("");
  const [sortOption, setSortOptionState] = useState<QuestionTemplateSortOption>(DEFAULT_QUESTION_TEMPLATE_SORT);

  const debouncedSearchValue = useDebouncedValue(searchValue.trim());

  const filters = useQuestionTemplateFilters(() => {
    setLoading(true);
    setPageIndexState(0);
  });
  const { languageOptions, tagOptions } = useQuestionTemplateFilterOptions(filters.areFiltersOpen);

  useEffect(() => {
    const loadApps = async () => {
      try {
        const apps = await getApps();
        setApps(apps ?? []);
      } catch (error) {
        console.error("Failed to get apps for question templates:", error);
      }
    };

    loadApps();
  }, []);

  const total = totalAvailableQuestions;
  const pageCount = Math.max(1, Math.ceil(total / DEFAULT_PAGE_LIMIT));

  const hasActiveSearch = debouncedSearchValue.length > 0;
  const showEmptyState = !loading && total === 0 && (hasActiveSearch || filters.hasActiveFilters);

  const appTypes = apps
    .map((app) => app.type)
    .filter((type) => type.length > 0)
    .filter((type, index, types) => types.indexOf(type) === index);

  const appOptions: QuestionTemplateFilterOption[] = appTypes.map((appType) => ({
    value: appType,
    label: t(`question_library.columns.app.${appType}_type`),
  }));

  useEffect(() => {
    const loadQuestionTemplates = async () => {

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

        setPageIndexState((currentPageIndex) => {
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
    i18n.language,
  ]);

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

  const setSortOption = (nextSortOption: QuestionTemplateSortOption) => {
    setLoading(true);
    setSortOptionState(nextSortOption);
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
    ...filters,
    appOptions,
    apps,
    debouncedSearchValue,
    hasActiveSearch,
    languageOptions,
    loading,
    paginationProps,
    pageIndex,
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
