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
      description: 'Optional icon displayed when showing the placeholder.',
    },
    fixedLeftIcon: {
      control: false,
      description: 'Icon always displayed at the left, regardless of selection.',
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
    value: null,
    onChange: () => { },
    initialPlaceholder: 'Language',
    placeholderLeftIcon: <LanguageIcon />,
  },
};

export const WithValue: Story = {
  args: {
    ...Default.args,
    value: 'en',
  },
};

export const OnlyTwoOptions: Story = {
  args: {
    ...Default.args,
    options: [
      { label: 'Español', labelEnglish: 'Spanish', value: 'es', leftIcon: <LanguageIcon /> },
      { label: 'English', labelEnglish: 'English', value: 'en', leftIcon: <LanguageIcon /> },
      { label: 'Français', labelEnglish: 'French', value: 'fr', leftIcon: <LanguageIcon /> },
    ].slice(0, 2),
  },
};

export const CustomPlaceholder: Story = {
  args: {
    ...Default.args,
    initialPlaceholder: 'Language',
  },
};

export const WithFixedLeftIcon: Story = {
  args: {
    ...Default.args,
    fixedLeftIcon: <LanguageIcon />,
  },
};

export const EmptyOptions: Story = {
  args: {
    ...Default.args,
    options: [],
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<string | undefined>(undefined);

    return (
      <div style={{ display: 'grid', gap: 12 }}>
        <SmallSelect
          {...args}
          options={[
            { label: 'Español', labelEnglish: 'Spanish', value: 'es', leftIcon: <LanguageIcon /> },
            { label: 'English', labelEnglish: 'English', value: 'en', leftIcon: <LanguageIcon /> },
            { label: 'Français', labelEnglish: 'French', value: 'fr', leftIcon: <LanguageIcon /> },
          ]}
          value={selected}
          onChange={setSelected}
        />
        <small>
          Selected: <b>{selected ?? '— (nothing selected yet)'}</b>
        </small>
      </div>
    );
  },
  args: {
    ...Default.args,
  },
};