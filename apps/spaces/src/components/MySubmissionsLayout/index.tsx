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
import { useTranslation } from "react-i18next";
import { FiArrowLeft } from "react-icons/fi";
import {
  getQuestionSubmission,
  getQuizSubmissions,
  getQuizSubmission,
  type QuestionSubmissionDto,
  type QuestionSubmissionDetailDto,
  type QuizSubmissionDto,
  type QuizSubmissionDetailDto,
} from "../../fetch/submissions";
import { TabContainer } from "./components/TabContainer";
import { LayoutContainer } from "../LayoutStyleComponents/LayoutContainer";
import { LayoutMainContent, LayoutMainContentWrapper } from "../LayoutStyleComponents/LayoutMainContent";
import { MobileResponsivenessBanner } from "../MobileResponsivenessBanner";
import { customMenuItems } from "../../utils/customMenuItems";
import { usePublicLibrary } from "../../hooks/usePublicLibrary";
import { SubmissionPreviewModal } from "../modals/SubmissionPreviewModal";

interface Props { }

export const MySubmissionsLayout: FunctionComponent<Props> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { isPublicLibraryEnabled } = usePublicLibrary();

  const [quizSubmissions, setQuizSubmissions] = useState<QuizSubmissionDto[]>([]);
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
    const getSubmissions = async () => {
      const quizData = await getQuizSubmissions();

      setQuizSubmissions(quizData);
    };

    getSubmissions();
  }, []);

  const handleQuizPreview = async (submission: QuizSubmissionDto) => {
    setPreviewQuiz(await getQuizSubmission(submission.id));
  };

  const handleQuestionPreview = async (submission: QuestionSubmissionDto) => {
    setPreviewQuestion(await getQuestionSubmission(submission.id));
  };

  const questionSubmissions = quizSubmissions.flatMap((quiz) => quiz.questions);

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
            <Body1>{t("templates.my_submissions_description_1")}</Body1>
            <Body1>{t("templates.my_submissions_description_2")}</Body1>
            <Body1>
              {t("templates.my_submissions_description_3")}{" "}
              <Link1 onClick={() => navigate("/support")}>
                {t("templates.help_center")}
              </Link1>.
            </Body1>
          </HeaderContainer>

          <TabContainer
            quizSubmissions={quizSubmissions}
            questionSubmissions={questionSubmissions}
            onQuizPreview={handleQuizPreview}
            onQuestionPreview={handleQuestionPreview}
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
