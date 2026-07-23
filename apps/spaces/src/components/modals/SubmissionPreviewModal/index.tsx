import { FunctionComponent } from "react";
import type { QuestionSubmissionDetailDto, QuizSubmissionDetailDto } from "../../../fetch/submissions";
import { PreviewModal } from "../PreviewQuizScreen";
import { QuestionSubmissionPreview } from "./components/QuestionSubmissionPreview";
import { QuizSubmissionPreview } from "./components/QuizSubmissionPreview";

type Props = {
  quiz: QuizSubmissionDetailDto | null;
  question: QuestionSubmissionDetailDto | null;
  onClose: () => void;
};

export const SubmissionPreviewModal: FunctionComponent<Props> = ({ quiz, question, onClose }) => {
  if (!quiz && !question) return null;

  return (
    <PreviewModal isOpen onClose={onClose}>
      {quiz ? (
        <QuizSubmissionPreview quiz={quiz} onClose={onClose} />
      ) : (
        <QuestionSubmissionPreview question={question!} onClose={onClose} />
      )}
    </PreviewModal>
  );
};
