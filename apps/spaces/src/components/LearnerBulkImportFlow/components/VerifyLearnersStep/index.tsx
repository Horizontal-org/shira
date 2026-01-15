import { FunctionComponent, useMemo, useState } from "react";
import { Body1, Body2Regular, H2, styled } from "@shira/ui";
import { useTranslation } from "react-i18next";
import { BulkInviteLearnersResponse } from "../../../../fetch/learner";
import { VerifyLearnersTable } from "./VerifyLearnersTable";

interface Props {
  response: BulkInviteLearnersResponse | null;
}

export const VerifyLearnersStep: FunctionComponent<Props> = ({ response }) => {
  const { t } = useTranslation();

  const [verifyTab, setVerifyTab] = useState<"error" | "skipped" | "valid">("skipped");

  const verifyResponse = response ?? [];
  const isLoading = !response;

  const statusToTab = {
    Error: "error",
    Skipped: "skipped",
    OK: "valid",
  } as const;

  const verifyCounts = useMemo(
    () =>
      verifyResponse.reduce(
        (acc, row) => {
          const key = statusToTab[row.status];
          acc[key] += 1;
          return acc;
        },
        { error: 0, skipped: 0, valid: 0 }
      ),
    [verifyResponse]
  );

  const visibleRows = useMemo(
    () => verifyResponse.filter((row) => statusToTab[row.status] === verifyTab),
    [verifyResponse, verifyTab]
  );

  const statusHeader =
    verifyTab === "error"
      ? t("learners_bulk_import.tabs.verify_learners.table_error")
      : verifyTab === "skipped"
        ? t("learners_bulk_import.tabs.verify_learners.table_skip_reason")
        : t("learners_bulk_import.tabs.verify_learners.table_status");

  const emptyMessage =
    verifyTab === "error"
      ? t("learners_bulk_import.tabs.verify_learners.empty_error")
      : verifyTab === "skipped"
        ? t("learners_bulk_import.tabs.verify_learners.empty_skipped")
        : t("learners_bulk_import.tabs.verify_learners.empty_valid");

  const showTabDescription = isLoading || visibleRows.length > 0;

  return (
    <VerifyCard>
      <H2>{t("learners_bulk_import.tabs.verify_learners.tab_title")}</H2>
      <Body1>{t("learners_bulk_import.tabs.verify_learners.subtitle")}</Body1>

      <Divider />

      <TabRow>
        <TabButton
          id="verify-tab-error"
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

      {showTabDescription && (
        <Body1>
          {verifyTab === "error" && t("learners_bulk_import.tabs.verify_learners.description_error")}
          {verifyTab === "skipped" && t("learners_bulk_import.tabs.verify_learners.description_skipped")}
          {verifyTab === "valid" && t("learners_bulk_import.tabs.verify_learners.description_valid")}
        </Body1>
      )}

      <VerifyLearnersTable
        rows={visibleRows}
        isLoading={isLoading}
        rowHeader={t("learners_bulk_import.tabs.verify_learners.table_row")}
        nameHeader={t("learners_bulk_import.tabs.verify_learners.table_name")}
        emailHeader={t("learners_bulk_import.tabs.verify_learners.table_email")}
        statusHeader={statusHeader}
        validatedLabel={t("learners_bulk_import.tabs.verify_learners.validated")}
        loadingMessage={<Body2Regular>{t("loading_messages.learners")}</Body2Regular>}
        emptyMessage={emptyMessage}
      />

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

const Divider = styled.div`
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
