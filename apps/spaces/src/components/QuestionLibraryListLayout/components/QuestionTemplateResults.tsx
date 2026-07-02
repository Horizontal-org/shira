import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { Table } from "@horizontal-org/shira-ui";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { LibrarySearchEmptyState } from "../../LibrarySearchEmptyState";
import { RowType } from "./Columns";

type Props = {
  showEmptyState: boolean;
  loading: boolean;
  rows: RowType[];
  columns: ColumnDef<RowType>[];
  rowSelection: RowSelectionState;
  setRowSelection: Dispatch<SetStateAction<RowSelectionState>>;
};

export const QuestionTemplateResults: FunctionComponent<Props> = ({
  showEmptyState,
  loading,
  rows,
  columns,
  rowSelection,
  setRowSelection,
}) => {
  const { t } = useTranslation();

  return (
    <>
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
          enablePagination={true}
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
