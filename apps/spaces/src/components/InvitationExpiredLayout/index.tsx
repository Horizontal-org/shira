import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import {
  H2,
  SubHeading3,
  Button,
  styled,
  Navbar
} from "@shira/ui";
import notFoundSvg from "../../assets/404.svg";

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
        <Content>
          <LeftSection>
            <Header>
              <H2>The invitation has already been used.</H2>
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
          </LeftSection>

          <RightSection>
            <SvgContainer>
              <img src={notFoundSvg} alt="Invitation already used" />
            </SvgContainer>
          </RightSection>
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
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    position: relative;
    background: white;

    &::after {
        content: '';
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50vh;
        background: linear-gradient(to bottom, #D4F2FF 0%, #69C2E8 100%);
        z-index: 0;
    }

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
        padding: 16px;
        align-items: flex-start;
        padding-top: 48px;
        flex-direction: column;
    }
`;

const Content = styled.div`
    display: flex;
    align-items: center;
    gap: 60px;
    max-width: 1200px;
    width: 100%;
    position: relative;
    z-index: 1;
    padding: 60px 0;

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
        flex-direction: column;
        gap: 32px;
        text-align: center;
        padding: 40px 0;
    }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 32px;
  text-align: left;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    text-align: center;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    margin-top: 32px;
  }
`;

const SvgContainer = styled.div`
  max-width: 400px;
  width: 100%;

  img {
    width: 100%;
    height: auto;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    justify-content: center;
    width: 100%;

    button {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;