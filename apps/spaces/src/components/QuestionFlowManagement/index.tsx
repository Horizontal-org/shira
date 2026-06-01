import { FunctionComponent, useEffect, useState } from "react";
import { Breadcrumbs, styled, Body1 } from "@horizontal-org/shira-ui";
import { shallow } from "zustand/shallow";
import { useStore } from "../../store";
import { QuestionBasicInfo } from "../QuestionBasicInfo";
import { QuestionFlowHeader } from "../QuestionFlowHeader";
import { QuestionContent } from "../QuestionContent";
import { QuestionReview } from "../QuestionReview";
import { useNavigate } from "react-router-dom";
import { ExitQuestionHandleModal } from "../modals/ExitQuestionHandleModal";
import { NoExplanationsModal } from "../modals/NoExplanationsModal";
import { ActiveQuestion } from "../../store/types/active_question";
import { useTranslation } from "react-i18next";
import { MobileResponsivenessBanner } from "../MobileResponsivenessBanner";
import { isQuestionContentStepValid, isQuestionInfoStepValid } from "../../utils/active_question/validation";

interface Props {
  initialContent?: Object
  initialQuestion?: ActiveQuestion
  initialAppType?: string
  actionFeedback: string
  onSubmit: (question: ActiveQuestion) => void
}

export const QuestionFlowManagement: FunctionComponent<Props> = ({
  initialAppType = null,
  onSubmit,
  actionFeedback
}) => {

  const { t } = useTranslation();
  const navigate = useNavigate()

  const {
    apps,
    fetchApp,
    activeQuestion,
    updateActiveQuestion,
    updateActiveQuestionApp,
    clearActiveQuestion,
    clearExplanations,
    explanations
  } = useStore((state) => ({
    apps: state.apps,
    fetchApp: state.fetchApp,
    activeQuestion: state.activeQuestion,
    updateActiveQuestion: state.updateActiveQuestion,
    updateActiveQuestionApp: state.updateActiveQuestionApp,
    clearActiveQuestion: state.clearActiveQuestion,
    clearExplanations: state.clearExplanations,
    explanations: state.explanations
  }), shallow)

  useEffect(() => {
    fetchApp()

    return () => {
      clearExplanations()
      clearActiveQuestion()
    }
  }, [])

  const [step, handleStep] = useState(0)
  console.log(" 🚀 ~ question:", activeQuestion)
  console.log(" 🚀 ~ explanations:", explanations)

  const [isExitQuestionModalOpen, setIsExitQuestionModalOpen] = useState(false)
  const [noExplanationsModalOpen, setNoExplanationsModalOpen] = useState(false)

  const getStepValidation = () => {
    if (step === 0) {
      return isQuestionInfoStepValid(activeQuestion)
    }

    if (step === 1) {
      return isQuestionContentStepValid(activeQuestion)
    }

    return { isValid: true }
  }

  const stepValidation = getStepValidation()
  const nextTooltipLabel = stepValidation.reason === 'characterLimit'
    ? t('create_question.header_character_limit_tooltip')
    : t('create_question.header_required_tooltip')

  return (
    <>
      <ExitQuestionHandleModal
        isModalOpen={isExitQuestionModalOpen}
        setIsModalOpen={setIsExitQuestionModalOpen}
        onConfirm={() => {
          navigate(-1)
        }}
      />

      <NoExplanationsModal
        isModalOpen={noExplanationsModalOpen}
        setIsModalOpen={setNoExplanationsModalOpen}
        onConfirm={() => {
          handleStep(step + 1)
        }}
      />

      <MobileResponsivenessBanner />

      <QuestionFlowHeader
        actionFeedback={actionFeedback}
        onNext={() => {
          if (step === 2) {
            onSubmit(activeQuestion)
            return
          }
          if (step === 1) {
            if (explanations.length === 0) {
              setNoExplanationsModalOpen(true)
              return
            }
          }

          handleStep(step + 1)
        }}
        onBack={() => {
          if (step === 0) {
            setIsExitQuestionModalOpen(true)
          } else {
            handleStep(step - 1)
          }
        }}
        step={step}
        disableNext={!stepValidation.isValid}
        nextTooltipLabel={nextTooltipLabel}
        onExit={() => { setIsExitQuestionModalOpen(true) }}
      />

      <Container>
        <ContentWrapper>
          <div>
            <ContentHeader id="content-header">
              <Breadcrumbs
                active={step}
                items={[
                  { text: t('create_question.tabs.question_info.tab_title') },
                  { text: t('create_question.tabs.content.tab_title') },
                  { text: t('create_question.tabs.preview.tab_title') }
                ]}
              />
              {step === 2 && (
                <ExplanationTitle id="explanation-title">
                  <Body1>
                    {t('create_question.tabs.preview.subtitle')}
                  </Body1>
                </ExplanationTitle>
              )}
            </ContentHeader>

            {step === 0 && (
              <QuestionBasicInfo
                question={activeQuestion}
                handleQuestion={updateActiveQuestion}
                handleApp={updateActiveQuestionApp}
                initialAppType={initialAppType}
                apps={apps}
              />
            )}

            {step === 1 && (
              <QuestionContent
                question={activeQuestion}
              />
            )}

            {step === 2 && (
              <QuestionReview />
            )}
          </div>
        </ContentWrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 48px 0;
`

const ContentWrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContentHeader = styled.div`
  padding-bottom: 12px;
`

const ExplanationTitle = styled.div`
  width: 1024px;
`
