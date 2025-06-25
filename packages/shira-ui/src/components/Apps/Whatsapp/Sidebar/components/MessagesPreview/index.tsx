import { FunctionComponent } from 'react'
import styled from 'styled-components'
import ProfilePicture from '../../../ProfilePicture'

interface Props {}

const MessagesPreview: FunctionComponent<Props> = () => {
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
            <span>Mark Curry</span>
          </Username>
          <Time>
            12:04 PM
          </Time>
        </UserInfoFirstRow>
        <MessageContent>
        On second thoughts, let's not go there        </MessageContent>
      </UserInfo>
    </Message>

    <Message>
      <PictureWrapper>
        <ProfilePicture imageSize='49px' />
      </PictureWrapper>
      <UserInfo>
        <UserInfoFirstRow>
          <Username>
            <span>Ruby Mejia</span>
          </Username>
          <Time>
            11:00 AM
          </Time>
        </UserInfoFirstRow>
        <MessageContent>
        Well, I didn't vote for you        </MessageContent>
      </UserInfo>
    </Message>

    <Message>
      <PictureWrapper>
        <ProfilePicture imageSize='49px' />
      </PictureWrapper>
      <UserInfo>
        <UserInfoFirstRow>
          <Username>
            <span>Connie Zamora</span>
          </Username>
          <Time>
            09:47 PM
          </Time>
        </UserInfoFirstRow>
        <MessageContent>
        Can you put it on my calendar?        </MessageContent>
      </UserInfo>
    </Message>

    <Message>
      <PictureWrapper>
        <ProfilePicture imageSize='49px' />
      </PictureWrapper>
      <UserInfo>
        <UserInfoFirstRow>
          <Username>
            <span>Farrah Guerra</span>
          </Username>
          <Time>
            03:03 AM
          </Time>
        </UserInfoFirstRow>
        <MessageContent>
        I am attempting to harness the innate energy of cyclic harmonic repitition        </MessageContent>
      </UserInfo>
    </Message>

    <Message>
      <PictureWrapper>
        <ProfilePicture imageSize='49px' />
      </PictureWrapper>
      <UserInfo>
        <UserInfoFirstRow>
          <Username>
            <span>Annabel Carpenter</span>
          </Username>
          <Time>
            12:45 AM
          </Time>
        </UserInfoFirstRow>
        <MessageContent>
        what about scaling components to a global audience?
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
            <span>Jesse Bass
</span>
          </Username>
          <Time>
            05:05 PM
          </Time>
        </UserInfoFirstRow>
        <MessageContent>
        I can't get involved! I've got work to do!        </MessageContent>
      </UserInfo>
    </Message>

    <Message>
      <PictureWrapper>
        <ProfilePicture imageSize='49px' />
      </PictureWrapper>
      <UserInfo>
        <UserInfoFirstRow>
          <Username>
            <span>Reggie Ramos</span>
          </Username>
          <Time>
            01:34 PM
          </Time>
        </UserInfoFirstRow>
        <MessageContent>
        I care deeply for nature       
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
            <span>Morgan Buchanan</span>
          </Username>
          <Time>
            09:03 PM
          </Time>
        </UserInfoFirstRow>
        <MessageContent>
        Oh, I think we should just stay friends.
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
            <span>Kareem Salinas
</span>
          </Username>
          <Time>
            12:40 PM
          </Time>
        </UserInfoFirstRow>
        <MessageContent>
        I'm sorry, guys. I never meant to hurt you
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