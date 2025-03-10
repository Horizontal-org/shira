import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from './Breadcrumbs';


const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: 'Breadcrumb item'
    },
    active: {
      control: 'number',
      description: 'Active breadcrumb index'
    }    
  }
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

// Default toggle with label
export const Default: Story = {
  args: {
    active: 1,
    items: [
      {
        text: 'First bread'
      },
      {
        text: 'Second bread'
      },
      {
        text: 'Third bread'
      },
    ],
  },
};
