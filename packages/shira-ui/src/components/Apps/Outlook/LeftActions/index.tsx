import { FunctionComponent } from "react";
import styled from 'styled-components'
import { EmailTitle } from "./components/EmailTitle";
import { Item } from "./components/Item";

import Inbox from './icons/Inbox'
import Junk from './icons/Junk'
import Archive from './icons/Archive'
import Draft from './icons/Draft'
import Folder from './icons/Folder'
import Note from './icons/Note'
import Sent from './icons/Sent'
import Trash from './icons/Trash'
import People from './icons/People'

interface Props {
  receiverEmail: string;
}

export const LeftActions:FunctionComponent<Props> = ({ receiverEmail }) => {

  return (
    <Wrapper>
      <EmailTitle receiverEmail={receiverEmail}/>
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
      <Item 
        text="Drafts"
        icon={<Draft />}
        selected={false}
        amount={Math.floor(Math.random() * 7  ) + 1}
      />
      <Item 
        text="Sent items"
        icon={<Sent />}
        selected={false}
      />    
      <Item 
        text="Deleted items"
        icon={<Trash />}
        selected={false}
      />
      <Item 
        text="Archive"
        icon={<Archive />}
        selected={false}
      />
      <Item 
        text="Conversation history"
        icon={<Folder />}
        selected={false}
      />
      <Item 
        text="Notes"
        icon={<Note />}
        selected={false}
      />
      <BottomWrapper>
        <Item 
          text="Go to groups"
          icon={<People />}
          selected={false}
          type="blue"
        />
      </BottomWrapper>
      
      
    </Wrapper>
  )
}

const Wrapper = styled.div`  
  margin-left: 4px;
  margin-top: 8px;
  box-sizing: border-box;
  width: 200px;
  
  @media(max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`

const BottomWrapper = styled.div`
  margin-top: 10px;
`