import { Button, CardPagination, EmptyState, Table, styled, useTheme } from "@horizontal-org/shira-ui";
import type { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import type { ReactNode } from "react";
import { InactiveLibraryPaginationContainer } from "../../TemplatePaginationWrapper";

interface SubmissionTableContentProps<TData extends object> {
  data: TData[];
  columns: ColumnDef<TData>[];
  colGroups: ReactNode;
  pageIndex: number;
  pageCount: number;
  pageSize: number;
  total: number;
  setPageIndex: (updater: number | ((prev: number) => number)) => void;
  rowSelection: RowSelectionState;
  setRowSelection: (updater: RowSelectionState | ((prev: RowSelectionState) => RowSelectionState)) => void;
  emptyStateSubtitle: string;
  learnMoreText: string;
  onLearnMore: () => void;
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
  rowSelection,
  setRowSelection,
  emptyStateSubtitle,
  learnMoreText,
  onLearnMore,
}: SubmissionTableContentProps<TData>) {
  const theme = useTheme();
  const hasSubmissions = data.length > 0;

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
              onClick={onLearnMore}
            />
          )}
        />
      </EmptyStateWrapper>
    );
  }

  return (
    <>
      <InactiveLibraryPaginationContainer>
        <CardPagination
          pageIndex={pageIndex}
          pageCount={pageCount}
          pageSize={pageSize}
          total={total}
          onFirstPage={() => handlePageChange(setPageIndex, setRowSelection, 0)}
          onPreviousPage={() => handlePageChange(setPageIndex, setRowSelection, Math.max(pageIndex - 1, 0))}
          onNextPage={() => handlePageChange(setPageIndex, setRowSelection, Math.min(pageIndex + 1, pageCount - 1))}
          onLastPage={() => handlePageChange(setPageIndex, setRowSelection, pageCount - 1)}
        />
      </InactiveLibraryPaginationContainer>

      <TableWrapper>
        <Table
          size="full"
          loading={false}
          data={data}
          columns={columns}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
          enableRowSelection={false}
          enablePagination={false}
          enableRowHover={false}
          colGroups={colGroups}
        />
      </TableWrapper>

      <InactiveLibraryPaginationContainer>
        <CardPagination
          pageIndex={pageIndex}
          pageCount={pageCount}
          pageSize={pageSize}
          total={total}
          onFirstPage={() => handlePageChange(setPageIndex, setRowSelection, 0)}
          onPreviousPage={() => handlePageChange(setPageIndex, setRowSelection, Math.max(pageIndex - 1, 0))}
          onNextPage={() => handlePageChange(setPageIndex, setRowSelection, Math.min(pageIndex + 1, pageCount - 1))}
          onLastPage={() => handlePageChange(setPageIndex, setRowSelection, pageCount - 1)}
        />
      </InactiveLibraryPaginationContainer>
    </>
  );
}

const handlePageChange = (
  setPageIndex: (updater: number | ((prev: number) => number)) => void,
  clearRowSelection: (updater: RowSelectionState | ((prev: RowSelectionState) => RowSelectionState)) => void,
  nextPage: number,
) => {
  setPageIndex(nextPage);
  clearRowSelection({});
};

const TableWrapper = styled.div`
  overflow: hidden;
`;

const EmptyStateWrapper = styled.div`
  min-height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
