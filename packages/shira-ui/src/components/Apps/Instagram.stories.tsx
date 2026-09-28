import { Meta, StoryObj } from '@storybook/react';

import Instagram from '../../components/Apps/Instagram';

export default {
  title: 'Apps/Instagram',
  component: Instagram,
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
} as Meta<typeof Instagram>;

type Story = StoryObj<typeof Instagram>

export const Default: Story = {
  args: {
    senderName: {
      textContent: 'Fake name',
      explanationPosition: null
    },
    content: new DOMParser().parseFromString(`<div id='content'><div data-position=1 id=component-text-1 ><p>11111</p></div><div data-position=2 id=component-text-2 ><p>2222</p></div><img data-position=3 id=component-image-3 alt=INCIDENT1.png src=https://placehold.co/600x400 /><div data-position=4 id=component-text-4 ><p>3333</p></div></div>`, 'text/html').getElementById('content'),
    explanationNumber: 0,
    explanations: []
  },
};

export const Mobile: Story = {
  args: {
    ...Default.args
  },
  parameters: {
    layout: 'fullscreen'
  },
  globals: {
    viewport: { value: 'mobile2', isRotated: false }
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh' }}>
        <Story />
      </div>
    ),
  ]
};

export const LongLink: Story = {
  args: {
    senderName: {
      textContent: 'Fake name',
      explanationPosition: null
    },
    content: new DOMParser().parseFromString(`<div id='content'><div data-position=1 id=component-text-1 ><p><a href='https://wearehorizontal.org' target='_blank'>https://pay.bvnk.com/payout/0qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq</a></p></div><div data-position=2 id=component-text-2 ><p>2222</p></div></div>`, 'text/html').getElementById('content'),
    explanationNumber: 0,
    explanations: []
  },
};
