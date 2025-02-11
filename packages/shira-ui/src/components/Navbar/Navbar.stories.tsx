import type { Meta, StoryObj } from "@storybook/react";
import { Navbar } from "./Navbar";

const meta = {
  title: "Components/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "color",
      description: "Background color of the navbar",
    },
    onNavigate: {
      description: "Callback function when navigation links are clicked",
    },
    translatedTexts: {
      description: "Object containing translated text for the navbar items",
    },
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default view
export const Default: Story = {
  args: {
    onNavigate: (route: string) => console.log("Navigate to:", route),
    translatedTexts: {
      home: "Home",
      about: "About",
      menu: "Menu",
      logIn: "Log in",
      createSpace: "Create space",
    },
  },
};

// With custom background color
export const CustomBackground: Story = {
  args: {
    ...Default.args,
    color: "#DBE3A3",
  },
};

// Mobile view
export const MobileView: Story = {
  args: {
    ...Default.args,
    translatedTexts: {
      home: "Home",
      about: "About",
      menu: "Menu",
      logIn: "Log in",
      createSpace: "Create space",
    },
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
