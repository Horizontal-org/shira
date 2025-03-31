import { styled } from 'styled-components'
import { FiMoreVertical } from 'react-icons/fi';
import { 
  ImageIcon,
  VideoIcon,
  AudioIcon,
  GenericAttachmentIcon,
  PdfIcon
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
}

export const Attachment = ({ name, type }: AttachmentProps) => {
  const renderSwitch = (type: AttachmentType) => {
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
    }
  }

  return (
    <Card>
      <Header>
        <Name>
          {name}
        </Name>
        <FiMoreVertical size={20} />
      </Header>
      <Body>
        <IconContainer>
          {
            renderSwitch(type)
          }
        </IconContainer>
      </Body>
  </Card>
  )
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${props => props.theme.colors.light.paleGrey};
  border-radius: 12px;
  width: 232px;
  height: 160px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background-color: ${props => props.theme.colors.light.paleGrey};
`

const Name = styled.div`
  display: flex;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 160px;
`

const Body = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`

const IconContainer = styled.div`
  
`