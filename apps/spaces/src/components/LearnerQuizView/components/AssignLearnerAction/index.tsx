import { FunctionComponent } from "react";
import toast from "react-hot-toast";
import { Button, useTheme } from "@shira/ui";
import { useTranslation } from "react-i18next";
import { handleHttpError } from "../../../../fetch/handleError";
import { getErrorContent } from "../../../../utils/getErrorContent";
import styled from "styled-components";
import { IoPersonAdd } from "react-icons/io5";
import { AssignRequest, assignToQuiz } from "../../../../fetch/learner_quiz";

interface Props {
  learners: AssignRequest[];
  openErrorModal: (content: string, retry: () => void) => void;
  onSuccess?: () => void;
  loading?: boolean;
  setIsLoading?: (v: boolean) => void;
  disabled?: boolean;
}

export const AssignLearnerAction: FunctionComponent<Props> = ({
  learners,
  openErrorModal,
  loading,
  disabled,
  onSuccess,
  setIsLoading
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const assign = async () => {
    setIsLoading?.(true);

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
      onSuccess?.();
    } catch (error) {
      const e = handleHttpError(error);
      const content = getErrorContent("error_messages", "assign_quiz_failed", e.message);

      openErrorModal(content, assign);
    } finally {
      setIsLoading?.(false);
    }
  };

  return (
    <ActionContainer>
      <Button
        id="assign-learner-button"
        text={t("buttons.assign_via_email")}
        type="primary"
        leftIcon={(<IoPersonAdd size={20} color="white" />)}
        color={theme.colors.green7}
        onClick={assign}
        disabled={disabled || loading}
      />
    </ActionContainer>
  );
};

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
