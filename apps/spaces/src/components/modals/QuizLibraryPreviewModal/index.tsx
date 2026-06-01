import { Body1, Button, CloseButton, H2, defaultTheme, styled } from "@horizontal-org/shira-ui";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCirclePlus } from "react-icons/fa6";
import {
  getQuizTemplateQuestions,
  type LibraryQuizDto,
  type LibraryQuizQuestionTemplateDto,
} from "../../../fetch/quiz_templates";
import { QuizPreviewDetailsCard } from "./components/QuizPreviewDetailsCard";
import { PreviewQuestionRow, QuizPreviewQuestionsTable } from "./components/QuizPreviewQuestionsTable";
import { QuizTemplateQuestionPreview } from "./components/QuizTemplateQuestionPreview";
import { IoEyeSharp } from "react-icons/io5";

type Props = {
  quiz: LibraryQuizDto | null;
  isOpen: boolean;
  onClose: () => void;
  onUseTemplate: () => void;
};

const formatLongDate = (value: string) => {
  const parsedDate = new Date(value);

  return parsedDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const normalizeQuestionRows = (
  questions: LibraryQuizQuestionTemplateDto[],
): PreviewQuestionRow[] => {
  return questions.map((question) => {
    const isPhishing = question.isPhishing ?? question.type.toLowerCase() === "phishing";

    return {
      id: String(question.questionId),
      name: question.questionName,
      isPhishing,
      typeLabel: isPhishing ? "phishing" : "legitimate",
      language: question.language,
      app: question.app,
      content: question.content,
      explanations: question.explanations,
    };
  });
};

export const QuizLibraryPreviewModal: FunctionComponent<Props> = ({
  quiz,
  isOpen,
  onClose,
  onUseTemplate,
}) => {
  const { t } = useTranslation();
  const [questionTemplates, setQuestionTemplates] = useState<LibraryQuizQuestionTemplateDto[]>([]);
  const [previewQuestionId, setPreviewQuestionId] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !quiz) {
      setQuestionTemplates([]);
      setPreviewQuestionId(null);
      return;
    }

    setQuestionTemplates([]);

    if (!quiz.id) {
      return;
    }

    let isCancelled = false;

    const loadQuestionTemplates = async () => {
      const questions = await getQuizTemplateQuestions(quiz.id);

      if (isCancelled) {
        return;
      }

      setQuestionTemplates(questions);
    };

    loadQuestionTemplates();

    return () => {
      isCancelled = true;
    };
  }, [isOpen, quiz]);

  const questions = useMemo(
    () => normalizeQuestionRows(questionTemplates),
    [questionTemplates],
  );

  const previewQuestion = useMemo(
    () => questions.find((question) => question.id === previewQuestionId) ?? null,
    [previewQuestionId, questions],
  );

  const firstPreviewableQuestion = useMemo(
    () => questions.find((question) => question.content?.trim()),
    [questions],
  );

  useEffect(() => {
    if (!previewQuestionId) {
      return;
    }

    if (!questions.some((question) => question.id === previewQuestionId)) {
      setPreviewQuestionId(null);
    }
  }, [previewQuestionId, questions]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    // Lock page scroll while the modal is open
    document.body.style.overflow = "hidden";

    // Close modal with Escape key
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !quiz) {
    return null;
  }

  const languages = quiz.languages ?? [];
  const tags = quiz.tags ?? [];

  return (
    <Overlay onClick={onClose}>
      <Dialog onClick={(event) => event.stopPropagation()}>
        {previewQuestion ? (
          <QuizTemplateQuestionPreview
            question={previewQuestion}
            onBack={() => { setPreviewQuestionId(null); }}
            onClose={onClose}
          />
        ) : (
          <>
            <TopBar>
              <CloseButton aria-label={t("buttons.close")} iconSize={22} onClick={onClose} />

              <ActionsRow>
                <Button
                  text={t("quiz_library.preview.preview_full_quiz")}
                  type="outline"
                  leftIcon={<IoEyeSharp size={16} color={defaultTheme.colors.dark.darkGrey} />}
                  disabled={!firstPreviewableQuestion}
                  onClick={() => {
                    if (firstPreviewableQuestion) {
                      setPreviewQuestionId(firstPreviewableQuestion.id);
                    }
                  }}
                />

                <ActionsDivider />

                <Button
                  text={t("dashboard.use_template_button")}
                  type="primary"
                  color={defaultTheme.colors.green7}
                  leftIcon={<FaCirclePlus size={16} />}
                  onClick={onUseTemplate}
                />
              </ActionsRow>
            </TopBar>

            <Content>
              <Title id="quiz-library-preview-title">{quiz.title}</Title>
              <Subtitle>{t("quiz_library.preview.subtitle")}</Subtitle>

              <QuizPreviewDetailsCard
                languages={languages}
                tags={tags}
                creator={quiz.author}
                createdAt={formatLongDate(quiz.createdAt)}
              />

              <QuestionsSection id="quiz-library-preview-questions">
                <QuizPreviewQuestionsTable
                  questions={questions}
                  onPreviewQuestion={(question) => { setPreviewQuestionId(question.id); }}
                />
              </QuestionsSection>
            </Content>
          </>
        )}
      </Dialog>
    </Overlay >
  );
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
  padding: 24px;
  z-index: 1000;
`;

const Dialog = styled.div`
  width: min(1224px, 100%);
  max-height: calc(100vh - 48px);
  background: ${defaultTheme.colors.light.white};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 20px 28px 0;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
    padding: 20px 20px 0;
  }
`;

const ActionsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    justify-content: flex-end;
    flex-wrap: wrap;
  }
`;

const ActionsDivider = styled.div`
  width: 1px;
  height: 36px;
  background: ${defaultTheme.colors.dark.mediumGrey};
`;

const Content = styled.div`
  padding: 32px 64px 32px;
  overflow-y: auto;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 24px 20px 24px;
  }
`;

const Title = styled(H2)`
  margin: 0;
  color: ${defaultTheme.colors.dark.black};
`;

const Subtitle = styled(Body1)`
  margin: 16px 0 0;
  color: ${defaultTheme.colors.dark.darkGrey};
`;

const QuestionsSection = styled.div`
  margin-top: 16px;
`;
