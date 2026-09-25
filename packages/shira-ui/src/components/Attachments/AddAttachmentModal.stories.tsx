import type { Meta, StoryObj } from '@storybook/react';
import { AddAttachmentModal } from './AddAttachmentModal';
import { useState } from 'react';
import { AttachmentType } from './Attachment';

const meta = {
  title: 'Components/AddAttachmentModal',
  component: AddAttachmentModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fileName: { 
      control: 'text',
      description: 'The name of the file'
    },
    titleLabel: { 
      control: 'text',
      description: 'The title of the modal'
    },
    fileTypeExplanation: {
      control: 'text',
      description: 'Explanation about how to use file types'
    },
    handleFileName: { 
      action: 'fileName changed',
      description: 'Handler for when the file name changes'
    },
    fileType: {
      control: 'select',
      options: ['Image', 'Video', 'Audio', 'Document', 'Other'],
      description: 'The type of the file'
    },
    handleFileType: {
      action: 'fileType changed',
      description: 'Handler for when the file type changes'
    },
    isOpen: {
      control: 'boolean',
      description: 'Whether the attachment modal is open'
    },
    onClose: {
      action: 'modal closed',
      description: 'Handler for when the modal is closed'
    },
    onSave: {
      action: 'attachment saved',
      description: 'Handler for when the attachment is saved'
    }
  },
} satisfies Meta<typeof AddAttachmentModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default state with fixed props
export const Default: Story = {
  args: {
    fileName: 'Document.pdf',
    titleLabel: 'Add attachment',
    fileTypeExplanation: "Selecting the correct file type lets Shira display a realistic attachment icon in the quiz. For added realism, consider including a file extension in the filename (for example, .pdf or .zip).",
    handleFileName: () => {},
    fileType: AttachmentType.document,
    handleFileType: () => {},
    isOpen: true,
    onClose: () => {},
    onSave: () => {}
  },
};

// Interactive component with useState
const InteractiveAttachment = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fileName, setFileName] = useState('My Attachment');
  const [fileType, setFileType] = useState( AttachmentType.document);
  
  return (
    <div>
      <button onClick={() => setIsOpen(true)} style={{ marginBottom: '20px' }}>
        Open Attachment Modal
      </button>
      
      <AddAttachmentModal 
        fileName={fileName} 
        handleFileName={setFileName}
        fileType={fileType}
        handleFileType={setFileType}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={() => console.log('Saved:', { fileName, fileType })}
      />
    </div>
  );
};

export const Interactive: Story = {
  args: {
    fileName: 'My Attachment',
    titleLabel: 'Add attachment',
    fileTypeExplanation: "Selecting the correct file type lets Shira display a realistic attachment icon in the quiz. For added realism, consider including a file extension in the filename (for example, .pdf or .zip).",
    handleFileName: () => {},
    fileType:  AttachmentType.document,
    handleFileType: () => {},
    isOpen: true,
    onClose: () => {},
    onSave: () => {}
  },
  render: () => <InteractiveAttachment />
};

// Empty state
export const EmptyFileName: Story = {
  args: {
    fileName: '',
    titleLabel: 'Add attachment',
    handleFileName: () => {},
    fileType:  AttachmentType.document,
    handleFileType: () => {},
    isOpen: true,
    onClose: () => {},
    onSave: () => {}
  },
};

// Different file types
export const DifferentFileTypes: Story = {
  args: {
    fileName: 'Example',
    titleLabel: 'Add attachment',
    fileTypeExplanation: "Selecting the correct file type lets Shira display a realistic attachment icon in the quiz. For added realism, consider including a file extension in the filename (for example, .pdf or .zip).",
    handleFileName: () => {},
    fileType:  AttachmentType.image,
    handleFileType: () => {},
    isOpen: true,
    onClose: () => {},
    onSave: () => {}
  },
};
