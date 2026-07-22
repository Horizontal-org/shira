import {
  Body1,
  Body3,
  Button,
  CloseButton,
  FullScreenModal,
  H2,
  defaultTheme,
  styled,
} from "@horizontal-org/shira-ui";
import { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoEyeSharp } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";
import { MdCalendarMonth, MdOutlinePhishing, MdOutlineQuiz } from "react-icons/md";
import type { QuestionSubmissionDetailDto, QuizSubmissionDetailDto } from "../../../fetch/submissions";
import { formatLocaleDate } from "../../../language/dateUtils";
import { SubmissionStatusPill } from "../../MySubmissionsLayout/components/SubmissionTableCells";
import { QuizPreviewQuestionsTable } from "../QuizLibraryPreviewModal/components/QuizPreviewQuestionsTable";
import { AppLayout } from "../../QuestionPreview/AppLayout";
import { isMessagingNotPhoneApp, isMessagingPhoneApp } from "../../../utils/appNames";

type Props = {
  quiz: QuizSubmissionDetailDto | null;
  question: QuestionSubmissionDetailDto | null;
  onClose: () => void;
};

export const SubmissionPreviewModal: FunctionComponent<Props> = ({
  quiz,
  question,
  onClose,
}) => {
  const { t, i18n } = useTranslation();
  const [isFullQuizPreview, setIsFullQuizPreview] = useState(false);
  const [showExplanations, setShowExplanations] = useState(false);
  const submissionId = quiz?.id ?? question?.id;

  useEffect(() => {
    setIsFullQuizPreview(false);
    setShowExplanations(false);
  }, [submissionId]);

  if (!quiz && !question) return null;

  const isQuiz = Boolean(quiz);

  return (
    <FullScreenModal
      isOpen={true}
      onClose={onClose}
      closeOnOverlayClick={true}
    >
      <TopBar>
        <CloseButton onClick={onClose} />
        {isQuiz && (
          <Button
            text={t("quiz_library.preview.preview_full_quiz")}
            type="outline"
            leftIcon={(
              <IoEyeSharp size={22} color={defaultTheme.colors.dark.darkGrey} />
            )}
            onClick={() => setIsFullQuizPreview((current) => !current)}
          />
        )}
        {!isQuiz && (
          <Button
            text={t(
              showExplanations
                ? "preview.hide_explanations"
                : "preview.show_explanations",
            )}
            type="primary"
            color={defaultTheme.colors.blue7}
            onClick={() => setShowExplanations((current) => !current)}
          />
        )}
      </TopBar>

      <Content>
        {quiz ? (
          <>
            <H2>{quiz.title}</H2>
            {quiz.description && <Subtitle>{quiz.description}</Subtitle>}
          </>
        ) : (
          <H2>{question?.questionName}</H2>
        )}

        <DetailsCard>
          <DetailsMain>
            {quiz?.langTags.length ? (
              <DetailRow>
                <DetailLabel>{t("quiz_library.preview.languages")}</DetailLabel>
                <ChipRow>
                  {quiz.langTags.map((language) => (
                    <NeutralChip key={language.id}>{language.name}</NeutralChip>
                  ))}
                </ChipRow>
              </DetailRow>
            ) : null}
            {quiz?.tags?.length ? (
              <DetailRow>
                <DetailLabel>{t("quiz_library.preview.tags")}</DetailLabel>
                <ChipRow>
                  {quiz.tags.map((tag) => <TagChip key={tag}>{tag}</TagChip>)}
                </ChipRow>
              </DetailRow>
            ) : null}
            {question && (
              <>
                {question.language && (
                  <DetailRow>
                    <DetailLabel>{t("quiz_library.preview.languages")}</DetailLabel>
                    <NeutralChip>{question.language}</NeutralChip>
                  </DetailRow>
                )}
                <DetailRow>
                  <DetailLabel>
                    {t("templates.submissions_table.type")}
                  </DetailLabel>
                  <QuestionTypePill $isPhishing={Boolean(question.isPhishing)}>
                    {question.isPhishing ? (
                      <MdOutlinePhishing size={16} />
                    ) : (
                      <FaCircleCheck size={16} />
                    )}
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
                  <Body3>{question?.app}</Body3>
                </DetailRow>
                {question.tags?.length ? (
                  <DetailRow>
                    <DetailLabel>{t("quiz_library.preview.tags")}</DetailLabel>
                    <ChipRow>
                      {question.tags.map((tag) => <TagChip key={tag}>{tag}</TagChip>)}
                    </ChipRow>
                  </DetailRow>
                ) : null}
              </>
            )}
          </DetailsMain>
          <DetailsSidebar>
            <SidebarRow>
              <DetailLabel>{t("templates.submissions_table.status")}</DetailLabel>
              <SubmissionStatusPill status={quiz?.status ?? question!.status} />
            </SidebarRow>
            <SidebarRow>
              <DetailLabel>
                <MdCalendarMonth size={18} color={defaultTheme.colors.error7} />
                {t("templates.submissions_table.date_submitted")}
              </DetailLabel>
              <Body3>
                {formatLocaleDate(quiz?.dateSubmitted ?? question!.dateSubmitted, i18n.language)}
              </Body3>
            </SidebarRow>
          </DetailsSidebar>
        </DetailsCard>

        <PreviewArea>
          {quiz ? (
            <QuizPreviewQuestionsTable
              questions={(quiz.questions ?? []).map((quizQuestion) => ({
                ...quizQuestion,
                content: "",
                explanations: [],
              }))}
              onPreviewQuestion={() => undefined}
              onSelectApp={() => undefined}
            />
          ) : (
            <>
              {showExplanations && <ExplanationOverlay />}
              <PreviewAppFrame
                $isFullWidth={isMessagingNotPhoneApp(question?.app ?? "")}
                $isPhoneFrame={isMessagingPhoneApp(question?.app ?? "")}
              >
                <AppLayout
                  appName={question?.app ?? ""}
                  content={question?.content ?? ""}
                  explanations={question?.explanations ?? []}
                  explanationNumber={0}
                  showExplanations={showExplanations}
                />
              </PreviewAppFrame>
            </>
          )}
        </PreviewArea>
      </Content>
    </FullScreenModal>
  );
};

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 28px 0;
`;

const Content = styled.div`
  flex: 1;
  min-height: 0;
  padding: 32px 64px 72px;
  overflow-y: auto;
`;

const Subtitle = styled(Body1)`
  margin: 16px 0 0;
  color: ${defaultTheme.colors.dark.darkGrey};
`;

const DetailsCard = styled.div`
  margin-top: 28px;
  border: 1px solid ${defaultTheme.colors.light.paleGrey};
  border-radius: 20px;
  padding: 16px 20px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 32px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const DetailsMain = styled.div`
  display: grid;
  gap: 12px;
`;

const DetailsSidebar = styled.div`
  display: grid;
  gap: 12px;
  align-content: start;
`;

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

const DetailLabel = styled(Body3)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  margin: 0;
`;

const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const NeutralChip = styled(Body3)`
  padding: 4px 8px;
  border-radius: 4px;
  background: ${defaultTheme.colors.light.paleGrey};
`;

const TagChip = styled(NeutralChip)`
  border: 1px solid ${defaultTheme.colors.blue4};
  background: ${defaultTheme.colors.light.white};
  color: ${defaultTheme.colors.blue7};
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

const PreviewArea = styled.div`
  position: relative;
  margin-top: 16px;
  min-height: 360px;
  padding: 32px;
  border-radius: 4px;
  background: ${defaultTheme.colors.light.paleGreen};
  display: flex;
  justify-content: center;
`;

const PreviewAppFrame = styled.div<{
  $isFullWidth: boolean;
  $isPhoneFrame: boolean;
}>`
  position: relative;
  width: ${(props) => (props.$isFullWidth ? "100%" : "fit-content")};
  max-width: 100%;
  height: ${(props) => (props.$isPhoneFrame ? "80vh" : "68vh")};
  min-height: 620px;
  max-height: ${(props) => (props.$isPhoneFrame ? "none" : "780px")};
`;
const ExplanationOverlay = styled.div`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: rgba(0, 0, 0, 0.45);
  pointer-events: none;
`;
