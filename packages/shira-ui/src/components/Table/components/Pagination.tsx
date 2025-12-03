import { Table } from "@tanstack/react-table";
import { FunctionComponent } from "react";

interface Props {
  table: Table<unknown>
}

export const Pagination:FunctionComponent<Props> = ({ table }) => {

  return (
    <div className="flex items-center gap-2">
    <button
      className="border rounded p-1"
      onClick={() => table.firstPage()}
      disabled={!table.getCanPreviousPage()}
    >
      {'<<'}
    </button>
    <button
      className="border rounded p-1"
      onClick={() => table.previousPage()}
      disabled={!table.getCanPreviousPage()}
    >
      {'<'}
    </button>
    <button
      className="border rounded p-1"
      onClick={() => table.nextPage()}
      disabled={!table.getCanNextPage()}
    >
      {'>'}
    </button>
    <button
      className="border rounded p-1"
      onClick={() => table.lastPage()}
      disabled={!table.getCanNextPage()}
    >
      {'>>'}
    </button>
    <span className="flex items-center gap-1">
      <div>Page</div>
      <strong>
        {table.getState().pagination.pageIndex + 1} of{' '}
        {table.getPageCount().toLocaleString()}
      </strong>
    </span>
  </div>
  )
}