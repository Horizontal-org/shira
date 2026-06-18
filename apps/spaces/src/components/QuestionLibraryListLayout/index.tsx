import { FunctionComponent, useEffect, useMemo, useState } from "react";
import type { RowSelectionState } from "@tanstack/react-table";
import { useNavigate, useLocation } from "react-router-dom";
import { shallow } from "zustand/shallow";
import {
  Box,
  defaultTheme,
  styled,
} from "@horizontal-org/shira-ui";
import { QuestionLibraryFlowManagement } from "../QuestionLibraryFlowManagement";
import { QuestionTemplatePreviewModal } from "../modals/QuestionTemplatePreviewModal";
import {
  addQuestionTemplateToQuiz,
  DEFAULT_PAGE_LIMIT,
} from "../../fetch/question_templates";
import { useStore } from "../../store";
import { QuizSuccessStates } from "../../store/slices/quiz";
import toast from "react-hot-toast";
import { getColumns } from "./components/Columns";
import type { RowType } from "./components/Columns";
import { questionTemplateToRow } from "./components/Columns/questionTemplateToRow";
import { useTranslation } from "react-i18next";
import { useQuestionTemplateList } from "./hooks/useQuestionTemplateList";
import { QuestionTemplateControls } from "./components/QuestionTemplateControls";
import { QuestionTemplateFilters } from "./components/QuestionTemplateFilters";
import { QuestionTemplateResults } from "./components/QuestionTemplateResults";

export const QuestionLibraryListLayout: FunctionComponent = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { quizId?: string } };
  const quizId = state?.quizId;

  const {
    languages,
    setQuizActionSuccess,
    clearActiveQuestion,
  } = useStore(
    (state) => ({
      languages: state.languages,
      setQuizActionSuccess: state.setQuizActionSuccess,
      clearActiveQuestion: state.clearActiveQuestion,
    }),
    shallow,
  );

  const { t } = useTranslation();

  const [preview, setPreview] = useState<RowType | null>(null);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [selectedAppIdsByQuestionId, setSelectedAppIdsByQuestionId] = useState<Record<number, number>>({});
  const {
    appOptions,
    apps,
    areFiltersOpen,
    clearAllFilters,
    debouncedSearchValue,
    hasActiveFilters,
    hasActiveSearch,
    languageOptions,
    loading,
    pageIndex,
    paginationProps,
    questionTemplates,
    searchValue,
    showLoadingIndicator,
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
    showEmptyState,
    sortOption,
    tagOptions,
    toggleFilters,
    total,
  } = useQuestionTemplateList();

  const rows = useMemo(() => {
    const normalized = questionTemplateToRow(questionTemplates, apps, languages);
    const nextRows = normalized.map((row) => {
      const selectedAppId = selectedAppIdsByQuestionId[row.id];

      if (selectedAppId == null) return row;

      const selectedApp = row.apps.find((app) => app.id === selectedAppId);

      if (!selectedApp) return row;

      return {
        ...row,
        app: selectedApp,
      };
    });

    return nextRows;
  }, [apps, languages, questionTemplates, selectedAppIdsByQuestionId]);

  useEffect(() => {
    return () => {
      clearActiveQuestion();
    };
  }, [clearActiveQuestion]);

  useEffect(() => {
    setSelectedAppIdsByQuestionId({});
  }, [questionTemplates]);

  const handlePreview = (row: RowType) => {
    setPreview(row);
  };

  const handleAdd = async (q: RowType) => {
    if (!quizId || q.app.id < 1) {
      toast.error(t("error_messages.add_question_error"), { duration: 3000 });
      return;
    }

    try {
      await addQuestionTemplateToQuiz({
        quizId: parseInt(quizId),
        questionName: q.name,
        content: q.content,
        isPhishing: q.isPhishing,
        appId: q.app.id,
        explanations: q.explanations,
      });

      setQuizActionSuccess(QuizSuccessStates.question_added_from_library);
      navigate(`/quiz/${quizId}`);
    } catch (error) {
      console.error("Error adding question template to quiz:", error);
      toast.error(t("error_messages.add_question_error"), { duration: 3000 });
    }
  };

  const handleSelectApp = (questionId: number, appId: number) => {
    setSelectedAppIdsByQuestionId((prev) => ({
      ...prev,
      [questionId]: appId,
    }));
  };

  const shouldShowPagination = !loading && total > 0;

  const columns = getColumns(
    {
      onPreview: handlePreview,
      onReportIssue: () => navigate("/support"),
      onAdd: handleAdd,
      onSelectApp: handleSelectApp,
      rowOffset: pageIndex * DEFAULT_PAGE_LIMIT,
    },
  );

  return (
    <QuestionLibraryFlowManagement>
      <StyledBox>
        <PageInner>
          <QuestionTemplateControls
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            sortOption={sortOption}
            onSortChange={setSortOption}
            areFiltersOpen={areFiltersOpen}
            onToggleFilters={toggleFilters}
            searchSummary={hasActiveSearch
              ? t(
                total === 1
                  ? "question_library.search_results"
                  : "question_library.search_results_plural",
                {
                  count: total,
                  searchTerm: debouncedSearchValue,
                },
              )
              : undefined}
            filters={(
              <QuestionTemplateFilters
                languageOptions={languageOptions}
                selectedLanguages={selectedLanguages}
                onLanguageChange={setSelectedLanguages}
                tagOptions={tagOptions}
                selectedTags={selectedTags}
                onTagChange={setSelectedTags}
                appOptions={appOptions}
                selectedAppType={selectedAppType}
                onAppTypeChange={setSelectedAppType}
                selectedType={selectedType}
                onTypeChange={setSelectedType}
                hasActiveFilters={hasActiveFilters}
                onClearAll={clearAllFilters}
              />
            )}
          />

          <QuestionTemplateResults
            shouldShowPagination={shouldShowPagination}
            paginationProps={paginationProps}
            showEmptyState={showEmptyState}
            loading={showLoadingIndicator}
            rows={rows}
            columns={columns}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
          />
        </PageInner>

        {preview && (
          <QuestionTemplatePreviewModal
            question={preview}
            onAdd={() => handleAdd(preview)}
            onClose={() => setPreview(null)}
          />
        )}
      </StyledBox>
    </QuestionLibraryFlowManagement>
  );
};

const StyledBox = styled(Box)`
  background: ${defaultTheme.colors.light.paleGrey};
  width: min(${(props) => props.theme.breakpoints.lg}, calc(100% - 32px));
  z-index: 1;
  border: none;
  display: flex;
  flex-direction: column;
  box-shadow: none;
  padding: 0;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    width: calc(100% - 32px);
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    width: calc(100% - 20px);
  }
`;

const PageInner = styled.div`
  padding: 0 8px;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    padding: 0;
  }
`;
