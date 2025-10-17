import { FunctionComponent } from "react";
import styled from 'styled-components'
import { DynamicContent } from "./styles/ContentStyles"

import Reply from './icons/Reply'
import Forward from './icons/Forward'
import { RightActions } from "./components/RightActions";
import { OutlookAttachmentElement, OutlookCustomElements } from "..";
import { Sender } from "./components/Sender";
import { Attachment } from "../Attachment";

interface Props { 
  content: HTMLElement;
  senderName: OutlookCustomElements;
  senderEmail: OutlookCustomElements;
  attachments: OutlookAttachmentElement[],
}

export const EmailContent:FunctionComponent<Props> = ({
  content,
  senderName,
  senderEmail,
  attachments
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
      <Attachments>
        { attachments && attachments.length > 0 && 
            attachments
              .sort((a, b) => parseInt(a.position) - parseInt(b.position))
              .map((a, i) => (
              <Attachment 
                explanationPosition={a.explanationPosition}
                type={a.fileType}
                name={a.name}
                key={i}
              />
        )) }
      </Attachments>
      <DynamicContent dangerouslySetInnerHTML={{__html: content ? content.outerHTML : null }}></DynamicContent>      
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

  @media(max-width: ${props => props.theme.breakpoints.xs}) {
    background: #fff;
    box-sizing: border-box;
    border-radius: none;
    box-shadow: none;  
  }
`

const Attachments = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 34px 16px 0 50px;
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