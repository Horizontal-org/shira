import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import styled from 'styled-components';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'outline'],
      description: 'The visual style of the button',
      defaultValue: 'primary'
    },
    leftIcon: {
      control: 'boolean',
      description: 'Icon component to render on the left'
    },
    rightIcon: {
      control: 'boolean',
      description: 'Icon component to render on the right'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button interactions'
    },
    size: {
      control: 'select',
      options: ['default', 'lg'],
      description: 'Button size variant'
    },
    onClick: {
      action: 'clicked'
    }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: 'Primary Button',
    type: 'primary'
  }
};

export const Outline: Story = {
  args: {
    text: 'Outline Button',
    type: 'outline'
  }
};

// Icon examples
export const WithLeftIcon: Story = {
  args: {
    text: 'Back',
    leftIcon: <FiChevronLeft size={16} />,
    type: 'primary'
  }
};

export const WithRightIcon: Story = {
  args: {
    text: 'Next',
    rightIcon: <FiChevronRight size={16} />,
    type: 'primary'
  }
};

// State examples
export const Disabled: Story = {
  args: {
    text: 'Disabled Button',
    disabled: true,
    type: 'primary'
  }
};

// Example with longer content
export const LongText: Story = {
  args: {
    text: 'This is a button with longer text',
    type: 'primary'
  }
};

// Example with click handler
export const WithClickHandler: Story = {
  args: {
    text: 'Click me',
    type: 'primary',
    onClick: () => alert('Button clicked!')
  }
};

export const differentColor: Story = {
  args: {
    text: 'Click me',
    type: 'primary',
    onClick: () => alert('Button clicked!'),
    color: '#849D29'
  }
};

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const NavigationButtons: Story = {
  args: {
    text: 'Button',
    type: 'primary'
  },
  render: (args) => (
    <ButtonGroup>
      <Button 
        {...args}
        text="Back" 
        type="outline"
        leftIcon={<FiChevronLeft size={16} />}
      />
      <Button 
        {...args}
        text="Next" 
        type="primary"
        rightIcon={<FiChevronRight size={16} />}
      />
    </ButtonGroup>
  )
};