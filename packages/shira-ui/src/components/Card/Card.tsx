import { FunctionComponent, useRef, useState } from 'react';
import styled from 'styled-components';
import { Body4, Body3Bold } from '../Typography';
import { FiMoreVertical } from 'react-icons/fi';
import { FloatingMenu } from '../FloatingMenu';
import Toggle from '../Toggle/Toggle';
import { MdLockOutline } from 'react-icons/md';
import { TbWorld } from 'react-icons/tb';
import { defaultTheme } from '../../theme';
import { LoadingIcon } from '../LoadingIcon';

export interface CardProps {
  id?: string;
  title: string;
  lastModified: string;
  isPublished: boolean;
  onTogglePublished: () => void;
  onCopyUrl: () => void;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onCardClick: () => void;
  publishedText: string;
  unpublishedText?: string;
  isPublic?: boolean;
  visibilityText?: string;
  showLoading?: boolean;
  loadingLabel?: string;
}

export const Card: FunctionComponent<CardProps> = ({
  id,
  title,
  lastModified,
  isPublished,
  onTogglePublished,
  onEdit,
  onDuplicate,
  onDelete,
  onCardClick,
  publishedText,
  unpublishedText,
  isPublic,
  visibilityText,
  loadingLabel,
  showLoading = false,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const toggleLabel = isPublished ? publishedText : unpublishedText ?? publishedText;

  return (
    <CardWrapper id={id} onClick={() => {
      onCardClick()
    }}>
      {showLoading && (
        <ActionLoadingOverlay role="status" aria-live="polite">
          <ActionLoadingContent>
            <LoadingIcon size={34} />
            <ActionLoadingText>{loadingLabel}</ActionLoadingText>
          </ActionLoadingContent>
        </ActionLoadingOverlay>
      )}
      <TopSection>
        <HeaderRow>
          {visibilityText ? (
            <VisibilityTag>
              {isPublic ? (
                <TbWorld size={16} color={defaultTheme.colors.dark.darkGrey} />
              ) : (
                <MdLockOutline size={16} color={defaultTheme.colors.dark.darkGrey} />
              )}
              <VisibilityBody>{visibilityText}</VisibilityBody>
            </VisibilityTag>
          ) : (
            <span />
          )}

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
            onEdit={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            onDuplicate={(e) => {
              e.stopPropagation();
              onDuplicate();
            }}
            onDelete={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            anchorEl={menuButtonRef.current}
          />
        </HeaderRow>

        <TitleText>{title}</TitleText>
      </TopSection>

      <BottomContainer>
        <ModifiedText>{lastModified}</ModifiedText>
        <BottomSection>
          <ToggleLabel>{toggleLabel}</ToggleLabel>
          <Toggle
            isEnabled={isPublished}
            onToggle={onTogglePublished}
          />
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

const ActionLoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  z-index: 1;
`;

const ActionLoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const ActionLoadingText = styled(Body4)`
  color: ${props => props.theme.colors.dark.darkGrey};
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 2px;
  max-height: 90px;
  overflow: hidden;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const TitleText = styled(Body3Bold)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
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

const ToggleLabel = styled(Body4)`
  color: ${props => props.theme.colors.dark.darkGrey};
`;

const VisibilityTag = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const VisibilityBody = styled(Body4)`
  color: ${props => props.theme.colors.dark.darkGrey};
`;
