import { Body1, Modal, styled } from "@shira/ui";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  isModalOpen: boolean;
  onClose: () => void;
  onViewPlans: () => void;
}

export const QuizLimitModal: FunctionComponent<Props> = ({
  isModalOpen,
  onClose,
  onViewPlans,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      id="quiz-limit-modal"
      isOpen={isModalOpen}
      title={t("modals.quiz_limit.title")}
      primaryButtonText={t("settings.subscription.view_plans")}
      secondaryButtonText={t("buttons.no_thanks")}
      onPrimaryClick={onViewPlans}
      onSecondaryClick={onClose}
      onClose={onClose}
    >
      <Content>
        <Body1>{t("modals.quiz_limit.message_1")}</Body1>
        <Body1>{t("modals.quiz_limit.message_2")}</Body1>
      </Content>
    </Modal>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
