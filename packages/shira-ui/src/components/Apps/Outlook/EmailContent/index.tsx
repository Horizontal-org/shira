import { FunctionComponent } from "react";
import styled from 'styled-components'

import Reply from './icons/Reply'
import Forward from './icons/Forward'
import { RightActions } from "./components/RightActions";
import { OutlookCustomElements } from "..";
import { Sender } from "./components/Sender";

interface Props { 
  content: HTMLElement;
  senderName: OutlookCustomElements;
  senderEmail: OutlookCustomElements;
}

export const EmailContent:FunctionComponent<Props> = ({
  content,
  senderName,
  senderEmail
}) => {
  return (
    <WhiteContent>
      <TopBar>
        <Sender
          senderName={senderName}
          senderEmail={senderEmail}
        />
        <div></div>
        <RightActions />
      </TopBar>
      <Body dangerouslySetInnerHTML={{__html: content ? content.outerHTML : null }}></Body>      
      <BottomBar>
        <BottomButton>
          <Reply />
          <span>Reply</span>
        </BottomButton>
        <BottomButton>
          <Forward />
          <span>Forward</span>
        </BottomButton>
      </BottomBar>
    </WhiteContent>
  )
}

const WhiteContent = styled.div`
  padding: 10px 12px 12px 12px;
  margin: 8px 0;
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0 0 2px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.14);  
`

const Body = styled.div`
  color: #242424;
  font-size: 15px;
  font-weight: 400;
  margin: 34px 16px 0 54px;
  padding-bottom: 2px;
`

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
`

const BottomBar = styled.div`
  margin: 12px 16px 0 48px;
  display: flex;  
  font-weight: 400;
  gap: 4px;  
`

const BottomButton = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  padding: 0 12px;
  margin-top: 4px;
  height: 28px;
  font-size: 12px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  cursor: pointer;

  &:hover {
    color: #0C3B5E;
    background: #f5f5f5;
  }
`