import type { Meta, StoryObj } from '@storybook/react';
import { Box } from './Box';
import { SubHeading1, Body1, } from '../Typography';
import { Button } from '../Button';
import { TextInput } from '../TextInput';

const meta = {
  title: 'Components/Box',
  component: Box,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    padding: {
      control: 'select',
      options: ['large', 'default', 'small'],
      description: 'Controls the internal padding of the box'
    }
  }
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof Box>;

const FormExample = () => {
  return (
    <>
      <SubHeading1>Login to your account</SubHeading1>
      <Body1>
        Enter your email and password to access your dashboard. If you need help, 
        please contact support.
      </Body1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <TextInput
          label="Email"
          value="test@wearehorizontal.org"
          onChange={() => {}}
        />
        <TextInput
          type="password"
          label="Password"
          value=""
          onChange={() => {}}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          text="Submit"
          type="primary"
          onClick={() => console.log('Submit clicked')}
        />
      </div>
    </>
  );
};

// Default view with form layout
export const Default: Story = {
  args: {
    children: <FormExample />,
    padding: 'large'
  }
};
