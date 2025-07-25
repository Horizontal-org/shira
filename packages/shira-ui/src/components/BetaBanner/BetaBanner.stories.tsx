import type { Meta, StoryObj } from '@storybook/react';
import { BetaBanner } from './BetaBanner';

const meta = {
  title: 'Components/BetaBanner',
  component: BetaBanner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    url: {
      description: 'Url to go when click here'
    },    
  }
} satisfies Meta<typeof BetaBanner>;

export default meta;
type Story = StoryObj<typeof BetaBanner>;

// Default toggle with label
export const Default: Story = {
  args: {
    url: 'https://shira.app'
  },
};
