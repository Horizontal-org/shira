import { FunctionComponent } from 'react'
import { styled } from '@shira/ui'

import Profile from './components/Profile'
import SearchBar from './components/SearchBar'
import MessagesPreview from './components/MessagesPreview'

interface Props { }

const Sidebar: FunctionComponent<Props> = ( ) => {
  return (
    <Wrapper>
      <Profile />
      <SearchBar />
      <MessagesPreview />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  flex: calc(30%);
  display: flex;
  flex-direction: column;
  justify-content:space-between;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex: calc(40%);
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`

export default Sidebar