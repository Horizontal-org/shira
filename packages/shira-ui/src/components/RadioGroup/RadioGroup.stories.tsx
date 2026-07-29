import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup } from './RadioGroup'

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Name shared by the radio inputs in the group.',
    },
    legend: {
      control: 'text',
      description: 'Optional legend displayed above the options.',
    },
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
    disabled: {
      control: 'boolean',
      description: 'Disables every option in the group.',
    },
    required: {
      control: 'boolean',
      description: 'Marks the legend as required.',
    },
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

const options = [
  { value: 'option-1', label: 'Option 1' },
  { value: 'option-2', label: 'Option 2' },
  { value: 'option-3', label: 'Option 3' },
]

export const Default: Story = {
  args: {
    name: 'default-radio-group',
    legend: 'Choose an option',
    options,
    value: 'option-1',
    onChange: () => {},
  },
}

export const NoLegend: Story = {
  args: {
    ...Default.args,
    legend: undefined,
  },
}

export const Required: Story = {
  args: {
    ...Default.args,
    required: true,
  },
}

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
}

export const WithDisabledOption: Story = {
  args: {
    ...Default.args,
    options: [
      { value: 'option-1', label: 'Option 1' },
      { value: 'option-2', label: 'Option 2 (disabled)', disabled: true },
      { value: 'option-3', label: 'Option 3' },
    ],
  },
}

export const Interactive: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<string | null>(null)

    return (
      <div style={{ display: 'grid', gap: 12 }}>
        <RadioGroup {...args} value={selected} onChange={setSelected} />
        <small>
          Selected: <b>{selected ?? '— (nothing selected yet)'}</b>
        </small>
      </div>
    )
  },
  args: {
    ...Default.args,
    value: null,
  },
}
