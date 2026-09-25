import { ChangeEvent, FunctionComponent, useState } from "react";
import { IoCloseCircle, IoSearchOutline } from "react-icons/io5";
import styled from "styled-components";
import { defaultTheme } from "../../theme";
import { TextInput } from "../TextInput";

export type LibrarySearchInputProps = {
  value: string;
  placeholder?: string;
  className?: string;
  onChange: (value: string) => void;
};

export const LibrarySearchInput: FunctionComponent<LibrarySearchInputProps> = ({
  value,
  placeholder,
  className,
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onChange(target.value);
  };

  return (
    <Wrapper className={className}>
      <SearchInputWrap $hasValue={value.length > 0} $isFocused={isFocused}>
        <SearchIcon $isFocused={isFocused} aria-hidden="true">
          <IoSearchOutline size={18} />
        </SearchIcon>
        <TextInput
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={value}
          placeholder={placeholder}
        />
        {value.length > 0 && (
          <ClearButton
            type="button"
            onClick={() => onChange("")}
          >
            <IoCloseCircle size={24} />
          </ClearButton>
        )}
      </SearchInputWrap>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const SearchInputWrap = styled.div<{ $hasValue: boolean; $isFocused: boolean }>`
  position: relative;

  & input {
    height: auto;
    padding-inline-start: 52px;
    padding-inline-end: ${props => props.$hasValue
      ? "52px"
      : "18px"};
    border-width: 2px;
    border-color: ${defaultTheme.colors.green2};
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
  inset-inline-start: 18px;
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
  inset-inline-end: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: ${defaultTheme.colors.dark.mediumGrey};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;

  &:hover {
    color: ${defaultTheme.colors.dark.darkGrey};
  }
`;
