import { Meta, StoryObj } from '@storybook/react';

import Whatsapp from '../../components/Apps/Whatsapp';

export default {
  title: 'Apps/Whatsapp',
  component: Whatsapp,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '800px' }}>
        <Story />
      </div>
    ),
  ]
} as Meta<typeof Whatsapp>;

type Story = StoryObj<typeof Whatsapp>

export const Default: Story = {
  args: {
    phone: {
      textContent: '+5491131312222',
      explanationPosition: null
    },
    content: document.createElement('div'),
    explanationNumber: 0,
    explanations: []
  },
};

