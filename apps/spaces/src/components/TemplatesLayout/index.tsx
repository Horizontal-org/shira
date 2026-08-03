import { FunctionComponent, useEffect } from "react";
import {
  Body1,
  Button,
  H2,
  Sidebar,
  SubHeading2,
  SubHeading3,
  styled,
  useAdminSidebar,
  useTheme,
} from "@horizontal-org/shira-ui";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";
import { BsQuestionLg } from "react-icons/bs";
import { LuNotepadText } from "react-icons/lu";
import { useStore } from "../../store";
import { LayoutContainer } from "../LayoutStyleComponents/LayoutContainer";
import { LayoutMainContent, LayoutMainContentWrapper } from "../LayoutStyleComponents/LayoutMainContent";
import { MobileResponsivenessBanner } from "../MobileResponsivenessBanner";
import { customMenuItems } from "../../utils/customMenuItems";
import { usePublicLibrary } from "../../hooks/usePublicLibrary";
import { FiUpload } from "react-icons/fi";

interface Props { }

export const TemplatesLayout: FunctionComponent<Props> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isPublicLibraryEnabled } = usePublicLibrary();
  const theme = useTheme();

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
          <HeaderRow>
            <HeaderContainer>
              {space?.name && <StyledSubHeading3>{space.name}</StyledSubHeading3>}
              <H2>{t("templates.title")}</H2>
              <Body1>{t("templates.subtitle")}</Body1>
            </HeaderContainer>
            <Button
              id="templates-my-submissions-button"
              text={t("templates.my_submissions")}
              onClick={() => navigate("/template-library/my-submissions")}
              type="outline"
              leftIcon={<FiUpload size={20} color={theme.colors.dark.darkGrey} />}
            />
          </HeaderRow>

          <CardGrid>
            <TemplateCard onClick={() => navigate("/quiz/templates")}>
              <CardHeader>
                <CardIcon>
                  <LuNotepadText size={24} color={theme.colors.green7} />
                </CardIcon>
                <SubHeading2>{t("templates.quiz_templates.title")}</SubHeading2>
              </CardHeader>
              <Body1>{t("templates.quiz_templates.description")}</Body1>
            </TemplateCard>

            <TemplateCard onClick={() => navigate("/question/library")}>
              <CardHeader>
                <CardIcon>
                  <BsQuestionLg size={24} color={theme.colors.green7} />
                </CardIcon>
                <SubHeading2>{t("templates.question_templates.title")}</SubHeading2>
              </CardHeader>
              <Body1>{t("templates.question_templates.description")}</Body1>
            </TemplateCard>
          </CardGrid>
        </LayoutMainContentWrapper>
      </LayoutMainContent>
    </LayoutContainer>
  );
};

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 40px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const HeaderContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledSubHeading3 = styled(SubHeading3)`
  color: ${(props) => props.theme.colors.green7};
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 40px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const TemplateCard = styled.button`
  all: unset;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  padding: 28px;
  border: 1px solid ${(props) => props.theme.colors.green2};
  border-radius: 32px;
  background: ${(props) => props.theme.colors.light.white};
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.colors.green7};
    outline-offset: 4px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    gap: 24px;
    padding: 24px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CardIcon = styled.div`
  width: 56px;
  min-width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.light.paleGreen};
`;
