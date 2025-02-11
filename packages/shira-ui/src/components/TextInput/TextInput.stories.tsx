import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './TextInput';
import { useState } from 'react';

const meta = {
  title: 'Components/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text displayed when input is empty',
    },
    value: {
      control: 'text',
      description: 'Current value of the input',
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when the input value changes'
    },
    type: {
      control: 'select',
      options: ['text', 'password'],
      description: 'Type of input (text or password)',
    }
  }
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const InputTemplate = (args: any) => {
    const [value, setValue] = useState(args.value || '');
    return (
      <TextInput
        {...args}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          args.onChange?.(e);
        }}
      />
    );
};

export const Default: Story = {
    render: InputTemplate,
    args: {
      placeholder: 'Enter text...',
      label: 'Label',
      value: "",
      onChange: () => {}
    }
  };
  
  export const WithValue: Story = {
    render: InputTemplate,
    args: {
      placeholder: 'Enter text...',
      value: 'Initial value',
      label: 'Label',
      onChange: () => {}
    }
  };
  
  export const Disabled: Story = {
    render: InputTemplate,
    args: {
      placeholder: 'Enter text...',
      disabled: true,
      label: 'Label',
      onChange: () => {},
      value: ""
    }
  };
  
  // Different use cases
  export const EmailInput: Story = {
    render: InputTemplate,
    args: {
      placeholder: 'Enter your email address',
      label: 'Email',
      value: "",
      onChange: () => {}
    }
  };
  
  export const SearchInput: Story = {
    render: InputTemplate,
    args: {
      placeholder: 'Search...',
      label: 'Search',
      value: "",
      onChange: () => {}
    }
  };
  
  export const UsernameInput: Story = {
    render: InputTemplate,
    args: {
      placeholder: '@username',
      label: 'Username',
      value: "",
      onChange: () => {}
    }
  };
  
  //Password
  export const Password: Story = {
    render: InputTemplate,
    args: {
      type: 'password',
      placeholder: 'Enter password...',
      label: 'Password',
      value: '',
      onChange: () => {}
    }
  };
  
  export const PasswordWithValue: Story = {
    render: InputTemplate,
    args: {
      type: 'password',
      placeholder: 'Enter password...',
      label: 'Password',
      value: 'mySecretPassword123',
      onChange: () => {}
    }
  };
  
  export const DisabledPassword: Story = {
    render: InputTemplate,
    args: {
      type: 'password',
      placeholder: 'Enter password...',
      label: 'Password',
      value: 'mySecretPassword123',
      disabled: true,
      onChange: () => {}
    }
  };

  // Edge cases
  export const LongPlaceholder: Story = {
    render: InputTemplate,
    args: {
      placeholder: 'This is a very long placeholder text to demonstrate text overflow behavior',
      label: 'Long Placeholder Example',
      value: "",
      onChange: () => {}
    }
  };
  
  export const LongValue: Story = {
    render: InputTemplate,
    args: {
      placeholder: 'Enter text...',
      value: 'This is a very long input value to demonstrate how the component handles long content',
      label: 'Long Value Example',
      onChange: () => {}
    }
  };
  
  // Without Label
  export const NoLabel: Story = {
    render: InputTemplate,
    args: {
      placeholder: 'Enter text without label...',
      value: "",
      onChange: () => {}
    }
  };