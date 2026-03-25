import { FunctionComponent } from 'react';
export interface FloatingMenuProps {
    isOpen: boolean;
    onEdit?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onDuplicate?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onCopyUrl?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onDelete: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onClose: () => void;
    isPublic?: boolean;
    anchorEl: HTMLButtonElement | null;
}
export declare const FloatingMenu: FunctionComponent<FloatingMenuProps>;
