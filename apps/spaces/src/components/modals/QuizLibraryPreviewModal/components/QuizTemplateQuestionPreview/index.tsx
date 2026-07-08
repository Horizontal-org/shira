import {
  Body1,
  Button,
  CloseButton,
  defaultTheme,
  styled,
} from "@horizontal-org/shira-ui"
import { FunctionComponent } from "react"
import { useTranslation } from "react-i18next"
import type { LibraryQuizQuestionTemplateDto } from "../../../../../fetch/quiz_templates"
import { AppLayout } from "../../../../QuestionPreview/AppLayout"
import {
  isMessagingNotPhoneApp,
  isMessagingPhoneApp
} from "../../../../../utils/appNames"
import {
  ExplanationPreviewControls,
  useExplanationPreviewControls,
} from "../ExplanationPreviewControls"

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

  const {
    activeExplanationIndex,
    explanationNumber,
    explanations,
    nextExplanation,
    previousExplanation,
    showExplanations,
    toggleExplanations,
  } = useExplanationPreviewControls({
    content: question.content,
    explanations: question.explanations,
    resetKey: question.questionId,
  })

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

          <ExplanationActions>
            <ExplanationPreviewControls
              explanationNumber={explanationNumber}
              explanations={explanations}
              showExplanations={showExplanations}
              onToggleExplanations={toggleExplanations}
              onPreviousExplanation={previousExplanation}
              onNextExplanation={nextExplanation}
            />
          </ExplanationActions>
        </PreviewActions>
      </PreviewHeader>

      <PreviewCanvasWrapper>
        <PreviewCanvas>
          {showExplanations && <QuizPreviewOverlay />}

          <PreviewAppFrame
            key={`${question.questionId}-${question.appName}`}
            $isFullWidth={isMessagingNotPhoneApp(question.appName)}
            $isPhoneFrame={isMessagingPhoneApp(question.appName)}
          >
            <AppLayout
              appName={question.appName ?? ""}
              content={question.content}
              showExplanations={showExplanations}
              explanations={explanations}
              explanationNumber={activeExplanationIndex}
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

const PreviewAppFrame = styled.div<{
  $isFullWidth: boolean
  $isPhoneFrame: boolean
}>`
  position: relative;
  width: ${(props) => (props.$isFullWidth ? "100%" : "fit-content")};
  max-width: 100%;
  height: ${(props) => (props.$isPhoneFrame ? "80vh" : "68vh")};
  min-height: 620px;
  max-height: ${(props) => (props.$isPhoneFrame ? "none" : "780px")};
`

const QuizPreviewOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.45);
  pointer-events: none;
`
