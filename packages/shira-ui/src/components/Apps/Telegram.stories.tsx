import { Meta, StoryObj } from '@storybook/react';

import Telegram from '../../components/Apps/Telegram';
import styled from 'styled-components';

export default {
  title: 'Apps/Telegram',
  component: Telegram,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '800px' }}>
        <Story />
      </div>
    ),
  ]
} as Meta<typeof Telegram>;

type Story = StoryObj<typeof Telegram>

export const Default: Story = {
  args: {
    phone: {
      textContent: '+353 87 123 4567',
      explanationPosition: null
    },
    content: new DOMParser().parseFromString(`<div id='content'><div data-position=1 id=component-text-1 ><p>test test</p></div><div data-position=2 id=component-text-2 ><p>perdon, necesitba ver un chat de telegram jeje</p></div><img data-position=3 id=component-image-3 alt=INCIDENT1.png src=https://placehold.co/600x400 /><div data-position=4 id=component-attachment-4 data-attachment-type=document>Comprobante de transferencia (7).pdf</div><div data-position=5 id=component-attachment-5 data-attachment-type=audio>freesound_community-ding-101492.mp3</div></div>`, 'text/html').getElementById('content'),
    explanationNumber: 0,
    explanations: []
  },
};

export const LongText: Story = {
  args: {
    phone: {
      textContent: '+353 87 123 4567',
      explanationPosition: null
    },
    content: new DOMParser().parseFromString(`<div id='content'><div data-position=1 id=component-text-1 ><p>Hello Dear, National Youth Empowerment Funding Application Form 2022 online for registration exercise which is the quickest to apply for is now out for all bonafide citizens only who needs helping hands in their various Business and Education</p></div><div data-position=2 id=component-text-2 ><p><a href='https://wearehorizontal.org' target='_blank'>https://tinylink.io/2022YouthEmpowering</a></p></div></div>`, 'text/html').getElementById('content'),
    explanationNumber: 0,
    explanations: []
  },
};

const Overlay = styled.div`
  position: absolute;
  top: 0;
  inset-inline-start: 0;
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

const WithExplanationsTemplate = (args: any) => {
  return (
    <Wrapper>
      <Telegram
        {...args}
      />
      {args.showExplanations && (<Overlay />)}
    </Wrapper>
  );
};

export const WithPhoneExplanation: Story = {
  render: WithExplanationsTemplate,
  args: {
    phone: {
      textContent: '+353 87 123 4567',
      explanationPosition: '1'
    },
    content: new DOMParser().parseFromString(`<div id='content'><div data-position=1 id=component-text-1 ><p>test test</p></div></div>`, 'text/html').getElementById('content'),
    explanationNumber: 1,
    showExplanations: true,
    explanations: [{
      index: "1",
      position: "1",
      text: "qsdqsdqsdqsd"
    }]
  },
}
