import { FunctionComponent, useCallback, useState } from "react";
import { BetaBanner, Body1, Body1SemiBold, Body2Italic, Body2Regular, Button, H2, Sidebar, styled, useAdminSidebar } from '@shira/ui';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStore } from "../../store";
import { shallow } from "zustand/shallow";
import { ChangeEmailModal } from "../modals/ChangeEmailModal";
import { ChangeEmailSuccessModal } from "../modals/ChangeEmailSuccessModal";
import { ChangePasswordModal } from "../modals/ChangePasswordModal";
import { getCurrentDateFNSLocales } from "../../language/dateUtils";
import i18n from "../../language/i18n";
import { enUS } from "date-fns/locale";
import { format, isValid } from "date-fns";
import { requestChangeUserEmail, changeUserPassword } from "../../fetch/user";

interface Props { }

export const SettingsLayout: FunctionComponent<Props> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isCollapsed, handleCollapse, menuItems } = useAdminSidebar(navigate);

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isEmailSuccessModalOpen, setIsEmailSuccessModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const {
    currentEmail: email,
    lastPasswordChangeAt } = useStore((state) => ({
      currentEmail: state.user?.email,
      lastPasswordChangeAt: state.user?.lastPasswordChangeAt,
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
        <BetaBanner url="https://shira.app/beta-user" />

        <MainContentWrapper>
          <HeaderContainer>
            <TextContainer>
              <H2>{t('settings.title')}</H2>
              <Body1>{t('settings.subtitle')}</Body1>
            </TextContainer>
          </HeaderContainer>

          <SettingsCard>

            <SettingRow key={t('settings.sections.email.title')}>
              <SettingDetails>
                <Body1SemiBold>{t('settings.sections.email.title')}</Body1SemiBold>
                <Body2Regular>{email}</Body2Regular>
              </SettingDetails>

              <ActionButton
                type="outline"
                text={t('settings.sections.email.action')}
                onClick={() => setIsEmailModalOpen(true)}
              />
            </SettingRow>

            <Divider />

            <SettingRow key={t('settings.sections.password.title')}>
              <SettingDetails>
                <Body1SemiBold>{t('settings.sections.password.title')}</Body1SemiBold>
                <MutedValue>{getLastPasswordUpdateDate(lastPasswordChangeAt)}</MutedValue>
              </SettingDetails>

              <ActionButton
                type="outline"
                text={t('settings.sections.password.action')}
                onClick={() => setIsPasswordModalOpen(true)}
              />
            </SettingRow>

          </SettingsCard>
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
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SettingsCard = styled.section`
  background: ${props => props.theme.colors.light.white};
  border-radius: 32px;
  padding: 8px 42px;
  max-width: 1280px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 8px 24px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    border-radius: 24px;
    padding: 8px 20px;
  }
`;

const SettingRow = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 24px;
  align-items: center;
  padding: 20px 0;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const SettingDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

const MutedValue = styled(Body2Italic)`
  color: ${props => props.theme.colors.dark.mediumGrey};
`;

const ActionButton = styled(Button)`
  min-width: 240px;
  justify-content: center;
  font-size: 16px;
  line-height: 1.4;
  padding: 16px 24px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    min-width: 100%;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${props => props.theme.colors.dark.lightGrey};
  margin: 4px 0;
`;
