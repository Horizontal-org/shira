import { Body3, defaultTheme, styled } from "@horizontal-org/shira-ui";
import { QuestionTypeChip } from "@horizontal-org/shira-ui";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { FaRegFaceMeh } from "react-icons/fa6";
import { MdCalendarMonth } from "react-icons/md";
import { formatLocaleDate } from "../../../../../language/dateUtils";
import { appIcons } from "../../../../../utils/appIcons";
import { normalizePreviewAppName } from "../../../../../utils/appNames";
import { PreviewDetailsCard } from "../../../PreviewQuizScreen/PreviewDetailsCard";
import { IoMdApps } from "react-icons/io";

type Props = {
  language: string;
  tags: string[];
  isPhishing: boolean;
  app: string;
  dateSubmitted: string;
  locale: string;
};

export const QuestionSubmissionPreviewDetailsCard: FunctionComponent<Props> = ({
  language,
  tags,
  isPhishing,
  app,
  dateSubmitted,
  locale,
}) => {
  const { t } = useTranslation();
  const appName = normalizePreviewAppName(app);
  const appIcon = appIcons[appName.toLowerCase()];

  return (
    <PreviewDetailsCard
      languages={[language]}
      tags={tags}
      sidebar={(
        <>
          <SidebarRow>
            <DetailLabel>
              <MdCalendarMonth size={18} color={defaultTheme.colors.error7} />
              {t("templates.submissions_table.date_submitted")}
            </DetailLabel>
            <SidebarValue>{formatLocaleDate(dateSubmitted, locale)}</SidebarValue>
          </SidebarRow>

          <SidebarRow>
            <DetailLabel>
              <IoMdApps size={18} color={defaultTheme.colors.blue6} />
              {t("templates.submissions_table.app")}
            </DetailLabel>
            <AppValue>
              {appIcon}
              {appName}
            </AppValue>
          </SidebarRow>
        </>
      )}
    >
      <DetailRow>
        <DetailLabel>
          <FaRegFaceMeh size={16} color={defaultTheme.colors.dark.darkGrey} />
          {t("templates.submissions_table.type")}
        </DetailLabel>

        <QuestionTypeChip isPhishing={isPhishing} />
      </DetailRow>
    </PreviewDetailsCard>
  );
};

const DetailRow = styled.div`
  display: grid;
  grid-template-columns: 140px minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  min-height: 32px;
`;

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

const AppValue = styled(SidebarValue)`
  gap: 6px;
`;

const DetailLabel = styled(Body3)`
  display: inline-grid;
  grid-template-columns: 24px minmax(0, 1fr);
  align-items: center;
  column-gap: 8px;
  text-transform: uppercase;
  margin: 0;

  & > svg {
    justify-self: center;
    flex-shrink: 0;
  }
`;
