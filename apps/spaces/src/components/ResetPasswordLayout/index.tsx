import { FunctionComponent, ReactNode } from "react";
import { Navbar, styled } from "@shira/ui";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import backgroundSvg from "../../assets/Background.svg";

interface Props {
  children: ReactNode;
}

export const ResetPasswordLayout: FunctionComponent<Props> = ({ children }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Container>
      <Navbar
        translatedTexts={{
          home: "",
          about: "",
          menu: "",
          logIn: t("login.login_header_button"),
          createSpace: "",
        }}
        onNavigate={navigate}
      />

      <ContentWrapper>
        <BackgroundPattern />
        <Content>{children}</Content>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  padding: 24px;
  display: flex;
  flex-direction: column;
  position: relative;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    padding: 16px;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 48px auto;
  width: 100%;
  height: auto;
`;

const BackgroundPattern = styled.div`
  background-image: url(${backgroundSvg});
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.15;
  pointer-events: none;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    display: none;
  }
`;
