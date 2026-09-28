import { FunctionComponent } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import Navbar from './Navbar'
import Sidebar from './Sidebar'
import MessageWrapper from './MessageWrapper'
import { Explanation } from '../../../domain/explanation'
import ExplanationTooltip from '../components/ExplanationTooltip'
import Battery from '../components/Phone/Icons/BatteryIcon'
import Signal from '../components/Phone/Icons/SignalIcon'
import WiFi from '../components/Phone/Icons/WiFiIcon'

interface Props {
  content?: HTMLElement;
  senderName: {
    textContent: string
    explanationPosition: string
  };
  explanations?: Explanation[]
  explanationNumber?: number;
  showExplanations?: boolean
}

export const Instagram: FunctionComponent<Props> = ({
  content,
  senderName,
  explanations,
  explanationNumber,
  showExplanations
}) => {
  return (
    <Wrapper className="instagram">
      {explanations && explanations.map(explanation => (
        <ExplanationTooltip
          explanation={explanation}
          explanationNumber={explanationNumber}
          showExplanations={showExplanations}
        />
      ))}
      <Font />

      <StatusBar>
        <span>9:30</span>
        <StatusIcons>
          <WiFi />
          <Signal />
          <Battery />
        </StatusIcons>
      </StatusBar>

      <Content>
        <Navbar />
        <Sidebar senderName={senderName} />
        <MessageWrapper
          content={content}
          senderName={senderName}
        />
      </Content>
    </Wrapper>
  )
}

const Font = createGlobalStyle`
  .instagram {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0,0,0,0.2);

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    border-radius: 0;
    box-shadow: none;
  }
`

const StatusBar = styled.div`
  display: none;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  padding: 8px 20px 4px;
  background: #fff;
  color: #000;
  font-weight: 600;
  font-size: 14px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: flex;
  }
`

const StatusIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  svg path {
    fill: #000;
    opacity: 1;
  }
`

const Content = styled.div`
  flex-grow: 1;
  min-height: 0;
  width: 100%;
  background: #fff;
  display: flex;

  mark {
    background: transparent;
    position: relative;
    color: inherit;
    text-decoration: inherit;
  }
`

export default Instagram
