export interface FilterButtonProps {
    id?: string;
    text: string;
    handleFilter: () => void;
    isActive: boolean;
    color?: string;
}
export declare const FilterButton: ({ id, text, handleFilter, isActive, color }: FilterButtonProps) => import("react/jsx-runtime").JSX.Element;
