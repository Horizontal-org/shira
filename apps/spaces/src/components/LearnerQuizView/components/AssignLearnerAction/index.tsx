import { FunctionComponent } from "react";
import toast from "react-hot-toast";
import { Button, useTheme } from "@shira/ui";
import { useTranslation } from "react-i18next";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { handleHttpError } from "../../../../fetch/handleError";
import { getErrorContent } from "../../../../utils/getErrorContent";
import styled from "styled-components";
import { assignToQuiz } from "../../../../fetch/learner_quiz";

interface Props {
  learnerIds: number[];
  quizId: number;
  openErrorModal: (content: string, retry: () => void) => void;
}

export const AssignLearnerAction: FunctionComponent<Props> = ({ learnerIds, quizId, openErrorModal }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const learnersPayload = learnerIds.map((learnerId) => ({
    learnerId,
    quizId,
  }));

  const assign = async () => {
    try {
      const response = await assignToQuiz(learnersPayload);

      if (response.status === "Error") {
        const content = getErrorContent("error_messages", "assign_quiz_failed", response.message);

        openErrorModal(content, assign);
        return;
      }

      const successMessage =
        learnerIds.length === 1
          ? t("success_messages.learner_assigned", { count: learnerIds.length })
          : t("success_messages.learners_assigned_plural", {
            count: learnerIds.length,
          });

      toast.success(successMessage, { duration: 3000 });
    } catch (error) {
      const e = handleHttpError(error);
      const content = getErrorContent("error_messages", "assign_quiz_failed", e.message);

      openErrorModal(content, assign);
    }
  };

  return (
    <ActionContainer>
      <Button
        text={t("buttons.assign_learners")}
        type="primary"
        leftIcon={<BsFillPersonPlusFill />}
        color={theme.colors.green7}
        onClick={assign}
      />
    </ActionContainer>
  );
};

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
