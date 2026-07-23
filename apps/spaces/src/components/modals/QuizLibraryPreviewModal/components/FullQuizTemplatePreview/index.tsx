import {
  Body1,
  Body1SemiBold,
  Body2SemiBold,
  Body3,
  Button,
  CloseButton,
  defaultTheme,
  styled,
} from "@horizontal-org/shira-ui"
import { FunctionComponent } from "react"
import { useTranslation } from "react-i18next"
import { FaCircleCheck, FaCirclePlus } from "react-icons/fa6"
import { MdOutlinePhishing } from "react-icons/md"
import type {
  LibraryQuizDto,
  LibraryQuizQuestionTemplateDto,
} from "../../../../../fetch/quiz_templates"
import { appIcons, appTypesIcons } from "../../../../../utils/appIcons"
import {
  getAppsByType,
  isMessagingNotPhoneApp,
  isMessagingPhoneApp,
  normalizePreviewAppName,
} from "../../../../../utils/appNames"
import { AppLayout } from "../../../../QuestionPreview/AppLayout"
import {
  ExplanationPreviewControls,
  useExplanationPreviewControls,
} from "../../../PreviewModal/ExplanationPreviewControls"

type Props = {
  quiz: LibraryQuizDto
  questions: LibraryQuizQuestionTemplateDto[]
  question: LibraryQuizQuestionTemplateDto
  disableUseTemplateButton: boolean
  onBack: () => void
  onClose: () => void
  onSelectQuestion: (questionId: number) => void
  onUseTemplate: () => void
}

export const FullQuizTemplatePreview: FunctionComponent<Props> = ({
  quiz,
  questions,
  question,
  disableUseTemplateButton,
  onBack,
  onClose,
  onSelectQuestion,
  onUseTemplate,
}) => {
  const { t } = useTranslation()
  const resolvedAppName = question.appName ?? getAppsByType(question.appType)[0]?.name ?? ""

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
          <Body1>{t("quiz_library.preview.preview_full_quiz")}</Body1>
        </PreviewHeaderStart>

        <HeaderActions>
          <Button
            text={t("quiz_library.preview.back_to_quiz_template")}
            type="outline"
            onClick={onBack}
          />

          <Button
            text={t("quiz_library.use_template")}
            type="primary"
            color={defaultTheme.colors.green7}
            leftIcon={<FaCirclePlus size={16} />}
            disabled={disableUseTemplateButton}
            onClick={onUseTemplate}
          />
        </HeaderActions>
      </PreviewHeader>

      <PreviewBody>
        <PreviewTopRow>
          <PreviewTitle>{quiz.title}</PreviewTitle>

          <PreviewControls>
            <ExplanationPreviewControls
              explanationNumber={explanationNumber}
              explanations={explanations}
              showExplanations={showExplanations}
              onToggleExplanations={toggleExplanations}
              onPreviousExplanation={previousExplanation}
              onNextExplanation={nextExplanation}
            />
          </PreviewControls>
        </PreviewTopRow>

        <PreviewLayout>
          <QuizQuestionContainer>
            {questions.map((questionItem, index) => {
              const isActive = questionItem.questionId === question.questionId
              const questionAppName = questionItem.appName ?? getAppsByType(questionItem.appType)[0]?.name ?? ""
              const appLabel = normalizePreviewAppName(questionAppName)
              const appIcon = appLabel
                ? appIcons[appLabel.toLowerCase()]
                : appTypesIcons[questionItem.appType]

              return (
                <SelectableQuestionItem
                  key={questionItem.questionId}
                  type="button"
                  $isActive={isActive}
                  onClick={() => {
                    onSelectQuestion(questionItem.questionId)
                  }}
                >
                  <QuizQuestionNumber $isActive={isActive}>
                    {index + 1}
                  </QuizQuestionNumber>

                  <QuizQuestionDetails>
                    <Body2SemiBoldGrey>{questionItem.questionName}</Body2SemiBoldGrey>

                    <QuestionInfoPanel>
                      <TypeChip $isPhishing={questionItem.isPhishing}>
                        {questionItem.isPhishing ? (
                          <MdOutlinePhishing size={14} />
                        ) : (
                          <FaCircleCheck size={14} />
                        )}
                        <ChipText>
                          {questionItem.isPhishing
                            ? t("question_library.columns.type.phishing")
                            : t("question_library.columns.type.legitimate")}
                        </ChipText>
                      </TypeChip>

                      {(appLabel || questionItem.appType) && (
                        <AppChip>
                          {appIcon}
                          <ChipText>{appLabel || questionItem.appType}</ChipText>
                        </AppChip>
                      )}
                    </QuestionInfoPanel>
                  </QuizQuestionDetails>
                </SelectableQuestionItem>
              )
            })}
          </QuizQuestionContainer>

          <PreviewCanvasPanel>
            <PreviewCanvas>
              <PreviewStageBackdrop />

              {showExplanations && <QuizPreviewOverlay />}

              <PreviewAppFrame
                key={`${question.questionId}-${question.appName}`}
                $isFullWidth={isMessagingNotPhoneApp(resolvedAppName)}
                $isPhoneFrame={isMessagingPhoneApp(resolvedAppName)}
              >
                <AppLayout
                  appName={resolvedAppName}
                  content={question.content}
                  showExplanations={showExplanations}
                  explanations={explanations}
                  explanationNumber={activeExplanationIndex}
                />
              </PreviewAppFrame>
            </PreviewCanvas>
          </PreviewCanvasPanel>
        </PreviewLayout>
      </PreviewBody>
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
  padding: 26px 36px 0;

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

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
`

const PreviewBody = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  flex-direction: column;
  padding: 32px 36px 36px;
  overflow: hidden;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding: 20px;
    overflow: auto;
  }
`

const PreviewTopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`

const PreviewTitle = styled(Body1SemiBold)`
  margin: 0;
  flex: 1;
  min-width: 0;
  color: ${defaultTheme.colors.dark.black};
  font-size: 30px;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: 24px;
  }
`

const PreviewControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  flex-wrap: wrap;
  flex-shrink: 0;
`

const PreviewLayout = styled.div`
  display: grid;
  grid-template-columns: 344px minmax(0, 1fr);
  gap: 24px;
  min-height: 0;
  flex: 1;

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    grid-template-columns: 300px minmax(0, 1fr);
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`

const QuizQuestionContainer = styled.div`
  min-height: 0;
  overflow-y: auto;
  padding-right: 8px;
  padding-left: 8px;
  padding-bottom: 8px;
`

const PreviewCanvasPanel = styled.div`
  min-height: 0;
  overflow: auto;
`

const SelectableQuestionItem = styled.button<{
  $isActive: boolean
}>`
  appearance: none;
  width: 100%;
  border: 1px solid ${(props) => (
    props.$isActive ? props.theme.colors.green7 : props.theme.colors.dark.lightGrey
  )};
  border-radius: 28px;
  background: ${(props) => (
    props.$isActive ? props.theme.colors.light.paleGreen : props.theme.colors.light.white
  )};
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 18px;
  text-align: left;
  cursor: pointer;
  outline: none;

  &:hover {
    background: #FAFBF0;
  )};
  }

  &:focus-visible {
    border-width: 2px;
    border-color: ${(props) => (
    props.$isActive ? props.theme.colors.green7 : props.theme.colors.green4
  )};
  }

  & + & {
    margin-top: 16px;
  }
`

const QuizQuestionNumber = styled(Body1SemiBold) <{ $isActive: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: ${(props) => (
    props.$isActive ? props.theme.colors.green7 : props.theme.colors.light.paleGreen
  )};
  color: ${(props) => (
    props.$isActive ? props.theme.colors.light.white : props.theme.colors.green8
  )};
  line-height: 1;
`

const QuizQuestionDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
`

const Body2SemiBoldGrey = styled(Body2SemiBold)`
  color: ${(props) => props.theme.colors.dark.darkGrey};
`

const ChipText = styled(Body3)`
  margin: 0;
  line-height: 1.2;
`

const QuestionInfoPanel = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
`

const TypeChip = styled.span<{ $isPhishing: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-height: 24px;
  border-radius: 4px;
  padding: 2px 8px;
  background: ${(props) => (
    props.$isPhishing ? props.theme.colors.light.paleRed : props.theme.colors.light.paleGreen
  )};
  color: ${(props) => (
    props.$isPhishing ? props.theme.colors.error8 : props.theme.colors.green8
  )};
`

const AppChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-height: 24px;
  border: 1px solid rgba(172, 173, 174, 0.55);
  border-radius: 4px;
  padding: 2px 8px;
  color: ${(props) => props.theme.colors.dark.darkGrey};
  background: ${(props) => props.theme.colors.light.white};

  svg {
    flex-shrink: 0;
    transform: scale(0.9);
    transform-origin: center;
  }
`

const PreviewCanvas = styled.div`
  position: relative;
  border-radius: 4px;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 24px;
  background: ${defaultTheme.colors.light.paleGreen};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    min-height: 620px;
    padding: 20px;
  }
`

const PreviewStageBackdrop = styled.div`
  position: absolute;
  inset: 0;
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
  z-index: 2;
  background: rgba(0, 0, 0, 0.12);
  pointer-events: none;
`
