import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './Sidebar';
import { FiHelpCircle, FiLogOut } from 'react-icons/fi';
import { IoPersonOutline } from 'react-icons/io5';
import { IoMdSettings } from 'react-icons/io';
import { LuNotepadText } from 'react-icons/lu';

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultMenuItems = [
  {
    icon: <LuNotepadText id="dashboard-icon" size={24} color="currentColor" />,
    label: 'Quizzes',
    onClick: () => console.log('Quizzes clicked'),
  },
  {
    icon: <IoPersonOutline id="learner-icon" size={24} color="currentColor" />,
    label: 'Learners',
    onClick: () => console.log('Learners clicked'),
  },
  {
    icon: <FiHelpCircle id="support-icon" size={24} color="currentColor" />,
    label: 'Support',
    onClick: () => console.log('Support clicked'),
  },
  {
    icon: <IoMdSettings id="settings-icon" size={24} color="currentColor" />,
    label: 'Settings',
    onClick: () => console.log('Settings clicked'),
  },
  {
    icon: <FiLogOut id="logout-icon" size={24} color="currentColor" />,
    label: 'Log out',
    onClick: () => console.log('Log out clicked'),
  },
];

export const Default: Story = {
  args: {
    menuItems: defaultMenuItems,
    onClose: () => console.log('Sidebar closed'),
    onCollapse: () => console.log('collapsing')
  },
};

export const Selected: Story = {
  args: {
    menuItems: defaultMenuItems,
    onClose: () => console.log('Sidebar closed'),
    onCollapse: () => console.log('collapsing'),
    selectedItemLabel: 'Support'
  },
};


export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    menuItems: defaultMenuItems,
    onClose: () => console.log('Sidebar closed'),
    onCollapse: () => console.log('collapsing')
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  args: {
    menuItems: defaultMenuItems,
    onClose: () => console.log('Sidebar closed'),
    onCollapse: () => console.log('collapsing')
  },
};
