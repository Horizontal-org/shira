import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TextInput } from '../../components/UI/TextInput';
import { GlobalStyle } from '../../utils/storybook';

export default {
  title: 'UI/TextInput',
  component: TextInput,
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
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = (args) => <TextInput {...args} />;

export const Default = Template.bind({})

Default.args = {
  placeholder: 'Placeholder',
}