import { FunctionComponent, useMemo, useState } from "react";
import { Body1, Body2Regular, H2, styled } from "@shira/ui";
import { useTranslation } from "react-i18next";
import { FiX } from "react-icons/fi";
import { BulkInviteLearnersResponse } from "../../../../fetch/learner";

interface Props {
  response: BulkInviteLearnersResponse | null;
}

export const VerifyLearnersStep: FunctionComponent<Props> = ({ response }) => {
  const { t } = useTranslation();
  const [verifyTab, setVerifyTab] = useState<"error" | "skipped" | "valid">("error");

  const verifyResponse = response ?? [];

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

  return (
    <VerifyCard>
      <H2>{t("learners_bulk_import.tabs.verify_learners.tab_title")}</H2>
      <Body1>{t("learners_bulk_import.tabs.verify_learners.subtitle")}</Body1>

      <Divider />

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

      <ResultsMeta>
        <Body2Regular>
          {visibleRows.length} of {verifyCounts[verifyTab]}
        </Body2Regular>
      </ResultsMeta>

      <TableCard>
        <TableHeader>
          <TableCell>{t("learners_bulk_import.tabs.verify_learners.table_row")}</TableCell>
          <TableCell>{t("learners_bulk_import.tabs.verify_learners.table_name")}</TableCell>
          <TableCell>{t("learners_bulk_import.tabs.verify_learners.table_email")}</TableCell>
          <TableCell>{t("learners_bulk_import.tabs.verify_learners.table_error")}</TableCell>
        </TableHeader>
        <TableBody>
          {visibleRows.length === 0 ? (
            <EmptyState>
              <Body2Regular>{t("loading_messages.learners")}</Body2Regular>
            </EmptyState>
          ) : (
            visibleRows.map((row) => (
              <TableRow key={`${row.status}-${row.row}`}>
                <RowNumber>{row.row}</RowNumber>
                <TableCellText>{row.name || "-"}</TableCellText>
                <TableCellText>{row.email || "-"}</TableCellText>
                <TableCellText>
                  {row.message ? (
                    <StatusPill $status={row.status}>
                      {row.status === "Error" && (
                        <StatusIcon>
                          <FiX size={12} />
                        </StatusIcon>
                      )}
                      {row.message}
                    </StatusPill>
                  ) : (
                    "-"
                  )}
                </TableCellText>
              </TableRow>
            ))
          )}
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

const ResultsMeta = styled.div`
  display: flex;
  justify-content: flex-start;
  color: ${props => props.theme.colors.dark.mediumGrey};
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
  display: flex;
  flex-direction: column;
`;

const TableCell = styled.div`
  min-width: 0;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 1fr 1fr;
  gap: 16px;
  padding: 14px 20px;
  border-top: 1px solid ${props => props.theme.colors.dark.lightGrey};
  align-items: center;
`;

const TableCellText = styled(Body2Regular)`
  color: ${props => props.theme.colors.dark.mediumGrey};
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RowNumber = styled(Body2Regular)`
  color: ${props => props.theme.colors.green7};
  font-weight: 600;
`;

const StatusPill = styled.span<{ $status: "Error" | "Skipped" | "OK" }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 12px;
  color: ${({ theme, $status }) =>
    $status === "Error" ? theme.colors.red6 : theme.colors.dark.darkGrey};
  background: ${({ theme, $status }) =>
    $status === "Error" ? theme.colors.red1 : theme.colors.light.paleGreen};
`;

const StatusIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${props => props.theme.colors.red6};
  color: ${props => props.theme.colors.light.white};
`;

const EmptyState = styled.div`
  padding: 24px 20px;
  text-align: center;
  color: ${props => props.theme.colors.dark.mediumGrey};
`;
