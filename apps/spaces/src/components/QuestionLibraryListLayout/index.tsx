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
  FilterToggleButton,
  LibrarySearchInput,
  SortSelect,
  Table,
  defaultTheme,
  styled,
} from "@horizontal-org/shira-ui";
import { QuestionLibraryFlowManagement } from "../QuestionLibraryFlowManagement";
import { QuestionLibraryPreviewModal } from "../modals/QuestionLibraryPreviewModal";
import { getApps } from "../../fetch/app";
import {
  getQuestionTemplates,
  QuestionTemplateFeedback,
  useQuestionTemplateCRUD,
} from "../../fetch/question_templates";
import type { ActiveQuestion } from "../../store/types/active_question";
import { useStore } from "../../store";
import { libraryToActiveQuestion } from "../../utils/active_question/libraryToActiveQuestion";
import { QuizSuccessStates } from "../../store/slices/quiz";
import toast from "react-hot-toast";
import { getColumns } from "./components/Columns";
import type { RowType } from "./components/Columns";
import { libraryQuestionToRow } from "./components/Columns/libraryQuestionToRow";
import { useTranslation } from "react-i18next";
import { HiFunnel } from "react-icons/hi2";
import { FaUserLarge } from "react-icons/fa6";
import { IoAppsSharp, IoLanguage } from "react-icons/io5";
import { BiSolidTagAlt } from "react-icons/bi";
import { MdOutlinePhishing } from "react-icons/md";
import { FiX } from "react-icons/fi";

type Props = {
  rows?: RowType[];
  onRowsChange?: (next: RowType[]) => void;
};

type QuestionSortOption = "id-desc" | "id-asc" | "name-asc" | "name-desc";
type FilterOption = {
  value: string;
  label: string;
};

const PAGE_SIZE = 20;

export const QuestionLibraryListLayout: FunctionComponent<Props> = ({ rows: rowsProp }) => {
  const controlled = rowsProp !== undefined;

  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { quizId?: string } };
  const quizId = state?.quizId;
  const { actionFeedback, addToQuiz } = useQuestionTemplateCRUD();
  const {
    languages,
    setQuizActionSuccess,
    setActiveQuestion,
    clearActiveQuestion
  } = useStore((state) => ({
    languages: state.languages,
    setQuizActionSuccess: state.setQuizActionSuccess,
    setActiveQuestion: state.setActiveQuestion,
    clearActiveQuestion: state.clearActiveQuestion,
  }), shallow)

  const { t } = useTranslation();

  const [preview, setPreview] = useState<{ active: ActiveQuestion; original: RowType }>(null);
  const [rows, setRows] = useState<RowType[]>(rowsProp ?? []);
  const [loading, setLoading] = useState(false);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [searchValue, setSearchValue] = useState("");
  const [sortOption, setSortOption] = useState<QuestionSortOption>("id-desc");
  const [areFiltersOpen, setAreFiltersOpen] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCreator, setSelectedCreator] = useState("");
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState("");
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    if (actionFeedback === QuestionTemplateFeedback.Success) {
      setQuizActionSuccess(QuizSuccessStates.question_added_from_library);
      navigate(`/quiz/${quizId}`);
      return;
    }
    if (actionFeedback === QuestionTemplateFeedback.Error) {
      toast.error(t('error_messages.add_question_error'), { duration: 3000 });
    }
  }, [actionFeedback, navigate, quizId, setQuizActionSuccess, t]);

  useEffect(() => {
    if (controlled) {
      setRows(rowsProp ?? []);
      return;
    }

    (async () => {
      setLoading(true);
      try {
        if (!languages) {
          return;
        }

        const [questionTemplatesPage, apps] = await Promise.all([
          getQuestionTemplates({ page: 1, limit: 1000 }),
          getApps(),
        ]);

        const normalized = libraryQuestionToRow(
          questionTemplatesPage.data,
          apps ?? [],
          languages,
        );
        setRows(normalized);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [controlled, languages, rowsProp]);

  useEffect(() => {
    return () => {
      clearActiveQuestion();
    };
  }, [clearActiveQuestion]);

  const handlePreview = (row: RowType) => {
    const active = libraryToActiveQuestion(row);
    setActiveQuestion(active);
    setPreview({ active, original: row });
  };

  const handleAdd = (q: RowType) => {
    if (!quizId || q.app.id < 1) {
      toast.error(t('error_messages.add_question_error'), { duration: 3000 });
      return;
    }

    addToQuiz({
      quizId: parseInt(quizId),
      questionName: q.name,
      content: q.content,
      isPhishing: q.isPhishing,
      appId: q.app.id,
      explanations: q.explanations,
    });
  };

  const handleSelectLanguage = (questionId: number, languageId: number) => {
    setRows((prev) =>
      prev.map((r) => {
        if (r.id !== questionId) return r;
        const picked = r.languages.find((lv) => lv.id === languageId);
        if (!picked) return r;
        return {
          ...r,
          language: { id: picked.id, name: picked.name },
          content: picked.content,
          explanations: picked.explanations,
          languageSelected: true,
        };
      })
    );
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
          appSelected: true,
        };
      })
    );
  }

  const normalizedSearchValue = searchValue.trim().toLowerCase();

  const languageOptions = useMemo<FilterOption[]>(() => {
    const languagesByName = new Map<string, string>();

    rows.forEach((row) => {
      row.languages.forEach((language) => {
        languagesByName.set(language.name, language.name);
      });
    });

    return [...languagesByName.entries()]
      .sort(([first], [second]) => first.localeCompare(second))
      .map(([value, label]) => ({ value, label }));
  }, [rows]);

  const creatorOptions = useMemo<FilterOption[]>(() => {
    const creators = new Set(rows.map((row) => row.creator ?? "Shira team"));

    return [...creators]
      .sort((first, second) => first.localeCompare(second))
      .map((creator) => ({ value: creator, label: creator }));
  }, [rows]);

  const appOptions = useMemo<FilterOption[]>(() => {
    const appsByName = new Map<string, string>();

    rows.forEach((row) => {
      row.apps.forEach((app) => {
        appsByName.set(app.name, app.name);
      });
    });

    return [...appsByName.entries()]
      .sort(([first], [second]) => first.localeCompare(second))
      .map(([value, label]) => ({ value, label }));
  }, [rows]);

  const typeOptions = useMemo<FilterOption[]>(() => [
    {
      value: "phishing",
      label: t("question_library.columns.type.phishing"),
    },
    {
      value: "legitimate",
      label: t("question_library.columns.type.legitimate"),
    },
  ], [t]);

  const tagOptions = useMemo<FilterOption[]>(() => {
    const tagsByName = new Map<string, string>();

    rows.forEach((row) => {
      row.tags?.forEach((tag) => {
        tagsByName.set(tag, tag);
      });
    });

    return [...tagsByName.entries()]
      .sort(([first], [second]) => first.localeCompare(second))
      .map(([value, label]) => ({ value, label }));
  }, [rows]);

  const getSelectedLabel = (
    options: FilterOption[],
    selectedValues: string[],
    selectedCountLabel: string,
  ) => {
    if (selectedValues.length === 0) {
      return;
    }

    if (selectedValues.length === 1) {
      return options.find((option) => option.value === selectedValues[0])?.label ?? selectedValues[0];
    }

    return selectedCountLabel;
  };

  const hasActiveFilters = selectedLanguages.length > 0
    || selectedTags.length > 0
    || selectedCreator.length > 0
    || selectedApps.length > 0
    || selectedType.length > 0;

  const clearAllFilters = () => {
    setSelectedLanguages([]);
    setSelectedTags([]);
    setSelectedCreator("");
    setSelectedApps([]);
    setSelectedType("");
  };

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesSearch = !normalizedSearchValue
        || row.name.toLowerCase().includes(normalizedSearchValue)
        || row.creator?.toLowerCase().includes(normalizedSearchValue)
        || row.language?.name?.toLowerCase().includes(normalizedSearchValue)
        || row.app?.name?.toLowerCase().includes(normalizedSearchValue);

      const matchesLanguage = selectedLanguages.length === 0
        || row.languages.some((language) => selectedLanguages.includes(language.name));

      const matchesCreator = !selectedCreator
        || (row.creator ?? "Shira team") === selectedCreator;

      const matchesTag = selectedTags.length === 0
        || row.tags?.some((tag) => selectedTags.includes(tag));

      const matchesApp = selectedApps.length === 0
        || row.apps.some((app) => selectedApps.includes(app.name));

      const matchesType = !selectedType
        || (selectedType === "phishing" ? row.isPhishing : !row.isPhishing);

      return matchesSearch
        && matchesLanguage
        && matchesCreator
        && matchesTag
        && matchesApp
        && matchesType;
    });
  }, [normalizedSearchValue, rows, selectedApps, selectedCreator, selectedLanguages, selectedTags, selectedType]);

  const sortedRows = useMemo(() => {
    return [...filteredRows].sort((a, b) => {
      switch (sortOption) {
        case "id-asc":
          return new Date(a.createdAt ?? 0).getTime() - new Date(b.createdAt ?? 0).getTime();
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "id-desc":
        default:
          return new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime();
      }
    });
  }, [filteredRows, sortOption]);

  const total = sortedRows.length;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const visibleRows = sortedRows.slice(pageIndex * PAGE_SIZE, (pageIndex + 1) * PAGE_SIZE);

  useEffect(() => {
    setPageIndex(0);
  }, [normalizedSearchValue, selectedApps, selectedCreator, selectedLanguages, selectedTags, selectedType, sortOption]);

  useEffect(() => {
    if (pageIndex <= pageCount - 1) {
      return;
    }

    setPageIndex(Math.max(0, pageCount - 1));
  }, [pageCount, pageIndex]);

  const sortOptions = [
    { value: "id-desc", label: t("question_library.sort_options.newest_to_oldest") },
    { value: "id-asc", label: t("question_library.sort_options.oldest_to_newest") },
    { value: "name-asc", label: t("question_library.sort_options.question_name_asc") },
    { value: "name-desc", label: t("question_library.sort_options.question_name_desc") },
  ];

  const columns = getColumns({
    onPreview: handlePreview,
    onAdd: handleAdd,
    onSelectLanguage: handleSelectLanguage,
    onSelectApp: handleSelectApp,
    rowOffset: pageIndex * PAGE_SIZE,
  }, t);

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
              <StyledSortSelect
                value={sortOption}
                options={sortOptions}
                prefix={`${t("question_library.sort_by")}:`}
                ariaLabel={t("question_library.sort_by")}
                onChange={(nextValue) => setSortOption(nextValue as QuestionSortOption)}
              />

              <StyledFilterToggleButton
                text={t("question_library.filters")}
                isOpen={areFiltersOpen}
                onClick={() => setAreFiltersOpen((current) => !current)}
              />
            </ActionsGroup>
          </ControlsTopRow>

          {areFiltersOpen && (
            <FiltersRow>
              <FiltersIcon>
                <HiFunnel size={18} color={defaultTheme.colors.dark.mediumGrey} />
              </FiltersIcon>

              <StyledFilterSelect
                value={selectedLanguages}
                options={languageOptions}
                placeholder={t("question_library.filters_panel.language")}
                ariaLabel={t("question_library.filters_panel.language")}
                leftIcon={<IoLanguage size={10} color={defaultTheme.colors.blue6} />}
                isMulti={true}
                selectedLabel={getSelectedLabel(
                  languageOptions,
                  selectedLanguages,
                  t("question_library.filters_panel.selected_count", { count: selectedLanguages.length }),
                )}
                onChange={(value) => setSelectedLanguages(value as string[])}
                onClear={() => setSelectedLanguages([])}
              />

              <StyledFilterSelect
                value={selectedTags}
                options={tagOptions}
                placeholder={t("question_library.filters_panel.tag")}
                ariaLabel={t("question_library.filters_panel.tag")}
                leftIcon={<BiSolidTagAlt size={10} color={defaultTheme.colors.warning4} />}
                isMulti={true}
                selectedLabel={getSelectedLabel(
                  tagOptions,
                  selectedTags,
                  t("question_library.filters_panel.selected_count", { count: selectedTags.length }),
                )}
                onChange={(value) => setSelectedTags(value as string[])}
                onClear={() => setSelectedTags([])}
              />

              <StyledFilterSelect
                value={selectedCreator}
                options={creatorOptions}
                placeholder={t("question_library.filters_panel.creator")}
                ariaLabel={t("question_library.filters_panel.creator")}
                leftIcon={<FaUserLarge size={10} color={defaultTheme.colors.green7} />}
                selectedLabel={selectedCreator}
                onChange={(value) => setSelectedCreator(value as string)}
                onClear={() => setSelectedCreator("")}
              />

              <StyledFilterSelect
                value={selectedApps}
                options={appOptions}
                placeholder={t("question_library.filters_panel.apps")}
                ariaLabel={t("question_library.filters_panel.apps")}
                leftIcon={<IoAppsSharp size={10} color={defaultTheme.colors.blue6} />}
                isMulti={true}
                selectedLabel={getSelectedLabel(
                  appOptions,
                  selectedApps,
                  t("question_library.filters_panel.selected_count", { count: selectedApps.length }),
                )}
                onChange={(value) => setSelectedApps(value as string[])}
                onClear={() => setSelectedApps([])}
              />

              <StyledFilterSelect
                value={selectedType}
                options={typeOptions}
                placeholder={t("question_library.filters_panel.type")}
                ariaLabel={t("question_library.filters_panel.type")}
                leftIcon={<MdOutlinePhishing size={10} color={defaultTheme.colors.dark.mediumGrey} />}
                selectedLabel={typeOptions.find((option) => option.value === selectedType)?.label}
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

        {!loading && (
          <PaginationWrapper>
            <CardPagination
              pageIndex={pageIndex}
              pageCount={pageCount}
              pageSize={PAGE_SIZE}
              total={total}
              onFirstPage={() => setPageIndex(0)}
              onPreviousPage={() => setPageIndex((prev) => Math.max(0, prev - 1))}
              onNextPage={() => setPageIndex((prev) => Math.min(pageCount - 1, prev + 1))}
              onLastPage={() => setPageIndex(pageCount - 1)}
            />
          </PaginationWrapper>
        )}

        <TableWrapper>
          <Table
            size="full"
            loading={loading}
            loadingMessage={t('loading_messages.loading_library_questions')}
            emptyMessage={t('success_messages.no_questions_found')}
            data={visibleRows}
            columns={columns}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            enableRowSelection={false}
            enablePagination={false}
            colGroups={(
              <colgroup>
                <col style={{ width: "4%" }} />
                <col style={{ width: "24%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "11%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "13%" }} />
                <col style={{ width: "16%" }} />
                <col style={{ width: "8%" }} />
              </colgroup>
            )}
          />
        </TableWrapper>

        {preview && (
          <QuestionLibraryPreviewModal
            question={preview.original}
            onAdd={() => handleAdd(preview.original)}
            explanations={preview.original.explanations}
            onClose={() => setPreview(null)}
          />
        )}
      </StyledBox>
    </QuestionLibraryFlowManagement >
  );
};

const StyledBox = styled(Box)`
  background: ${defaultTheme.colors.light.paleGrey};
  width: min(${props => props.theme.breakpoints.lg}, calc(100% - 32px));
  z-index: 1;
  border: none;
  display: flex;
  flex-direction: column;
  box-shadow: none;
  padding: 0;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: calc(100% - 32px);
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
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

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchColumn = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  max-width: 628px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
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

  @media (max-width: ${props => props.theme.breakpoints.md}) {
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

  @media (max-width: ${props => props.theme.breakpoints.md}) {
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

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex: 1 1 100%;
    max-width: none;
  }
`;

const ClearAllButton = styled.button`
  -webkit-appearance: none;
  min-height: 30px;
  padding: 0 10px;
  border-radius: 6px;
  border: 1px solid ${props => props.theme.colors.dark.darkGrey};
  background: transparent;
  color: ${props => props.theme.colors.dark.darkGrey};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
`;

const StyledSortSelect = styled(SortSelect)`
  min-width: 280px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex: 1;
    min-width: 0;
  }
`;

const StyledFilterToggleButton = styled(FilterToggleButton)`
  min-width: 144px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex: 1;
  }
`;

const PaginationWrapper = styled.div`
  padding: 0 16px;
`;

const TableWrapper = styled("div")`
  overflow-x: auto;

  & > div {
    min-width: 1240px;
  }

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
