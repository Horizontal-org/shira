import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

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
} as ComponentMeta<typeof Whatsapp>;

const Template: ComponentStory<typeof Whatsapp> = (args) => <Whatsapp {...args} />;

export const WhatsappDefault = Template.bind({})
WhatsappDefault.args = {
  phone: '+5491131312222',
  content: new DOMParser().parseFromString(
    '<div id="dynamic-content"><div data-position="0" id="component-text-1"><h2>Text</h2><p>Body</p></div><div data-position="0" id="component-text-2"><h2>Text1231</h2><p>Body</p></div></div>',
    'text/html'
  ),
  explanationNumber: 0,
  explanations: []
}
