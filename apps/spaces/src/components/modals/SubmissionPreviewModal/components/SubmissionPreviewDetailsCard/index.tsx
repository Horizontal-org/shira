import { Body3, defaultTheme, styled } from "@horizontal-org/shira-ui";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { FaCircleCheck } from "react-icons/fa6";
import { MdCalendarMonth, MdOutlinePhishing, MdOutlineQuiz } from "react-icons/md";
import type { QuestionSubmissionDetailDto, QuizSubmissionDetailDto } from "../../../../../fetch/submissions";
import { formatLocaleDate } from "../../../../../language/dateUtils";
import { SubmissionStatusPill } from "../../../../MySubmissionsLayout/components/SubmissionTableCells";
import { PreviewDetailsCard } from "../../../QuizPreviewModal/PreviewDetailsCard";

type Props = {
  quiz: QuizSubmissionDetailDto | null;
  question: QuestionSubmissionDetailDto | null;
  locale: string;
};

export const SubmissionPreviewDetailsCard: FunctionComponent<Props> = ({
  quiz,
  question,
  locale,
}) => {
  const { t } = useTranslation();

  return (
    <PreviewDetailsCard
      languages={quiz?.langTags.map((language) => language.name) ?? (question?.language ? [question.language] : [])}
      tags={quiz?.tags ?? question?.tags ?? []}
      sidebar={(
        <>
          <SidebarRow>
            <DetailLabel>{t("templates.submissions_table.status")}</DetailLabel>
            <SubmissionStatusPill status={quiz?.status ?? question!.status} />
          </SidebarRow>
          <SidebarRow>
            <DetailLabel>
              <MdCalendarMonth size={18} color={defaultTheme.colors.error7} />
              {t("templates.submissions_table.date_submitted")}
            </DetailLabel>
            <SidebarValue>
              {formatLocaleDate(quiz?.dateSubmitted ?? question!.dateSubmitted, locale)}
            </SidebarValue>
          </SidebarRow>
        </>
      )}
    >

      <DetailRow>
        <DetailLabel>{t("templates.submissions_table.type")}</DetailLabel>
        <QuestionTypePill $isPhishing={question.isPhishing}>
          {question.isPhishing ? <MdOutlinePhishing size={16} /> : <FaCircleCheck size={16} />}
          {question.isPhishing
            ? t("question_library.columns.type.phishing")
            : t("question_library.columns.type.legitimate")}
        </QuestionTypePill>
      </DetailRow>
      <DetailRow>
        <DetailLabel>
          <MdOutlineQuiz size={18} color={defaultTheme.colors.blue6} />
          {t("templates.submissions_table.app")}
        </DetailLabel>
        <Body3>{question.app}</Body3>
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
