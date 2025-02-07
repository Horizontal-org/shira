import React from 'react';
import { styled } from '@horizontal-org/shira-ui'
import { ComponentStory, ComponentMeta } from '@storybook/react';

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
} as ComponentMeta<typeof FBMessenger>;

const Template: ComponentStory<typeof FBMessenger> = (args) => <FBMessenger {...args} />;

export const FBMessengerDefault = Template.bind({})
FBMessengerDefault.args = {
  fullname: 'Lionel Messi',
  content: new DOMParser().parseFromString(
    '<div id="dynamic-content"><div data-position="0" id="component-text-1"><h2>Text</h2><p>Body</p></div><div data-position="0" id="component-text-2"><h2>Text1231</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam arcu ex, venenatis sed ultrices vitae, sollicitudin sit amet sapien. Phasellus molestie turpis nec urna porttitor bibendum. Aenean orci nisl, congue et diam eu, vestibulum mattis ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam in lorem sed lacus mollis bibendum. Nulla iaculis commodo tristique. Pellentesque at sapien fermentum, sollicitudin tortor a, pulvinar nisi. Maecenas quis gravida enim. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque massa odio, dapibus eu tincidunt scelerisque, aliquet non sem. Nam a ex odio. Etiam lacus odio, tristique eu ornare quis, iaculis quis lacus. Suspendisse vel molestie purus. Phasellus dignissim consectetur metus at facilisis.</p></div></div>',
    'text/html'
  ),
  explanationNumber: 0,
  explanations: []
}

const Wrapper = styled.div`
  height: 800px;
  overflow: hidden;

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    height: 96vh;
  }
`