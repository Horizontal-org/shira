import { FunctionComponent, useRef, useState } from 'react';
import styled from 'styled-components';
import { Body4, Body3Bold } from '../Typography';
import { FiMoreVertical, FiLink } from 'react-icons/fi';
import { FloatingMenu } from '../FloatingMenu';

export interface CardProps {
  title: string;
  lastModified: string;
  isPublished: boolean;
  onTogglePublished: () => void;
  onCopyUrl: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

interface ToggleSwitchProps {
  $isPublished: boolean;
}

export const Card: FunctionComponent<CardProps> = ({
  title,
  lastModified,
  isPublished,
  onTogglePublished,
  onCopyUrl,
  onEdit,
  onDelete
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  return (
    <CardWrapper>
      <TopSection>
        <TitleSection>
          <TitleText>{title}</TitleText>
          <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FiMoreVertical size={20} />
          </MenuButton>
          <FloatingMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            onEdit={onEdit}
            onDelete={onDelete}
            anchorEl={menuButtonRef.current}
          />
        </TitleSection>
      </TopSection>

      <BottomContainer>
        <ModifiedText>Last modified {lastModified}</ModifiedText>
        <BottomSection>
          <ToggleWrapper>
            <ToggleSwitch
              $isPublished={isPublished}
              onClick={onTogglePublished}
            >
              <ToggleSlider $isPublished={isPublished} />
            </ToggleSwitch>
            <ToggleText>Published</ToggleText>
          </ToggleWrapper>

          <CopyButton onClick={onCopyUrl}>
            <FiLink size={20} />
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

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ToggleText = styled(Body4)`
  color: ${props => props.theme.colors.dark.black};
`;

const ToggleSwitch = styled.button<ToggleSwitchProps>`
  position: relative;
  width: 50px;
  height: 24px;
  background: ${props => props.$isPublished ? props.theme.secondary.dark : props.theme.colors.dark.mediumGrey};
  border-radius: 12px;
  padding: 2px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
`;

const ToggleSlider = styled.span<{ $isPublished: boolean }>`
  position: absolute;
  left: ${props => props.$isPublished ? '28px' : '2px'};
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: left 0.2s;
  top: 2px;
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