import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import {
  H2,
  SubHeading3,
  Button,
  styled,
  Navbar,
} from "@shira/ui";
import successSvg from "../../assets/QuizEndFish.svg";

interface Props {}

export const CheckoutSuccessLayout: FunctionComponent<Props> = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Navbar
        translatedTexts={{ home: "", about: "", menu: "", logIn: "Log in", createSpace: "" }}
        onNavigate={navigate}
      />
      <ContentWrapper>
        <Content>
          <LeftSection>
            <Header>
              <H2>Your checkout was successful.</H2>
              <SubHeading3>
                Your subscription is being activated. You can head back to settings to review your plan,
                or return to the dashboard and keep working.
              </SubHeading3>
            </Header>

            <ButtonContainer>
              <Button
                text="Go to settings"
                onClick={() => navigate("/settings")}
              />
              <Button
                text="Back to dashboard"
                type="outline"
                onClick={() => navigate("/dashboard")}
              />
            </ButtonContainer>
          </LeftSection>

          <RightSection>
            <IllustrationCard>
              <img src={successSvg} alt="Checkout successful" />
            </IllustrationCard>
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
  background:
    radial-gradient(circle at top left, rgba(212, 242, 255, 0.9), transparent 36%),
    linear-gradient(180deg, #f6fbff 0%, #ffffff 55%, #e4f7ef 100%);
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 24px 56px;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    align-items: flex-start;
    padding: 24px 16px 40px;
  }
`;

const Content = styled.div`
  width: 100%;
  max-width: 1120px;
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
  gap: 40px;
  align-items: center;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`;

const LeftSection = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(105, 194, 232, 0.25);
  border-radius: 32px;
  padding: 40px;
  box-shadow: 0 24px 60px rgba(50, 84, 116, 0.12);
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    padding: 28px 20px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    flex-direction: column;

    button {
      width: 100%;
      justify-content: center;
    }
  }
`;

const RightSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IllustrationCard = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 28px;
  border-radius: 36px;
  background: linear-gradient(180deg, #d4f2ff 0%, #91d8f3 100%);
  box-shadow: 0 24px 60px rgba(55, 118, 149, 0.18);

  img {
    display: block;
    width: 100%;
    height: auto;
  }
`;
