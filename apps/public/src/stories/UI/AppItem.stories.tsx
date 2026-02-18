import type { StoryObj, Meta } from "@storybook/react";
import { AppItem } from "../../components/UI/AppItem";
import { GlobalStyle } from "../../utils/storybook";

const meta: Meta<typeof AppItem> = {
  title: "UI/AppItem",
  component: AppItem,
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600 }}>
        <GlobalStyle />
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof AppItem>;

export const Default: Story = {
  args: {
    name: "Gmail",
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    name: "Gmail",
    selected: true,
  },
};
