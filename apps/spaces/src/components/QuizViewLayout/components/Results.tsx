import { FunctionComponent } from "react";
import { styled } from '@shira/ui'
import { PublicQuizResultsResponse } from "../../../fetch/results";
import { useTranslation } from "react-i18next";

interface ResultsProps {
  resultsData: PublicQuizResultsResponse | null;
  loading: boolean;
}

export const Results: FunctionComponent<ResultsProps> = ({ resultsData, loading }) => {

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
    if (!resultsData) return { value: '-', description: t('error_messages.results_load_failed') };
    const { metrics } = resultsData;
    const averageScoreDisplay = metrics.completedCount > 0 ? `${metrics.averageScore}%` : '-';
    return {
      value: averageScoreDisplay,
      description: metrics.completedCount > 0
        ? t('results_tab.average_score.subtitle')
        : t('results_tab.average_score.empty_subtitle')
    };
  };

  const completedQuizzesData = getCompletedQuizzesData();
  const averageScoreData = getAverageScoreData();

  return (
    <div>
      <MetricsContainer>
        <MetricCard>
          <MetricTitle>{t('results_tab.completed_quizzes.title')}</MetricTitle>
          <MetricValue>{completedQuizzesData.value}</MetricValue>
          <MetricDescription>{completedQuizzesData.description}</MetricDescription>
        </MetricCard>

        <MetricCard>
          <MetricTitle>{t('results_tab.average_score.title')}</MetricTitle>
          <MetricValue>{averageScoreData.value}</MetricValue>
          <MetricDescription>{averageScoreData.description}</MetricDescription>
        </MetricCard>
      </MetricsContainer>
    </div>
  );
};

const MetricsContainer = styled.div`
  display: flex;
  gap: 24px;
`;

const MetricCard = styled.div`
  flex: 1;
  border: 1px solid ${props => props.theme.colors.light.paleGrey};
  border-radius: 12px;
  padding: 24px;
  background: white;
`;

const MetricTitle = styled.h3`
  font-size: 16px;
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

export default Results;