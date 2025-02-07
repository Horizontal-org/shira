import { FunctionComponent } from "react"
import { styled, createGlobalStyle } from '@horizontal-org/shira-ui'

import Header from './Header'
import Sidebar from "./Sidebar"
import MailOptions from "./MailOptions"
import Applications from "./Applications"
// google font 
import '../../../fonts/GoogleSans/style.css'
import { Profile } from "./Profile"
import { Attachments } from "./Attachments"
import { Explanation } from "../../../domain/explanation"
import ExplanationTooltip from "../../UI/ExplanationTooltip"

interface CustomElements {
  textContent: string,
  explanationPosition: string | null
}

interface Props {
  content: HTMLElement;
  senderName: CustomElements;
  senderEmail: CustomElements;
  subject?: CustomElements;
  attachments?: any[];
  explanations?: Explanation[]
  explanationNumber: number;
  showExplanations: boolean
}

const Gmail: FunctionComponent<Props> = ({ 
  content,
  senderName,
  senderEmail,
  subject,
  attachments,
  explanations,
  explanationNumber,
  showExplanations
}) => {

  return (
    <DesktopWrapper className="gmail">
      {explanations.map(explanation => (
        <ExplanationTooltip 
          explanation={explanation} 
          explanationNumber={explanationNumber}
          showExplanations={showExplanations}
        />
      ))}
      <Font />
      <div>
        <Header />
      </div>
      <Content>
        <Sidebar />
        <MiddleWrapper>
          <MailOptions />
          <DynamicWrapper>
            <div>
              <Subject>
                <span
                  data-explanation={subject.explanationPosition}
                >
                  {subject.textContent}
                </span>
              </Subject>
              <Profile 
                senderEmail={senderEmail}
                senderName={senderName}
              />
              <PaddingLeft>
                <DynamicContent dangerouslySetInnerHTML={{__html: content.outerHTML}}></DynamicContent>
                {attachments.length > 0 && (
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
`

const Content = styled.div`
  display: flex;
`

const MiddleWrapper = styled.div`
  width: 100%;
`

const DynamicWrapper = styled.div`
  padding: 10px;
`

const Subject = styled.div`
  color: #1f1f1f;
  font-weight: 400;
  font-size: 1.375rem;
  padding: 8px 0 8px 53px;
  width: max-content;
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 8px 0 8px 8px;
    width: 100%;
  }

  span {
    position: relative;
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