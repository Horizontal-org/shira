import { Body3, defaultTheme, styled } from "@horizontal-org/shira-ui";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { MdCalendarMonth } from "react-icons/md";
import type { SubmissionStatus } from "../../../../../fetch/submissions";
import { formatLocaleDate } from "../../../../../language/dateUtils";
import { SubmissionStatusPill } from "../../../../SubmissionStatusPill";
import { PreviewDetailsCard } from "../../../PreviewQuizScreen/PreviewDetailsCard";

type Props = {
  languages: string[];
  tags: string[];
  status: SubmissionStatus;
  dateSubmitted: string;
  locale: string;
};

export const QuizSubmissionPreviewDetailsCard: FunctionComponent<Props> = ({
  languages,
  tags,
  status,
  dateSubmitted,
  locale,
}) => {
  const { t } = useTranslation();

  return (
    <PreviewDetailsCard
      languages={languages}
      tags={tags}
      sidebar={(
        <>
          <SidebarRow>
            <DetailLabel>{t("templates.submissions_table.status")}</DetailLabel>
            <SubmissionStatusPill status={status} />
          </SidebarRow>
          <SidebarRow>
            <DetailLabel>
              <MdCalendarMonth size={18} color={defaultTheme.colors.error7} />
              {t("templates.submissions_table.date_submitted")}
            </DetailLabel>
            <SidebarValue>
              {formatLocaleDate(dateSubmitted, locale)}
            </SidebarValue>
          </SidebarRow>
        </>
      )}
    />
  );
};

const SidebarRow = styled.div`
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  min-height: 32px;
`;

const SidebarValue = styled(Body3)`
  display: flex;
  align-items: center;
  color: ${defaultTheme.colors.dark.darkGrey};
  margin: 0;
  min-height: 32px;
`;

const DetailLabel = styled(Body3)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  margin: 0;
`;
