import type { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { QuizSubmissionDto } from "../../../fetch/submissions";
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
  onLearnMore: () => void;
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
  onLearnMore,
}: QuizSubmissionsTabProps) => {
  const { t } = useTranslation();

  const columns = useMemo<ColumnDef<QuizSubmissionDto>[]>(() => ([
    {
      header: t("templates.submissions_table.quiz_name"),
      accessorKey: "name",
    },
    {
      header: t("templates.submissions_table.submitted_on"),
      accessorKey: "submittedOn",
    },
    {
      header: t("templates.submissions_table.status"),
      accessorKey: "status",
    },
  ]), [t]);

  return (
    <SubmissionTableContent
      data={submissions}
      columns={columns}
      colGroups={(
        <colgroup>
          <col style={{ width: "50%" }} />
          <col style={{ width: "25%" }} />
          <col style={{ width: "25%" }} />
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
      onLearnMore={onLearnMore}
    />
  );
};
