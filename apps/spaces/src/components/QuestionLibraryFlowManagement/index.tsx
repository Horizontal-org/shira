import { FunctionComponent, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionLibraryFlowHeader } from "../QuestionLibraryFlowHeader";
import styled from "styled-components";
import { defaultTheme } from "@shira/ui";

type Props = {
  initialAppType?: string | null;
  children?: ReactNode;
};

export const QuestionLibraryFlowManagement: FunctionComponent<Props> = ({
  children
}) => {
  const navigate = useNavigate();

  return (
    <>
      <QuestionLibraryFlowHeader onExit={() => navigate(-1)} />
      <QuestionLibraryList>{children}</QuestionLibraryList>
    </>
  );
};

const QuestionLibraryList = styled("div")`
  display: flex;
  justify-content: center;
  padding: 48px 0;
  background: ${defaultTheme.colors.light.paleGrey};
`;
