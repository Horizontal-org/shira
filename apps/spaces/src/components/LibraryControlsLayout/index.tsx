import { Body1, LibrarySearchInput, SortSelect, styled } from "@horizontal-org/shira-ui";
import { FunctionComponent, ReactNode } from "react";

type Props = {
  searchControl: ReactNode;
  actions: ReactNode;
  filters?: ReactNode;
  searchSummary?: string;
};

export const LibraryToolbar: FunctionComponent<Props> = ({
  searchControl,
  actions,
  filters,
  searchSummary,
}) => {
  return (
    <ToolbarContent>
      <ToolbarControlsRow>
        {searchControl}

        <ToolbarActions>
          {actions}
        </ToolbarActions>
      </ToolbarControlsRow>

      <LibraryToolbarRow>
        {searchSummary && (
          <SearchResultsSummary>
            {searchSummary}
          </SearchResultsSummary>
        )}

        {filters}
      </LibraryToolbarRow>
    </ToolbarContent>
  );
};

export const LibraryToolbarSearchInput = styled(LibrarySearchInput)`
  flex: 1 1 auto;
  min-width: 0;
  max-width: 628px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    width: 100%;
    max-width: none;
    min-width: 0;
  }
`;

export const LibraryToolbarSortSelect = styled(SortSelect)`
  min-width: 280px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex: 1;
    min-width: 0;
  }
`;

const ToolbarContent = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ToolbarControlsRow = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ToolbarActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-left: auto;
  flex-shrink: 0;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    width: 100%;
    margin-left: 0;
  }
`;

const LibraryToolbarRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchResultsSummary = styled(Body1)`
  flex: 1 1 auto;
  min-width: 10px;
  overflow: hidden;
  margin: 0;
  padding: 4px 4px;
  color: ${(props) => props.theme.colors.dark.darkGrey};
`;
