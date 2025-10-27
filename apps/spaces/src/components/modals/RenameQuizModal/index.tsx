import { FunctionComponent, useEffect, useState } from "react";
import { Modal, TextInput } from "@shira/ui";
import styled from "styled-components";

import { Quiz } from "../../../store/slices/quiz";
import { useTranslation } from "react-i18next";

interface Props {
  quiz: Quiz
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void
  onRename: (title: string) => void
  onCancel: () => void
}

export const RenameQuizModal: FunctionComponent<Props> = ({
  quiz,
  isModalOpen,
  setIsModalOpen,
  onRename,
  onCancel
}) => {

  const { t } = useTranslation();
  const [title, handleTitle] = useState('')

  useEffect(() => {
    if (quiz) {
      handleTitle(quiz.title)
    }
  }, [quiz])

  return quiz && (
      <Modal
        isOpen={isModalOpen}
        title={t('modals.rename.title')}
        primaryButtonText={t('modals.rename.saven')}
        secondaryButtonText={t('modals.rename.cancel')}
        onPrimaryClick={() => {
          setIsModalOpen(false);
          onRename(title)
          handleTitle('')
        }}
        onSecondaryClick={() => {
          handleTitle('')
          onCancel()
        }}
    >
        <FormContent>
          <TextInput
            label={t('modals.rename.input_placeholder')}
            value={title}
            onChange={(e) => handleTitle(e.target.value)}
          />
      </FormContent>
    </Modal>
  )
}

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
`;