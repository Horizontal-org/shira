import { ChangeEventHandler, FunctionComponent } from "react";
import styled from "styled-components";
import { FiCheck } from "react-icons/fi";

const BASE_SIZE = 18;

export interface CheckboxIndicatorProps {
  checked: boolean;
  indeterminate?: boolean;
  size?: number;
  className?: string;
}

export interface CheckboxProps {
  checked: boolean;
  indeterminate?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  size?: number;
  id?: string;
  name?: string;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

export const CheckboxIndicator: FunctionComponent<CheckboxIndicatorProps> = ({
  checked,
  indeterminate = false,
  size = BASE_SIZE,
  className,
}) => (
  <IndicatorFrame
    aria-hidden="true"
    className={className}
    $size={size}
  >
    <IndicatorBox
      $checked={checked}
      $indeterminate={indeterminate}
      $scale={size / BASE_SIZE}
    >
      {indeterminate ? <IndeterminateLine /> : <FiCheck size={16} />}
    </IndicatorBox>
  </IndicatorFrame>
);

export const Checkbox: FunctionComponent<CheckboxProps> = ({
  checked,
  indeterminate = false,
  onChange,
  size = BASE_SIZE,
  id,
  name,
  disabled = false,
  ariaLabel,
  className,
}) => (
  <Wrapper className={className}>
    <HiddenInput
      aria-label={ariaLabel}
      checked={checked}
      disabled={disabled}
      id={id}
      name={name}
      onChange={onChange}
      type="checkbox"
    />
    <CheckboxIndicator
      checked={checked}
      indeterminate={indeterminate}
      size={size}
    />
  </Wrapper>
);

const Wrapper = styled.label`
  display: inline-flex;
  align-items: flex-start;
  cursor: pointer;
  position: relative;
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;

  &:focus-visible + span {
    outline: 2px solid #099CDB;
    outline-offset: 3px;
  }
`;

const IndicatorFrame = styled.span<{ $size: number }>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  min-width: ${(props) => props.$size}px;
  display: inline-flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-shrink: 0;
`;

const IndicatorBox = styled.span<{
  $checked: boolean;
  $indeterminate: boolean;
  $scale: number;
}>`
  width: ${BASE_SIZE}px;
  height: ${BASE_SIZE}px;
  border: 2px solid ${(props) => props.theme.colors.dark.mediumGrey};
  border-radius: 2px;
  background: ${(props) => (props.$checked || props.$indeterminate)
    ? props.theme.colors.green5
    : props.theme.colors.light.white};
  border-color: ${(props) => (props.$checked || props.$indeterminate)
    ? props.theme.colors.green5
    : props.theme.colors.dark.mediumGrey};
  color: ${(props) => props.theme.colors.light.white};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  pointer-events: none;
  transform: scale(${(props) => props.$scale});
  transform-origin: top left;

  svg {
    opacity: ${(props) => (props.$checked && !props.$indeterminate ? 1 : 0)};
    display: block;
  }
`;

const IndeterminateLine = styled.span`
  width: 10px;
  height: 3px;
  border-radius: 999px;
  background: currentColor;
`;
