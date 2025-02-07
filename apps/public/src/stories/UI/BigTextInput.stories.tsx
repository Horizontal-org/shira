import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BigTextInput } from '../../components/UI/BigTextInput';
import { GlobalStyle } from '../../utils/storybook';

export default {
  title: 'UI/BigTextInput',
  component: BigTextInput,
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
} as ComponentMeta<typeof BigTextInput>;

const Template: ComponentStory<typeof BigTextInput> = (args) => <BigTextInput {...args} />;

export const Default = Template.bind({})

Default.args = {
  placeholder: 'Placeholder',
}