import { FunctionComponent, ReactNode, useMemo, useState } from 'react';
import { IoLinkOutline } from 'react-icons/io5';
import { MdDelete, MdLockOutline, MdModeEdit, MdOutlineContentCopy } from 'react-icons/md';
import { TbWorld } from 'react-icons/tb';
import styled from 'styled-components';
import { defaultTheme } from '../../theme';
import { Body4 } from '../Typography';
import { GeneralTooltip } from '../GeneralTooltip';
import Toggle from '../Toggle/Toggle';
import {
  Card,
  CardFooter,
  CardFooterMeta,
  type CardMenuItem,
} from './Card';
import { FiUpload } from 'react-icons/fi';

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
  onSubmitAsTemplate?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
  showLoading?: boolean;
  loadingLabel?: string;
  canDuplicate?: boolean;
  minHeight?: string;
  editText?: string;
  duplicateText?: string;
  copyLinkText?: string;
  submitAsTemplateText?: string;
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
  onSubmitAsTemplate,
  onDelete,
  onClick,
  showLoading = false,
  loadingLabel,
  canDuplicate = true,
  minHeight = '180px',
  editText = 'Edit',
  duplicateText = 'Duplicate',
  copyLinkText = 'Copy link',
  submitAsTemplateText = 'Submit as template',
  deleteText = 'Delete',
}) => {
  const [showPublishTooltip, setShowPublishTooltip] = useState(false);

  const menuItems = useMemo<CardMenuItem[]>(() => {
    const items: (CardMenuItem | false)[] = [
      onEdit && {
        text: editText,
        onClick: onEdit,
        icon: <MdModeEdit color={defaultTheme.colors.dark.darkGrey} />,
      },
      canDuplicate && onDuplicate && {
        text: duplicateText,
        onClick: onDuplicate,
        icon: <MdOutlineContentCopy color={defaultTheme.colors.dark.darkGrey} />,
      },
      isPublic && onCopyUrl && {
        text: copyLinkText,
        onClick: onCopyUrl,
        icon: <IoLinkOutline color={defaultTheme.colors.dark.darkGrey} />,
      },
      onSubmitAsTemplate && {
        text: submitAsTemplateText,
        onClick: onSubmitAsTemplate,
        icon: <FiUpload color={defaultTheme.colors.dark.darkGrey} />,
      },
      onDelete && {
        text: deleteText,
        onClick: onDelete,
        icon: <MdDelete color={defaultTheme.colors.dark.darkGrey} />,
      },
    ];
    return items.filter((item): item is CardMenuItem => Boolean(item));
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
    onSubmitAsTemplate,
    submitAsTemplateText,
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
              <GeneralTooltip
                enabled={Boolean(disablePublishToggle && disabledTooltipLabel)}
                show={showPublishTooltip}
                setShow={setShowPublishTooltip}
                label={disabledTooltipLabel ?? ''}
                placement="top"
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
              </GeneralTooltip>
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
