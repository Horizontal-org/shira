import { FunctionComponent, ReactNode, useMemo, useState } from "react";
import { Body4, Table, styled } from "@shira/ui";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { StatusIconPill } from "../VerifyLearnersStep/StatusIconPill";

export interface ReviewRow {
  row: number;
  name: string;
  email: string;
  status: string;
}

interface Props {
  rows: ReviewRow[];
  isLoading: boolean;
  rowHeader: string;
  nameHeader: string;
  emailHeader: string;
  statusHeader: string;
  validatedLabel: string;
  loadingMessage: ReactNode;
}

export const FinalReviewTable: FunctionComponent<Props> = ({
  rows,
  isLoading,
  rowHeader,
  nameHeader,
  emailHeader,
  statusHeader,
  validatedLabel,
  loadingMessage,
}) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const columns = useMemo<ColumnDef<ReviewRow>[]>(
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
        accessorKey: "status",
        cell: (info) => {
          const status = info.getValue<string>();
          return (
            <TableCellText>
              {status === "OK" ? (
                <StatusIconPill status="OK" label={validatedLabel} />
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

  return (
    <Table
      loading={isLoading}
      loadingMessage={loadingMessage}
      data={rows}
      columns={columns}
      enableRowSelection={false}
      rowSelection={rowSelection}
      setRowSelection={setRowSelection}
      colGroups={(
        <colgroup>
          <col style={{ width: "100px" }} />
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
