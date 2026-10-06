import { FunctionComponent } from "react";
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
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

const inboxAmount = Math.floor(Math.random() * 100) + 1
const junkAmount = Math.floor(Math.random() * 10) + 1
const draftsAmount = Math.floor(Math.random() * 7) + 1

export const LeftActions:FunctionComponent<Props> = ({ receiverEmail }) => {
  const { t } = useTranslation('shira-ui')

  return (
    <Wrapper>
      <EmailTitle receiverEmail={receiverEmail}/>
      <Item
        text={t('outlook.inbox')}
        icon={<Inbox />}
        selected={true}
        amount={inboxAmount}
      />
      <Item
        text={t('outlook.junk')}
        icon={<Junk />}
        selected={false}
        amount={junkAmount}
      />
      <Item
        text={t('outlook.drafts')}
        icon={<Draft />}
        selected={false}
        amount={draftsAmount}
      />
      <Item
        text={t('outlook.sent_items')}
        icon={<Sent />}
        selected={false}
      />
      <Item
        text={t('outlook.deleted_items')}
        icon={<Trash />}
        selected={false}
      />
      <Item
        text={t('outlook.archive')}
        icon={<Archive />}
        selected={false}
      />
      <Item
        text={t('outlook.conversation_history')}
        icon={<Folder />}
        selected={false}
      />
      <Item
        text={t('outlook.notes')}
        icon={<Note />}
        selected={false}
      />
      <BottomWrapper>
        <Item
          text={t('outlook.go_to_groups')}
          icon={<People />}
          selected={false}
          type="blue"
        />
      </BottomWrapper>      
      
    </Wrapper>
  )
}

const Wrapper = styled.div`  
  margin-inline-start: 4px;
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