import React, { ReactNode, useEffect } from 'react'
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  PaginationState,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table'
import { TableSize } from '../components/Table/Table.styles'

export interface Props {
  columns: Array<ColumnDef<any>>
  data: Array<Object>
  colGroups?: ReactNode
  loading: boolean
  rowSelection: RowSelectionState
  setRowSelection: React.Dispatch<React.SetStateAction<any>>
  enableRowSelection?: boolean
  pageSize?: number
  loadingMessage?: ReactNode
  emptyMessage?: ReactNode
  size?: TableSize
  enablePagination?: boolean
  enableRowHover?: boolean
}

export const useShiraTable = ({
  columns,
  data,
  rowSelection,
  setRowSelection,
  enableRowSelection = true,
  pageSize = 20,
}: Pick<
  Props,
  'columns' | 'data' | 'rowSelection' | 'setRowSelection' | 'enableRowSelection' | 'pageSize'
>) => {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  useEffect(() => {
    setPagination((current) => {
      if (current.pageSize === pageSize) {
        return current;
      }

      const maxPageIndex = Math.max(0, Math.ceil(data.length / pageSize) - 1);
      return {
        pageIndex: Math.min(current.pageIndex, maxPageIndex),
        pageSize,
      };
    });
  }, [data.length, pageSize]);

  useEffect(() => {
    const maxPageIndex = Math.max(0, Math.ceil(data.length / pagination.pageSize) - 1);

    if (pagination.pageIndex > maxPageIndex) {
      setPagination((current) => ({
        ...current,
        pageIndex: maxPageIndex,
      }));
    }
  }, [data.length, pagination.pageIndex, pagination.pageSize]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row: any) => row.id,
    state: {
      rowSelection,
      pagination,
    },
    enableRowSelection,
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getFilteredRowModel: getFilteredRowModel(),
    autoResetPageIndex: false,
  })

  return { table }
}
