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
  DEFAULT_SUBMISSIONS_PAGE_LIMIT,
  getQuestionSubmissions,
  getQuizSubmissions,
  type QuestionSubmissionDto,
  type QuizSubmissionDto,
  type SubmissionsPageDto,
} from "../../fetch/submissions";
import { TabContainer } from "./components/TabContainer";
import { LayoutContainer } from "../LayoutStyleComponents/LayoutContainer";
import { LayoutMainContent, LayoutMainContentWrapper } from "../LayoutStyleComponents/LayoutMainContent";
import { MobileResponsivenessBanner } from "../MobileResponsivenessBanner";
import { customMenuItems } from "../../utils/customMenuItems";
import { usePublicLibrary } from "../../hooks/usePublicLibrary";
import { useStore } from "../../store";
import { usePaginationProps } from "../../hooks/usePaginationProps";

interface Props { }

export const MySubmissionsLayout: FunctionComponent<Props> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { isPublicLibraryEnabled } = usePublicLibrary();
  const space = useStore((state) => state.space);

  const [quizSubmissions, setQuizSubmissions] = useState<SubmissionsPageDto<QuizSubmissionDto>>({
    data: [], total: 0, page: 1, limit: DEFAULT_SUBMISSIONS_PAGE_LIMIT,
  });
  const [questionSubmissions, setQuestionSubmissions] = useState<SubmissionsPageDto<QuestionSubmissionDto>>({
    data: [], total: 0, page: 1, limit: DEFAULT_SUBMISSIONS_PAGE_LIMIT,
  });
  const [quizPageIndex, setQuizPageIndex] = useState(0);
  const [questionPageIndex, setQuestionPageIndex] = useState(0);

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
      if (!space?.slug) {
        setQuizSubmissions({ data: [], total: 0, page: 1, limit: DEFAULT_SUBMISSIONS_PAGE_LIMIT });
        setQuestionSubmissions({ data: [], total: 0, page: 1, limit: DEFAULT_SUBMISSIONS_PAGE_LIMIT });
        return;
      }

      try {
        const [quizData, questionData] = await Promise.all([
          getQuizSubmissions(space.slug, { page: quizPageIndex + 1 }),
          getQuestionSubmissions(space.slug, { page: questionPageIndex + 1 }),
        ]);

        setQuizSubmissions(quizData);
        setQuestionSubmissions(questionData);
        setQuizPageIndex(Math.max(0, quizData.page - 1));
        setQuestionPageIndex(Math.max(0, questionData.page - 1));
      } catch (error) {
        console.error("Error fetching author submissions:", error);
        setQuizSubmissions({ data: [], total: 0, page: 1, limit: DEFAULT_SUBMISSIONS_PAGE_LIMIT });
        setQuestionSubmissions({ data: [], total: 0, page: 1, limit: DEFAULT_SUBMISSIONS_PAGE_LIMIT });
      }
    };

    getSubmissions();
  }, [space?.slug, quizPageIndex, questionPageIndex]);

  const quizPaginationProps = usePaginationProps({
    pageIndex: quizPageIndex,
    pageCount: Math.max(1, Math.ceil(quizSubmissions.total / quizSubmissions.limit)),
    pageSize: quizSubmissions.limit,
    setPageIndex: setQuizPageIndex,
    total: quizSubmissions.total,
  });
  const questionPaginationProps = usePaginationProps({
    pageIndex: questionPageIndex,
    pageCount: Math.max(1, Math.ceil(questionSubmissions.total / questionSubmissions.limit)),
    pageSize: questionSubmissions.limit,
    setPageIndex: setQuestionPageIndex,
    total: questionSubmissions.total,
  });

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
            quizSubmissions={quizSubmissions}
            questionSubmissions={questionSubmissions}
            quizPaginationProps={quizPaginationProps}
            questionPaginationProps={questionPaginationProps}
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
