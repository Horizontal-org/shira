import { Body1, H2, Sidebar, styled, SubHeading3, useAdminSidebar } from "@shira/ui";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutContainer } from "../LayoutStyleComponents/LayoutContainer";
import { LayoutMainContent, LayoutMainContentWrapper } from "../LayoutStyleComponents/LayoutMainContent";
import { useTranslation } from "react-i18next";
import { useStore } from "../../store";
import { shallow } from "zustand/shallow";
import { MobileResponsivenessBanner } from "../MobileResponsivenessBanner";
import HookedFish from "../../assets/HookedFish.svg";
import QuizEndFish from "../../assets/QuizEndFish.svg";

interface Props { }

export const LibraryLayout: FunctionComponent<Props> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isCollapsed, handleCollapse, menuItems } = useAdminSidebar(navigate);

  const { space } = useStore(
    (state) => ({ space: state.space }),
    shallow
  );

  const cards = [
    {
      title: t("library.cards.quizzes.title"),
      image: HookedFish,
      alt: "quizzes-illustration",
      onClick: () => navigate("/dashboard")
    },
    {
      title: t("library.cards.questions.title"),
      image: QuizEndFish,
      alt: "questions-illustration",
      onClick: () => navigate("/question/library")
    }
  ];

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

          <CardsGrid>
            {cards.map((card) => (
              <LibraryCard key={card.title} type="button" onClick={card.onClick}>
                <CardTitle>{card.title}</CardTitle>
                <CardIllustration src={card.image} />
              </LibraryCard>
            ))}
          </CardsGrid>
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

const CardsGrid = styled.div`
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const LibraryCard = styled.button`
  min-height: 248px;
  padding: 16px;
  border: none;
  border-radius: 20px;
  background: ${props => props.theme.colors.light.white};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
  text-align: left;
  overflow: hidden;
`;

const CardTitle = styled(SubHeading3)`
  margin: 0;
  color: ${props => props.theme.colors.dark.darkGrey};
`;

const CardIllustration = styled.img`
  width: 120px;
  height: auto;
  margin-top: 12px;
  margin-left: 72px;
  object-fit: contain;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 104px;
    margin-left: 40px;
  }
`;
