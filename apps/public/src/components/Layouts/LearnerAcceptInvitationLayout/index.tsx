import { FunctionComponent, useEffect, useState } from "react";
import {
  Body1,
  Button,
  Checkbox,
  defaultTheme,
  Link2,
  SettingsFishIcon,
  styled,
  SubHeading1,
} from "@horizontal-org/shira-ui";
import { Trans, useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { ReactComponent as HookedFish } from "../../../assets/HookedFish.svg";
import { acceptInvitation, getInvitation } from "../../../fetch/learner_invitation";
import { SceneWrapper } from "../../UI/SceneWrapper";
import ShiraFullLogo from "../../UI/Icons/ShiraFullLogo";
import { InvalidLink } from "../../UI/InvalidLink";

enum ViewState {
  Loading = "loading",
  Ready = "ready",
  Joining = "joining",
  Accepted = "accepted",
  Error = "error",
  Invalid = "invalid",
}

export const LearnerAcceptInvitationLayout: FunctionComponent = () => {
  const { t } = useTranslation();
  const { hash } = useParams();
  const [view, setView] = useState<ViewState>(ViewState.Loading);
  const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false);
  const [spaceName, setSpaceName] = useState("");

  useEffect(() => {
    if (!hash) {
      setView(ViewState.Invalid);
      return;
    }

    getInvitation(hash)
      .then((invitation) => {
        setSpaceName(invitation.spaceName);
        setView(ViewState.Ready);
      })
      .catch(() => setView(ViewState.Invalid));
  }, [hash]);

  const joinSpace = async () => {
    if (!hash || !acceptedPrivacyPolicy || view === ViewState.Joining) return;

    setView(ViewState.Joining);

    try {
      const response = await acceptInvitation(hash);
      setSpaceName(response.spaceName || spaceName);
      setView(ViewState.Accepted);
    } catch {
      setView(ViewState.Error);
    }
  };

  if (view === ViewState.Invalid) {
    return (
      <InvalidLink
        title={t("invalid_invitation.title")}
        description={t("invalid_invitation.description")}
        homeButtonText={t("invalid_invitation.home_button")}
      />
    );
  }

  return (
    <SceneWrapper bg="white">
      <Header>
        <ShiraFullLogo aria-hidden="true" />
        <Link2 href="https://shira.app" target="_blank" rel="noopener noreferrer">
          {t("learner_invitation.learn_more")}
        </Link2>
      </Header>

      <Main>
        {view === ViewState.Accepted ? (
          <Content>
            <SettingsFishIcon aria-hidden="true" />
            <ResultCard aria-live="polite">
              <SubHeading1>{t("learner_invitation.success_title")}</SubHeading1>
              <Body1>{t("learner_invitation.success_joined_space", { spaceName })}</Body1>
              <Body1>{t("learner_invitation.success_hint")}</Body1>
            </ResultCard>
          </Content>
        ) : (
          <Content>
            <GreenFishWrapper>
              <HookedFish aria-hidden="true" />
            </GreenFishWrapper>

            <JoinCard aria-live="polite">
              <SubHeading1>
                {view === ViewState.Error
                  ? t("learner_invitation.error_title")
                  : view === ViewState.Loading
                    ? t("loading_messages.loading")
                    : t("learner_invitation.join_title")}
              </SubHeading1>

              {view === ViewState.Error ? (
                <Body1>{t("learner_invitation.error_message")}</Body1>
              ) : view !== ViewState.Loading ? (
                <>
                  <AgreementSummary>
                    <Trans
                      i18nKey="learner_invitation.join_message"
                      values={{ spaceName }}
                      components={[
                        <Link2
                          href="https://shira.app/privacy-policy"
                          target="_blank"
                          rel="noopener noreferrer"
                        />,
                      ]}
                    />
                  </AgreementSummary>

                  <PrivacyLabel>
                    <Checkbox
                      ariaLabel={t("learner_invitation.privacy_consent_aria_label")}
                      checked={acceptedPrivacyPolicy}
                      disabled={view === ViewState.Joining}
                      id="learner-invitation-privacy-policy"
                      onChange={(event) => setAcceptedPrivacyPolicy(event.target.checked)}
                      size={18}
                    />
                    <PrivacyText>
                      <Trans
                        i18nKey="learner_invitation.privacy_consent_label"
                        components={[
                          <Link2
                            href="https://shira.app/privacy-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                          />,
                        ]}
                      />
                    </PrivacyText>
                  </PrivacyLabel>
                </>
              ) : null}

              {view !== ViewState.Loading && (
                <ButtonWrapper>
                  <Button
                    color={defaultTheme.colors.green7}
                    disabled={!acceptedPrivacyPolicy || view === ViewState.Joining || !hash}
                    onClick={joinSpace}
                    text={
                      view === ViewState.Joining
                        ? t("learner_invitation.joining")
                        : view === ViewState.Error
                          ? t("learner_invitation.try_again")
                          : t("learner_invitation.join_button")
                    }
                  />
                </ButtonWrapper>
              )}
            </JoinCard>
          </Content>
        )}
      </Main>
    </SceneWrapper>
  );
};

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 24px 96px;
`;

const Content = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 42px;
  width: min(1150px, 100%);

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const ResultCard = styled.div`
  background-color: ${defaultTheme.colors.light.paleGreen};
  border-radius: 24px;
  padding: 48px 64px;
  width: min(650px, 100%);
  box-sizing: border-box;
  text-align: center;
  gap: 24px;
  display: flex;
  flex-direction: column;
`;

const JoinCard = styled.div`
  background-color: ${defaultTheme.colors.light.paleGreen};
  border-radius: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  padding: 52px 64px 48px;
  text-align: center;
  width: min(815px, calc(100vw - 390px));
  min-height: 324px;

  @media (max-width: 900px) {
    padding: 40px 28px;
    width: min(600px, 100%);
  }
`;

const GreenFishWrapper = styled.div`
  display: flex;
  flex: 0 0 280px;

  > svg {
    width: 280px;
    height: auto;
  }
`;

const AgreementSummary = styled(Body1)`
  margin: 0;
`;

const PrivacyLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  cursor: pointer;
`;

const PrivacyText = styled(Body1)`
  margin-top: -2px;
`;

const ButtonWrapper = styled.div`
  display: flex;

  > button {
    min-width: 118px;
    justify-content: center;
  }
`;
