import {
  Body1,
  Button,
  CloseButton,
  defaultTheme,
  styled,
} from "@horizontal-org/shira-ui"
import { FunctionComponent, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { MdBlock } from "react-icons/md"
import type { LibraryQuizQuestionTemplateDto } from "../../../../../fetch/quiz_templates"
import parseHtml from "../../../../../utils/parseHtml"
import { AppLayout } from "../../../../QuestionPreview/AppLayout"

type Props = {
  question: LibraryQuizQuestionTemplateDto
  onBack: () => void
  onClose: () => void
}

export const QuizTemplateQuestionPreview: FunctionComponent<Props> = ({
  question,
  onBack,
  onClose,
}) => {
  const { t } = useTranslation()
  const [explanationNumber, setExplanationNumber] = useState(0)
  const [showExplanations, setShowExplanations] = useState(false)

  const explanations = useMemo(
    () => parseHtml(question.content).parseExplanations(question.explanations),
    [question.content, question.explanations],
  )

  useEffect(() => {
    setExplanationNumber(0)
    setShowExplanations(false)
  }, [question.questionId])

  const activeExplanation = explanations[explanationNumber]
    ? Number(explanations[explanationNumber].index)
    : 0

  return (
    <QuestionPreviewContainer>
      <PreviewHeader>
        <PreviewHeaderStart>
          <CloseButton
            aria-label={t("buttons.close")}
            iconSize={22}
            onClick={onClose}
          />
          <Body1>{t("create_question.tabs.preview.aria_label")}</Body1>
        </PreviewHeaderStart>

        <PreviewActions>
          <Button
            text={t("quiz_library.preview.back_to_quiz_template")}
            type="outline"
            onClick={onBack}
          />

          <ActionsDivider />

          {explanations.length > 0 ? (
            <ExplanationActions>
              <ExplanationOutlineButton
                text={showExplanations
                  ? t("create_question.tabs.preview.hide_explanations")
                  : t("create_question.tabs.preview.show_explanations")}
                type="outline"
                onClick={() => {
                  if (showExplanations) {
                    setExplanationNumber(0)
                  }

                  setShowExplanations((current) => !current)
                }}
              />

              {showExplanations && explanations.length > 1 && explanationNumber > 0 && (
                <ExplanationPrimaryButton
                  text={t("create_question.tabs.preview.previous_explanation")}
                  type="primary"
                  onClick={() => {
                    setExplanationNumber((current) => current - 1)
                  }}
                />
              )}

              {showExplanations && explanations.length > 1 && explanationNumber < explanations.length - 1 && (
                <ExplanationPrimaryButton
                  text={t("create_question.tabs.preview.next_explanation")}
                  type="primary"
                  onClick={() => {
                    setExplanationNumber((current) => current + 1)
                  }}
                />
              )}
            </ExplanationActions>
          ) : (
            <NoExplanationsNotice>
              <MdBlock />
              {t("create_question.tabs.preview.no_explanations")}
            </NoExplanationsNotice>
          )}
        </PreviewActions>
      </PreviewHeader>

      <PreviewCanvasWrapper>
        <PreviewCanvas>
          {showExplanations && <QuizPreviewOverlay />}

          <PreviewAppFrame key={`${question.questionId}-${question.appName ?? ""}`}>
            <AppLayout
              appName={question.appName ?? ""}
              content={question.content}
              showExplanations={showExplanations}
              explanations={explanations}
              explanationNumber={activeExplanation}
            />
          </PreviewAppFrame>
        </PreviewCanvas>
      </PreviewCanvasWrapper>
    </QuestionPreviewContainer>
  )
}

const QuestionPreviewContainer = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  flex-direction: column;
`

const PreviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 20px 28px 0;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
    padding: 20px 20px 0;
  }
`

const PreviewHeaderStart = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const PreviewActions = styled.div`
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

const NoExplanationsNotice = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: ${defaultTheme.colors.light.paleGrey};
  border-radius: 999px;
  color: ${defaultTheme.colors.dark.darkGrey};
`

const ExplanationActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: nowrap;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-wrap: wrap;
    justify-content: flex-end;
  }
`

const ExplanationOutlineButton = styled(Button)`
  justify-content: center;
`

const ExplanationPrimaryButton = styled(Button)`
  justify-content: center;
  background: ${defaultTheme.colors.blue7};
  border-color: ${defaultTheme.colors.blue7};

  &:hover {
    background: ${defaultTheme.colors.blue8};
    border-color: ${defaultTheme.colors.blue8};
  }

  &:focus {
    background: ${defaultTheme.colors.blue8};
    border-color: ${defaultTheme.colors.blue4};
  }
`

const PreviewCanvasWrapper = styled.div`
  padding: 20px 28px 28px;
  flex: 1;
  min-height: 0;
  overflow: auto;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding: 20px;
  }
`

const PreviewCanvas = styled.div`
  position: relative;
  min-height: 680px;
  border-radius: 4px;
  overflow: auto;
  display: flex;
  justify-content: center;
  padding: 24px;
  background: ${defaultTheme.colors.light.paleGreen};
`

const PreviewAppFrame = styled.div`
  position: relative;
  z-index: 1;
  width: fit-content;
  max-width: 100%;
`

const QuizPreviewOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
`
