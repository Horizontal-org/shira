import React, { ReactNode } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table'
import styled from 'styled-components'
import { Body3 } from '../Typography'
import { Pagination } from './components/Pagination'

export interface TableProps {
  columns: Array<ColumnDef<any>>
  data: Array<Object>
  colGroups?: HTMLElement
  loading: boolean
  rowSelection: Object
  setRowSelection: React.Dispatch<React.SetStateAction<any>>
  pageSize?: number
  loadingMessage?: ReactNode
}

export const Table = ({
  columns = [],
  data = null,
  colGroups = null,
  loading,
  rowSelection,
  setRowSelection,
  pageSize = 25,
  loadingMessage = null
}) => {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize,
  })
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row: any) => row.id,
    state: {
      rowSelection,
      pagination
    },
    enableRowSelection: true, //enable row selection for all rows
    onRowSelectionChange: setRowSelection,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    debugTable: true,
  })

  const totalColumns = table.getAllLeafColumns().length;

  return (
    <Wrapper>  
      <Pagination table={table}/>   
      <TableHeader/>
      <StyledTable>
        { colGroups }
        <THead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {
                hg.headers.map((h) => (
                  <Th key={h.id}>
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </Th>
                ))
              }
            </tr>
          ))}
        </THead>
        <tbody>
          {loading ? (
            <Tr>
              <Td colSpan={totalColumns}>
                {loadingMessage ? (
                  <CenteredCellContent>{loadingMessage}</CenteredCellContent>
                ) : (
                  <CenteredBody>loading...</CenteredBody>
                )}
              </Td>
            </Tr>
          ) : table.getRowModel().rows.length === 0 ? (
            <Tr>
              <Td colSpan={totalColumns}>
                <CenteredBody>no questions found</CenteredBody>
              </Td>
            </Tr>
          ) : (
            table.getRowModel().rows.map((r) => (
              <Tr 
                key={r.id}
                $selected={r.getIsSelected()}
              >
                {r.getVisibleCells().map((c) => (
                  <Td key={c.id}>{flexRender(c.column.columnDef.cell, c.getContext())}</Td>
                ))}
              </Tr>
            ))
          )}
        </tbody>
      </StyledTable>
      <TableFooter />
      <Pagination table={table}/>   
    </Wrapper>
  )
}

const Wrapper =  styled.div`
  width: 100%;
`

const TableHeader = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 16px;
  background: ${props => props.theme.colors.light.paleGreen};
  border-radius: 20px 20px 0 0 ;
`

const TableFooter = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 16px;
  background: white;
  border-radius: 0 0 20px 20px;
  border-left: 1px solid ${props => props.theme.colors.light.paleGreen};
  border-right: 1px solid ${props => props.theme.colors.light.paleGreen};
  border-bottom: 1px solid ${props => props.theme.colors.light.paleGreen};
`

const StyledTable = styled('table')`
  background: ${props => props.theme.colors.light.paleGrey};
  width: 100%;
  table-layout: fixed;
  font-size: 14px; 
  border: none;
  border-spacing: 0;
  border-left: 1px solid ${props => props.theme.colors.light.paleGreen};
  border-right: 1px solid ${props => props.theme.colors.light.paleGreen};
`;
  // border-collapse: collapse;

const THead = styled("thead")`
  & th {
    background: ${props => props.theme.colors.light.paleGreen};
  }
`;

const Th = styled("th")`
  text-align: left;
  padding:  0 16px 14px 16px;
  font-weight: 600;
  font-size: 16px;
  color: ${props => props.theme.colors.dark.black};
  vertical-align: middle;
  border: none;
  box-sizing: border-box;
  width: inherit; 
`;

const Td = styled("td")`
  background: ${props => props.theme.colors.light.white};
  padding: 9px 16px;
  vertical-align: middle;
  box-sizing: border-box;
  width: inherit;
`;

  // &:not(:last-child) td {
  // }
const Tr = styled.tr<{ $selected?: boolean }>`
  color: ${props => props.theme.colors.dark.darkGrey};

  > td {
    border-top: 0.5px solid ${props => props.theme.colors.light.paleGrey};
    border-bottom: 0.5px solid ${props => props.theme.colors.light.paleGrey};
  }

  & td {
    background-color: ${({ $selected, theme }) => $selected ? theme.colors.green1 : theme.colors.light.white}; 
  }

  &:hover {
    > td {
      background-color: ${({ $selected, theme }) => $selected ? theme.colors.green1 : '#FAFBF0'};
    
      > label {
        visibility: visible; 
      }
    }    
  }


  ${props => props.$selected && `
    &:hover {
      > td {
        border-top: 0.5px solid ${props.theme.colors.green1};
        border-bottom: 0.5px solid ${props.theme.colors.green1}; 
      }
    }
    > td {
      border-top: 0.5px solid white;
      border-bottom: 0.5px solid white;  
    }
  `}
`;


const CenteredBody = styled(Body3)`
  text-align: center;
  font-weight: 400;
  font-size: 14px;
`;

const CenteredCellContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 16px 0;
`;
