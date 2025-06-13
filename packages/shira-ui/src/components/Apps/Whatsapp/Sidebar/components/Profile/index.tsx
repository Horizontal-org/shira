import { FunctionComponent } from 'react'
import styled from 'styled-components'
import ProfilePicture from '../../../ProfilePicture'

import StoriesIcon from '../../../Icons/Stories'
import NewMessageIcon from '../../../Icons/NewMessage'
import MoreOptionsIcon from '../../../Icons/MoreOptions'

interface Props {}

const Profile: FunctionComponent<Props> = () => {
  return (
    <Wrapper>
      <div>
        <ProfilePicture />
      </div>
      <Icons>
        <IconWrapper>
          <StoriesIcon />
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
  border-right: 1px solid #d1d7db;
  background: #f0f2f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
`

const Icons = styled.div`
  display: flex;
`

const IconWrapper = styled.div`
  margin: 0 4px;
  padding: 8px;
  cursor: pointer;
  transition: background-color .1s;
  border-radius: 50%;

  &:active {
    background: rgba(11,20,26,0.1);
    cursor: pointer;
  }
`

export default Profile