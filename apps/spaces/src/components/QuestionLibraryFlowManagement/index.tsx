import { FunctionComponent, ReactNode } from "react";
import { QuestionLibraryFlowHeader } from "../QuestionLibraryFlowHeader";

type Props = {
  initialAppType?: string | null;
  children?: ReactNode;
  onExit?: () => void;
};

export const QuestionLibraryFlowManagement: FunctionComponent<Props> = ({
  initialAppType = null,
  children,
  onExit,
}) => {
  return (
    <>
      <QuestionLibraryFlowHeader onExit={onExit ?? (() => {})} />

      <div style={{ display: "flex", justifyContent: "center", padding: "48px 0" }}>
        {children}
      </div>
    </>
  );
};
