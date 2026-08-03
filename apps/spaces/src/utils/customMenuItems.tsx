import { MenuItem } from '@horizontal-org/shira-ui';
import { FiLogOut } from 'react-icons/fi';
import { IoMdHelpCircle, IoMdSettings } from 'react-icons/io';
import { IoPerson } from 'react-icons/io5';
import { LuNotepadText } from 'react-icons/lu';
import { MdMenuBook } from 'react-icons/md';

export const customMenuItems: MenuItem[] = [
  {
    icon: <LuNotepadText id="dashboard-icon" size={24} color="currentColor" />,
    label: 'sidebar.quizzes',
    path: '/dashboard',
  },
  {
    icon: <IoPerson id='learner-icon' size={24} color='currentColor' />,
    label: 'sidebar.learners',
    path: '/learner'
  },
  {
    icon: <MdMenuBook id="templates-icon" size={24} color="currentColor" />,
    label: 'sidebar.templates',
    path: '/template-library'
  },
  {
    icon: <IoMdHelpCircle id="support-icon" size={24} color="currentColor" />,
    label: 'sidebar.support',
    path: '/support'
  },
  {
    icon: <IoMdSettings id="settings-icon" size={24} color="currentColor" />,
    label: 'sidebar.settings',
    path: '/settings'
  },
  {
    icon: <FiLogOut id="logout-icon" size={24} color="currentColor" />,
    label: 'sidebar.logout',
    path: '/logout'
  }
];
