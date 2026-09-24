import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import NewMessageIcon from '../../../../Whatsapp/Icons/NewMessage'

interface Props { }

const Profile: FunctionComponent<Props> = () => {
  const { t } = useTranslation('shira-ui')

  return (
    <Wrapper>
      <Spacer />
      <Title>{t('telegram.chats')}</Title>
      <Icons>
        <IconWrapper>
          <NewMessageIcon />
        </IconWrapper>
      </Icons>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border-bottom: 1px solid #e2e2e2;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 10px 16px;
`

const Spacer = styled.div`
  flex: 1;
`

const Title = styled.span`
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: #222;
`

const Icons = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const IconWrapper = styled.div`
  margin: 0 4px;
  padding: 6px;
  cursor: pointer;
  transition: background-color .1s;
  border-radius: 50%;

  &:active {
    background: rgba(11,20,26,0.1);
  }

  svg path {
    fill: #039BE5;
  }
`

export default Profile
