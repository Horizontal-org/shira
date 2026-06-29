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
  border: ${props => (props.$isOpen ? '2px' : '1px')} solid ${props => (
    props.$isOpen
      ? props.theme.colors.dark.black
      : props.theme.colors.dark.mediumGrey
  )};
  background: ${props => props.theme.colors.light.white};
  color: ${props => props.theme.colors.dark.black};

  &:focus {
    margin: 0;
    border: 2px solid ${props => (
    props.$isOpen
      ? props.theme.colors.dark.black
      : props.theme.colors.dark.mediumGrey
  )};
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex: 1;
  }
`;
