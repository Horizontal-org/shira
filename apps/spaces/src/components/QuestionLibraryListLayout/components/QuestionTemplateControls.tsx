import { LibraryFilterToggleButton } from "@horizontal-org/shira-ui";
import { FunctionComponent, ReactNode } from "react";
import { QuestionTemplateSortOption } from "../../../fetch/question_templates";
import { useTranslation } from "react-i18next";
import { LibraryControlsLayout } from "../../LibraryControlsLayout";
import { LibrarySearchControl } from "../../LibraryControlsLayout/LibrarySearchControl";
import { LibrarySortSelect } from "../../LibraryControlsLayout/LibrarySortSelect";

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
    <LibraryControlsLayout
      searchControl={(
        <LibrarySearchControl
          value={searchValue}
          onChange={onSearchChange}
          placeholder={t("question_library.search_placeholder")}
        />
      )}
      actions={(
        <>
          <LibrarySortSelect
            value={sortOption}
            options={sortOptions}
            label={t("question_library.sort_by")}
            onChange={onSortChange}
          />

          <LibraryFilterToggleButton
            text={t("question_library.filters")}
            isOpen={areFiltersOpen}
            onClick={onToggleFilters}
          />
        </>
      )}
      searchSummary={searchSummary}
      filters={areFiltersOpen ? filters : undefined}
    />
  );
};
