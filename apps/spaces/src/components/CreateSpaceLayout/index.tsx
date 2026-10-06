import { FunctionComponent, useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  Checkbox,
  Form,
  Link1,
  Button,
  TextInput,
  styled,
  Navbar,
  Body2Regular,
  Link2
} from "@horizontal-org/shira-ui";
import backgroundSvg from "../../assets/Background.svg";
import { CreateSpaceSuccess } from "./components/CreateSpaceSuccess";
import { useStore } from "../../store";
import { shallow } from "zustand/shallow";
import { checkPassphraseExpired, registerSpace } from "../../fetch/registration";
import { handleHttpError } from "../../fetch/handleError";
import { getErrorContent } from "../../utils/getErrorContent";
import { GenericErrorModal } from "../modals/ErrorModal";
import { isEmailValid, hasRequiredValue } from "../../utils/validation";
import { login as fetchLogin, navigateToManageSubscription } from "../../fetch/auth";
import { SPACE_NAME_MAX_LENGTH } from "../../utils/inputLimits";

interface Props { }

export const CreateSpaceLayout: FunctionComponent<Props> = () => {

  const { t } = useTranslation();

  const { passphraseCode } = useParams()
  const [orgName, handleOrgName] = useState("");
  const [email, handleEmail] = useState("");
  const [emailError, handleEmailError] = useState("");
  const [pass, handlePass] = useState("");
  const [passError, handlePassError] = useState("");
  const [passConfirmation, handlePassConfirmation] = useState("");
  const [passConfirmationError, handlePassConfirmationError] = useState("");
  const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [checkingPassphrase, setCheckingPassphrase] = useState(true);
  const [errorModalOpen, setErrorModalOpen] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    logout,
    login,
  } = useStore((state) => ({
    logout: state.logout,
    login: state.login,
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
      const data = await checkPassphraseExpired(passphraseCode)

      if (data.expired) {
        navigate('/invitation-used')
        return
      }

      handleOrgName(data.slug)
      setCheckingPassphrase(false)
    } catch (e) {
      console.error('Error checking passphrase:', e)
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

  const isSubmitDisabled = (
    loading
    || !passphraseCode
    || !acceptedPrivacyPolicy
    || !hasRequiredValue(email)
    || !hasRequiredValue(pass)
    || !hasRequiredValue(passConfirmation)
  );

  const validateForm = () => {
    let hasError = false;
    if (!hasRequiredValue(email)) {
      handleEmailError(t('create_space.validation.email_required'));
      hasError = true;
    }
    if (hasRequiredValue(email) && !isEmailValid(email)) {
      handleEmailError(t("get_started.validation.invalid_email"))
      hasError = true;
    }
    if (!pass.trim()) {
      handlePassError(t('create_space.validation.password_required'));
      hasError = true;
    }
    if (pass.length < 8) {
      handlePassError(t('create_space.validation.password_min_length'));
      hasError = true;
    }
    if (!passConfirmation.trim()) {
      handlePassConfirmationError(t('create_space.validation.confirm_password_required'));
      hasError = true;
    } else if (pass !== passConfirmation) {
      handlePassConfirmationError(t('create_space.validation.passwords_mismatch'));
      hasError = true;
    }
    return hasError;
  };

  const handleSubmit = async () => {
    handleEmailError('');
    handlePassError('');
    handlePassConfirmationError('');

    if (validateForm()) {
      return
    }

    setLoading(true);

    try {
      const res = await registerSpace({
        password: pass,
        passphrase: passphraseCode,
        email,
        website: honeypot,
      })

      //if subIntent = pro, redirect to stripe
      if (res.data.subscriptionIntent === 'pro' && !!(res.data.organizationId)) {
        //call fetch login instead of zustand
        await fetchLogin(email, pass)

        await navigateToManageSubscription(res.data.organizationId, true)

        return
      }

      login(email, pass)
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      setLoading(false);

      const error = handleHttpError(err)

      if (error && error.message === 'email_no_match') {
        handleEmailError(t("error_messages.email_no_match"))
        return
      }

      const content = getErrorContent("error_messages", "invite_org_failed", error.message);
      setErrorModalOpen(content)
    }
  };

  if (checkingPassphrase) {
    return (
      <Container>
        <Navbar
          showLogInButton={false}
          translatedTexts={{ home: "", about: "", menu: "", logIn: t('login.login_header_button'), createSpace: t('create_space.button_create') }}
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
        showLogInButton={false}
        translatedTexts={{ home: "", about: "", menu: "", logIn: t('login.login_header_button'), createSpace: t('create_space.button_create') }}
        onNavigate={navigate}
      />
      {success ? (
        <CreateSpaceSuccess />
      ) : (
        <ContentWrapper>
          <BackgroundPattern />
          <Content>

            <StyledForm
              title={t('create_space.form_title')}
              titleSize="large"
              header={orgName}
              description={description}
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit()
              }}
            >

              <InputsContainer>
                <input
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: 'absolute', insetInlineStart: '-9999px', opacity: 0, height: 0, width: 0 }}
                />
                <TextInput
                  required
                  label={t('create_space.email_label')}
                  value={email}
                  onChange={(e) => handleEmail(e.target.value)}
                  showCharacterCount={true}
                  maxLength={SPACE_NAME_MAX_LENGTH}
                  characterLimitErrorText={t('error_messages.character_limit_error')}
                  errorText={emailError}
                />
                <TextInput
                  required
                  type="password"
                  label={t('create_space.password_label')}
                  value={pass}
                  onChange={(e) => handlePass(e.target.value)}
                />

                {passError &&
                  <InlineErrorMessage>{passError}</InlineErrorMessage>
                }

                <TextInput
                  required
                  type="password"
                  label={t('create_space.confirm_password_label')}
                  value={passConfirmation}
                  onChange={(e) => handlePassConfirmation(e.target.value)}
                />

                {passConfirmationError &&
                  <InlineErrorMessage>{passConfirmationError}</InlineErrorMessage>
                }

                <PrivacyContainer>
                  <PrivacyLabel>
                    <PrivacyCheckbox
                      ariaLabel={t("create_space.privacy_consent_aria_label")}
                      checked={acceptedPrivacyPolicy}
                      id="create-space-privacy-policy"
                      onChange={(e) => {
                        setAcceptedPrivacyPolicy(e.target.checked);
                      }}
                      size={18}
                    />
                    <PrivacyText>
                      <Trans
                        i18nKey="create_space.privacy_consent_label"
                        components={[
                          <Link2
                            href="https://shira.app/privacy-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        ]}
                      />
                    </PrivacyText>
                  </PrivacyLabel>
                </PrivacyContainer>
              </InputsContainer>

              <ButtonContainer>
                <Button
                  text={t('create_space.button_create')}
                  type="primary"
                  disabled={isSubmitDisabled}
                  onClick={(e) => {
                    e.preventDefault()
                    handleSubmit()
                  }}
                />
              </ButtonContainer>
            </StyledForm>
          </Content>

          <GenericErrorModal
            isOpen={!!errorModalOpen}
            errorMessage={errorModalOpen}
            onCancel={() => setErrorModalOpen(null)}
            onRetry={() => {
              setErrorModalOpen(null)
              handleSubmit()
            }}
          />
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
  inset-inline-start: 0;
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
  text-align: start;
  margin-bottom: 32px;
  gap: 16px;
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const PrivacyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PrivacyLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const PrivacyCheckbox = styled(Checkbox)`
  flex-shrink: 0;
`;

const PrivacyText = styled(Body2Regular)`
  margin: 0;
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
  color: ${props => props.theme.colors.error7};
  font-size: 14px;
  margin-top: -12px;
  padding-inline-start: 4px;
`;
