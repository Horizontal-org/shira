import { FunctionComponent } from 'react'
import styled from 'styled-components'
import Location from './Icons/Location'
import Camera from './Icons/Camera'
import Smile from './Icons/Smile'
import Message from './Icons/Message'

interface Props {}

export const Footer: FunctionComponent<Props> = () => {
  return (
    <Wrapper>
      <SearchBar>Say something...</SearchBar>
      <BottomWrapper>
        <Text>
          Aa
        </Text>
        <SvgWrapper>
          <Camera />
        </SvgWrapper>
        <SvgWrapper>
          <Smile />
        </SvgWrapper>
        <SvgWrapper>
          <Location />
        </SvgWrapper>
        <SvgWrapper>
          <Message />
        </SvgWrapper>
      </BottomWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: #2C2C2E;
  padding: 16px 32px;
`

const SearchBar = styled.div`
  color: #9E9EA8;
  padding-bottom: 8px;
`
const BottomWrapper = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Text = styled.div`
  color: #9E9EA8;
  font-weight: bold;
  cursor: pointer;
`

const SvgWrapper = styled.div`
  cursor: pointer;
`
