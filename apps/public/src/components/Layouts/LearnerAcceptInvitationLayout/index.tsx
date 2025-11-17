import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { styled, defaultTheme, Body1, SubHeading1, SettingsFishIcon, Link2 } from "@shira/ui";
import { useParams, useLocation } from "react-router-dom";
import { ReactComponent as HookedFish } from "../../../assets/HookedFish.svg";
import { useStore } from "../../../store";
import { shallow } from "zustand/shallow";
import { useTranslation } from "react-i18next";
import { Heading } from "../../UI/Title";
import { acceptInvitation, acceptInvitationError } from "../../../fetch/learner_invitation";
import { SceneWrapper } from "../../UI/SceneWrapper";
import ShiraFullLogo from "../../UI/Icons/ShiraFullLogo";

type ViewState = "loading" | "accepted" | "error";

export const LearnerAcceptInvitationLayout: FunctionComponent = () => {
  const { t } = useTranslation();
  const { token } = useParams();
  const { state: navState } = useLocation() as { state: { spaceName?: string } };

  const [view, setView] = useState<ViewState>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [spaceName, setSpaceName] = useState<string>(navState?.spaceName ?? "");

  const { resetAll } = useStore((s) => ({ resetAll: s.resetAll }), shallow);
  const isAccepted = view === "accepted";

  const accept = useCallback(async () => {
    if (!token) return;

    setView("loading");
    setErrorMsg("");

    try {
      const { spaceName } = await acceptInvitation(token);
      setSpaceName(spaceName || "");
      setView("accepted");
    } catch (err) {
      const error = acceptInvitationError(err);
      setView("error");
      setErrorMsg(t(`error_messages.${error.message}`) || "");
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      accept();
    } else if (spaceName) {
      setView("accepted");
    }

    return () => resetAll();
  }, [accept, resetAll]);


  return (
    <SceneWrapper bg="white">
      <Header>
        <ShiraFullLogo aria-hidden="true"/>
        <Link2 href="https://shira.app" target="_blank">
          {t("learner_invitation.learn_more")}
        </Link2>
      </Header>

      {isAccepted ? (
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

          <AcceptBox role={view === "loading" ? "status" : undefined} aria-live="polite">
            <Heading>
              {view === "error"
                ? t("learner_invitation.error_title")
                : view === "loading"
                  ? t("loading_messages.loading")
                  : null}
            </Heading>

            {view === "error" && errorMsg && (
              <ErrorText role="alert">{errorMsg}</ErrorText>
            )}
          </AcceptBox>
        </AcceptWrapper>
      )}
    </SceneWrapper>
  );
};

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 48px;
`;

const Content = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
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
