import type { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { QuestionSubmissionDto } from "../../../fetch/submissions";
import {
  SubmissionActionButton,
  SubmissionDateCell,
  SubmissionNameCell,
  SubmissionStatusPill,
} from "./SubmissionTableCells";
import { SubmissionTableContent } from "./SubmissionTableContent";

interface QuestionSubmissionsTabProps {
  submissions: QuestionSubmissionDto[];
  pageIndex: number;
  pageCount: number;
  pageSize: number;
  total: number;
  setPageIndex: (updater: number | ((prev: number) => number)) => void;
  rowSelection: RowSelectionState;
  setRowSelection: (updater: RowSelectionState | ((prev: RowSelectionState) => RowSelectionState)) => void;
  onLearnMore: () => void;
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
  onLearnMore,
}: QuestionSubmissionsTabProps) => {
  const { t } = useTranslation();

  const columns = useMemo<ColumnDef<QuestionSubmissionDto>[]>(() => ([
    {
      header: t("templates.submissions_table.question_name"),
      accessorKey: "name",
      cell: ({ row }) => <SubmissionNameCell>{row.original.name}</SubmissionNameCell>,
    },
    {
      header: t("templates.submissions_table.submitted_on"),
      accessorKey: "submittedOn",
      cell: ({ row }) => <SubmissionDateCell submittedOn={row.original.submittedOn} />,
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
      onLearnMore={onLearnMore}
    />
  );
};
