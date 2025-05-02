import { useState, useRef } from 'react';
import styled from 'styled-components'
import { FiMoreVertical } from 'react-icons/fi';
import { 
  ImageIcon,
  VideoIcon,
  AudioIcon,
  GenericAttachmentIcon,
  PdfIcon,
  ExplanationIcon
} from '../Icons';
import { FloatingMenu } from '../FloatingMenu';

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
    isActiveExplanation?: boolean
    onExplanationClick?: () => void
    onDelete: (e: React.MouseEvent) => void
}

export const Attachment = ({ 
  name, 
  type, 
  isActiveExplanation,
  onExplanationClick,
  onDelete 
}: AttachmentProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
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
        <FlexContainer>
          <ExplanationWrapper
            onClick={onExplanationClick}
            isActiveExplanation={!!(isActiveExplanation)}
          >
            <ExplanationIcon />
          </ExplanationWrapper>
          <Name>
            {name}
          </Name>
        </FlexContainer>
        <MenuButton 
          ref={menuButtonRef}
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          <FiMoreVertical size={20} />
        </MenuButton>
        <FloatingMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onDelete={(e) => {
            e.stopPropagation();
            onDelete(e);
          }}
          anchorEl={menuButtonRef.current}
        />
      </Header>
      <Body>
        <div>
          {
            renderSwitch(type)
          }
        </div>
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
  align-items: center;
  padding: 16px;
  background-color: ${props => props.theme.colors.light.paleGrey};
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`

const Name = styled.div`
  display: flex;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 160px;
  padding-left: 8px;
`

const Body = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`

const MenuButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.dark.darkGrey};
  
  &:hover {
    color: ${props => props.theme.colors.dark.black};
  }
  background: none;
  border: none;
`

interface ExplanationWrapperProps {
  isActiveExplanation: boolean
}

const ExplanationWrapper = styled.div<ExplanationWrapperProps>`
  display: flex;
  align-items: center;
  padding-right: 6px;
  cursor: pointer;
  
  > svg {
    stroke: ${props => props.isActiveExplanation ? props.theme.secondary.base : '#ACADAE'};
  }
`