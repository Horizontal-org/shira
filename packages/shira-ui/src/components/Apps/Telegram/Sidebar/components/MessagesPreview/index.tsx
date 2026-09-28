import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import ProfilePicture from '../../../../Whatsapp/ProfilePicture'
import Avatar from '../../../components/Avatar'

interface Props {
  phone?: {
    textContent: string
    explanationPosition: string
  };
}

const FILLER_CONTACTS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const MessagesPreview: FunctionComponent<Props> = ({ phone }) => {
  const { t } = useTranslation('shira-ui')

  return (
    <Wrapper>
      <Messages>
        {phone?.textContent && (
          <Message active>
            <PictureWrapper>
              <Avatar name={phone.textContent} size={54} />
            </PictureWrapper>
            <UserInfo>
              <UserInfoFirstRow>
                <Username>{phone.textContent}</Username>
                <Time>00:00</Time>
              </UserInfoFirstRow>
              <MessageContent>{t('telegram.untitled_document')}</MessageContent>
            </UserInfo>
          </Message>
        )}

        {FILLER_CONTACTS.map((contact) => (
          <Message key={contact}>
            <PictureWrapper>
              <ProfilePicture imageSize="54px" />
            </PictureWrapper>
            <UserInfo>
              <UserInfoFirstRow>
                <Username>{t(`whatsapp.contact_${contact}_name`)}</Username>
                <Time>{t(`whatsapp.contact_${contact}_time`)}</Time>
              </UserInfoFirstRow>
              <MessageContent>{t(`whatsapp.contact_${contact}_message`)}</MessageContent>
            </UserInfo>
          </Message>
        ))}
      </Messages>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex-grow: 1;
  min-height: 0;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px !important;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, .2);
  }
`

const Messages = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2px 4px;
`

const Message = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 8px;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  background: ${props => props.active ? '#4a95d6' : 'transparent'};

  &:hover {
    background: ${props => props.active ? '#4a95d6' : 'rgba(0, 0, 0, 0.04)'};
  }

  ${props => props.active && `
    ${Username}, ${Time}, ${MessageContent} {
      color: #fff;
    }
  `}

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    bottom: 0;
    inset-inline-start: 72px;
    inset-inline-end: 0;
    border-bottom: 0.5px solid #dcdcdc;
  }
`

const PictureWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`

const Username = styled.div`
  color: #000;
  font-size: 16px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const UserInfo = styled.div`
  flex-grow: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const UserInfoFirstRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8px;
`

const Time = styled.div`
  flex-shrink: 0;
  color: #8e8e93;
  font-size: 13px;
`

const MessageContent = styled.span`
  color: #8e8e93;
  font-size: 15px;
  line-height: 1.35;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

export default MessagesPreview
