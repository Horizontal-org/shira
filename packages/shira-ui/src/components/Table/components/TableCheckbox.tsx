import { FunctionComponent } from "react";
import styled from "styled-components";

interface Props {
  checked: boolean;
  indeterminate: boolean;
  onChange: any
  isTDCheckbox: boolean;
}

export const TableCheckbox: FunctionComponent<Props> = ({
  checked,
  indeterminate,
  onChange,
  isTDCheckbox = false
}) => {

  function preventClickBubbling(event: any): void {
    event.stopPropagation();
  }

  return (
    <Wrapper
      data-row-checkbox
      $isHidden={isTDCheckbox && !checked}
      onClick={preventClickBubbling}
      onKeyDown={preventClickBubbling}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <Checkmark
        checked={checked}
        ind={indeterminate}
      />
    </Wrapper>
  );
};

const Wrapper = styled.label<{ $isHidden: boolean }>`
  position: relative;
  height: 18px;
  width: 18px;
  display: block;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  ${({ $isHidden }) =>
    $isHidden &&
    `
      visibility: hidden;
    `}
`;

const Checkmark = styled.span<{
  checked: boolean;
  ind: boolean;
}>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  border: 2px solid ${({ theme }) => theme.colors.dark.mediumGrey};
  border-radius: 2px;
  box-sizing: border-box;

  &:after {
    content: "";
    position: absolute;
    display: none;
    left: 4px;
    top: 0;
    width: 5px;
    height: 9px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }

  ${({ checked, theme }) =>
    checked &&
    `
      background-color: ${theme.colors.green5};
      border-color: ${theme.colors.green5};

      &:after {
        display: block;
      }
    `}

  ${({ ind, theme }) =>
    ind &&
    `
      background-color: ${theme.colors.green5};
      border-color: ${theme.colors.green5};

      &:after {
        display: block;
        transform: none;
        top: auto;
        left: 1px;
        width: 12px;
        height: 6px;
        border-width: 0 0 3px 0;
      }
    `}
`;
