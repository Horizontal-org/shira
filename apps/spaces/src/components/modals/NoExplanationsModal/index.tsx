import { FunctionComponent } from "react";
import { Body1, Modal, ModalType } from "@shira/ui";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void
  onConfirm: () => void
}

export const NoExplanationsModal: FunctionComponent<Props> = ({
  isModalOpen,
  setIsModalOpen,
  onConfirm
}) => {

  return (
    <Modal
      isOpen={isModalOpen}
      title={`Continue without explanations?`}
      primaryButtonText="Continue"
      primaryButtonDisabled={false}
      secondaryButtonText="Add explanations"
      onPrimaryClick={() => {
        onConfirm()
        setIsModalOpen(false);        
      }}
      onSecondaryClick={() => {
        setIsModalOpen(false)
      }}
    >
      <div>        
        <Body1>
          You haven’t created any explanations for this question, so learners will not see any text explaining why the message seems like phishing or seems legitimate. 
        </Body1>
      </div>
    </Modal>
  )
}
