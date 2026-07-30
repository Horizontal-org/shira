import { FunctionComponent, useEffect, useState } from "react";
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
  DEFAULT_PAGE_LIMIT,
  getQuestionSubmissions,
  getQuizSubmissions,
  getQuizSubmissionDetail,
  getQuestionSubmissionDetail,
  type QuestionSubmissionDto,
  type QuizSubmissionDto,
  type QuizSubmissionDetailDto,
  type QuestionSubmissionDetailDto,
} from "../../fetch/submissions";
import { SubmissionPreviewModal } from "../modals/SubmissionPreviewModal";
import toast from "react-hot-toast";
import { TabContainer, type SubmissionResourceType } from "./components/TabContainer";
import { LayoutContainer } from "../LayoutStyleComponents/LayoutContainer";
import { LayoutMainContent, LayoutMainContentWrapper } from "../LayoutStyleComponents/LayoutMainContent";
import { MobileResponsivenessBanner } from "../MobileResponsivenessBanner";
import { customMenuItems } from "../../utils/customMenuItems";
import { usePublicLibrary } from "../../hooks/usePublicLibrary";
import { useStore } from "../../store";
import { usePaginationProps } from "../../hooks/usePaginationProps";
import { useSubmissions } from "./hooks/useSubmissions";

export const MySubmissionsLayout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { isPublicLibraryEnabled } = usePublicLibrary();
  const space = useStore((state) => state.space);

  const [quizPageIndex, setQuizPageIndex] = useState(0);
  const [questionPageIndex, setQuestionPageIndex] = useState(0);
  const [activeResourceType, setActiveResourceType] = useState<SubmissionResourceType>("quiz_template");
  const [previewQuiz, setPreviewQuiz] = useState<QuizSubmissionDetailDto | null>(null);
  const [previewQuestion, setPreviewQuestion] = useState<QuestionSubmissionDetailDto | null>(null);
  const quizSubmissions = useSubmissions(
    space?.publicId,
    quizPageIndex,
    getQuizSubmissions,
  );
  const questionSubmissions = useSubmissions(
    space?.publicId,
    questionPageIndex,
    getQuestionSubmissions,
  );

  const {
    isCollapsed,
    handleCollapse,
    menuItems,
  } = useAdminSidebar(navigate, customMenuItems.map((item) => ({
    ...item,
    label: t(item.label),
  })));

  useEffect(() => {
    if (!isPublicLibraryEnabled) {
      navigate("/dashboard", { replace: true });
    }
  }, [isPublicLibraryEnabled, navigate]);

  const quizPaginationProps = usePaginationProps({
    pageIndex: quizPageIndex,
    pageCount: quizSubmissions.pageCount,
    pageSize: DEFAULT_PAGE_LIMIT,
    setPageIndex: setQuizPageIndex,
    total: quizSubmissions.total,
  });
  const questionPaginationProps = usePaginationProps({
    pageIndex: questionPageIndex,
    pageCount: questionSubmissions.pageCount,
    pageSize: DEFAULT_PAGE_LIMIT,
    setPageIndex: setQuestionPageIndex,
    total: questionSubmissions.total,
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

  return (
    <LayoutContainer>
      <Sidebar
        menuItems={menuItems}
        onCollapse={handleCollapse}
        selectedItemLabel={menuItems.find((m) => m.path === "/template-library").label}
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
            quizSubmissions={quizSubmissions.submissions}
            questionSubmissions={questionSubmissions.submissions}
            quizPaginationProps={quizPaginationProps}
            questionPaginationProps={questionPaginationProps}
            onPreviewQuiz={handlePreviewQuiz}
            onPreviewQuestion={handlePreviewQuestion}
            activeResourceType={activeResourceType}
            onActiveResourceTypeChange={setActiveResourceType}
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
