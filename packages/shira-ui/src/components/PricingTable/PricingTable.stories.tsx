import type { Meta, StoryObj } from "@storybook/react";
import { PricingTable } from "./PricingTable";

const meta = {
  title: "Components/PricingTable",
  component: PricingTable,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PricingTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    learnMoreText: "Learn more",
    onLearnMoreClick: () => undefined,
    plans: [
      {
        id: "starter",
        title: "Starter",
        price: "$0 / month",
        description: "Great for getting started.",
        buttonText: "Current plan",
        buttonType: "outline",
        isCurrentPlan: true,
        onClick: () => undefined,
      },
      {
        id: "pro",
        title: "Pro",
        price: "$49 / month",
        description: "Best for teams that need scale.",
        buttonText: "Upgrade",
        isHighlighted: true,
        onClick: () => undefined,
      },
      {
        id: "enterprise",
        title: "Enterprise",
        price: "Contact us",
        description: "For custom deployment and support.",
        buttonText: "Contact sales",
        buttonType: "outline",
        onClick: () => undefined,
      },
    ],
    sections: [
      {
        title: "Admin management",
        rows: [
          {
            label: "Hosting",
            tooltip: "Where your account is hosted.",
            values: [
              { type: "text", value: "Cloud" },
              { type: "text", value: "Cloud" },
              { type: "text", value: "Cloud + On-premise" },
            ],
          },
          {
            label: "Admin dashboard",
            values: [{ type: "check" }, { type: "check" }, { type: "check" }],
          },
        ],
      },
      {
        title: "Support",
        rows: [
          {
            label: "Priority support",
            values: [
              { type: "text", value: "-" },
              { type: "text", value: "3 business days" },
              { type: "text", value: "1 business day" },
            ],
          },
        ],
      },
    ],
  },
};
