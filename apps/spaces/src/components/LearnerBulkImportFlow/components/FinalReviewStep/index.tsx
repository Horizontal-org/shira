import { FunctionComponent, useMemo } from "react";
import { Body1, Body2Regular, H2, styled } from "@shira/ui";
import { Trans, useTranslation } from "react-i18next";
import { FinalReviewTable, ReviewRow } from "./FinalReviewTable";
import { BulkInviteLearnersResponse } from "../../../../fetch/learner";

interface Props {
  response: BulkInviteLearnersResponse | null;
}

export const FinalReviewStep: FunctionComponent<Props> = ({ response }) => {
  const { t } = useTranslation();

  const tableData = useMemo<ReviewRow[]>(
    () =>
      (response ?? [])
        .filter((row) => row.status === "OK")
        .map((row) => ({
          row: row.row,
          name: row.name ?? "",
          email: row.email,
          status: row.status,
        })),
    [response]
  );

  const isLoading = !response;

  return (
    <ReviewCard>
      <H2>{t("learners_bulk_import.tabs.review.tab_title")}</H2>
      <Body1>
        <Trans
          i18nKey="learners_bulk_import.tabs.review.subtitle"
          values={{ count: tableData.length }}
          components={{ strong: <strong /> }}
        />
      </Body1>

      <Divider />

      <FinalReviewTable
        rows={tableData}
        isLoading={isLoading}
        rowHeader={t("learners_bulk_import.tabs.review.table_row")}
        nameHeader={t("learners_bulk_import.tabs.review.table_name")}
        emailHeader={t("learners_bulk_import.tabs.review.table_email")}
        statusHeader={t("learners_bulk_import.tabs.review.table_status")}
        loadingMessage={<Body2Regular>{t("loading_messages.learners")}</Body2Regular>}
      />
    </ReviewCard>
  );
};

const ReviewCard = styled.div`
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
