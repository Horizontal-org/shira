import { useState } from "react";

export const useQuestionTemplateFilters = (onChange: () => void) => {
  const [areFiltersOpen, setAreFiltersOpen] = useState(false);

  const [selectedLanguages, setSelectedLanguagesState] = useState<string[]>([]);
  const [selectedTags, setSelectedTagsState] = useState<string[]>([]);
  const [selectedAppType, setSelectedAppTypeState] = useState("");
  const [selectedType, setSelectedTypeState] = useState("");

  const setSelectedLanguages = (value: string[]) => {
    setSelectedLanguagesState(value);
    onChange();
  };

  const setSelectedTags = (value: string[]) => {
    setSelectedTagsState(value);
    onChange();
  };

  const setSelectedAppType = (value: string) => {
    setSelectedAppTypeState(value);
    onChange();
  };

  const setSelectedType = (value: string) => {
    setSelectedTypeState(value);
    onChange();
  };

  const clearAllFilters = () => {
    setSelectedLanguagesState([]);
    setSelectedTagsState([]);
    setSelectedAppTypeState("");
    setSelectedTypeState("");
    onChange();
  };

  const hasActiveFilters =
    selectedLanguages.length > 0 ||
    selectedTags.length > 0 ||
    selectedAppType.length > 0 ||
    selectedType.length > 0;

  const toggleFilters = () => {
    setAreFiltersOpen((prev) => !prev);
  };

  return {
    areFiltersOpen,
    clearAllFilters,
    hasActiveFilters,
    selectedAppType,
    selectedLanguages,
    selectedTags,
    selectedType,
    setSelectedAppType,
    setSelectedLanguages,
    setSelectedTags,
    setSelectedType,
    toggleFilters,
  };
};