import { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';

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
    senderName: {
      textContent: 'Fake name',
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