import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { styled } from 'styled-components';
import { Body4 } from '../Typography';
import { FiEye, FiTrash2 } from 'react-icons/fi';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the card'
    },
    onClick: {
      description: 'Callback when click the whole card'
    }
  },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    )
  ]
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Container to control width of card in stories
const Container = styled.div`
  width: 400px;
`;

// Default state
export const Default: Story = {
  args: {
    title: 'Email quiz for activists',
    headerContent: <Body4>Header content</Body4>,
    bodyContent: <Body4>Body content</Body4>,
    footerContent: <Body4>Footer content</Body4>,
    onClick: () => console.log('clicked card'),
  }
};

export const WithMenu: Story = {
  args: {
    ...Default.args,
    menuItems: [
      { text: 'View', onClick: () => console.log('View'), icon: <FiEye />, size: 18 },
      { text: 'Delete', onClick: () => console.log('Delete'), icon: <FiTrash2 size={20} /> },
    ],
  }
};

export const LongTitle: Story = {
  args: {
    ...Default.args,
    title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  }
};

export const HoverAction: Story = {
  args: {
    ...Default.args,
    hoverAction: <button type="button">Action</button>,
  }
};
