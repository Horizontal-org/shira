import { FormEvent, ReactNode } from 'react';
export interface FormProps {
    title?: string;
    titleSize?: 'small' | 'medium' | 'large';
    header?: string;
    description?: ReactNode;
    children: ReactNode;
    className?: string;
    onSubmit?: (e: FormEvent) => void;
}
export declare const Form: ({ title, titleSize, description, children, className, onSubmit, header }: FormProps) => import("react/jsx-runtime").JSX.Element;
export default Form;
