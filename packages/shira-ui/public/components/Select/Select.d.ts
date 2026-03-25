export interface SelectOption {
    value: any;
    label: string;
}
export interface SelectProps {
    label: string;
    options: SelectOption[];
    onChange: (value: any) => void;
    value?: string;
}
export declare const SelectComponent: ({ label, options, onChange, value }: SelectProps) => import("react/jsx-runtime").JSX.Element;
export default SelectComponent;
