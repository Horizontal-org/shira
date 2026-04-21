import type { Meta, StoryObj } from '@storybook/react';
import { styled } from 'styled-components';
import { GeneralTooltip } from './GeneralTooltip'

const meta = {
  title: 'Components/GeneralTooltip',
  component: GeneralTooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],  
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    )
  ]
} satisfies Meta<typeof GeneralTooltip>;

  
  
export default meta;
type Story = StoryObj<typeof meta>;

const Container = styled.div`
  width: 400px;
`;

// Default state
export const Default: Story = {
  args: {
    children: (<div>something</div>),
    enabled: true,
    show: true,
    setShow: () => console.log('set show'),
    label: 'tooltip'
  }
};
