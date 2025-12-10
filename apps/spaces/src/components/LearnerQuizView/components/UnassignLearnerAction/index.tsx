import { FunctionComponent } from "react";
import toast from "react-hot-toast";
import { Button } from "@shira/ui";
import { FaPersonCircleMinus } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { handleHttpError } from "../../../../fetch/handleError";
import { getErrorContent } from "../../../../utils/getErrorContent";
import styled from "styled-components";
import { unassignFromQuiz } from "../../../../fetch/learner_quiz";

interface Props {
  openErrorModal: (content: string, retry: () => void) => void;
}

export const UnassignLearnerAction: FunctionComponent<Props> = ({ openErrorModal }) => {
  const { t } = useTranslation();

  const unassignQuizToLearner = async () => {
    try {
      const learners = [{ learnerId: 9, quizId: 2 }, { learnerId: 8, quizId: 2 }]; // Mock of learners
      const response = await unassignFromQuiz(learners);

      if (response.data.status !== "Error") {
        const message = () => {
          if (learners.length === 1) {
            return t(`success_messages.learner_unassigned`, { count: learners.length });
          }

          return t(`success_messages.learners_unassigned_plural`, { count: learners.length });
        };

        toast.success(message, { duration: 3000 });
      }

      if (response.data.status === "Error") {
        const content = getErrorContent("error_messages", "unassign_quiz_failed", response.data.message);

        openErrorModal(content, unassignQuizToLearner);
      }
    } catch (error) {
      const e = handleHttpError(error);
      const content = getErrorContent("error_messages", "unassign_quiz_failed", e.message);

      openErrorModal(content, unassignQuizToLearner);
    }
  };

  return (
    <ActionContainer>
      <Button
        text="Unassign to quiz"
        type="outline"
        leftIcon={<FaPersonCircleMinus />}
        onClick={unassignQuizToLearner}
      />
    </ActionContainer>
  );
};

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
