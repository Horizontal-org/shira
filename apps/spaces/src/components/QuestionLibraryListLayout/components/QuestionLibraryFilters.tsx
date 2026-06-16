import { FunctionComponent, useMemo } from "react";
import { Body4, FilterSelect, defaultTheme, styled, type FilterSelectProps } from "@horizontal-org/shira-ui";
import { useTranslation } from "react-i18next";
import { HiFunnel } from "react-icons/hi2";
import { FaRegFaceMeh } from "react-icons/fa6";
import { IoAppsSharp, IoLanguage } from "react-icons/io5";
import { BiSolidTagAlt } from "react-icons/bi";
import { FiX } from "react-icons/fi";

export type FilterOption = {
  value: string;
  label: string;
};

type Props = {
  languageOptions: FilterOption[];
  selectedLanguages: string[];
  onLanguageChange: (value: string[]) => void;
  tagOptions: FilterOption[];
  selectedTags: string[];
  onTagChange: (value: string[]) => void;
  appOptions: FilterOption[];
  selectedAppType: string;
  onAppTypeChange: (value: string) => void;
  selectedType: string;
  onTypeChange: (value: string) => void;
  hasActiveFilters: boolean;
  onClearAll: () => void;
};

export const QuestionLibraryFilters: FunctionComponent<Props> = ({
  languageOptions,
  selectedLanguages,
  onLanguageChange,
  tagOptions,
  selectedTags,
  onTagChange,
  appOptions,
  selectedAppType,
  onAppTypeChange,
  selectedType,
  onTypeChange,
  hasActiveFilters,
  onClearAll,
}) => {
  const { t } = useTranslation();

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
      return options.find((option) => option.value === selectedValues[0])?.label ?? selectedValues[0];
    }

    return selectedCountLabel;
  };

  return (
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
          t("question_library.filters_panel.selected_count", {
            count: selectedLanguages.length,
          }),
        )}
        onChange={(value) => onLanguageChange(value as string[])}
        onClear={() => onLanguageChange([])}
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
          t("question_library.filters_panel.selected_count", {
            count: selectedTags.length,
          }),
        )}
        onChange={(value) => onTagChange(value as string[])}
        onClear={() => onTagChange([])}
      />

      <StyledFilterSelect
        value={selectedAppType}
        options={appOptions}
        placeholder={t("question_library.filters_panel.apps")}
        ariaLabel={t("question_library.filters_panel.apps")}
        leftIcon={<IoAppsSharp size={10} color={defaultTheme.colors.blue6} />}
        selectedLabel={appOptions.find((option) => option.value === selectedAppType)?.label}
        onChange={(value) => onAppTypeChange(value as string)}
        onClear={() => onAppTypeChange("")}
      />

      <StyledFilterSelect
        value={selectedType}
        options={typeOptions}
        placeholder={t("question_library.filters_panel.type")}
        ariaLabel={t("question_library.filters_panel.type")}
        leftIcon={<FaRegFaceMeh size={11} color={defaultTheme.colors.dark.darkGrey} />}
        selectedLabel={typeOptions.find((option) => option.value === selectedType)?.label}
        onChange={(value) => onTypeChange(value as string)}
        onClear={() => onTypeChange("")}
      />

      {hasActiveFilters && (
        <ClearAllButton onClick={onClearAll}>
          <FiX size={16} />
          <Body4>{t("question_library.filters_panel.clear_all")}</Body4>
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

const StyledFilterSelect = styled(FilterSelect)<FilterSelectProps>`
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
