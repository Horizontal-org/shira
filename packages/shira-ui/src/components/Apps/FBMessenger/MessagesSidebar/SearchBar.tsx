import { FunctionComponent  } from "react"
import styled from 'styled-components'

import SearchIcon from '../assets/search.png'

const SearchBar: FunctionComponent = () => {
  return (

  <Wrapper>
    <SearchIconWrapper>
      <Icon icon={SearchIcon} size='16'/>
    </SearchIconWrapper>
    <SearchText>
      Search in Messenger
    </SearchText>
  </Wrapper>
  )
}

const IconWrapper = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;

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

const Wrapper = styled.div`
  width: 100%;
  border-radius: 24px;
  background: rgba(60,64,67,.05);

  display: flex;
  align-items: center;
  margin-top: 8px;
`

const SearchIconWrapper = styled(IconWrapper)`
  margin-left: 0;
  background: transparent;

  &:hover {
    background: transparent;
  }
`

const SearchText = styled.span`
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;   
  }
`

export default SearchBar