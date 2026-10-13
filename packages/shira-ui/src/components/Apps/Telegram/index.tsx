import { FunctionComponent } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import Sidebar from './Sidebar'
import SenderInfo from './SenderInfo'
import MessageWrapper from './MessageWrapper'
import { Explanation } from "../../../domain/explanation"
import ExplanationTooltip from "../components/ExplanationTooltip"
import useContactInfo from '../hooks/useContactInfo'

interface Props {
  content?: HTMLElement;
  phone: {
    textContent: string
    explanationPosition: string
  };
  explanations?: Explanation[]
  explanationNumber?: number;
  showExplanations?: boolean
}

export const Telegram: FunctionComponent<Props> = ({
  content,
  phone,
  explanations,
  explanationNumber,
  showExplanations
}) => {
  const { isOpen: showSenderInfo, open, close } = useContactInfo(showExplanations)

  return (
    <Wrapper className="telegram">
      {explanations && explanations.map(explanation => (
        <ExplanationTooltip
          explanation={explanation}
          explanationNumber={explanationNumber}
          showExplanations={showExplanations}
        />
      ))}
      <Font />

      <Content>
        <Sidebar phone={phone} content={content} />
        <MessageWrapper
          content={content}
          phone={phone}
          onOpenSenderInfo={open}
          showSenderInfo={showSenderInfo}
        />
        {showSenderInfo && (
          <SenderInfo
            phone={phone}
            content={content}
            onClose={close}
          />
        )}
      </Content>
    </Wrapper>
  )
}

const Font = createGlobalStyle`
  .telegram {
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
    background:
      radial-gradient(circle at 5% 5%, #e4e8b2 0%, transparent 45%),
      radial-gradient(circle at 95% 35%, #b4dba4 0%, transparent 50%),
      radial-gradient(circle at 15% 75%, #86ba7d 0%, transparent 55%),
      radial-gradient(circle at 90% 95%, #a8d69a 0%, transparent 50%),
      #9ac78c;
  }
`

const Content = styled.div`
  position: relative;
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

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    background: transparent;
  }
`

export default Telegram
