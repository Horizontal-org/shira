import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Pill } from '../../components/UI/Pill';
import UnsureIcon from '../../components/UI/Icons/Unsure';
import { GlobalStyle } from '../../utils/storybook';

export default {
  title: 'UI/Pill',
  component: Pill,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div>
        <GlobalStyle />
        <Story />
      </div>
    ),
  ]
} as ComponentMeta<typeof Pill>;

const Template: ComponentStory<typeof Pill> = (args) => <Pill {...args} />;

export const Default = Template.bind({})

Default.args = {
  selected: false,
  label: 'Complicated',
  icon: <UnsureIcon />
}
