import { Button, defaultTheme, styled } from "@horizontal-org/shira-ui";
import { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoEyeSharp } from "react-icons/io5";
import {
  type QuestionSubmissionDetailDto,
  type QuizSubmissionDetailDto,
} from "../../../../../fetch/submissions";
import { QuizPreviewQuestionsTable } from "../../../QuizLibraryPreviewModal/components/QuizPreviewQuestionsTable";
import { PreviewModalPage } from "../../../PreviewModal";
import { PreviewQuestionScreen } from "../../../PreviewModal/PreviewQuestionScreen";
import { QuizSubmissionPreviewDetailsCard } from "../QuizSubmissionPreviewDetailsCard";
import { QuestionSubmissionPreviewDetailsCard } from "../QuestionSubmissionPreviewDetailsCard";

type Props = {
  quiz: QuizSubmissionDetailDto;
  onClose: () => void;
};

export const QuizSubmissionPreview: FunctionComponent<Props> = ({ quiz, onClose }) => {
  const { t, i18n } = useTranslation();

  const [isFullQuizPreview, setIsFullQuizPreview] = useState(false);
  const [questions, setQuestions] = useState<QuestionSubmissionDetailDto[]>([]);
  const [previewQuestion, setPreviewQuestion] = useState<QuestionSubmissionDetailDto | null>(null);

  useEffect(() => {
    setIsFullQuizPreview(false);
    setPreviewQuestion(null);
    setQuestions(quiz.questions);
  }, [quiz]);

  const openQuestionPreview = async (questionId: number) => {
    const selectedQuestion = questions.find((question) => Number(question.id) === questionId);

    if (selectedQuestion) {
      setPreviewQuestion(selectedQuestion);
    }
  };

  const updateQuestionApp = (questionId: number, appName: string) => {
    setQuestions((currentQuestions) => currentQuestions.map((question) => (
      Number(question.id) === questionId ? { ...question, app: appName } : question
    )));
  };

  // Replace the quiz overview with the selected question's full preview
  if (previewQuestion) {
    return (
      <PreviewQuestionScreen
        question={{
          questionId: Number(previewQuestion.id),
          appName: previewQuestion.app,
          content: previewQuestion.content,
          explanations: previewQuestion.explanations,
        }}
        headerLabel={t("create_question.tabs.preview.aria_label")}
        details={(
          <QuestionSubmissionPreviewDetailsCard
            language={previewQuestion.language}
            tags={previewQuestion.tags}
            isPhishing={previewQuestion.isPhishing}
            app={previewQuestion.app}
            dateSubmitted={previewQuestion.dateSubmitted}
            locale={i18n.language}
          />
        )}
        onBack={() => setPreviewQuestion(null)}
        onClose={onClose}
      />
    );
  }

  // Otherwise, show the submission metadata and its list of questions
  return (
    <PreviewModalPage
      onClose={onClose}
      title={quiz.title}
      subtitle={quiz.description}
      actions={(
        <Button
          text={t("quiz_library.preview.preview_full_quiz")}
          type="outline"
          leftIcon={<IoEyeSharp size={22} color={defaultTheme.colors.dark.darkGrey} />}
          onClick={() => setIsFullQuizPreview((current) => !current)}
        />
      )}
      details={(
        <QuizSubmissionPreviewDetailsCard
          languages={quiz.langTags.map((language) => language.name)}
          tags={quiz.tags ?? []}
          status={quiz.status}
          dateSubmitted={quiz.dateSubmitted}
          locale={i18n.language}
        />
      )}
    >
      <PreviewArea>
        <QuizPreviewQuestionsTable
          questions={questions.map((question) => ({
            questionId: Number(question.id),
            questionName: question.questionName,
            isPhishing: question.isPhishing,
            language: question.language,
            appName: question.app,
            appType: question.appType,
          }))}
          onPreviewQuestion={openQuestionPreview}
          onSelectApp={updateQuestionApp}
        />
      </PreviewArea>
    </PreviewModalPage>
  );
};

const PreviewArea = styled.div`
  position: relative;
  margin-top: 16px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
`;
