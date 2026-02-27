import type { Meta, StoryObj } from "@storybook/react";
import { GlobalStyle } from "../../utils/storybook";
import { LanguageSelect } from "../../components/UI/Select";

const meta = {
  title: "UI/Select",
  component: LanguageSelect,
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div style={{ height: "800px" }}>
        <GlobalStyle />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LanguageSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    autoselect: true,
    options: [
      { value: "op1", label: "Option 1", labelEnglish: "Option 1" },
      { value: "op2", label: "Option 2", labelEnglish: "Option 2" },
      { value: "op3", label: "Option 3", labelEnglish: "Option 3" },
    ],
    onChange: (value: string) => {
      console.log("LanguageSelect changed:", value);
    },
  },
};
