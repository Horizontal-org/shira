import { flexRender } from '@tanstack/react-table'
import { Pagination } from './components/Pagination'
import {
  BlankLoadingHead,
  BlankLoadingBody,
  CenteredBody,
  CenteredCellContent,
  StyledTable,
  TableFooter,
  TableHeader,
  Td,
  Th,
  THead,
  Tr,
  Wrapper,
} from './Table.styles'
import { UseShiraTableProps, useShiraTable } from '../../hooks/useShiraTable'

export interface TableProps extends UseShiraTableProps { }

export const Table = ({
  columns = [],
  data = [],
  colGroups = null,
  loading,
  rowSelection,
  setRowSelection,
  enableRowSelection = true,
  pageSize = 25,
  loadingMessage = null,
  emptyMessage = null,
  size = 'compact',
  enablePagination = true,
  enableRowHover = true,
}: TableProps) => {
  const { table } = useShiraTable({
    columns,
    data,
    rowSelection,
    setRowSelection,
    enableRowSelection, // enable row selection for all rows
    pageSize,
  })

  const totalColumns = table.getAllLeafColumns().length
  const shouldShowBlankLoadingState = loading && !loadingMessage

  return (
    <Wrapper>
      {enablePagination && (
        <Pagination table={table} />
      )}
      <TableHeader />
      {shouldShowBlankLoadingState ? (
        <>
          <BlankLoadingHead $size={size} aria-hidden="true" />
          <BlankLoadingBody $size={size} aria-hidden="true" />
        </>
      ) : (
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

          <tbody>
            {loading ? (
              <Tr>
                <Td colSpan={totalColumns}>
                  <CenteredCellContent>{loadingMessage}</CenteredCellContent>
                </Td>
              </Tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <Tr>
                <Td colSpan={totalColumns}>
                  {emptyMessage ? (
                    <CenteredCellContent>{emptyMessage}</CenteredCellContent>
                  ) : (
                    <CenteredBody>no results found</CenteredBody>
                  )}
                </Td>
              </Tr>
            ) : (
              table.getRowModel().rows.map((r) => {
                const selectable = r.getCanSelect()
                const selected = r.getIsSelected()

                return (
                  <Tr
                    key={r.id}
                    $selected={selected}
                    $selectable={selectable}
                    $hoverable={enableRowHover}
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
              })
            )}
          </tbody>
        </StyledTable>
      )}
      <TableFooter />

      {enablePagination && (
        <Pagination table={table} />
      )}
    </Wrapper>
  )
}
