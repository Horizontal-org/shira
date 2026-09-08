import { FunctionComponent } from 'react'
import styled from 'styled-components'
import SearchIcon from '../../../../Whatsapp/Icons/Search'

interface Props { }

const SearchBar: FunctionComponent<Props> = () => {
  return (
    <Wrapper>
      <InputWrapper>
        <SearchIcon />
        <span>Search</span>
      </InputWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 49px;
  padding: 8px 10px;
  display: flex;
  border-bottom: 1px solid #e2e2e2;
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  height: 100%;
  flex: 1;
  padding: 0 8px;
  background: #f0f0f0;

  > svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  > span {
    margin-inline-start: 8px;
    font-size: 14px;
    color: #8e8e93;
  }
`

export default SearchBar
