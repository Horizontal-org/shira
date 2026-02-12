import type { StoryObj, Meta } from "@storybook/react";
import { FeedbackBox } from "../../components/UI/FeedbackBox";
import { GlobalStyle } from "../../utils/storybook";

const meta: Meta<typeof FeedbackBox> = {
  title: "UI/FeedbackBox",
  component: FeedbackBox,
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

type Story = StoryObj<typeof FeedbackBox>;

export const Default: Story = {
  args: {
    easyness: "complicated",
    recommend: "very-easy",
    improve: "",
    onEasyness: () => {},
    onRecommend: () => {},
    onImprove: () => {},
  },
};
