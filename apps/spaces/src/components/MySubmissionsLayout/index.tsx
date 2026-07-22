import { FunctionComponent, useEffect, useState } from "react";
import type { RowSelectionState } from "@tanstack/react-table";
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
import { useTranslation } from "react-i18next";
import { FiArrowLeft } from "react-icons/fi";
import {
  getQuestionSubmissions,
  getQuestionSubmission,
  getQuizSubmissions,
  getQuizSubmission,
  type QuestionSubmissionDto,
  type QuestionSubmissionDetailDto,
  type QuizSubmissionDto,
  type QuizSubmissionDetailDto,
} from "../../fetch/submissions";
import { QuestionSubmissionsTab } from "./components/QuestionSubmissionsTab";
import { QuizSubmissionsTab } from "./components/QuizSubmissionsTab";
import { LayoutContainer } from "../LayoutStyleComponents/LayoutContainer";
import { LayoutMainContent, LayoutMainContentWrapper } from "../LayoutStyleComponents/LayoutMainContent";
import { MobileResponsivenessBanner } from "../MobileResponsivenessBanner";
import { customMenuItems } from "../../utils/customMenuItems";
import { usePublicLibrary } from "../../hooks/usePublicLibrary";
import { SubmissionPreviewModal } from "../modals/SubmissionPreviewModal";

type SubmissionTab = "quizzes" | "questions";

interface Props { }

const PAGE_SIZE = 20;

export const MySubmissionsLayout: FunctionComponent<Props> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isPublicLibraryEnabled } = usePublicLibrary();
  const [activeTab, setActiveTab] = useState<SubmissionTab>("quizzes");
  const [pageIndex, setPageIndex] = useState(0);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [quizSubmissions, setQuizSubmissions] = useState<QuizSubmissionDto[]>([]);
  const [questionSubmissions, setQuestionSubmissions] = useState<QuestionSubmissionDto[]>([]);
  const [previewQuiz, setPreviewQuiz] = useState<QuizSubmissionDetailDto | null>(null);
  const [previewQuestion, setPreviewQuestion] = useState<QuestionSubmissionDetailDto | null>(null);

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

  useEffect(() => {
    setPageIndex(0);
  }, [activeTab]);

  useEffect(() => {
    const getSubmissions = async () => {
      const [quizData, questionData] = await Promise.all([
        getQuizSubmissions(),
        getQuestionSubmissions(),
      ]);

      setQuizSubmissions(quizData);
      setQuestionSubmissions(questionData);
    };

    getSubmissions();
  }, []);

  const totalSubmissions = activeTab === "quizzes"
    ? quizSubmissions.length
    : questionSubmissions.length;
  const pageCount = Math.max(1, Math.ceil(totalSubmissions / PAGE_SIZE));
  const pageStart = pageIndex * PAGE_SIZE;
  const pageEnd = pageStart + PAGE_SIZE;

  const handleQuizPreview = async (submission: QuizSubmissionDto) => {
    setPreviewQuiz(await getQuizSubmission(submission.id));
  };

  const handleQuestionPreview = async (submission: QuestionSubmissionDto) => {
    setPreviewQuestion(await getQuestionSubmission(submission.id));
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
          <BackButton
            text={t("templates.back_to_templates")}
            type="outline"
            leftIcon={<FiArrowLeft size={18} />}
            onClick={() => navigate(-1)}
          />

          <HeaderContainer>
            <H2>{t("templates.my_submissions")}</H2>
            <Body1>{t("templates.my_submissions_description_1")}</Body1>
            <Body1>{t("templates.my_submissions_description_2")}</Body1>
            <Body1>
              {t("templates.my_submissions_description_3")}{" "}
              <Link1 type="button" onClick={() => navigate("/support")}>
                {t("templates.help_center")}
              </Link1>.
            </Body1>
          </HeaderContainer>

          <ContentCard>
            <TabsHeader>
              <TabsContainer>
                <TabButton
                  type="button"
                  $isActive={activeTab === "quizzes"}
                  onClick={() => setActiveTab("quizzes")}
                >
                  {t("templates.submissions_tabs.quizzes")}
                </TabButton>
                <TabButton
                  type="button"
                  $isActive={activeTab === "questions"}
                  onClick={() => setActiveTab("questions")}
                >
                  {t("templates.submissions_tabs.questions")}
                </TabButton>
              </TabsContainer>
            </TabsHeader>

            {activeTab === "quizzes" ? (
              <QuizSubmissionsTab
                submissions={quizSubmissions.slice(pageStart, pageEnd)}
                pageIndex={pageIndex}
                pageCount={pageCount}
                pageSize={PAGE_SIZE}
                total={totalSubmissions}
                setPageIndex={setPageIndex}
                rowSelection={rowSelection}
                setRowSelection={setRowSelection}
                onPreview={handleQuizPreview}
              />
            ) : (
              <QuestionSubmissionsTab
                submissions={questionSubmissions.slice(pageStart, pageEnd)}
                pageIndex={pageIndex}
                pageCount={pageCount}
                pageSize={PAGE_SIZE}
                total={totalSubmissions}
                setPageIndex={setPageIndex}
                rowSelection={rowSelection}
                setRowSelection={setRowSelection}
                onPreview={handleQuestionPreview}
              />
            )}
          </ContentCard>

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

const BackButton = styled(Button)`
  width: fit-content;
  margin: 16px 16px 24px;
`;

const HeaderContainer = styled.div`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 1200px;
  margin-bottom: 40px;
`;

const ContentCard = styled.div`
  background: ${(props) => props.theme.colors.light.white};
  border-radius: 32px;
  padding: 32px;
  margin: 0 16px;
  box-sizing: border-box;
`;

const TabsHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 24px;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 32px;
`;

const TabButton = styled.button<{ $isActive: boolean }>`
  all: unset;
  cursor: pointer;
  padding-bottom: 8px;
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => (
    props.$isActive ? props.theme.colors.green7 : props.theme.colors.dark.black
  )};
  border-bottom: 4px solid ${(props) => (
    props.$isActive ? props.theme.colors.green7 : "transparent"
  )};
  transition: all 0.2s ease;

  &:hover {
    border-bottom: 4px solid ${(props) => (
    props.$isActive ? props.theme.colors.green7 : props.theme.colors.dark.lightGrey
  )};
    color: ${(props) => (
    props.$isActive ? props.theme.colors.green7 : props.theme.colors.dark.black
  )};
  }
`;
