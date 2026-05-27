import { FunctionComponent } from "react";
import { darken } from "polished";
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import styled, { useTheme } from "styled-components";
import { Body2Regular, Body2SemiBold, Body3 } from "../Typography";

interface BasePaginationProps {
  pageIndex: number
  pageCount: number
  pageSize: number
  total: number
  canPreviousPage: boolean
  canNextPage: boolean
  onFirstPage: () => void
  onPreviousPage: () => void
  onNextPage: () => void
  onLastPage: () => void
}

export const BasePagination: FunctionComponent<BasePaginationProps> = ({
  pageIndex,
  pageCount,
  pageSize,
  total,
  canPreviousPage,
  canNextPage,
  onFirstPage,
  onPreviousPage,
  onNextPage,
  onLastPage,
}) => {
  const theme = useTheme();
  const offSetPageIndex = pageIndex + 1;

  const start = total === 0 ? 0 : pageIndex * pageSize + 1;
  const end = Math.min((pageIndex + 1) * pageSize, total);

  return (
    <PaginationWrapper>
      <StyledBody2SemiBold>
        {`${start}-${end} of ${total}`}
      </StyledBody2SemiBold>
      <PaginationButtons>
        <PaginationButton
          type="button"
          disabled={!canPreviousPage}
          onClick={onFirstPage}
        >
          <FiChevronsLeft size={16} color={theme.colors.dark.darkGrey} />
          <Body3>First</Body3>
        </PaginationButton>
        <PaginationButton
          type="button"
          disabled={!canPreviousPage}
          onClick={onPreviousPage}
        >
          <FiChevronLeft size={16} color={theme.colors.dark.darkGrey} />
          <Body3>Back</Body3>
        </PaginationButton>

        <PaginationNavButton>
          <StyledBody2Bold>{`${offSetPageIndex} `}</StyledBody2Bold>
          <Body2>{`of ${pageCount}`}</Body2>
        </PaginationNavButton>

        <PaginationButton
          type="button"
          disabled={!canNextPage}
          onClick={onNextPage}
        >
          <Body3>Next</Body3>
          <FiChevronRight size={16} color={theme.colors.dark.darkGrey} />
        </PaginationButton>
        <PaginationButton
          type="button"
          disabled={!canNextPage}
          onClick={onLastPage}
        >
          <Body3>Last</Body3>
          <FiChevronsRight size={16} color={theme.colors.dark.darkGrey} />
        </PaginationButton>
      </PaginationButtons>
    </PaginationWrapper>
  );
};

const StyledBody2Bold = styled(Body2SemiBold)`
  color: ${props => props.theme.colors.dark.darkGrey};
  font-weight: 700;
`;

const StyledBody2SemiBold = styled(Body2SemiBold)`
  color: ${props => props.theme.colors.dark.darkGrey};
`;

const Body2 = styled(Body2Regular)`
  color: ${props => props.theme.colors.dark.darkGrey};
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  width: 100%;
  margin: 0;
`;

const PaginationButton = styled.button<{
  disabled: boolean
}>`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 6px 10px;
  color: ${props => props.theme.colors.dark.darkGrey};
  border-radius: 4px;
  border: 2px solid white;
  background: white;
  gap: 8px;

  ${({ disabled }) => disabled && `
    opacity: 0.5;
    cursor: not-allowed;
  `}

  ${({ disabled, theme }) => !disabled && `
    &:hover {
      background: ${darken(0.1, "white")};
      border-color: ${darken(0.1, "white")};
      color: ${theme.colors.dark.black};
    }
    &:active {
      background: white;
      border-color: ${theme.colors.green4};
      color: ${theme.colors.dark.black};
    }
  `}
`;

const PaginationButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const PaginationNavButton = styled(PaginationButtons)`
  display: flex;
  align-items: center;
  gap: 4px;
`;
