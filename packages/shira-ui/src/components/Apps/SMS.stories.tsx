import { StoryObj, Meta } from '@storybook/react';

import {SMS} from '../../components/Apps/SMS';

export default {
  title: 'Apps/SMS',
  component: SMS,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ]
} as Meta<typeof SMS>;

type Story = StoryObj<typeof SMS>

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