import { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { Body4, Body3Bold } from '../Typography';
import { CopyUrlIcon } from '../Icons'
import { FiMoreVertical } from 'react-icons/fi';
import { FloatingMenu } from '../FloatingMenu';
import Toggle from '../Toggle/Toggle';

export interface CardProps {
  title: string;
  lastModified: string;
  isPublished: boolean;
  onTogglePublished: () => void;
  onCopyUrl: () => void;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onCardClick: () => void;
  menuButtonRef?:  React.MutableRefObject<HTMLButtonElement>
}

export const Card: FunctionComponent<CardProps> = ({
  title,
  lastModified,
  isPublished,
  onTogglePublished,
  onCopyUrl,
  onEdit,
  onDuplicate,
  onDelete,
  onCardClick,
  menuButtonRef = null
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log("🚀 ~ Card ~ isMenuOpen:", isMenuOpen, title)
  // const menuButtonRef = useRef<HTMLButtonElement>(null);
  return (
    <CardWrapper onClick={() => {
      onCardClick()
    }}>
      <TopSection>
        <TitleSection>
          <TitleText>{title}</TitleText>
          <MenuButton
            ref={menuButtonRef}
            onClick={(e) => {
              e.stopPropagation()
              setIsMenuOpen(!isMenuOpen)
            }}
          >
            <FiMoreVertical size={20} />
          </MenuButton>
          <FloatingMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            onEdit={(e) => { 
              e.stopPropagation()
              onEdit()
            }}
            onDuplicate={(e) => {
              e.stopPropagation()
              onDuplicate()
            }}
            onDelete={(e) => {
              e.stopPropagation()
              onDelete()
            }}
            anchorEl={menuButtonRef.current}
          />
        </TitleSection>
      </TopSection>

      <BottomContainer>
        <ModifiedText>Last modified {lastModified}</ModifiedText>
        <BottomSection>
          <Toggle 
            isEnabled={isPublished}
            onToggle={onTogglePublished}
            rightLabel="Published"
          />

          <CopyButton onClick={(e) => {
            e.stopPropagation()
            onCopyUrl()
          }}>
            <CopyUrlIcon />
          </CopyButton>
        </BottomSection>
      </BottomContainer>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  position: relative;
  background: white;
  border: .2px solid ${props => props.theme.colors.dark.mediumGrey};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-width: 300px;
  height: 180px;
  cursor: pointer;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    max-width: 100%;
  }
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px;
  max-height: 90px;
  overflow: hidden; 
`;

const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
`;

const TitleText = styled(Body3Bold)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: break-word;
  flex: 1;
  line-height: 1.2;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.dark.darkGrey};
  
  &:hover {
    color: ${props => props.theme.colors.dark.black};
  }
`;

const ModifiedText = styled(Body4)`
  color: ${props => props.theme.colors.dark.darkGrey};
  padding: 8px 16px;
`;

const BottomContainer = styled.div`
  margin-top: auto;
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background-color: ${props => props.theme.colors.light.paleGreen};
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
`;

const CopyButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.dark.darkGrey};
  
  &:hover {
    color: ${props => props.theme.colors.dark.black};
  }
`;