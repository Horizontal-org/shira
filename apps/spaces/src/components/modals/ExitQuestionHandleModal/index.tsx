import { FunctionComponent } from "react";
import { Body1, Modal, ModalType } from "@shira/ui";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void
  onConfirm: () => void
}

export const ExitQuestionHandleModal: FunctionComponent<Props> = ({
  isModalOpen,
  setIsModalOpen,
  onConfirm
}) => {

  return (
    <Modal
      isOpen={isModalOpen}
      title={`Are you sure you want to exit the question?`}
      type={ModalType.Danger}
      primaryButtonText="Exit"
      primaryButtonDisabled={false}
      secondaryButtonText="Cancel"
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
          Any unsaved changes will be lost.
        </Body1>
      </div>
    </Modal>
  )
}
