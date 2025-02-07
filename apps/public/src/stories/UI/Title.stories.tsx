import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GlobalStyle } from '../../utils/storybook';
import { Title } from '../../components/UI/Title';

export default {
  title: 'UI/Title',
  component: Title,
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
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = (args) => <Title {...args} />;

export const Default = Template.bind({})

Default.args = {
  children: "Title"
}