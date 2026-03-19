import type { Meta, StoryObj } from "@storybook/react-vite";
import { CheckboxField } from "./CheckboxField";

const meta = {
  title: "Components/CheckboxField",
  component: CheckboxField,
  args: {
    label: "I agree to the terms and privacy policy.",
  },
} satisfies Meta<typeof CheckboxField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelperText: Story = {
  args: {
    helperText: "You must accept this before continuing to the next step.",
  },
};

export const WithError: Story = {
  args: {
    error: "Please accept the terms to continue.",
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
    helperText: "Your selection will be saved with the form.",
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
    helperText: "This preference is locked for your current plan.",
  },
};
