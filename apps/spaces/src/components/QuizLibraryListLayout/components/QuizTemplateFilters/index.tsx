import { FunctionComponent } from "react";
import { defaultTheme } from "@horizontal-org/shira-ui";
import { useTranslation } from "react-i18next";
import { FaUserLarge } from "react-icons/fa6";
import { IoLanguage } from "react-icons/io5";
import { BiSolidTagAlt } from "react-icons/bi";
import {
  getTemplateMultiSelectedLabel,
  TemplateFilters,
  TemplateFiltersClearAllButton,
  TemplateFilterOption,
  TemplateFilterSelect,
  TemplateFiltersIcon,
} from "../../../LibraryControlsLayout/TemplateFilters";

type Props = {
  languageOptions: TemplateFilterOption[];
  selectedLanguages: string[];
  onLanguageChange: (value: string[]) => void;
  tagOptions: TemplateFilterOption[];
  selectedTags: string[];
  onTagChange: (value: string[]) => void;
  creatorOptions: string[];
  selectedCreator: string;
  onCreatorChange: (value: string) => void;
  onClearAll: () => void;
};

export const QuizTemplateFilters: FunctionComponent<Props> = ({
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

  const creatorFilterOptions = creatorOptions.map((creator) => ({ value: creator, label: creator }));
  const languageSelectedLabel = selectedLanguages.length > 0
    ? getTemplateMultiSelectedLabel(
      languageOptions,
      selectedLanguages,
      t("quiz_library.filters_panel.selected_count", { count: selectedLanguages.length }),
    )
    : undefined;
  const tagSelectedLabel = selectedTags.length > 0
    ? getTemplateMultiSelectedLabel(
      tagOptions,
      selectedTags,
      t("quiz_library.filters_panel.selected_count", { count: selectedTags.length }),
    )
    : undefined;
  const hasActiveFilters = selectedLanguages.length > 0
    || selectedTags.length > 0
    || selectedCreator.length > 0;

  return (
    <TemplateFilters>
      <TemplateFiltersIcon />

      <TemplateFilterSelect
        value={selectedLanguages}
        options={languageOptions}
        placeholder={t("quiz_library.filters_panel.language")}
        ariaLabel={t("quiz_library.filters_panel.language")}
        leftIcon={<IoLanguage size={10} color={defaultTheme.colors.blue6} />}
        isMulti={true}
        selectedLabel={languageSelectedLabel}
        onChange={(value) => onLanguageChange(value as string[])}
        onClear={() => onLanguageChange([])}
      />

      <TemplateFilterSelect
        value={selectedTags}
        options={tagOptions}
        placeholder={t("quiz_library.filters_panel.tag")}
        ariaLabel={t("quiz_library.filters_panel.tag")}
        leftIcon={<BiSolidTagAlt size={10} color={defaultTheme.colors.warning4} />}
        isMulti={true}
        selectedLabel={tagSelectedLabel}
        onChange={(value) => onTagChange(value as string[])}
        onClear={() => onTagChange([])}
      />

      <TemplateFilterSelect
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
        <TemplateFiltersClearAllButton
          clearAllLabel={t("quiz_library.filters_panel.clear_all")}
          onClick={onClearAll}
        />
      )}
    </TemplateFilters>
  );
};
