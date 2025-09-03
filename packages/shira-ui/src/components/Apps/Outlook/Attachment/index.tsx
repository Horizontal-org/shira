import { FunctionComponent } from "react";
import styled from 'styled-components'
import { AttachmentType } from "../../../Attachments";

import AudioIcon from './icons/Audio'
import ImageIcon from './icons/Image'
import PdfIcon from './icons/Doc'
import VideoIcon from './icons/Video'
import GenericAttachmentIcon from './icons/Other'
import ChevronDown from './icons/ChevronDown'

interface Props {
  name: string;
  explanationPosition: string | null;
  type?: string;
}

export const Attachment:FunctionComponent<Props> = ({
  name,
  explanationPosition,
  type
}) => {

  const renderSwitch = (type: string) => {
    switch(type) {
      case AttachmentType.audio:
        return <AudioIcon />
      case AttachmentType.document:
        return <PdfIcon />
      case AttachmentType.image:
        return <ImageIcon />
      case AttachmentType.video:
        return <VideoIcon />
      case AttachmentType.other:
        return <GenericAttachmentIcon />
      default:
        return <GenericAttachmentIcon/>
    }
  }
  
  return (
    <Wrapper>
      <Left>
        <SvgWrapper> {renderSwitch(type)} </SvgWrapper>
        <TextWrapper>
          <Name data-explanation={explanationPosition} >
            { name }
          </Name>
          <Size>{Math.floor(Math.random() * 300) + 1} KB</Size>
        </TextWrapper>
      </Left>
      <Right>
        <ChevronDown />
      </Right>
    </Wrapper>
  )
}

// chveron 32px 
const Wrapper = styled.div`
  width: 280px;
  height: 48px;
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  border: 1px solid #f0f0f0;
  cursor: pointer;
`

const Left = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;

  &:hover {
    background: #f5f5f5;
  }
`

const Right = styled.div`  
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f5f5f5;
  }

  > svg {
    height: 32px; 
    width: 32px;
  }
`

const SvgWrapper = styled.div`
  height: 32px;
  width: 32px;

  > svg {
    height: 32px;
    width: 32px; 
  }
`

const Name = styled.div``

const Size = styled.div`
  color: #707070;
  font-size: 10px;
`

const TextWrapper = styled.div`
  padding-left: 4px;
`