import type { StoryObj, Meta } from "@storybook/react";
import { BigTextInput } from "../../components/UI/BigTextInput";
import { GlobalStyle } from "../../utils/storybook";

const meta: Meta<typeof BigTextInput> = {
  title: "UI/BigTextInput",
  component: BigTextInput,
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

type Story = StoryObj<typeof BigTextInput>;

export const Default: Story = {
  args: {
    placeholder: "Placeholder",
  },
};
