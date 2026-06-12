import { FunctionComponent } from "react";
import styled from "styled-components";
import { SortSelect, SortSelectProps } from "../SortSelect";

export type LibrarySortSelectProps = SortSelectProps;

export const LibrarySortSelect: FunctionComponent<LibrarySortSelectProps> = (props) => {
  return <StyledSortSelect {...props} />;
};

const StyledSortSelect = styled(SortSelect)`
  min-width: 280px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex: 1;
    min-width: 0;
  }
`;
