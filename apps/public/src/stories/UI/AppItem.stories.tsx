import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AppItem } from '../../components/UI/AppItem';
import { GlobalStyle } from '../../utils/storybook';

export default {
  title: 'UI/AppItem',
  component: AppItem,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600 }}>
        <GlobalStyle />
        <Story />
      </div>
    ),
  ]
} as ComponentMeta<typeof AppItem>;

const Template: ComponentStory<typeof AppItem> = (args) => <AppItem {...args} />;

export const Default = Template.bind({})

export const Selected = Template.bind({})

Default.args = {
  name: 'Gmail',
  selected: false
}

Selected.args = {
  name: 'Gmail',
  selected: true
}