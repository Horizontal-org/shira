import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { LuChevronDown, LuSquarePen } from 'react-icons/lu'

interface Props { }

const Profile: FunctionComponent<Props> = () => {
  const { t } = useTranslation('shira-ui')

  return (
    <Wrapper>
      <AccountName>
        {t('instagram.account_name')}
        <LuChevronDown />
      </AccountName>
      <IconWrapper>
        <LuSquarePen />
      </IconWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 36px 16px 14px 24px;
`

const AccountName = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 20px;
  font-weight: 700;
  color: #000;

  > svg {
    width: 18px;
    height: 18px;
    stroke-width: 2.5;
  }
`

const IconWrapper = styled.div`
  display: flex;
  padding: 8px;
  cursor: pointer;

  > svg {
    width: 24px;
    height: 24px;
    color: #000;
  }
`

export default Profile
