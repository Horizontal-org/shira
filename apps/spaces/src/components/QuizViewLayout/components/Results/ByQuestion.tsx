import {
  Body3,
  Body3Bold,
  defaultTheme,
  EmptyState,
  QuestionTypeChip,
  styled,
  Table,
} from "@horizontal-org/shira-ui";
import { ColumnDef } from "@tanstack/react-table";
import { FunctionComponent, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TableAverageScore } from "./TableAverageScore";
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

  const columns = useMemo<ColumnDef<Props["resultsByQuestion"][0]>[]>(
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
          return <QuestionTypeChip isPhishing={isPhishing} variant="table" />;
        },
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
          enableRowHover={false}
          enableRowSelection={false}
          enablePagination={false}
          rowSelection={{}}
          setRowSelection={() => { }}
          colGroups={
            <colgroup>
              <col style={{ width: "50px" }} />
              <col />
              <col />
              <col />
              <col style={{ width: "350px" }} />
            </colgroup>
          }
        />
      )}
    </div>
  )
};

const TableId = styled.span`
  font-weight: 700;
  font-size: 14px;
  color: ${props => props.theme.colors.green6};
`

const StyledBody3Bold = styled(Body3Bold)`
  color: ${(props) => props.theme.colors.dark.darkGrey};
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
