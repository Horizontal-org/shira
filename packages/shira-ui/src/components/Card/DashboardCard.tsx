import { FunctionComponent, ReactNode, useMemo, useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { IoLinkOutline } from 'react-icons/io5';
import { MdLockOutline, MdOutlineContentCopy } from 'react-icons/md';
import { TbWorld } from 'react-icons/tb';
import styled from 'styled-components';
import { defaultTheme } from '../../theme';
import { Body4 } from '../Typography';
import Toggle from '../Toggle/Toggle';
import {
  Card,
  CardFooter,
  CardFooterMeta,
  type CardMenuItem,
} from './Card';

export interface DashboardCardProps {
  id?: string;
  title: ReactNode;
  lastModified: ReactNode;
  isPublished: boolean;
  publishedText: string;
  unpublishedText?: string;
  visibilityText?: ReactNode;
  isPublic?: boolean;
  disablePublishToggle?: boolean;
  disabledTooltipLabel?: string;
  onTogglePublished: () => void;
  onCopyUrl?: () => void;
  onEdit?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
  showLoading?: boolean;
  loadingLabel?: string;
  canDuplicate?: boolean;
  minHeight?: string;
  editText?: string;
  duplicateText?: string;
  copyLinkText?: string;
  deleteText?: string;
}

export const DashboardCard: FunctionComponent<DashboardCardProps> = ({
  id,
  title,
  lastModified,
  isPublished,
  publishedText,
  unpublishedText,
  visibilityText,
  isPublic = false,
  disablePublishToggle = false,
  disabledTooltipLabel,
  onTogglePublished,
  onCopyUrl,
  onEdit,
  onDuplicate,
  onDelete,
  onClick,
  showLoading = false,
  loadingLabel,
  canDuplicate = true,
  minHeight = '180px',
  editText = 'Edit',
  duplicateText = 'Duplicate',
  copyLinkText = 'Copy link',
  deleteText = 'Delete',
}) => {
  const [showPublishTooltip, setShowPublishTooltip] = useState(false);

  const menuItems = useMemo<CardMenuItem[]>(() => {
    const nextItems: CardMenuItem[] = [];

    if (onEdit) {
      nextItems.push({
        text: editText,
        onClick: onEdit,
        icon: <FiEdit2 color={defaultTheme.colors.dark.darkGrey} />,
      });
    }

    if (canDuplicate && onDuplicate) {
      nextItems.push({
        text: duplicateText,
        onClick: onDuplicate,
        icon: <MdOutlineContentCopy color={defaultTheme.colors.dark.darkGrey} />,
      });
    }

    if (isPublic && onCopyUrl) {
      nextItems.push({
        text: copyLinkText,
        onClick: onCopyUrl,
        icon: <IoLinkOutline color={defaultTheme.colors.dark.darkGrey} />,
      });
    }

    if (onDelete) {
      nextItems.push({
        text: deleteText,
        onClick: onDelete,
        icon: <FiTrash2 color={defaultTheme.colors.error7} />,
      });
    }

    return nextItems;
  }, [
    canDuplicate,
    copyLinkText,
    deleteText,
    duplicateText,
    editText,
    isPublic,
    onCopyUrl,
    onDelete,
    onDuplicate,
    onEdit,
  ]);

  return (
    <Card
      id={id}
      title={title}
      minHeight={minHeight}
      onClick={onClick}
      showLoading={showLoading}
      loadingLabel={loadingLabel}
      menuItems={menuItems}
      headerContent={visibilityText ? (
        <VisibilityRow>
          {isPublic ? (
            <TbWorld size={16} color={defaultTheme.colors.dark.darkGrey} />
          ) : (
            <MdLockOutline size={16} color={defaultTheme.colors.dark.darkGrey} />
          )}
          <VisibilityText>{visibilityText}</VisibilityText>
        </VisibilityRow>
      ) : undefined}
      bodyContent={<LastModifiedText>{lastModified}</LastModifiedText>}
      footerContent={(
        <CardFooter>
          <CardFooterMeta>
            <PublishLabel>{isPublished ? publishedText : unpublishedText ?? publishedText}</PublishLabel>

            <PublishControls
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <PublishToggleWrapper
                $showHelpCursor={disablePublishToggle}
                onMouseEnter={() => {
                  if (disablePublishToggle) {
                    setShowPublishTooltip(true);
                  }
                }}
                onMouseLeave={() => {
                  setShowPublishTooltip(false);
                }}
                onFocus={() => {
                  if (disablePublishToggle) {
                    setShowPublishTooltip(true);
                  }
                }}
                onBlur={() => {
                  setShowPublishTooltip(false);
                }}
                tabIndex={disablePublishToggle ? 0 : -1}
              >
                <Toggle
                  isEnabled={isPublished}
                  onToggle={() => {
                    if (disablePublishToggle) {
                      return;
                    }

                    onTogglePublished();
                  }}
                  disabled={disablePublishToggle}
                />

                {disablePublishToggle && showPublishTooltip && disabledTooltipLabel && (
                  <PublishToggleTooltip role="tooltip">
                    <Body4>{disabledTooltipLabel}</Body4>
                  </PublishToggleTooltip>
                )}
              </PublishToggleWrapper>
            </PublishControls>
          </CardFooterMeta>
        </CardFooter>
      )}
    />
  );
};

const VisibilityRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${props => props.theme.colors.dark.darkGrey};
`;

const VisibilityText = styled(Body4)`
  color: ${props => props.theme.colors.dark.darkGrey};
`;

const LastModifiedText = styled(Body4)`
  color: ${props => props.theme.colors.dark.darkGrey};
`;

const PublishControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
`;

const PublishLabel = styled(Body4)`
  color: ${props => props.theme.colors.dark.darkGrey};
  white-space: nowrap;
`;

const PublishToggleWrapper = styled.div<{ $showHelpCursor: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;

  ${props => props.$showHelpCursor && `
    cursor: help;

    button:disabled {
      cursor: help !important;
    }
  `}
`;

const PublishToggleTooltip = styled.div`
  position: absolute;
  right: 0;
  bottom: calc(100% + 8px);
  max-width: 220px;
  padding: 8px 10px;
  border-radius: 8px;
  background: ${props => props.theme.colors.dark.black};
  color: ${props => props.theme.colors.light.white};
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.16);
  z-index: 2;
`;
