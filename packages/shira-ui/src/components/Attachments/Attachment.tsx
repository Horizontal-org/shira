import styled from 'styled-components'
import {
  ImageIcon,
  VideoIcon,
  AudioIcon,
  GenericAttachmentIcon,
  PdfIcon,
} from '../Icons';

export enum AttachmentType {
  video = 'video',
  audio = 'audio',
  image = 'image',
  document = 'document',
  other = 'other'
}

export interface AttachmentProps {
  name: string
  type: AttachmentType
  active?: boolean
}

export const Attachment = ({
  name,
  type,
  active = false
}: AttachmentProps) => {

  const renderSwitch = (type: AttachmentType) => {
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
    }
  }

  return (
    <Card active={active}>
      <Header active={active}>
        <FlexContainer>
          <Name>
            {name}
          </Name>
        </FlexContainer>
      </Header>
      <Body active={active}>
        <div>
          {
            renderSwitch(type)
          }
        </div>
      </Body>
    </Card>
  )
}

const Card = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  border: 2px solid ${props => props.active ? props.theme.colors.green3 : props.theme.colors.light.paleGrey};
  border-radius: 12px;
  width: 232px;
  height: 160px;
`

const Header = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: ${props => props.active ? 'white' : props.theme.colors.light.paleGrey};
  border-start-start-radius: 12px;
  border-start-end-radius: 12px;
`

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`

const Name = styled.div`
  display: flex;
  text-align: start;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 160px;
  color: ${props => props.theme.colors.dark.black};
`

const Body = styled.div<{ active: boolean }>`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-end-start-radius: 12px;
  border-end-end-radius: 12px;

  ${props => props.active && `
    background-color: rgba(243, 249, 207, 0.5);  
  `}
`