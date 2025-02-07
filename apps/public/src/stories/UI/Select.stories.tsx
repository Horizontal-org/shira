import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GlobalStyle } from '../../utils/storybook';
import { LanguageSelect } from '../../components/UI/Select';

export default {
  title: 'UI/Select',
  component: LanguageSelect,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '800px' }}>
        <GlobalStyle />
        <Story />
      </div>
    ),
  ]
} as ComponentMeta<typeof LanguageSelect>;

const Template: ComponentStory<typeof LanguageSelect> = (args) => <LanguageSelect {...args} />;

export const Default = Template.bind({})
Default.args = {
  autoselect: true,
  options: [
    {
      value: 'op1',
      label: 'Option 1'
    },
    {
      value: 'op2',
      label: 'Option 2'
    },
    {
      value: 'op3',
      label: 'Option 3'
    },
  ]
}