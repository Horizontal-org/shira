import { ChangeEventHandler } from 'react';
export interface Props {
    placeholder?: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    value: string;
    label?: string;
    disabled?: boolean;
    type?: 'text' | 'password' | 'email';
    required?: boolean;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    id?: string;
    name?: string;
}
export declare const TextInput: import('react').ForwardRefExoticComponent<Props & import('react').RefAttributes<HTMLInputElement>>;
