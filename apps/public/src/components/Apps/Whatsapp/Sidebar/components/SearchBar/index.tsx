import { FunctionComponent } from 'react'
import { styled } from '@horizontal-org/shira-ui'

interface Props {}

const SearchBar: FunctionComponent<Props> = () => {
  return (
    <Wrapper>
      <InputWrapper>
      
      </InputWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 49px;
  padding: 6px 10px;
  display: flex;
  border-bottom: 1px solid #e9edef;
`

const InputWrapper = styled.div`
  display: inline-block;
  border-radius: 8px;
  height: 100%;
  flex: 1;
  background: #f0f2f5;
`

export default SearchBar