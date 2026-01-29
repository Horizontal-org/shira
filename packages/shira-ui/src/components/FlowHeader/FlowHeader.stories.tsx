import { StoryObj, Meta } from '@storybook/react';
import { FlowHeader } from './FlowHeader';
import { Button } from '../Button';

export default {
  title: 'Components/FlowHeader',
  component: FlowHeader,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '1024px', background: '#F3F3F3' }}>
            <Story />
        </div>
      </div>
    ),
  ]
} as Meta<typeof FlowHeader>;

type Story = StoryObj<typeof FlowHeader>

export const Default: Story = {
  args: {},
  render: function Render(args) {
    return (
      <div style={{ padding: '40px', background: '#f3f3f3'}}>
        <FlowHeader
          onExit={() => { console.log('exit') }}
          title='Flow header'
          actions={(
            <Button 
              text='Submit'
              onClick={() => { console.log('submit') }}
            />
          )}
        />
      </div>
    )
  }
}