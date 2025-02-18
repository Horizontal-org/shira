import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';
import { useState } from 'react';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isEnabled: { 
      control: 'boolean',
      description: 'Current state of the toggle'
    },
    onToggle: {
      description: 'Callback function triggered when toggle is clicked'
    },
    rightLabel: {
      control: 'text',
      description: 'Optional label text displayed next to toggle'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable toggle interactions'
    }
  }
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof Toggle>;

// Default toggle with label
export const Default: Story = {
  args: {
    isEnabled: false,
    rightLabel: 'Toggle me',
    onToggle: () => {},
  },
};

// Interactive toggle example using React state
export const Interactive: Story = {
  args: {
    isEnabled: false,
    leftLabel: 'Unpublished',
    rightLabel: 'Published',
    onToggle: () => {},
  },
  render: function Render(args) {
    const [isEnabled, setIsEnabled] = useState(false);
    return (
      <Toggle 
        {...args}
        isEnabled={isEnabled}
        onToggle={() => setIsEnabled(!isEnabled)}
      />
    );
  }
};

// Enabled state
export const Enabled: Story = {
  args: {
    isEnabled: true,
    rightLabel: 'Enabled state',
    onToggle: () => {},
  },
};

// Without label
export const WithoutLabel: Story = {
  args: {
    isEnabled: false,
    onToggle: () => {},
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    isEnabled: false,
    rightLabel: 'Disabled toggle',
    disabled: true,
    onToggle: () => {},
  },
};

// Disabled and enabled state
export const DisabledAndEnabled: Story = {
  args: {
    isEnabled: true,
    rightLabel: 'Disabled and enabled',
    disabled: true,
    onToggle: () => {},
  },
};