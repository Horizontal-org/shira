import type { Meta, StoryObj } from "@storybook/react";
import { GlobalStyle } from "../../utils/storybook";
import { Title } from "../../components/UI/Title";

const meta = {
  title: "UI/Title",
  component: Title,
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
} satisfies Meta<typeof Title>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Title",
  },
};
