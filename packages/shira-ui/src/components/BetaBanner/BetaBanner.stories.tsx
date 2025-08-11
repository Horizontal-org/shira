import type { Meta, StoryObj } from '@storybook/react';
import { BetaBanner } from './BetaBanner';
import styled from 'styled-components';

const meta = {
  title: 'Components/BetaBanner',
  component: BetaBanner,
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
} satisfies Meta<typeof BetaBanner>;

export default meta;
type Story = StoryObj<typeof BetaBanner>;

// Default toggle with label
export const Default: Story = {
  args: {
    url: 'https://shira.app'
  },
};


const Wrapper = styled.div`
  width: 100%;
`