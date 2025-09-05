import { FunctionComponent, useState, useEffect } from "react";
import { styled } from '@shira/ui'
import { QuestionsList } from './QuestionList'
import { Results } from './Results'
import { QuizQuestion } from "../../../store/slices/quiz";
import { getQuizResults, PublicQuizResultsResponse } from "../../../fetch/results";

type TabType = 'questions' | 'results';

interface TabContainerProps {
  quizId: number;
  quizQuestions: QuizQuestion[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  onReorder: (newOrder: QuizQuestion[]) => void;
}

export const TabContainer: FunctionComponent<TabContainerProps> = ({
  quizId,
  quizQuestions,
  onEdit,
  onDelete,
  onAdd,
  onReorder
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('questions');
  const [resultsData, setResultsData] = useState<PublicQuizResultsResponse | null>(null);
  const [resultsLoading, setResultsLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      setResultsLoading(true);
      try {
        const data = await getQuizResults(quizId);
        setResultsData(data);
      } catch (error) {
        console.error('Failed to fetch quiz results:', error);
      } finally {
        setResultsLoading(false);
      }
    };

    fetchResults();
  }, [quizId]);

  return (
    <Container>
      <Header>
        <TabsContainer>
          <TabButton 
            $isActive={activeTab === 'questions'} 
            onClick={() => setActiveTab('questions')}
          >
            Questions
          </TabButton>
          <TabButton 
            $isActive={activeTab === 'results'} 
            onClick={() => setActiveTab('results')}
          >
            Results
          </TabButton>
        </TabsContainer>
      </Header>
      
      <div>
        {activeTab === 'questions' && (
          <QuestionsList
            quizQuestions={quizQuestions}
            onEdit={onEdit}
            onDelete={onDelete}
            onAdd={onAdd}
            onReorder={onReorder}
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