import { CardPagination, styled } from "@horizontal-org/shira-ui";
import { ComponentProps, FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import type { QuestionSubmissionDto, QuizSubmissionDto } from "../../../fetch/submissions";
import {
  mapQuestionSubmissionToListItem,
  mapQuizSubmissionToListItem,
} from "../../../fetch/submission_mappers";
import { SubmissionsTable, type SubmissionListItem } from "./SubmissionsTable";

export type SubmissionResourceType = "quiz_template" | "question_template";

type Props = {
  questionSubmissions: QuestionSubmissionDto[];
  quizSubmissions: QuizSubmissionDto[];
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
  const [activeResourceType, setActiveResourceType] = useState<SubmissionResourceType>("quiz_template");

  const isQuizTab = activeResourceType === "quiz_template";
  const paginationProps = isQuizTab
    ? quizPaginationProps
    : questionPaginationProps;

  const submissions: SubmissionListItem[] = isQuizTab
    ? quizSubmissions.map(mapQuizSubmissionToListItem)
    : questionSubmissions.map(mapQuestionSubmissionToListItem);

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
          if (isQuizTab) {
            const submission = quizSubmissions.find(
              (item) => item.resourceId === resourceId,
            );
            if (submission) onPreviewQuiz(submission);
            return;
          }

          const submission = questionSubmissions.find(
            (item) => item.resourceId === resourceId,
          );
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
  color: ${(props) =>
    props.$isActive
      ? props.theme.colors.green7
      : props.theme.colors.dark.black};
  cursor: pointer;
  border-bottom: 4px solid
    ${(props) => (props.$isActive ? props.theme.colors.green7 : "transparent")};
  transition: all 0.2s ease;

  &:hover {
    border-bottom: 4px solid
      ${(props) =>
    props.$isActive
      ? props.theme.colors.green7
      : props.theme.colors.light.paleGrey};
    color: ${(props) =>
    props.$isActive
      ? props.theme.colors.green7
      : props.theme.colors.dark.black};
  }
`;
