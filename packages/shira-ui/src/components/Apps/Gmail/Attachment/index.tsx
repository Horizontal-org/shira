import { FunctionComponent } from 'react'
import styled from 'styled-components'
import {
  ImageIcon,
  VideoIcon,
  AudioIcon,
  GenericAttachmentIcon,
  PdfIcon,
} from '../../../Icons';
import { AttachmentType } from '../../../Attachments';
import AddToDriveIcon from '../Attachment/components/AddToDriveIcon'

interface Props {
  position: string;
  name: string;
  explanationPosition: string | null;
  type?: string;
}

// TODO (2026-09-08): need to also get colour based on outcome from something like 'renderSwitch'
export const Attachment: FunctionComponent<Props> = ({
  name,
  explanationPosition,
  type
}) => {
  const renderSwitch = (type: string, name: string) => {
    switch (type) {
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
        return <GenericAttachmentIcon />
    }
  }

  return (
    <Wrapper data-explanation={explanationPosition}>
      <Hovered>
          <HoveredMetadata>
            <div>
              <IconWrapper size={16} color='#15c'>
                {renderSwitch(type, name)}
              </IconWrapper>
              <HoveredName>
                {name}
              </HoveredName>
            </div>
            <div>
              xx KB
            </div>
            <GoogleDriveAddIcon>
              <AddToDriveIcon />
            </GoogleDriveAddIcon>
          </HoveredMetadata>
      </Hovered>
      <Preview>
        <IconWrapper size={34}>
          {renderSwitch(type, name)}
        </IconWrapper>
      </Preview>
      <Unhovered>
        <Name>
          <IconWrapper size={16} color='#15c'>
            {renderSwitch(type, name)}
          </IconWrapper>
          <span>
            {name}
          </span>
          <RibbonContainer>
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 10" width="46px">
            <path id="ribbon" fill="blue" stroke="none" d="M11,10 L11,0 L21,0"/>
            <path id="ribbon" fill="#bbb" stroke="none" d="M0,10 L10,10 L10,0"/>
            <path id="ribbon" fill="white" stroke="none" d="M20,10 l1,-10 l-10,12"></path>
          </svg>
          </RibbonContainer>
        </Name>
      </Unhovered>

    </Wrapper>
  )
}

const RibbonContainer = styled.div`
  margin-left: auto;
  margin-bottom: -6px;
  margin-right: -1px;
`

const Wrapper = styled.div`
  width: 178px;
  height: 113px;
  cursor: pointer;
  position: relative;
`

// needs to be hidden 
const Unhovered = styled.div`
  display: block;
  ${Wrapper}:hover & {
    display: none;
  }
`

const Preview = styled.div`
  padding-top: 2rem;
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #F0F0F0;
  border-bottom: none;
`

const Name = styled.div`
  display: flex;
  padding: 8px 0 0 12px;
  border: 1px solid #F0F0F0;  
  align-items: center;
  background: #F0F0F0;
  > span {
    color: #7f7e7e;
    font-weight: bold;
    font-size: 12px;
  }
`

const Hovered = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
  width: 178px;
  height: 150px;
  display: none;
  background: #555;
  opacity: 0.8;
  padding-top: 12px;
  box-sizing: border-box;

  ${Wrapper}:hover & {
    display: block;
  }
`

const HoveredName = styled.span`
  color: white;
  font-weight: bold;
  font-size: 12px;
`
const HoveredMetadata = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1px 8px;
  div:nth-of-type(2) {
    color: white;
    padding-left: 24px;
    font-size: 10px;
  }
`

const IconWrapper = styled.span<{ size: number; color?: string }>`
  padding-right: 8px;
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

const GoogleDriveAddIcon = styled.svg`
  width: 20px;
  height: 20px;
  display: block;
  flex-shrink: 0;
  fill: currentColor;
`
