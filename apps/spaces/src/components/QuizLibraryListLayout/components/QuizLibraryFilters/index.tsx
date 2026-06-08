import { Body4, FilterSelect, defaultTheme, styled, type FilterSelectProps } from "@horizontal-org/shira-ui";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { HiFunnel } from "react-icons/hi2";
import { FaUserLarge } from "react-icons/fa6";
import { IoLanguage } from "react-icons/io5";
import { BiSolidTagAlt } from "react-icons/bi";
import { FiX } from "react-icons/fi";

type FilterOption = {
  value: string;
  label: string;
};

type PanelProps = {
  showFilters: boolean;
  languageOptions: FilterOption[];
  selectedLanguages: string[];
  onLanguageChange: (value: string[]) => void;
  tagOptions: FilterOption[];
  selectedTags: string[];
  onTagChange: (value: string[]) => void;
  creatorOptions: string[];
  selectedCreator: string;
  onCreatorChange: (value: string) => void;
  onClearAll: () => void;
};

export const QuizLibraryFilters: FunctionComponent<PanelProps> = ({
  showFilters,
  languageOptions,
  selectedLanguages,
  onLanguageChange,
  tagOptions,
  selectedTags,
  onTagChange,
  creatorOptions,
  selectedCreator,
  onCreatorChange,
  onClearAll,
}) => {
  const { t } = useTranslation();

  if (!showFilters) {
    return;
  }

  const getSelectedLabel = (
    count: number,
    options: FilterOption[],
    selectedValues: string[],
    selectedCountLabel: string,
  ) => {
    if (count === 0) {
      return;
    }

    if (count === 1) {
      return options.find((option) => option.value === selectedValues[0])?.label ?? selectedValues[0];
    }

    return selectedCountLabel;
  };

  const creatorFilterOptions = creatorOptions.map((creator) => ({ value: creator, label: creator }));
  const hasActiveFilters = selectedLanguages.length > 0
    || selectedTags.length > 0
    || selectedCreator.length > 0;

  return (
    <FiltersRow>
      <FiltersIcon>
        <HiFunnel size={18} color={defaultTheme.colors.dark.mediumGrey} />
      </FiltersIcon>

      <StyledFilterSelect
        value={selectedLanguages}
        options={languageOptions}
        placeholder={t("quiz_library.filters_panel.language")}
        ariaLabel={t("quiz_library.filters_panel.language")}
        leftIcon={<IoLanguage size={10} color={defaultTheme.colors.blue6} />}
        isMulti={true}
        selectedLabel={getSelectedLabel(
          selectedLanguages.length,
          languageOptions,
          selectedLanguages,
          t("quiz_library.filters_panel.selected_count", { count: selectedLanguages.length }),
        )}
        onChange={(value) => onLanguageChange(value as string[])}
        onClear={() => onLanguageChange([])}
      />

      <StyledFilterSelect
        value={selectedTags}
        options={tagOptions}
        placeholder={t("quiz_library.filters_panel.tag")}
        ariaLabel={t("quiz_library.filters_panel.tag")}
        leftIcon={<BiSolidTagAlt size={10} color={defaultTheme.colors.warning4} />}
        isMulti={true}
        selectedLabel={getSelectedLabel(
          selectedTags.length,
          tagOptions,
          selectedTags,
          t("quiz_library.filters_panel.selected_count", { count: selectedTags.length }),
        )}
        onChange={(value) => onTagChange(value as string[])}
        onClear={() => onTagChange([])}
      />

      <StyledFilterSelect
        value={selectedCreator}
        options={creatorFilterOptions}
        placeholder={t("quiz_library.filters_panel.creator")}
        ariaLabel={t("quiz_library.filters_panel.creator")}
        leftIcon={<FaUserLarge size={10} color={defaultTheme.colors.green7} />}
        selectedLabel={selectedCreator}
        onChange={onCreatorChange}
        onClear={() => onCreatorChange("")}
      />

      {hasActiveFilters && (
        <ClearAllButton
          onClick={onClearAll}
        >
          <FiX size={16} />
          <Body4>{t("quiz_library.filters_panel.clear_all")}</Body4>
        </ClearAllButton>
      )}
    </FiltersRow>
  );
};

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
  gap: 10px;
  cursor: pointer;
`;
