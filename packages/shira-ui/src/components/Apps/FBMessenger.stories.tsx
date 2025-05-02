import { styled } from '@shira/ui'
import { Meta, StoryObj } from '@storybook/react';

import FBMessenger from '../../components/Apps/FBMessenger';

export default {
  title: 'Apps/FBMessenger',
  component: FBMessenger,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <Wrapper>
        <Story />
      </Wrapper>
    ),
  ]
} as Meta<typeof FBMessenger>;

type Story = StoryObj<typeof FBMessenger>

export const Default: Story = {
  args: {
    fullname: {
      textContent: 'Lionel Messi',
      explanationPosition: null
    },
    content: document.createElement('div'),
    explanationNumber: 0,
    explanations: []
  },
};
const Wrapper = styled.div`
  height: 800px;
  overflow: hidden;

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    height: 96vh;
  }
`