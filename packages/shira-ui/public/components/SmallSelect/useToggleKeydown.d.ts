import { KeyboardEvent } from 'react';
type Options = {
    onToggle: () => void;
    onClose?: () => void;
    openKeys?: string[];
    closeKeys?: string[];
};
export declare function useToggleKeydown<T extends HTMLElement>({ onToggle, onClose, openKeys, closeKeys, }: Options): (event: KeyboardEvent<T>) => void;
export {};
