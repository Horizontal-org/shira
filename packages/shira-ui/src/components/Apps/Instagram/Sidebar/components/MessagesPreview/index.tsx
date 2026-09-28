import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import ProfilePicture from '../../../../Whatsapp/ProfilePicture'
import Avatar from '../../../components/Avatar'

interface Props {
  senderName?: {
    textContent: string
    explanationPosition: string
  };
}

const FILLER_CONTACTS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const MessagesPreview: FunctionComponent<Props> = ({ senderName }) => {
  const { t } = useTranslation('shira-ui')

  return (
    <Wrapper>
      <Messages>
        {senderName?.textContent && (
          <Message active>
            <Avatar name={senderName.textContent} size={56} />
            <UserInfo>
              <Username>{senderName.textContent}</Username>
              <Details>
                <MessageContent>{t('instagram.new_message')}</MessageContent>
              </Details>
            </UserInfo>
          </Message>
        )}

        {FILLER_CONTACTS.map((contact) => (
          <Message key={contact}>
            <ProfilePicture imageSize="56px" />
            <UserInfo>
              <Username>{t(`whatsapp.contact_${contact}_name`)}</Username>
              <Details>
                <MessageContent>{t(`whatsapp.contact_${contact}_message`)}</MessageContent>
                <Time>· {t(`whatsapp.contact_${contact}_time`)}</Time>
              </Details>
            </UserInfo>
          </Message>
        ))}
      </Messages>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex-grow: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px !important;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255,.1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, .2);
  }
`

const Messages = styled.div`
  display: flex;
  flex-direction: column;
`

const Message = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 24px;
  border-radius: 12px;
  cursor: pointer;
  background: ${props => props.active ? '#efefef' : 'transparent'};

  &:hover {
    background: ${props => props.active ? '#efefef' : '#f5f5f5'};
  }

  > div:first-child {
    flex-shrink: 0;
  }
`

const UserInfo = styled.div`
  flex-grow: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const Username = styled.div`
  color: #000;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Details = styled.div`
  display: flex;
  gap: 4px;
  min-width: 0;
  color: #737373;
  font-size: 13px;
`

const MessageContent = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  min-width: 0;
`

const Time = styled.span`
  flex-shrink: 0;
  white-space: nowrap;
`

export default MessagesPreview
