import { LibraryFilterToggleButton } from "@horizontal-org/shira-ui";
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
    <LibraryFilterToggleButton
      text={t("quiz_library.filters")}
      isOpen={areFiltersOpen}
      onClick={onToggleFilters}
    />
  );
};
