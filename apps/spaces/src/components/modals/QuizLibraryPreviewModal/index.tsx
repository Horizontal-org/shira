import { Body1, Button, H2, defaultTheme, styled } from "@shira/ui";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCirclePlus } from "react-icons/fa6";
import { FiX } from "react-icons/fi";
import { getQuizTemplate, LibraryQuizDto, LibraryQuizQuestionDto } from "../../../fetch/quiz_library";
import { QuizPreviewDetailsCard } from "./components/QuizPreviewDetailsCard";
import { PreviewQuestionRow, QuizPreviewQuestionsTable } from "./components/QuizPreviewQuestionsTable";
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

const getTextValue = (...values: any[]) => {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }

    if (value && typeof value === "object") {
      if (typeof value.name === "string" && value.name.trim()) {
        return value.name.trim();
      }

      if (typeof value.title === "string" && value.title.trim()) {
        return value.title.trim();
      }

      if (typeof value.label === "string" && value.label.trim()) {
        return value.label.trim();
      }
    }
  }

  return "";
};

const normalizeQuestionRows = (
  questions: LibraryQuizQuestionDto[] | undefined,
  phishingLabel: string,
  legitimateLabel: string,
): PreviewQuestionRow[] => {
  if (!Array.isArray(questions)) {
    return [];
  }

  return questions.map((question, index) => {
    const typeText = getTextValue(question?.type);
    const normalizedTypeText = typeText.toLowerCase();

    const isPhishing = typeof question?.isPhishing === "boolean"
      ? question.isPhishing
      : normalizedTypeText.includes("phishing")
        ? true
        : normalizedTypeText.includes("legitimate")
          ? false
          : null;

    return {
      id: String(question?.id ?? index + 1),
      name: getTextValue(question?.name, question?.title, question?.questionName, (question as any)?.question?.name) || `Question ${index + 1}`,
      isPhishing,
      typeLabel: typeText || (isPhishing === true ? phishingLabel : isPhishing === false ? legitimateLabel : ""),
      language: getTextValue(question?.language, question?.languageName, (question as any)?.question?.language),
      app: getTextValue(question?.app, question?.appName, (question as any)?.question?.app),
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
  const [resolvedQuiz, setResolvedQuiz] = useState<LibraryQuizDto | null>(quiz);

  const activeQuiz = resolvedQuiz
    && quiz
    && resolvedQuiz.title === quiz.title
    && resolvedQuiz.createdAt === quiz.createdAt
    ? resolvedQuiz : quiz;

  useEffect(() => {
    if (!isOpen || !quiz) {
      return undefined;
    }

    setResolvedQuiz(quiz);

    if (!quiz.id) {
      return undefined;
    }

    let alive = true;

    void (async () => {
      const detailedQuiz = await getQuizTemplate(quiz.id);

      if (!alive || !detailedQuiz) {
        return;
      }

      setResolvedQuiz({
        ...quiz,
        ...detailedQuiz,
      });
    })();

    return () => {
      alive = false;
    };
  }, [isOpen, quiz, setResolvedQuiz]);

  const questions = useMemo(
    () => normalizeQuestionRows(
      activeQuiz?.questions,
      t("question_library.columns.type.phishing"),
      t("question_library.columns.type.legitimate"),
    ),
    [activeQuiz, t],
  );

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    document.body.style.overflow = "hidden";

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

  if (!isOpen || !quiz || !activeQuiz) {
    return null;
  }

  const creator = activeQuiz.creator || activeQuiz.author;
  const createdAt = formatLongDate(activeQuiz.createdAt);
  const languages = Array.isArray(activeQuiz.languages)
    ? activeQuiz.languages.map((value: any) => getTextValue(value)).filter(Boolean)
    : [];
  const tags = Array.isArray(activeQuiz.tags)
    ? activeQuiz.tags.map((value: any) => getTextValue(value)).filter(Boolean)
    : [];

  return (
    <Overlay onClick={onClose}>
      <Dialog onClick={(event) => event.stopPropagation()}>
        <TopBar>
          <CloseButton type="button" onClick={onClose}>
            <FiX size={22} />
          </CloseButton>

          <ActionsRow>

            <Button
              text={t("quiz_library.preview.preview_full_quiz")}
              type="outline"
              leftIcon={<IoEyeSharp size={20} color={defaultTheme.colors.dark.darkGrey} />}
              onClick={() => {
                document.getElementById("quiz-library-preview-questions")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
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
          <Title id="quiz-library-preview-title">{activeQuiz.title}</Title>
          <Subtitle>{t("quiz_library.preview.subtitle")}</Subtitle>

          <QuizPreviewDetailsCard
            languages={languages}
            tags={tags}
            creator={creator}
            createdAt={createdAt}
          />

          <QuestionsSection id="quiz-library-preview-questions">
            <QuizPreviewQuestionsTable questions={questions} />
          </QuestionsSection>

        </Content>
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

const CloseButton = styled.button`
  all: unset;
  width: 40px;
  height: 40px;
  cursor: pointer;
  color: ${defaultTheme.colors.dark.darkGrey};
  display: inline-flex;
  align-items: center;
  justify-content: center;
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
