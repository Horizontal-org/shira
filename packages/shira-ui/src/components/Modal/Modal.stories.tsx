import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { useState } from 'react';
import { Button } from '../Button';
import { Body1 } from '../Typography';
import { TextInput } from '../TextInput';
import styled from 'styled-components';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls if the modal is visible'
    },
    title: {
      control: 'text',
      description: 'Modal title text'
    },
    primaryButtonText: {
      control: 'text',
      description: 'Text for the primary button'
    },
    secondaryButtonText: {
      control: 'text',
      description: 'Text for the secondary button'
    },
    onPrimaryClick: {
      action: 'primary clicked',
      description: 'Handler for primary button click'
    },
    onSecondaryClick: {
      action: 'secondary clicked',
      description: 'Handler for secondary button click'
    }
  }
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const ModalWrapper = styled.div`
  padding: 16px;
  // Ensures modal trigger button doesn't take too much space in Storybook
  width: 200px;
`;

// Template for interactive demos
const InteractiveModalTemplate = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalWrapper>
      <Button
        text="Open Modal"
        type="primary"
        onClick={() => setIsOpen(true)}
      />
      <Modal
        {...args}
        isOpen={isOpen}
        onPrimaryClick={() => setIsOpen(false)}
        onSecondaryClick={() => setIsOpen(false)}
      />
    </ModalWrapper>
  );
};

// Basic confirmation modal
export const DeleteConfirmation: Story = {
  render: InteractiveModalTemplate,
  args: {
    isOpen: true,
    title: 'Are you sure you want to delete “Email quiz for activists?” ',
    primaryButtonText: 'Delete',
    secondaryButtonText: 'Cancel',
    children: (
      <Body1>
        Deleting this quiz is permanent and cannot be undone.
      </Body1>
    ),
    onPrimaryClick: () => {},
    onSecondaryClick: () => {}
  }
};

// Form modal
const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormModal: Story = {
  render: InteractiveModalTemplate,
  args: {
    isOpen: true,
    title: 'Give a name to your new quiz',
    primaryButtonText: 'Create new quiz',
    secondaryButtonText: 'Cancel',
    children: (
      <FormContent>
        <TextInput
          label="Quiz name"
          value=""
          onChange={() => {}}
        />
      </FormContent>
    ),
    onPrimaryClick: () => {},
    onSecondaryClick: () => {}
  }
};

// Mobile view
export const MobileView: Story = {
  render: InteractiveModalTemplate,
  args: {
    ...DeleteConfirmation.args
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};