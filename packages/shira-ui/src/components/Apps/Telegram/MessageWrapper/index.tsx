import { FunctionComponent, useState } from 'react'
import styled from 'styled-components'
import Recipient from './components/Recipient'
import ContactNotice from './components/ContactNotice'
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
  const [showNotice, setShowNotice] = useState(true)

  return (
    <Wrapper>
      <Recipient
        phone={phone}
        showNotice={showNotice}
        onCloseNotice={() => setShowNotice(false)}
      />
      <ContentWrapper>
        <MessagesList>
          <ContactNotice phone={phone} />

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
  background: #e7ecf0;
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

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    position: absolute;
    inset: 0;
    padding-top: 130px;
  }
`

const MessagesList = styled.div`
  min-width: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export default MessageWrapper
