import { FunctionComponent, ReactNode, useMemo, useState } from "react";
import { Body4, EmptyState, Table, defaultTheme, styled } from "@shira/ui";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { BulkLearnerRowResult } from "../../../../fetch/learner";
import { useTranslation } from "react-i18next";
import { StatusIconPill } from "./StatusIconPill";

interface Props {
  rows: BulkLearnerRowResult[];
  isLoading: boolean;
  rowHeader: string;
  nameHeader: string;
  emailHeader: string;
  statusHeader: string;
  validatedLabel: string;
  loadingMessage: ReactNode;
  emptyMessage: string;
}

export const VerifyLearnersTable: FunctionComponent<Props> = ({
  rows,
  isLoading,
  rowHeader,
  nameHeader,
  emailHeader,
  statusHeader,
  validatedLabel,
  loadingMessage,
  emptyMessage,
}) => {
  const { t } = useTranslation();

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const tableData = useMemo(
    () =>
      rows.map((row) => ({
        ...row,
        id: `${row.status}-${row.row}`,
      })),
    [rows]
  );

  const tableKey = `${statusHeader}-${tableData.length}`;

  const columns = useMemo<ColumnDef<(typeof tableData)[number]>[]>(
    () => [
      {
        header: rowHeader,
        accessorKey: "row",
        cell: (info) => <RowNumber>{info.getValue<number>()}</RowNumber>,
      },
      {
        header: nameHeader,
        accessorKey: "name",
        cell: (info) => <TableCellText>{info.getValue<string>() || "-"}</TableCellText>,
      },
      {
        header: emailHeader,
        accessorKey: "email",
        cell: (info) => <TableCellText>{info.getValue<string>() || "-"}</TableCellText>,
      },
      {
        header: statusHeader,
        id: "statusMessage",
        cell: ({ row }) => {
          const rowData = row.original;
          const messages = rowData.message ?? [];

          const messagePill = (message: string) => (
            <StatusIconPill
              key={`${rowData.row}-${message}`}
              status={rowData.status}
              message={message}
              label={t(`error_messages.learners_bulk_import.${message}`, {
                defaultValue: message,
              })}
            />
          );

          if (rowData.status === "OK") {
            return (
              <StatusList>
                <StatusIconPill status="OK" label={validatedLabel} />
              </StatusList>
            );
          }

          if (messages.length > 0) {
            return <StatusList>{messages.map(messagePill)}</StatusList>;
          }

          return <TableCellText>-</TableCellText>;
        },
      },
    ],
    [rowHeader, nameHeader, emailHeader, statusHeader, validatedLabel, t]
  );

  if (!isLoading && tableData.length === 0) {
    return (
      <EmptyState
        subtitle={emptyMessage}
        backgroundColor={defaultTheme.colors.light.white}
      />
    );
  }

  return (
    <Table
      key={tableKey}
      loading={isLoading}
      loadingMessage={loadingMessage}
      data={tableData}
      columns={columns}
      rowSelection={rowSelection}
      setRowSelection={setRowSelection}
      enableRowSelection={false}
      pageSize={Math.max(tableData.length, 1)}
      colGroups={
        <colgroup>
          <col style={{ width: "80px" }} />
          <col style={{ width: "26%" }} />
          <col style={{ width: "30%" }} />
          <col />
        </colgroup>
      }
    />
  );
};

const TableCellText = styled(Body4)`
  color: ${(props) => props.theme.colors.dark.darkGrey};
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RowNumber = styled(Body4)`
  color: ${(props) => props.theme.colors.green7};
  font-weight: 600;
`;

const StatusList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  max-width: 100%;
`;
