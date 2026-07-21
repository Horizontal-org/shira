import { FunctionComponent, useEffect, useMemo, useState } from "react";
import type { RowSelectionState, ColumnDef } from "@tanstack/react-table";
import {
  Body1,
  Button,
  CardPagination,
  EmptyState,
  H2,
  Link1,
  Sidebar,
  SubHeading3,
  useTheme,
  Table,
  styled,
  useAdminSidebar,
} from "@horizontal-org/shira-ui";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";
import { FiArrowLeft } from "react-icons/fi";
import { useStore } from "../../store";
import { LayoutContainer } from "../LayoutStyleComponents/LayoutContainer";
import { LayoutMainContent, LayoutMainContentWrapper } from "../LayoutStyleComponents/LayoutMainContent";
import { MobileResponsivenessBanner } from "../MobileResponsivenessBanner";
import { InactiveLibraryPaginationContainer } from "../TemplatePaginationWrapper";
import { customMenuItems } from "../../utils/customMenuItems";
import { usePublicLibrary } from "../../hooks/usePublicLibrary";

type SubmissionTab = "quizzes" | "questions";
type QuizSubmissionRow = {
  id: string;
  name: string;
  submittedOn: string;
  status: string;
};
type QuestionSubmissionRow = {
  id: string;
  name: string;
  type: string;
  app: string;
  submittedOn: string;
  status: string;
};

interface Props { }

export const MySubmissionsLayout: FunctionComponent<Props> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isPublicLibraryEnabled } = usePublicLibrary();
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<SubmissionTab>("quizzes");
  const [pageIndex, setPageIndex] = useState(0);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const { space } = useStore((state) => ({
    space: state.space,
  }), shallow);

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

  const emptyStateCopy = useMemo(() => (
    activeTab === "quizzes"
      ? {
        subtitle: t("templates.submissions_empty_state.quizzes.subtitle"),
      }
      : {
        subtitle: t("templates.submissions_empty_state.questions.subtitle"),
      }
  ), [activeTab, t]);

  const quizSubmissions = useMemo<QuizSubmissionRow[]>(() => [], []);
  const questionSubmissions = useMemo<QuestionSubmissionRow[]>(() => [], []);

  const quizColumns = useMemo<ColumnDef<QuizSubmissionRow>[]>(() => ([
    {
      header: t("templates.submissions_table.quiz_name"),
      accessorKey: "name",
    },
    {
      header: t("templates.submissions_table.submitted_on"),
      accessorKey: "submittedOn",
    },
    {
      header: t("templates.submissions_table.status"),
      accessorKey: "status",
    },
  ]), [t]);

  const questionColumns = useMemo<ColumnDef<QuestionSubmissionRow>[]>(() => ([
    {
      header: t("templates.submissions_table.question_name"),
      accessorKey: "name",
    },
    {
      header: t("templates.submissions_table.type"),
      accessorKey: "type",
    },
    {
      header: t("templates.submissions_table.app"),
      accessorKey: "app",
    },
    {
      header: t("templates.submissions_table.submitted_on"),
      accessorKey: "submittedOn",
    },
    {
      header: t("templates.submissions_table.status"),
      accessorKey: "status",
    },
  ]), [t]);

  const tableConfig = useMemo(() => {
    if (activeTab === "quizzes") {
      return {
        data: quizSubmissions,
        columns: quizColumns,
        colGroups: (
          <colgroup>
            <col style={{ width: "50%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "25%" }} />
          </colgroup>
        ),
      };
    }

    return {
      data: questionSubmissions,
      columns: questionColumns,
      colGroups: (
        <colgroup>
          <col style={{ width: "34%" }} />
          <col style={{ width: "16%" }} />
          <col style={{ width: "16%" }} />
          <col style={{ width: "18%" }} />
          <col style={{ width: "16%" }} />
        </colgroup>
      ),
    };
  }, [activeTab, questionColumns, questionSubmissions, quizColumns, quizSubmissions]);

  const hasSubmissions = tableConfig.data.length > 0;

  return (
    <LayoutContainer>
      <Sidebar
        menuItems={menuItems}
        onCollapse={handleCollapse}
        selectedItemLabel={menuItems.find((m) => m.path === "/library").label}
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

            {hasSubmissions ? (
              <>
                <InactiveLibraryPaginationContainer>
                  <CardPagination
                    pageIndex={pageIndex}
                    pageCount={1}
                    pageSize={20}
                    total={0}
                    onFirstPage={() => setPageIndex(0)}
                    onPreviousPage={() => setPageIndex(0)}
                    onNextPage={() => setPageIndex(0)}
                    onLastPage={() => setPageIndex(0)}
                  />
                </InactiveLibraryPaginationContainer>

                <TableWrapper>
                  <Table
                    size="full"
                    loading={false}
                    data={tableConfig.data}
                    columns={tableConfig.columns}
                    rowSelection={rowSelection}
                    setRowSelection={setRowSelection}
                    enableRowSelection={false}
                    enablePagination={false}
                    enableRowHover={false}
                    colGroups={tableConfig.colGroups}
                  />
                </TableWrapper>

                <InactiveLibraryPaginationContainer>
                  <CardPagination
                    pageIndex={pageIndex}
                    pageCount={1}
                    pageSize={20}
                    total={0}
                    onFirstPage={() => setPageIndex(0)}
                    onPreviousPage={() => setPageIndex(0)}
                    onNextPage={() => setPageIndex(0)}
                    onLastPage={() => setPageIndex(0)}
                  />
                </InactiveLibraryPaginationContainer>
              </>
            ) : (
              <EmptyStateWrapper>
                <EmptyState
                  subtitle={emptyStateCopy.subtitle}
                  buttons={(
                    <Button
                      text={t("templates.submissions_empty_state.learn_more")}
                      type="primary"
                      color={theme.colors.green7}
                      onClick={() => navigate("/library")}
                    />
                  )}
                />
              </EmptyStateWrapper>
            )}
          </ContentCard>
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

const StyledSubHeading3 = styled(SubHeading3)`
  color: ${(props) => props.theme.colors.green7};
`;

const Description = styled(Body1)`
  color: ${(props) => props.theme.colors.dark.darkGrey};
  line-height: 1.6;
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

const TableWrapper = styled.div`
  overflow: hidden;
`;

const EmptyStateWrapper = styled.div`
  min-height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
