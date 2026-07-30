import { FunctionComponent } from "react";
import type {
  QuestionSubmissionPreviewDto,
  QuizSubmissionPreviewDto,
} from "../../../fetch/submissions";
import { PreviewModal } from "../PreviewQuizScreen";
import { QuestionSubmissionPreview } from "./components/QuestionSubmissionPreview";
import { QuizSubmissionPreview } from "./components/QuizSubmissionPreview";

type Props = {
  quiz: QuizSubmissionPreviewDto | null;
  question: QuestionSubmissionPreviewDto | null;
  onClose: () => void;
};

export const SubmissionPreviewModal: FunctionComponent<Props> = ({ quiz, question, onClose }) => {
  if (!quiz && !question) return null;

  if (quiz) {
    return (
      <PreviewModal isOpen onClose={onClose}>
        <QuizSubmissionPreview quiz={quiz} onClose={onClose} />
      </PreviewModal>
    );
  }

  if (question) {
    return (
      <PreviewModal isOpen onClose={onClose}>
        <QuestionSubmissionPreview question={question} onClose={onClose} />
      </PreviewModal>
    );
  }

  return null;
};
