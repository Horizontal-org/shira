import { useState } from 'react'
import { FiHome, FiHelpCircle, FiLogOut } from 'react-icons/fi';

interface NavigateFunction {
  (path: string): void;
}

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const defaultAdminPaths = {
  dashboard: '/dashboard',
  support: '/support',
  logout: '/logout'
} as const;

const createDefaultMenuItems = (navigate: NavigateFunction): MenuItem[] => [
  {
    icon: <FiHome size={24} color="white" />,
    label: 'Dashboard',
    path: defaultAdminPaths.dashboard
  },
  {
    icon: <FiHelpCircle size={24} color="white" />,
    label: 'Support',
    path: defaultAdminPaths.support
  },
  {
    icon: <FiLogOut size={24} color="white" />,
    label: 'Log out',
    path: defaultAdminPaths.logout
  }
];


export function useAdminSidebar(navigate: NavigateFunction, customMenuItems?: MenuItem[]) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapse = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
  };

  const menuItems = (customMenuItems || createDefaultMenuItems(navigate)).map(item => ({
    ...item,
    onClick: () => navigate(item.path)
  }));

  return {
    isCollapsed,
    handleCollapse,
    menuItems
  };
}