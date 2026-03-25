interface BreadcrumbProps {
    text: string;
}
export interface BreadcrumbsProps {
    items: BreadcrumbProps[];
    active: number;
}
export declare const Breadcrumbs: ({ items, active }: BreadcrumbsProps) => import("react/jsx-runtime").JSX.Element;
export default Breadcrumbs;
