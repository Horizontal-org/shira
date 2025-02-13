import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { styled } from 'styled-components';

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
    lastModified: {
      control: 'text',
      description: 'Last modified timestamp'
    },
    isPublished: {
      control: 'boolean',
      description: 'Whether the content is published'
    },
    onTogglePublished: {
      description: 'Callback when publish state is toggled'
    },
    onCopyUrl: {
      description: 'Callback when copy URL button is clicked'
    },
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
    lastModified: '1 hour ago',
    isPublished: true,
    onTogglePublished: () => console.log('Toggle published'),
    onCopyUrl: () => console.log('Copy URL clicked'),
    onEdit: () => console.log(''),
    onDelete: () => console.log('')
  }
};

// Unpublished state
export const Unpublished: Story = {
  args: {
    ...Default.args,
    isPublished: false,
  }
};

// Long title
export const LongTitle: Story = {
  args: {
    ...Default.args,
    title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  }
};

// Different timestamp
export const DifferentTimestamp: Story = {
  args: {
    ...Default.args,
    lastModified: '2 days ago'
  }
};

// Interactive example
export const Interactive: Story = {
  args: {
    ...Default.args,
    onTogglePublished: () => alert('Publish state toggled'),
    onCopyUrl: () => alert('URL copied to clipboard'),
  }
};