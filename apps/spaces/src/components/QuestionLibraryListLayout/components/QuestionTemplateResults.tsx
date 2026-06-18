import { ComponentProps, Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from "react";
import { CardPagination, Table } from "@horizontal-org/shira-ui";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { LibrarySearchEmptyState } from "../../LibrarySearchEmptyState";
import { RowType } from "./Columns";
import { TemplatePaginationWrapper } from "../../TemplatePaginationWrapper";

type Props = {
  shouldShowPagination: boolean;
  paginationProps: ComponentProps<typeof CardPagination>;
  showEmptyState: boolean;
  loading: boolean;
  rows: RowType[];
  columns: ColumnDef<RowType>[];
  rowSelection: RowSelectionState;
  setRowSelection: Dispatch<SetStateAction<RowSelectionState>>;
};

export const QuestionTemplateResults: FunctionComponent<Props> = ({
  shouldShowPagination,
  paginationProps,
  showEmptyState,
  loading,
  rows,
  columns,
  rowSelection,
  setRowSelection,
}) => {
  const { t } = useTranslation();
  const [stablePaginationProps, setStablePaginationProps] = useState(paginationProps);

  useEffect(() => {
    if (shouldShowPagination) {
      setStablePaginationProps(paginationProps);
    }
  }, [paginationProps, shouldShowPagination]);

  const shouldKeepPaginationVisible = rows.length > 0 && (loading || showEmptyState);
  const shouldRenderPagination = shouldShowPagination || shouldKeepPaginationVisible;
  const paginationPropsToRender = shouldShowPagination ? paginationProps : stablePaginationProps;
  const shouldShowTableLoadingState = loading && rows.length === 0;

  return (
    <>
      <TemplatePaginationWrapper $visible={shouldRenderPagination} $inactive={!shouldShowPagination}>
        <CardPagination {...paginationPropsToRender} />
      </TemplatePaginationWrapper>

      {showEmptyState ? (
        <LibrarySearchEmptyState
          title={t("library.empty_search.title")}
          subtitle={t("library.empty_search.subtitle")}
        />
      ) : (
        <Table
          size="full"
          loading={shouldShowTableLoadingState}
          loadingMessage={t("loading_messages.loading_library_questions")}
          emptyMessage={t("success_messages.no_questions_found")}
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
    </>
  );
};
