import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { LuSquarePen } from 'react-icons/lu'

interface Props { }

const Profile: FunctionComponent<Props> = () => {
  const { t } = useTranslation('shira-ui')

  return (
    <Wrapper>
      <Spacer />
      <Title>{t('telegram.chats')}</Title>
      <Icons>
        <IconWrapper>
          <LuSquarePen />
        </IconWrapper>
      </Icons>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 14px 10px;
`

const Spacer = styled.div`
  flex: 1;
`

const Title = styled.span`
  flex: 1;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: #000;
`

const Icons = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const IconWrapper = styled.div`
  display: flex;
  padding: 2px;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color .1s;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  > svg {
    width: 22px;
    height: 22px;
    color: #3390ec;
  }
`

export default Profile
