import { Button, defaultTheme, styled } from "@horizontal-org/shira-ui";
import { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoEyeSharp } from "react-icons/io5";
import type { QuestionSubmissionDetailDto, QuizSubmissionDetailDto } from "../../../fetch/submissions";
import { getQuestionSubmission } from "../../../fetch/submissions";
import type { LibraryQuizQuestionTemplateDto } from "../../../fetch/quiz_templates";
import { QuizPreviewQuestionsTable } from "../QuizLibraryPreviewModal/components/QuizPreviewQuestionsTable";
import { AppLayout } from "../../QuestionPreview/AppLayout";
import { isMessagingNotPhoneApp, isMessagingPhoneApp } from "../../../utils/appNames";
import { QuizPreviewModal } from "../QuizPreviewModal";
import { useQuestionPreviewState } from "../QuizPreviewModal/useQuestionPreviewState";
import { QuizTemplateQuestionPreview } from "../QuizLibraryPreviewModal/components/QuizTemplateQuestionPreview";
import { QuizSubmissionPreviewDetailsCard } from "./components/QuizSubmissionPreviewDetailsCard";
import { QuestionSubmissionPreviewDetailsCard } from "./components/QuestionSubmissionPreviewDetailsCard";

type Props = {
  quiz: QuizSubmissionDetailDto | null;
  question: QuestionSubmissionDetailDto | null;
  onClose: () => void;
};

export const SubmissionPreviewModal: FunctionComponent<Props> = ({
  quiz,
  question,
  onClose,
}) => {
  const { t, i18n } = useTranslation();
  const [isFullQuizPreview, setIsFullQuizPreview] = useState(false);
  const [showExplanations, setShowExplanations] = useState(false);
  const [submissionQuestions, setSubmissionQuestions] = useState<LibraryQuizQuestionTemplateDto[]>([]);
  const [previewQuestion, setPreviewQuestion] = useState<QuestionSubmissionDetailDto | null>(null);
  const {
    openPreviewQuestion,
    closePreviewQuestion,
    updateQuestionApp,
  } = useQuestionPreviewState(setSubmissionQuestions);

  const submissionId = quiz?.id ?? question?.id;

  useEffect(() => {
    setIsFullQuizPreview(false);
    setShowExplanations(false);
    closePreviewQuestion();
    setPreviewQuestion(null);
    setSubmissionQuestions((quiz?.questions ?? []).map((quizQuestion) => ({
      ...quizQuestion,
      content: "",
      explanations: [],
    })));
  }, [submissionId, closePreviewQuestion]);

  if (!quiz && !question) return null;

  const isQuiz = Boolean(quiz);
  const isQuestion = Boolean(question);

  const openSingleQuestionPreview = async (questionId: number) => {
    openPreviewQuestion(questionId);
    const loadedQuestion = await getQuestionSubmission(String(questionId));

    if (!loadedQuestion) return;

    const selectedApp = submissionQuestions.find(
      (submissionQuestion) => submissionQuestion.questionId === questionId,
    )?.appName;

    setPreviewQuestion({
      ...loadedQuestion,
      app: loadedQuestion.app,
    });
  };

  return (
    <QuizPreviewModal
      isOpen
      onClose={onClose}
      title={quiz?.title ?? question?.questionName}
      subtitle={quiz?.description}
      fullScreenContent={previewQuestion ? (
        <QuizTemplateQuestionPreview
          question={{
            questionId: Number(previewQuestion.id),
            questionName: previewQuestion.questionName,
            isPhishing: previewQuestion.isPhishing,
            language: previewQuestion.language,
            appName: previewQuestion.app,
            appType: previewQuestion.appType,
            content: previewQuestion.content,
            explanations: previewQuestion.explanations,
          }}
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
          onBack={() => {
            closePreviewQuestion();
            setPreviewQuestion(null);
          }}
          onClose={onClose}
        />
      ) : undefined}
      actions={(
        <>
          {isQuiz && (
            <Button
              text={t("quiz_library.preview.preview_full_quiz")}
              type="outline"
              leftIcon={(
                <IoEyeSharp size={22} color={defaultTheme.colors.dark.darkGrey} />
              )}
              onClick={() => setIsFullQuizPreview((current) => !current)}
            />
          )}

          {isQuestion && (
            <Button
              text={t(
                showExplanations
                  ? "preview.hide_explanations"
                  : "preview.show_explanations",
              )}
              type="primary"
              color={defaultTheme.colors.blue7}
              onClick={() => setShowExplanations((current) => !current)}
            />
          )}
        </>
      )}
      details={quiz ? (
        <QuizSubmissionPreviewDetailsCard
          languages={quiz.langTags.map((language) => language.name)}
          tags={quiz.tags ?? []}
          status={quiz.status}
          dateSubmitted={quiz.dateSubmitted}
          locale={i18n.language}
        />
      ) : question ? (
        <QuestionSubmissionPreviewDetailsCard
          language={question.language}
          tags={question.tags}
          isPhishing={question.isPhishing}
          app={question.app}
          dateSubmitted={question.dateSubmitted}
          locale={i18n.language}
        />
      ) : null}
    >

      <PreviewArea>
        {quiz ? (
          <QuizPreviewQuestionsTable
            questions={submissionQuestions}
            onPreviewQuestion={openSingleQuestionPreview}
            onSelectApp={updateQuestionApp}
          />
        ) : (
          <>
            {showExplanations && <ExplanationOverlay />}
            <PreviewAppFrame
              $isFullWidth={isMessagingNotPhoneApp(question.app)}
              $isPhoneFrame={isMessagingPhoneApp(question.app)}
            >
              <AppLayout
                appName={question.app}
                content={question.content}
                explanations={question.explanations}
                explanationNumber={0}
                showExplanations={showExplanations}
              />
            </PreviewAppFrame>
          </>
        )}
      </PreviewArea>
    </QuizPreviewModal>
  );
};

const PreviewArea = styled.div`
  position: relative;
  margin-top: 16px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
`;

const PreviewAppFrame = styled.div<{
  $isFullWidth: boolean;
  $isPhoneFrame: boolean;
}>`
  position: relative;
  width: ${(props) => (props.$isFullWidth ? "100%" : "fit-content")};
  max-width: 100%;
  height: ${(props) => (props.$isPhoneFrame ? "80vh" : "68vh")};
  min-height: 620px;
  max-height: ${(props) => (props.$isPhoneFrame ? "none" : "780px")};
`;
const ExplanationOverlay = styled.div`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: rgba(0, 0, 0, 0.45);
  pointer-events: none;
`;
