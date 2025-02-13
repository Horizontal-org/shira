import { StoryFn, Meta } from '@storybook/react';
import { FloatingMenu, FloatingMenuProps } from './FloatingMenu';
import { action } from '@storybook/addon-actions';
import { useState, useRef } from 'react';
import styled from 'styled-components';
import { FiMoreVertical } from 'react-icons/fi';
import { JSX } from 'react/jsx-runtime';

export default {
  title: 'Components/FloatingMenu',
  component: FloatingMenu,
  parameters: {
    layout: 'centered',
  },
} as Meta;

const DemoWrapper = styled.div`
  padding: 100px;
  position: relative;
`;

const DemoButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #5f6368;
  
  &:hover {
    color: #202124;
  }
`;

// Template for the interactive demo
const InteractiveTemplate: StoryFn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <DemoWrapper>
      <DemoButton 
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiMoreVertical size={20} />
      </DemoButton>

      <FloatingMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onEdit={() => {
          action('onEdit')();
          setIsOpen(false);
        }}
        onDelete={() => {
          action('onDelete')();
          setIsOpen(false);
        }}
        anchorEl={buttonRef.current}
      />
    </DemoWrapper>
  );
};

// Live demo story - lets users interact with the component
export const LiveDemo = InteractiveTemplate.bind({});
LiveDemo.parameters = {
  docs: {
    description: {
      story: 'Click the three dots icon to open the menu. The menu will close when clicking outside or selecting an option.',
    },
  },
};

// Open state story - shows menu in open state
const OpenTemplate: StoryFn<FloatingMenuProps> = (args: JSX.IntrinsicAttributes & FloatingMenuProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <DemoWrapper>
      <DemoButton ref={buttonRef}>
        <FiMoreVertical size={20} />
      </DemoButton>

      <FloatingMenu {...args} anchorEl={buttonRef.current} />
    </DemoWrapper>
  );
};

export const OpenState = OpenTemplate.bind({});
OpenState.args = {
  isOpen: true,
  onClose: action('onClose'),
  onEdit: action('onEdit'),
  onDelete: action('onDelete'),
};
OpenState.parameters = {
  docs: {
    description: {
      story: 'Menu in open state, showing all available options.',
    },
  },
};

// Closed state story - shows menu in closed state
export const ClosedState = OpenTemplate.bind({});
ClosedState.args = {
  isOpen: false,
  onClose: action('onClose'),
  onEdit: action('onEdit'),
  onDelete: action('onDelete'),
};
ClosedState.parameters = {
  docs: {
    description: {
      story: 'Menu in closed state.',
    },
  },
};