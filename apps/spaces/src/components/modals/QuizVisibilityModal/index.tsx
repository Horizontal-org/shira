import { FunctionComponent, useState } from "react";
import { Body1, Body3, Modal, RadioGroup, styled } from "@shira/ui";
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
  const [visibility, setVisibility] = useState<"public" | "private">(null);

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
        setIsModalOpen(false);
      }}
      onSecondaryClick={() => {
        onBack();
      }}
    >
      <Body1 id="quiz-visibility-modal-subtitle">
        {t("modals.quiz_visibility.subtitle")}
      </Body1>

      <RadioGroup
        name="quiz-visibility"
        value={visibility}
        onChange={(value) => setVisibility(value as "public" | "private")}
        options={
          [
            {
              value: "public",
              label: (
                <OptionLabelContent>
                  <OptionTitle>
                    {t("modals.quiz_visibility.public_option.title")}
                  </OptionTitle>
                  <OptionDescription>
                    {t("modals.quiz_visibility.public_option.description")}
                  </OptionDescription>
                </OptionLabelContent>
              )
            },
            {
              value: "private",
              label: (
                <OptionLabelContent>
                  <OptionTitle>
                    {t("modals.quiz_visibility.private_option.title")}
                  </OptionTitle>
                  <OptionDescription>
                    {t("modals.quiz_visibility.private_option.description")}
                  </OptionDescription>
                </OptionLabelContent>
              )
            }
          ]
        }
      />

      <Body1>{t("modals.quiz_visibility.description")}</Body1>
    </Modal>
  );
};

const OptionLabelContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const OptionTitle = styled(Body1)`
  margin: 0;
`;

const OptionDescription = styled(Body3)`
  margin: 0;
  color: ${props => props.theme.colors.dark.darkGrey};
`;
