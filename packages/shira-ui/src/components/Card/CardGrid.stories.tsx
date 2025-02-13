import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import styled from 'styled-components';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding: 24px;
  max-width: 1000px;
  margin: 0 auto;
`;

// Sample data for the cards
const cardData = [
  {
    title: 'Short Title',
    lastModified: '2 days ago',
    isPublished: true,
  },
  {
    title: 'Medium Length Title That Fits Well',
    lastModified: '5 days ago',
    isPublished: false,
  },
  {
    title: 'Very Long Title That Should Truncate Because It Exceeds The Maximum Width Available',
    lastModified: '1 week ago',
    isPublished: true,
  },
  {
    title: 'Another Short One',
    lastModified: '2 weeks ago',
    isPublished: false,
  },
  {
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    lastModified: '3 weeks ago',
    isPublished: true,
  },
  {
    title: 'Card Title 6',
    lastModified: '1 month ago',
    isPublished: false,
  },
  {
    title: 'This is a test of a longer title that might need to wrap to multiple lines',
    lastModified: '2 months ago',
    isPublished: true,
  },
  {
    title: 'Card Title 8',
    lastModified: '3 months ago',
    isPublished: false,
  },
  {
    title: 'Final Card With A Rather Long Title To Test Truncation',
    lastModified: '4 months ago',
    isPublished: true,
  },
];

export const GridLayout: Story = {
    args: {
      title: "Default Title",
      lastModified: "2 days ago",
      isPublished: true,
      onTogglePublished: () => console.log('Toggle published'),
      onCopyUrl: () => console.log('Copy URL'),
      onEdit: () => console.log('edit'),
      onDelete: () => console.log('delete')
    },
    render: function Story() {
      return (
        <Grid>
          {cardData.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              lastModified={card.lastModified}
              isPublished={card.isPublished}
              onTogglePublished={() => console.log('Toggle published for card', index)}
              onCopyUrl={() => console.log('Copy URL for card', index)}
              onEdit={() => console.log('on edit')}
              onDelete={() => console.log('on delete')}
            />
          ))}
        </Grid>
      );
    }
  };