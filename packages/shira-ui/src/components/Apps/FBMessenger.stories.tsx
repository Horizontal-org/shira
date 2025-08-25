import styled from 'styled-components';
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
    senderName: {
      textContent: 'Lionel Messi',
      explanationPosition: null
    },
    content: new DOMParser().parseFromString(`<div id='content'><div data-position=1 id=component-text-1 ><p>11111</p></div><img data-position=2 id=component-image-2 alt=INCIDENT1.png src=https://placehold.co/600x400 /><div data-position=3 id=component-text-3 ><p>2222</p></div><img data-position=4 id=component-image-4 alt=INCIDENT1.png src=https://placehold.co/200x400 /></div>`, 'text/html').getElementById('content'),
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