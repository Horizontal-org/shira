import type { Meta, StoryObj } from '@storybook/react';
import { Tab } from './Tab';
import styled from 'styled-components';

const meta = {
  title: 'Components/Tab',
  component: Tab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: { 
      control: 'text',
      description: 'Text content of the tab'
    },
    onClick: {
      description: 'Function called when tab is clicked'
    }
  }
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof Tab>;

// Container to layout the tabs with separator
const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Separator = styled.span`
  color: ${props => props.theme.colors.dark.black};
  font-weight: 500;
`;

// Stories
export const Dashboard: Story = {
  args: {
    text: 'Dashboard',
    onClick: () => console.log('Dashboard clicked')
  }
};

export const NewStaffOnboarding: Story = {
  args: {
    text: 'New staff onboarding',
    onClick: () => console.log('New staff onboarding clicked')
  }
};

// Example showing multiple tabs with separator
export const TabGroup: Story = {
  render: () => (
    <Container>
      <Tab text="Dashboard" onClick={() => console.log('Dashboard clicked')} />
      <Separator>{'>'}</Separator>
      <Tab text="New staff onboarding" onClick={() => console.log('New staff onboarding clicked')} />
    </Container>
  )
};