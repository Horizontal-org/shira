import { ReactNode } from 'react';
export interface ButtonProps {
    id?: string;
    text: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'primary' | 'outline';
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    disabled?: boolean;
    size?: string;
    color?: string;
    className?: string;
    ref?: React.MutableRefObject<HTMLButtonElement>;
}
export declare const Button: import('react').ForwardRefExoticComponent<Omit<ButtonProps, "ref"> & import('react').RefAttributes<HTMLButtonElement>>;
