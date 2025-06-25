import { FunctionComponent  } from "react"
import styled from 'styled-components'

import Header from "./Header"
import MessagesList from "./MessagesList"
import SearchBar from "./SearchBar"

const MessageSidebar: FunctionComponent = () => {
  return (
    <Wrapper>
      <Header />
      <SearchBar />
      <MessagesList />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 8px;
  border-right: 1px solid #F2F3F5;
  width: 361px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 88px;    
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    display: none; 
  }
`

export default MessageSidebar