import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DatingApp from '../../components/Apps/DatingApp';

export default {
  title: 'Apps/DatingApp',
  component: DatingApp,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ]
} as ComponentMeta<typeof DatingApp>;

const Template: ComponentStory<typeof DatingApp> = (args) => <DatingApp {...args} />;

export const DatingAppDefault = Template.bind({})
DatingAppDefault.args = {
  phone: {
    textContent: 'Fake Name'
  },
  content: new DOMParser().parseFromString(
    '<div data-position="1" id="component-text-2"><h2>Text</h2><p>Body</p></div>',
    'text/html'
  ),
  explanationNumber: 0,
  explanations: []
}