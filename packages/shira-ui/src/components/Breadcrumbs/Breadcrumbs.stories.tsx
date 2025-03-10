import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from './Breadcrumbs';


const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    // layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: 'Breadcrumb item'
    },
    active: {
      control: 'number',
      description: 'Active breadcrumb index'
    }    
  }
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

// Default toggle with label
export const Default: Story = {
  args: {
    active: 1,
    items: [
      {
        text: 'First bread'
      },
      {
        text: 'Second bread'
      },
      {
        text: 'Third bread'
      },
    ],
  },
};

// // Interactive toggle example using React state
// export const Interactive: Story = {
//   args: {
//     isEnabled: false,
//     leftLabel: 'Unpublished',
//     rightLabel: 'Published',
//     onToggle: () => {},
//   },
//   render: function Render(args) {
//     const [isEnabled, setIsEnabled] = useState(false);
//     return (
//       <Toggle 
//         {...args}
//         isEnabled={isEnabled}
//         onToggle={() => setIsEnabled(!isEnabled)}
//       />
//     );
//   }
// };

// // Enabled state
// export const Enabled: Story = {
//   args: {
//     isEnabled: true,
//     rightLabel: 'Enabled state',
//     onToggle: () => {},
//   },
// };

// // Without label
// export const WithoutLabel: Story = {
//   args: {
//     isEnabled: false,
//     onToggle: () => {},
//   },
// };

// // Disabled state
// export const Disabled: Story = {
//   args: {
//     isEnabled: false,
//     rightLabel: 'Disabled toggle',
//     disabled: true,
//     onToggle: () => {},
//   },
// };

// // Disabled and enabled state
// export const DisabledAndEnabled: Story = {
//   args: {
//     isEnabled: true,
//     rightLabel: 'Disabled and enabled',
//     disabled: true,
//     onToggle: () => {},
//   },
// };