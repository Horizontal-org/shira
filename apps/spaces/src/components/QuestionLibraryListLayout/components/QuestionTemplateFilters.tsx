import { FunctionComponent, useMemo } from "react";
import { defaultTheme } from "@horizontal-org/shira-ui";
import { useTranslation } from "react-i18next";
import { FaRegFaceMeh } from "react-icons/fa6";
import { IoAppsSharp, IoLanguage } from "react-icons/io5";
import { BiSolidTag, BiSolidTagAlt } from "react-icons/bi";
import {
  TemplateFilters,
  TemplateFiltersClearAllButton,
  TemplateFilterOption,
  TemplateFilterSelect,
  TemplateFiltersIcon,
} from "../../LibraryControlsLayout/TemplateFilters";

type Props = {
  languageOptions: TemplateFilterOption[];
  selectedLanguages: string[];
  onLanguageChange: (value: string[]) => void;
  tagOptions: TemplateFilterOption[];
  selectedTags: string[];
  onTagChange: (value: string[]) => void;
  appOptions: TemplateFilterOption[];
  selectedAppType: string;
  onAppTypeChange: (value: string) => void;
  selectedType: string;
  onTypeChange: (value: string) => void;
  hasActiveFilters: boolean;
  onClearAll: () => void;
};

export const QuestionTemplateFilters: FunctionComponent<Props> = ({
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
  const selectedLanguageOption = languageOptions.find(
    (option) => option.value === selectedLanguages[0],
  );
  const selectedTagOption = tagOptions.find(
    (option) => option.value === selectedTags[0],
  );
  const hasSelectedLanguages = selectedLanguages.length > 0;
  const hasSelectedTags = selectedTags.length > 0;
  const languageSelectedLabel = selectedLanguages.length === 1
    ? selectedLanguageOption?.label ?? selectedLanguages[0]
    : t("question_library.filters_panel.selected_count", {
      count: selectedLanguages.length,
    });
  const tagSelectedLabel = selectedTags.length === 1
    ? selectedTagOption?.label ?? selectedTags[0]
    : t("question_library.filters_panel.selected_count", {
      count: selectedTags.length,
    });

  const typeOptions = useMemo<TemplateFilterOption[]>(
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

  return (
    <TemplateFilters>
      <TemplateFiltersIcon />

      <TemplateFilterSelect
        value={selectedLanguages}
        options={languageOptions}
        placeholder={t("question_library.filters_panel.language")}
        ariaLabel={t("question_library.filters_panel.language")}
        leftIcon={<IoLanguage size={12} color={defaultTheme.colors.blue6} />}
        isMulti={true}
        {...(hasSelectedLanguages ? { selectedLabel: languageSelectedLabel } : {})}
        onChange={(value) => onLanguageChange(value as string[])}
        onClear={() => onLanguageChange([])}
      />

      <TemplateFilterSelect
        value={selectedTags}
        options={tagOptions}
        placeholder={t("question_library.filters_panel.tag")}
        ariaLabel={t("question_library.filters_panel.tag")}
        leftIcon={(
          <BiSolidTag
            size={12}
            color={defaultTheme.colors.warning4}
            style={{ transform: "rotate(180deg)" }}
          />
        )}
        isMulti={true}
        {...(hasSelectedTags ? { selectedLabel: tagSelectedLabel } : {})}
        onChange={(value) => onTagChange(value as string[])}
        onClear={() => onTagChange([])}
      />

      <TemplateFilterSelect
        value={selectedAppType}
        options={appOptions}
        placeholder={t("question_library.filters_panel.apps")}
        ariaLabel={t("question_library.filters_panel.apps")}
        leftIcon={<IoAppsSharp size={10} color={defaultTheme.colors.blue6} />}
        selectedLabel={appOptions.find((option) => option.value === selectedAppType)?.label}
        onChange={(value) => onAppTypeChange(value as string)}
        onClear={() => onAppTypeChange("")}
      />

      <TemplateFilterSelect
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
        <TemplateFiltersClearAllButton
          clearAllLabel={t("question_library.filters_panel.clear_all")}
          onClick={onClearAll}
        />
      )}
    </TemplateFilters>
  );
};
