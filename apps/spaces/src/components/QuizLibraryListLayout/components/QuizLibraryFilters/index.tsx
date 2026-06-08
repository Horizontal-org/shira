import { FilterSelect, FilterToggleButton, defaultTheme, styled, type FilterSelectProps } from "@horizontal-org/shira-ui";
import { FunctionComponent, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HiFunnel } from "react-icons/hi2";
import { FaUserLarge } from "react-icons/fa6";
import { IoLanguage } from "react-icons/io5";
import { BiSolidTagAlt } from "react-icons/bi";

type FilterOption = {
  value: string;
  label: string;
};

type Props = {
  variant: "toggle" | "panel";
  areFiltersOpen?: boolean;
  onToggleFilters?: () => void;
  languageOptions?: FilterOption[];
  selectedLanguages?: string[];
  onLanguageChange?: (value: string[]) => void;
  tagOptions?: FilterOption[];
  selectedTags?: string[];
  onTagChange?: (value: string[]) => void;
  creatorOptions?: string[];
  selectedCreator?: string;
  onCreatorChange?: (value: string) => void;
};

export const QuizLibraryFilters: FunctionComponent<Props> = ({
  variant,
  areFiltersOpen = false,
  onToggleFilters,
  languageOptions = [],
  selectedLanguages = [],
  onLanguageChange,
  tagOptions = [],
  selectedTags = [],
  onTagChange,
  creatorOptions = [],
  selectedCreator = "",
  onCreatorChange,
}) => {
  const { t } = useTranslation();
  const canShowFilters = Boolean(
    onToggleFilters
    && onLanguageChange
    && onTagChange
    && onCreatorChange,
  );

  const creatorFilterOptions = useMemo(
    () => creatorOptions.map((creator) => ({ value: creator, label: creator })),
    [creatorOptions],
  );

  if (!canShowFilters) {
    return null;
  }

  if (variant === "toggle") {
    return (
      <StyledFilterToggleButton
        text={t("quiz_library.filters")}
        isOpen={areFiltersOpen}
        onClick={onToggleFilters!}
      />
    );
  }

  if (!areFiltersOpen) {
    return null;
  }

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
        onChange={(value) => onLanguageChange!(value as string[])}
      />

      <StyledFilterSelect
        value={selectedTags}
        options={tagOptions}
        placeholder={t("quiz_library.filters_panel.tag")}
        ariaLabel={t("quiz_library.filters_panel.tag")}
        leftIcon={<BiSolidTagAlt size={10} color={defaultTheme.colors.warning4} />}
        isMulti={true}
        onChange={(value) => onTagChange!(value as string[])}
      />

      <StyledFilterSelect
        value={selectedCreator}
        options={creatorFilterOptions}
        placeholder={t("quiz_library.filters_panel.creator")}
        ariaLabel={t("quiz_library.filters_panel.creator")}
        leftIcon={<FaUserLarge size={10} color={defaultTheme.colors.green7} />}
        onChange={onCreatorChange}
      />
    </FiltersRow>
  );
};

const StyledFilterToggleButton = styled(FilterToggleButton)`
  min-width: 144px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex: 1;
  }
`;

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
