import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import NewMessageIcon from '../../../../Whatsapp/Icons/NewMessage'
import Chevron from '../../../Icons/Chevron'

interface Props { }

const Profile: FunctionComponent<Props> = () => {
  const { t } = useTranslation('shira-ui')

  return (
    <Wrapper>
      <AccountName>
        {t('instagram.account_name')}
        <Chevron />
      </AccountName>
      <IconWrapper>
        <NewMessageIcon />
      </IconWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
`

const AccountName = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 20px;
  font-weight: 600;
  color: #000;

  > svg {
    width: 12px;
    height: 12px;
  }
`

const IconWrapper = styled.div`
  display: flex;
  padding: 6px;
  cursor: pointer;
  border-radius: 50%;

  &:active {
    background: rgba(11,20,26,0.1);
  }
`

export default Profile
