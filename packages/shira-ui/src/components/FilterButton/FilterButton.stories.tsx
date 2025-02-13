import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FilterButton } from './FilterButton';

const meta = {
  title: 'Components/FilterButton',
  component: FilterButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: { 
      control: 'text',
      description: 'Button text content'
    },
    handleFilter: {
      action: 'filtered',
      description: 'Filter handler function'
    },
    isActive: {
      control: 'boolean',
      description: 'Whether the filter is currently active'
    }
  }
} satisfies Meta<typeof FilterButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'All quizzes',
    isActive: false,
    handleFilter: () => {}
  },
};

export const Active: Story = {
  args: {
    text: 'All quizzes',
    isActive: true,
    handleFilter: () => {}
  },
};

export const FilterGroup = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'published' | 'unpublished'>('all');

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <FilterButton 
        text="All quizzes" 
        isActive={activeFilter === 'all'}
        handleFilter={() => setActiveFilter('all')}
      />
      <FilterButton 
        text="Published" 
        isActive={activeFilter === 'published'}
        handleFilter={() => setActiveFilter('published')}
      />
      <FilterButton 
        text="Unpublished" 
        isActive={activeFilter === 'unpublished'}
        handleFilter={() => setActiveFilter('unpublished')}
      />
    </div>
  );
};