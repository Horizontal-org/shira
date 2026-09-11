import type { Meta, StoryObj } from '@storybook/react';
import { LanguageSelect } from './LanguageSelect';
const meta = {
  title: 'Components/LanguageSelect',
  component: LanguageSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {

  }
} satisfies Meta<typeof LanguageSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onChange: (value) => console.log('Selected language:', value),
    autoselect: true,
    options: [
      { label: 'English', value: 'en', nativeLabel: 'English' },
      { label: 'Spanish', value: 'es', nativeLabel: 'Español' },
      { label: 'French', value: 'fr', nativeLabel: 'Français' },
      { label: 'German', value: 'de', nativeLabel: 'Deutsch' },
    ]
  }
};

export const AlternativeStyling: Story = {
  args: {
    onChange: (value) => console.log('Selected language:', value),
    autoselect: true,
    alternativeStyling: true,
    options: [
      { label: 'English', value: 'en', nativeLabel: 'English' },
      { label: 'Spanish', value: 'es', nativeLabel: 'Español' },
      { label: 'French', value: 'fr', nativeLabel: 'Français' },
      { label: 'German', value: 'de', nativeLabel: 'Deutsch' },
    ]
  }
};
