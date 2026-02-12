import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { H1, Body1, Button, styled, Navbar } from "@shira/ui";
import notFoundSvg from "../../../assets/404.svg";
import { useTranslation } from "react-i18next";

interface Props {
  onClick?: () => void;
}

export const InvalidInvitationLayout: FunctionComponent<Props> = ({
  onClick,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Container>
      <Navbar
        translatedTexts={{ home: "", about: "", menu: "", logIn: t('buttons.login'), createSpace: "Create Space" }}
        onNavigate={navigate}
      />

      <Body>
        <Content>
          <TextSection>
            <StyledH1>{t('reset_password.expired_title')}</StyledH1>
            <Body1>
              <strong>
                {t('reset_password.expired_description')}
              </strong>
            </Body1>
            <ButtonWrapper>
              <Button
                text={t('buttons.start_over')}
                type="outline"
                onClick={onClick}
              />
            </ButtonWrapper>
          </TextSection>

          <SvgWrapper>
            <img src={notFoundSvg} />
          </SvgWrapper>
        </Content>
      </Body>

      <Backshot />
    </Container>
  );
};

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  background: white;
`;

const Body = styled.div`
  z-index: 2;
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 24px 48px 24px 160px;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    padding: 16px;
    align-items: flex-start;
    padding-top: 40px;
  }
`;

const Content = styled.div`
  z-index: 2;
  width: 100%;
  max-width: 1400px;
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 24px;
    padding: 20px 0;
  }
`;

const TextSection = styled.div`
  min-width: 320px;
  max-width: 680px;
  display: flex;
  flex-direction: column;
  text-align: left;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    min-width: 0;
    text-align: center;
  }
`;

const StyledH1 = styled(H1)`
  padding-top: 45px;
  padding-bottom: 18px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding-top: 0;
  }
`;

const ButtonWrapper = styled.div`
  padding-top: 18px;
`;

const SvgWrapper = styled.div`
  min-width: 320px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  overflow: visible;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    min-width: 0;
    width: 100%;

    img {
      width: 500px;
      transform: none;
    }
  }
`;

const Backshot = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 480px;
  background: linear-gradient(180deg, ${(props) => props.theme.colors.blue1} 0%, ${(props) => props.theme.colors.blue4} 100%);
  pointer-events: none;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    height: 56%;
  }
`;
