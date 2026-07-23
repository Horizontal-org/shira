import { Button, CardPagination, EmptyState, Table, styled, useTheme } from "@horizontal-org/shira-ui";
import { useNavigate } from "react-router-dom";
import type { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { usePaginationProps } from "../../../hooks/usePaginationProps";

interface SubmissionTableContentProps<TData extends object> {
  data: TData[];
  columns: ColumnDef<TData>[];
  colGroups: ReactNode;
  pageIndex: number;
  pageCount: number;
  pageSize: number;
  total: number;
  setPageIndex: Dispatch<SetStateAction<number>>;
  emptyStateSubtitle: string;
  learnMoreText: string;
}

export function SubmissionTableContent<TData extends object>({
  data,
  columns,
  colGroups,
  pageIndex,
  pageCount,
  pageSize,
  total,
  setPageIndex,
  emptyStateSubtitle,
  learnMoreText,
}: SubmissionTableContentProps<TData>) {
  const theme = useTheme();
  const navigate = useNavigate();
  const hasSubmissions = data.length > 0;
  const paginationProps = usePaginationProps({
    pageIndex,
    pageCount,
    pageSize,
    total,
    setPageIndex,
  });

  if (!hasSubmissions) {
    return (
      <EmptyStateWrapper>
        <EmptyState
          subtitle={emptyStateSubtitle}
          buttons={(
            <Button
              text={learnMoreText}
              type="primary"
              color={theme.colors.green7}
              onClick={() => navigate("/template-library")}
            />
          )}
        />
      </EmptyStateWrapper>
    );
  }

  return (
    <>
      <CardPagination {...paginationProps} />

      <Table
        size="full"
        loading={false}
        data={data}
        columns={columns}
        rowSelection={EMPTY_ROW_SELECTION}
        setRowSelection={noop}
        enablePagination={false}
        enableRowHover={false}
        colGroups={colGroups}
      />

      <CardPagination {...paginationProps} />
    </>
  );
}

const EmptyStateWrapper = styled.div`
  min-height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EMPTY_ROW_SELECTION: RowSelectionState = {};
const noop = () => undefined;
