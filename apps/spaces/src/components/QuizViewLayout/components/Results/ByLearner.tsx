import { Body3, Body3Bold, defaultTheme, EmptyState, styled, Table } from "@shira/ui";
import { ColumnDef } from "@tanstack/react-table";
import { FunctionComponent, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { QuizResultsResponse } from "../../../../fetch/results";
import { TableAverageScore } from "./TableAverageScore";
import { format } from "date-fns";
import { getCurrentDateFNSLocales } from "../../../../language/dateUtils";
import i18n from "../../../../language/i18n";
import { enUS } from "date-fns/locale";

interface Props {
  resultsByLearner: NonNullable<QuizResultsResponse['metrics']['byLearner']>;
  loading: boolean
}

export const ByLearner: FunctionComponent<Props> = ({
  resultsByLearner,
  loading
}) => {
  const { t } = useTranslation();
  const currentDateLocal = useMemo(() => {
    const dateLocales = getCurrentDateFNSLocales();
    return dateLocales[i18n.language] ?? enUS;
  }, []);

  const columns = useMemo<ColumnDef<Props['resultsByLearner'][0]>[]>(
      () => [
        {
          header: t('results_tab.by_learner.table.learner'),
          id: 'learner',
          cell: ({ row }) => {
            return (
              <div>
                <StyledBody3Bold>{row.original.learnerName}</StyledBody3Bold>
                <StyledBody3>{row.original.learnerEmail}</StyledBody3>
              </div>
            )
          },
        },    
        {
          header: t('results_tab.by_learner.table.date'),
          id: 'dateSubmitted',
          cell: ({ row }) => {          
            return (
              <StyledBody3>{format(row.original.dateSubmitted, 'd MMMM y', { locale: currentDateLocal })}</StyledBody3>
            )
          }
        },
        {
          id: 'score',
          header: t('results_tab.by_learner.table.score'),
          cell: ({ row }) => {
            const totalRuns = parseInt(row.original.totalQuestionRuns);
            const correctCount = parseInt(row.original.correctCount);
            const score = totalRuns > 0 ? ((correctCount / totalRuns) * 100).toFixed(0) : '0';
            return (
              <TableAverageScore averageScore={score} />
            )
          }
        },
      ],
      [t, currentDateLocal]
    );

  return (
    <div>
      {resultsByLearner.length === 0 && !loading ? (
        <EmptyState
          subtitle={t("results_tab.by_learner.empty_state")}          
        />
      ) : (
      <Table
        loading={loading}
        loadingMessage={t('results_tab.by_learner.table.loading')}
        data={resultsByLearner}
        columns={columns}
        enableRowSelection={false}
        enablePagination={true}
        rowSelection={{}}
        setRowSelection={() => {}}
        colGroups={
          <colgroup>
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

const StyledBody3Bold = styled(Body3Bold)`
  color: ${props => props.theme.colors.dark.darkGrey};
`

const StyledBody3 = styled(Body3)`
  color: ${props => props.theme.colors.dark.darkGrey};
  margin-top: 2px;
`
