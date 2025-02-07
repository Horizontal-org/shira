import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Tooltip from '../../components/UI/Tooltip';
import { GlobalStyle } from '../../utils/storybook';

export default {
  title: 'UI/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600, backgroundColor: '#111111' }}>
        <GlobalStyle />
        <Story />
      </div>
    ),
  ]
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => <Tooltip {...args} />;

export const Default = Template.bind({})

Default.args = {
  position: '20',
  text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo at aperiam quis cupiditate corrupti ipsa amet sit voluptatem autem porro est in quos laboriosam praesentium, repellendus labore iure cum necessitatibus?',
  hide: false
}