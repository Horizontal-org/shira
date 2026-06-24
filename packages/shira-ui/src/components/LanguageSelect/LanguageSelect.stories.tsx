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
      { label: 'English', value: 'en', labelEnglish: 'English' },
      { label: 'Español', value: 'es', labelEnglish: 'Spanish' },
      { label: 'Français', value: 'fr', labelEnglish: 'French' },
      { label: 'Deutsch', value: 'de', labelEnglish: 'German' },
    ]
  }
};

export const AlternativeStyling: Story = {
  args: {
    onChange: (value) => console.log('Selected language:', value),
    autoselect: true,
    alternativeStyling: true,
    options: [
      { label: 'English', value: 'en', labelEnglish: 'English' },
      { label: 'Español', value: 'es', labelEnglish: 'Spanish' },
      { label: 'Français', value: 'fr', labelEnglish: 'French' },
      { label: 'Deutsch', value: 'de', labelEnglish: 'German' },
    ]
  }
};