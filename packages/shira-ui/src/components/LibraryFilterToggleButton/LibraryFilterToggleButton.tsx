import { FunctionComponent } from "react";
import styled from "styled-components";
import { Button, defaultTheme } from "../..";
import { MdFilterAlt } from "react-icons/md";

export interface LibraryFilterToggleButtonProps {
  text: string;
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export const LibraryFilterToggleButton: FunctionComponent<LibraryFilterToggleButtonProps> = ({
  text,
  isOpen,
  onClick,
  className
}) => {
  return (
    <StyledFilterButton
      className={className}
      text={text}
      type="outline"
      leftIcon={<MdFilterAlt size={22} color={defaultTheme.colors.dark.darkGrey} />}
      onClick={onClick}
      $isOpen={isOpen}
    />
  );
};

const StyledFilterButton = styled(Button) <{ $isOpen: boolean }>`
  margin: 0;
  border: 1px solid ${props => (
    props.$isOpen
      ? props.theme.colors.dark.black
      : props.theme.colors.dark.mediumGrey
  )};
  box-shadow: ${props => props.$isOpen
    ? `0 0 0 1px ${props.theme.colors.dark.black}`
    : "none"};
  background: ${props => props.theme.colors.light.white};
  color: ${props => props.theme.colors.dark.black};

  &:focus {
    margin: 0;
    border: 1px solid ${props => (
      props.$isOpen
        ? props.theme.colors.dark.black
        : props.theme.colors.dark.mediumGrey
    )};
    box-shadow: 0 0 0 1px ${props => (
      props.$isOpen
        ? props.theme.colors.dark.black
        : props.theme.colors.dark.mediumGrey
    )};
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex: 1;
  }
`;
