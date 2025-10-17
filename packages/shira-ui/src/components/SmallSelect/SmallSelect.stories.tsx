import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { styled } from 'styled-components';
import { SmallSelect } from './SmallSelect';

const meta = {
  title: 'Components/SmallSelect',
  component: SmallSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    autoselect: {
      control: 'boolean',
      description: 'If true, automatically selects the first option.',
    },
    options: {
      control: 'object',
      description: 'List of available options.',
    },
    onChange: {
      action: 'changed',
      description: 'Callback triggered with the selected value.',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no option is selected.',
    },
  },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof SmallSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

// Container to control width in stories
const Container = styled.div`
  width: 400px;
`;

export const Default: Story = {
  args: {
    autoselect: false,
    options: [
      { label: 'Español', labelEnglish: 'Spanish', value: 'es' },
      { label: 'English', labelEnglish: 'English', value: 'en' },
      { label: 'Français', labelEnglish: 'French', value: 'fr' },
    ],
    onChange: () => { },
    placeholder: 'Language',
  },
};

export const WithAutoselect: Story = {
  args: {
    ...Default.args,
    autoselect: true,
  },
};

export const OnlyTwoOptions: Story = {
  args: {
    ...Default.args,
    options: [
      { label: 'Español', labelEnglish: 'Spanish', value: 'es' },
      { label: 'English', labelEnglish: 'English', value: 'en' }
    ].slice(0, 2),
  },
};

export const CustomPlaceholder: Story = {
  args: {
    ...Default.args,
    placeholder: 'Select a language…',
  },
};

// Interactive example
export const Interactive = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <SmallSelect
        autoselect={false}
        options={[
          { label: 'Español', labelEnglish: 'Spanish', value: 'es' },
          { label: 'English', labelEnglish: 'English', value: 'en' },
          { label: 'Français', labelEnglish: 'French', value: 'fr' },
        ]}
        placeholder="Choose language"
        onChange={(val) => setSelected(val)}
      />
      <small>
        Selected: <b>{selected ?? '— (nothing selected yet)'}</b>
      </small>
    </div>
  );
};

export const EmptyOptions: Story = {
  args: {
    ...Default.args,
    options: [],
  },
};
