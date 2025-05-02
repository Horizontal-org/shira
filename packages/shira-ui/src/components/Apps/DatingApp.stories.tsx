import { Meta, StoryObj } from '@storybook/react';
import { styled } from '@shira/ui'

import DatingApp from '../../components/Apps/DatingApp';

export default {
  title: 'Apps/DatingApp',
  component: DatingApp,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <Wrapper>
        <Story />
      </Wrapper>
    ),
  ]
} as Meta<typeof DatingApp>;

type Story = StoryObj<typeof DatingApp>

export const Default: Story = {
  args: {
    phone: {
      textContent: 'Fake name',
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