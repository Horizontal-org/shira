import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import ProfilePicture from '../../../ProfilePicture'

interface Props {}

const MessagesPreview: FunctionComponent<Props> = () => {
  const { t } = useTranslation('shira-ui')

  return (
    <Wrapper>
      <Messages>
      <Message>
      <PictureWrapper>
        <ProfilePicture imageSize='49px' />
      </PictureWrapper>
      <UserInfo>
        <UserInfoFirstRow>
          <Username>
            <span>{t('whatsapp.contact_1_name')}</span>
          </Username>
          <Time>
            {t('whatsapp.contact_1_time')}
          </Time>
        </UserInfoFirstRow>
        <MessageContent>
        {t('whatsapp.contact_1_message')}        </MessageContent>
      </UserInfo>
    </Message>

    <Message>
      <PictureWrapper>
        <ProfilePicture imageSize='49px' />
      </PictureWrapper>
      <UserInfo>
        <UserInfoFirstRow>
          <Username>
            <span>{t('whatsapp.contact_2_name')}</span>
          </Username>
          <Time>
            {t('whatsapp.contact_2_time')}
          </Time>
        </UserInfoFirstRow>
        <MessageContent>
        {t('whatsapp.contact_2_message')}        </MessageContent>
      </UserInfo>
    </Message>

    <Message>
      <PictureWrapper>
        <ProfilePicture imageSize='49px' />
      </PictureWrapper>
      <UserInfo>
        <UserInfoFirstRow>
          <Username>
            <span>{t('whatsapp.contact_3_name')}</span>
          </Username>
          <Time>
            {t('whatsapp.contact_3_time')}
          </Time>
        </UserInfoFirstRow>
        <MessageContent>
        {t('whatsapp.contact_3_message')}        </MessageContent>
      </UserInfo>
    </Message>

    <Message>
      <PictureWrapper>
        <ProfilePicture imageSize='49px' />
      </PictureWrapper>
      <UserInfo>
        <UserInfoFirstRow>
          <Username>
            <span>{t('whatsapp.contact_4_name')}</span>
          </Username>
          <Time>
            {t('whatsapp.contact_4_time')}
          </Time>
        </UserInfoFirstRow>
        <MessageContent>
        {t('whatsapp.contact_4_message')}        </MessageContent>
      </UserInfo>
    </Message>

    <Message>
      <PictureWrapper>
        <ProfilePicture imageSize='49px' />
      </PictureWrapper>
      <UserInfo>
        <UserInfoFirstRow>
          <Username>
            <span>{t('whatsapp.contact_5_name')}</span>
          </Username>
          <Time>
            {t('whatsapp.contact_5_time')}
          </Time>
        </UserInfoFirstRow>
        <MessageContent>
        {t('whatsapp.contact_5_message')}
        </MessageContent>
      </UserInfo>
    </Message>

    <Message>
      <PictureWrapper>
        <ProfilePicture imageSize='49px' />
      </PictureWrapper>
      <UserInfo>
        <UserInfoFirstRow>
          <Username>
            <span>{t('whatsapp.contact_6_name')}</span>
          </Username>
          <Time>
            {t('whatsapp.contact_6_time')}
          </Time>
        </UserInfoFirstRow>
        <MessageContent>
        {t('whatsapp.contact_6_message')}        </MessageContent>
      </UserInfo>
    </Message>

    <Message>
      <PictureWrapper>
        <ProfilePicture imageSize='49px' />
      </PictureWrapper>
      <UserInfo>
        <UserInfoFirstRow>
          <Username>
            <span>{t('whatsapp.contact_7_name')}</span>
          </Username>
          <Time>
            {t('whatsapp.contact_7_time')}
          </Time>
        </UserInfoFirstRow>
        <MessageContent>
        {t('whatsapp.contact_7_message')}
        </MessageContent>
      </UserInfo>
    </Message>

    <Message>
      <PictureWrapper>
        <ProfilePicture imageSize='49px' />
      </PictureWrapper>
      <UserInfo>
        <UserInfoFirstRow>
          <Username>
            <span>{t('whatsapp.contact_8_name')}</span>
          </Username>
          <Time>
            {t('whatsapp.contact_8_time')}
          </Time>
        </UserInfoFirstRow>
        <MessageContent>
        {t('whatsapp.contact_8_message')}
        </MessageContent>
      </UserInfo>
    </Message>

    <Message>
      <PictureWrapper>
        <ProfilePicture imageSize='49px' />
      </PictureWrapper>
      <UserInfo>
        <UserInfoFirstRow>
          <Username>
            <span>{t('whatsapp.contact_9_name')}</span>
          </Username>
          <Time>
            {t('whatsapp.contact_9_time')}
          </Time>
        </UserInfoFirstRow>
        <MessageContent>
        {t('whatsapp.contact_9_message')}
        </MessageContent>
      </UserInfo>
    </Message>
      </Messages>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex-grow: 1;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 6px !important;
    height:: 6px !important;
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

const Message = styled.div`
  height: 72px;
  display: flex;
  cursor: pointer;
  transition: none 0s ease 0s;

  &:hover {
    background: #f5f6f6;
  }
`

const PictureWrapper = styled.div`
  padding: 0 15px 0 13px;
  display: flex;
  align-items: center;
`

const Username = styled.div`
  font-family: Segoe UI Regular;
  color: #111b21;
`

const UserInfo = styled.div`
  flex-grow: 1;
  padding: 14px 0;
  border-bottom: 1px solid #e9edef;
  min-width: 0;
`

const UserInfoFirstRow = styled.div`
  display: flex;
  justify-content: space-between;
`

const Time = styled.div`
  font-family: Segoe UI Regular;
  padding-top: 4px;
  padding-right: 10px;
  color: #667781;
  line-height: 14px;
  font-size: 12px;
`

const MessageContent = styled.span`
  color: #667781;
  font-size: 14px;
  font-family: Segoe UI Regular;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
  min-width: 0;
  flex-shrink: 1;
  max-width: 250px;
`

export default MessagesPreview
