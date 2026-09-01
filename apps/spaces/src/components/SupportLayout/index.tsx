import { FunctionComponent } from "react";
import { Body1, H1, SettingsFishIcon, Sidebar, styled, useAdminSidebar } from '@horizontal-org/shira-ui'
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MobileResponsivenessBanner } from "../MobileResponsivenessBanner";
import { customMenuItems } from "../../utils/customMenuItems";

interface Props { }

export const SupportLayout: FunctionComponent<Props> = () => {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    isCollapsed,
    handleCollapse,
    menuItems
  } =
    useAdminSidebar(navigate, customMenuItems.map(item => ({
      ...item,
      label: t(item.label)
    })));

  return (
    <Container id="support-layout">
      <Sidebar
        menuItems={menuItems}
        onCollapse={handleCollapse}
        selectedItemLabel={menuItems.find(m => m.path === '/support').label}
      />

      <MainContent $isCollapsed={isCollapsed}>
        <MobileResponsivenessBanner />
        <MainContentWrapper>
          <HeaderContainer>
            <TextContainer>
              <H1>{t('support.title')}</H1>
              <Body1>{t('support.subtitle')}</Body1>
            </TextContainer>
            <SettingsFishIcon />
          </HeaderContainer>
        </MainContentWrapper>
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
  margin-inline-start: ${props => props.$isCollapsed ? '116px' : '264px'};
  transition: margin-inline-start 0.3s ease;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-inline-start: 80px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-inline-start: 0;
  }
`;

const MainContentWrapper = styled.div`
  padding: 50px 70px;
`

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