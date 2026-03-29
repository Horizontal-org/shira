import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Body1,
  Button,
  H1,
  Navbar,
  styled,
} from "@shira/ui";
import FullFish from "../CreateSpaceLayout/components/CreateSpaceSuccess/assets/FullFish";

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
        <Wrapper>
          <SvgWrapper>
            <FullFish />
          </SvgWrapper>

          <TextContent>
            <H1>All done!</H1>
            <Body1>
              <strong>Your checkout was successful. We&apos;re activating your subscription now.</strong>
            </Body1>
            <ButtonGroup>
              <Button
                text="Go to settings"
                type="outline"
                onClick={() => navigate("/settings")}
              />
              <Button
                text="Back to dashboard"
                onClick={() => navigate("/dashboard")}
              />
            </ButtonGroup>
          </TextContent>
        </Wrapper>
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
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    padding: 16px;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  width: 1120px;

  @media(max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    flex-direction: column;

    button {
      width: 100%;
      justify-content: center;
    }
  }
`;

const SvgWrapper = styled.div`
  > svg {
    width: 500px;

    @media(max-width: ${(props) => props.theme.breakpoints.sm}) {
      > svg {
        width: 100%;
      }
    }
  }
`;
