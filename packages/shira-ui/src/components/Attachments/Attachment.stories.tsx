import type { Meta, StoryObj } from '@storybook/react';
import { Attachment, AttachmentType } from './Attachment';

const meta = {
  title: 'Components/Attachment',
  component: Attachment,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Name of the attachment file',
    },
    type: {
      control: 'select',
      options: [
        AttachmentType.image,
        AttachmentType.video,
        AttachmentType.audio,
        AttachmentType.document,
        AttachmentType.other
      ],
      description: 'Type of the attachment',
    },
    active: {
      control: 'boolean',
      description: 'Whether the attachment explanation is active',
    }
  },
  args: {},
} satisfies Meta<typeof Attachment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'document.pdf',
    type: AttachmentType.document,
  },
};

export const ImageAttachment: Story = {
  args: {
    name: 'screenshot.png',
    type: AttachmentType.image,
  },
};

export const VideoAttachment: Story = {
  args: {
    name: 'presentation.mp4',
    type: AttachmentType.video,
  },
};

export const OtherAttachment: Story = {
  args: {
    name: 'Android music file.a...',
    type: AttachmentType.other,
  },
};

export const AudioAttachment: Story = {
  args: {
    name: 'recording.mp3',
    type: AttachmentType.audio,
  },
};

export const LongFilename: Story = {
  args: {
    name: 'very-long-filename-that-might-need-truncation-in-the-ui-component.pdf',
    type: AttachmentType.document,
  },
};

export const ExplanationActive: Story = {
  args: {
    name: 'nuclear_codes.pdf',
    type: AttachmentType.document,
    active: true
  },
};

// Interactive component for testing menu functionality
export const InteractiveMenu = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      <Attachment
        name="interactive-example.pdf"
        type={AttachmentType.document}
      />
    </div>
  );
};

InteractiveMenu.parameters = {
  docs: {
    description: {
      story: 'This example demonstrates interactive menu functionality with the delete option.',
    },
  },
};