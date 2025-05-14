import { FunctionComponent } from 'react'
import { styled } from '@shira/ui'

import SearchIcon from './components/SearchIcon'
import PreferencesIcon from './components/PreferencesIcon'
import IconWrapper from '../IconWrapper'
interface Props {}

const Search: FunctionComponent<Props> = () => {

  return (
    <Wrapper>
      <Left>
        <IconWrapper>
          <SearchIcon />
        </IconWrapper>
        <SearchInput>
          Search all conversations
        </SearchInput>
      </Left>
      <IconWrapper>
        <PreferencesIcon />
      </IconWrapper>      
    </Wrapper>
  )
}


const Wrapper = styled.div`
  display: flex;
  padding: 4px;
  flex-grow: 1;
  width: 100%;
  justify-content: space-between;
  max-width: 720px;
  background: #e9eef6;
  border: 1px solid transparent;
  border-radius: 24px;
  cursor: pointer;
`

const Left = styled.div`
  display: flex;
  align-items: center;
`


const SearchInput = styled.div`
  padding: 0 4px;
  color: #5e5e5e;
`

export default Search