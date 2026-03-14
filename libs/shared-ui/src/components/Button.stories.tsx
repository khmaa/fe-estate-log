import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  args: {
    children: "Button",
    style: {
      padding: "10px 16px",
      border: "1px solid #cbd5e1",
      borderRadius: "8px",
      backgroundColor: "#ffffff",
      color: "#0f172a",
      cursor: "pointer",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
    style: {
      padding: "10px 16px",
      border: "1px solid #cbd5e1",
      borderRadius: "8px",
      backgroundColor: "#e2e8f0",
      color: "#64748b",
      cursor: "not-allowed",
    },
  },
};

export const WithCustomClassName: Story = {
  args: {
    children: "Custom className",
    className: "storybook-button",
    style: {
      padding: "10px 16px",
      border: "1px solid #0f172a",
      borderRadius: "999px",
      backgroundColor: "#f8fafc",
      color: "#0f172a",
      fontWeight: 600,
    },
  },
};
