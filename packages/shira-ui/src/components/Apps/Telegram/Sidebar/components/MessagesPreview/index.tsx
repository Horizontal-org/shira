import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import ProfilePicture from '../../../../Whatsapp/ProfilePicture'
import StrangerPicture from '../../../../Whatsapp/StrangerPicture'

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
              <StrangerPicture />
            </PictureWrapper>
            <UserInfo>
              <UserInfoFirstRow>
                <Username>{phone.textContent}</Username>
              </UserInfoFirstRow>
              <MessageContent>Untitled document.txt</MessageContent>
            </UserInfo>
          </Message>
        )}

        {FILLER_CONTACTS.map((contact) => (
          <Message key={contact}>
            <PictureWrapper>
              <ProfilePicture imageSize="49px" />
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
  overflow-y: scroll;

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
  height: 72px;
  display: flex;
  cursor: pointer;
  background: ${props => props.active ? '#e2f2fc' : 'transparent'};

  &:hover {
    background: ${props => props.active ? '#e2f2fc' : '#f5f6f6'};
  }
`

const PictureWrapper = styled.div`
  padding: 0 13px;
  display: flex;
  align-items: center;
`

const Username = styled.div`
  color: #111b21;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const UserInfo = styled.div`
  flex-grow: 1;
  padding: 14px 16px 14px 0;
  border-bottom: 1px solid #e9edef;
  min-width: 0;
`

const UserInfoFirstRow = styled.div`
  display: flex;
  justify-content: space-between;
`

const Time = styled.div`
  padding-top: 4px;
  padding-inline-end: 10px;
  color: #667781;
  line-height: 14px;
  font-size: 12px;
`

const MessageContent = styled.span`
  color: #667781;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
  min-width: 0;
  flex-shrink: 1;
  max-width: 250px;
`

export default MessagesPreview
