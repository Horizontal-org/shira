import { FunctionComponent } from "react";
import styled from 'styled-components'
import { EmailTitle } from "./components/EmailTitle";
import { Item } from "./components/Item";

import Inbox from './icons/Inbox'
import Junk from './icons/Junk'

interface Props {}

export const LeftActions:FunctionComponent<Props> = () => {

  return (
    <Wrapper>
      <EmailTitle />
      <Item 
        text="Inbox"
        icon={<Inbox />}
        selected={true}
        amount={Math.floor(Math.random() * 100) + 1}
      />
      <Item 
        text="Junk Email"
        icon={<Junk />}
        selected={false}
        amount={Math.floor(Math.random() * 10) + 1}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`  
  margin-left: 4px;
  margin-top: 8px;
  box-sizing: border-box;
  width: 200px;
`

// title icons
// width="20"
// height="20"
// fill="#424242"