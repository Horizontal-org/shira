import { ComponentProps, Dispatch, FunctionComponent, SetStateAction } from "react";
import { CardPagination, Table } from "@horizontal-org/shira-ui";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { LibrarySearchEmptyState } from "../../LibrarySearchEmptyState";
import { RowType } from "./Columns";

type Props = {
  showEmptyState: boolean;
  loading: boolean;
  paginationProps: ComponentProps<typeof CardPagination>;
  rows: RowType[];
  columns: ColumnDef<RowType>[];
  rowSelection: RowSelectionState;
  setRowSelection: Dispatch<SetStateAction<RowSelectionState>>;
};

export const QuestionTemplateResults: FunctionComponent<Props> = ({
  showEmptyState,
  loading,
  paginationProps,
  rows,
  columns,
  rowSelection,
  setRowSelection,
}) => {
  const { t } = useTranslation();
  const shouldShowPagination = paginationProps.total > 0 && !showEmptyState;
  const {
    pageIndex,
    pageCount,
    pageSize,
    total,
    onFirstPage,
    onPreviousPage,
    onNextPage,
    onLastPage,
  } = paginationProps;

  return (
    <>
      {shouldShowPagination && (
        <CardPagination
          pageIndex={pageIndex}
          pageCount={pageCount}
          pageSize={pageSize}
          total={total}
          onFirstPage={onFirstPage}
          onPreviousPage={onPreviousPage}
          onNextPage={onNextPage}
          onLastPage={onLastPage}
        />
      )}

      {showEmptyState ? (
        <LibrarySearchEmptyState
          title={t("library.empty_search.title")}
          subtitle={t("library.empty_search.subtitle")}
        />
      ) : (
        <Table
          size="full"
          loading={loading}
          data={rows}
          columns={columns}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
          enableRowSelection={false}
          enablePagination={false}
          colGroups={
            <colgroup>
              <col style={{ width: "4%" }} />
              <col style={{ width: "24%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "11%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "14%" }} />
              <col style={{ width: "10%" }} />
            </colgroup>
          }
        />
      )}

      {shouldShowPagination && (
        <CardPagination
          pageIndex={pageIndex}
          pageCount={pageCount}
          pageSize={pageSize}
          total={total}
          onFirstPage={onFirstPage}
          onPreviousPage={onPreviousPage}
          onNextPage={onNextPage}
          onLastPage={onLastPage}
        />
      )}
    </>
  );
};
