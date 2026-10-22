import { FunctionComponent } from "react"
import styled, { createGlobalStyle } from 'styled-components'

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
import { DynamicContent } from "./styles/ContentStyles"
import { useTranslation } from "react-i18next"

interface CustomElements {
  textContent: string,
  explanationPosition: string | null
}

export interface AttachmentElement {
  name: string;
  position: string;
  explanationPosition?: string | null;
  fileType?: string;
}

interface Props {
  content: HTMLElement;
  senderName: CustomElements;
  senderEmail: CustomElements;
  receiverName?: string;
  receiverEmail?: string;
  subject?: CustomElements;
  attachments?: AttachmentElement[];
  explanations?: Explanation[]
  explanationNumber?: number;
  showExplanations?: boolean
}

const parseSubjectText = (subjectText: string) => {
  return subjectText && subjectText.length > 0 ?
    subjectText : `(no subject)`
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

  const { t } = useTranslation('shira-ui')

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
              {subject && (
                <Subject>
                  <span
                    data-explanation={subject.explanationPosition}
                  >
                    {parseSubjectText(subject.textContent)}
                  </span>
                  <InboxLabel>
                    <InboxLabelText>{t('gmail.inbox')}</InboxLabelText>
                    <InboxLabelButton></InboxLabelButton>
                  </InboxLabel>
                </Subject>
              )}
              <Profile
                receiverEmail={receiverEmail}
                receiverName={receiverName}
                senderEmail={senderEmail}
                senderName={senderName}
                subject={parseSubjectText(subject ? subject.textContent : '')}
              />
              <PaddingLeft>
                <DynamicContent dangerouslySetInnerHTML={{ __html: content ? content.outerHTML : null }}></DynamicContent>
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
  padding: 10px 0;
  box-sizing: border-box;
`

const MiddleWrapper = styled.div`
  width: 100%;
  height: 100%;
  
  background: white;
  margin: 0 8px;
  border-radius: 16px;  
  padding-bottom: 40px;
`

const DynamicWrapper = styled.div`
  padding: 10px;
`

const Subject = styled.div`
  color: #1f1f1f;
  font-weight: 400;
  font-size: 1.375rem;
  padding-top: 8px;
  padding-inline-end: 0;
  padding-bottom: 8px;
  padding-inline-start: 53px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding-top: 8px;
    padding-inline-end: 0;
    padding-bottom: 8px;
    padding-inline-start: 8px;
    width: 100%;
  }

  > span {
    text-wrap: wrap;
    position: relative;
    padding-inline-end: 10px;
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
  border-start-start-radius: 4px;
  border-start-end-radius: 0;
  border-end-end-radius: 0;
  border-end-start-radius: 4px;
  background: #ddd;
  color: #666;
  padding-top: 0;
  padding-inline-end: .1666666667em;
  padding-bottom: 0;
  padding-inline-start: 4px;
  height: 18px;

  &:hover {
    background: #666;
    color: #ddd;
  }
`

const InboxLabelButton = styled.span`
  display: inline-block;
  border-start-start-radius: 0;
  border-start-end-radius: 4px;
  border-end-end-radius: 4px;
  border-end-start-radius: 0;
  background: #ddd;
  color: #666;
  font-size: 15px;
  padding-top: 0;
  padding-inline-end: 4px;
  padding-bottom: 0;
  padding-inline-start: .1666666667em;
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

const PaddingLeft = styled.div`
  padding-inline-start: 53px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding-inline-start: 8px;
  }
`

export default Gmail