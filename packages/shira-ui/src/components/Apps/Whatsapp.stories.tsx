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
    content: new DOMParser().parseFromString(`<div id='content'><div data-position=1 id=component-text-1 ><p>11111</p></div><img data-position=2 id=component-image-2 alt=INCIDENT1.png src=https://placehold.co/600x400 /><div data-position=3 id=component-text-3 ><p>2222</p></div><img data-position=4 id=component-image-4 alt=INCIDENT1.png src=https://placehold.co/200x400 /></div>`, 'text/html').getElementById('content'),    
    explanationNumber: 0,
    explanations: []
  },
};
