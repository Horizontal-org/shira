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
    receiverEmail: 'gus@wearehorizontal.org',
    receiverName: 'Gus',
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

export const LongSubject: Story = {
  args: {
    senderName: {
      textContent: 'Juan',
      explanationPosition: null
    },
    senderEmail: {
      textContent: 'juan@wearehorizontal.org',
      explanationPosition: null
    },
    receiverEmail: 'gus@wearehorizontal.org',
    receiverName: 'Gus',
    subject: {
      textContent: 'This is a long subject, a very long subject, a very very very long subject, a super very mega very super long subject.',
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

export const NoSubject: Story = {
  args: {
    senderName: {
      textContent: 'Juan',
      explanationPosition: null
    },
    senderEmail: {
      textContent: 'juan@wearehorizontal.org',
      explanationPosition: null
    },
    receiverEmail: 'gus@wearehorizontal.org',
    receiverName: 'Gus',
    subject: {
      textContent: '',
      explanationPosition: null
    },
    // content: document.createElement('div'),
    content: null,
    attachments: [],
    explanationNumber: 0,
    explanations: []
  },
};

export const AttachmentTypes: Story = {
  args: {
    senderName: {
      textContent: 'Juan',
      explanationPosition: null
    },
    senderEmail: {
      textContent: 'juan@wearehorizontal.org',
      explanationPosition: null
    },
    receiverEmail: 'gus@wearehorizontal.org',
    receiverName: 'Gus',
    subject: {
      textContent: 'This is a subject',
      explanationPosition: null
    },
    // content: document.createElement('div'),
    content: null,
    attachments: [
      {
        name: 'at.txt',
        position: '1',
        fileType: 'image'
      },
      {
        name: 'at2.pdf',
        position: '2',
        fileType: 'video'
      },
      {
        name: 'at2.pdf',
        position: '2',
        fileType: 'audio'
      },
      {
        name: 'at2.pdf',
        position: '2',
        fileType: 'document'
      },
      {
        name: 'at2.pdf',
        position: '2',
        fileType: 'other'
      }
    ],
    explanationNumber: 0,
    explanations: []
  },
};


