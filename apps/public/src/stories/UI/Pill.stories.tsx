import type { StoryObj, Meta } from "@storybook/react";
import { Pill } from "../../components/UI/Pill";
import UnsureIcon from "../../components/UI/Icons/Unsure";
import { GlobalStyle } from "../../utils/storybook";

const meta: Meta<typeof Pill> = {
  title: "UI/Pill",
  component: Pill,
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div>
        <GlobalStyle />
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Pill>;

export const Default: Story = {
  args: {
    selected: false,
    label: "Complicated",
    icon: <UnsureIcon />,
  },
};
