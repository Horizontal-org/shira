import { FunctionComponent } from "react";
import styled from 'styled-components'
import { OutlookCustomElements } from "../../..";
import { SenderIcon } from "./components/SenderIcon";
import { SenderFloatingInfo } from "./components/SenderFloatingInfo";

interface Props {
  senderName: OutlookCustomElements;
  senderEmail: OutlookCustomElements;
}

export const Sender:FunctionComponent<Props> = ({
  senderEmail,
  senderName
}) => {
  return (
    <Wrapper>
      <SenderFloatingInfo
        senderEmail={senderEmail.textContent || ''}
        senderName={senderName.textContent || 'S'}
      >
        <SenderIcon>
          {senderName.textContent ? senderName.textContent.charAt(0) : 'S'}
        </SenderIcon>
      </SenderFloatingInfo>
      <div>
        <SenderFloatingInfo
            senderEmail={senderEmail.textContent || ''}
            senderName={senderName.textContent || 'S'}
          >
          <SenderInfo>
            <span data-explanation={senderName.explanationPosition}>{senderName.textContent || ''}</span>
            <span data-explanation={senderEmail.explanationPosition}>{`<${senderEmail.textContent || ''}>`}</span>
          </SenderInfo>
        </SenderFloatingInfo>
        <ReceiverInfo>
          <span>To:</span>
          <You>You</You>
        </ReceiverInfo>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-left: 4px;
  padding-top: 4px;
  display: flex;
  align-items: center;
`

const SenderInfo = styled.div`
  display: flex;
  color: #242424;
  font-size: 12px;
`

const ReceiverInfo = styled.div`
  padding-top: 6px;
  display: flex;
  color: #242424;
  font-size: 12px;

  > span {
    padding-right: 4px; 
    color: #424242;
  }
`

const You = styled.div`
  cursor: pointer;
`