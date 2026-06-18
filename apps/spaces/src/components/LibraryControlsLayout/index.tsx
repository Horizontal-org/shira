import { Body1, styled } from "@horizontal-org/shira-ui";
import { FunctionComponent, ReactNode } from "react";

type Props = {
  searchControl: ReactNode;
  actions: ReactNode;
  filters?: ReactNode;
  searchSummary?: string;
};

export const LibraryControlsLayout: FunctionComponent<Props> = ({
  searchControl,
  actions,
  filters,
  searchSummary,
}) => {
  return (
    <Controls>
      <ControlsTopRow>
        {searchControl}

        <ActionsGroup>
          {actions}
        </ActionsGroup>
      </ControlsTopRow>

      <SummaryAndFiltersRow>
        {searchSummary && (
          <SearchSummaryContainer>
            <SearchSummaryText>
              {searchSummary}
            </SearchSummaryText>
          </SearchSummaryContainer>
        )}

        {filters}
      </SummaryAndFiltersRow>
    </Controls>
  );
};

const Controls = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ControlsTopRow = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ActionsGroup = styled.div`
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

const SummaryAndFiltersRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchSummaryContainer = styled.div`
  flex: 1 1 auto;
  min-width: 10px;
  overflow: hidden;
`;

const SearchSummaryText = styled(Body1)`
  margin: 0;
  padding: 4px 4px;
  color: ${(props) => props.theme.colors.dark.darkGrey};
`;
