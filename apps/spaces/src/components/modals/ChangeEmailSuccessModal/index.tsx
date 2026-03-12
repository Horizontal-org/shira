import { Body1, Body2Regular, Link3, Modal, styled } from "@shira/ui";
import { FunctionComponent } from "react";
import { Trans, useTranslation } from "react-i18next";

interface Props {
  isModalOpen: boolean;
  onClose: () => void;
}

export const ChangeEmailSuccessModal: FunctionComponent<Props> = ({
  isModalOpen,
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      size="medium"
      id="change-email-success-modal"
      isOpen={isModalOpen}
      title={t("modals.change_email_success.title")}
      primaryButtonText={t("buttons.i_understand")}
      secondaryButtonText=""
      onPrimaryClick={onClose}
      onClose={onClose}
    >
      <Content>
        <Body1>{t("modals.change_email_success.description")}</Body1>
        <Body2Regular>
          <Trans
            i18nKey="modals.change_email_success.didnt_receive"
            values={{ contact_email: "contact@wearehorizontal.org" }}
            components={[
              <Link3
                key="contact-email"
                href="mailto:contact@wearehorizontal.org"
              />,
            ]}
          />
        </Body2Regular>
      </Content>
    </Modal>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Contact = styled.a`
  color: ${props => props.theme.colors.blue6};
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`;
