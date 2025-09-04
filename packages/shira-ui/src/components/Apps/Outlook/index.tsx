import { FunctionComponent } from "react";
import styled, { createGlobalStyle } from 'styled-components'
import { Explanation } from "../../../domain/explanation";
import ExplanationTooltip from "../components/ExplanationTooltip";

import '../../../fonts/Segoe/style.css'
import { BlueHeader } from "./BlueHeader";
import Sidebar from "./Sidebar";
import { TopSectionBar } from "./TopSectionBar";
import { MainActionBar } from "./MainActionsBar";
import { Subject } from "./Subject";
import { LeftActions } from "./LeftActions";
import { EmailContent } from "./EmailContent";

export interface OutlookCustomElements {
  textContent: string,
  explanationPosition: string | null
}

export interface OutlookAttachmentElement { 
  name: string;
  position: string;
  explanationPosition?: string | null;
  fileType?: string;    
}

interface Props {
  content: HTMLElement;
  senderName: OutlookCustomElements;
  senderEmail: OutlookCustomElements;
  receiverName?: string;
  receiverEmail?: string;
  subject?: OutlookCustomElements;
  attachments?: any[];
  explanations?: Explanation[]
  explanationNumber?: number;
  showExplanations?: boolean
}


export const Outlook:FunctionComponent<Props> = ({
  content,
  senderName,
  senderEmail,
  receiverEmail,
  // receiverName,
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
      {/* add mobile header */}
      <Body>
        <Sidebar />
        <MainBody>
          <TopSectionBar />
          <MainActionBar />
          <ContentBody>
            <LeftActions receiverEmail={receiverEmail || 'youremail@hotmail.com' }/>
            <RightContentBody>
              <Subject subject={subject} />
              <EmailContent 
                content={content}
                attachments={attachments}
                senderName={senderName}
                senderEmail={senderEmail}
              />
            </RightContentBody>
          </ContentBody>
        </MainBody>
      </Body>
    </DesktopWrapper>
  )
}

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
  width: 100%;
  display: flex;  
`

const MainBody = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-right: 18px;
  padding-left: 8px;
  
  @media(max-width: ${props => props.theme.breakpoints.xs}) {
    padding: 0;
  }
`

const ContentBody = styled.div`
  display: flex;
`

const RightContentBody = styled.div`
  width: 100%;
  padding-left: 30px;

  @media(max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0;
  }
`