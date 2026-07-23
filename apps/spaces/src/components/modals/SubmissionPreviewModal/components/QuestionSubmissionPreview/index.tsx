import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import type { QuestionSubmissionDetailDto } from "../../../../../fetch/submissions";
import { PreviewQuestionScreen } from "../../../PreviewModal/PreviewQuestionScreen";
import { QuestionSubmissionPreviewDetailsCard } from "../QuestionSubmissionPreviewDetailsCard";

type Props = {
  question: QuestionSubmissionDetailDto;
  onClose: () => void;
};

export const QuestionSubmissionPreview: FunctionComponent<Props> = ({ question, onClose }) => {
  const { i18n } = useTranslation();

  return (
    <PreviewQuestionScreen
      question={{
        questionId: Number(question.id),
        appName: question.app,
        content: question.content,
        explanations: question.explanations,
      }}
      headerLabel={question.questionName}
      details={(
        <QuestionSubmissionPreviewDetailsCard
          language={question.language}
          tags={question.tags}
          isPhishing={question.isPhishing}
          app={question.app}
          dateSubmitted={question.dateSubmitted}
          locale={i18n.language}
        />
      )}
      onClose={onClose}
    />
  );
};
