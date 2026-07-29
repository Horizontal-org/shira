import {
  Body1,
  Button,
  defaultTheme,
  styled,
} from "@horizontal-org/shira-ui"
import { FunctionComponent, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { FaCirclePlus } from "react-icons/fa6"
import { IoEyeSharp } from "react-icons/io5"
import {
  type LibraryQuizDto,
  type LibraryQuizQuestionTemplateDto,
} from "../../../fetch/quiz_templates"
import {
  FullQuizPreviewScreen,
  type PreviewQuestion,
} from "../PreviewQuizScreen/FullQuizPreviewScreen"
import { QuizPreviewDetailsCard } from "./components/QuizPreviewDetailsCard"
import { QuizPreviewQuestionsTable } from "./components/QuizPreviewQuestionsTable"
import { useQuizTemplateQuestions } from "./useQuizTemplateQuestions"
import { PreviewModal, PreviewQuizScreen } from "../PreviewQuizScreen"
import { PreviewQuestionScreen } from "../PreviewQuizScreen/PreviewQuestionScreen"

type Props = {
  quiz: LibraryQuizDto | null
  isOpen: boolean
  onClose: () => void
  onUseTemplate: (questions?: LibraryQuizQuestionTemplateDto[]) => void
}

const formatLongDate = (value: string, locale: string) => {
  return new Date(value).toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export const QuizLibraryPreviewModal: FunctionComponent<Props> = ({
  quiz,
  isOpen,
  onClose,
  onUseTemplate,
}) => {
  const { t, i18n } = useTranslation()
  const {
    questions,
    hasLoadedQuestions,
    isLoadingQuestions,
    hasQuestionLoadError,
    updateQuestionApp,
  } = useQuizTemplateQuestions(quiz, isOpen)
  const [previewQuestionId, setPreviewQuestionId] = useState<number | null>(null)
  const [fullPreviewQuestionId, setFullPreviewQuestionId] = useState<number | null>(null)

  useEffect(() => {
    setPreviewQuestionId(null)
    setFullPreviewQuestionId(null)
  }, [isOpen, quiz])

  if (!isOpen || !quiz) {
    return null
  }

  const languages = quiz.languages ?? []
  const tags = quiz.tags ?? []
  const disableUseTemplateButton = (
    isLoadingQuestions
    || hasQuestionLoadError
    || !hasLoadedQuestions
    || questions.length === 0
  )
  const firstQuestion = questions[0]
  const previewQuestion =
    questions.find((question) => question.questionId === previewQuestionId) ?? null
  const previewQuestions: PreviewQuestion[] = questions.map((question) => ({
    id: question.questionId,
    name: question.questionName,
    isPhishing: question.isPhishing,
    app: question.appName,
    appType: question.appType,
    content: question.content,
    explanations: question.explanations,
  }))
  const fullQuizPreview =
    previewQuestions.find((question) => question.id === fullPreviewQuestionId) ?? null

  const openSingleQuestionPreview = (questionId: number) => {
    setFullPreviewQuestionId(null)
    setPreviewQuestionId(questionId)
  }

  const openFullQuizPreview = (questionId: number) => {
    setPreviewQuestionId(null)
    setFullPreviewQuestionId(questionId)
  }

  const closeFullQuizPreview = () => {
    setFullPreviewQuestionId(null)
  }

  return (
    <PreviewModal isOpen={isOpen} onClose={onClose}>
      {fullQuizPreview ? (
        <FullQuizPreviewScreen
          quiz={{ title: quiz.title }}
          questions={previewQuestions}
          question={fullQuizPreview}
          onBack={closeFullQuizPreview}
          onClose={onClose}
          onSelectQuestion={setFullPreviewQuestionId}
          actions={(
            <Button
              text={t("quiz_library.use_template")}
              type="primary"
              color={defaultTheme.colors.green7}
              leftIcon={<FaCirclePlus size={16} />}
              disabled={disableUseTemplateButton}
              onClick={() => onUseTemplate(questions)}
            />
          )}
        />
      ) : previewQuestion ? (
        <PreviewQuestionScreen
          question={previewQuestion}
          headerLabel={t("create_question.tabs.preview.aria_label")}
          onBack={() => setPreviewQuestionId(null)}
          onClose={onClose}
        />
      ) : (
        <PreviewQuizScreen
          onClose={onClose}
          title={quiz.title}
          subtitle={t("quiz_library.preview.subtitle")}
          actions={(
            <ActionsRow>
              <Button
                text={t("quiz_library.preview.preview_full_quiz")}
                type="outline"
                leftIcon={<IoEyeSharp size={22} color={defaultTheme.colors.dark.darkGrey} />}
                disabled={!firstQuestion}
                onClick={() => {
                  if (firstQuestion) {
                    openFullQuizPreview(firstQuestion.questionId)
                  }
                }}
              />

              <ActionsDivider />

              <Button
                text={t("quiz_library.preview.use_template")}
                type="primary"
                color={defaultTheme.colors.green7}
                leftIcon={<FaCirclePlus size={17} />}
                disabled={disableUseTemplateButton}
                onClick={() => onUseTemplate(questions)}
              />
            </ActionsRow>
          )}
          details={(
            <QuizPreviewDetailsCard
              languages={languages}
              tags={tags}
              creator={quiz.author}
              createdAt={formatLongDate(quiz.createdAt, i18n.language)}
            />)}
        >
          <QuestionsSection>
            {hasQuestionLoadError && (
              <QuestionsErrorText>{t("error_messages.something_went_wrong")}</QuestionsErrorText>
            )}

            <QuizPreviewQuestionsTable
              questions={questions}
              loading={isLoadingQuestions}
              onPreviewQuestion={openSingleQuestionPreview}
              onSelectApp={updateQuestionApp}
              allowAppSelection={true}
            />
          </QuestionsSection>
        </PreviewQuizScreen>
      )}
    </PreviewModal>
  )
}

const ActionsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
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

const QuestionsSection = styled.div`
  margin-top: 16px;
`;

const QuestionsErrorText = styled(Body1)`
  margin: 12px 0 0;
  color: ${defaultTheme.colors.error7};
`;
