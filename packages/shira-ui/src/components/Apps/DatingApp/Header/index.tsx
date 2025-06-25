import { FunctionComponent } from 'react'
import styled from 'styled-components'
import BackArrow from './Icons/BackArrow'
import MoreOptions from './Icons/MoreOptions'
import Stranger from './Icons/Stranger'
import Video from './Icons/Video'

interface Props {
  phone: {
    textContent: string;
    explanationPosition: string;
  };
}

export const Header: FunctionComponent<Props> = ({ phone }) => {
  return (
    <Wrapper>
      <FlexWrapper>
        <BackArrow />
        <Profile>
          <AvatarWrapper>
            <Stranger />
          </AvatarWrapper>
          <UserInfo>
            <UserName>
              <OnlineMark></OnlineMark>
              <span data-explanation={phone.explanationPosition} className='userInfo'>{phone.textContent}</span>
            </UserName>
            <Location>832 feet away</Location>
          </UserInfo>
        </Profile>
      </FlexWrapper>
      <FlexWrapper>
        <VideoWrapper>
          <Video />
        </VideoWrapper>
        <MoreOptions />
      </FlexWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 0 8px 8px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Profile = styled.div`
  display: flex;
  padding-left: 8px;
`
const UserInfo = styled.div`
  color: #fafafa;
`

const UserName = styled.div`
  display: flex;
  align-items: center;
`

const OnlineMark = styled.div`
  background-color: green;
  width: 8px;
  height: 8px;
  border-radius:50%;
  margin-right: 8px;
`

const AvatarWrapper = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  padding: 4px;
  background: #2C2C2E;
  margin-right: 8px;
`

const Location = styled.div`
  color: #9E9EA8;
  font-size: .8rem;
  font-weight: light;
`

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
`

const VideoWrapper = styled.div`
  padding-right: 8px;
`