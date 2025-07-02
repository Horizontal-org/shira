import { FunctionComponent, useState } from "react";
import { Body1, Modal, ModalType, TextInput } from "@shira/ui";
import styled from "styled-components";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void
  onConfirm: () => void
}

export const UnpublishedQuizModal: FunctionComponent<Props> = ({
  isModalOpen,
  setIsModalOpen,
  onConfirm
}) => {

  return (
    <Modal
      isOpen={isModalOpen}
      title={`Your quiz is unpublished`}
      primaryButtonText="Publish quiz"
      secondaryButtonText="Keep quiz unpublished"
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
          The link was copied to your clipboard. However, learners will not be able to use the link because the quiz has not been published. Publish it now so learners can start taking the quiz.
        </Body1>
      </div>
    </Modal>
  )
}
