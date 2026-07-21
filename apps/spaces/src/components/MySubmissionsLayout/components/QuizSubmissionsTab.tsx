import type { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { QuizSubmissionDto } from "../../../fetch/submissions";
import {
  SubmissionActionButton,
  SubmissionDateCell,
  SubmissionNameCell,
  SubmissionStatusPill,
} from "./SubmissionTableCells";
import { SubmissionTableContent } from "./SubmissionTableContent";

interface QuizSubmissionsTabProps {
  submissions: QuizSubmissionDto[];
  pageIndex: number;
  pageCount: number;
  pageSize: number;
  total: number;
  setPageIndex: (updater: number | ((prev: number) => number)) => void;
  rowSelection: RowSelectionState;
  setRowSelection: (updater: RowSelectionState | ((prev: RowSelectionState) => RowSelectionState)) => void;
}

export const QuizSubmissionsTab = ({
  submissions,
  pageIndex,
  pageCount,
  pageSize,
  total,
  setPageIndex,
  rowSelection,
  setRowSelection,
}: QuizSubmissionsTabProps) => {
  const { t } = useTranslation();

  const columns = useMemo<ColumnDef<QuizSubmissionDto>[]>(() => ([
    {
      header: t("templates.submissions_table.quiz_name"),
      accessorKey: "name",
      cell: ({ row }) => <SubmissionNameCell>{row.original.name}</SubmissionNameCell>,
    },
    {
      header: t("templates.submissions_table.date_submitted"),
      accessorKey: "dateSubmitted",
      cell: ({ row }) => <SubmissionDateCell dateSubmitted={row.original.dateSubmitted} />,
    },
    {
      header: t("templates.submissions_table.status"),
      accessorKey: "status",
      cell: ({ row }) => <SubmissionStatusPill status={row.original.status} />,
    },
    {
      header: t("templates.submissions_table.actions"),
      id: "actions",
      cell: () => (
        <SubmissionActionButton
          label={t("templates.submissions_table.preview")}
        />
      ),
    },
  ]), [t]);

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
      rowSelection={rowSelection}
      setRowSelection={setRowSelection}
      emptyStateSubtitle={t("templates.submissions_empty_state.quizzes.subtitle")}
      learnMoreText={t("templates.submissions_empty_state.learn_more")}
    />
  );
};
