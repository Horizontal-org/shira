import { FunctionComponent } from 'react'
import styled from 'styled-components'
import {
  LuPhone,
  LuVideo,
  LuInfo,
  LuSmilePlus,
  LuChevronLeft,
  LuChevronRight
} from 'react-icons/lu'
import Avatar from '../../../components/Avatar'

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
  return (
    <Wrapper>
      <Header>
        <BackArrowWrapper>
          <LuChevronLeft />
        </BackArrowWrapper>

        <AvatarWrapper>
          <Avatar name={senderName?.textContent} size={48} />
        </AvatarWrapper>

        <NameBlock>
          <NameRow>
            <Name data-explanation={senderName?.explanationPosition}>
              {senderName?.textContent || ''}
            </Name>
            <LuChevronRight />
          </NameRow>
          <Handle>{getHandle(senderName?.textContent)}</Handle>
        </NameBlock>

        <Icons>
          <IconWrapper mobileOnly>
            <LuSmilePlus />
          </IconWrapper>
          <IconWrapper>
            <LuPhone />
          </IconWrapper>
          <IconWrapper>
            <LuVideo />
          </IconWrapper>
          <IconWrapper desktopOnly>
            <LuInfo />
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
  border-bottom: 1px solid #dbdbdb;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    border-bottom: none;
    background: #fff;
    padding: 8px 12px 8px 4px;
    gap: 10px;
  }
`

const AvatarWrapper = styled.div`
  display: flex;
  flex-shrink: 0;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    > div {
      width: 36px;
      height: 36px;
      font-size: 14px;
    }
  }
`

const NameBlock = styled.div`
  min-width: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const NameRow = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;

  > svg {
    display: none;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    color: #737373;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    > svg {
      display: block;
    }
  }
`

const Name = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #000;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 15px;
    font-weight: 600;
  }
`

const Handle = styled.span`
  font-size: 12px;
  color: #737373;
`

const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-inline-start: auto;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: 8px;
  }
`

const IconWrapper = styled.div<{ mobileOnly?: boolean, desktopOnly?: boolean }>`
  display: ${props => props.mobileOnly ? 'none' : 'flex'};
  padding: 4px;
  cursor: pointer;

  > svg {
    display: block;
    width: 26px;
    height: 26px;
    color: #000;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: ${props => props.desktopOnly ? 'none' : 'flex'};
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
      width: 28px;
      height: 28px;
      color: #000;
    }
  }
`

export default Recipient
