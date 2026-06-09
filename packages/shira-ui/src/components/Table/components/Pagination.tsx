import { Table } from "@tanstack/react-table";
import { FunctionComponent } from "react";
import { BasePagination } from "../../BasePagination";

interface Props {
  table: Table<unknown>
}

export const Pagination: FunctionComponent<Props> = ({
  table
}) => {
  const { pageIndex, pageSize } = table.getState().pagination;
  const total = table.getPreFilteredRowModel().rows.length;

  return (
    <BasePagination
      pageIndex={pageIndex}
      pageCount={table.getPageCount()}
      pageSize={pageSize}
      total={total}
      canPreviousPage={table.getCanPreviousPage()}
      canNextPage={table.getCanNextPage()}
      onFirstPage={table.firstPage}
      onPreviousPage={table.previousPage}
      onNextPage={table.nextPage}
      onLastPage={table.lastPage}
    />
  )
}
