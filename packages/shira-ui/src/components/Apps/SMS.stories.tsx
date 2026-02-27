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
    content: new DOMParser().parseFromString(`<div id='content'><div data-position=1 id=component-text-1 ><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id odio fringilla, maximus enim nec, congue ligula. Donec nec magna sem. Mauris eleifend sit amet magna eget sagittis. Sed fringilla ultricies felis, quis maximus libero volutpat nec. Donec eget nibh et mi tempor convallis. Maecenas consequat eros sem, vitae lacinia risus congue ac. Curabitur mollis et ipsum a posuere.</p></div><img data-position=2 id=component-image-2 alt=INCIDENT1.png src=https://placehold.co/600x400 /><div data-position=3 id=component-text-3 ><p>2222</p></div><img data-position=4 id=component-image-4 alt=INCIDENT1.png src=https://placehold.co/200x400 /></div>`, 'text/html').getElementById('content'),
    explanationNumber: 0,
    explanations: []
  },
};