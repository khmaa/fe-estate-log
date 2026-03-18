import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";
import { Label } from "./Label";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  args: {
    defaultChecked: false,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="inline-flex items-center gap-3">
      <Checkbox {...args} id="storybook-checkbox" />
      <Label htmlFor="storybook-checkbox">Email me product updates</Label>
    </div>
  ),
};
