import { Body1, Body3, Body3Bold, Button, CardPagination, defaultTheme, SettingsFishIcon, Table, styled, useTheme } from "@horizontal-org/shira-ui";
import type { ColumnDef } from "@tanstack/react-table";
import type { ComponentProps } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MdCalendarMonth, MdRemoveRedEye } from "react-icons/md";
import type { SubmissionStatus } from "../../../fetch/submissions";
import { formatLocaleDate } from "../../../language/dateUtils";
import i18n from "../../../language/i18n";
import { SubmissionStatusPill } from "../../SubmissionStatusPill";

export type SubmissionListItem = {
  resourceId: string;
  name: string;
  dateSubmitted: string;
  status: SubmissionStatus;
};

interface SubmissionsTableProps {
  type: "quizzes" | "questions";
  submissions: SubmissionListItem[];
  paginationProps: ComponentProps<typeof CardPagination>;
  onPreview: (resourceId: string) => void;
}

export const SubmissionsTable = ({
  type,
  submissions,
  paginationProps,
  onPreview
}: SubmissionsTableProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

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
      accessorKey: "actions",
      cell: ({ row }) => {
        return (
          <PreviewActionButton
            type="button"
            title={t("quiz_library.preview.columns.preview")}
            onClick={() => onPreview(row.original.resourceId)}
          >
            <MdRemoveRedEye
              size={20}
              color={defaultTheme.colors.dark.darkGrey}
            />
          </PreviewActionButton>
        );
      }
    },
  ];

  if (submissions.length === 0) {
    return (
      <EmptyStateWrapper>
        <SettingsFishIcon />

        <EmptyStateContent>
          <EmptyStateDescription>
            {t("templates.submissions_empty_state.subtitle")}
          </EmptyStateDescription>

          <ButtonWrapper>
            <Button
              id={`my-submissions-${type}-learn-more-button`}
              text={t("templates.submissions_empty_state.learn_more")}
              type="primary"
              color={theme.colors.green7}
              onClick={() => navigate("/template-library")}
            />
          </ButtonWrapper>
        </EmptyStateContent>
      </EmptyStateWrapper>
    );
  }

  return (
    <TableWrapper>
      {paginationProps.total > 0 && <CardPagination {...paginationProps} />}
      <Table
        size="full"
        loading={false}
        data={submissions}
        columns={columns}
        enableRowSelection={false}
        rowSelection={{}}
        setRowSelection={() => { }}
        enablePagination={false}
        enableRowHover={false}
        colGroups={(
          <colgroup>
            <col style={{ width: "58%" }} />
            <col style={{ width: "16%" }} />
            <col style={{ width: "16%" }} />
            <col style={{ width: "10%" }} />
          </colgroup>
        )}
      />
      {paginationProps.total > 0 && <CardPagination {...paginationProps} />}
    </TableWrapper>
  );
};

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmptyStateWrapper = styled.div`
  min-height: 264px;
  padding: 0 48px 0 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 48px;
  box-sizing: border-box;

  & > svg {
    width: 232px;
    height: auto;
    flex: 0 0 auto;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    min-height: 0;
    padding: 24px 0 8px;
    flex-direction: column;
    gap: 20px;

    & > svg {
      width: 180px;
    }
  }
`;

const EmptyStateContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  max-width: 700px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    align-items: center;
  }
`;

const EmptyStateDescription = styled(Body1)`
  margin: 0;
  color: ${defaultTheme.colors.dark.darkGrey};
  font-weight: 300;
  line-height: 1.5;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    text-align: center;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
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

const PreviewActionButton = styled.button`
  all: unset;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    cursor: not-allowed;
  }
`;