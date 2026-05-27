import { FunctionComponent, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { defaultTheme } from "@horizontal-org/shira-ui";
import { QuizLibraryFlowHeader } from "../QuizLibraryFlowHeader";

type Props = {
  children?: ReactNode;
};

export const QuizLibraryFlowManagement: FunctionComponent<Props> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <>
      <QuizLibraryFlowHeader onExit={() => navigate(-1)} />
      <QuizLibraryList>{children}</QuizLibraryList>
    </>
  );
};

const QuizLibraryList = styled("div")`
  min-height: calc(100vh - 72px);
  padding: 48px 0;
  background: ${defaultTheme.colors.light.paleGrey};
`;
