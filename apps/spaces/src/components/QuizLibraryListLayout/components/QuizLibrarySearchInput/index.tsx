import { FunctionComponent } from "react";
import { CardPagination, TextInput, Button, defaultTheme, styled } from "@shira/ui";
import { FiChevronDown } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { HiFunnel } from "react-icons/hi2";

type Props = {
  pageIndex: number;
  total: number;
  pageCount: number;
  onFirstPage: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onLastPage: () => void;
};

export const QuizLibrarySearchInput: FunctionComponent<Props> = ({
  pageIndex,
  total,
  pageCount,
  onFirstPage,
  onPreviousPage,
  onNextPage,
  onLastPage,
}) => {
  return (
    <Controls>
      <TopRow>
        <SearchColumn>
          <SearchInputWrap>
            <SearchIcon aria-hidden="true">
              <FiSearch size={18} />
            </SearchIcon>
            <TextInput
              onChange={() => { }}
              value=""
              placeholder="Search quiz titles"
            />
          </SearchInputWrap>
        </SearchColumn>

        <ActionsGroup>
          <SortByButton
            text="Sort by"
            type="outline"
            rightIcon={<FiChevronDown size={20} />}
          />

          <FilterButton
            text="Filters"
            type="outline"
            leftIcon={<HiFunnel size={20} color={defaultTheme.colors.dark.darkGrey} />}
          />
        </ActionsGroup>
      </TopRow>

      <PaginationRow>
        <CardPagination
          pageIndex={pageIndex}
          total={total}
          pageCount={pageCount}
          onFirstPage={onFirstPage}
          onPreviousPage={onPreviousPage}
          onNextPage={onNextPage}
          onLastPage={onLastPage}
        />
      </PaginationRow>
    </Controls>
  );
};

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchColumn = styled.div`
  flex: 1;
  min-width: 0;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
  }
`;

const ActionsGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 24px;
  margin-left: auto;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    margin-left: 0;
    justify-content: stretch;
    flex-direction: column;
    gap: 16px;
  }
`;

const SearchInputWrap = styled.div`
  position: relative;

  & input {
    padding-left: 44px;
    border-width: 1px;
    border-color: ${defaultTheme.colors.green4};
    border-radius: 18px;
    background: ${defaultTheme.colors.light.white};
  }

  & input:focus:not(:disabled) {
    box-shadow: 0 0 0 1px ${defaultTheme.colors.green4};
    background: ${defaultTheme.colors.light.white};
  }

  & input:hover:not(:disabled) {
    background: ${defaultTheme.colors.light.white};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: ${defaultTheme.colors.dark.darkGrey};
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 1;
`;

const PaginationRow = styled.div`
  padding: 0 2px;
`;

const SortByButton = styled(Button)`
  min-width: 220px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
  }
`;

const FilterButton = styled(Button)`
  min-width: 144px;
  justify-content: center;
  gap: 2px;
  padding: 12px 22px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
  }
`;
