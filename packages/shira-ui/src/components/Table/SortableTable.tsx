import type { ReactElement, ReactNode } from 'react'
import { flexRender } from '@tanstack/react-table'
import { Pagination } from './components/Pagination'
import {
  CenteredBody,
  CenteredCellContent,
  SharedTableProps,
  StyledTable,
  TableFooter,
  TableHeader,
  Td,
  Th,
  THead,
  Tr,
  useShiraTable,
  Wrapper,
} from '../../hooks/useShiraTable'

export interface SortableTableProps extends SharedTableProps {
  wrapRow?: (row: any, rowNode: ReactElement) => ReactNode
  tbodyProps?: Record<string, any>
  tbodyRef?: React.Ref<HTMLTableSectionElement>
  tbodyAfterRows?: ReactNode
}

export const SortableTable = ({
  columns = [],
  data = null,
  colGroups = null,
  loading,
  rowSelection,
  setRowSelection,
  enableRowSelection = true,
  pageSize = 20,
  loadingMessage = null,
  emptyMessage = null,
  size = 'compact',
  enablePagination = true,
  wrapRow,
  tbodyProps,
  tbodyRef,
  tbodyAfterRows,
}: SortableTableProps) => {
  const { table } = useShiraTable({
    columns,
    data,
    rowSelection,
    setRowSelection,
    enableRowSelection,
    pageSize,
  })

  const totalColumns = table.getAllLeafColumns().length

  return (
    <Wrapper>
      {enablePagination && (
        <Pagination table={table} />
      )}
      <TableHeader />
      <StyledTable>
        {colGroups}
        <THead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((h) => (
                <Th key={h.id} $size={size}>
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </Th>
              ))}
            </tr>
          ))}
        </THead>

        <tbody ref={tbodyRef} {...tbodyProps}>
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
                {emptyMessage ? (
                  <CenteredCellContent>{emptyMessage}</CenteredCellContent>
                ) : (
                  <CenteredBody>no questions found</CenteredBody>
                )}
              </Td>
            </Tr>
          ) : (
            table.getRowModel().rows.map((r) => {
              const selectable = r.getCanSelect()
              const selected = r.getIsSelected()
              const rowNode = (
                <Tr
                  key={r.id}
                  $selected={selected}
                  $selectable={selectable}
                  tabIndex={selectable ? 0 : -1}
                  role="row"
                  aria-selected={selected}
                  onKeyDown={(e) => {
                    if (!selectable) return
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      r.toggleSelected()
                    }
                  }}
                  onClick={() => {
                    if (!selectable) return
                    r.toggleSelected()
                  }}
                >
                  {r.getVisibleCells().map((c) => (
                    <Td key={c.id}>
                      {flexRender(c.column.columnDef.cell, c.getContext())}
                    </Td>
                  ))}
                </Tr>
              )

              return wrapRow ? wrapRow(r, rowNode) : rowNode
            })
          )}
          {tbodyAfterRows}
        </tbody>
      </StyledTable>
      <TableFooter />

      {enablePagination && (
        <Pagination table={table} />
      )}
    </Wrapper>
  )
}
