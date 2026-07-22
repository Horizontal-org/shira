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
import { FullQuizTemplatePreview } from "./components/FullQuizTemplatePreview"
import { QuizPreviewDetailsCard } from "./components/QuizPreviewDetailsCard"
import { QuizPreviewQuestionsTable } from "./components/QuizPreviewQuestionsTable"
import { QuizTemplateQuestionPreview } from "./components/QuizTemplateQuestionPreview"
import { useQuizTemplateQuestions } from "./useQuizTemplateQuestions"
import { QuizPreviewModal } from "../QuizPreviewModal"

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
    previewQuestion,
    openPreviewQuestion,
    closePreviewQuestion,
    updateQuestionApp,
  } = useQuizTemplateQuestions(quiz, isOpen)
  const [fullPreviewQuestionId, setFullPreviewQuestionId] = useState<number | null>(null)

  useEffect(() => {
    if (!isOpen || !quiz) {
      setFullPreviewQuestionId(null)
    }
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
  const fullPreviewQuestion =
    questions.find((question) => question.questionId === fullPreviewQuestionId) ?? null

  const openSingleQuestionPreview = (questionId: number) => {
    setFullPreviewQuestionId(null)
    openPreviewQuestion(questionId)
  }

  const openFullQuizPreview = (questionId: number) => {
    closePreviewQuestion()
    setFullPreviewQuestionId(questionId)
  }

  const closeFullQuizPreview = () => {
    setFullPreviewQuestionId(null)
  }

  return (
    <QuizPreviewModal
      isOpen={isOpen}
      onClose={onClose}
      title={quiz.title}
      subtitle={t("quiz_library.preview.subtitle")}
      fullScreenContent={
        fullPreviewQuestion ? (
          <FullQuizTemplatePreview
            quiz={quiz}
            questions={questions}
            question={fullPreviewQuestion}
            onBack={closeFullQuizPreview}
            onClose={onClose}
            onSelectQuestion={setFullPreviewQuestionId}
            disableUseTemplateButton={disableUseTemplateButton}
            onUseTemplate={() => onUseTemplate(questions)}
          />
        ) : previewQuestion ? (
          <QuizTemplateQuestionPreview
            question={previewQuestion}
            onBack={closePreviewQuestion}
            onClose={onClose}
          />
        ) : undefined
      }
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
        />
      )}
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
        />
      </QuestionsSection>
    </QuizPreviewModal>
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
`

const ActionsDivider = styled.div`
  width: 1px;
  height: 36px;
  background: ${defaultTheme.colors.dark.mediumGrey};
`

const QuestionsSection = styled.div`
  margin-top: 16px;
`

const QuestionsErrorText = styled(Body1)`
  margin: 12px 0 0;
  color: ${defaultTheme.colors.error7};
`
