import { FunctionComponent } from "react";
import { FiMenu, FiPlus } from 'react-icons/fi';
import { Button, styled, SubHeading1, TrashIcon, EditIcon } from '@shira/ui'
import { EmptyState } from './EmptyState'

interface Question {
  id: string;
  title: string;
}

interface QuestionsListProps {
  questions: Question[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

export const QuestionsList: FunctionComponent<QuestionsListProps> = ({
  questions,
  onEdit,
  onDelete,
  onAdd
}) => {

  if(questions.length === 0 || !questions) {
    return <EmptyState />
  }
  return (
    <Container>
      <Header>
        <SubHeading1>Questions</SubHeading1>
        <Button
          leftIcon={<FiPlus size={16} />}
          text="Add question"
          type="primary"
          color="#849D29"
          onClick={onAdd}
        />
      </Header>
      <List>
        {questions.map((question) => (
          <QuestionItem key={question.id}>
            <LeftSection>
              <MenuIcon>
                <FiMenu size={20} color="#666" />
              </MenuIcon>
              <QuestionTitle>{question.title}</QuestionTitle>
            </LeftSection>
            <Actions>
              <ActionButton onClick={() => onEdit(question.id)}>
                <EditIcon />
              </ActionButton>
              <ActionButton onClick={() => onDelete(question.id)}>
                <TrashIcon />
              </ActionButton>
            </Actions>
          </QuestionItem>
        ))}
      </List>
    </Container>
  );
};

const Container = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  margin: 16px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const QuestionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;

  &:hover {
    background: ${props => props.theme.colors.light.paleGrey};
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MenuIcon = styled.div`
  cursor: grab;
  padding: 4px;

  &:active {
    cursor: grabbing;
  }
`;

const QuestionTitle = styled.span`
  font-size: 14px;
  color: ${props => props.theme.colors.dark.black};
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${props => props.theme.colors.light.paleGreen};
  }
`;

export default QuestionsList;