import { default as React, ReactNode } from 'react';
import { ColumnDef, RowSelectionState } from '@tanstack/react-table';
type TableSize = 'full' | 'compact';
export interface TableProps {
    columns: Array<ColumnDef<any>>;
    data: Array<Object>;
    colGroups?: React.ReactNode;
    loading: boolean;
    rowSelection: RowSelectionState;
    setRowSelection: React.Dispatch<React.SetStateAction<any>>;
    enableRowSelection?: boolean;
    pageSize?: number;
    loadingMessage?: ReactNode;
    emptyMessage?: ReactNode;
    size?: TableSize;
    enablePagination?: boolean;
}
export declare const Table: ({ columns, data, colGroups, loading, rowSelection, setRowSelection, enableRowSelection, pageSize, loadingMessage, emptyMessage, size, enablePagination, }: TableProps) => import("react/jsx-runtime").JSX.Element;
export {};
