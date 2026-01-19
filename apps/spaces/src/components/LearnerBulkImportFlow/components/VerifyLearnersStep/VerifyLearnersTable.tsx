import { FunctionComponent, ReactNode, useMemo, useState } from "react";
import { Body4, EmptyState, Table, styled } from "@shira/ui";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { FiCheck, FiX } from "react-icons/fi";
import { BulkLearnerRowResult } from "../../../../fetch/learner";
import { useTranslation } from "react-i18next";

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
          return (
            <TableCellText>
              {rowData.status === "OK" ? (
                <StatusPill $status={rowData.status}>
                  <StatusIcon $variant="success">
                    <FiCheck size={12} />
                  </StatusIcon>
                  <Body4>{validatedLabel}</Body4>
                </StatusPill>
              ) : rowData.message ? (
                <StatusPill $status={rowData.status}>
                  {rowData.status === "Error" && (
                    <StatusIcon>
                      <FiX size={12} />
                    </StatusIcon>
                  )}
                  {rowData.status === "Skipped" && (
                    <StatusIcon $variant="neutral">
                      <FiX size={12} />
                    </StatusIcon>
                  )}
                  <Body4>{t(`error_messages.learners_bulk_import.${rowData.message}`,
                    { defaultValue: rowData.message })}</Body4>
                </StatusPill>
              ) : (
                "-"
              )}
            </TableCellText>
          );
        },
      },
    ],
    [emailHeader, nameHeader, rowHeader, statusHeader, validatedLabel]
  );

  if (!isLoading && tableData.length === 0) {
    return (
      <EmptyState subtitle={emptyMessage} backgroundColor="white" />
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
      colGroups={(
        <colgroup>
          <col style={{ width: "80px" }} />
          <col style={{ width: "32%" }} />
          <col style={{ width: "32%" }} />
          <col />
        </colgroup>
      )}
    />
  );
};

const TableCellText = styled(Body4)`
  color: ${props => props.theme.colors.dark.darkGrey};
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RowNumber = styled(Body4)`
  color: ${props => props.theme.colors.green7};
  font-weight: 600;
`;

const StatusPill = styled.span<{ $status: "Error" | "Skipped" | "OK" }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: "2px";
  font-weight: 600;
  font-size: 12px;

  color: ${({ theme, $status }) =>
    $status === "Error" ? theme.colors.error9
      : $status === "Skipped" ? theme.colors.dark.darkGrey
        : theme.colors.green9};

  background: ${({ theme, $status }) =>
    $status === "Error" ? theme.colors.light.paleRed
      : $status === "Skipped" ? theme.colors.light.paleGrey
        : theme.colors.light.paleGreen};
`;

const StatusIcon = styled.span<{ $variant?: "success" | "neutral" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${({ theme, $variant }) =>
    $variant === "success" ? theme.colors.green6
      : $variant === "neutral" ? theme.colors.dark.darkGrey
        : theme.colors.error6};
  color: ${props => props.theme.colors.light.white};
`;
