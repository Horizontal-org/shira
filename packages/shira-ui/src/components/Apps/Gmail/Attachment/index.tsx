import { FunctionComponent } from 'react'
import { AttachmentType, styled } from '@shira/ui'

import { 
  ImageIcon,
  VideoIcon,
  AudioIcon,
  GenericAttachmentIcon,
  PdfIcon,
} from '../../../Icons';

interface Props {
  position: string;
  name: string;
  explanationPosition: string | null;
  type?: string;
}

export const Attachment: FunctionComponent<Props> = ({
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
      <Hovered>
        <Name>      
          <IconWrapper size={16} color='#15c'>
            { renderSwitch(type) }        
          </IconWrapper>
          <span>
            {name}
          </span>
        </Name>
      </Hovered>
      <div>
        <Preview>
          <IconWrapper size={34}>
            { renderSwitch(type) }        
          </IconWrapper>
        </Preview>
        <Name>      
          <IconWrapper size={16} color='#15c'>
            { renderSwitch(type) }        
          </IconWrapper>
          <span 
            data-explanation={explanationPosition} 
          >
            {name}
          </span>
        </Name>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 178px;
  height: 113px;
  cursor: pointer;
  position: relative;
`

const Preview = styled.div`
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #F0F0F0;
`

const Name = styled.div`
  display: flex;
  padding: 4px 8px;
  border: 1px solid #F0F0F0;  
  align-items: center;
  background: #F0F0F0;
  > span {
    padding-left: 4px;
    color: #222;
    font-size: 12px;
  }
`

const Hovered = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
  width: 178px;
  height: 113px;
  display: none;
  background: #F0F0F0;
  padding-top: 12px;
  box-sizing: border-box;

  ${Wrapper}:hover & {
    display: block;
  }
`

const IconWrapper = styled.div<{ size: number; color?: string }>`
  > svg {
    height: ${props => props.size}px;
    width: ${props => props.size}px;

    ${props => props.color && `
      stroke: ${props.color};

      > path {
        fill: ${props.color};
       }
    `}
  }
`