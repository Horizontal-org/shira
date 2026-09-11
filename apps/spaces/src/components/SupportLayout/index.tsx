import { FunctionComponent } from "react";
import { Body1, Button2, H2, SubHeading2, Sidebar, styled, useAdminSidebar } from '@horizontal-org/shira-ui'
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MobileResponsivenessBanner } from "../MobileResponsivenessBanner";
import { customMenuItems } from "../../utils/customMenuItems";

import { ContentCard } from "../ContentCard";

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
          <PageTitle>{t('support.title')}</PageTitle>
          <Cards>
            <ContentCard aria-labelledby="help-center-title">
              <CardTitle id="help-center-title">{t('support.help_center.title')}</CardTitle>
              <Body1>{t('support.help_center.description')}</Body1>
              <HelpCenterLink href="https://shira.app/help/" target="_blank" rel="noopener noreferrer">
                <Button2>{t('support.help_center.cta')}</Button2>
              </HelpCenterLink>
            </ContentCard>
            <ContentCard aria-labelledby="contact-title">
              <CardTitle id="contact-title">{t('support.contact.title')}</CardTitle>
              <Body1>
                {t('support.contact.description')}
                <EmailLink href="mailto:contact@wearehorizontal.org">contact@wearehorizontal.org</EmailLink>
              </Body1>
            </ContentCard>
          </Cards>
        </MainContentWrapper>

      </MainContent>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: flex;
  background: ${props => props.theme.colors.light.paleGrey};
  min-height: 100vh;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: block;
  }
`;

const MainContent = styled.div<{ $isCollapsed: boolean }>`
  flex: 1;
  min-width: 0;
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
  padding: 50px;
  color: ${props => props.theme.colors.dark.black};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 24px 20px 40px;
  }
`;

const PageTitle = styled(H2)`
  padding: 16px;
  margin-bottom: 40px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-bottom: 32px;
  }
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 40px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const CardTitle = styled(SubHeading2)`
  margin-bottom: 12px;
`;

const HelpCenterLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  padding: 12px 20px;
  border: 2px solid transparent;
  border-radius: 100px;
  background: ${props => props.theme.colors.green7};
  color: ${props => props.theme.colors.light.white};
  text-decoration: none;

  &:hover {
    background: ${props => props.theme.colors.green8};
  }

  &:focus-visible {
    outline: 3px solid ${props => props.theme.colors.green7};
    outline-offset: 3px;
  }
`;

const EmailLink = styled.a`
  display: block;
  color: inherit;
  font-weight: 700;
  text-decoration: none;
  overflow-wrap: anywhere;

  &:hover {
    text-decoration: underline;
  }
`;
