import { FunctionComponent } from 'react'
import styled from 'styled-components'
import ProfilePicture from '../../../../Whatsapp/ProfilePicture'

import NewMessageIcon from '../../../../Whatsapp/Icons/NewMessage'
import MoreOptionsIcon from '../../../../Whatsapp/Icons/MoreOptions'

interface Props { }

const Profile: FunctionComponent<Props> = () => {
  return (
    <Wrapper>
      <Title>Chats</Title>
      <Icons>
        <IconWrapper>
          <ProfilePicture imageSize="24px" />
        </IconWrapper>
        <IconWrapper>
          <NewMessageIcon />
        </IconWrapper>
        <IconWrapper>
          <MoreOptionsIcon />
        </IconWrapper>
      </Icons>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border-bottom: 1px solid #e2e2e2;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
`

const Title = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #222;
`

const Icons = styled.div`
  display: flex;
  align-items: center;
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
