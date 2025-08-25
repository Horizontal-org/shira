import { StoryObj, Meta } from '@storybook/react';

import styled from 'styled-components';
import { Outlook } from './Outlook';

export default {
  title: 'Apps/Outlook',
  component: Outlook,
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
} as Meta<typeof Outlook>;

type Story = StoryObj<typeof Outlook>

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

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  height: 800px;
  width: 100%;
  background: rgba(0,0,0,0.5);
`

const Wrapper = styled.div`
  position: relative;
  z-index:1;
  background: white;
  padding: 24px;
  width: 1024px;
  height: 800px;
  box-sizing: border-box;
`
// Template with explanations overlay
const WithExplanationsTemplate = (args: any) => {
  return (
    <Wrapper>      
      <Outlook
        {...args}
      />
      { args.showExplanations && (<Overlay />)}
    </Wrapper>
  );
};

export const WithExplanationEditorText: Story = {
  render: WithExplanationsTemplate,
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
    showExplanations: true,
    explanationNumber: 1,
    subject: {
      textContent: '',
      explanationPosition: null
    },
    content: new DOMParser().parseFromString(`<div id='text-editor'><p data-explanation=1>We need to explain this</p></div>`, 'text/html').getElementById('text-editor'),
    attachments: [],
    explanations: [{
      index : "1",
      position: "1",
      text: "qsdqsdqsdqsd"
    }]
  },
};

export const WithExplanationImage: Story = {
  render: WithExplanationsTemplate,
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
    content: new DOMParser().parseFromString(`
      <div id='text-editor'><img src='https://placehold.co/320x400' data-explanation=1 /><img src='https://placehold.co/380x400' /></div>`
    , 'text/html').getElementById('text-editor'),
    attachments: [],
    showExplanations: true,
    explanationNumber: 1,
    explanations: [{
      index : "1",
      position: "1",
      text: "qsdqsdqsdqsd"
    }]
  },
};
