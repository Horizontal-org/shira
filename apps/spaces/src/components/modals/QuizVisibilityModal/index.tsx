import { FunctionComponent, useEffect, useState } from "react";
import { Body1, Body3, defaultTheme, Modal, styled } from "@shira/ui";
import { useTranslation } from "react-i18next";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  onConfirm: (visibility: "public" | "private") => void;
  onBack: () => void;
}

export const QuizVisibilityModal: FunctionComponent<Props> = ({
  isModalOpen,
  setIsModalOpen,
  onConfirm,
  onBack
}) => {
  const { t } = useTranslation();
  const [visibility, setVisibility] = useState<"public" | "private">("public");

  useEffect(() => {
    if (isModalOpen) {
      setVisibility("public");
    }
  }, [isModalOpen]);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      id="quiz-visibility-modal"
      isOpen={isModalOpen}
      title={t("modals.quiz_visibility.title")}
      primaryButtonText={t('modals.create_quiz.button')}
      secondaryButtonText={t("buttons.back")}
      primaryButtonDisabled={false}
      onPrimaryClick={() => {
        onConfirm(visibility);
        handleClose();
      }}
      onSecondaryClick={() => {
        onBack();
      }}
    >
      <Body1 id="quiz-visibility-modal-subtitle">
        {t("modals.quiz_visibility.subtitle")}
      </Body1>

      <FieldSet id="quiz-visibility-options">
        <OptionWrapper>
          <OptionRow>
            <input
              id="quiz-visibility-public"
              type="radio"
              name="visibility"
              value="public"
              checked={visibility === "public"}
              onChange={() => setVisibility("public")}
            />
            <label htmlFor="quiz-visibility-public">
              {t("modals.quiz_visibility.public_option.title")}
            </label>
          </OptionRow>

          <OptionDescription>
            {t("modals.quiz_visibility.public_option.description")}
          </OptionDescription>
        </OptionWrapper>

        <OptionWrapper>
          <OptionRow>
            <input
              id="quiz-visibility-private"
              type="radio"
              name="visibility"
              value="private"
              checked={visibility === "private"}
              onChange={() => setVisibility("private")}
            />
            <label htmlFor="quiz-visibility-private">
              {t("modals.quiz_visibility.private_option.title")}
            </label>
          </OptionRow>

          <OptionDescription>
            {t("modals.quiz_visibility.private_option.description")}
          </OptionDescription>
        </OptionWrapper>
      </FieldSet>

      <Body1>{t("modals.quiz_visibility.description")}</Body1>
    </Modal>
  );
};

const FieldSet = styled.fieldset`
  margin-top: 16px;
  margin-bottom: 16px;
  border: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const OptionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const OptionDescription = styled(Body3)`
  margin-left: 28px;
  color: ${defaultTheme.colors.dark.darkGrey};
`;
