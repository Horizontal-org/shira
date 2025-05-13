import { StoryObj, Meta } from '@storybook/react';

import Gmail from '../../components/Apps/Gmail';

export default {
  title: 'Apps/Gmail',
  component: Gmail,
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
} as Meta<typeof Gmail>;

type Story = StoryObj<typeof Gmail>

// = (args) => <Gmail {...args} />;

// Default state with fixed props
export const Default: Story = {
  args: {
    senderName: {
      textContent: 'Juan',
      explanationPosition: null
    },
    senderEmail: {
      textContent: 'juan@wearehorizontal.org',
      explanationPosition: null
    },
    subject: {
      textContent: 'Im gonna phish you!',
      explanationPosition: null
    },
    // content: document.createElement('div'),
    content: null,
    attachments: [
      {
        name: 'at.txt',
        position: '1'
      },
      {
        name: 'at2.pdf',
        position: '2'
      }
    ],
    explanationNumber: 0,
    explanations: []
  },
};

