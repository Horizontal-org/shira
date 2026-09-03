import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';
import { FiMoreVertical } from "react-icons/fi";

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'outline'],
      description: 'The visual style of the button',
      defaultValue: 'primary'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button interactions'
    },
    onClick: {
      action: 'clicked'
    }
  }
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: 'primary',
    icon: <FiMoreVertical />
  }
};

export const Outline: Story = {
  args: {
    type: 'outline',
    icon: <FiMoreVertical />
  }
};