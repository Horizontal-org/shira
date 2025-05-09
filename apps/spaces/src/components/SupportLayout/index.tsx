import { FunctionComponent } from "react";
import { Body1, H1, H2, SettingsFishIcon, Sidebar, styled, useAdminSidebar } from '@shira/ui'
import { useNavigate } from "react-router-dom";

interface Props {}

export const SupportLayout:FunctionComponent<Props> = () => {

  const navigate = useNavigate();
  const { isCollapsed, handleCollapse, menuItems } = useAdminSidebar(navigate)

  return (
    <Container>
      <Sidebar 
        menuItems={menuItems} 
        onCollapse={handleCollapse}      
        selectedItemLabel={menuItems.find(m => m.path === '/support').label}
      />

      <MainContent $isCollapsed={isCollapsed}>
        <HeaderContainer> 
          <TextContainer>
            <H1>Support</H1>
            <Body1>If you need any support, including with deleting your account, please email the Shira team at contact@wearehorizontal.org</Body1>          
          </TextContainer>
          <SettingsFishIcon />
        </HeaderContainer>

      </MainContent>

    </Container>
  )
}

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
  padding: 50px;
  margin-left: ${props => props.$isCollapsed ? '100px' : '300px'};
  transition: margin-left 0.3s ease;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-left: 80px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-left: 0;
  }
`;

const TextContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;

`