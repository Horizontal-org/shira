import type { Meta, StoryObj } from "@storybook/react";
import { Note } from "./Note";

const meta = {
  title: "Components/Note",
  component: Note,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Note>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default view
export const Default: Story = {
  args: {
    content: new DOMParser().parseFromString(`<div id='content'><div data-position=1 id=component-text-1 ><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id odio fringilla, maximus enim nec, congue ligula. Donec nec magna sem. Mauris eleifend sit amet magna eget sagittis. Sed fringilla ultricies felis, quis maximus libero volutpat nec. Donec eget nibh et mi tempor convallis. Maecenas consequat eros sem, vitae lacinia risus congue ac. Curabitur mollis et ipsum a posuere.</p></div><img data-position=2 id=component-image-2 alt=INCIDENT1.png src=https://placehold.co/600x400 /><div data-position=3 id=component-text-3 ><p>2222</p></div><img data-position=4 id=component-image-4 alt=INCIDENT1.png src=https://placehold.co/200x400 /></div>`, 'text/html').getElementById('content') || new HTMLElement()
  },
};