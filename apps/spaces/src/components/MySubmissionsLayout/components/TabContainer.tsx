import { CardPagination, styled } from "@horizontal-org/shira-ui";
import { ComponentProps, FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import type { QuestionSubmissionDto, QuizSubmissionDto, SubmissionsPageDto } from "../../../fetch/submissions";
import { SubmissionsTable, type SubmissionListItem } from "./SubmissionsTable";

type ResourceType = "quiz_template" | "question_template";
type Submission = QuizSubmissionDto | QuestionSubmissionDto;

type Props = {
  questionSubmissions: SubmissionsPageDto<QuestionSubmissionDto>;
  quizSubmissions: SubmissionsPageDto<QuizSubmissionDto>;
  quizPaginationProps: ComponentProps<typeof CardPagination>;
  questionPaginationProps: ComponentProps<typeof CardPagination>;
  onPreviewQuiz: (submission: QuizSubmissionDto) => void;
  onPreviewQuestion: (submission: QuestionSubmissionDto) => void;
};

export const TabContainer: FunctionComponent<Props> = ({
  questionSubmissions,
  quizSubmissions,
  quizPaginationProps,
  questionPaginationProps,
  onPreviewQuiz,
  onPreviewQuestion,
}) => {
  const { t } = useTranslation();
  const [activeResourceType, setActiveResourceType] = useState<ResourceType>("quiz_template");

  const allSubmissions: Submission[] = [...quizSubmissions.data, ...questionSubmissions.data];
  const activeSubmissions = allSubmissions.filter(
    (submission) => submission.resourceType === activeResourceType,
  );
  const isQuizTab = activeResourceType === "quiz_template";
  const submissions: SubmissionListItem[] = activeSubmissions.map((submission) => ({
    resourceId: submission.resourceId,
    name: submission.resourceType === "quiz_template" ? submission.title : submission.questionName,
    dateSubmitted: submission.dateSubmitted,
    status: submission.status,
  }));
  const paginationProps = isQuizTab ? quizPaginationProps : questionPaginationProps;

  return (
    <Container>
      <Header>
        <TabsContainer>
          <TabButton
            id="my-submissions-quizzes-tab"
            $isActive={isQuizTab}
            onClick={() => setActiveResourceType("quiz_template")}
          >
            {t("templates.submissions_tabs.quizzes")}
          </TabButton>

          <TabButton
            id="my-submissions-questions-tab"
            $isActive={!isQuizTab}
            onClick={() => setActiveResourceType("question_template")}
          >
            {t("templates.submissions_tabs.questions")}
          </TabButton>
        </TabsContainer>
      </Header>

      <SubmissionsTable
        key={activeResourceType}
        type={isQuizTab ? "quizzes" : "questions"}
        submissions={submissions}
        paginationProps={paginationProps}
        onPreview={(resourceId) => {
          const submission = activeSubmissions.find((item) => item.resourceId === resourceId);
          if (!submission) return;

          if (submission.resourceType === "quiz_template") {
            onPreviewQuiz(submission);
          } else {
            onPreviewQuestion(submission);
          }
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  background: ${(props) => props.theme.colors.light.white};
  border-radius: 32px;
  padding: 32px;
  margin: 0 16px;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 24px;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 32px;
`;

const TabButton = styled.div<{ $isActive: boolean }>`
  padding: 8px 0;
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => (
    props.$isActive ? props.theme.colors.green7 : props.theme.colors.dark.black
  )};
  cursor: pointer;
  border-bottom: 4px solid ${(props) => (
    props.$isActive ? props.theme.colors.green7 : "transparent"
  )};
  transition: all 0.2s ease;

  &:hover {
    border-bottom: 4px solid ${(props) => (
    props.$isActive ? props.theme.colors.green7 : props.theme.colors.light.paleGrey
  )};
    color: ${(props) => (
    props.$isActive ? props.theme.colors.green7 : props.theme.colors.dark.black
  )};
  }
`;
