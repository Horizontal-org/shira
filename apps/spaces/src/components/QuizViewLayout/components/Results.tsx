import { FunctionComponent } from "react";
import { styled } from '@shira/ui'

interface ResultsProps {
}

export const Results: FunctionComponent<ResultsProps> = () => {
  return (
    <div>
      <MetricsContainer>
        <MetricCard>
          <MetricTitle>Number of completed quizzes</MetricTitle>
          <MetricValue>0</MetricValue>
          <MetricDescription>
            This is the number of quizzes that have been completed.
          </MetricDescription>
        </MetricCard>
        
        <MetricCard>
          <MetricTitle>Average score</MetricTitle>
          <MetricValue>-</MetricValue>
          <MetricDescription>
            The average score received by all learners who took this quiz will be shown here.
          </MetricDescription>
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