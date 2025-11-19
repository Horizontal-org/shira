import { FunctionComponent, useState } from "react";
import { invite } from "../../fetch/learner";
import { assignToQuiz } from "../../fetch/learner";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { handleHttpError } from "../../fetch/handleError";

interface Props { }

export const ATestLayout: FunctionComponent<Props> = () => {

  enum ViewResult { Ok, Error };

  const [view, setView] = useState<ViewResult>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const error = view === ViewResult.Error;
  const { t } = useTranslation();

  const inv = async () => {
    try {
      await invite("fredziaga@gmail.com", "ffffff");
      setView(ViewResult.Ok);
    } catch (error) {
      setView(ViewResult.Error);
      const e = handleHttpError(error);
      setErrorMsg(t(`error_messages.${e.message}`) || "Failed to invite");
    }
  };

  const assQuiz = async () => {
    try {
      await assignToQuiz("fredziaga@gmail.com", 79);
      setView(ViewResult.Ok);
    } catch (error) {
      setView(ViewResult.Error);
      const e = handleHttpError(error);
      setErrorMsg(t(`error_messages.${e.message}`) || "Failed to assign");
    }
  };

  return (
    <Container>
      <button onClick={inv}>Invite</button>
      <button onClick={assQuiz}>Assign</button>
      <BottomItem>
        {error && <div>{errorMsg}</div>}
      </BottomItem>
    </Container >
  )
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 10px;
`;

const BottomItem = styled.div`
  flex-basis: 100%;
  text-align: center;
`;