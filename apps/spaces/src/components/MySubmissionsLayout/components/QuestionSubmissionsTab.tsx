import type { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { QuestionSubmissionDto } from "../../../fetch/submissions";
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
    },
    {
      header: t("templates.submissions_table.type"),
      accessorKey: "type",
    },
    {
      header: t("templates.submissions_table.app"),
      accessorKey: "app",
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
          <col style={{ width: "34%" }} />
          <col style={{ width: "16%" }} />
          <col style={{ width: "16%" }} />
          <col style={{ width: "18%" }} />
          <col style={{ width: "16%" }} />
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
