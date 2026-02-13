import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { styled, defaultTheme, Body1, SubHeading1, SettingsFishIcon, Link2 } from "@shira/ui";
import { useParams } from "react-router-dom";
import { ReactComponent as HookedFish } from "../../../assets/HookedFish.svg";
import { useTranslation } from "react-i18next";
import { Heading } from "../../UI/Title";
import { acceptInvitation } from "../../../fetch/learner_invitation";
import { SceneWrapper } from "../../UI/SceneWrapper";
import ShiraFullLogo from "../../UI/Icons/ShiraFullLogo";
import { InvalidLink } from "../../UI/InvalidLink";

export const LearnerAcceptInvitationLayout: FunctionComponent = () => {
  enum ViewState {
    Loading = "loading",
    Accepted = "accepted",
    Error = "error"
  }

  const { t } = useTranslation();
  const { hash } = useParams();

  const [view, setView] = useState<ViewState>(ViewState.Loading);
  const [spaceName, setSpaceName] = useState<string>("");

  const accept = useCallback(async () => {
    if (!hash) return;

    setView(ViewState.Loading);

    try {
      const { spaceName } = await acceptInvitation(hash);
      setSpaceName(spaceName || "");
      setView(ViewState.Accepted);
    } catch (err) {
      setView(ViewState.Error);      
    }
  }, [hash]);

  useEffect(() => {
    if (hash) {
      accept();
    }
  }, [accept, hash]);

  return (
      <>
        {view === ViewState.Accepted && (
          <SceneWrapper bg="white">
            <Header>
              <ShiraFullLogo aria-hidden="true" />
              <Link2 href="https://shira.app" target="_blank">
                {t("learner_invitation.learn_more")}
              </Link2>
            </Header>

            <Main>
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
            </Main>
          </SceneWrapper>
        )}
        
        {view === ViewState.Error && (
          <InvalidLink 
            title={t("invalid_invitation.title")}
            description={t("invalid_invitation.description")}
            homeButtonText={t("invalid_invitation.home_button")}
          />          
        )}

        {view === ViewState.Loading && (
          <SceneWrapper bg="white">
            <Header>
              <ShiraFullLogo aria-hidden="true" />
              <Link2 href="https://shira.app" target="_blank">
                {t("learner_invitation.learn_more")}
              </Link2>
            </Header>
            
            <Main>
              <Content>
                <AcceptWrapper>
                  <GreenFishWrapper>
                    <HookedFish aria-hidden="true" />
                  </GreenFishWrapper>

                  <AcceptBox
                    aria-live="polite"
                    aria-describedby={"loading"}
                  >
                    <Heading>
                      {t("loading_messages.loading")}
                    </Heading>
                  </AcceptBox>
                </AcceptWrapper>
              </Content>
            </Main>
          </SceneWrapper>
        )}
    </>
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
  color: ${defaultTheme.colors.dark.black};
  margin: 0;
`;
