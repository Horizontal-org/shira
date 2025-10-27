import { FunctionComponent, useEffect, useState } from "react";
import {
  Form,
  Link1,
  Button,
  TextInput,
  styled,
  Navbar
} from "@shira/ui";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import shallow from "zustand/shallow";
import { useStore } from "../../store";
import backgroundSvg from '../../assets/Background.svg';

interface Props { }

export const LoginLayout: FunctionComponent<Props> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { user, login } = useStore(
    (state) => ({
      user: state.user,
      login: state.login,
    }),
    shallow
  );

  const [email, handleEmail] = useState("");
  const [pass, handlePass] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const description = (
    <>
      {t('login.subtitle')}
      <Link1 href="mailto:contact@wearehorizontal.org"> contact@wearehorizontal.org</Link1>
    </>
  );
  return (
    <Container>
      <Navbar
        translatedTexts={{ home: "", about: "", menu: "", logIn: "Log in", createSpace: "Create Space" }}
        onNavigate={navigate}
      />
      <ContentWrapper>
        <BackgroundPattern />
        <StyledForm
          title={t('login.title')}
          description={description}
          onSubmit={(e) => {
            e.preventDefault()
            login(email, pass)
          }}
        >
          <InputsContainer>
            <TextInput
              label={t('login.email_placeholder')}
              value={email}
              onChange={(e) => handleEmail(e.target.value)}
            />
            <TextInput
              type="password"
              label={t('login.password_placeholder')}
              value={pass}
              onChange={(e) => handlePass(e.target.value)}
            />
          </InputsContainer>

          <ButtonContainer>
            <Button
              text={t('login.login_button')}
              type="primary"
              disabled={!(email && pass)}
              onClick={(e) => {
                e.preventDefault();
                login(email, pass);
              }}
            />
          </ButtonContainer>
        </StyledForm>
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

const StyledForm = styled(Form)`
  position: relative;
  z-index:1;
`

const BackgroundPattern = styled.div`
   background-image: url(${backgroundSvg});
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.15;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;  // Hides the background on mobile
  }
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
    
    button {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
