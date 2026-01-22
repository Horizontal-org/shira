import { FunctionComponent, ReactNode, useMemo, useState } from "react";
import { Body4, EmptyState, Table, defaultTheme, styled } from "@shira/ui";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { FiCheck, FiX } from "react-icons/fi";
import { MdOutlineQuestionMark } from "react-icons/md";
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
          const messages = rowData.message ?? [];

          const renderMessagePill = (message: string) => {
            const isMissingError =
              rowData.status === "Error" && message.startsWith("missing_");

            const pillKind: "success" | "error" | "neutral" =
              rowData.status === "OK"
                ? "success"
                : rowData.status === "Error" && isMissingError
                  ? "error"
                  : "neutral";

            const iconVariant: "success" | "neutral" | "error" =
              rowData.status === "OK"
                ? "success"
                : isMissingError
                  ? "error"
                  : "neutral";

            return (
              <StatusPill key={`${rowData.row}-${message}`} $kind={pillKind}>
                {rowData.status !== "OK" && (
                  <StatusIcon $variant={iconVariant}>
                    {isMissingError ? (
                      <MdOutlineQuestionMark size={12} />
                    ) : (
                      <FiX size={12} />
                    )}
                  </StatusIcon>
                )}
                <Body4>
                  {t(`error_messages.learners_bulk_import.${message}`, {
                    defaultValue: message,
                  })}
                </Body4>
              </StatusPill>
            );
          };

          if (rowData.status === "OK") {
            return (
              <StatusList>
                <StatusPill $kind="success">
                  <StatusIcon $variant="success">
                    <FiCheck size={12} />
                  </StatusIcon>
                  <Body4>{validatedLabel}</Body4>
                </StatusPill>
              </StatusList>
            );
          }

          if (messages.length > 0) {
            return <StatusList>{messages.map(renderMessagePill)}</StatusList>;
          }

          return "-";
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
          <col style={{ width: "32%" }} />
          <col style={{ width: "32%" }} />
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

const StatusPill = styled.span<{ $kind: "success" | "neutral" | "error" }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 2px;
  font-weight: 600;
  font-size: 12px;

  color: ${({ theme, $kind }) =>
    $kind === "error"
      ? theme.colors.error9
      : $kind === "neutral"
        ? theme.colors.dark.darkGrey
        : theme.colors.green9};

  background: ${({ theme, $kind }) =>
    $kind === "error"
      ? theme.colors.light.paleRed
      : $kind === "neutral"
        ? theme.colors.light.paleGrey
        : theme.colors.light.paleGreen};
`;

const StatusList = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
`;

const StatusIcon = styled.span<{ $variant?: "success" | "neutral" | "error" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;

  background: ${({ theme, $variant }) =>
    $variant === "success"
      ? theme.colors.green6
      : $variant === "neutral"
        ? theme.colors.dark.darkGrey
        : theme.colors.error6};

  color: ${(props) => props.theme.colors.light.white};
`;
