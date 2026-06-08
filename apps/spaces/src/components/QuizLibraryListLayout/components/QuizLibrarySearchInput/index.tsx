import { ChangeEvent, FunctionComponent, useRef, useState } from "react";
import { BaseFloatingMenu, TextInput, Button, defaultTheme, styled, Body2Regular } from "@horizontal-org/shira-ui";
import { useTranslation } from "react-i18next";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { HiFunnel } from "react-icons/hi2";
import { IoCloseCircle, IoSearchOutline } from "react-icons/io5";
import { type QuizTemplateSortOption } from "../../../../fetch/quiz_templates";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSortChange: (sortOption: QuizTemplateSortOption) => void;
};

export const QuizLibrarySearchInput: FunctionComponent<Props> = ({
  value,
  onChange,
  onSortChange,
}) => {
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  const sortButtonRef = useRef<HTMLButtonElement>(null);

  const handleSearchChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onChange(target.value);
  };

  const sortOptions = [
    {
      value: "createdAt-desc" as const,
      label: t("quiz_library.sort_options.newest_to_oldest"),
    },
    {
      value: "createdAt-asc" as const,
      label: t("quiz_library.sort_options.oldest_to_newest"),
    },
    {
      value: "title-asc" as const,
      label: t("quiz_library.sort_options.quiz_name_asc"),
    },
    {
      value: "title-desc" as const,
      label: t("quiz_library.sort_options.quiz_name_desc"),
    },
  ];

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
          <SortButton
            ref={sortButtonRef}
            type="button"
            onClick={() => setIsSortMenuOpen((prev) => !prev)}
          >
            <Body2Regular>{t("quiz_library.sort_by")}</Body2Regular>
            <SortButtonIcon>
              {isSortMenuOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
            </SortButtonIcon>
          </SortButton>

          <BaseFloatingMenu
            isOpen={isSortMenuOpen}
            onClose={() => setIsSortMenuOpen(false)}
            anchorEl={sortButtonRef.current}
            width={220}
            elements={sortOptions.map((option) => ({
              text: option.label,
              onClick: (event) => {
                event.stopPropagation();
                setIsSortMenuOpen(false);
                onSortChange(option.value);
              },
            }))}
          />

          <FilterButton
            text={t("quiz_library.filters")}
            type="outline"
            leftIcon={<HiFunnel size={20} color={defaultTheme.colors.dark.darkGrey} />}
          />
        </ActionsGroup>
      </TopRow>
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

const SortButton = styled.button`
  min-width: 220px;
  min-height: 46px;
  padding: 12px 20px;
  border-radius: 24px;
  border: 1px solid ${defaultTheme.colors.dark.mediumGrey};
  background: ${defaultTheme.colors.light.white};
  color: ${defaultTheme.colors.dark.black};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  &:focus {
    border-width: 2px;
    padding: 11px 19px;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex: 1;
  }
`;

const SortButtonIcon = styled.span`
  display: flex;
  align-items: center;
  color: ${defaultTheme.colors.dark.darkGrey};
`;

const FilterButton = styled(Button)`
  min-width: 144px;
  min-height: 46px;
  justify-content: center;
  gap: 4px;
  padding: 12px 20px;
  border-radius: 24px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex: 1;
  }
`;
