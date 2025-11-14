import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { SceneWrapper } from "../../UI/SceneWrapper";
import { styled, Link2, defaultTheme } from "@shira/ui";
import { useParams, useNavigate } from "react-router-dom";
import { ReactComponent as Hooked } from "../../../assets/HookedFish.svg";
import { useStore } from "../../../store";
import { shallow } from "zustand/shallow";
import { useTranslation } from "react-i18next";
import { Heading } from "../../UI/Title";
import { acceptInvitation } from "../../../fetch/learner_invitation";

interface Props { }

type InviteState = "accepted" | "error";

export const LearnerAcceptInviteLayout: FunctionComponent<Props> = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { token } = useParams()

  const [state, setState] = useState<InviteState>(null)
  const [errorMsg, setErrorMsg] = useState<string>(null)

  const { resetAll } = useStore((s) => ({ resetAll: s.resetAll }), shallow)

  const accept = useCallback(async () => {
    if (!token) return;
    setErrorMsg(null);

    try {
      const res = await acceptInvitation(token);

      const spaceName: string = res.data?.spaceName ?? "";

      if (res.status >= 200 && res.status < 300) {
        setState("accepted");
        navigate("/welcome", { replace: true, state: { spaceName } });
        return;
      }
    } catch (e: any) {
      setState("error");
      setErrorMsg(e?.response?.data?.message || t("learner_invitation.error_title"));
    }
  }, [token, navigate, t])

  useEffect(() => {
    if (token) accept()
    return () => resetAll()
  }, [token, accept, resetAll])

  return (
    <SceneWrapper>
      <CenterWrapper>
        <GreenFishWrapper>
          <Hooked />
        </GreenFishWrapper>

        <StyledBox>
          <Heading>
            {state === "accepted"
              ? t("learner_invitation.success_title")
              : t("learner_invitation.error_title")}
          </Heading>

          <LinkWrapper>
            <Link2 href="https://shira.app" target="_blank">
              {t("learner_invitation.learn_more")}
            </Link2>
          </LinkWrapper>
        </StyledBox>
      </CenterWrapper>
    </SceneWrapper>
  )
}

const GreenFishWrapper = styled.div`
  display: flex;
  padding-right: 40px;

  > svg { width: 410px; height: 348px; }

  @media (max-width: ${(p) => p.theme.breakpoints.lg}) {
    justify-content: flex-end;
    > svg { width: 280px; height: 275px; }
  }

  @media (max-width: ${(p) => p.theme.breakpoints.xs}) {
    justify-content: space-evenly;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    > svg { width: 230px; height: 199px; }
  }
`;

const CenterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  border: none;
  gap: 24px;
`;

const LinkWrapper = styled.div`
  display: none;
  color: ${defaultTheme.colors.green8};
`;