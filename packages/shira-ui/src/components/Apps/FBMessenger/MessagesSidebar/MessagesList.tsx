import { FunctionComponent  } from "react"
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import ProfilePicture from "../../Whatsapp/ProfilePicture"

const MessagesList: FunctionComponent = () => {
  const { t } = useTranslation('shira-ui')

  return (
    <Wrapper>
      <Card active>
        <ProfilePicture />

        <MessageInfo>
          <div>{t('messenger.contact_1_name')}</div>
          <SecondaryText>
            <span>{t('messenger.contact_1_message')}</span>
          </SecondaryText>
        </MessageInfo>

      </Card>

      <Card>
        <ProfilePicture />

        <MessageInfo>
          <div>{t('messenger.contact_2_name')}</div>
          <SecondaryText>
            <span>{t('messenger.contact_2_message')}</span>
          </SecondaryText>
        </MessageInfo>

      </Card>

      <Card>
        <ProfilePicture />

        <MessageInfo>
          <div>{t('messenger.contact_3_name')}</div>
          <SecondaryText>
            <span>{t('messenger.contact_3_message')}</span>
          </SecondaryText>
        </MessageInfo>

      </Card>

      <Card>
        <ProfilePicture />

        <MessageInfo>
          <div>{t('messenger.contact_4_name')}</div>
          <SecondaryText>
            <span>{t('messenger.contact_4_message')}</span>
          </SecondaryText>
        </MessageInfo>

      </Card>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-top: 16px;

`

interface CardProps{
  active?: boolean
}

const Card = styled('div')<CardProps>`
  display: flex;
  align-items: center;
  height: 52px;
  padding: 8px;

  border-radius: 8px;

  background: ${props => props.active ?
    'rgba(60,64,67,.03)' : 'transparent'
  };

  &:hover {
    background: rgba(60,64,67,.1);
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    justify-content: center;
  }
`

const SecondaryText = styled.div`
  color: #65676B;
  font-size: .8125rem;
  font-weight: light;
  padding-top: 4px;
`

const MessageInfo = styled.div`
  padding-inline-start: 8px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`

export default MessagesList
