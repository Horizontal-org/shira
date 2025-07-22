import { StoryFn, Meta } from '@storybook/react';
import { useState, useRef } from 'react';
import styled from 'styled-components';
import { FiMoreVertical } from 'react-icons/fi';
import { BaseFloatingMenu } from './BaseFloatingMenu';
import { FiShare } from "react-icons/fi";

export default {
  title: 'Components/BaseFloatingMenu',
  component: BaseFloatingMenu,
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

      <BaseFloatingMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        elements={[
          {
            text: 'Upload from computer',
            onClick: () => { console.log('something') },
            icon: <FiShare />
          }
        ]}
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