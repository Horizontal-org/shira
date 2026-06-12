import { ChangeEvent, FunctionComponent, useState } from "react";
import { IoCloseCircle, IoSearchOutline } from "react-icons/io5";
import styled from "styled-components";
import { defaultTheme } from "../../theme";
import { TextInput } from "../TextInput";

type SearchSize = "default" | "compact";

export type LibrarySearchInputProps = {
  value: string;
  placeholder?: string;
  className?: string;
  size?: SearchSize;
  onChange: (value: string) => void;
};

export const LibrarySearchInput: FunctionComponent<LibrarySearchInputProps> = ({
  value,
  placeholder,
  className,
  size = "default",
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onChange(target.value);
  };

  return (
    <Wrapper className={className}>
      <SearchInputWrap $hasValue={value.length > 0} $isFocused={isFocused} $size={size}>
        <SearchIcon $isFocused={isFocused} $size={size} aria-hidden="true">
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
            $size={size}
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

const SearchInputWrap = styled.div<{ $hasValue: boolean; $isFocused: boolean; $size: SearchSize }>`
  position: relative;

  & input {
    height: ${props => props.$size === "compact" ? "38px" : "auto"};
    padding-left: ${props => props.$size === "compact" ? "34px" : "52px"};
    padding-right: ${props => props.$hasValue
      ? (props.$size === "compact" ? "46px" : "52px")
      : (props.$size === "compact" ? "16px" : "18px")};
    border-width: 1px;
    border-color: ${defaultTheme.colors.green4};
    border-radius: ${props => props.$size === "compact" ? "20px" : "24px"};
    background: ${props => props.$isFocused && props.$size === "default"
      ? defaultTheme.colors.light.paleGreen
      : defaultTheme.colors.light.white};
    font-size: ${props => props.$size === "compact" ? "14px" : "16px"};
  }

  & input:focus:not(:disabled) {
    box-shadow: 0 0 0 1px ${defaultTheme.colors.green4};
    background: ${props => props.$size === "default"
      ? defaultTheme.colors.light.paleGreen
      : defaultTheme.colors.light.white};
  }

  & input:hover:not(:disabled) {
    background: ${props => props.$size === "default"
      ? defaultTheme.colors.light.paleGreen
      : defaultTheme.colors.light.white};
  }

  & input::placeholder {
    color: ${defaultTheme.colors.dark.darkGrey};
  }
`;

const SearchIcon = styled.div<{ $isFocused: boolean; $size: SearchSize }>`
  position: absolute;
  left: ${props => props.$size === "compact" ? "14px" : "18px"};
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

const ClearButton = styled.button<{ $size: SearchSize }>`
  all: unset;
  position: absolute;
  right: ${props => props.$size === "compact" ? "12px" : "14px"};
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
