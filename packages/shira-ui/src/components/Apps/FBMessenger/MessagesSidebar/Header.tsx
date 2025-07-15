import { FunctionComponent  } from "react"
import styled from 'styled-components'

import VideoIcon from '../assets/video.png'
import NewMessageIcon from '../assets/new-message.png'

const Header: FunctionComponent = () => {
  return (
    <Wrapper>
      <Title>Chats</Title>
      <HeaderIcons>
        <IconWrapper>
          <Icon icon={VideoIcon} size='28'></Icon>
        </IconWrapper>
        <IconWrapper>
          <Icon icon={NewMessageIcon} size='28'></Icon>
        </IconWrapper>
      </HeaderIcons>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;   
  }
`

const HeaderIcons = styled.div`
  display: flex;
`

const IconWrapper = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;

  background: rgba(60,64,67,.05);
  margin-left: 16px;

  &:hover {
    background: rgba(60,64,67,.12);
  }


  display: flex;
  align-items: center;
  justify-content: center;
`
interface IconProps {
  icon: string;
  size: string;
}

const Icon = styled('div')<IconProps>`
  background-image: url(${props => props.icon});
  background-position: center;
  background-repeat: no-repeat;
  background-size: ${props => `${props.size}px`};
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  opacity: .71;
`

const Title = styled.h2`
  padding: 0;
  margin: 0
`

export default Header