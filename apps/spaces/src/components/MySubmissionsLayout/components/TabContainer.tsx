import { CardPagination, styled } from "@horizontal-org/shira-ui";
import { ComponentProps, FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import type { QuestionSubmissionDto, QuizSubmissionDto } from "../../../fetch/submissions";
import { SubmissionsTable, type SubmissionListItem } from "./SubmissionsTable";

type TabType = "quizzes" | "questions";

type Props = {
  questionSubmissions: QuestionSubmissionDto[];
  quizSubmissions: QuizSubmissionDto[];
  questionPaginationProps: ComponentProps<typeof CardPagination>;
  quizPaginationProps: ComponentProps<typeof CardPagination>;
  onPreviewQuiz: (submission: QuizSubmissionDto) => void;
  onPreviewQuestion: (submission: QuestionSubmissionDto) => void;
};

export const TabContainer: FunctionComponent<Props> = ({
  questionSubmissions,
  quizSubmissions,
  questionPaginationProps,
  quizPaginationProps,
  onPreviewQuiz,
  onPreviewQuestion,
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabType>("quizzes");

  const submissions: SubmissionListItem[] =
    activeTab === "quizzes"
      ? quizSubmissions.map((submission) => ({
        resourceId: submission.resourceId,
        name: submission.title,
        dateSubmitted: submission.dateSubmitted,
        status: submission.status,
      }))
      : questionSubmissions.map((submission) => ({
        resourceId: submission.resourceId,
        name: submission.questionName,
        dateSubmitted: submission.dateSubmitted,
        status: submission.status,
      }));

  return (
    <Container>
      <Header>
        <TabsContainer>
          <TabButton
            id="my-submissions-quizzes-tab"
            $isActive={activeTab === "quizzes"}
            onClick={() => setActiveTab("quizzes")}
          >
            {t("templates.submissions_tabs.quizzes")}
          </TabButton>

          <TabButton
            id="my-submissions-questions-tab"
            $isActive={activeTab === "questions"}
            onClick={() => setActiveTab("questions")}
          >
            {t("templates.submissions_tabs.questions")}
          </TabButton>
        </TabsContainer>
      </Header>

      <SubmissionsTable
        key={activeTab}
        type={activeTab}
        submissions={submissions}
        paginationProps={activeTab === "quizzes" ? quizPaginationProps : questionPaginationProps}
        onPreview={(resourceId) => {
          if (activeTab === "quizzes") {
            const submission = quizSubmissions.find((item) => item.resourceId === resourceId);
            if (submission) onPreviewQuiz(submission);
            return;
          }

          const submission = questionSubmissions.find((item) => item.resourceId === resourceId);
          if (submission) onPreviewQuestion(submission);
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
