import { ReactNode } from 'react';
export interface BoxProps {
    children: ReactNode;
    padding?: 'large' | 'default' | 'small';
    className?: string;
}
export declare const Box: ({ children, padding, className }: BoxProps) => import("react/jsx-runtime").JSX.Element;
export default Box;
