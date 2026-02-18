import type { Meta, StoryObj } from "@storybook/react";
import { TextInput } from "../../components/UI/TextInput";
import { GlobalStyle } from "../../utils/storybook";

const meta = {
  title: "UI/TextInput",
  component: TextInput,
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div style={{ width: 600 }}>
        <GlobalStyle />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Placeholder",
    value: "",
    onChange: () => {},
  },
};
