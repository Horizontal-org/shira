import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  styled,
  useAdminSidebar
} from "@shira/ui";
interface Props {}

export const QuizViewLayout: FunctionComponent<Props> = () => {
  const navigate = useNavigate();
  const { isCollapsed, handleCollapse, menuItems } = useAdminSidebar(navigate)
  return (
    <Container>
      <Sidebar 
        menuItems={menuItems} 
        onCollapse={handleCollapse}
      
      />
      <MainContent $isCollapsed={isCollapsed}>
        
      </MainContent>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  background: ${props => props.theme.colors.light.paleGrey};

  min-height: 100vh;
  height: 100%;

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