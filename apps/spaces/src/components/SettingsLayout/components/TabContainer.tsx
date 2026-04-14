import { FunctionComponent, useState } from "react";
import { Body1SemiBold, Body2Italic, Body2Regular, Button, styled, useTheme } from "@shira/ui";
import { useTranslation } from "react-i18next";
import { navigateToManageSubscription } from "../../../fetch/auth";
import { useSub } from "../../../hooks/useSub";

type TabType = "account" | "subscription";

interface TabContainerProps {
  email?: string;
  subscription?: any;
  lastPasswordUpdateText: string;
  onChangeEmail: () => void;
  onChangePassword: () => void;
  onViewPlans: () => void;
}

export const TabContainer: FunctionComponent<TabContainerProps> = ({
  email,
  subscription,
  lastPasswordUpdateText,
  onChangeEmail,
  onChangePassword,
  onViewPlans,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>("account");

  const { isSubActive } = useSub();

  const currentPlanName = isSubActive ? String(subscription?.type ?? "unknown").toLowerCase() : "starter";
  const formattedCurrentPlanName = currentPlanName.charAt(0).toUpperCase() + currentPlanName.slice(1);

  const subscriptionActionText = formattedCurrentPlanName === 'Starter'
    ? t('settings.subscription.upgrade')
    : t('settings.subscription.manage_plan');

  console.log('subscriptionActionText:', subscriptionActionText);

  return (
    <Container>
      <Header>
        <TabsContainer>
          <TabButton
            id="settings-account-tab"
            $isActive={activeTab === "account"}
            onClick={() => setActiveTab("account")}
          >
            {t('settings.tabs.account')}
          </TabButton>
          <TabButton
            id="settings-subscription-tab"
            $isActive={activeTab === "subscription"}
            onClick={() => setActiveTab("subscription")}
          >
            {t('settings.tabs.subscription')}
          </TabButton>
        </TabsContainer>
      </Header>

      <div>
        {activeTab === "account" && (
          <SettingsCard>
            <SettingRow>
              <SettingDetails>
                <Body1SemiBold>{t('settings.sections.email.title')}</Body1SemiBold>
                <Body2Regular>{email}</Body2Regular>
              </SettingDetails>

              <ActionButton
                id="change-email-button"
                type="outline"
                text={t('settings.sections.email.action')}
                onClick={onChangeEmail}
              />
            </SettingRow>

            <Divider />

            <SettingRow>
              <SettingDetails>
                <Body1SemiBold>{t('settings.sections.password.title')}</Body1SemiBold>
                <MutedValue>{lastPasswordUpdateText}</MutedValue>
              </SettingDetails>

              <ActionButton
                id="change-password-button"
                type="outline"
                text={t('settings.sections.password.action')}
                onClick={onChangePassword}
              />
            </SettingRow>
          </SettingsCard>
        )}

        {activeTab === "subscription" && !!(subscription) && (
          <SettingsCard>
            <SettingRow>
              <SettingDetails>
                <Body1Bold>{t('settings.subscription.current_plan', { plan_name: formattedCurrentPlanName })}</Body1Bold>
              </SettingDetails>

              <SubscriptionActions>
                <SubscriptionButton
                  id="view-plans-button"
                  type="outline"
                  text={t('settings.subscription.view_plans')}
                  onClick={onViewPlans}
                />
                <SubscriptionButton
                  id="manage-subscription-button"
                  type="primary"
                  text={subscriptionActionText}
                  color={theme.colors.green7}
                  onClick={() => navigateToManageSubscription(subscription.organizationId, subscription.type === 'starter')}
                />
              </SubscriptionActions>
            </SettingRow>
          </SettingsCard>
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1280px;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 28px;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 32px;
`;

const TabButton = styled.div<{ $isActive: boolean }>`
  padding: 8px 0;
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.$isActive ? props.theme.colors.green7 : props.theme.colors.dark.darkGrey};
  cursor: pointer;
  border: none;
  border-bottom: 4px solid ${props => props.$isActive ? props.theme.colors.green7 : "transparent"};
  background: transparent;
  transition: all 0.2s ease;

  &:hover {
    border-bottom: 4px solid ${props => props.$isActive ? props.theme.colors.green7 : "#ccc"};
  }
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
  color: ${props => props.theme.colors.dark.darkGrey};
`;

const ActionButton = styled(Button)`
  justify-content: center;
  font-size: 16px;
  line-height: 1.4;
  padding: 16px 24px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    min-width: 100%;
  }
`;

const Body1Bold = styled(Body1SemiBold)`
  font-weight: 700;
`;

const SubscriptionActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
    flex-direction: column;
  }
`;

const SubscriptionButton = styled(Button)`
  justify-content: center;
  font-size: 16px;
  line-height: 1.4;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${props => props.theme.colors.dark.lightGrey};
  margin: 4px 0;
`;

export default TabContainer;
