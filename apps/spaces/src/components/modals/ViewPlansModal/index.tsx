import { FunctionComponent, useState } from "react";
import { Body3, Button, DatingAppIcon, FacebookIcon, GmailIcon, Modal, OutlookIcon, SMSIcon, styled, SubHeading1, SubHeading3, useTheme, WhatsappIcon } from "@shira/ui";
import { useTranslation } from "react-i18next";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { FiX } from "react-icons/fi";
import { checkoutSubscription, navigateToManageSubscription } from "../../../fetch/auth";
import { useStore } from "../../../store";
import { HelpTooltipIcon } from "./utils";
import { useSub } from "../../../hooks/useSub";

interface Props {
  isModalOpen: boolean;
  onClose: () => void;
  organizationId: string;
}

export const ViewPlansModal: FunctionComponent<Props> = ({
  isModalOpen,
  onClose,
  organizationId,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { isSubActive } = useSub();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");

  const subscriptionType = useStore((state) => state.subscription?.type);

  const normalizedSubscriptionType = subscriptionType?.toLowerCase().trim();

  const isCurrentStarterPlan = normalizedSubscriptionType === "starter" || !isSubActive;
  const isCurrentProPlan = normalizedSubscriptionType === "pro" && isSubActive;
  const isCurrentEnterprisePlan = normalizedSubscriptionType === "enterprise" && isSubActive;

  const starterButtonText = isCurrentStarterPlan
    ? t("modals.view_plans.actions.current_plan")
    : isCurrentProPlan
      ? t("modals.view_plans.actions.downgrade")
      : t("modals.view_plans.plans.starter.cta");

  const navigateToCheckout = async (): Promise<void> => {
    try {
      const response = await checkoutSubscription(organizationId, billingPeriod);
      const stripeUrl = response?.url;

      if (stripeUrl) {
        onClose();
        window.location.assign(stripeUrl);
      }
    } catch (error) {
      console.error("Error navigating to checkout:", error);
    }
  };

  const navigateToStripe = async (): Promise<void> => {
    await navigateToManageSubscription(organizationId, false);
  };

  const handleStarterPlanClick = (): Promise<void> => {
    if (isCurrentProPlan) {
      return navigateToStripe();
    }

    return navigateToCheckout();
  };

  const getPlanPriceKey = (plan: "starter" | "pro" | "enterprise"): string =>
    `modals.view_plans.plans.${plan}.${billingPeriod}_price`;

  return (
    <StyledModal
      id="view-plans-modal"
      isOpen={isModalOpen}
      title={t("modals.view_plans.modal_title")}
      titleIcon={<CloseButton onClick={onClose} aria-label={t("buttons.close")}><FiX size={18} /></CloseButton>}
      primaryButtonText={t("buttons.close")}
      secondaryButtonText=""
      onPrimaryClick={onClose}
      onClose={onClose}
      size="large"
    >
      <Content>
        <BillingToggleWrapper>
          <BillingToggle>
            <BillingToggleOption
              type="button"
              $isActive={billingPeriod === "monthly"}
              onClick={() => setBillingPeriod("monthly")}
            >
              {t("modals.view_plans.billing_toggle.monthly")}
            </BillingToggleOption>
            <BillingToggleOption
              type="button"
              $isActive={billingPeriod === "annual"}
              onClick={() => setBillingPeriod("annual")}
            >
              {t("modals.view_plans.billing_toggle.annual")}
            </BillingToggleOption>
          </BillingToggle>
        </BillingToggleWrapper>

        <PlansList>
          <PlanSpacer />

          <PlanCard id="starter-plan-card">
            <PlanCopy>
              <PlanTitle>{t("modals.view_plans.plans.starter.title")}</PlanTitle>
              <PriceBlock>
                <PlanPrice>{t(getPlanPriceKey("starter"))}</PlanPrice>
              </PriceBlock>
              <PlanDescription>{t("modals.view_plans.plans.starter.description")}</PlanDescription>
            </PlanCopy>
            <PlanButton
              text={starterButtonText}
              type="outline"
              onClick={handleStarterPlanClick}
              disabled={isCurrentStarterPlan}
            />
          </PlanCard>

          <PlanCard id="pro-plan-card" $isHighlighted>
            <PlanCopy>
              <PlanTitle>{t("modals.view_plans.plans.pro.title")}</PlanTitle>
              <PriceBlock>
                <PlanPrice>{t(getPlanPriceKey("pro"))}</PlanPrice>
              </PriceBlock>
              <PlanDescription>{t("modals.view_plans.plans.pro.description")}</PlanDescription>
            </PlanCopy>
            <PlanButton
              text={isCurrentProPlan ? t("modals.view_plans.actions.current_plan") : t("modals.view_plans.plans.pro.cta")}
              color={theme.colors.green7}
              onClick={navigateToCheckout}
              disabled={isCurrentProPlan}
            />
          </PlanCard>

          <PlanCard id="enterprise-plan-card">
            <PlanCopy>
              <PlanTitle>{t("modals.view_plans.plans.enterprise.title")}</PlanTitle>
              <PriceBlock>
                <PlanPrice>{t(getPlanPriceKey("enterprise"))}</PlanPrice>
              </PriceBlock>
              <PlanDescription>{t("modals.view_plans.plans.enterprise.description")}</PlanDescription>
            </PlanCopy>
            <PlanButton
              text={isCurrentEnterprisePlan ? t("modals.view_plans.actions.current_plan") : t("modals.view_plans.plans.enterprise.cta")}
              type="outline"
              onClick={() => { window.open('https://shira.app/contact', '_blank') }}
              disabled={isCurrentEnterprisePlan}
            />
          </PlanCard>
        </PlansList>

        <ComparisonGrid>
          <ComparisonScroller>
            <ComparisonTable id="plans-comparison-table">
              <SectionTitle $isFirst>{t("modals.view_plans.comparison.admin_management")}</SectionTitle>
              <EmptySectionCell $isFirst />
              <EmptySectionCell $isFirst />
              <EmptySectionCell $isFirst />

              <FeatureCell>
                <FeatureLabel>{t("modals.view_plans.comparison.rows.hosting")}</FeatureLabel>
                <HelpTooltipIcon label={t("modals.view_plans.comparison.tooltips.hosting")} />
              </FeatureCell>
              <ValueCell>
                <ValueText>{t("modals.view_plans.comparison.values.cloud")}</ValueText>
              </ValueCell>
              <ValueCell>
                <ValueText>{t("modals.view_plans.comparison.values.cloud")}</ValueText>
              </ValueCell>
              <ValueCell>
                <ValueText>{t("modals.view_plans.comparison.values.cloud_on_premise")}</ValueText>
              </ValueCell>

              <FeatureCell>
                <FeatureLabel>{t("modals.view_plans.comparison.rows.admin_dashboard")}</FeatureLabel>
                <HelpTooltipIcon label={t("modals.view_plans.comparison.tooltips.admin_dashboard")} />
              </FeatureCell>
              <ValueCell><IoMdCheckmarkCircle size={28} color={theme.colors.green6} /></ValueCell>
              <ValueCell><IoMdCheckmarkCircle size={28} color={theme.colors.green6} /></ValueCell>
              <ValueCell><IoMdCheckmarkCircle size={28} color={theme.colors.green6} /></ValueCell>

              <FeatureCell>
                <FeatureLabel>{t("modals.view_plans.comparison.rows.number_of_admins")}</FeatureLabel>
                <HelpTooltipIcon label={t("modals.view_plans.comparison.tooltips.number_of_admins")} />
              </FeatureCell>
              <ValueCell>
                <ValueText>{t("modals.view_plans.comparison.values.one_admin")}</ValueText>
              </ValueCell>
              <ValueCell>
                <ValueText>{t("modals.view_plans.comparison.values.unlimited")}</ValueText>
              </ValueCell>
              <ValueCell>
                <ValueText>{t("modals.view_plans.comparison.values.unlimited")}</ValueText>
              </ValueCell>

              <SectionTitle>{t("modals.view_plans.comparison.customization")}</SectionTitle>
              <EmptySectionCell />
              <EmptySectionCell />
              <EmptySectionCell />

              <FeatureCell>
                <FeatureLabel>{t("modals.view_plans.comparison.rows.customizable_questions")}</FeatureLabel>
                <HelpTooltipIcon label={t("modals.view_plans.comparison.tooltips.customizable_questions")} />
              </FeatureCell>
              <ValueCell><IoMdCheckmarkCircle size={28} color={theme.colors.green6} /></ValueCell>
              <ValueCell><IoMdCheckmarkCircle size={28} color={theme.colors.green6} /></ValueCell>
              <ValueCell><IoMdCheckmarkCircle size={28} color={theme.colors.green6} /></ValueCell>

              <FeatureCell>
                <FeatureLabel>{t("modals.view_plans.comparison.rows.question_library")}</FeatureLabel>
                <HelpTooltipIcon label={t("modals.view_plans.comparison.tooltips.question_library")} />
              </FeatureCell>
              <ValueCell><IoMdCheckmarkCircle size={28} color={theme.colors.green6} /></ValueCell>
              <ValueCell><IoMdCheckmarkCircle size={28} color={theme.colors.green6} /></ValueCell>
              <ValueCell><IoMdCheckmarkCircle size={28} color={theme.colors.green6} /></ValueCell>

              <FeatureCell>
                <FeatureLabel>{t("modals.view_plans.comparison.rows.custom_quizzes")}</FeatureLabel>
                <HelpTooltipIcon label={t("modals.view_plans.comparison.tooltips.custom_quizzes")} />
              </FeatureCell>
              <ValueCell>
                <ValueText>{t("modals.view_plans.comparison.values.up_to_three_custom_quizzes")}</ValueText>
              </ValueCell>
              <ValueCell>
                <ValueText>{t("modals.view_plans.comparison.values.unlimited")}</ValueText>
              </ValueCell>
              <ValueCell>
                <ValueText>{t("modals.view_plans.comparison.values.unlimited")}</ValueText>
              </ValueCell>

              <FeatureCell>
                <FeatureLabel>{t("modals.view_plans.comparison.rows.apps_available")}</FeatureLabel>
                <HelpTooltipIcon label={t("modals.view_plans.comparison.tooltips.apps_available")} />
              </FeatureCell>
              <ValueCell>
                <AppsIconRow>
                  <DatingAppIcon />
                  <FacebookIcon />
                  <GmailIcon />
                  <OutlookIcon />
                  <SMSIcon />
                  <WhatsappIcon />
                </AppsIconRow>
              </ValueCell>
              <ValueCell>
                <AppsIconRow>
                  <DatingAppIcon />
                  <FacebookIcon />
                  <GmailIcon />
                  <OutlookIcon />
                  <SMSIcon />
                  <WhatsappIcon />
                </AppsIconRow>
              </ValueCell>
              <ValueCell>
                <AppsIconRow>
                  <DatingAppIcon />
                  <FacebookIcon />
                  <GmailIcon />
                  <OutlookIcon />
                  <SMSIcon />
                  <WhatsappIcon />
                </AppsIconRow>
              </ValueCell>

              <SectionTitle>{t("modals.view_plans.comparison.access_control")}</SectionTitle>
              <EmptySectionCell />
              <EmptySectionCell />
              <EmptySectionCell />

              <FeatureCell>
                <FeatureLabel>{t("modals.view_plans.comparison.rows.public_quizzes")}</FeatureLabel>
                <HelpTooltipIcon label={t("modals.view_plans.comparison.tooltips.public_quizzes")} />
              </FeatureCell>
              <ValueCell><IoMdCheckmarkCircle size={28} color={theme.colors.green6} /></ValueCell>
              <ValueCell><IoMdCheckmarkCircle size={28} color={theme.colors.green6} /></ValueCell>
              <ValueCell><IoMdCheckmarkCircle size={28} color={theme.colors.green6} /></ValueCell>

              <FeatureCell>
                <FeatureLabel>{t("modals.view_plans.comparison.rows.private_quizzes")}</FeatureLabel>
                <HelpTooltipIcon label={t("modals.view_plans.comparison.tooltips.private_quizzes")} />
              </FeatureCell>
              <ValueCell>
                <ValueText>-</ValueText>
              </ValueCell>
              <ValueCell><IoMdCheckmarkCircle size={28} color={theme.colors.green6} /></ValueCell>
              <ValueCell><IoMdCheckmarkCircle size={28} color={theme.colors.green6} /></ValueCell>

              <SectionTitle>{t("modals.view_plans.comparison.compliance")}</SectionTitle>
              <EmptySectionCell />
              <EmptySectionCell />
              <EmptySectionCell />

              <FeatureCell>
                <FeatureLabel>{t("modals.view_plans.comparison.rows.basic_analytics")}</FeatureLabel>
                <HelpTooltipIcon label={t("modals.view_plans.comparison.tooltips.basic_analytics")} />
              </FeatureCell>
              <ValueCell><IoMdCheckmarkCircle size={28} color={theme.colors.green6} /></ValueCell>
              <ValueCell><IoMdCheckmarkCircle size={28} color={theme.colors.green6} /></ValueCell>
              <ValueCell><IoMdCheckmarkCircle size={28} color={theme.colors.green6} /></ValueCell>

              <FeatureCell>
                <FeatureLabel>{t("modals.view_plans.comparison.rows.detailed_analytics")}</FeatureLabel>
                <HelpTooltipIcon label={t("modals.view_plans.comparison.tooltips.detailed_analytics")} />
              </FeatureCell>
              <ValueCell>
                <ValueText>-</ValueText>
              </ValueCell>
              <ValueCell><IoMdCheckmarkCircle size={28} color={theme.colors.green6} /></ValueCell>
              <ValueCell><IoMdCheckmarkCircle size={28} color={theme.colors.green6} /></ValueCell>

              <FeatureCell>
                <FeatureLabel>{t("modals.view_plans.comparison.rows.analysis_tools")}</FeatureLabel>
                <HelpTooltipIcon label={t("modals.view_plans.comparison.tooltips.analysis_tools")} />
              </FeatureCell>
              <ValueCell>
                <ValueText>-</ValueText>
              </ValueCell>
              <ValueCell><IoMdCheckmarkCircle size={28} color={theme.colors.green6} /></ValueCell>
              <ValueCell><IoMdCheckmarkCircle size={28} color={theme.colors.green6} /></ValueCell>

              <SectionTitle>{t("modals.view_plans.comparison.custom_support")}</SectionTitle>
              <EmptySectionCell />
              <EmptySectionCell />
              <EmptySectionCell />

              <FeatureCell>
                <FeatureLabel>{t("modals.view_plans.comparison.rows.tailor_made_training")}</FeatureLabel>
                <HelpTooltipIcon label={t("modals.view_plans.comparison.tooltips.tailor_made_training")} />
              </FeatureCell>
              <ValueCell>
                <ValueText>-</ValueText>
              </ValueCell>
              <ValueCell>
                <ValueText>-</ValueText>
              </ValueCell>
              <ValueCell>
                <ValueText>{t("modals.view_plans.comparison.values.available_upon_request")}</ValueText>
              </ValueCell>

              <FeatureCell>
                <FeatureLabel>{t("modals.view_plans.comparison.rows.priority_support")}</FeatureLabel>
                <HelpTooltipIcon label={t("modals.view_plans.comparison.tooltips.priority_support")} />
              </FeatureCell>
              <ValueCell>
                <ValueText>-</ValueText>
              </ValueCell>
              <ValueCell>
                <ValueText>{t("modals.view_plans.comparison.values.three_business_day_response_time")}</ValueText>
              </ValueCell>
              <ValueCell>
                <ValueText>{t("modals.view_plans.comparison.values.one_business_day_response_time")}</ValueText>
              </ValueCell>
            </ComparisonTable>
          </ComparisonScroller>
        </ComparisonGrid>

        <BottomAction>
          <Button
            id="plans-learn-more"
            text={t("modals.view_plans.actions.learn_more")}
            type="outline"
            onClick={() => { window.open("https://shira.app/pricing", "_blank"); }}
          />
        </BottomAction>
      </Content>
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  width: min(1380px, calc(100vw - 32px));
  max-height: calc(100vh - 32px);

  > div:first-child {
    padding-bottom: 12px;

    > h4 {
      font-weight: 400;
      font-size: 16px;

      @media (max-width: ${props => props.theme.breakpoints.sm}) {
        font-size: 14px;
      }
    }
  }

  > div:nth-child(2) {
    padding-top: 8px;
    padding-bottom: 32px;
    overflow-y: auto;
  }

  > div:last-child {
    display: none;
  }
`;

const CloseButton = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.theme.colors.dark.darkGrey};
  line-height: 1;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const BillingToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;  
`;

const BillingToggle = styled.div`
  height: 58px;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  background: ${props => props.theme.colors.light.white};
  border: 1px solid ${props => props.theme.colors.dark.lightGrey};
  border-radius: 999px;
  padding: 5px;
  gap: 6px;

  box-shadow: 0px -3px 8px 1px rgba(0, 0, 0, 0.05);
  box-shadow: 0px -4px 8px 0px rgba(0, 0, 0, 0.03);
`;

const BillingToggleOption = styled.button<{ $isActive: boolean }>`
  height: 46px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;
  
  border: none;
  border-radius: 999px;
  padding: 0 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  
  transition: background-color 0.2s ease, color 0.2s ease;
  background: transparent;
  color: ${props => props.theme.colors.dark.darkGrey};

  ${props => props.$isActive && `
    background: ${props.theme.colors.green2};
    color: ${props.theme.colors.dark.black};
  `}
`;

const PlansList = styled.div`
  display: grid;
  grid-template-columns: minmax(320px, 1.45fr) repeat(3, minmax(240px, 1fr));
  gap: 24px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const PlanSpacer = styled.div`
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const PlanCard = styled.div<{ $isHighlighted?: boolean }>`
  min-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 28px 24px 22px;
  border: 1px solid ${props => props.theme.colors.dark.lightGrey};
  border-radius: 36px;
  background: ${props => props.$isHighlighted
    ? props.theme.colors.light.paleGreen
    : props.theme.colors.light.white};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    min-height: unset;
    padding: 24px 20px 20px;
    border-radius: 28px;
  }
`;

const PlanCopy = styled.div`
  display: flex;
  flex-direction: column;
`;

const PlanTitle = styled(SubHeading1)`
  margin: 0;
  color: ${props => props.theme.colors.dark.black};
  font-size: 26px;
`;

const PlanPrice = styled(SubHeading3)`
  color: ${props => props.theme.colors.green7};
  font-size: 21px;
  font-weight: 600;
`;

const PriceBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const PlanDescription = styled(Body3)`
  color: ${props => props.theme.colors.dark.darkGrey};
`;

const PlanButton = styled(Button)`
  justify-content: center;
  
`;

const ComparisonGrid = styled.div`
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const BottomAction = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0 4px;
`;

const ComparisonScroller = styled.div`
  overflow-x: auto;
  padding-bottom: 4px;
`;

const ComparisonTable = styled.div`
  display: grid;
  grid-template-columns: minmax(320px, 1.45fr) repeat(3, minmax(240px, 1fr));
  min-width: 1120px;
`;

const SectionTitle = styled.div<{ $isFirst?: boolean }>`
  padding: ${props => props.$isFirst ? "30px 32px 18px" : "62px 32px 18px"};
  color: ${props => props.theme.colors.green7};
  font-size: 14px;
  line-height: 1.3;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  border-bottom: 1px solid ${props => props.theme.colors.light.paleGrey};
`;

const EmptySectionCell = styled.div<{ $isFirst?: boolean }>`
  padding-top: ${props => props.$isFirst ? "30px" : "62px"};
  border-bottom: 1px solid ${props => props.theme.colors.light.paleGrey};
`;

const FeatureCell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 18px 32px;
  border-bottom: 1px solid ${props => props.theme.colors.light.paleGrey};
`;

const FeatureLabel = styled.span`
  color: ${props => props.theme.colors.dark.black};
  font-size: 15px;
  line-height: 1.35;
  font-weight: 600;
`;

const ValueCell = styled(Body3)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.light.paleGrey};
`;

const ValueText = styled.span`
  color: ${props => props.theme.colors.dark.darkGrey};
  font-size: 15px;
  line-height: 1.35;
`;

const AppsIconRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;
