import { useCallback, useEffect, useState } from "react";
import {
  Body1,
  Button,
  H2,
  Link1,
  Sidebar,
  styled,
  useAdminSidebar,
} from "@horizontal-org/shira-ui";
import { useNavigate } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { FiArrowLeft } from "react-icons/fi";
import {
  getQuestionSubmissions,
  getQuizSubmissions,
  getQuizSubmissionDetail,
  getQuestionSubmissionDetail,
  type QuestionSubmissionDto,
  type QuizSubmissionDto,
  type QuizSubmissionDetailDto,
  type QuestionSubmissionDetailDto,
  type SubmissionsPageDto,
} from "../../fetch/submissions";
import { SubmissionPreviewModal } from "../modals/SubmissionPreviewModal";
import { TabContainer } from "./components/TabContainer";
import { LayoutContainer } from "../LayoutStyleComponents/LayoutContainer";
import {
  LayoutMainContent,
  LayoutMainContentWrapper,
} from "../LayoutStyleComponents/LayoutMainContent";
import { MobileResponsivenessBanner } from "../MobileResponsivenessBanner";
import { customMenuItems } from "../../utils/customMenuItems";
import { usePublicLibrary } from "../../hooks/usePublicLibrary";
import { useStore } from "../../store";
import { usePaginationProps } from "../../hooks/usePaginationProps";
import { useSubmissions } from "./hooks/useSubmissions";
import type { SubmissionListItem } from "./components/SubmissionsTable";

export const MySubmissionsLayout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { isPublicLibraryEnabled } = usePublicLibrary();
  const space = useStore((state) => state.space);

  const [pageIndex, setPageIndex] = useState(0);
  const [activeResourceType, setActiveResourceType] =
    useState<"quiz_template" | "question_template">("quiz_template");
  const [previewQuiz, setPreviewQuiz] = useState<QuizSubmissionDetailDto | null>(null);
  const [previewQuestion, setPreviewQuestion] = useState<QuestionSubmissionDetailDto | null>(null);
  const fetchSubmissions = useCallback((spaceId: string, params: { page: number })
    : Promise<
      SubmissionsPageDto<QuizSubmissionDto | QuestionSubmissionDto>
    > =>
    activeResourceType === "quiz_template"
      ? getQuizSubmissions(spaceId, params)
      : getQuestionSubmissions(spaceId, params),
    [activeResourceType],
  );
  const submissionsResult = useSubmissions(
    space?.publicId,
    pageIndex,
    fetchSubmissions,
  );

  const { isCollapsed, handleCollapse, menuItems } = useAdminSidebar(
    navigate,
    customMenuItems.map((item) => ({
      ...item,
      label: t(item.label),
    })),
  );

  useEffect(() => {
    if (!isPublicLibraryEnabled) {
      navigate("/dashboard", { replace: true });
    }
  }, [isPublicLibraryEnabled, navigate]);

  const paginationProps = usePaginationProps({
    pageIndex,
    pageCount: submissionsResult.pageCount,
    pageSize: submissionsResult.limit,
    setPageIndex,
    total: submissionsResult.total,
  });

  const handlePreviewQuiz = async (submission: QuizSubmissionDto) => {
    try {
      setPreviewQuestion(null);
      setPreviewQuiz(await getQuizSubmissionDetail(submission));
    } catch (error) {
      console.error("Failed to load quiz submission preview:", error);
    }
  };

  const handlePreviewQuestion = async (submission: QuestionSubmissionDto) => {
    try {
      setPreviewQuiz(null);
      setPreviewQuestion(await getQuestionSubmissionDetail(submission));
    } catch (error) {
      console.error("Failed to load question submission preview:", error);
    }
  };

  const activeSubmissions: SubmissionListItem[] =
    activeResourceType === "quiz_template"
      ? submissionsResult.submissions
        .filter(
          (submission): submission is QuizSubmissionDto =>
            submission.resourceType === "quiz_template",
        )
        .map((submission) => ({
          resourceId: submission.resourceId,
          name: submission.quizTitle,
          dateSubmitted: submission.dateSubmitted,
          status: submission.status,
        }))
      : submissionsResult.submissions
        .filter(
          (submission): submission is QuestionSubmissionDto =>
            submission.resourceType === "question_template",
        )
        .map((submission) => ({
          resourceId: submission.resourceId,
          name: submission.questionName,
          dateSubmitted: submission.dateSubmitted,
          status: submission.status,
        }));
  const handlePreview = (resourceId: string) => {
    const submission = submissionsResult.submissions.find(
      (item) => item.resourceId === resourceId,
    );
    if (!submission) return;

    if (activeResourceType === "quiz_template") {
      if (submission.resourceType === "quiz_template")
        handlePreviewQuiz(submission);
      return;
    }

    if (submission.resourceType === "question_template")
      handlePreviewQuestion(submission);
  };

  const handleActiveResourceTypeChange = (
    resourceType: "quiz_template" | "question_template",
  ) => {
    setActiveResourceType(resourceType);
    setPageIndex(0);
  };

  return (
    <LayoutContainer>
      <Sidebar
        menuItems={menuItems}
        onCollapse={handleCollapse}
        selectedItemLabel={
          menuItems.find((m) => m.path === "/template-library").label
        }
      />

      <LayoutMainContent $isCollapsed={isCollapsed}>
        <MobileResponsivenessBanner />

        <LayoutMainContentWrapper>
          <Button
            text={t("templates.back_to_templates")}
            type="outline"
            leftIcon={<FiArrowLeft size={18} />}
            onClick={() => navigate("/template-library")}
          />

          <HeaderContainer>
            <H2>{t("templates.my_submissions")}</H2>
            <Body1>
              <Trans
                i18nKey="templates.my_submissions_description"
                components={{
                  learnMore: <Link1 onClick={() => navigate("/support")} />,
                }}
              />
            </Body1>
          </HeaderContainer>

          <TabContainer
            resourceType={activeResourceType}
            submissions={activeSubmissions}
            paginationProps={paginationProps}
            onPreview={handlePreview}
            onActiveResourceTypeChange={handleActiveResourceTypeChange}
          />
          <SubmissionPreviewModal
            quiz={previewQuiz}
            question={previewQuestion}
            onClose={() => {
              setPreviewQuiz(null);
              setPreviewQuestion(null);
            }}
          />
        </LayoutMainContentWrapper>
      </LayoutMainContent>
    </LayoutContainer>
  );
};

const HeaderContainer = styled.div`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
  margin-bottom: 30px;
`;
