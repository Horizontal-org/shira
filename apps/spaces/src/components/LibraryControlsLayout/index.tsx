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

      <SearchSummaryContainer $visible={Boolean(searchSummary)}>
        <SearchSummaryText>
          {searchSummary ?? ""}
        </SearchSummaryText>
      </SearchSummaryContainer>

      {filters}
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

const SearchSummaryContainer = styled.div<{ $visible: boolean }>`
  overflow: hidden;
  visibility: ${(props) => (props.$visible ? "visible" : "hidden")};
`;

const SearchSummaryText = styled(Body1)`
  margin: 0;
  padding: 4px 0 0;
  color: ${(props) => props.theme.colors.dark.darkGrey};
`;
