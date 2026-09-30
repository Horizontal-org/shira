import { FunctionComponent, useState } from "react";
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
import { acceptInvitation } from "../../../fetch/learner_invitation";
import { SceneWrapper } from "../../UI/SceneWrapper";
import ShiraFullLogo from "../../UI/Icons/ShiraFullLogo";

enum ViewState {
  Ready = "ready",
  Joining = "joining",
  Accepted = "accepted",
  Error = "error",
}

export const LearnerAcceptInvitationLayout: FunctionComponent = () => {
  const { t } = useTranslation();
  const { hash } = useParams();
  const [view, setView] = useState<ViewState>(ViewState.Ready);
  const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false);
  const [spaceName, setSpaceName] = useState("");

  const joinSpace = async () => {
    if (!hash || !acceptedPrivacyPolicy || view === ViewState.Joining) return;

    setView(ViewState.Joining);

    try {
      const response = await acceptInvitation(hash);
      setSpaceName(response.spaceName || "");
      setView(ViewState.Accepted);
    } catch {
      setView(ViewState.Error);
    }
  };

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
              <Body1>
                {t("learner_invitation.success_joined_space", { spaceName })}
              </Body1>
              <Body1>{t("learner_invitation.success_hint")}</Body1>
            </ResultCard>
          </Content>
        ) : (
          <Content>
            <GreenFishWrapper>
              <HookedFish aria-hidden="true" />
            </GreenFishWrapper>

            <JoinCard>
              <SubHeading1>
                {view === ViewState.Error
                  ? t("learner_invitation.error_title")
                  : t("learner_invitation.join_title")}
              </SubHeading1>

              <Body1>
                {view === ViewState.Error
                  ? t("learner_invitation.error_message")
                  : t("learner_invitation.join_message")}
              </Body1>

              {view !== ViewState.Error && (
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
              )}

              <ButtonWrapper>
                <Button
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
  padding: 24px 48px;

  @media (max-width: 600px) {
    padding: 20px 24px;
  }
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 24px 72px;
`;

const Content = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 48px;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 24px;
  }
`;

const ResultCard = styled.div`
  background-color: ${defaultTheme.colors.light.paleGreen};
  border-radius: 16px;
  padding: 48px 64px;
  max-width: 520px;
  text-align: center;
  gap: 24px;
  display: flex;
  flex-direction: column;
`;

const JoinCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 440px;
`;

const GreenFishWrapper = styled.div`
  display: flex;

  > svg {
    width: min(410px, 40vw);
    height: auto;
  }

  @media (max-width: 900px) {
    > svg {
      width: min(260px, 70vw);
    }
  }
`;

const PrivacyLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
`;

const PrivacyText = styled(Body1)`
  margin-top: -2px;
`;

const ButtonWrapper = styled.div`
  display: flex;

  > button {
    min-width: 128px;
    justify-content: center;
  }
`;
