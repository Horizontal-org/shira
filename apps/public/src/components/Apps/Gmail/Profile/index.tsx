import { FunctionComponent } from "react";
import { styled } from '@horizontal-org/shira-ui'
import ProfileIcon from './assets/profile.png'

interface CustomElements {
  textContent: string,
  explanationPosition: string | null
}

interface Props {
  senderName: CustomElements;
  senderEmail: CustomElements;
}

export const Profile: FunctionComponent<Props> = ({
  senderName,
  senderEmail,
}) => {  
  return (
    <ProfileWrapper>
      <Icon>
        <img src={ProfileIcon} alt='profile-pic'/>
      </Icon>
      <SenderWrapper>
        <Sender>
          <SenderName 
            data-explanation={senderName.explanationPosition}
          >
              {senderName.textContent || ''}
          </SenderName>
          <SenderEmail 
            data-explanation={senderEmail.explanationPosition}
          >
              {`<${senderEmail.textContent || ''}>`}
          </SenderEmail>
        </Sender>
        <span>to me</span>
      </SenderWrapper>
    </ProfileWrapper>
  )
}

const SenderWrapper = styled.div`
  padding-left: 12px;

  > span {
    color: #5e5e5e;
    font-size: .75em;
    font-weight: 400;
  }
`

const Icon = styled.div`
  height: 40px;
  width: 40px;
  cursor: pointer;
  > img {
    border-radius: 50%;      
  }
`

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding-left: 8px;
  }
`

const Sender = styled.div`
  display: flex;
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
  }
`

const SenderName = styled.span`
  color: #1f1f1f;
  line-height: 20px;
  font-size: .875rem;
  font-weight: bold;
  padding-right: 8px;
`

const SenderEmail = styled.span`
  color: #5e5e5e;
  line-height: 20px;
  font-size: .75rem;
  padding-left: 4px;
  font-weight: 400;
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding-left: 0;
  }
`