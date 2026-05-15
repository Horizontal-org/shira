import { Body1, H2, Sidebar, styled, SubHeading3, useAdminSidebar } from "@shira/ui";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutContainer } from "../LayoutStyleComponents/LayoutContainer";
import { LayoutMainContent, LayoutMainContentWrapper } from "../LayoutStyleComponents/LayoutMainContent";
import { t } from "i18next";
import { useStore } from "../../store";
import { shallow } from "zustand/shallow";
import { MobileResponsivenessBanner } from "../MobileResponsivenessBanner";

interface Props { }

export const LibraryLayout: FunctionComponent<Props> = () => {
  const navigate = useNavigate();
  const { isCollapsed, handleCollapse, menuItems } = useAdminSidebar(navigate);

  const { space, subscription } = useStore(
    (state) => ({ space: state.space, subscription: state.subscription }),
    shallow
  );

  return (
    <LayoutContainer>
      <Sidebar
        menuItems={menuItems}
        onCollapse={handleCollapse}
        selectedItemLabel={menuItems.find(m => m.path === '/library').label}
      />

      <LayoutMainContent $isCollapsed={isCollapsed}>
        <MobileResponsivenessBanner />

        <LayoutMainContentWrapper>
          <HeaderContainer>
            <StyledSubHeading3>{space && space.name}</StyledSubHeading3>
            <H2>{t("library.title")}</H2>
            <Body1>{t("library.subtitle")}</Body1>
          </HeaderContainer>
        </LayoutMainContentWrapper>

      </LayoutMainContent>
    </LayoutContainer>
  );
};

const StyledSubHeading3 = styled(SubHeading3)`
  color: ${props => props.theme.colors.green7};
`;

const HeaderContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
