import { FunctionComponent, useCallback, useState } from "react";
import { Body1, H2, Sidebar, styled, useAdminSidebar } from '@horizontal-org/shira-ui';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStore } from "../../store";
import { shallow } from "zustand/shallow";
import { ChangeEmailModal } from "../modals/ChangeEmailModal";
import { ChangeEmailSuccessModal } from "../modals/ChangeEmailSuccessModal";
import { ChangePasswordModal } from "../modals/ChangePasswordModal";
import { ViewPlansModal } from "../modals/ViewPlansModal";
import { getCurrentDateFNSLocales } from "../../language/dateUtils";
import i18n from "../../language/i18n";
import { enUS } from "date-fns/locale";
import { format, isValid } from "date-fns";
import { requestChangeUserEmail, changeUserPassword } from "../../fetch/user";
import { TabContainer } from "./components/TabContainer";
import { MobileResponsivenessBanner } from "../MobileResponsivenessBanner";
import { customMenuItems } from "../../utils/customMenuItems";

interface Props { }

export const SettingsLayout: FunctionComponent<Props> = () => {
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

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isEmailSuccessModalOpen, setIsEmailSuccessModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isViewPlansModalOpen, setIsViewPlansModalOpen] = useState(false);

  const {
    currentEmail: email,
    lastPasswordChangeAt,
    subscription
  } = useStore((state) => ({
    currentEmail: state.user?.email,
    lastPasswordChangeAt: state.user?.lastPasswordChangeAt,
    subscription: state.subscription
  }), shallow);

  const getLastPasswordUpdateDate = useCallback((lastUpdate?: string | null) => {
    if (!lastUpdate) {
      return t('settings.sections.password.last_updated', { date: '-' });
    }

    const parsedLastUpdate = new Date(lastUpdate.replace(" ", "T"));

    if (!isValid(parsedLastUpdate)) {
      return t('settings.sections.password.last_updated', { date: '-' });
    }

    const locales = getCurrentDateFNSLocales();
    const locale = locales[i18n.language] ?? enUS;

    const lastPasswordChangeDate = format(parsedLastUpdate, "d MMMM yyyy", { locale });

    return t('settings.sections.password.last_updated', { date: lastPasswordChangeDate });
  }, [i18n.language, t]);

  const updateUserPassword = async ({
    currentPassword,
    newPassword,
  }: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<void> => {
    await changeUserPassword({ currentPassword, newPassword });
  };

  const updateEmailAddress = async (newEmail: string): Promise<void> => {
    if (!email) { return; }

    await requestChangeUserEmail({ currentEmail: email, newEmail });
    setIsEmailModalOpen(false);
    setIsEmailSuccessModalOpen(true);
  };

  return (
    <Container id="settings-layout">
      <Sidebar
        menuItems={menuItems}
        onCollapse={handleCollapse}
        selectedItemLabel={menuItems.find(m => m.path === '/settings')?.label ?? ''}
      />

      <MainContent $isCollapsed={isCollapsed}>

        <MobileResponsivenessBanner />

        <MainContentWrapper>
          <HeaderContainer>
            <TextContainer>
              <H2>{t('settings.title')}</H2>
              <Body1>{t('settings.subtitle')}</Body1>
            </TextContainer>
          </HeaderContainer>

          <TabContainer
            email={email}
            lastPasswordUpdateText={getLastPasswordUpdateDate(lastPasswordChangeAt)}
            subscription={subscription}
            onChangeEmail={() => setIsEmailModalOpen(true)}
            onChangePassword={() => setIsPasswordModalOpen(true)}
            onViewPlans={() => setIsViewPlansModalOpen(true)}
          />
        </MainContentWrapper>
      </MainContent>

      <ChangeEmailModal
        isModalOpen={isEmailModalOpen}
        setIsModalOpen={setIsEmailModalOpen}
        onSave={updateEmailAddress}
      />

      <ChangeEmailSuccessModal
        isModalOpen={isEmailSuccessModalOpen}
        onClose={() => setIsEmailSuccessModalOpen(false)}
      />

      <ChangePasswordModal
        isModalOpen={isPasswordModalOpen}
        setIsModalOpen={setIsPasswordModalOpen}
        onSave={updateUserPassword}
      />

      <ViewPlansModal
        isModalOpen={isViewPlansModalOpen}
        onClose={() => setIsViewPlansModalOpen(false)}
        organizationId={subscription?.organizationId}
      />
    </Container >
  );
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
  margin-left: ${props => props.$isCollapsed ? '116px' : '264px'};
  transition: margin-left 0.3s ease;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-left: 80px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-left: 0;
  }
`;

const MainContentWrapper = styled.div`
  padding: 50px 70px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 32px 20px 48px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 28px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
