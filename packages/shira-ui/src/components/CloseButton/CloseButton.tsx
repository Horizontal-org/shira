import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { FiX } from "react-icons/fi";
import styled from "styled-components";

export interface CloseButtonProps extends ComponentPropsWithoutRef<"button"> {
  size?: number;
  iconSize?: number;
}

export const CloseButton: FunctionComponent<CloseButtonProps> = ({
  iconSize = 20,
  size = 40,
  type = "button",
  ...props
}) => (
  <StyledCloseButton
    aria-label="Close"
    type={type}
    $size={size}
    {...props}
  >
    <FiX size={iconSize} />
  </StyledCloseButton>
);

const StyledCloseButton = styled.button<{ $size: number }>`
  all: unset;
  -webkit-tap-highlight-color: transparent;
  box-sizing: border-box;
  width: ${(props) => `${props.$size}px`};
  height: ${(props) => `${props.$size}px`};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
  line-height: 1;
  color: ${(props) => props.theme.colors.dark.darkGrey};
  background: transparent;

  &:focus-visible {
    outline-offset: 2px;
  }
`;
