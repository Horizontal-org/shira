import { FunctionComponent, ReactNode } from 'react';
export interface RadioGroupOption {
    value: string;
    label: ReactNode;
    disabled?: boolean;
}
export interface RadioGroupProps {
    name: string;
    legend?: ReactNode;
    value?: string | null;
    onChange: (value: string) => void;
    options: RadioGroupOption[];
    disabled?: boolean;
    required?: boolean;
    className?: string;
}
export declare const RadioGroup: FunctionComponent<RadioGroupProps>;
