import type { Meta, StoryObj } from "@storybook/react";
import { WorkFieldItem } from "../../components/UI/WorkFieldItem";
import { GlobalStyle } from "../../utils/storybook";

const meta = {
  title: "UI/WorkFieldItem",
  component: WorkFieldItem,
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
} satisfies Meta<typeof WorkFieldItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Human resources",
    slug: "human-resources",
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    name: "Human resources",
    slug: "human-resources",
    selected: true,
  },
};
