import { useState } from 'react'
import { FiLogOut } from 'react-icons/fi';
import { IoMdHelpCircle, IoMdSettings } from 'react-icons/io';
import { IoPerson } from 'react-icons/io5';
import { LuNotepadText } from 'react-icons/lu';

interface NavigateFunction {
  (path: string): void;
}

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const defaultAdminPaths = {
  quizzes: '/dashboard',
  learners: '/learner',
  support: '/support',
  logout: '/logout',
  settings: '/settings'
} as const;

const createDefaultMenuItems = (): MenuItem[] => [
  {
    icon: <LuNotepadText id="dashboard-icon" size={24} color="currentColor" />,
    label: 'Quizzes',
    path: defaultAdminPaths.quizzes
  },
  {
    icon: <IoPerson id='learner-icon' size={24} color='currentColor' />,
    label: 'Learners',
    path: defaultAdminPaths.learners
  },
  {
    icon: <IoMdHelpCircle id="support-icon" size={24} color="currentColor" />,
    label: 'Support',
    path: defaultAdminPaths.support
  },
  {
    icon: <IoMdSettings id="settings-icon" size={24} color="currentColor" />,
    label: 'Settings',
    path: defaultAdminPaths.settings
  },
  {
    icon: <FiLogOut id="logout-icon" size={24} color="currentColor" />,
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