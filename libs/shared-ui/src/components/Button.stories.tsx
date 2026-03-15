import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  args: {
    children: "Button",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
};

export const WithCustomClassName: Story = {
  args: {
    children: "Custom className",
    className:
      "bg-secondary text-secondary-foreground ring-1 ring-border hover:bg-secondary-hover",
  },
};
