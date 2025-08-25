import { Meta, StoryObj } from '@storybook/react';

import Whatsapp from '../../components/Apps/Whatsapp';
import styled from 'styled-components';

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
    content: new DOMParser().parseFromString(`<div id='content'><div data-position=1 id=component-text-1 ><p>11111</p></div><img data-position=2 id=component-image-2 alt=INCIDENT1.png src=https://placehold.co/600x400 /><div data-position=3 id=component-text-3 ><p>2222</p></div><img data-position=4 id=component-image-4 alt=INCIDENT1.png src=https://placehold.co/200x400 /></div>`, 'text/html').getElementById('content'),    
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
      <Whatsapp
        {...args}
      />
      { args.showExplanations && (<Overlay />)}
    </Wrapper>
  );
};

export const WithPhoneExplanation: Story = {
  render: WithExplanationsTemplate,
  args: {
    phone: {
      textContent: '+5491131312222',
      explanationPosition: '1'
    },
    content: new DOMParser().parseFromString(`<div id='content'><div data-position=1 id=component-text-1 ><p>11111</p></div><img data-position=2 id=component-image-2 alt=INCIDENT1.png src=https://placehold.co/600x400 /><div data-position=3 id=component-text-3 ><p>2222</p></div><img data-position=4 id=component-image-4 alt=INCIDENT1.png src=https://placehold.co/200x400 /></div>`, 'text/html').getElementById('content'),    
    explanationNumber: 1,
    showExplanations: true,
    explanations: [{
      index : "1",
      position: "1",
      text: "qsdqsdqsdqsd"
    }]
  },
}