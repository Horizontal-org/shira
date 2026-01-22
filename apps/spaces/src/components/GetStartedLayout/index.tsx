import { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextInput,
  styled,
  Navbar,
  Form,
  RadioGroup
} from "@shira/ui";
import backgroundSvg from "../../assets/Background.svg";
import { GetStartedSuccess } from "./components/GetStartedSucess";
import { useStore } from "../../store";
import { shallow } from "zustand/shallow";
import { inviteOrg } from "../../fetch/registration";
import { handleHttpError } from "../../fetch/handleError";
import { getErrorContent } from "../../utils/getErrorContent";
import { GenericErrorModal } from "../modals/ErrorModal";

interface Props { }

export const ORG_TYPES = [
  { value: "business", label: "get_started.org_types.business" },
  { value: "cibersecurity", label: "get_started.org_types.cibersecurity" },
  { value: "non-profit", label: "get_started.org_types.non_profit" },
  { value: "individual", label: "get_started.org_types.individual" },
];

export const GetStartedLayout: FunctionComponent<Props> = () => {

  const { t } = useTranslation();

  const [email, handleEmail] = useState("");
  const [emailError, handleEmailError] = useState("");
  const [name, handleName] = useState("");
  const [nameError, handleNameError] = useState("");
  const [orgType, handleOrgType] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [errorModalOpen, setIsErrorModalOpen] = useState<string | null>(null);

  const navigate = useNavigate();

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const validateForm = () => {
    let hasError = false;
    if (!name.trim()) {
      handleNameError(t("get_started.validation.org_name_required"))
      hasError = true;
    }
    if (!email.trim()) {
      handleEmailError(t("get_started.validation.email_required"))
      hasError = true;
    }
    if (email.trim() && !isEmailValid) {
      handleEmailError(t("get_started.validation.invalid_email"))
      hasError = true;
    }
    return hasError
  };

  const {
    logout,
  } = useStore((state) => ({
    logout: state.logout,
  }), shallow)

  useEffect(() => {
    logout()
  }, [logout])

  const handleSubmit = async () => {
    handleEmailError('');
    handleNameError('');

    if (validateForm() || !orgType) {
      return
    }

    setLoading(true);

    try {
      await inviteOrg({
        slug: name,
        email,
        orgType
      })

      setSuccess(true);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      const error = handleHttpError(err)

      if (error && error.message === 'email_already_taken') {
        handleEmailError(t("error_messages.email_already_taken"))
        return
      }

      const content = getErrorContent("error_messages", "invite_org_failed", error.message);
      setIsErrorModalOpen(content)
    }
  };

  return (
    <Container>
      <Navbar
        translatedTexts={{ home: "", about: "", menu: "", logIn: t('login.login_header_button'), createSpace: "" }}
        onNavigate={navigate}
      />
      {success ? (
        <ContentWrapper>
          <BackgroundPattern />
          <Content>
            <GetStartedSuccess />
          </Content>
        </ContentWrapper>
      ) : (
        <ContentWrapper>
          <BackgroundPattern />
          <Content>

            <StyledForm
              title={t('get_started.title')}
              titleSize="large"
              description={t('get_started.description')}
              onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
              }}
            >
              <InputsContainer>
                <TextInput
                  required
                  label={t('get_started.organization_name_required')}
                  value={name}
                  onChange={(e) => handleName(e.target.value)}
                  disabled={loading}
                />
                {nameError && <InlineErrorMessage>{nameError}</InlineErrorMessage>}
                <TextInput
                  required
                  disabled={loading}
                  label={t('get_started.email_required')}
                  value={email}
                  onChange={(e) => handleEmail(e.target.value)}
                />
                {emailError && <InlineErrorMessage>{emailError}</InlineErrorMessage>}
                <RadioGroup
                  name="organization-type"
                  legend={t('get_started.org_type_label')}
                  value={orgType}
                  onChange={(value) => handleOrgType(value)}
                  options={ORG_TYPES.map((option) => ({
                    value: option.value,
                    label: t(option.label)
                  }))}
                  disabled={loading}
                  required
                />
              </InputsContainer>

              <ButtonContainer>
                <Button
                  text={loading ? t('get_started.loading') : t('get_started.button_sign_up')}
                  type="primary"
                  disabled={loading || !orgType || !name.trim() || !email.trim() || !isEmailValid}
                  onClick={(e) => {
                    e.preventDefault()
                    handleSubmit()
                  }}
                />
              </ButtonContainer>
            </StyledForm>

            <GenericErrorModal
              isOpen={!!errorModalOpen}
              errorMessage={errorModalOpen}
              onRetry={() => {
                setIsErrorModalOpen(null)
                handleSubmit()
              }}
              onCancel={() => { setIsErrorModalOpen(null) }}
            />
          </Content>
        </ContentWrapper>
      )}

    </Container>
  );
};

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;  
  position: relative; 

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    padding: 16px;
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
    gap: 12px;
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

const StyledForm = styled(Form)`
  position: relative;
  z-index:1;
  text-align: left;
  margin-bottom: 32px;
  gap: 16px;
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
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

const InlineErrorMessage = styled.div`
  color: #d32f2f;
  font-size: 14px;
  margin-top: -12px;
  padding-left: 4px;
`;
