import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getQuestionTemplateLanguageOptions,
  getQuestionTemplateTagOptions,
  type QuestionTemplateFilterOption,
} from "../../../fetch/question_templates";

export const useQuestionTemplateFilterOptions = (areFiltersOpen: boolean) => {
  const { i18n } = useTranslation();
  const [languageOptions, setLanguageOptions] = useState<QuestionTemplateFilterOption[]>([]);
  const [tagOptions, setTagOptions] = useState<QuestionTemplateFilterOption[]>([]);

  useEffect(() => {
    setLanguageOptions([]);
    setTagOptions([]);
  }, [i18n.language]);

  useEffect(() => {
    if (
      !areFiltersOpen ||
      (languageOptions.length > 0 && tagOptions.length > 0)
    ) {
      return;
    }

    const loadFilterOptions = async () => {
      try {
        const [nextLanguageOptions, nextTagOptions] = await Promise.all([
          getQuestionTemplateLanguageOptions(),
          getQuestionTemplateTagOptions(),
        ]);

        setLanguageOptions(nextLanguageOptions);
        setTagOptions(nextTagOptions);
      } catch (error) {
        console.error("Failed to get question template filter options:", error);
      }
    };

    loadFilterOptions();
  }, [areFiltersOpen, i18n.language, languageOptions.length, tagOptions.length]);

  return {
    languageOptions,
    tagOptions,
  };
};
