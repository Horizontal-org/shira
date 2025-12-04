import { FunctionComponent } from "react";
import { LayoutMainContent, LayoutMainContentWrapper } from "../LayoutStyleComponents/LayoutMainContent";
import { BetaBanner, Body1, H2, Sidebar, styled, SubHeading3, useAdminSidebar } from "@shira/ui";
import { LayoutContainer } from "../LayoutStyleComponents/LayoutContainer";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store";
import { shallow } from "zustand/shallow";
import { LearnersTable } from "../LearnersTable";

interface Props {}

export const LearnersLayout:FunctionComponent<Props> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isCollapsed, handleCollapse, menuItems } = useAdminSidebar(navigate)
  const {
    space,
  } = useStore((state) => ({
    space: state.space,
  }), shallow)


  return (
    <LayoutContainer>
      <Sidebar
        menuItems={menuItems}
        onCollapse={handleCollapse}
      />

      <LayoutMainContent $isCollapsed={isCollapsed}>
        <BetaBanner url="/support" />
        <LayoutMainContentWrapper>
          <HeaderContainer>
            <StyledSubHeading3>{space && space.name}</StyledSubHeading3>
            <H2>{t('learners.title')}</H2>
            <Body1>{t('learners.subtitle')}</Body1>
          </HeaderContainer>
          <div>
            <LearnersTable />
          </div>
        </LayoutMainContentWrapper>
      </LayoutMainContent>
    </LayoutContainer>
  )
}


const StyledSubHeading3 = styled(SubHeading3)`
  color: ${props => props.theme.colors.green7}; 
`

const HeaderContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`