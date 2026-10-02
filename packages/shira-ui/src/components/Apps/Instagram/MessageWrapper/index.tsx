import { FunctionComponent } from 'react'
import styled from 'styled-components'
import Recipient from './components/Recipient'
import Message from './components/Message'
import { MessagingImage } from './components/MessagingImage'
import { SharedPost } from './components/SharedPost'
import Avatar from '../components/Avatar'

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
  const components = content
    ? Array.from(content.querySelectorAll('[id*="component-"]')).sort((a, b) => parseInt(a.getAttribute('data-position') || '') - parseInt(b.getAttribute('data-position') || ''))
    : []

  return (
    <Wrapper>
      <Recipient senderName={senderName} />
      <ContentWrapper>
        <MessagesList>
          {components.map((e, index) => (
            <Row key={index}>
              <AvatarSlot>
                {index === components.length - 1 && (
                  <Avatar name={senderName?.textContent} size={28} />
                )}
              </AvatarSlot>

              {e.getAttribute('id').includes('component-text') && (
                <Message data={e} />
              )}

              {e.getAttribute('id').includes('component-image') && (
                <MessagingImage data={e} />
              )}

              {e.getAttribute('id').includes('component-shared-post') && (
                <SharedPost data={e} />
              )}
            </Row>
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
`

const ContentWrapper = styled.div`
  padding: 20px 16px;
  flex-grow: 1;
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;
  background: #fff;
  display: flex;
  flex-direction: column-reverse;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    position: absolute;
    inset: 0;
    padding: 72px 12px 20px;
  }
`

const MessagesList = styled.div`
  min-width: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const Row = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  min-width: 0;
`

const AvatarSlot = styled.div`
  width: 28px;
  flex-shrink: 0;
`

export default MessageWrapper
