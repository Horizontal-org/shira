import { FunctionComponent } from "react";
import { OptionInterface } from "./SmallSelect";
import styled from 'styled-components'
import { defaultTheme } from "../../theme";

interface Props {
  option: OptionInterface;
  index: number;
  submit: () => void;
}

export const Option: FunctionComponent<Props> = ({
  option,
  index,
  submit
}) => {
  const isSelected = option.value === option.value;

  return (
    <OptionWrapper
      role="option"
      aria-selected={isSelected}
      onClick={submit}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          submit();
        }
      }}
    >
      {index > 0 && <Separate />}
      <Label data-placeholder={isSelected ? "false" : "true"}>
        {option.leftIcon && <IconWrapper>{option.leftIcon}</IconWrapper>}
        {option.label}
      </Label>
    </OptionWrapper>
  )
}

const OptionWrapper = styled.div`
  width: 100%;
  padding: 12px 16px;
  cursor: pointer;
  line-height: 1;
  background: transparent;

  &:not(:last-child) {
    border-bottom: 1px solid ${defaultTheme.colors.dark.lightGrey};
  }

  &:hover { background: ${defaultTheme.colors.light.paleGrey}; }

  &:focus-visible {
    outline: 2px solid ${defaultTheme.colors.dark.lightGrey};
    outline-offset: -2px;
  }
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  gap: 6px;
`;

const IconWrapper = styled.span`
  display: inline-flex;
  width: 22px;
  height: 22px;
  align-items: center;
  justify-content: center;
  flex: 0 0 22px;
`;

const Separate = styled.span`
  color: ${props => props.theme.colors.dark.black};
  font-weight: 400;
  font-size: 16px;
`;