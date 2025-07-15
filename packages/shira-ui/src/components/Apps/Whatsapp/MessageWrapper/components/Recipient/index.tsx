import { FunctionComponent } from 'react'
import styled from 'styled-components'
import MoreOptionsIcon from '../../../Icons/MoreOptions'
import SearchIcon from '../../../Icons/Search'
import BackArrow from '../../../Icons/BackArrow'
import StrangerPicture from '../../../StrangerPicture'

interface Props {
  phone?: {
    textContent: string
    explanationPosition: string
  };
}

const Recipient:FunctionComponent<Props> = ({ phone }) => {

  return (
    <Wrapper>
      <PictureWrapper>
        <BackArrowWrapper>
          <BackArrow/>
        </BackArrowWrapper>

        <Contact>
          <StrangerPicture />
          <span data-explanation={phone.explanationPosition}>{phone.textContent || ''}</span>
        </Contact>
      </PictureWrapper>
      <div>
        <Icons>
          <IconWrapper>
            <SearchIcon />
          </IconWrapper>    
          <IconWrapper>
            <MoreOptionsIcon />
          </IconWrapper>
        </Icons>
      </div>
    </Wrapper>
  )
}

const Contact = styled.div`
  display: flex;
  align-items: center;

  > span {
    font-size: 16px;
    margin-left: 12px;
    position: relative;
  }
`

const Wrapper = styled.div`
  padding: 10px 16px;
  background: #f0f2f5;
  display: flex;
  justify-content: space-between;
  align-items: center;

  

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    background: #00a884;
  }
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

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    > svg {
      > path {
        fill: #fff;
      }
    }
  }
`

const BackArrowWrapper = styled.div`
  display: none;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: inline-block;
    padding-right: 8px;
  }

`

const PictureWrapper = styled.div`
  display: flex;
  align-items: center;
`


export default Recipient