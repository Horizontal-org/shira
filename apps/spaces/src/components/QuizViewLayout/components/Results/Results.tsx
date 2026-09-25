import { FunctionComponent, useMemo } from "react";
import { Body1, Body2Regular, Button, defaultTheme, SettingsFishIcon, styled, SubHeading3 } from '@horizontal-org/shira-ui';
import { QuizResultsResponse } from "../../../../fetch/results";
import { useTranslation } from "react-i18next";
import { ByQuestion } from "./ByQuestion";
import { ByLearner } from "./ByLearner";
import { useNavigate } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";

interface ResultsProps {
  resultsData: QuizResultsResponse | null;
  loading: boolean;
  quizVisibility: string;
  hasResultsEnabled: boolean;
}

export const Results: FunctionComponent<ResultsProps> = ({
  resultsData,
  loading,
  quizVisibility,
  hasResultsEnabled,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const getCompletedQuizzesData = () => {
    if (loading) return { value: '...', description: t('loading_messages.loading') };
    if (!resultsData) return { value: '-', description: t('error_messages.results_load_failed') };
    const count = resultsData.metrics.completedCount;
    return {
      value: count,
      description: `${t('results_tab.completed_quizzes.subtitle')}`
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

  if (!hasResultsEnabled) {
    return (
      <ResultsDisabledState>
        <SettingsFishIcon />
        <ResultsDisabledContent>
          <Body1>{t('results_tab.disabled.message')}</Body1>
          <Button
            leftIcon={<IoMdSettings size={20} />}
            text={t('results_tab.disabled.go_to_settings')}
            type="primary"
            color={defaultTheme.colors.green7}
            onClick={() => navigate('/settings')}
          />
        </ResultsDisabledContent>
      </ResultsDisabledState>
    );
  }

  return (
    <div>
      <MetricTitle>{t('results_tab.title')}</MetricTitle>
      <MetricsContainer>
        <MetricCard>
          <MetricTitle id="completed-quizzes-title">{t('results_tab.completed_quizzes.title')}</MetricTitle>
          <MetricValue id="completed-quizzes-value">{completedQuizzesData.value}</MetricValue>
          <MetricDescription id="completed-quizzes-description">{completedQuizzesData.description}</MetricDescription>
        </MetricCard>

        {quizVisibility === 'private' && (
          <MetricCard>
            <MetricTitle id="rate-title">{t('results_tab.rate.title')}</MetricTitle>
            <MetricValue id="rate-value">{getRate}</MetricValue>
            <MetricDescription id="rate-description">{t('results_tab.rate.subtitle')}</MetricDescription>
          </MetricCard>
        )}

        <MetricCard>
          <MetricTitle id="average-score-title">{t('results_tab.average_score.title')}</MetricTitle>
          <MetricValue id="average-score-value">{averageScoreData.value}</MetricValue>
          <MetricDescription id="average-score-description">{averageScoreData.description}</MetricDescription>
        </MetricCard>

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

const ResultsDisabledState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 80px;

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    flex-direction: column;
    text-align: center;
  }
`;

const ResultsDisabledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    align-items: center;
  }
`;

const MetricsHeader = styled.div`
  margin: 50px 0 16px 0;
`;

const MetricsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    grid-template-columns: 1fr;
  }

  @media (min-width: ${props => props.theme.breakpoints.xl}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const MetricCard = styled.div`
  width: 100%;
  justify-self: stretch;
  box-sizing: border-box;
  min-width: 0;
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
  color: ${props => props.theme.colors.green5};
  margin-bottom: 8px;
`;

const MetricDescription = styled.p`
  font-size: 14px;
  color: ${props => props.theme.colors.dark.darkGrey};
  margin: 0;
  line-height: 1.5;
`;

const MetricsSeparator = styled.hr`
  border: none;
  border-top: 1px solid ${props => props.theme.colors.dark.lightGrey};
  margin: 48px 0;
`;

export default Results;
