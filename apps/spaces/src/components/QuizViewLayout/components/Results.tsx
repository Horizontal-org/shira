import { FunctionComponent } from "react";
import { styled } from '@shira/ui'
import { PublicQuizResultsResponse } from "../../../fetch/results";

interface ResultsProps {
  resultsData: PublicQuizResultsResponse | null;
  loading: boolean;
}

export const Results: FunctionComponent<ResultsProps> = ({ resultsData, loading }) => {

  const getCompletedQuizzesData = () => {
    if (loading) return { value: '...', description: 'Loading...' };
    if (!resultsData) return { value: '-', description: 'Failed to load results' };
    const count = resultsData.metrics.completedCount;
    return {
      value: count,
      description: `This is the number of quizzes that have been completed${count > 0 ? ' by public learners' : ''}.`
    };
  };

  const getAverageScoreData = () => {
    if (loading) return { value: '...', description: 'Loading...' };
    if (!resultsData) return { value: '-', description: 'Failed to load results' };
    const { metrics } = resultsData;
    const averageScoreDisplay = metrics.completedCount > 0 ? `${metrics.averageScore}%` : '-';
    return {
      value: averageScoreDisplay,
      description: metrics.completedCount > 0 
        ? 'This is the average score received by all learners who took this quiz.'
        : 'The average score received by all learners who took this quiz will be shown here.'
    };
  };

  const completedQuizzesData = getCompletedQuizzesData();
  const averageScoreData = getAverageScoreData();

  return (
    <div>
      <MetricsContainer>
        <MetricCard>
          <MetricTitle id="completed-quizzes-title">Number of completed quizzes</MetricTitle>
          <MetricValue id="completed-quizzes-value">{completedQuizzesData.value}</MetricValue>
          <MetricDescription id="completed-quizzes-description">{completedQuizzesData.description}</MetricDescription>
        </MetricCard>
        
        <MetricCard>
          <MetricTitle id="average-score-title">Average score</MetricTitle>
          <MetricValue id="average-score-value">{averageScoreData.value}</MetricValue>
          <MetricDescription id="average-score-description">{averageScoreData.description}</MetricDescription>
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