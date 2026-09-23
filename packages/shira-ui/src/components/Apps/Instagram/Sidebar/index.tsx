import { FunctionComponent } from 'react'
import styled from 'styled-components'
import Profile from './components/Profile'
import SearchBar from './components/SearchBar'
import Stories from './components/Stories'
import Tabs from './components/Tabs'
import MessagesPreview from './components/MessagesPreview'

interface Props {
  senderName?: {
    textContent: string
    explanationPosition: string
  };
}

const Sidebar: FunctionComponent<Props> = ({ senderName }) => {
  return (
    <Wrapper>
      <Profile />
      <SearchBar />
      <Stories />
      <Tabs />
      <MessagesPreview senderName={senderName} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  flex: calc(32%);
  display: flex;
  flex-direction: column;
  border-inline-end: 1px solid #e2e2e2;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex: calc(40%);
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`

export default Sidebar
