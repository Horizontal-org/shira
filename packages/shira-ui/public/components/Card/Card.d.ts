import { FunctionComponent } from 'react';
export interface CardProps {
    id?: string;
    title: string;
    lastModified: string;
    isPublished: boolean;
    disablePublishToggle?: boolean;
    disabledTooltipLabel?: string;
    onTogglePublished: () => void;
    onCopyUrl?: () => void;
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
export declare const Card: FunctionComponent<CardProps>;
