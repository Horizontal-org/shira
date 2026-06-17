import { FunctionComponent } from "react";
import styled from "styled-components";
import { FilterToggleButton, FilterToggleButtonProps } from "../FilterToggleButton";

export type LibraryFilterToggleButtonProps = FilterToggleButtonProps;

export const LibraryFilterToggleButton: FunctionComponent<LibraryFilterToggleButtonProps> = (props) => {
  return <StyledFilterToggleButton {...props} />;
};

const StyledFilterToggleButton = styled(FilterToggleButton)`
  min-width: 144px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex: 1;
  }
`;
