import { FunctionComponent  } from "react"
import styled from 'styled-components'
import ProfilePicture from "../../Whatsapp/ProfilePicture"

const MessagesList: FunctionComponent = () => {
  return (
    <Wrapper>
      <Card active>
        <ProfilePicture />

        <MessageInfo>
          <div>Roseanna</div>
          <SecondaryText>
            <span> Hello there. Thanks for the follow . 1 day ago</span>
          </SecondaryText>
        </MessageInfo>

      </Card>

      <Card>
        <ProfilePicture />

        <MessageInfo>
          <div>Erica</div>
          <SecondaryText>
            <span> Thanks mate! . 2 days ago</span>
          </SecondaryText>
        </MessageInfo>

      </Card>

      <Card>
        <ProfilePicture />

        <MessageInfo>
          <div>Pauline</div>
          <SecondaryText>
            <span> Feel way better now . 1 day ago</span>
          </SecondaryText>
        </MessageInfo>

      </Card>

      <Card>
        <ProfilePicture />

        <MessageInfo>
          <div>Jose</div>
          <SecondaryText>
            <span> Did you notice? . 1 day ago</span>
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
  padding-left: 8px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;   
  }
`

export default MessagesList