import { default as React } from 'react';
export interface SidebarProps {
    menuItems: Array<{
        icon: React.ReactNode;
        label: string;
        onClick: () => void;
    }>;
    selectedItemLabel?: string;
    onClose?: () => void;
    onCollapse: (collapsed: boolean) => void;
}
export declare const Sidebar: React.FC<SidebarProps>;
