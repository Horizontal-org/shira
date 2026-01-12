import { FunctionComponent } from "react";
import { Body1, Body2Regular, H2, styled } from "@shira/ui";
import { Trans, useTranslation } from "react-i18next";

export const FinalReviewStep: FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <ReviewCard>
      <H2>{t("learners_bulk_import.tabs.review.tab_title")}</H2>
      <Body1>
        <Trans
          i18nKey="learners_bulk_import.tabs.review.subtitle"
          components={{ strong: <strong /> }}
        />
      </Body1>

      <Divider />

      <TableCard>
        <TableHeader>
          <TableCell>{t("learners_bulk_import.tabs.review.table_row")}</TableCell>
          <TableCell>{t("learners_bulk_import.tabs.review.table_name")}</TableCell>
          <TableCell>{t("learners_bulk_import.tabs.review.table_email")}</TableCell>
          <TableCell>{t("learners_bulk_import.tabs.review.table_status")}</TableCell>
        </TableHeader>
        <TableBody>
          <Body2Regular>{t("loading_messages.learners")}</Body2Regular>
        </TableBody>
      </TableCard>

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
