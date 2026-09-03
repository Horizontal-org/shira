import { FunctionComponent, useState } from "react";
import { styled } from '@horizontal-org/shira-ui';
import { QuestionsList } from './Question/QuestionList';
import { Results } from './Results/Results';
import { QuizQuestion } from "../../../store/slices/quiz";
import { QuizResultsResponse } from "../../../fetch/results";
import { LearnerQuizView } from "../../LearnerQuizView";
import { useTranslation } from "react-i18next";
import { Settings } from "./Settings/Settings";

type TabType = 'questions' | 'results' | 'learners' | 'settings';

interface TabContainerProps {
  quizId: number;
  quizTitle: string;
  quizQuestions: QuizQuestion[];
  quizPublished: boolean;
  quizAssessmentMode: boolean;
  hasQuestions: boolean;
  quizVisibility: string;
  resultsData: QuizResultsResponse | null
  resultsLoading: boolean
  hasResultsEnabled: boolean
  hasResults: boolean
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  onAddLibrary: (quizId: string) => void;
  onReorder: (newOrder: QuizQuestion[]) => void;
  onDuplicate: () => void;
  onSubmitAsTemplate: (questionId: string) => void;
  onPublish: () => void
  onAssessmentModeChange: (value: boolean) => void;
}

export const TabContainer: FunctionComponent<TabContainerProps> = ({
  quizId,
  quizTitle,
  quizPublished,
  hasQuestions,
  quizQuestions,
  quizVisibility,
  quizAssessmentMode,
  onEdit,
  onDelete,
  onAdd,
  onAddLibrary,
  onReorder,
  onDuplicate,
  onSubmitAsTemplate,
  onPublish,
  resultsData,
  resultsLoading,
  hasResultsEnabled,
  hasResults,
  onAssessmentModeChange
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('questions');
  const { t } = useTranslation();

  return (
    <Container>
      <Header>
        <TabsContainer>
          <TabButton
            id="questions-tab"
            $isActive={activeTab === 'questions'}
            onClick={() => setActiveTab('questions')}
          >
            {t('quiz.tabs.questions')}
          </TabButton>
          {quizVisibility === 'private' && (
            <TabButton
              id="learners-tab"
              $isActive={activeTab === 'learners'}
              onClick={() => setActiveTab('learners')}
            >
              {t('quiz.tabs.learners')}
            </TabButton>
          )}
          <TabButton
            id="results-tab"
            $isActive={activeTab === 'results'}
            onClick={() => setActiveTab('results')}
          >
            {t('quiz.tabs.results')}
          </TabButton>
          <TabButton
            id="settings-tab"
            $isActive={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
          >
            {t('quiz.tabs.settings')}
          </TabButton>
        </TabsContainer>
      </Header>

      <div>
        {activeTab === 'questions' && (
          <QuestionsList
            quizId={quizId}
            quizQuestions={quizQuestions}
            quizPublished={quizPublished}
            onEdit={onEdit}
            onDelete={onDelete}
            onAdd={onAdd}
            onAddLibrary={() => onAddLibrary(String(quizId))}
            onReorder={onReorder}
            onDuplicate={onDuplicate}
            onSubmitAsTemplate={onSubmitAsTemplate}
            hasResults={hasResults}
          />
        )}

        {activeTab === 'learners' && (
          <LearnerQuizView
            quizId={quizId}
            quizTitle={quizTitle}
            quizPublished={quizPublished}
            hasQuestions={hasQuestions}
            onPublish={onPublish}
          />
        )}

        {activeTab === 'results' && (
          <Results
            resultsData={resultsData}
            loading={resultsLoading}
            quizVisibility={quizVisibility}
            hasResultsEnabled={hasResultsEnabled}
          />
        )}

        {activeTab === 'settings' && (
          <Settings
            assessmentMode={!!(quizAssessmentMode)}
            onAssessmentModeChange={onAssessmentModeChange}
          />
        )}

      </div>
    </Container>
  );
};

const Container = styled.div`
  background: white;
  border-radius: 32px;
  padding: 32px;
  margin: 16px;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 24px;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 32px;
`;

const TabButton = styled.div<{ $isActive: boolean }>`
  padding: 8px 0;
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.$isActive ? '#52752C' : props.theme.colors.dark.black};
  cursor: pointer;
  border-bottom: 4px solid ${props => props.$isActive ? '#52752C' : 'transparent'};
  transition: all 0.2s ease;

  &:hover {
    border-bottom: 4px solid ${props => props.$isActive ? '#52752C' : '#ccc'};
    color: ${props => props.$isActive ? '#52752C' : props.theme.colors.dark.black};
  }
`;



export default TabContainer;
