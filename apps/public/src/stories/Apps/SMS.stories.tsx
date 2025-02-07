import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

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
} as ComponentMeta<typeof SMS>;

const Template: ComponentStory<typeof SMS> = (args) => <SMS {...args} />;

export const SMSDefault = Template.bind({})
SMSDefault.args = {
  phone: '+5491131312222',
  content: new DOMParser().parseFromString(
    '<div data-position="1" id="component-text-2"><h2>Text</h2><p>Body</p></div>',
    'text/html'
  ),
  explanationNumber: 0,
  explanations: []
}