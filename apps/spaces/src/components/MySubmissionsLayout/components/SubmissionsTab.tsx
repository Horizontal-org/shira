import type { ColumnDef } from "@tanstack/react-table";
import { Dispatch, SetStateAction, useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { SubmissionStatus } from "../../../fetch/submissions";
import i18n from "../../../language/i18n";
import {
  SubmissionActionButton,
  SubmissionDateCell,
  SubmissionNameCell,
  SubmissionStatusPill,
} from "./SubmissionTableCells";
import { SubmissionTableContent } from "./SubmissionTableContent";

type SubmissionRow = {
  dateSubmitted: string;
  status: SubmissionStatus;
};

type Props<TData extends SubmissionRow> = {
  submissions: TData[];
  pageIndex: number;
  pageCount: number;
  pageSize: number;
  total: number;
  setPageIndex: Dispatch<SetStateAction<number>>;
  nameHeader: string;
  nameAccessor: (submission: TData) => string;
  emptyStateSubtitle: string;
  onPreview: (submission: TData) => void;
};

export const SubmissionsTab = <TData extends SubmissionRow>({
  submissions,
  pageIndex,
  pageCount,
  pageSize,
  total,
  setPageIndex,
  nameHeader,
  nameAccessor,
  emptyStateSubtitle,
  onPreview,
}: Props<TData>) => {
  const { t } = useTranslation();

  const columns = useMemo<ColumnDef<TData>[]>(() => ([
    {
      header: nameHeader,
      id: "name",
      cell: ({ row }) => <SubmissionNameCell>{nameAccessor(row.original)}</SubmissionNameCell>,
    },
    {
      header: t("templates.submissions_table.date_submitted"),
      accessorKey: "dateSubmitted",
      cell: ({ row }) => (
        <SubmissionDateCell dateSubmitted={row.original.dateSubmitted} language={i18n.language} />
      ),
    },
    {
      header: t("templates.submissions_table.status"),
      accessorKey: "status",
      cell: ({ row }) => <SubmissionStatusPill status={row.original.status} />,
    },
    {
      header: t("templates.submissions_table.actions"),
      id: "actions",
      cell: ({ row }) => (
        <SubmissionActionButton
          label={t("templates.submissions_table.preview")}
          onClick={() => onPreview(row.original)}
        />
      ),
    },
  ]), [nameAccessor, nameHeader, onPreview, t]);

  return (
    <SubmissionTableContent
      data={submissions}
      columns={columns}
      colGroups={(
        <colgroup>
          <col style={{ width: "52%" }} />
          <col style={{ width: "22%" }} />
          <col style={{ width: "16%" }} />
          <col style={{ width: "10%" }} />
        </colgroup>
      )}
      pageIndex={pageIndex}
      pageCount={pageCount}
      pageSize={pageSize}
      total={total}
      setPageIndex={setPageIndex}
      emptyStateSubtitle={emptyStateSubtitle}
      learnMoreText={t("templates.submissions_empty_state.learn_more")}
    />
  );
};
