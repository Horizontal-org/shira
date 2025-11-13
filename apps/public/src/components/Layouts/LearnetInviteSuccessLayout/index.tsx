import { FunctionComponent } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Body1, defaultTheme, H1, Link2, SettingsFishIcon } from "@shira/ui";

interface Props {
  spaceName?: string
}

export const InviteSuccessLayout: FunctionComponent<Props> = ({ spaceName }) => {
  const { t } = useTranslation()

  return (
    <SceneWrapper>
      <Header>
        <Logo>Shira</Logo>
        <Link2 href="https://shira.app" target="_blank">
          {t("learner_invitation.learn_more")}
        </Link2>
      </Header>

      <Content>
        <SettingsFishIcon />
        <Card>
          <H1>{t("learner_invitation.success_title")}</H1>

          <Body1>
            {t("learner_invitation.success_joined_space", { spaceName })}
          </Body1>

          <Body1>
            {t("learner_invitation.success_hint")}
          </Body1>
        </Card>
      </Content>
    </SceneWrapper>
  )
}

const SceneWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${defaultTheme.colors.light.white};
  font-family: "Open Sans", sans-serif;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 48px;
`;

const Logo = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: ${defaultTheme.colors.green8};
  letter-spacing: 1px;
  font-family: "Comfortaa", sans-serif;
`;

const Content = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
  gap: 48px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Card = styled.div`
  background-color: ${defaultTheme.colors.light.paleGreen};
  border-radius: 16px;
  padding: 48px 64px;
  max-width: 520px;
  text-align: center;

  h1 {
    color: #333;
    margin-bottom: 24px;
    font-size: 28px;
    font-weight: 700;
  }

  p {
    color: #444;
    line-height: 1.6;
    margin-bottom: 12px;
  }

  @media (max-width: 768px) {
    padding: 32px;
  }
`;
