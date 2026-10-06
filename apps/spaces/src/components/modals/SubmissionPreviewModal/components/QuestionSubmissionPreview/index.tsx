import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import type { QuestionSubmissionPreviewDto } from "../../../../../fetch/submissions";
import { PreviewQuestionScreen } from "../../../PreviewQuizScreen/PreviewQuestionScreen";
import { QuestionSubmissionPreviewDetailsCard } from "../QuestionSubmissionPreviewDetailsCard";
import { SubmissionStatusBanner } from "../SubmissionStatusBanner";

type Props = {
  question: QuestionSubmissionPreviewDto;
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
      submissionStatusBanner={(
        <SubmissionStatusBanner status={question.status} submissionNote={question.submissionNote} />
      )}
      description={question.description}
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
