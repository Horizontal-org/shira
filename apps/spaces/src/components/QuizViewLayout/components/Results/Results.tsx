import { FunctionComponent, useMemo } from "react";
import { Body2Regular, H1, H2, styled, SubHeading3 } from '@shira/ui'
import { QuizResultsResponse } from "../../../../fetch/results";
import { useTranslation } from "react-i18next";
import { ByQuestion } from "./ByQuestion";
import { ByLearner } from "./ByLearner";

interface ResultsProps {
  resultsData: QuizResultsResponse | null;
  loading: boolean;
  quizVisibility: string;
}

export const Results: FunctionComponent<ResultsProps> = ({ resultsData, loading, quizVisibility }) => {
  
  console.log("🚀 ~ Results ~ resultsData:", resultsData)

  const { t } = useTranslation();

  const getCompletedQuizzesData = () => {
    if (loading) return { value: '...', description: t('loading_messages.loading') };
    if (!resultsData) return { value: '-', description: t('error_messages.results_load_failed') };
    const count = resultsData.metrics.completedCount;
    return {
      value: count,
      description: `${t('results_tab.completed_quizzes.subtitle')} ${count > 0 ? t('results_tab.completed_quizzes.public_learners') : ''}.`
    };
  };

  const getAverageScoreData = () => {
    if (loading) return { value: '...', description: t('loading_messages.loading') };
    if (!resultsData) return { value: 'N/A', description: t('error_messages.results_load_failed') };
    const { metrics } = resultsData;
    const averageScoreDisplay = metrics.completedCount > 0 ? `${metrics.averageScore}%` : 'N/A';
    return {
      value: averageScoreDisplay,
      description: metrics.completedCount > 0
        ? t('results_tab.average_score.subtitle')
        : t('results_tab.average_score.empty_subtitle')
    };
  };


  const getRate = useMemo(() => {
    if (loading) return '...'
    if (!resultsData) return 'N/A'
    return resultsData.metrics.completionRate ? resultsData.metrics.completionRate + '%' : 'N/A'
  }, [loading, resultsData])

  const completedQuizzesData = getCompletedQuizzesData();
  const averageScoreData = getAverageScoreData();

  return (
    <div>
      <MetricTitle>{t('results_tab.title')}</MetricTitle>
      <MetricsContainer>
        <MetricCard>
          <MetricTitle id="completed-quizzes-title">{t('results_tab.completed_quizzes.title')}</MetricTitle>
          <MetricValue id="completed-quizzes-value">{completedQuizzesData.value}</MetricValue>
          <MetricDescription id="completed-quizzes-description">{completedQuizzesData.description}</MetricDescription>
        </MetricCard>

        <MetricCard>
          <MetricTitle id="average-score-title">{t('results_tab.average_score.title')}</MetricTitle>
          <MetricValue id="average-score-value">{averageScoreData.value}</MetricValue>
          <MetricDescription id="average-score-description">{averageScoreData.description}</MetricDescription>
        </MetricCard>

        { quizVisibility === 'private' && (
          <MetricCard>
            <MetricTitle id="rate-title">{t('results_tab.rate.title')}</MetricTitle>
            <MetricValue id="rate-value">{getRate}</MetricValue>
            <MetricDescription id="rate-description">{t('results_tab.rate.subtitle')}</MetricDescription>
          </MetricCard>
        )}
      </MetricsContainer>

      <MetricsSeparator />


      <>
        <MetricsHeader>
          <MetricTitle>{t('results_tab.by_question.title')}</MetricTitle>
          <Body2Regular>{t('results_tab.by_question.description')}</Body2Regular>        
        </MetricsHeader>
        <ByQuestion 
          loading={loading}
          resultsByQuestion={resultsData?.metrics.byQuestion || []}
        />
      </>

   {/* <EmptyState
      subtitle={t('no_questions.subtitle')}
      buttons={buttons}
    /> */}

      {quizVisibility === 'private' && (
        <>
          <MetricsSeparator />

          <MetricsHeader>
            <MetricTitle>{t('results_tab.by_learner.title')}</MetricTitle>
            <Body2Regular>{t('results_tab.by_learner.description')}</Body2Regular>          
          </MetricsHeader>
          <ByLearner 
            loading={loading}
            resultsByLearner={resultsData?.metrics.byLearner || []}
          />
        </>
      )}
    </div>
  );
};

const MetricsHeader = styled.div`
  margin: 50px 0 16px 0;
`;

const MetricsContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 24px;
`;

const MetricCard = styled.div`
  flex: 1;
  border: 1px solid ${props => props.theme.colors.green2};
  border-radius: 12px;
  padding: 24px;
  background: white;
`;

const MetricTitle = styled(SubHeading3)`
  font-weight: 600;
  color: ${props => props.theme.colors.dark.black};
  margin: 0 0 16px 0;
`;

const MetricValue = styled.div`
  font-size: 48px;
  font-weight: bold;
  color: #849D29;
  margin-bottom: 8px;
`;

const MetricDescription = styled.p`
  font-size: 14px;
  color: ${props => props.theme.colors.dark.grey};
  margin: 0;
  line-height: 1.5;
`;

const MetricsSeparator = styled.hr`
  border: none;
  border-top: 1px solid ${props => props.theme.colors.green2};
  margin: 48px 0;
`;

export default Results;