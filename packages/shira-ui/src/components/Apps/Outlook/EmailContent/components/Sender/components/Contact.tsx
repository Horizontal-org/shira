import { FunctionComponent } from "react";
import styled from 'styled-components'

interface Props {
  senderEmail: string;
}

import ChevronRight from '../../../icons/ChevronRight'
import Mail from '../../../icons/Mail'

export const Contact:FunctionComponent<Props> = ({
  senderEmail
}) => {
  return (
    <Wrapper>
      <Title>
        <span>Contact</span>
        <ChevronRight />        
      </Title>
      <SenderMail>
        <Mail />
        <span>{senderEmail}</span>
      </SenderMail>
      <ShowMore>Show more</ShowMore>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 16px 0;
`

const Title = styled.div`
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  

  > span {
    color: #424242; 
    font-size: 14px;
    font-weight: 600;
  }

  &:hover {
    > span {
      color: #0078d4
    }
  }
`

const SenderMail = styled.div`
  width: 100%;
  margin: 10px 0;
  box-sizing: border-box;
  cursor: pointer;
  padding: 4px 16px;
  display: flex;
  align-items: center;
  gap: 14px;

  > span {
    color: #0078d4;
    font-size: 11px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: normal;
    line-height: 20px;
  }

  &:hover {
    background: #e0e0e0;

    > span {
      color: #0F6CBD; 
    }
  }
`

const ShowMore = styled.div`
  color: #0078d4;
  font-size: 12px;
  cursor: pointer;
  font-weight: 600;
  padding: 0 16px;

  &:hover {
    text-decoration: underline;
  }
`