import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FeedbackBox } from '../../components/UI/FeedbackBox';
import { GlobalStyle } from '../../utils/storybook';
import { FiChevronRight } from 'react-icons/fi'

export default {
  title: 'UI/FeedbackBox',
  component: FeedbackBox,
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
} as ComponentMeta<typeof FeedbackBox>;

const Template: ComponentStory<typeof FeedbackBox> = (args) => <FeedbackBox {...args} />;

export const Default = Template.bind({})

Default.args = {
  easyness: 'complicated',
  recommend: 'very-easy',
  improve: '',
  onEasyness: () => {},
  onRecommend: () => {},
  onImprove: () => {}
}
