import { FunctionComponent, useState } from "react";
import { EntityFlowHeader } from "../../../EntityFlowHeader";
import { ExitNoteHandleModal } from "../../../modals/ExitNoteHandleModal";
import { useTranslation } from "react-i18next";
import { EntityBodyHeader, EntityBodyWrapper, EntityContainer } from "../../../EntityFlowBody";
import { Breadcrumbs } from "@horizontal-org/shira-ui";
import { NoteInfo } from "../NoteInfo";
import { ActiveNote, activeNoteDefault } from "../../../../types/active_note";

interface Props {
  onClose: () => void
}

export const NoteFlowManagement: FunctionComponent<Props> = ({
  onClose
}) => {

  const { t } = useTranslation();

  const [isProcessing, handleProcessing] = useState()
  const [step, handleStep] = useState(0)
  const [isExitNoteModalOpen, setIsExitNoteModalOpen] = useState(false)
  const [activeNote, handleActiveNote] = useState<ActiveNote>(activeNoteDefault)

  const updateActiveNote = (k, v) => {
    handleActiveNote({
      ...activeNote,
      [k]: v
    })
  }

  const getStepValidation = (): {
    reason?: string;
    isValid: boolean;
  } => {
    // if (step === 0) {
    //   return isQuestionInfoStepValid(activeQuestion)
    // }

    // if (step === 1) {
    //   return isQuestionContentStepValid(activeQuestion)
    // }

    return { isValid: true }
  }

  const stepValidation = getStepValidation()
  const nextTooltipLabel = stepValidation.reason === 'characterLimit'
    ? t('create_question.header_character_limit_tooltip')
    : t('create_question.header_required_tooltip')

  return (
    <>

      <ExitNoteHandleModal
        isModalOpen={isExitNoteModalOpen}
        setIsModalOpen={setIsExitNoteModalOpen}
        onConfirm={onClose}
      />

      <EntityFlowHeader
        isProcessing={isProcessing}
        onNext={() => {
          // if (step === 2) {
          //   onSubmit(activeQuestion)
          //   return
          // }
          // if (step === 1) {
          //   if (explanations.length === 0) {
          //     setNoExplanationsModalOpen(true)
          //     return
          //   }
          // }

          handleStep(step + 1)
        }}
        onBack={() => {
          if (step === 0) {
            setIsExitNoteModalOpen(true)
          } else {
            handleStep(step - 1)
          }
        }}
        step={step}
        disableNext={!getStepValidation().isValid}
        nextTooltipLabel={nextTooltipLabel}
        primaryButtonText={step === 2
          ? (isProcessing
            ? t('loading_messages.saving')
            : t('buttons.save'))
          : t('buttons.next')}
        onExit={() => { setIsExitNoteModalOpen(true) }}
      />

      <EntityContainer>
        <EntityBodyWrapper>
          <div>
            <EntityBodyHeader id="content-header">
              <Breadcrumbs
                active={step}
                items={[
                  { text: t('create_note.breadcrumbs.content') },
                  { text: t('create_note.breadcrumbs.preview') },
                ]}
              />
            </EntityBodyHeader>

            {step === 0 && (
              <NoteInfo
                note={activeNote}
                handleNoteChange={updateActiveNote}
              />
            )}
            {/* {step === 0 && (
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
            )} */}
          </div>
        </EntityBodyWrapper>
      </EntityContainer>

    </>
  )
}