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
import { FunctionComponent, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { FaCircleCheck, FaCirclePlus } from "react-icons/fa6"
import { MdBlock, MdOutlinePhishing } from "react-icons/md"
import type {
  LibraryQuizDto,
  LibraryQuizQuestionTemplateDto,
} from "../../../../../fetch/quiz_templates"
import { appIcons, appTypesIcons } from "../../../../../utils/appIcons"
import { getAppsByType, normalizePreviewAppName } from "../../../../../utils/appNames"
import parseHtml from "../../../../../utils/parseHtml"
import { AppLayout } from "../../../../QuestionPreview/AppLayout"

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
  const [explanationNumber, setExplanationNumber] = useState(0)
  const [showExplanations, setShowExplanations] = useState(false)

  const explanations = useMemo(
    () => parseHtml(question.content).parseExplanations(question.explanations),
    [question.content, question.explanations],
  )
  const resolvedAppName = question.appName ?? getAppsByType(question.appType)[0]?.name ?? ""

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
          <Body1>{t("quiz_library.preview.preview_full_quiz")}</Body1>
        </PreviewHeaderStart>

        <HeaderActions>
          <Button
            text={t("quiz_library.preview.back_to_quiz_template")}
            type="outline"
            onClick={onBack}
          />

          <Button
            text={t("dashboard.use_template_button")}
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
            {explanations.length > 0 ? (
              <>
                <Button
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
                  <Button
                    text={t("create_question.tabs.preview.previous_explanation")}
                    type="primary"
                    onClick={() => {
                      setExplanationNumber((current) => current - 1)
                    }}
                  />
                )}

                {showExplanations && explanations.length > 1 && explanationNumber < explanations.length - 1 && (
                  <Button
                    text={t("create_question.tabs.preview.next_explanation")}
                    type="primary"
                    onClick={() => {
                      setExplanationNumber((current) => current + 1)
                    }}
                  />
                )}
              </>
            ) : (
              <NoExplanationsNotice>
                <MdBlock />
                {t("create_question.tabs.preview.no_explanations")}
              </NoExplanationsNotice>
            )}
          </PreviewControls>
        </PreviewTopRow>

        <PreviewLayout>
          <QuizQuestionContainer>
            {questions.map((railQuestion, index) => {
              const isActive = railQuestion.questionId === question.questionId
              const railAppName = railQuestion.appName ?? getAppsByType(railQuestion.appType)[0]?.name ?? ""
              const appLabel = normalizePreviewAppName(railAppName)
              const appIcon = appLabel
                ? appIcons[appLabel.toLowerCase()]
                : appTypesIcons[railQuestion.appType]

              return (
                <SelectableQuestionItem
                  key={railQuestion.questionId}
                  type="button"
                  $isActive={isActive}
                  onClick={() => {
                    onSelectQuestion(railQuestion.questionId)
                  }}
                >
                  <QuizQuestionNumber $isActive={isActive}>
                    {index + 1}
                  </QuizQuestionNumber>

                  <QuizQuestionDetails>
                    <Body2SemiBoldGrey>{railQuestion.questionName}</Body2SemiBoldGrey>

                    <QuestionInfoPanel>
                      <TypeChip $isPhishing={railQuestion.isPhishing}>
                        {railQuestion.isPhishing ? (
                          <MdOutlinePhishing size={14} />
                        ) : (
                          <FaCircleCheck size={14} />
                        )}
                        <ChipText>
                          {railQuestion.isPhishing
                            ? t("question_library.columns.type.phishing")
                            : t("question_library.columns.type.legitimate")}
                        </ChipText>
                      </TypeChip>

                      {(appLabel || railQuestion.appType) && (
                        <AppChip>
                          {appIcon}
                          <ChipText>{appLabel || railQuestion.appType}</ChipText>
                        </AppChip>
                      )}
                    </QuestionInfoPanel>
                  </QuizQuestionDetails>
                </SelectableQuestionItem>
              )
            })}
          </QuizQuestionContainer>

          <PreviewStage>
            <PreviewStageBackdrop />

            {showExplanations && <QuizPreviewOverlay />}

            <PreviewAppFrame key={`${question.questionId}-${resolvedAppName}`}>
              <AppLayout
                appName={resolvedAppName}
                content={question.content}
                showExplanations={showExplanations}
                explanations={explanations}
                explanationNumber={activeExplanation}
              />
            </PreviewAppFrame>
          </PreviewStage>
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

const NoExplanationsNotice = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: ${defaultTheme.colors.light.paleGrey};
  border-radius: 999px;
  color: ${defaultTheme.colors.dark.darkGrey};
`

const PreviewLayout = styled.div`
  display: grid;
  grid-template-columns: 394px minmax(0, 1fr);
  gap: 32px;
  min-height: 0;
  flex: 1;

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    grid-template-columns: 320px minmax(0, 1fr);
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
`

const SelectableQuestionItem = styled.button<{
  $isActive: boolean
}>`
  width: 100%;
  border: 1.5px solid ${(props) => (
    props.$isActive ? props.theme.colors.green7 : "rgba(172, 173, 174, 0.45)"
  )};
  border-radius: 28px;
  background: ${(props) => (
    props.$isActive ? "#F4F6E8" : props.theme.colors.light.white
  )};
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 18px;
  text-align: left;
  cursor: pointer;

  & + & {
    margin-top: 16px;
  }
`

const QuizQuestionNumber = styled(Body1SemiBold)<{ $isActive: boolean }>`
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

const PreviewStage = styled.div`
  position: relative;
  min-height: 0;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: #F4F5DE;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    min-height: 720px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    min-height: 620px;
  }
`

const PreviewStageBackdrop = styled.div`
  position: absolute;
  inset: 0;
  background: ${(props) => props.theme.colors.light.paleGreen};
`

const PreviewAppFrame = styled.div`
  position: relative;
  z-index: 1;
  width: min(100%, 560px);
  height: 100%;
  min-height: 680px;
  overflow: hidden;
  background: transparent;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 100%;
    min-height: 620px;
  }
`

const QuizPreviewOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  background: rgba(0, 0, 0, 0.12);
  pointer-events: none;
`
