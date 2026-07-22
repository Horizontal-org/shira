import type { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { Dispatch, SetStateAction, useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { QuestionSubmissionDto } from "../../../fetch/submissions";
import {
  SubmissionActionButton,
  SubmissionDateCell,
  SubmissionNameCell,
  SubmissionStatusPill,
} from "./SubmissionTableCells";
import { SubmissionTableContent } from "./SubmissionTableContent";
import i18n from "../../../language/i18n";

interface QuestionSubmissionsTabProps {
  submissions: QuestionSubmissionDto[];
  pageIndex: number;
  pageCount: number;
  pageSize: number;
  total: number;
  setPageIndex: Dispatch<SetStateAction<number>>;
  rowSelection: RowSelectionState;
  setRowSelection: Dispatch<SetStateAction<RowSelectionState>>;
  onPreview: (submission: QuestionSubmissionDto) => void;
}

export const QuestionSubmissionsTab = ({
  submissions,
  pageIndex,
  pageCount,
  pageSize,
  total,
  setPageIndex,
  rowSelection,
  setRowSelection,
  onPreview,
}: QuestionSubmissionsTabProps) => {
  const { t } = useTranslation();

  const columns = useMemo<ColumnDef<QuestionSubmissionDto>[]>(() => ([
    {
      header: t("templates.submissions_table.question_name"),
      accessorKey: "questionName",
      cell: ({ row }) => <SubmissionNameCell>{row.original.questionName}</SubmissionNameCell>,
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
          <col style={{ width: "54%" }} />
          <col style={{ width: "22%" }} />
          <col style={{ width: "14%" }} />
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
      emptyStateSubtitle={t("templates.submissions_empty_state.questions.subtitle")}
      learnMoreText={t("templates.submissions_empty_state.learn_more")}
    />
  );
};
