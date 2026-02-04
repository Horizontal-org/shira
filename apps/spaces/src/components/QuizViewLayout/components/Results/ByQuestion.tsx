import { Body3, Body3Bold, defaultTheme, EmptyState, styled, Table } from "@shira/ui";
import { ColumnDef } from "@tanstack/react-table";
import { FunctionComponent, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TableAverageScore } from "./TableAverageScore";
import { MdOutlinePhishing } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { QuizResultsResponse } from "../../../../fetch/results";
import { appIcons } from "../../../../utils/appIcons";

interface Props {
  resultsByQuestion: NonNullable<QuizResultsResponse['metrics']['byQuestion']>
  loading: boolean
}

export const ByQuestion: FunctionComponent<Props> = ({
  resultsByQuestion,
  loading
}) => {
  const { t } = useTranslation();

  const columns = useMemo<ColumnDef<Props['resultsByQuestion'][0]>[]>(
      () => [
        {
          id: 'questionPosition',         
          cell: ({ row }) => (
            <TableId>{row.original.position}</TableId>
          ),
        },
        {
          header: t('results_tab.by_question.table.question_name'),
          id: 'questionName',
          cell: ({ row }) => {
            return (
              <StyledBody3Bold>{row.original.questionName}</StyledBody3Bold>
            )
          },
        },
        {
          id: 'isPhising',
          header: t('results_tab.by_question.table.type'),
          accessorKey: 'isPhising',
          cell: ({ row }) => {
            const isPhishing = Boolean(row.original.isPhising);
            return (
              <PhishingCell
                $isPhishing={isPhishing}
              >
                {isPhishing ? (
                  <MdOutlinePhishing size={16} />
                ) : (
                  <FaCircleCheck size={16} color={defaultTheme.colors.green6} />
                )}
                {isPhishing ? t("question_library.columns.type.phishing") : t("question_library.columns.type.legitimate")}
              </PhishingCell>
            );
          }
        },
        {
          id: 'appName',
          header: 'App',
          cell: ({ row }) => {
            return (
              <AppCell>
                {appIcons[row.original.appName] || null}
                {row.original.appName}
              </AppCell>
            )
          }
        },
        {
          id: 'score',
          header: t('results_tab.by_question.table.score'),
          cell: ({ row }) => {
            const totalRuns = parseInt(row.original.totalRuns);
            const correctCount = parseInt(row.original.correctCount);
            const score = totalRuns > 0 ? ((correctCount / totalRuns) * 100).toFixed(0) : '0';
            return (
              <TableAverageScore averageScore={score} />
            )
          }
        },
      ],
      [t]
    );

  return (
    <div>
      {resultsByQuestion.length === 0 && !loading ? (
        <EmptyState
          subtitle={t("results_tab.by_question.empty_state")}          
        />
      ) : (
        <Table
          loading={loading}
          loadingMessage={t('results_tab.by_question.table.loading')}
          data={resultsByQuestion}
          columns={columns}
          enableRowSelection={false}
          enablePagination={false}
          rowSelection={{}}
          setRowSelection={() => {}}
          colGroups={
            <colgroup>
              <col style={{ width: "50px" }} />
              <col />
              <col />
              <col />
              <col style={{ width: "350px" }}/>
            </colgroup>
          }
        />
      )}
    </div>
  )
}

const TableId = styled.span`
  font-weight: 700;
  font-size: 14px;
  color: ${props => props.theme.colors.green6};
`

const StyledBody3Bold = styled(Body3Bold)`
  color: ${props => props.theme.colors.dark.darkGrey};
`


const PhishingCell = styled.span<{ $isPhishing?: boolean }>`
  background: ${(props) => (
    props.$isPhishing
      ? defaultTheme.colors.light.paleRed
      : defaultTheme.colors.light.paleGreen)};
  color: ${(props) => (
    props.$isPhishing
      ? defaultTheme.colors.error9
      : defaultTheme.colors.green9)};
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 2px;
  padding: 4px 8px;
  font-weight: 400;
`;

const AppCell = styled(Body3)`
  color: ${defaultTheme.colors.dark.darkGrey};
  font-size: 14px;
  gap: 12px;
  display: flex;
  align-items: center;

  > svg {
    width: 16px;
    height: 16px;
  }
`;