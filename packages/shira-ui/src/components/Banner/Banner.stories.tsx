import type { Meta, StoryObj } from '@storybook/react';
import { Banner } from './Banner';
import styled from 'styled-components';

const meta = {
  title: 'Components/Banner',
  component: Banner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    url: {
      description: 'Url to go when click here'
    },    
  },
  decorators: [
    (Story) => (
      <Wrapper>
        <Story />
      </Wrapper>
    )
  ]
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof Banner>;

// Default toggle with label
export const BetaBanner: Story = {
  args: {
    url: 'https://shira.app',
    label: 'BETA',
    message: 'Shira is still in development and you may experience issues.',
    clickHereText: 'Click here',
    feedbackText: 'to share your feedback and read about what’s next for Shira!',
    brand: 'secondary'
  },
};

export const MobileResponsiveBanner: Story = {
  args: {
      label: 'NOTE',
      message: 'Shira spaces is not yet available on smaller screens. For a better experience, please access spaces using a screen wider than 800px.',      
      brand: 'primary'
  }
}

const Wrapper = styled.div`
  width: 100%;
`