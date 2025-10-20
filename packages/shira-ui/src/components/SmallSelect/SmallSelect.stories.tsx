import { useState } from 'react';
import { styled } from 'styled-components';
import { SmallSelect, LanguageIcon } from '@shira/ui';
import type { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/SmallSelect',
  component: SmallSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Currently selected value.',
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
    placeholderLeftIcon: {
      control: false,
      description: 'Optional icon displayed on the left side.',
    },
  },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Container to control width in stories
const Container = styled.div`
  width: 400px;
`;

export const Default: Story = {
  args: {
    options: [
      { label: 'Español', labelEnglish: 'Spanish', value: 'es', leftIcon: <LanguageIcon /> },
      { label: 'English', labelEnglish: 'English', value: 'en', leftIcon: <LanguageIcon /> },
      { label: 'Français', labelEnglish: 'French', value: 'fr', leftIcon: <LanguageIcon /> },
    ],
    value: "1",
    onChange: () => { },
    initialPlaceholder: 'Language',
    placeholderLeftIcon: <LanguageIcon />,
  },
};

export const WithAutoselect: Story = {
  args: {
    ...Default.args,
    value: "1",
  },
};

export const OnlyTwoOptions: Story = {
  args: {
    ...Default.args,
    options: [
      { label: 'Español', labelEnglish: 'Spanish', value: 'es' },
      { label: 'English', labelEnglish: 'English', value: 'en' },
    ],
  },
};

export const CustomPlaceholder: Story = {
  args: {
    ...Default.args,
    initialPlaceholder: 'Select a language…',
  },
};

export const Interactive = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <SmallSelect
        value={selected}
        options={[
          { label: 'Español', labelEnglish: 'Spanish', value: 'es' },
          { label: 'English', labelEnglish: 'English', value: 'en' },
          { label: 'Français', labelEnglish: 'French', value: 'fr' },
        ]}
        initialPlaceholder="Language"
        placeholderLeftIcon={<LanguageIcon />}
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
