import { FunctionComponent, useState } from "react";
import { EntityFlowHeader } from "../../../EntityFlowHeader";
import { ExitNoteHandleModal } from "../../../modals/ExitNoteHandleModal";
import { useTranslation } from "react-i18next";
import { EntityBodyHeader, EntityBodyWrapper, EntityContainer } from "../../../EntityFlowBody";
import { Body1, Breadcrumbs } from "@horizontal-org/shira-ui";
import { NoteInfo } from "../NoteInfo";
import { ActiveNote, activeNoteDefault } from "../../../../types/active_note";
import { NoteReview } from "../NoteReview";
import { NoteCRUDFeedback } from "../../../../fetch/note";

interface Props {
  onClose: () => void
  actionFeedback: string
  onSubmit: (note: ActiveNote) => void
}

export const NoteFlowManagement: FunctionComponent<Props> = ({
  onClose,
  actionFeedback,
  onSubmit
}) => {

  const { t } = useTranslation();

  const [step, handleStep] = useState(0)
  const [isExitNoteModalOpen, setIsExitNoteModalOpen] = useState(false)
  const [activeNote, handleActiveNote] = useState<ActiveNote>(activeNoteDefault)

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
        isProcessing={actionFeedback === NoteCRUDFeedback.processing}
        onNext={() => {
          if (step === 1) {
            onSubmit(activeNote)
            return
          }

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
        primaryButtonText={step === 1
          ? (actionFeedback === NoteCRUDFeedback.processing
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

              {step === 1 && (
                <Body1>{t('create_note.preview.subtitle')}</Body1>
              )}
            </EntityBodyHeader>

            {step === 0 && (
              <NoteInfo
                note={activeNote}
                handleNameChange={(name) => {
                  handleActiveNote({
                    ...activeNote,
                    name
                  })
                }}
                handleContentChange={(contentValue) => {
                  handleActiveNote({
                    ...activeNote,
                    content: {
                      ...activeNote.content,
                      value: contentValue
                    }
                  })
                }}
              />
            )}

            {step === 1 && (
              <NoteReview activeNote={activeNote} />
            )}

          </div>
        </EntityBodyWrapper>
      </EntityContainer>

    </>
  )
}