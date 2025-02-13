import { FunctionComponent, useState } from 'react'
import { styled } from '@shira/ui'
import Recipient from './components/Recipient'
import Message from './components/Message'
import Background from './assets/background.png'
import { Attachment } from './components/Attachment'

interface Props {
  phone?: {
    textContent: string
    explanationPosition: string
  };
  content: HTMLElement
}

const MessageWrapper: FunctionComponent<Props> = ({
  phone,
  content
}) => {
  return (
    <Wrapper>
      <Recipient phone={phone}/>
      <ContentWrapper>
        <div>
        { Array.from(content.querySelectorAll('[id*="component-"]')).sort((a, b) => parseInt(a.getAttribute('data-position')) - parseInt(b.getAttribute('data-position'))).map((e) => (
          <>
            { e.getAttribute('id').includes('component-text') && (
              <Message data={e}/>
            )}

            { e.getAttribute('id').includes('component-attachment') && (
              <Attachment explanationPosition={e.getAttribute('data-explanation') || null} name={e.textContent}/>
            )}
          </>
        ))}
        </div>
      </ContentWrapper>
    </Wrapper>
  )

}

const Wrapper = styled.div`
  flex: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`

const ContentWrapper = styled.div`
  padding: 20px 12px;
  flex-grow: 1;
  background: url(${Background}) 100% 100% no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column-reverse;
  position: relative;
`

export default MessageWrapper