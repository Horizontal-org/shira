import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { styled, defaultTheme, Body1, SubHeading1, SettingsFishIcon, Link2 } from "@shira/ui";
import { useParams } from "react-router-dom";
import { ReactComponent as HookedFish } from "../../../assets/HookedFish.svg";
import { useTranslation } from "react-i18next";
import { Heading } from "../../UI/Title";
import { acceptInvitation, acceptInvitationError } from "../../../fetch/learner_invitation";
import { SceneWrapper } from "../../UI/SceneWrapper";
import ShiraFullLogo from "../../UI/Icons/ShiraFullLogo";

export const LearnerAcceptInvitationLayout: FunctionComponent = () => {
  enum ViewState {
    Loading = "loading",
    Accepted = "accepted",
    Error = "error"
  }

  const { t } = useTranslation();
  const { token } = useParams();

  const [view, setView] = useState<ViewState>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [spaceName, setSpaceName] = useState<string>("");

  const accept = useCallback(async () => {
    if (!token) return;

    setView(ViewState.Loading);
    setErrorMsg("");

    try {
      const { spaceName } = await acceptInvitation(token);
      setSpaceName(spaceName || "");
      setView(ViewState.Accepted);
    } catch (err) {
      const error = acceptInvitationError(err);
      setView(ViewState.Error);
      setErrorMsg(t(`error_messages.${error.message}`) || "");
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      accept();
    }
  }, [accept, token]);

  return (
    <SceneWrapper bg="white">
      <Header>
        <ShiraFullLogo aria-hidden="true" />
        <Link2 href="https://shira.app" target="_blank">
          {t("learner_invitation.learn_more")}
        </Link2>
      </Header>

      <Main>
        {view === ViewState.Accepted ? (
          <Content>
            <SettingsFishIcon aria-hidden="true" />
            <Card>
              <SubHeading1>{t("learner_invitation.success_title")}</SubHeading1>
              <Body1>
                {t("learner_invitation.success_joined_space", { spaceName })}
              </Body1>

              <Body1>{t("learner_invitation.success_hint")}</Body1>
            </Card>
          </Content>
        ) : (
          <AcceptWrapper>
            <GreenFishWrapper>
              <HookedFish aria-hidden="true" />
            </GreenFishWrapper>

            <AcceptBox
              aria-live="polite"
              aria-describedby={view === ViewState.Error ? "invitation-error" : "loading"}
            >
              <Heading>
                {view === ViewState.Error
                  ? t("learner_invitation.error_title")
                  : view === ViewState.Loading
                    ? t("loading_messages.loading")
                    : null}
              </Heading>

              {view === ViewState.Error && errorMsg && (
                <ErrorText id="invitation-error" role="alert">{errorMsg}</ErrorText>
              )}
            </AcceptBox>
          </AcceptWrapper>
        )}

      </Main>
    </SceneWrapper>
  );
};

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 48px;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
`;

const Content = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 48px;
`;

const Card = styled.div`
  background-color: ${defaultTheme.colors.light.paleGreen};
  border-radius: 16px;
  padding: 48px 64px;
  max-width: 520px;
  text-align: center;
  gap: 24px;
  display: flex;
  flex-direction: column;
`;

const AcceptWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
`;

const GreenFishWrapper = styled.div`
  display: flex;
  padding-right: 40px;

  > svg {
    width: 410px;
    height: 348px;
  }
`;

const AcceptBox = styled.div`
  display: flex;
  flex-direction: column;
  border: none;
  gap: 24px;
`;

const ErrorText = styled.p`
  color: ${defaultTheme.colors.error9};
  margin: 0;
`;
