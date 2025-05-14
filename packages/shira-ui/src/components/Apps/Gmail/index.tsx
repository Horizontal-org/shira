import { FunctionComponent } from "react"
import { styled, createGlobalStyle } from '@shira/ui'

import Header from './Header'
import Sidebar from "./Sidebar"
import MailOptions from "./MailOptions"
import Applications from "./Applications"

// google font 
import '../../../fonts/GoogleSans/style.css'
import { Profile } from "./Profile"
import { Attachments } from "./Attachments"
import { Explanation } from "../../../domain/explanation"
import ExplanationTooltip from "../components/ExplanationTooltip"

interface CustomElements {
  textContent: string,
  explanationPosition: string | null
}

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

export const Gmail: FunctionComponent<Props> = ({ 
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
    <DesktopWrapper className="gmail">
      {explanations && explanations.map(explanation => (
        <ExplanationTooltip
          explanation={explanation} 
          explanationNumber={explanationNumber}
          showExplanations={showExplanations}
        />
      ))}
      <Font />
      <Header />
      <Content>
        <Sidebar />
        <MiddleWrapper>
          <MailOptions />
          <DynamicWrapper>
            <div>
              { subject && (
                <Subject>
                  <span
                    data-explanation={subject.explanationPosition}
                  >
                    {subject.textContent}
                  </span>
                  <InboxLabel>
                    <InboxLabelText>Inbox</InboxLabelText>
                    <InboxLabelButton></InboxLabelButton>
                  </InboxLabel>
                </Subject>
              )}
              <Profile 
                receiverEmail={receiverEmail}
                receiverName={receiverName}
                senderEmail={senderEmail}
                senderName={senderName}
                subject={subject}
              />
              <PaddingLeft>
                <DynamicContent dangerouslySetInnerHTML={{__html: content ? content.outerHTML : null }}></DynamicContent>
                {attachments && attachments.length > 0 && (
                  <Attachments
                    data={attachments}
                  />    
                )}
              </PaddingLeft>
            </div>
          </DynamicWrapper>
        </MiddleWrapper>
        <Applications />
      </Content>
    </DesktopWrapper>
  )
}

const Font = createGlobalStyle`
  .gmail {
    font-family: 'Product Sans Regular';
  }
`

const DesktopWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background: #F8FAFD;
`

const Content = styled.div`
  display: flex;
  height: calc(100% - 68px);
  padding: 10px 0;
  box-sizing: border-box;
`

const MiddleWrapper = styled.div`
  width: 100%;
  height: 100%;
  
  background: white;
  margin: 0 8px;
  border-radius: 16px;  
`

const DynamicWrapper = styled.div`
  padding: 10px;
`

const Subject = styled.div`
  color: #1f1f1f;
  font-weight: 400;
  font-size: 1.375rem;
  padding: 8px 0 8px 53px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 8px 0 8px 8px;
    width: 100%;
  }

  > span {
    text-wrap: wrap;
    position: relative;
    padding-right: 10px;
  }
`

const InboxLabel = styled.div`  
  display: flex;
  align-items: center;

  display: inline-block;
  overflow: hidden;
  cursor: pointer;

  font-size: .75rem;
  letter-spacing: normal;
  cursor: pointer;
  font-weight: 400;
  line-height: 18px;
  white-space: nowrap;
`

const InboxLabelText = styled.span`
  display: inline-block;
  border-radius: 4px 0 0 4px;
  background: #ddd;
  color: #666;
  padding: 0 .1666666667em 0 4px;
  height: 18px;

  &:hover {
    background: #666;
    color: #ddd;
  }
`

const InboxLabelButton = styled.span`
  display: inline-block;
  border-radius: 0 4px 4px 0;
  background: #ddd;
  color: #666;
  font-size: 15px;
  padding: 0 4px 0 .1666666667em;
  height: 18px;
  vertical-align: bottom;
  
  &:before {
    content: "×";
  }

  &:hover {
    background: #666;
    color: #ddd;
  }
`

const DynamicContent = styled.div`
  padding: 10px 0;
  mark {
    background-color: transparent;
    position: relative;
  }
`

const PaddingLeft = styled.div`
  padding-left: 53px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding-left: 8px;
  }
`

export default Gmail