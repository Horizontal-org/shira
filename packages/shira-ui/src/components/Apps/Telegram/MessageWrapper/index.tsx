import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import Avatar from '../components/Avatar'
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
  onOpenSenderInfo: () => void
  showSenderInfo: boolean
  content?: HTMLElement
}

const MessageWrapper: FunctionComponent<Props> = ({
  phone,
  content,
  onOpenSenderInfo,
  showSenderInfo
}) => {
  const { t } = useTranslation('shira-ui')
  const components = content
    ? Array.from(content.querySelectorAll('[id*="component-"]')).sort((a, b) => parseInt(a.getAttribute('data-position') || '') - parseInt(b.getAttribute('data-position') || ''))
    : []

  return (
    <Wrapper>
      <Recipient
        phone={phone}
        onOpenSenderInfo={onOpenSenderInfo}
        showSenderInfo={showSenderInfo}
      />
      <ContentWrapper>
        <MessagesList>
          <ContactNotice phone={phone} />

          {components.length > 0 && <DatePill>{t('telegram.today')}</DatePill>}

          {components.map((e, index) => (
            <Row key={e.getAttribute('id')}>
              <AvatarSlot>
                {index === 0 && <Avatar name={phone?.textContent} size={44} />}
              </AvatarSlot>
              <Body>
                {index === 0 && <SenderName>{phone?.textContent}</SenderName>}

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
              </Body>
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
  min-height: 0;
  background: #fff;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    background: transparent;
  }
`

const ContentWrapper = styled.div`
  padding: 20px 24px 20px 16px;
  flex-grow: 1;
  min-height: 0;
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
    background: transparent;
    position: absolute;
    inset: 0;
    padding: 144px 10px 16px;
  }
`

const MessagesList = styled.div`
  flex: 1 0 auto;
  min-width: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: 6px;
  }
`

const DatePill = styled.span`
  display: none;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: block;
    align-self: center;
    padding: 2px 9px;
    border-radius: 12px;
    background: rgba(40, 85, 30, 0.4);
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    line-height: 1.4;
  }
`

const Row = styled.div`
  display: flex;
  gap: 14px;
  min-width: 0;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: block;
  }
`

const AvatarSlot = styled.div`
  width: 44px;
  flex-shrink: 0;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`

const Body = styled.div`
  flex-grow: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    position: relative;
    align-items: flex-start;

    /* Telegram only draws the bubble tail on the last message of a group */
    ${Row}:last-child & > * {
      border-end-start-radius: 6px;
    }

    ${Row}:last-child &::before {
      content: '';
      position: absolute;
      bottom: 0;
      inset-inline-start: -6px;
      width: 11px;
      height: 17px;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 11 17'%3E%3Cpath d='M11 0V17H0C4.5 16.5 9 13 11 6Z' fill='%23fff'/%3E%3C/svg%3E") no-repeat;
    }
  }
`

const SenderName = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #2f9ec9;
  text-align: start;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`

export default MessageWrapper
