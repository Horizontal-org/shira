import { CardPagination, styled } from "@horizontal-org/shira-ui";
import { ComponentProps, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { SubmissionsTable, type SubmissionListItem } from "./SubmissionsTable";

export type SubmissionResourceType = "quiz_template" | "question_template";

type Props = {
  resourceType: SubmissionResourceType;
  submissions: SubmissionListItem[];
  paginationProps: ComponentProps<typeof CardPagination>;
  onPreview: (resourceId: string) => void;
  onActiveResourceTypeChange: (resourceType: SubmissionResourceType) => void;
};

export const TabContainer: FunctionComponent<Props> = ({
  resourceType,
  submissions,
  paginationProps,
  onPreview,
  onActiveResourceTypeChange,
}) => {
  const { t } = useTranslation();

  const isQuizTab = resourceType === "quiz_template";

  return (
    <Container>
      <Header>
        <TabsContainer>
          <TabButton
            id="my-submissions-quizzes-tab"
            $isActive={isQuizTab}
            onClick={() => onActiveResourceTypeChange("quiz_template")}
          >
            {t("templates.submissions_tabs.quizzes")}
          </TabButton>

          <TabButton
            id="my-submissions-questions-tab"
            $isActive={!isQuizTab}
            onClick={() => onActiveResourceTypeChange("question_template")}
          >
            {t("templates.submissions_tabs.questions")}
          </TabButton>
        </TabsContainer>
      </Header>

      <SubmissionsTable
        key={resourceType}
        type={isQuizTab ? "quizzes" : "questions"}
        submissions={submissions}
        paginationProps={paginationProps}
        onPreview={onPreview}
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
