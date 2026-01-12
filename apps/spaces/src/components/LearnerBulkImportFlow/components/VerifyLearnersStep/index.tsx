import { FunctionComponent, useState } from "react";
import { Body1, Body2Regular, H2, styled } from "@shira/ui";
import { useTranslation } from "react-i18next";

export const VerifyLearnersStep: FunctionComponent = () => {
  const { t } = useTranslation();
  const [verifyTab, setVerifyTab] = useState<"error" | "skipped" | "valid">("error");

  //Mock
  const verifyCounts = {
    error: 823,
    skipped: 5,
    valid: 172,
  };

  return (
    <VerifyCard>
      <H2>{t("learners_bulk_import.tabs.verify_learners.tab_title")}</H2>
      <Body1>{t("learners_bulk_import.tabs.verify_learners.subtitle")}</Body1>

      <SectionDivider />

      <TabRow>
        <TabButton
          $active={verifyTab === "error"}
          onClick={() => setVerifyTab("error")}
          type="button"
        >
          {t("learners_bulk_import.tabs.verify_learners.error_tab", { count: verifyCounts.error })}
        </TabButton>
        <TabButton
          $active={verifyTab === "skipped"}
          onClick={() => setVerifyTab("skipped")}
          type="button"
        >
          {t("learners_bulk_import.tabs.verify_learners.skipped_tab", { count: verifyCounts.skipped })}
        </TabButton>
        <TabButton
          $active={verifyTab === "valid"}
          onClick={() => setVerifyTab("valid")}
          type="button"
        >
          {t("learners_bulk_import.tabs.verify_learners.valid_tab", { count: verifyCounts.valid })}
        </TabButton>
      </TabRow>

      <Body1>{t("learners_bulk_import.tabs.verify_learners.description")}</Body1>

      <TableCard>
        <TableHeader>
          <TableCell>{t("learners_bulk_import.tabs.verify_learners.table_row")}</TableCell>
          <TableCell>{t("learners_bulk_import.tabs.verify_learners.table_name")}</TableCell>
          <TableCell>{t("learners_bulk_import.tabs.verify_learners.table_email")}</TableCell>
          <TableCell>{t("learners_bulk_import.tabs.verify_learners.table_error")}</TableCell>
        </TableHeader>
        <TableBody>
          <Body2Regular>{t("loading_messages.learners")}</Body2Regular>
        </TableBody>
      </TableCard>

    </VerifyCard>
  );
};

const VerifyCard = styled.div`
  width: 1024px;
  max-width: 100%;
  background: ${props => props.theme.colors.light.white};
  border-radius: 24px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionDivider = styled.div`
  width: 100%;
  height: 1px;
  background: ${props => props.theme.colors.dark.lightGrey};
  margin: 4px 0;
`;

const TabRow = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const TabButton = styled.button<{ $active: boolean }>`
  all: unset;
  cursor: pointer;
  font-weight: 600;
  color: ${({ theme, $active }) => ($active ? theme.colors.green7 : theme.colors.dark.darkGrey)};
  border-bottom: 3px solid ${({ theme, $active }) => ($active ? theme.colors.green7 : "transparent")};
  padding-bottom: 8px;
`;

const TableCard = styled.div`
  border-radius: 16px;
  border: 1px solid ${props => props.theme.colors.dark.lightGrey};
  overflow: hidden;
  background: ${props => props.theme.colors.light.white};
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 1fr 1fr;
  gap: 16px;
  padding: 14px 20px;
  background: ${props => props.theme.colors.light.paleGreen};
  color: ${props => props.theme.colors.dark.darkGrey};
  font-weight: 600;
`;

const TableBody = styled.div`
  padding: 24px 20px;
  text-align: center;
  color: ${props => props.theme.colors.dark.mediumGrey};
`;

const TableCell = styled.div`
  min-width: 0;
`;
