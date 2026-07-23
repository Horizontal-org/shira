import { Button, defaultTheme, styled } from "@horizontal-org/shira-ui";
import { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoEyeSharp } from "react-icons/io5";
import {
  type QuestionSubmissionDetailDto,
  type QuizSubmissionDetailDto,
} from "../../../../../fetch/submissions";
import {
  FullQuizPreviewScreen,
  type PreviewQuestion,
} from "../../../PreviewQuizScreen/FullQuizPreviewScreen";
import { QuizPreviewQuestionsTable } from "../../../QuizLibraryPreviewModal/components/QuizPreviewQuestionsTable";
import { PreviewQuizScreen } from "../../../PreviewQuizScreen";
import { PreviewQuestionScreen } from "../../../PreviewQuizScreen/PreviewQuestionScreen";
import { QuizSubmissionPreviewDetailsCard } from "../QuizSubmissionPreviewDetailsCard";
import { QuestionSubmissionPreviewDetailsCard } from "../QuestionSubmissionPreviewDetailsCard";

type Props = {
  quiz: QuizSubmissionDetailDto;
  onClose: () => void;
};

export const QuizSubmissionPreview: FunctionComponent<Props> = ({ quiz, onClose }) => {
  const { t, i18n } = useTranslation();

  const [questions, setQuestions] = useState<QuestionSubmissionDetailDto[]>([]);
  const [previewQuestion, setPreviewQuestion] = useState<QuestionSubmissionDetailDto | null>(null);
  const [fullPreviewQuestionId, setFullPreviewQuestionId] = useState<number | null>(null);

  useEffect(() => {
    setPreviewQuestion(null);
    setFullPreviewQuestionId(null);
    setQuestions(quiz.questions);
  }, [quiz]);

  const previewQuestions: PreviewQuestion[] = questions.map((question) => ({
    id: Number(question.id),
    name: question.questionName,
    isPhishing: question.isPhishing,
    app: question.app,
    appType: question.appType,
    content: question.content,
    explanations: question.explanations,
  }));
  const fullPreviewQuestion = previewQuestions.find(
    (question) => question.id === fullPreviewQuestionId,
  );

  const openQuestionPreview = async (questionId: number) => {
    const selectedQuestion = questions.find((question) => Number(question.id) === questionId);

    if (selectedQuestion) {
      setPreviewQuestion(selectedQuestion);
    }
  };

  if (fullPreviewQuestion) {
    return (
      <FullQuizPreviewScreen
        quiz={{ title: quiz.title }}
        questions={previewQuestions}
        question={fullPreviewQuestion}
        onBack={() => setFullPreviewQuestionId(null)}
        onClose={onClose}
        onSelectQuestion={setFullPreviewQuestionId}
      />
    );
  }

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
    <PreviewQuizScreen
      onClose={onClose}
      title={quiz.title}
      subtitle={quiz.description}
      actions={(
        <Button
          text={t("quiz_library.preview.preview_full_quiz")}
          type="outline"
          leftIcon={<IoEyeSharp size={22} color={defaultTheme.colors.dark.darkGrey} />}
          disabled={!previewQuestions[0]}
          onClick={() => setFullPreviewQuestionId(previewQuestions[0]?.id ?? null)}
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
          allowAppSelection={false}
        />
      </PreviewArea>
    </PreviewQuizScreen>
  );
};

const PreviewArea = styled.div`
  position: relative;
  margin-top: 16px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
`;
