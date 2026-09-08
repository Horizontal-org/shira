import { FunctionComponent } from 'react'
import styled from 'styled-components'
import Recipient from './components/Recipient'
import Message from './components/Message'
import { Attachment } from './components/Attachment'
import { MessagingImage } from './components/MessagingImage'

interface Props {
  phone?: {
    textContent: string
    explanationPosition: string
  };
  content?: HTMLElement
}

const MessageWrapper: FunctionComponent<Props> = ({
  phone,
  content
}) => {
  return (
    <Wrapper>
      <Recipient phone={phone} />
      <ContentWrapper>
        <MessagesList>
          {content && Array.from(content.querySelectorAll('[id*="component-"]')).sort((a, b) => parseInt(a.getAttribute('data-position') || '') - parseInt(b.getAttribute('data-position') || '')).map((e) => (
            <>
              {e.getAttribute('id').includes('component-text') && (
                <Message data={e} />
              )}

              {e.getAttribute('id').includes('component-attachment') && (
                <Attachment
                  explanationPosition={e.getAttribute('data-explanation') || null}
                  name={e.textContent}
                  type={e.getAttribute('data-attachment-type') || 'document'}
                />
              )}

              {e.getAttribute('id').includes('component-image') && (
                <MessagingImage data={e} />
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
`

const ContentWrapper = styled.div`
  padding: 20px 12px;
  flex-grow: 1;
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;
  background: #e7ecf0;
  display: flex;
  flex-direction: column-reverse;
  position: relative;
  overflow-x: hidden;
  overflow-y: scroll;
`

const MessagesList = styled.div`
  min-width: 0;
  width: 100%;
`

export default MessageWrapper
