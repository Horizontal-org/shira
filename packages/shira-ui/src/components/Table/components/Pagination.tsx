import { Table } from "@tanstack/react-table";
import { FunctionComponent } from "react";
import styled, { useTheme } from "styled-components";
import { Body2SemiBold, Body3 } from "../../Typography";
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { darken } from "polished";

interface Props {
  table: Table<unknown>
}

export const Pagination:FunctionComponent<Props> = ({ 
  table
}) => {

  const theme = useTheme()
  const offSetPageIndex = table.getState().pagination.pageIndex + 1

  return (
    <PaginationWrapper>
      <StyledBody2SemiBold>
        {`${table.getState().pagination.pageIndex * table.getState().pagination.pageSize } - ${offSetPageIndex * table.getState().pagination.pageSize} of ${table.getPreFilteredRowModel().rows.length}`}
      </StyledBody2SemiBold>
      <PaginationButtons>
        <PaginationButton 
          disabled={!table.getCanPreviousPage()}
          onClick={table.firstPage}
        >
          <FiChevronsLeft size={16} color={theme.colors.dark.darkGrey}/>
          <Body3>First</Body3>
        </PaginationButton>
        <PaginationButton
          disabled={!table.getCanPreviousPage()}
          onClick={table.previousPage}
        >
          <FiChevronLeft size={16} color={theme.colors.dark.darkGrey}/>
          <Body3>Back</Body3>
        </PaginationButton>
        <StyledBody2SemiBold>
          {`${offSetPageIndex} of ${table.getPageCount()}`}
        </StyledBody2SemiBold>
        <PaginationButton 
          disabled={!table.getCanNextPage()}
          onClick={table.nextPage}
        >
          <Body3>Next</Body3>
          <FiChevronRight size={16} color={theme.colors.dark.darkGrey}/>
        </PaginationButton>
        <PaginationButton
          disabled={!table.getCanNextPage()}
          onClick={table.lastPage}
        >
          <Body3>Last</Body3>
          <FiChevronsRight size={16} color={theme.colors.dark.darkGrey}/>
        </PaginationButton>
      </PaginationButtons>
    </PaginationWrapper>
  )
}

const StyledBody2SemiBold = styled(Body2SemiBold)`
  color: ${props => props.theme.colors.dark.darkGrey};
`

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  width: 100%;
`

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
      background: ${darken(0.1, 'white')};
      border-color: ${darken(0.1, 'white')};
      color: ${theme.colors.dark.black};
    }
    &:active {
      background: white;
      border-color: ${theme.colors.green4};
      color: ${theme.colors.dark.black};
    }
  `}
`

const PaginationButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`