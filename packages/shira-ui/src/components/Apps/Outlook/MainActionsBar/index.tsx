import { FunctionComponent } from "react";
import styled from 'styled-components'

interface Props {}

import Compose from './components/Compose'
import ChevronDown from './components/ChevronDown'
import Trash from './components/Trash'
import Archive from './components/Archive'
import Shield from './components/Shield'
import MoveTo from './components/MoveTo'
import Reply from './components/Reply'
import MailRead from './components/MailRead'
import Flag from './components/Flag'
import AppFolder from './components/AppFolder'
import Undo from './components/Undo'
import People from './components/People'

import { ActionButton } from "./components/ActionButton";

export const MainActionBar:FunctionComponent<Props> = () => {
  return (
    <Wrapper>
      <NewMailButton>
        <LeftMailButton>
          <Compose />
          <span>New mail</span>
        </LeftMailButton>
        <RightMailButton>
          <ChevronDown />
        </RightMailButton>
      </NewMailButton>
      <ContentSeparator>
        <ActionButton
          icon={<Trash />}
          chevron={true}
          hide='second'
        >
          Delete
        </ActionButton>
        <ActionButton
          icon={<Archive />}
          chevron={false}
          hide='second'
        >
          Archive
        </ActionButton>
        <ActionButton
          icon={<Shield />}
          chevron={true}
          hide='second'
        >
          Report
        </ActionButton>
      </ContentSeparator>
      <ContentSeparator hide='third'>
        <ActionButton
          icon={<MoveTo />}
          chevron={true}
          hide='second'
        >
          Move to
        </ActionButton>
        <Separator/>
      </ContentSeparator>
      <ContentSeparator hide='third'>
        <ReplyWrapper>
          <Reply />
          <span>Reply</span>
        </ReplyWrapper>
        <Separator/>
      </ContentSeparator>
      <ContentSeparator hide='second'>
        <ActionButton
          icon={<MailRead />}
          chevron={false}
          hide='first'
        >
          Read / Unread
        </ActionButton>
        <ActionButton
          hide='first'
          icon={<Flag />}
          chevron={true}
        >
          Flag / Unflag
        </ActionButton>
      </ContentSeparator>
      <ContentSeparator hide='second'>
        <Separator/>
        <OnlyIcon>
          <AppFolder/>
        </OnlyIcon>
        <Separator/>
      </ContentSeparator>
      <ContentSeparator hide='first'>
        <ActionButton
          hide='first'
          icon={<People />}
          chevron={false}
        >
          Discover groups
        </ActionButton>       
      <Separator/>
      </ContentSeparator>
      <ContentSeparator hide='third'>
        <ReplyWrapper>
          <Undo />
          <span>Undo</span>
        </ReplyWrapper>
      </ContentSeparator>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-left: 8px;
  margin-top: 8px;
  width: 100%;
  height: 40px;
  background: #fff;
  padding: 4px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-radius: 4px;
  box-shadow: 0 0 2px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.14)
`

const ContentSeparator = styled.div<{
  hide?: string;
}>`
  display: flex;
  align-items: center;

  @media(max-width: ${props => props.theme.breakpoints.md}) {
    ${props => props.hide === 'first' && `
      display: none;
    `}    
  }

  @media(max-width: ${props => props.theme.breakpoints.sm}) {
    ${props => props.hide === 'second' && `
      display: none;
    `}    
  }

  @media(max-width: 620px) {
    ${props => props.hide === 'third' && `
      display: none;
    `}    
  }
`

const Separator = styled.div`
  height: 32px;
  width: 1px;
  background-color: #E0E0E0;
  margin: 0 2px;
`

const ReplyWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0 18px;

  > svg {
    opacity: 0.4;
    fill: rgb(136, 23, 152); 
  }

  > span {
    font-weight: 400;
    font-size: 14px;
    color: #e0e0e0; 
    padding-bottom: 1px;
  }

  @media(max-width: ${props => props.theme.breakpoints.lg}) {
    > span {
      display: none; 
    }
  }

  @media(max-width: ${props => props.theme.breakpoints.sm}) {
    }
`

const OnlyIcon = styled.div`
  display: flex;
  align-items: center;
  margin: 0 14px;
`

const NewMailButton = styled.div`
  display: flex;
  height: 32px;
  cursor: pointer;
  margin-right: 4px;
`

const LeftMailButton = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  background: #0F6CBD;
  border-radius: 4px 0 0 4px;
  display: flex;
  align-items: center;
  border-right: 1px solid white;
  padding: 0 9px 0 9px;
  color: white;

  > span {
    margin-left: 10px; 
    margin-right: 2px;
    font-size: 14px;
    font-weight: 300;
    padding-bottom: 1px;
  }

  &:hover {
    background: #0F548C;
  }
`

const RightMailButton = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 8px;
  background: #0F6CBD;
  border-radius: 0 4px 4px 0;

  &:hover {
    background: #0F548C;
  }
`