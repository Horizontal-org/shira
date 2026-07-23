import { styled } from "@horizontal-org/shira-ui";
import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import type { QuestionSubmissionDto, QuizSubmissionDto } from "../../../fetch/submissions";
import { SubmissionsTable, type SubmissionListItem } from "./SubmissionsTable";

type TabType = "quizzes" | "questions";

type Props = {
  questionSubmissions: QuestionSubmissionDto[];
  quizSubmissions: QuizSubmissionDto[];
  onQuestionPreview: (submission: QuestionSubmissionDto) => void;
  onQuizPreview: (submission: QuizSubmissionDto) => void;
};

export const TabContainer: FunctionComponent<Props> = ({
  questionSubmissions,
  quizSubmissions,
  onQuestionPreview,
  onQuizPreview,
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabType>("quizzes");

  const submissions: SubmissionListItem[] = activeTab === "quizzes"
    ? quizSubmissions.map((submission) => ({
      name: submission.title,
      dateSubmitted: submission.dateSubmitted,
      status: submission.status,
      preview: () => onQuizPreview(submission),
    }))
    : questionSubmissions.map((submission) => ({
      name: submission.questionName,
      dateSubmitted: submission.dateSubmitted,
      status: submission.status,
      preview: () => onQuestionPreview(submission),
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
    props.$isActive ? props.theme.colors.green7 : "#ccc"
  )};
    color: ${(props) => (
    props.$isActive ? props.theme.colors.green7 : props.theme.colors.dark.black
  )};
  }
`;
