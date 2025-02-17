import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  styled,
  useAdminSidebar,
  Tab,
  Toggle,
  H2,
  Body1,
  Button,
  RenameIcon,
  CopyUrlIcon,
  DeleteIcon
} from "@shira/ui";
import { QuestionsList } from './QuestionList'
interface Props {}

const questions = [
  { id: '1', title: 'SMS quiz for nurse practitioners' },
  { id: '2', title: 'Raffle sign up' },
  { id: '3', title: "Doctor's attachment" },
  { id: '4', title: 'Professional development invite' },
  { id: '5', title: 'Password reset' },
  { id: '6', title: 'Telehealth login' },
];

export const QuizViewLayout: FunctionComponent<Props> = () => {
  const navigate = useNavigate();
  const { isCollapsed, handleCollapse, menuItems } = useAdminSidebar(navigate)
  const [isPublished, setIsPublished] = useState(true);
  return (
    <Container>
      <Sidebar 
        menuItems={menuItems} 
        onCollapse={handleCollapse}
      
      />
      <MainContent $isCollapsed={isCollapsed}>
        <Header>
          <TabsContainer>
            <Tab text="Dashboard" onClick={() => {}}/>
            <Separator> {'>'} </Separator>
            <Tab text="New staff onboarding" onClick={() => {}}/>
          </TabsContainer>
          <Toggle 
            isEnabled={isPublished}
            onToggle={() => setIsPublished(!isPublished)}
            rightLabel="Published"
            leftLabel="Unpublished"
          />
        </Header>

        <Wrapper>
          <H2>Email quiz for activist</H2>
          <Body1>Manage your quiz here, including adding, removing, and reordering questions</Body1>
          <ButtonsContainer>
            <Button 
              leftIcon={<RenameIcon />}
              text="Rename"
              type="outline"
            />
            <Button 
              leftIcon={<CopyUrlIcon />}
              text="Copy quiz link"
              type="outline"
            />
            <Button 
              leftIcon={<DeleteIcon />}
              text="Delete"
              type="outline"
            />
          </ButtonsContainer>
        </Wrapper>

        <QuestionsList
          questions={questions}
          onEdit={(id) => console.log('Edit question', id)}
          onDelete={(id) => console.log('Delete question', id)}
          onAdd={() => console.log('Add new question')}
        />

        <Footer>
          <Button 
            text="Cancel"
            type="outline"
          />

          <Button 
            text="Save changes"
            type="primary"
            color="#849D29"
          />
        </Footer>
      </MainContent>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  background: ${props => props.theme.colors.light.paleGrey};

  height: auto;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: block;
  }
`;

const MainContent = styled.div<{ $isCollapsed: boolean }>`
  flex: 1;
  padding: 24px;
  margin-left: ${props => props.$isCollapsed ? '100px' : '300px'};
  transition: margin-left 0.3s ease;
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-left: 80px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-left: 0;
  }
`;

const Header = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
`

const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Separator = styled.span`
  color: ${props => props.theme.colors.dark.black};
  font-weight: 500;
`;

const Wrapper = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
`

const Footer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  margin: 16px;
`