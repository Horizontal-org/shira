import type { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { Dispatch, SetStateAction, useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { QuizSubmissionDto } from "../../../fetch/submissions";
import {
  SubmissionActionButton,
  SubmissionDateCell,
  SubmissionNameCell,
  SubmissionStatusPill,
} from "./SubmissionTableCells";
import { SubmissionTableContent } from "./SubmissionTableContent";
import i18n from "../../../language/i18n";

interface QuizSubmissionsTabProps {
  submissions: QuizSubmissionDto[];
  pageIndex: number;
  pageCount: number;
  pageSize: number;
  total: number;
  setPageIndex: Dispatch<SetStateAction<number>>;
  rowSelection: RowSelectionState;
  setRowSelection: Dispatch<SetStateAction<RowSelectionState>>;
  onPreview: (submission: QuizSubmissionDto) => void;
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
  onPreview,
}: QuizSubmissionsTabProps) => {
  const { t } = useTranslation();

  const columns = useMemo<ColumnDef<QuizSubmissionDto>[]>(() => ([
    {
      header: t("templates.submissions_table.quiz_name"),
      accessorKey: "title",
      cell: ({ row }) => <SubmissionNameCell>{row.original.title}</SubmissionNameCell>,
    },
    {
      header: t("templates.submissions_table.date_submitted"),
      accessorKey: "dateSubmitted",
      cell: ({ row }) =>
        <SubmissionDateCell
          dateSubmitted={row.original.dateSubmitted}
          language={i18n.language}
        />,
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
  ]), [onPreview, t]);

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
