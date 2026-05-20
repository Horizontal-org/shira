import { FunctionComponent } from "react";
import { 
  DatingAppIcon, 
  FacebookIcon, 
  GmailIcon, 
  Modal, 
  OutlookIcon, 
  SMSIcon, 
  WhatsappIcon, 
  styled, 
  useTheme,
  PricingTable,
  PricingFeatureSection,
  PricingPlan
} from "@horizontal-org/shira-ui";
import { useTranslation } from "react-i18next";
import { checkoutSubscription, navigateToManageSubscription } from "../../../fetch/auth";
import { useStore } from "../../../store";
import { useSub } from "../../../hooks/useSub";
import { FiX } from "react-icons/fi";

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
      const response = await checkoutSubscription(organizationId);
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

  const appsIcons = (
    <AppsIconRow>
      <DatingAppIcon />
      <FacebookIcon />
      <GmailIcon />
      <OutlookIcon />
      <SMSIcon />
      <WhatsappIcon />
    </AppsIconRow>
  );

  const plans: [PricingPlan, PricingPlan, PricingPlan] = [
    {
      id: "starter",
      title: t("modals.view_plans.plans.starter.title"),
      price: t("modals.view_plans.plans.starter.price"),
      description: t("modals.view_plans.plans.starter.description"),
      buttonText: starterButtonText,
      buttonType: "outline",
      isCurrentPlan: isCurrentStarterPlan,
      onClick: handleStarterPlanClick,
    },
    {
      id: "pro",
      title: t("modals.view_plans.plans.pro.title"),
      price: t("modals.view_plans.plans.pro.price"),
      description: t("modals.view_plans.plans.pro.description"),
      buttonText: isCurrentProPlan ? t("modals.view_plans.actions.current_plan") : t("modals.view_plans.plans.pro.cta"),
      buttonColor: theme.colors.green7,
      isCurrentPlan: isCurrentProPlan,
      isHighlighted: true,
      onClick: navigateToCheckout,
    },
    {
      id: "enterprise",
      title: t("modals.view_plans.plans.enterprise.title"),
      price: t("modals.view_plans.plans.enterprise.price"),
      description: t("modals.view_plans.plans.enterprise.description"),
      buttonText: isCurrentEnterprisePlan ? t("modals.view_plans.actions.current_plan") : t("modals.view_plans.plans.enterprise.cta"),
      buttonType: "outline",
      isCurrentPlan: isCurrentEnterprisePlan,
      onClick: () => {
        window.open("https://shira.app/contact", "_blank");
      },
    },
  ];

  const sections: PricingFeatureSection[] = [
    {
      title: t("modals.view_plans.comparison.admin_management"),
      rows: [
        {
          label: t("modals.view_plans.comparison.rows.hosting"),
          tooltip: t("modals.view_plans.comparison.tooltips.hosting"),
          values: [
            {type: 'text', value: t("modals.view_plans.comparison.values.cloud")},
            {type: 'text', value: t("modals.view_plans.comparison.values.cloud")},
            {type: 'text', value: t("modals.view_plans.comparison.values.cloud_on_premise")},
          ],
        },
        {
          label: t("modals.view_plans.comparison.rows.admin_dashboard"),
          tooltip: t("modals.view_plans.comparison.tooltips.admin_dashboard"),
          values: [{type: 'check'}, {type: 'check'}, {type: 'check'}],
        },
        {
          label: t("modals.view_plans.comparison.rows.number_of_admins"),
          tooltip: t("modals.view_plans.comparison.tooltips.number_of_admins"),
          values: [
            {type: 'text', value: t("modals.view_plans.comparison.values.one_admin")},
            {type: 'text', value: t("modals.view_plans.comparison.values.unlimited_coming_soon")},
            {type: 'text', value: t("modals.view_plans.comparison.values.unlimited_coming_soon")},
          ],
        },
      ],
    },
    {
      title: t("modals.view_plans.comparison.customization"),
      rows: [
        {
          label: t("modals.view_plans.comparison.rows.customizable_questions"),
          tooltip: t("modals.view_plans.comparison.tooltips.customizable_questions"),
          values: [{type: 'check'}, {type: 'check'}, {type: 'check'}],
        },
        {
          label: t("modals.view_plans.comparison.rows.question_library"),
          tooltip: t("modals.view_plans.comparison.tooltips.question_library"),
          values: [{type: 'check'}, {type: 'check'}, {type: 'check'}],
        },
        {
          label: t("modals.view_plans.comparison.rows.custom_quizzes"),
          tooltip: t("modals.view_plans.comparison.tooltips.custom_quizzes"),
          values: [
            {type: 'text', value: t("modals.view_plans.comparison.values.up_to_three_custom_quizzes")},
            {type: 'text', value: t("modals.view_plans.comparison.values.unlimited")},
            {type: 'text', value: t("modals.view_plans.comparison.values.unlimited")},
          ],
        },
        {
          label: t("modals.view_plans.comparison.rows.apps_available"),
          tooltip: t("modals.view_plans.comparison.tooltips.apps_available"),
          values: [{type: 'custom', value: appsIcons}, {type: 'custom', value: appsIcons}, {type: 'custom', value: appsIcons}],
        },
      ],
    },
    {
      title: t("modals.view_plans.comparison.access_control"),
      rows: [
        {
          label: t("modals.view_plans.comparison.rows.public_quizzes"),
          tooltip: t("modals.view_plans.comparison.tooltips.public_quizzes"),
          values: [{type: 'check'}, {type: 'check'}, {type: 'check'}],
        },
        {
          label: t("modals.view_plans.comparison.rows.private_quizzes"),
          tooltip: t("modals.view_plans.comparison.tooltips.private_quizzes"),
          values: [{type: 'text', value: '-'}, {type: 'check'}, {type: 'check'}],
        },
      ],
    },
    {
      title: t("modals.view_plans.comparison.compliance"),
      rows: [
        {
          label: t("modals.view_plans.comparison.rows.basic_analytics"),
          tooltip: t("modals.view_plans.comparison.tooltips.basic_analytics"),
          values: [{type: 'check'}, {type: 'check'}, {type: 'check'}],
        },
        {
          label: t("modals.view_plans.comparison.rows.detailed_analytics"),
          tooltip: t("modals.view_plans.comparison.tooltips.detailed_analytics"),
          values: [{type: 'text', value: '-'}, {type: 'check'}, {type: 'check'}],
        },
        {
          label: t("modals.view_plans.comparison.rows.analysis_tools"),
          tooltip: t("modals.view_plans.comparison.tooltips.analysis_tools"),
          values: [{type: 'text', value: '-'}, {type: 'check'}, {type: 'check'}],
        },
      ],
    },
    {
      title: t("modals.view_plans.comparison.custom_support"),
      rows: [
        {
          label: t("modals.view_plans.comparison.rows.phishing_readiness_assessment"),
          tooltip: t("modals.view_plans.comparison.tooltips.phishing_readiness_assessment"),
          values: [{type: 'text', value: '-'}, {type: 'text', value: '-'}, {type: 'check'}],
        },
        {
          label: t("modals.view_plans.comparison.rows.preparedness_report"),
          tooltip: t("modals.view_plans.comparison.tooltips.preparedness_report"),
          values: [{type: 'text', value: '-'}, {type: 'text', value: '-'}, {type: 'check'}],
        },
        {
          label: t("modals.view_plans.comparison.rows.tailor_made_training"),
          tooltip: t("modals.view_plans.comparison.tooltips.tailor_made_training"),
          values: [
            {type: 'text', value: '-'},
            {type: 'text', value: '-'},
            {type: 'text', value: t("modals.view_plans.comparison.values.available_upon_request")}
          ],
        },
        {
          label: t("modals.view_plans.comparison.rows.priority_support"),
          tooltip: t("modals.view_plans.comparison.tooltips.priority_support"),
          values: [
            {type: 'text', value: '-'},
            {type: 'text', value: t("modals.view_plans.comparison.values.three_business_day_response_time")},
            {type: 'text', value: t("modals.view_plans.comparison.values.one_business_day_response_time")}
          ],
        },       
      ],
    },
  ];

  return (
     <StyledModal
      id="view-plans-modal"
      isOpen={isModalOpen}
      title={t("modals.view_plans.modal_title")}
      titleIcon={
        <CloseButton onClick={onClose} aria-label={t("buttons.close")}>
          <FiX size={18} />
        </CloseButton>
      }
      primaryButtonText={t("buttons.close")}
      secondaryButtonText=""
      onPrimaryClick={onClose}
      onClose={onClose}
      size="large"
    >
      <PricingTable
        learnMoreText={t("modals.view_plans.actions.learn_more")}
        onLearnMoreClick={() => {
          window.open("https://shira.app/pricing", "_blank");
        }}
        plans={plans}
        sections={sections}
      />
    </StyledModal>
  );
};

const AppsIconRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const StyledModal = styled(Modal)`
  width: min(1380px, calc(100vw - 32px));
  max-height: calc(100vh - 32px);

  > div:first-child {
    padding-bottom: 12px;

    > h4 {
      font-weight: 400;
      font-size: 16px;

      @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
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
  color: ${(props) => props.theme.colors.dark.darkGrey};
  line-height: 1;
`;
