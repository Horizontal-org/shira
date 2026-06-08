import { ChangeEvent, FunctionComponent, useMemo, useState } from "react";
import { FilterSelect, FilterToggleButton, SortSelect, TextInput, defaultTheme, styled } from "@horizontal-org/shira-ui";
import { useTranslation } from "react-i18next";
import { HiFunnel } from "react-icons/hi2";
import { FaCircle } from "react-icons/fa6";
import { IoCloseCircle, IoSearchOutline } from "react-icons/io5";
import { PiUserFill } from "react-icons/pi";
import { type QuizTemplateSortOption } from "../../../../fetch/quiz_templates";

type Props = {
  value: string;
  onChange: (value: string) => void;
  sortOption: QuizTemplateSortOption;
  onSortChange: (sortOption: QuizTemplateSortOption) => void;
  areFiltersOpen: boolean;
  onToggleFilters: () => void;
  languageOptions: string[];
  selectedLanguage: string;
  onLanguageChange: (value: string) => void;
  tagOptions: string[];
  selectedTag: string;
  onTagChange: (value: string) => void;
  creatorOptions: string[];
  selectedCreator: string;
  onCreatorChange: (value: string) => void;
};

export const QuizLibrarySearchInput: FunctionComponent<Props> = ({
  value,
  onChange,
  sortOption,
  onSortChange,
  areFiltersOpen,
  onToggleFilters,
  languageOptions,
  selectedLanguage,
  onLanguageChange,
  tagOptions,
  selectedTag,
  onTagChange,
  creatorOptions,
  selectedCreator,
  onCreatorChange,
}) => {
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onChange(target.value);
  };

  const sortOptions = useMemo(() => [
    {
      value: "createdAt-desc",
      label: t("quiz_library.sort_options.newest_to_oldest"),
    },
    {
      value: "createdAt-asc",
      label: t("quiz_library.sort_options.oldest_to_newest"),
    },
    {
      value: "title-asc",
      label: t("quiz_library.sort_options.quiz_name_asc"),
    },
    {
      value: "title-desc",
      label: t("quiz_library.sort_options.quiz_name_desc"),
    },
  ], [t]);

  const languageFilterOptions = useMemo(() => [
    { value: "", label: t("quiz_library.filters_panel.all_languages") },
    ...languageOptions.map((language) => ({ value: language, label: language })),
  ], [languageOptions, t]);

  const tagFilterOptions = useMemo(() => [
    { value: "", label: t("quiz_library.filters_panel.all_tags") },
    ...tagOptions.map((tag) => ({ value: tag, label: tag })),
  ], [tagOptions, t]);

  const creatorFilterOptions = useMemo(() => [
    { value: "", label: t("quiz_library.filters_panel.all_creators") },
    ...creatorOptions.map((creator) => ({ value: creator, label: creator })),
  ], [creatorOptions, t]);

  return (
    <Controls>
      <TopRow>
        <SearchColumn>
          <SearchInputWrap $hasValue={value.length > 0} $isFocused={isFocused}>
            <SearchIcon $isFocused={isFocused} aria-hidden="true">
              <IoSearchOutline size={18} />
            </SearchIcon>
            <TextInput
              onChange={handleSearchChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={value}
              placeholder={t("quiz_library.search_placeholder")}
            />
            {value.length > 0 && (
              <ClearButton
                type="button"
                onClick={() => onChange("")}
              >
                <IoCloseCircle size={24} color={defaultTheme.colors.dark.mediumGrey} />
              </ClearButton>
            )}
          </SearchInputWrap>
        </SearchColumn>

        <ActionsGroup>
          <StyledSortSelect
            value={sortOption}
            options={sortOptions}
            prefix={`${t("quiz_library.sort_by")}:`}
            ariaLabel={t("quiz_library.sort_by")}
            onChange={(nextValue) => onSortChange(nextValue as QuizTemplateSortOption)}
          />

          <StyledFilterToggleButton
            text={t("quiz_library.filters")}
            isOpen={areFiltersOpen}
            onClick={onToggleFilters}
          />
        </ActionsGroup>
      </TopRow>

      {areFiltersOpen && (
        <FiltersRow>
          <FiltersIcon>
            <HiFunnel size={18} color={defaultTheme.colors.dark.mediumGrey} />
          </FiltersIcon>

          <StyledFilterSelect
            value={selectedLanguage}
            options={languageFilterOptions}
            placeholder={t("quiz_library.filters_panel.language")}
            ariaLabel={t("quiz_library.filters_panel.language")}
            leftIcon={<LanguageMarker />}
            onChange={onLanguageChange}
          />

          <StyledFilterSelect
            value={selectedTag}
            options={tagFilterOptions}
            placeholder={t("quiz_library.filters_panel.tag")}
            ariaLabel={t("quiz_library.filters_panel.tag")}
            leftIcon={<TagMarker />}
            onChange={onTagChange}
          />

          <StyledFilterSelect
            value={selectedCreator}
            options={creatorFilterOptions}
            placeholder={t("quiz_library.filters_panel.creator")}
            ariaLabel={t("quiz_library.filters_panel.creator")}
            leftIcon={<PiUserFill size={12} color={defaultTheme.colors.green7} />}
            onChange={onCreatorChange}
          />
        </FiltersRow>
      )}
    </Controls>
  );
};

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchColumn = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  max-width: 628px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    max-width: none;
  }
`;

const ActionsGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  margin-left: auto;
  flex-shrink: 0;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    margin-left: 0;
    justify-content: stretch;
  }
`;

const SearchInputWrap = styled.div<{ $hasValue: boolean; $isFocused: boolean }>`
  position: relative;

  & input {
    padding-left: 52px;
    padding-right: ${props => props.$hasValue ? "52px" : "18px"};
    border-width: 1px;
    border-color: ${defaultTheme.colors.green4};
    border-radius: 24px;
    background: ${props => props.$isFocused
    ? defaultTheme.colors.light.paleGreen
    : defaultTheme.colors.light.white};
    font-size: 16px;
  }

  & input:focus:not(:disabled) {
    box-shadow: 0 0 0 1px ${defaultTheme.colors.green4};
    background: ${defaultTheme.colors.light.paleGreen};
  }

  & input:hover:not(:disabled) {
    background: ${defaultTheme.colors.light.paleGreen};
  }

  & input::placeholder {
    color: ${defaultTheme.colors.dark.darkGrey};
  }
`;

const SearchIcon = styled.div<{ $isFocused: boolean }>`
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.$isFocused
    ? defaultTheme.colors.green6
    : defaultTheme.colors.dark.darkGrey};
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 1;
`;

const ClearButton = styled.button`
  all: unset;
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.dark.mediumGrey};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;

  &:hover {
    color: ${props => props.theme.colors.dark.darkGrey};
  }
`;

const StyledSortSelect = styled(SortSelect)`
  min-width: 280px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex: 1;
    min-width: 0;
  }
`;

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
  padding-left: 164px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding-left: 0;
    flex-wrap: wrap;
  }
`;

const FiltersIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
`;

const StyledFilterSelect = styled(FilterSelect)`
  min-width: 160px;
  max-width: 200px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex: 1 1 100%;
    max-width: none;
  }
`;

const LanguageMarker = () => (
  <BodyMarker color="#5DA8F5">A</BodyMarker>
);

const TagMarker = () => (
  <FaCircle size={8} color="#F1BF22" />
);

const BodyMarker = styled.span<{ color: string }>`
  color: ${props => props.color};
  font-size: 10px;
  font-weight: 600;
  line-height: 1;
`;
