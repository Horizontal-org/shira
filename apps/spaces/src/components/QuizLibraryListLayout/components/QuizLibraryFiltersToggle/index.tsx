import { FilterToggleButton, styled } from "@horizontal-org/shira-ui";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  areFiltersOpen: boolean;
  onToggleFilters: () => void;
};

export const QuizLibraryFiltersToggle: FunctionComponent<Props> = ({
  areFiltersOpen,
  onToggleFilters,
}) => {
  const { t } = useTranslation();

  return (
    <StyledFilterToggleButton
      text={t("quiz_library.filters")}
      isOpen={areFiltersOpen}
      onClick={onToggleFilters}
    />
  );
};

const StyledFilterToggleButton = styled(FilterToggleButton)`
  min-width: 144px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex: 1;
  }
`;
