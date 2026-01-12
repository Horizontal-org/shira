import { FunctionComponent } from "react";
import { Body1, Modal, styled } from "@shira/ui";
import { useTranslation } from "react-i18next";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

export const FormattingGuidelinesModal: FunctionComponent<Props> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isModalOpen}
      title={t("modals.csv_formatting_guidelines.title")}
      primaryButtonText=""
      primaryButtonDisabled={false}
      secondaryButtonText={t("buttons.close")}
      onPrimaryClick={() => setIsModalOpen(false)}
      onSecondaryClick={() => setIsModalOpen(false)}
      onClose={() => setIsModalOpen(false)}
    >
      <Content>
        <GuidelinesList role="list">
          <li>
            <Body1>
              <ItemTitle>{t("modals.csv_formatting_guidelines.header_row_title")}</ItemTitle>{" "}
              {t("modals.csv_formatting_guidelines.header_row_body")}
            </Body1>
          </li>
          <li>
            <Body1>
              <ItemTitle>{t("modals.csv_formatting_guidelines.first_column_title")}</ItemTitle>{" "}
              {t("modals.csv_formatting_guidelines.first_column_body")}
            </Body1>
          </li>
          <li>
            <Body1>
              <ItemTitle>{t("modals.csv_formatting_guidelines.second_column_title")}</ItemTitle>{" "}
              {t("modals.csv_formatting_guidelines.second_column_body")}
            </Body1>
          </li>
        </GuidelinesList>
        <Body1>{t("modals.csv_formatting_guidelines.footer")}</Body1>
      </Content>
    </Modal>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const GuidelinesList = styled.ul`
  padding-left: 20px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ItemTitle = styled("Body1")`
  font-weight: 600;
`;