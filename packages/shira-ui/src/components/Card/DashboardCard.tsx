import { FunctionComponent, ReactNode, useState } from 'react';
import { MdLockOutline } from 'react-icons/md';
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
} from './Card';
import { getDashboardCardMenuItems, type DashboardCardActions } from './DashboardCard.menuItems';

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
  actions?: DashboardCardActions;
  onClick?: () => void;
  showLoading?: boolean;
  loadingLabel?: string;
  canDuplicate?: boolean;
  minHeight?: string;
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
  actions,
  onClick,
  showLoading = false,
  loadingLabel,
  canDuplicate = true,
  minHeight = '180px',
}) => {
  const [showPublishTooltip, setShowPublishTooltip] = useState(false);

  const menuItems = getDashboardCardMenuItems({ actions, canDuplicate, isPublic });

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
