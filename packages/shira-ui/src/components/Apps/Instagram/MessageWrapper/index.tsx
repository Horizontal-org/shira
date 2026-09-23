import { FunctionComponent } from 'react'
import styled from 'styled-components'
import Recipient from './components/Recipient'
import Message from './components/Message'
import { MessagingImage } from './components/MessagingImage'
import { SharedPost } from './components/SharedPost'

interface Props {
  senderName?: {
    textContent: string
    explanationPosition: string
  };
  content?: HTMLElement
}

const MessageWrapper: FunctionComponent<Props> = ({
  senderName,
  content
}) => {
  return (
    <Wrapper>
      <Recipient senderName={senderName} />
      <ContentWrapper>
        <MessagesList>
          {content && Array.from(content.querySelectorAll('[id*="component-"]')).sort((a, b) => parseInt(a.getAttribute('data-position') || '') - parseInt(b.getAttribute('data-position') || '')).map((e) => (
            <>
              {e.getAttribute('id').includes('component-text') && (
                <Message data={e} />
              )}

              {e.getAttribute('id').includes('component-image') && (
                <MessagingImage data={e} />
              )}

              {e.getAttribute('id').includes('component-shared-post') && (
                <SharedPost data={e} />
              )}
            </>
          ))}
        </MessagesList>
      </ContentWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex: 68%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  min-width: 0;
  background: #fff;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    background: #fafafa;
  }
`

const ContentWrapper = styled.div`
  padding: 20px 24px;
  flex-grow: 1;
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;
  background: #fff;
  display: flex;
  flex-direction: column-reverse;
  position: relative;
  overflow-x: hidden;
  overflow-y: scroll;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    background: #fafafa;
    position: absolute;
    inset: 0;
    padding: 130px 12px 20px;
  }
`

const MessagesList = styled.div`
  min-width: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: 8px;
  }
`

export default MessageWrapper
