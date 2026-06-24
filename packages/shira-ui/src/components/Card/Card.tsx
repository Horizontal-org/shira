import { FunctionComponent, ReactElement, ReactNode, useRef, useState } from 'react';
import styled from 'styled-components';
import { Body1SemiBold, Body4 } from '../Typography';
import { FiMoreVertical } from 'react-icons/fi';
import { BaseFloatingMenu } from '../FloatingMenu';
import { LoadingIcon } from '../LoadingIcon';

export interface CardMenuItem {
  text: string;
  icon?: ReactElement;
  onClick: () => void;
}

export interface CardProps {
  id?: string;
  title: ReactNode;
  headerContent?: ReactNode;
  bodyContent?: ReactNode;
  footerContent?: ReactNode;
  hoverAction?: ReactNode;
  menuItems?: CardMenuItem[];
  onClick?: () => void;
  showLoading?: boolean;
  loadingLabel?: string;
  minHeight?: string;
}

export const Card: FunctionComponent<CardProps> = ({
  id,
  title,
  headerContent,
  bodyContent,
  footerContent,
  hoverAction,
  menuItems = [],
  onClick,
  showLoading = false,
  loadingLabel,
  minHeight = '172px',
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const isClickable = !!onClick;

  return (
    <CardWrapper
      id={id}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(event) => {
        if (!isClickable) {
          return;
        }

        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick?.();
        }
      }}
      $isClickable={isClickable}
      $minHeight={minHeight}
    >
      {showLoading && (
        <ActionLoadingOverlay role="status" aria-live="polite">
          <ActionLoadingContent>
            <LoadingIcon size={34} />
            {loadingLabel && <ActionLoadingText>{loadingLabel}</ActionLoadingText>}
          </ActionLoadingContent>
        </ActionLoadingOverlay>
      )}

      <TopSection>
        {(headerContent || hoverAction || menuItems.length > 0) && (
          <HeaderSection>
            <HeaderRow>
              <HeaderContent>{headerContent}</HeaderContent>
            </HeaderRow>

            {hoverAction && <HoverActionContainer>{hoverAction}</HoverActionContainer>}

            {menuItems.length > 0 && (
              <>
                <MenuButton
                  ref={menuButtonRef}
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setIsMenuOpen((prev) => !prev);
                  }}
                >
                  <FiMoreVertical size={20} />
                </MenuButton>

                <BaseFloatingMenu
                  isOpen={isMenuOpen}
                  onClose={() => setIsMenuOpen(false)}
                  anchorEl={menuButtonRef.current}
                  elements={menuItems.map((item) => ({
                    text: item.text,
                    icon: item.icon,
                    onClick: (event) => {
                      event.stopPropagation();
                      setIsMenuOpen(false);
                      item.onClick();
                    },
                  }))}
                />
              </>
            )}
          </HeaderSection>
        )}

        <CardBody>
          <CardTitle>{title}</CardTitle>
          {bodyContent}
        </CardBody>
      </TopSection>

      {footerContent}
    </CardWrapper>
  );
};

export const CardChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px;
  border-radius: 2px;
  background: ${props => props.theme.colors.light.paleGrey};
  color: ${props => props.theme.colors.dark.darkGrey};
  line-height: 1;
`;

export const CardFooter = styled.div`
  background: ${props => props.theme.colors.light.paleGreen};
  padding: 7px 20px;
`;

export const CardFooterMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const CardFooterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CardFooterText = styled(Body4)`
  color: ${props => props.theme.colors.dark.darkGrey};
  margin: 0;
`;

const HoverActionContainer = styled.div`
  position: absolute;
  top: 0;
  right: 32px;
  z-index: 2;
`;

const CardWrapper = styled.div<{ $isClickable: boolean; $minHeight: string }>`
  position: relative;
  background: ${props => props.theme.colors.light.white};
  border: 1px solid ${props => props.theme.colors.dark.lightGrey};
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  height: 100%;
  min-height: ${props => props.$minHeight};
  cursor: ${props => props.$isClickable ? 'pointer' : 'default'};

  @media (hover: hover) and (pointer: fine) {
    ${HoverActionContainer} {
      opacity: 0;
      pointer-events: none;
      visibility: hidden;
    }

    &:hover ${HoverActionContainer},
    &:focus-within ${HoverActionContainer} {
      opacity: 1;
      pointer-events: auto;
      visibility: visible;
    }
  }
`;

const ActionLoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  z-index: 3;
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
  flex: 1;
  flex-direction: column;
  gap: 10px;
  padding: 18px;
`;

const HeaderSection = styled.div`
  position: relative;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  padding-right: 24px;
`;

const HeaderContent = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  min-width: 0;
`;

const MenuButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  border-radius: 8px;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.dark.darkGrey};

  &:hover,
  &:focus-visible {
    color: ${props => props.theme.colors.dark.black};
  }
`;

const CardBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  min-height: 116px;
`;

const CardTitle = styled(Body1SemiBold)`
  color: ${props => props.theme.colors.dark.black};
  line-height: 1.35;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 20px;
  }
`;
