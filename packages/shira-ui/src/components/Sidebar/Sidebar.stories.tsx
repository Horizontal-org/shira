import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './Sidebar';
import { FiHome, FiHelpCircle, FiLogOut } from 'react-icons/fi';

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
    icon: <FiHome size={24} color="white" />,
    label: 'Dashboard',
    onClick: () => console.log('Dashboard clicked'),
  },
  {
    icon: <FiHelpCircle size={24} color="white" />,
    label: 'Support',
    onClick: () => console.log('Support clicked'),
  },
  {
    icon: <FiLogOut size={24} color="white" />,
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