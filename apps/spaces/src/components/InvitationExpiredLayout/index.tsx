import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import {
  H1,
  SubHeading3,
  Button,
  styled,
  Navbar
} from "@shira/ui";
import backgroundSvg from "../../assets/Background.svg";

interface Props {}

export const InvitationExpiredLayout: FunctionComponent<Props> = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Navbar
        translatedTexts={{home: "", about: "", menu: "", logIn: "Log in", createSpace: "Create Space"}}
        onNavigate={navigate}
      />
      <ContentWrapper>
        <BackgroundPattern />
        <Content>
          <Header>
            <H1>The invitation has already been used.</H1>
            <SubHeading3>
              Log in to access your space or contact us if you are having trouble accessing your space: contact@wearehorizontal.org
            </SubHeading3>
          </Header>

          <ButtonContainer>
            <Button
              text="Log in"
              type="outline"
              onClick={() => navigate('/login')}
            />
          </ButtonContainer>
        </Content>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: white;
    position: relative;
    height: auto;
    padding-bottom: 16px;
    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
        padding-bottom: 0;
    }
`;

const ContentWrapper = styled.div`
    padding: 24px;
    flex: 1;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: auto;

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
        padding: 16px;
        align-items: flex-start;
        padding-top: 48px;
    }
`;

const Content = styled.div`
    position: relative;
    z-index: 1;
    text-align: center;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    margin: 48px auto;
    width: 100%;
    height: auto;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 100%;

    button {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;