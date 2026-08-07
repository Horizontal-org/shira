import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TextInputArea } from "./TextInputArea";

const meta = {
  title: "Components/TextInputArea",
  component: TextInputArea,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof TextInputArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TwoLineInput: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div style={{ width: 600 }}>
        <TextInputArea
          {...args}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
    );
  },
  args: {
    placeholder: "Description",
    value: "",
    maxLength: 400,
    showCharacterCount: true,
    onChange: () => { },
  },
};
