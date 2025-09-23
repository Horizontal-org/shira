import { FunctionComponent, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionLibraryFlowHeader } from "../QuestionLibraryFlowHeader";

type Props = {
  initialAppType?: string | null;
  children?: ReactNode;
};

export const QuestionLibraryFlowManagement: FunctionComponent<Props> = ({
  children,
}) => {
  const navigate = useNavigate()

  return (
    <>
      <QuestionLibraryFlowHeader onExit={() => navigate(-1)} />

      <div style={{ display: "flex", justifyContent: "center", padding: "48px 0", background: "#f9f9f9" }}>
        {children}
      </div>
    </>
  );
};
