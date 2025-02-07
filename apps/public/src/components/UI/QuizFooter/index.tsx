import { FunctionComponent, ReactNode } from "react";
import useGetWidth from "../../../hooks/useGetWidth";
import { QuizFooterMobile } from "./QuizFooterMobile";
import { QuizFooterDesktop } from "./QuizFooterDesktop";

interface Props {
  title?: string;
  hideCloseButton?: boolean;
  action?: ReactNode;
  handleIsExpanded?: (isExpanded: boolean) => void;
  isExpanded?: boolean;
  showExplanations?: boolean;
  hasAnswer: boolean;
}

export const QuizFooter: FunctionComponent<Props> = ({
  title,
  action,
  hideCloseButton,
  isExpanded,
  handleIsExpanded,
  showExplanations,
  hasAnswer
}) => {
  const { width } = useGetWidth()

  return (
    <>
      {width <= 1024 ? (
        <QuizFooterMobile 
          title={title} 
          action={action} 
          hasAnswer={hasAnswer}
          hideCloseButton={hideCloseButton} 
          isExpanded={isExpanded}
          handleIsExpanded={handleIsExpanded}
          showExplanations={showExplanations}
        />
      ) : (
        <QuizFooterDesktop title={title} action={action} hideCloseButton={hideCloseButton} />
      )}
    </>
  )
}

QuizFooter.defaultProps = {
  title: '',
  action: <></>
}