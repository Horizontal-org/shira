import { FunctionComponent, ReactElement } from 'react';
interface MenuElement {
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
    text: string;
    icon?: ReactElement | undefined;
}
export interface BaseFloatingMenuProps {
    isOpen: boolean;
    elements: Array<MenuElement>;
    onClose: () => void;
    anchorEl: HTMLButtonElement | null;
}
export declare const BaseFloatingMenu: FunctionComponent<BaseFloatingMenuProps>;
export {};
