import { FunctionComponent } from "react";
import toast from "react-hot-toast";
import { Button } from "@shira/ui";
import { FiDownload } from "react-icons/fi";
import { useTranslation } from "react-i18next";
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

  const learnersPayload = learnerIds.map((learnerId) => ({
    learnerId,
    quizId,
  }));

  const assignQuizToLearner = async () => {
    try {
      const response = await assignToQuiz(learnersPayload);

      if (response.data.status !== "Error") {
        const message = () => {
          if (learnerIds.length === 1) {
            return t(`success_messages.learner_assigned`, { count: learnerIds.length });
          }

          return t(`success_messages.learners_assigned_plural`, { count: learnerIds.length });
        };

        toast.success(message, { duration: 3000 });
      }

      if (response.data.status === "Error") {
        const content = getErrorContent("error_messages", "assign_quiz_failed", response.data.message);

        openErrorModal(content, assignQuizToLearner);
      }
    } catch (error) {
      const e = handleHttpError(error);
      const content = getErrorContent("error_messages", "assign_quiz_failed", e.message);

      openErrorModal(content, assignQuizToLearner);
    }
  };

  return (
    <ActionContainer>
      <Button
        text="Assign to quiz"
        type="outline"
        leftIcon={<FiDownload />}
        onClick={assignQuizToLearner}
      />
    </ActionContainer>
  );
};

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
