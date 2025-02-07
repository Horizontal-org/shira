import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { WorkFieldItem } from '../../components/UI/WorkFieldItem';
import { GlobalStyle } from '../../utils/storybook';

export default {
  title: 'UI/WorkFieldItem',
  component: WorkFieldItem,
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
} as ComponentMeta<typeof WorkFieldItem>;

const Template: ComponentStory<typeof WorkFieldItem> = (args) => <WorkFieldItem {...args} />;

export const Default = Template.bind({})

export const Selected = Template.bind({})

Default.args = {
  name: 'Human resources',
  slug: 'human-resources',
  selected: false
}

Selected.args = {
  name: 'Human resources',
  slug: 'human-resources',
  selected: true
}