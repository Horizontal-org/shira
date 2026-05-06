import type { Meta, StoryObj } from '@storybook/react';
import { ExplanationButton } from './ExplanationButton';

const meta = {
  title: 'Components/ExplanationButton',
  component: ExplanationButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    active: {
      control: 'boolean',
    },
    onClick: {
      action: 'clicked',
    },
    disabled: {
      control: 'boolean',
    },
    isText: {
      control: 'boolean',
    },
    hasExplanation: {
      control: 'boolean',
    },
  }
} satisfies Meta<typeof ExplanationButton>;

export default meta;
type Story = StoryObj<typeof ExplanationButton>;

// Default toggle with label
export const DefaultOutline: Story = {
  args: {
    active: false,
    onClick: () => console.log('clicked'),
    disabled: false,
    isText: false,
    hasExplanation: false
  },
};

export const DefaultFilled: Story = {
  args: {
    active: false,
    onClick: () => console.log('clicked'),
    disabled: false,
    isText: false,
    hasExplanation: true
  },
};

export const ActiveExplanationFilled: Story = {
  args: {
    active: true,
    onClick: () => console.log('clicked'),
    disabled: false,
    isText: false,
    hasExplanation: true
  },
};


export const TextOutline: Story = {
  args: {
    active: false,
    onClick: () => console.log('clicked'),
    disabled: false,
    isText: true,
    hasExplanation: false
  },
}

export const TextFilled: Story = {
  args: {
    active: false,
    onClick: () => console.log('clicked'),
    disabled: false,
    isText: true,
    hasExplanation: true
  },
}


export const ActiveExplanationTextFilled: Story = {
  args: {
    active: true,
    onClick: () => console.log('clicked'),
    disabled: false,
    isText: true,
    hasExplanation: true
  },
}

export const DisabledOutline: Story = {
  args: {
    active: false,
    onClick: () => console.log('clicked'),
    disabled: true,
    isText: false,
    hasExplanation: false
  },
};


export const DisabledFilled: Story = {
  args: {
    active: false,
    onClick: () => console.log('clicked'),
    disabled: true,
    isText: false,
    hasExplanation: true
  },
};
