import { FunctionComponent } from "react";
import { SortSelect, styled } from "@horizontal-org/shira-ui";
import { useTranslation } from "react-i18next";
import { type QuizTemplateSortOption } from "../../../../fetch/quiz_templates";

type Props = {
  sortOption: QuizTemplateSortOption;
  onSortChange: (sortOption: QuizTemplateSortOption) => void;
};

export const QuizLibrarySortSelect: FunctionComponent<Props> = ({
  sortOption,
  onSortChange,
}) => {
  const { t } = useTranslation();

  const sortOptions = [
    {
      value: "createdAt-desc",
      label: t("quiz_library.sort_options.newest_to_oldest"),
    },
    {
      value: "createdAt-asc",
      label: t("quiz_library.sort_options.oldest_to_newest"),
    },
    {
      value: "title-asc",
      label: t("quiz_library.sort_options.quiz_name_asc"),
    },
    {
      value: "title-desc",
      label: t("quiz_library.sort_options.quiz_name_desc"),
    },
  ];

  return (
    <StyledSortSelect
      value={sortOption}
      options={sortOptions}
      prefix={`${t("quiz_library.sort_by")}:`}
      ariaLabel={t("quiz_library.sort_by")}
      onChange={(nextValue) => onSortChange(nextValue as QuizTemplateSortOption)}
    />
  );
};

const StyledSortSelect = styled(SortSelect)`
  min-width: 280px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex: 1;
    min-width: 0;
  }
`;
