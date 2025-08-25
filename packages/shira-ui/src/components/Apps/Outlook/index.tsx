import { FunctionComponent } from "react";
import styled, { createGlobalStyle } from 'styled-components'
import { Explanation } from "../../../domain/explanation";
import ExplanationTooltip from "../components/ExplanationTooltip";

import '../../../fonts/Segoe/style.css'
import { BlueHeader } from "./BlueHeader";
import { Sidebar } from "./Sidebar";

interface CustomElements {
  textContent: string,
  explanationPosition: string | null
}

// export interface AttachmentElement { 
//   name: string;
//   position: string;
//   explanationPosition?: string | null;
//   fileType?: string;    
// }

interface Props {
  content: HTMLElement;
  senderName: CustomElements;
  senderEmail: CustomElements;
  receiverName?: string;
  receiverEmail?: string;
  subject?: CustomElements;
  attachments?: any[];
  explanations?: Explanation[]
  explanationNumber?: number;
  showExplanations?: boolean
}

const parseSubjectText = (subjectText: string) => {
    return subjectText && subjectText.length > 0 ?
      subjectText : `(no subject)`
}

export const Outlook:FunctionComponent<Props> = ({
  content,
  senderName,
  senderEmail,
  receiverEmail,
  receiverName,
  subject,
  attachments,
  explanations,
  explanationNumber,
  showExplanations
}) => {
  return (
    <DesktopWrapper className="outlook">
      {explanations && explanations.map(explanation => (
        <ExplanationTooltip
          explanation={explanation} 
          explanationNumber={explanationNumber}
          showExplanations={showExplanations}
        />
      ))}
      <Font />
      <BlueHeader />
      <Body>
        <Sidebar />
      </Body>
    </DesktopWrapper>
  )
}

// --neutralDark: #242424;
// --neutralPrimary: #424242;
// color picker
// #0F6CBD
// --oobePrimary: #0078d4;
// --oobeDarkAlt: #106EBE;

const Font = createGlobalStyle`
  .outlook {
    font-family: 'Segoe UI Regular';
  }
`

const DesktopWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background: #F5F5F5;
`

const Body = styled.div`
  height: 100%;
`