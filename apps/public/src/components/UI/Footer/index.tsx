import { FunctionComponent, ReactNode } from "react";
import useGetWidth from "../../../hooks/useGetWidth";
import { FooterMobile } from "./FooterMobile";
import { FooterDesktop } from "./FooterDesktop";

interface Props {
  title?: string;
  hideCloseButton?: boolean;
  action?: ReactNode;
  handleIsExpanded?: (isExpanded: boolean) => void;
  isExpanded?: boolean;
  showExplanations?: boolean;
}

export const Footer: FunctionComponent<Props> = ({
  title,
  action,
  hideCloseButton,
  isExpanded,
  handleIsExpanded,
  showExplanations
}) => {
  const { width } = useGetWidth()

  return (
    <>
      {width <= 1024 ? (
        <FooterMobile 
          title={title} 
          action={action} 
          hideCloseButton={hideCloseButton} 
          isExpanded={isExpanded}
          handleIsExpanded={handleIsExpanded}
          showExplanations={showExplanations}
        />
      ) : (
        <FooterDesktop title={title} action={action} hideCloseButton={hideCloseButton} />
      )}
    </>
  )
}

Footer.defaultProps = {
  title: '',
  action: <></>
}