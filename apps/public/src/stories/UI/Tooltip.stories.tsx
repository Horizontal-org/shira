import type { Meta, StoryObj } from "@storybook/react";
import Tooltip from "../../components/UI/Tooltip";
import { GlobalStyle } from "../../utils/storybook";

const meta = {
  title: "UI/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600, backgroundColor: "#111111" }}>
        <GlobalStyle />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    explanationIndex: "20",
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo at aperiam quis cupiditate corrupti ipsa amet sit voluptatem autem porro est in quos laboriosam praesentium, repellendus labore iure cum necessitatibus?",
    hide: false,
  },
};
