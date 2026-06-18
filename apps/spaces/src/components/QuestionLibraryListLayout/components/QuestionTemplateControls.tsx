import { FunctionComponent, ReactNode } from "react";
import {
  Body1,
  LibraryFilterToggleButton,
  LibrarySearchInput,
  SortSelect,
  defaultTheme,
  styled,
} from "@horizontal-org/shira-ui";
import { QuestionTemplateSortOption } from "../../../fetch/question_templates";
import { useTranslation } from "react-i18next";

type SortOption = {
  value: QuestionTemplateSortOption;
  label: string;
};

type Props = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  sortOption: QuestionTemplateSortOption;
  onSortChange: (value: QuestionTemplateSortOption) => void;
  areFiltersOpen: boolean;
  onToggleFilters: () => void;
  filters?: ReactNode;
  searchSummary?: string;
};

export const QuestionTemplateControls: FunctionComponent<Props> = ({
  searchValue,
  onSearchChange,
  sortOption,
  onSortChange,
  areFiltersOpen,
  onToggleFilters,
  filters,
  searchSummary,
}) => {
  const { t } = useTranslation();

  const sortOptions: SortOption[] = [
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

  return (
    <Controls>
      <ControlsTopRow>
        <SearchColumn>
          <LibrarySearchInput
            value={searchValue}
            onChange={onSearchChange}
            placeholder={t("question_library.search_placeholder")}
          />
        </SearchColumn>

        <ActionsGroup>
          <StyledSortSelect
            value={sortOption}
            options={sortOptions}
            prefix={`${t("question_library.sort_by")}:`}
            ariaLabel={t("question_library.sort_by")}
            onChange={(nextValue) => onSortChange(nextValue as QuestionTemplateSortOption)}
          />

          <LibraryFilterToggleButton
            text={t("question_library.filters")}
            isOpen={areFiltersOpen}
            onClick={onToggleFilters}
          />
        </ActionsGroup>
      </ControlsTopRow>

      <SearchSummaryContainer $visible={Boolean(searchSummary)}>
        <SearchSummaryText>{searchSummary ?? ""}</SearchSummaryText>
      </SearchSummaryContainer>

      {areFiltersOpen && filters}
    </Controls>
  );
};

const Controls = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SearchSummaryContainer = styled.div<{ $visible: boolean }>`
  height: 32px;
  overflow: hidden;
  visibility: ${(props) => (props.$visible ? "visible" : "hidden")};
`;

const SearchSummaryText = styled(Body1)`
  margin: 0;
  padding: 4px 0 0;
  color: ${defaultTheme.colors.dark.darkGrey};
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

const StyledSortSelect = styled(SortSelect)`
  min-width: 280px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex: 1;
    min-width: 0;
  }
`;
