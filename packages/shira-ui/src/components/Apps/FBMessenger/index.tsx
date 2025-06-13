import { FunctionComponent  } from "react"
import styled from 'styled-components'

import MessageSidebar from "./MessagesSidebar/Index"
import Chat from "./Chat"

import '../../../fonts/Segoe/style.css'

import { Explanation } from "../../../domain/explanation"
import ExplanationTooltip from "../components/ExplanationTooltip"

interface Props {
  content: HTMLElement;
  fullname: {
    textContent: string;
    explanationPosition: string;
  }
  explanations?: Explanation[]
  explanationNumber?: number,
  showExplanations?: boolean
}

export const FBMessenger: FunctionComponent<Props> = ({ 
  fullname, 
  content,
  explanations = [],
  explanationNumber,
  showExplanations
}) => {
  return (
    <DesktopWrapper>
      {explanations && explanations.map(explanation => (
        <ExplanationTooltip 
          explanation={explanation}
          explanationNumber={explanationNumber}
          showExplanations={showExplanations}
        />
      ))}
      <Content>
        <MessageSidebar />
        <Chat content={content} fullname={fullname} />
      </Content>
    </DesktopWrapper>
  )
}

const DesktopWrapper = styled.div`
  width: 100%;
  height: 100%;
  font-family: 'Helvetica Neue', system-ui, -apple-system, BlinkMacSystemFont, '.SFNSText-Regular', sans-serif;
`

const Content = styled.div`
  display: flex;
  height: 100%;
  mark {
    background-color: transparent;
    position: relative;
  }
`

export default FBMessenger