import type { Meta, StoryObj } from "@storybook/react";
import { Field } from "./Field";
import { Input } from "./Input";
import { Textarea } from "./Textarea";

const meta = {
  title: "Components/Field",
  component: Field,
  args: {
    htmlFor: "storybook-field",
    label: "Email address",
  },
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithHelperText: Story = {
  render: (args) => (
    <div className="max-w-sm">
      <Field {...args} helperText="We will only use this email for account notifications.">
        <Input type="email" placeholder="hello@example.com" />
      </Field>
    </div>
  ),
};

export const WithError: Story = {
  render: (args) => (
    <div className="max-w-sm">
      <Field {...args} error="Please enter a valid email address." required>
        <Input type="email" placeholder="hello@example.com" />
      </Field>
    </div>
  ),
};

export const TextareaField: Story = {
  render: (args) => (
    <div className="max-w-xl">
      <Field
        {...args}
        htmlFor="storybook-message"
        label="Project brief"
        helperText="Share the product goals, constraints, and target users."
      >
        <Textarea placeholder="Describe what you are trying to build." />
      </Field>
    </div>
  ),
};
