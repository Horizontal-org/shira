import { FunctionComponent } from 'react';
export interface OptionInterface {
    label: string;
    value: string;
    labelEnglish?: string;
    leftIcon?: React.ReactNode;
}
export interface SmallSelectProps {
    options: OptionInterface[];
    value?: string;
    onChange: (value: string) => void;
    initialPlaceholder?: string;
    placeholderLeftIcon?: React.ReactNode;
    fixedLeftIcon?: React.ReactNode;
}
export declare const SmallSelect: FunctionComponent<SmallSelectProps>;
