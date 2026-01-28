import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Link1,
  TextInput,
  styled,
  Navbar
} from "@shira/ui";
import backgroundSvg from "../../assets/Background.svg";
import { hasRequiredValue, isEmailValid } from "../../utils/validation";

interface Props { }

export const ResetPasswordLayout: FunctionComponent<Props> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [email, handleEmail] = useState("");
  const [emailError, handleEmailError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    let hasError = false;
    if (!hasRequiredValue(email)) {
      handleEmailError(t("reset_password.validation.email_required"));
      hasError = true;
    }
    if (hasRequiredValue(email) && !isEmailValid(email)) {
      handleEmailError(t("reset_password.validation.invalid_email"));
      hasError = true;
    }
    return hasError;
  };

  const handleSubmit = () => {
    handleEmailError("");
    if (validateForm()) {
      return;
    }
    setSubmitted(true);
  };

  return (
    <Container>
      <Navbar
        translatedTexts={{ home: "", about: "", menu: "", logIn: "Sign up", createSpace: "" }}
        onNavigate={() => navigate("/get-started")}
      />
      <ContentWrapper>
        <BackgroundPattern />
        <Content>
          {submitted ? (
            <StyledForm
              title={t("reset_password.success_title")}
              description={t("reset_password.success_description", { email })}
            >
              <ButtonContainer>
                <Button
                  text={t("reset_password.back_to_login")}
                  type="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/login");
                  }}
                />
              </ButtonContainer>
            </StyledForm>
          ) : (
            <StyledForm
              title={t("reset_password.title")}
              description={t("reset_password.subtitle")}
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <InputsContainer>
                <TextInput
                  id="reset-email-input"
                  required
                  label={t("reset_password.email_placeholder")}
                  value={email}
                  onChange={(e) => handleEmail(e.target.value)}
                />
                {emailError && <InlineErrorMessage>{emailError}</InlineErrorMessage>}
              </InputsContainer>

              <ButtonContainer>
                <Button
                  id="reset-password-button"
                  text={t("reset_password.send_button")}
                  type="primary"
                  disabled={!hasRequiredValue(email) || !isEmailValid(email)}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                />
              </ButtonContainer>

              <BackLinkContainer>
                <Link1
                  id="back-to-login-link"
                  href="/login"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/login");
                  }}
                >
                  {t("reset_password.back_to_login")}
                </Link1>
              </BackLinkContainer>
            </StyledForm>
          )}
        </Content>
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
  width: 100%;
  max-width: 520px;
  position: relative;
  z-index: 1;
`;

const StyledForm = styled(Form)`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
`;

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
    display: none;
  }
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InlineErrorMessage = styled.div`
  color: ${props => props.theme.colors.red7};
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

const BackLinkContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
