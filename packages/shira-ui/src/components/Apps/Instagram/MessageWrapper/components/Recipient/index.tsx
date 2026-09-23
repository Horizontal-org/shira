import { FunctionComponent } from 'react'
import styled from 'styled-components'
import BackArrow from '../../../../Whatsapp/Icons/BackArrow'
import StrangerPicture from '../../../../Whatsapp/StrangerPicture'
import PhoneIcon from '../../../../SMS/Header/assets/Call'
import Video from '../../../Icons/Video'
import Info from '../../../Icons/Info'
import Chevron from '../../../Icons/Chevron'

interface Props {
  senderName?: {
    textContent: string
    explanationPosition: string
  };
}

const getHandle = (name?: string) => {
  if (!name) return ''
  return name.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '')
}

const Recipient: FunctionComponent<Props> = ({ senderName }) => {
  const initialMatch = (senderName?.textContent || '').match(/[A-Za-z]/)
  const initial = initialMatch ? initialMatch[0].toUpperCase() : null

  return (
    <Wrapper>
      <Header>
        <BackArrowWrapper>
          <BackArrow />
        </BackArrowWrapper>

        <AvatarWrapper>
          {initial ? <Avatar>{initial}</Avatar> : <StrangerPicture />}
        </AvatarWrapper>

        <NameBlock>
          <NameRow>
            <Name data-explanation={senderName?.explanationPosition}>
              {senderName?.textContent || ''}
            </Name>
            <Chevron />
          </NameRow>
          <Handle>{getHandle(senderName?.textContent)}</Handle>
        </NameBlock>

        <Icons>
          <IconWrapper>
            <PhoneIcon />
          </IconWrapper>
          <IconWrapper>
            <Video />
          </IconWrapper>
          <IconWrapper>
            <Info />
          </IconWrapper>
        </Icons>
      </Header>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex-shrink: 0;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 5;
  }
`

const Header = styled.div`
  border-bottom: 1px solid #efefef;
  padding: 10px 16px;
  display: flex;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    border-bottom: none;
    background: rgba(255, 255, 255, 0.86);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    padding: 8px 10px;
    gap: 8px;
  }
`

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-inline-end: 12px;
`

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #c13584;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`

const NameBlock = styled.div`
  min-width: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`

const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;

  > svg {
    width: 16px;
    height: 16px;
    transform: rotate(-90deg);
  }
`

const Name = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #000;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Handle = styled.span`
  font-size: 12px;
  color: #8e8e93;
`

const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-inline-start: auto;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`

const IconWrapper = styled.div`
  display: flex;
  padding: 4px;
  cursor: pointer;

  > svg {
    display: block;
    width: 22px;
    height: 22px;
  }

  > svg path {
    fill: #000;
  }
`

const BackArrowWrapper = styled.div`
  display: none;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 32px;
    height: 32px;

    > svg {
      width: 18px;
      height: 18px;
    }

    > svg path {
      fill: #000;
    }
  }
`

export default Recipient
