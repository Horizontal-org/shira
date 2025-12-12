import { FunctionComponent } from "react";
import toast from "react-hot-toast";
import { Button, useTheme } from "@shira/ui";
import { useTranslation } from "react-i18next";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { handleHttpError } from "../../../../fetch/handleError";
import { getErrorContent } from "../../../../utils/getErrorContent";
import styled from "styled-components";
import { AssignRequest, assignToQuiz } from "../../../../fetch/learner_quiz";

interface Props {
  learners: AssignRequest[];
  openErrorModal: (content: string, retry: () => void) => void;
}

export const AssignLearnerAction: FunctionComponent<Props> = ({
  learners,
  openErrorModal }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const assign = async () => {
    try {
      const response = await assignToQuiz(learners);

      if (response.status === "Error") {
        const content = getErrorContent("error_messages", "assign_quiz_failed", response.message);

        openErrorModal(content, assign);
        return;
      }

      const successMessage =
        learners.length === 1
          ? t("success_messages.learner_assigned", { count: learners.length })
          : t("success_messages.learners_assigned_plural", {
            count: learners.length,
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
        id="assign-learner-button"
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
