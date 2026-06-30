import { FunctionComponent } from "react";
import { defaultTheme } from "@horizontal-org/shira-ui";
import { useTranslation } from "react-i18next";
import { FaUserLarge } from "react-icons/fa6";
import { IoLanguage } from "react-icons/io5";
import { BiSolidTag } from "react-icons/bi";
import {
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
    : t("quiz_library.filters_panel.selected_count", { count: selectedLanguages.length });
  const tagSelectedLabel = selectedTags.length === 1
    ? selectedTagOption?.label ?? selectedTags[0]
    : t("quiz_library.filters_panel.selected_count", { count: selectedTags.length });

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
        leftIcon={<IoLanguage size={12} color={defaultTheme.colors.blue6} />}
        isMulti={true}
        {...(hasSelectedLanguages ? { selectedLabel: languageSelectedLabel } : {})}
        onChange={(value) => onLanguageChange(value as string[])}
        onClear={() => onLanguageChange([])}
      />

      <TemplateFilterSelect
        value={selectedTags}
        options={tagOptions}
        placeholder={t("quiz_library.filters_panel.tag")}
        ariaLabel={t("quiz_library.filters_panel.tag")}
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
