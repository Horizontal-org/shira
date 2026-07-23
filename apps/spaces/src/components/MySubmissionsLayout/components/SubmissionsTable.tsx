import { Body3, Body3Bold, Button, CardPagination, defaultTheme, EmptyState, Table, styled, useTheme } from "@horizontal-org/shira-ui";
import type { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MdCalendarMonth, MdRemoveRedEye } from "react-icons/md";
import type { SubmissionStatus } from "../../../fetch/submissions";
import { usePaginationProps } from "../../../hooks/usePaginationProps";
import { formatLocaleDate } from "../../../language/dateUtils";
import i18n from "../../../language/i18n";
import { SubmissionStatusPill } from "./SubmissionTableCells";

const PAGE_SIZE = 20;

export type SubmissionListItem = {
  name: string;
  dateSubmitted: string;
  status: SubmissionStatus;
  preview: () => void;
};

interface SubmissionsTableProps {
  type: "quizzes" | "questions";
  submissions: SubmissionListItem[];
}

export const SubmissionsTable = ({ type, submissions }: SubmissionsTableProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  const [pageIndex, setPageIndex] = useState(0);
  const pageCount = Math.max(1, Math.ceil(submissions.length / PAGE_SIZE));
  const pageStart = pageIndex * PAGE_SIZE;
  const pageSubmissions = submissions.slice(pageStart, pageStart + PAGE_SIZE);
  const paginationProps = usePaginationProps({
    pageIndex,
    pageCount,
    pageSize: PAGE_SIZE,
    total: submissions.length,
    setPageIndex,
  });

  const columns: ColumnDef<SubmissionListItem>[] = [
    {
      header: t(`templates.submissions_table.${type === "quizzes" ? "quiz_name" : "question_name"}`),
      accessorKey: "name",
      cell: ({ row }) =>
        <SubmissionName>{row.original.name}</SubmissionName>,
    },
    {
      header: t("templates.submissions_table.date_submitted"),
      accessorKey: "dateSubmitted",
      cell: ({ row }) => (
        <DateCell>
          <MdCalendarMonth size={18} color={defaultTheme.colors.error7} />
          <Body3>{formatLocaleDate(row.original.dateSubmitted, i18n.language)}</Body3>
        </DateCell>
      ),
    },
    {
      header: t("templates.submissions_table.status"),
      accessorKey: "status",
      cell: ({ row }) =>
        <SubmissionStatusPill status={row.original.status} />,
    },
    {
      header: t("templates.submissions_table.actions"),
      id: "actions",
      cell: ({ row }) => (
        <ActionButton
          type="button"
          title={t("templates.submissions_table.preview")}
          onClick={row.original.preview}>
          <MdRemoveRedEye size={24} color={defaultTheme.colors.dark.darkGrey} />
        </ActionButton>
      ),
    },
  ];

  if (submissions.length === 0) {
    return (
      <EmptyStateWrapper>
        <EmptyState
          subtitle={t(`templates.submissions_empty_state.${type}.subtitle`)}
          buttons={(
            <Button
              text={t("templates.submissions_empty_state.learn_more")}
              type="primary"
              color={theme.colors.green7}
              onClick={() => navigate("/template-library")}
            />
          )}
        />
      </EmptyStateWrapper>
    );
  }

  return (
    <>
      <CardPagination {...paginationProps} />

      <Table
        size="full"
        loading={false}
        data={pageSubmissions}
        columns={columns}
        rowSelection={{}}
        setRowSelection={null}
        enablePagination={false}
        enableRowHover={false}
        colGroups={(
          <colgroup>
            <col style={{ width: "52%" }} />
            <col style={{ width: "22%" }} />
            <col style={{ width: "16%" }} />
            <col style={{ width: "10%" }} />
          </colgroup>
        )}
      />

      <CardPagination {...paginationProps} />
    </>
  );
};

const EmptyStateWrapper = styled.div`
  min-height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SubmissionName = styled(Body3Bold)`
  color: ${defaultTheme.colors.dark.darkGrey};
`;

const DateCell = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${defaultTheme.colors.dark.darkGrey};
`;

const ActionButton = styled.button`
  all: unset;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
