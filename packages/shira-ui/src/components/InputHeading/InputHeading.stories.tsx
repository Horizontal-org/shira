import type { Meta, StoryObj } from "@storybook/react";
import { Body3, SubHeading3 } from "../Typography";
import { InputHeading } from "./InputHeading";

const meta = {
  title: "Components/InputHeading",
  component: InputHeading,
} satisfies Meta<typeof InputHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Required: Story = {
  args: {
    required: true,
    children: (
      <>
        <SubHeading3>Question template name</SubHeading3>
        <Body3>Use a descriptive name to help other users find it.</Body3>
      </>
    ),
  },
};

export const Optional: Story = {
  args: {
    required: false,
    children: <SubHeading3>Optional field</SubHeading3>,
  },
};
