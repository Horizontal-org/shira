import { useState } from 'react'
import { FiHome, FiHelpCircle, FiLogOut } from 'react-icons/fi';
import { GoPersonFill } from 'react-icons/go';

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
  learners: '/learner',
  support: '/support',
  logout: '/logout'
} as const;

const createDefaultMenuItems = (): MenuItem[] => [
  {
    icon: <FiHome id="dashboard-icon" size={24} color="white" />,
    label: 'Dashboard',
    path: defaultAdminPaths.dashboard
  },
  {
    icon: <GoPersonFill id='learner-icon' size={24} color='white' />,
    label: 'Learners',
    path: defaultAdminPaths.learners
  },
  {
    icon: <FiHelpCircle id="support-icon" size={24} color="white" />,
    label: 'Support',
    path: defaultAdminPaths.support
  },
  {
    icon: <FiLogOut id="logout-icon" size={24} color="white" />,
    label: 'Log out',
    path: defaultAdminPaths.logout
  }
];


export function useAdminSidebar(navigate: NavigateFunction, customMenuItems?: MenuItem[]) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapse = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
  };

  const menuItems = (customMenuItems || createDefaultMenuItems()).map(item => ({
    ...item,
    onClick: () => navigate(item.path)
  }));

  return {
    isCollapsed,
    handleCollapse,
    menuItems
  };
}