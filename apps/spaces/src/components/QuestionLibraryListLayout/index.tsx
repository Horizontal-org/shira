import { FunctionComponent, useEffect, useMemo, useState } from "react";
import type { RowSelectionState } from "@tanstack/react-table";
import { useNavigate, useLocation } from "react-router-dom";
import { shallow } from "zustand/shallow";
import {
  Body4,
  Box,
  CardPagination,
  FilterSelect,
  type FilterSelectProps,
  LibraryFilterToggleButton,
  LibrarySearchInput,
  LibrarySortSelect,
  Table,
  defaultTheme,
  styled,
} from "@horizontal-org/shira-ui";
import { QuestionLibraryFlowManagement } from "../QuestionLibraryFlowManagement";
import { QuestionLibraryPreviewModal } from "../modals/QuestionLibraryPreviewModal";
import {
  addQuestionTemplateToQuiz,
  DEFAULT_PAGE_LIMIT,
  type QuestionTemplateSortOption,
} from "../../fetch/question_templates";
import { useStore } from "../../store";
import { QuizSuccessStates } from "../../store/slices/quiz";
import toast from "react-hot-toast";
import { getColumns } from "./components/Columns";
import type { RowType } from "./components/Columns";
import { libraryQuestionToRow } from "./components/Columns/libraryQuestionToRow";
import { useTranslation } from "react-i18next";
import { HiFunnel } from "react-icons/hi2";
import { FaRegFaceMeh } from "react-icons/fa6";
import { IoAppsSharp, IoLanguage } from "react-icons/io5";
import { BiSolidTagAlt } from "react-icons/bi";
import { FiX } from "react-icons/fi";
import { useQuestionTemplateList } from "./hooks/useQuestionTemplateList";

type FilterOption = {
  value: string;
  label: string;
};

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
  const [rows, setRows] = useState<RowType[]>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const {
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
  } = useQuestionTemplateList();

  useEffect(() => {
    const normalized = libraryQuestionToRow(questionTemplates, apps, languages);
    setRows(normalized);
  }, [apps, languages, questionTemplates]);

  useEffect(() => {
    return () => {
      clearActiveQuestion();
    };
  }, [clearActiveQuestion]);

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
    setRows((prev) =>
      prev.map((r) => {
        if (r.id !== questionId) return r;
        const picked = r.apps.find((av) => av.id === appId);
        if (!picked) return r;
        return {
          ...r,
          app: { id: picked.id, name: picked.name, type: picked.type },
        };
      }),
    );
  };

  const typeOptions = useMemo<FilterOption[]>(
    () => [
      {
        value: "phishing",
        label: t("question_library.columns.type.phishing"),
      },
      {
        value: "legitimate",
        label: t("question_library.columns.type.legitimate"),
      },
    ],
    [t],
  );

  const getSelectedLabel = (
    options: FilterOption[],
    selectedValues: string[],
    selectedCountLabel: string,
  ) => {
    if (selectedValues.length === 0) {
      return;
    }

    if (selectedValues.length === 1) {
      return (
        options.find((option) => option.value === selectedValues[0])?.label ??
        selectedValues[0]
      );
    }

    return selectedCountLabel;
  };

  const sortOptions = [
    {
      value: "createdAt-desc",
      label: t("question_library.sort_options.newest_to_oldest"),
    },
    {
      value: "createdAt-asc",
      label: t("question_library.sort_options.oldest_to_newest"),
    },
    {
      value: "title-asc",
      label: t("question_library.sort_options.question_name_asc"),
    },
    {
      value: "title-desc",
      label: t("question_library.sort_options.question_name_desc"),
    },
  ];
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
        <Controls>
          <ControlsTopRow>
            <SearchColumn>
              <LibrarySearchInput
                value={searchValue}
                onChange={setSearchValue}
                placeholder={t("question_library.search_placeholder")}
              />
            </SearchColumn>

            <ActionsGroup>
              <LibrarySortSelect
                value={sortOption}
                options={sortOptions}
                prefix={`${t("question_library.sort_by")}:`}
                ariaLabel={t("question_library.sort_by")}
                onChange={(nextValue) =>
                  setSortOption(nextValue as QuestionTemplateSortOption)
                }
              />

              <LibraryFilterToggleButton
                text={t("question_library.filters")}
                isOpen={areFiltersOpen}
                onClick={toggleFilters}
              />
            </ActionsGroup>
          </ControlsTopRow>

          {areFiltersOpen && (
            <FiltersRow>
              <FiltersIcon>
                <HiFunnel
                  size={18}
                  color={defaultTheme.colors.dark.mediumGrey}
                />
              </FiltersIcon>

              <StyledFilterSelect
                value={selectedLanguages}
                options={languageOptions}
                placeholder={t("question_library.filters_panel.language")}
                ariaLabel={t("question_library.filters_panel.language")}
                leftIcon={
                  <IoLanguage size={10} color={defaultTheme.colors.blue6} />
                }
                isMulti={true}
                selectedLabel={getSelectedLabel(
                  languageOptions,
                  selectedLanguages,
                  t("question_library.filters_panel.selected_count", {
                    count: selectedLanguages.length,
                  }),
                )}
                onChange={(value) => setSelectedLanguages(value as string[])}
                onClear={() => setSelectedLanguages([])}
              />

              <StyledFilterSelect
                value={selectedTags}
                options={tagOptions}
                placeholder={t("question_library.filters_panel.tag")}
                ariaLabel={t("question_library.filters_panel.tag")}
                leftIcon={
                  <BiSolidTagAlt
                    size={10}
                    color={defaultTheme.colors.warning4}
                  />
                }
                isMulti={true}
                selectedLabel={getSelectedLabel(
                  tagOptions,
                  selectedTags,
                  t("question_library.filters_panel.selected_count", {
                    count: selectedTags.length,
                  }),
                )}
                onChange={(value) => setSelectedTags(value as string[])}
                onClear={() => setSelectedTags([])}
              />

              <StyledFilterSelect
                value={selectedAppType}
                options={appOptions}
                placeholder={t("question_library.filters_panel.apps")}
                ariaLabel={t("question_library.filters_panel.apps")}
                leftIcon={
                  <IoAppsSharp size={10} color={defaultTheme.colors.blue6} />
                }
                selectedLabel={
                  appOptions.find((option) => option.value === selectedAppType)
                    ?.label
                }
                onChange={(value) => setSelectedAppType(value as string)}
                onClear={() => setSelectedAppType("")}
              />

              <StyledFilterSelect
                value={selectedType}
                options={typeOptions}
                placeholder={t("question_library.filters_panel.type")}
                ariaLabel={t("question_library.filters_panel.type")}
                leftIcon={
                  <FaRegFaceMeh
                    size={11}
                    color={defaultTheme.colors.dark.darkGrey}
                  />
                }
                selectedLabel={
                  typeOptions.find((option) => option.value === selectedType)
                    ?.label
                }
                onChange={(value) => setSelectedType(value as string)}
                onClear={() => setSelectedType("")}
              />

              {hasActiveFilters && (
                <ClearAllButton onClick={clearAllFilters}>
                  <FiX size={16} />
                  <Body4>{t("question_library.filters_panel.clear_all")}</Body4>
                </ClearAllButton>
              )}
            </FiltersRow>
          )}
        </Controls>

        {shouldShowPagination && (
          <PaginationWrapper>
            <CardPagination {...paginationProps} />
          </PaginationWrapper>
        )}

        <TableWrapper>
          <Table
            size="full"
            loading={loading}
            loadingMessage={t("loading_messages.loading_library_questions")}
            emptyMessage={t("success_messages.no_questions_found")}
            data={rows}
            columns={columns}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            enableRowSelection={false}
            enablePagination={false}
            colGroups={
              <colgroup>
                <col style={{ width: "4%" }} />
                <col style={{ width: "24%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "11%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "14%" }} />
                <col style={{ width: "10%" }} />
              </colgroup>
            }
          />
        </TableWrapper>

        {preview && (
          <QuestionLibraryPreviewModal
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

const Controls = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ControlsTopRow = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: ${defaultTheme.colors.dark.black};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchColumn = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  max-width: 628px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    width: 100%;
    max-width: none;
    min-width: 0;
  }
`;

const ActionsGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-left: auto;
  flex-shrink: 0;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    width: 100%;
    margin-left: 0;
  }
`;

const FiltersRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
  margin-left: auto;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    width: 100%;
    margin-left: 0;
    flex-wrap: wrap;
  }
`;

const FiltersIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
`;

const StyledFilterSelect = styled(FilterSelect) <FilterSelectProps>`
  min-width: 160px;
  max-width: 200px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex: 1 1 100%;
    max-width: none;
  }
`;

const ClearAllButton = styled.button`
  -webkit-appearance: none;
  min-height: 30px;
  padding: 0 10px;
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.colors.dark.darkGrey};
  background: transparent;
  color: ${(props) => props.theme.colors.dark.darkGrey};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
`;

const PaginationWrapper = styled.div`
  padding: 0 16px;
`;

const TableWrapper = styled("div")`
  overflow: visible;

  & table td {
    padding: 13px 16px;
  }

  & table th {
    padding-bottom: 10px;
    font-size: 14px;
  }

  & table tbody tr:hover td {
    background: ${defaultTheme.colors.light.white};
  }
`;
