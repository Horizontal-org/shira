import { Body3, defaultTheme, styled } from "@horizontal-org/shira-ui";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { FaCircleCheck, FaRegFaceMeh } from "react-icons/fa6";
import { MdCalendarMonth, MdOutlinePhishing, MdOutlineQuiz } from "react-icons/md";
import { formatLocaleDate } from "../../../../../language/dateUtils";
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
            <Body3>{app}</Body3>
          </SidebarRow>
        </>
      )}
    >
      <DetailRow>
        <DetailLabel>
          <FaRegFaceMeh size={16} color={defaultTheme.colors.dark.darkGrey} />
          {t("templates.submissions_table.type")}
        </DetailLabel>
        <QuestionTypePill $isPhishing={isPhishing}>
          {isPhishing ? <MdOutlinePhishing size={16} /> : <FaCircleCheck size={16} />}
          {isPhishing
            ? t("question_library.columns.type.phishing")
            : t("question_library.columns.type.legitimate")}
        </QuestionTypePill>
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

const DetailLabel = styled(Body3)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  margin: 0;
`;

const QuestionTypePill = styled.span<{ $isPhishing: boolean }>`
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 2px;
  padding: 4px 8px;
  background: ${(props) => (
    props.$isPhishing
      ? defaultTheme.colors.light.paleRed
      : defaultTheme.colors.light.paleGreen
  )};
  color: ${(props) => (
    props.$isPhishing ? defaultTheme.colors.error9 : defaultTheme.colors.green9
  )};
`;
