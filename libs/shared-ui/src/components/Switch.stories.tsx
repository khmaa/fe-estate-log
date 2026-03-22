import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "./Switch";
import { Label } from "./Label";

const meta = {
  title: "Components/Switch",
  component: Switch,
  args: {
    defaultChecked: false,
  },
} satisfies Meta<typeof Switch>;

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
      <Switch {...args} id="storybook-switch" />
      <Label htmlFor="storybook-switch">Enable instant notifications</Label>
    </div>
  ),
};
