import type { Meta } from '@storybook/react';
import { Form } from './Form';
import { Button } from '../Button';
import { TextInput } from '../TextInput';
import styled from 'styled-components';

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs']
};

export default meta;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const LoginContent = (
  <>
    <InputsContainer>
      <TextInput
        label="Email"
        value=""
        onChange={() => {}}
      />
      <TextInput
        type="password"
        label="Password"
        value=""
        onChange={() => {}}
      />
    </InputsContainer>
    <ButtonContainer>
      <Button 
        text="Log in"
        type="primary"
        onClick={() => {}}
      />
    </ButtonContainer>
  </>
);

export const Default = {
  args: {
    title: 'Log in',
    description: 'Log in to access your custom Shira space. If you have trouble logging in, contact us at contact@wearehorizontal.org',
    children: LoginContent
  }
};

export const WithoutDescription = {
  args: {
    title: 'Log in',
    children: LoginContent
  }
};

export const WithoutTitle = {
  args: {
    description: 'Please enter your login credentials below.',
    children: LoginContent
  }
};

export const ContentOnly = {
  args: {
    children: LoginContent
  }
};

const ContactContent = (
  <>
    <InputsContainer>
      <TextInput
        label="Name"
        value=""
        onChange={() => {}}
      />
      <TextInput
        label="Email"
        value=""
        onChange={() => {}}
      />
      <TextInput
        label="Message"
        value=""
        onChange={() => {}}
      />
    </InputsContainer>
    <ButtonContainer>
      <Button 
        text="Send Message"
        type="primary"
        onClick={() => {}}
      />
    </ButtonContainer>
  </>
);

export const ContactForm = {
  args: {
    title: 'Contact Us',
    description: 'Send us a message and we\'ll get back to you as soon as possible.',
    children: ContactContent
  }
};