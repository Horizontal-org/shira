import { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"
import {
  Form,
  Link1,
  H1,
  SubHeading2,
  Button,
  TextInput,
  styled,
  Navbar
} from "@shira/ui";
import backgroundSvg from "../../assets/Background.svg";
import { CreateSpaceSuccess } from "./components/CreateSpaceSuccess";
import { useStore } from "../../store";
import { shallow } from "zustand/shallow";

interface Props {}

export const CreateSpaceLayout: FunctionComponent<Props> = () => {

  const { t } = useTranslation();

  const { passphraseCode } = useParams()
  const [email, handleEmail] = useState("");
  const [pass, handlePass] = useState("");
  const [passConfirmation, handlePassConfirmation] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [checkingPassphrase, setCheckingPassphrase] = useState(true);

  const navigate = useNavigate();

  const {
    logout,
    login
  } = useStore((state) => ({
    logout: state.logout,
    login: state.login
  }), shallow)

  useEffect(() => {
    // clean just in case session exists
    logout()
    checkPassphraseExpiry()
  }, [])

  const checkPassphraseExpiry = async () => {
    if (!passphraseCode) {
      setCheckingPassphrase(false)
      return
    }

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/passphrase/${passphraseCode}/check-expired`)

      if (response.data.expired) {
        navigate('/invitation-used')
        return
      }

      setCheckingPassphrase(false)
    } catch (error) {
      console.error('Error checking passphrase:', error)
      // If there's an error checking, show the form anyway (graceful degradation)
      setCheckingPassphrase(false)
    }
  }

  const description = (
    <>
      {passphraseCode ? 
        t('create_space.form_description') : 
        <>
          {t('create_space.beta_lead')}{" "}
          <Link1 href="mailto:contact@wearehorizontal.org">
            contact@wearehorizontal.org
          </Link1>
        </>
      }
    </>
  );

  const validateForm = () => {
    if (!email.trim()) return t('create_space.validation.email_required');
    if (!pass.trim()) return t('create_space.validation.password_required');
    if (pass.length < 8) return t('create_space.validation.password_min_length');
    if (pass !== passConfirmation) return t('create_space.validation.passwords_mismatch');
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/space-registration`, {
        email,
        password: pass,
        passphrase: passphraseCode,
      });
      login(email, pass)
      
      setSuccess(true);
      setLoading(false);            
    } catch (err) {
      console.log("🚀 ~ handleSubmit ~ err:", err.response.message)
      setLoading(false);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError(t('create_space.errors.create_space_failed'));
      }
    }
  };

  if (checkingPassphrase) {
    return (
      <Container>
        <Navbar
          translatedTexts={{home: "", about: "", menu: "", logIn: t('login.login_header_button'), createSpace: t('create_space.button_create')}}
          onNavigate={navigate}
        />
        <ContentWrapper>
          <Content>
            <div>{t('create_space.checking_invitation')}</div>
          </Content>
        </ContentWrapper>
      </Container>
    )
  }

  return (
    <Container>
      <Navbar
        translatedTexts={{home: "", about: "", menu: "", logIn: t('login.login_header_button'), createSpace: t('create_space.button_create') }}
        onNavigate={navigate}
      />
      { success ? (
        <CreateSpaceSuccess />
      ) : (
        <ContentWrapper>
          <BackgroundPattern />
          <Content>
            <Header>
              <H1>{t('create_space.title')}</H1>
              <SubHeading2>{t('create_space.subtitle')}</SubHeading2>
            </Header>

            <StyledForm
              title={t('create_space.form_title')}
              description={description}
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              
              {error && <ErrorMessage>{error}</ErrorMessage>}
              
              <InputsContainer>
                <TextInput
                  label={t('create_space.email_label')}
                  value={email}
                  onChange={(e) => handleEmail(e.target.value)}
                />
                <TextInput
                  type="password"
                  label={t('create_space.password_label')}
                  value={pass}
                  onChange={(e) => handlePass(e.target.value)}
                />

                <TextInput
                  type="password"
                  label={t('create_space.confirm_password_label')}
                  value={passConfirmation}
                  onChange={(e) => handlePassConfirmation(e.target.value)}
                />
              </InputsContainer>

              <ButtonContainer>
                <Button
                  text={t('create_space.button_create')}
                  type="primary"
                  disabled={loading || !passphraseCode}
                  onClick={handleSubmit}
                />
              </ButtonContainer>
            </StyledForm>
          </Content>
        </ContentWrapper>
      )}
      
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
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin: 48px auto; 
    width: 100%;
    height: auto;
`;

const Header = styled.div`
  padding: 32px 0;

  display: flex;
  flex-direction: column;
  gap: 16px;
`

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

const StyledForm = styled(Form)`
  position: relative;
  z-index:1;
  text-align: left;
  margin-bottom: 32px;
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

const ErrorMessage = styled.div`
  background-color: #ffebee;
  color: #d32f2f;
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 24px;
  font-weight: 500;
`;

const SuccessMessage = styled.div`
  background-color: #e8f5e9;
  color: #2e7d32;
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 24px;
  font-weight: 500;
`;

const NoPassphraseMessage = styled.div`
  margin-top: 16px;
  text-align: center;
  color: #757575;
`;