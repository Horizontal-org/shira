import { FunctionComponent, useState } from "react";
import { styled } from '@shira/ui';
import { QuestionsList } from './QuestionList';
import { Results } from './Results';
import { QuizQuestion } from "../../../store/slices/quiz";
import { PublicQuizResultsResponse } from "../../../fetch/results";
import { LearnerQuizView } from "../../LearnerQuizView";
import { useTranslation } from "react-i18next";

type TabType = 'questions' | 'results' | 'learners';

interface TabContainerProps {
  quizId: number;
  quizTitle: string;
  quizQuestions: QuizQuestion[];
  quizVisibility: string;
  resultsData: PublicQuizResultsResponse | null
  resultsLoading: boolean
  hasResults: boolean
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  onAddLibrary: (quizId: string) => void;
  onReorder: (newOrder: QuizQuestion[]) => void;
  onDuplicate: () => void;
}

export const TabContainer: FunctionComponent<TabContainerProps> = ({
  quizId,
  quizTitle,
  quizQuestions,
  quizVisibility,
  onEdit,
  onDelete,
  onAdd,
  onAddLibrary,
  onReorder,
  onDuplicate,
  resultsData,
  resultsLoading,
  hasResults
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
        </TabsContainer>
      </Header>

      <div>
        {activeTab === 'questions' && (
          <QuestionsList
            quizId={quizId}
            quizQuestions={quizQuestions}
            onEdit={onEdit}
            onDelete={onDelete}
            onAdd={onAdd}
            onAddLibrary={() => { onAddLibrary(String(quizId)) }}
            onReorder={onReorder}
            onDuplicate={onDuplicate}
            hasResults={hasResults}
          />
        )}

        {activeTab === 'learners' && (
          <LearnerQuizView
            quizId={quizId}
            quizTitle={quizTitle}
          />
        )}

        {activeTab === 'results' && (
          <Results
            resultsData={resultsData}
            loading={resultsLoading}
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
