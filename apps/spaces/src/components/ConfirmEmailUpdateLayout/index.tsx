import { Body1, Button, H1, Navbar, styled } from "@shira/ui";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import notFoundSvg from "../../assets/404.svg";
import { confirmUserEmailChange } from "../../fetch/user";
import { handleHttpError } from "../../fetch/handleError";
import { useStore } from "../../store";
import toast from "react-hot-toast";
import { getErrorContent } from "../../utils/getErrorContent";

type ConfirmationStatus = "checking" | "success" | "invalid" | "error";

export const ConfirmEmailUpdateLayout: FunctionComponent = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { token = "" } = useParams();
  const [status, setStatus] = useState<ConfirmationStatus>("checking");
  const [errorMessage, setErrorMessage] = useState("");

  const { logout } = useStore((state) => ({
    logout: state.logout,
  }));

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    const confirmEmailUpdate = async () => {
      try {
        await confirmUserEmailChange(token);

        logout();
        navigate("/login", { replace: true });
        toast.success(t("success_messages.email_updated"), { duration: 3000 });
      } catch (error) {
        const { message } = handleHttpError(error);
        setErrorMessage(t(getErrorContent("error_messages", "something_went_wrong", message)));
        setStatus("error");
      }
    };

    confirmEmailUpdate();
  }, [navigate, t, token]);

  if (status === "checking") {
    return null;
  }

  const isSuccess = status === "success";
  const title = isSuccess
    ? t("confirm_email_update.success_title")
    : t("error_messages.invalid_title");
  const description = isSuccess
    ? t("confirm_email_update.success_description")
    : errorMessage || t("error_messages.invalid_description");

  return (
    <Container>
      <Navbar
        translatedTexts={{ home: "", about: "", menu: "", logIn: t('buttons.login'), createSpace: "Create Space" }}
        onNavigate={navigate}
      />

      <Body>
        <Content>
          <TextSection>
            <StyledH1>{title}</StyledH1>
            <Body1>
              <strong>{description}</strong>
            </Body1>
            <ButtonWrapper>
              <Button
                text={t('buttons.back_home')}
                type="outline"
                onClick={() => navigate("/login")}
              />
            </ButtonWrapper>
          </TextSection>

          <SvgWrapper>
            <img src={notFoundSvg} alt={title} />
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
