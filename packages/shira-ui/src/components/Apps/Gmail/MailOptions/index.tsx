import { FunctionComponent } from 'react'
import styled from 'styled-components'

import ArchiveIcon from './assets/archive.png'
import ArrowBackIcon from './assets/arrow_back.png'
import LetterIcon from './assets/letter.png'
import MoveIcon from './assets/move.png'
import SpamIcon from './assets/spam.png'
import TagIcon from './assets/tag.png'
import TimerIcon from './assets/timer.png'
import TrashIcon from './assets/trash.png'
import MoreIcon from './assets/more.png'
import useGetWidth from '../../hooks/useGetWidth'

interface Props {}

const MailOptions: FunctionComponent<Props> = () => {
  const { width } = useGetWidth()

  return (
    <Wrapper>
      <IconWrapper>
        <Icon icon={ArrowBackIcon} />
      </IconWrapper>

      {width > 800 && (
        <>
          <FirstBlock>
            <IconWrapper>
              <Icon icon={ArchiveIcon} />
            </IconWrapper>
            <IconWrapper>
              <Icon icon={SpamIcon} />
            </IconWrapper>
            <IconWrapper>
              <Icon icon={TrashIcon} />
            </IconWrapper>    
          </FirstBlock>

          <MiddleBlock>
            <IconWrapper>
              <Icon icon={LetterIcon} />
            </IconWrapper>
            <IconWrapper>
              <Icon icon={TimerIcon} />
            </IconWrapper>
          </MiddleBlock>

          <IconWrapper>
            <Icon icon={MoveIcon} />
          </IconWrapper>
          <IconWrapper>
            <Icon icon={TagIcon} />
          </IconWrapper>
          <IconWrapper>
            <Icon icon={MoreIcon} />
          </IconWrapper>
        </>
      )}

      { width <= 800 && (
        <FirstBlock>
          <IconWrapper>
            <Icon icon={ArchiveIcon} />
          </IconWrapper>
          <IconWrapper>
            <Icon icon={TrashIcon} />
          </IconWrapper>
          <IconWrapper>
            <Icon icon={LetterIcon} />
          </IconWrapper>
          <IconWrapper>
            <Icon icon={MoreIcon} />
          </IconWrapper>
        </FirstBlock>
      )}
    </Wrapper>
  )
}


// margin: 0 16px 0 0;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 4px 16px;
  height: 48px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    justify-content: space-between;
    padding-left: 8px;
  }
`

const IconWrapper = styled.div`
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  margin: 0 4px;
  width: 20px;
  height: 20px;

  &:hover {
    background: rgba(60,64,67,.1);
  }

  &:active {
    background: rgba(60,64,67,.12);
  }
`


interface IconProps {
  icon: string;
}

const Icon = styled('div')<IconProps>`
  background-image: url(${props => props.icon});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 20px;
  width: 20px;
  height: 20px;
  opacity: .71;
`

const FirstBlock = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-right: 20px;
  }
`

const MiddleBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 0 8px;
  border-left: 1px solid hsla(240,5.8%,76.3%,0.2);
  border-right: 1px solid hsla(240,5.8%,76.3%,0.2);
`

export default MailOptions