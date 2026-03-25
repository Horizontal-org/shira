/// <reference types="react" />
interface NavigateFunction {
    (path: string): void;
}
interface MenuItem {
    icon: React.ReactNode;
    label: string;
    path: string;
}
export declare function useAdminSidebar(navigate: NavigateFunction, customMenuItems?: MenuItem[]): {
    isCollapsed: boolean;
    handleCollapse: (collapsed: boolean) => void;
    menuItems: {
        onClick: () => void;
        icon: import('react').ReactNode;
        label: string;
        path: string;
    }[];
};
export {};
