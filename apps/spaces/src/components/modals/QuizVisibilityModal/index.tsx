import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { Body1, Body1SemiBold, Body3, GeneralTooltip, Link3, Modal, RadioGroup, styled, useTheme } from "@horizontal-org/shira-ui";
import { Trans, useTranslation } from "react-i18next";
import { RiProhibitedLine } from "react-icons/ri";

interface Props {
  isModalOpen: boolean;
  onConfirm: (visibility: "public" | "private") => Promise<void>;
  onBack: () => void;
  isSubmitting?: boolean;
  privateForbidden?: boolean
}

export const QuizVisibilityModal: FunctionComponent<Props> = ({
  isModalOpen,
  onConfirm,
  onBack,
  isSubmitting = false,
  privateForbidden = false
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [visibility, setVisibility] = useState<"public" | "private" | null>(null);
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    if (!isModalOpen) {
      setVisibility(null);
    }
  }, [isModalOpen]);

  const options = useMemo(() => {
    const aux = [{
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
    }]

    if (!privateForbidden) {
      aux.push({
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
      })
    }
    
    return aux

  }, [t, privateForbidden])

  return (
    <Modal
      id="quiz-visibility-modal"
      isOpen={isModalOpen}
      title={t("modals.quiz_visibility.title")}
      primaryButtonText={t('modals.create_quiz.button')}
      secondaryButtonText={t("buttons.back")}
      primaryButtonDisabled={!visibility || isSubmitting}
      onPrimaryClick={() => {
        if (!visibility || isSubmitting) return;
        void onConfirm(visibility);
      }}
      onSecondaryClick={() => {
        if (isSubmitting) return;
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
        options={options}
      />

      { privateForbidden && (
        <PrivateForbidden>
          <PrivateIconWrapper>
            <GeneralTooltip
              enabled={true}
              show={showTooltip}
              setShow={setShowTooltip}
              label={t('modals.quiz_visibility.private_option.forbidden_tooltip')}
            >
              <RiProhibitedLine 
                size={22}
                color={theme.colors.error6}
              />
            </GeneralTooltip>
          </PrivateIconWrapper>
          <div>
            <OptionTitle>
              {t("modals.quiz_visibility.private_option.title")}
            </OptionTitle>
            <OptionDescription>
              <Trans
                i18nKey="modals.quiz_visibility.private_option.forbidden"
                values={{ learn_more: "Learn more" }}
                components={[
                  <Link3
                    key="learn-more"
                    href="https://shira.app/pricing"
                  />
                ]}
              />
            </OptionDescription>
          </div>
        </PrivateForbidden>
      )}

      { !privateForbidden && (
        <Body1>{t("modals.quiz_visibility.description")}</Body1>
      )}
    </Modal>
  );
};

const OptionLabelContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 4px;
`;

const OptionTitle = styled(Body1SemiBold)`
  margin: 0;
`;

const OptionDescription = styled(Body3)`
  margin: 0;
  color: ${props => props.theme.colors.dark.darkGrey};
`;


const PrivateForbidden = styled.div`
  display: flex;
  
`

const PrivateIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 10px;
`