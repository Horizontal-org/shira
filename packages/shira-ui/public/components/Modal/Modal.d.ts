import { default as React } from 'react';
export interface ModalProps {
    id?: string;
    isOpen: boolean;
    title: string;
    titleIcon?: React.ReactNode;
    children: React.ReactNode;
    primaryButtonText: string;
    primaryButtonDisabled?: boolean;
    onPrimaryClick: () => void;
    type?: ModalType;
    secondaryButtonText: string;
    onSecondaryClick?: () => void;
    onLeftClick?: () => void;
    leftButtonText?: string;
    className?: string;
    size?: 'small' | 'medium' | 'large';
    onClose?: () => void;
}
export declare enum ModalType {
    Danger = "danger",
    Primary = "primary"
}
export declare const Modal: React.FC<ModalProps>;
export default Modal;
