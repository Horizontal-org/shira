import { ChangeEvent, FunctionComponent, useState } from "react";
import { TextInput, defaultTheme, styled } from "@horizontal-org/shira-ui";
import { useTranslation } from "react-i18next";
import { IoCloseCircle, IoSearchOutline } from "react-icons/io5";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const QuizLibrarySearchInput: FunctionComponent<Props> = ({
  value,
  onChange,
}) => {
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onChange(target.value);
  };

  return (
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
  );
};

const SearchColumn = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  max-width: 628px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    max-width: none;
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
