import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { RadioGroup } from "./RadioGroup";
import type { RadioGroupProps } from "./RadioGroup";

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  args: {
    label: "Preferred contact method",
    name: "contact-method",
    helperText: "Choose the primary way we should contact you.",
    value: "email",
    options: [
      {
        value: "email",
        label: "Email",
        description: "Best for product updates and async follow-up.",
      },
      {
        value: "phone",
        label: "Phone",
        description: "Use this for urgent scheduling changes.",
      },
      {
        value: "chat",
        label: "Chat",
        description: "Recommended for quick iteration during working hours.",
      },
    ],
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const RadioGroupStory = (args: RadioGroupProps) => {
  const [value, setValue] = useState(args.value);

  return <RadioGroup {...args} value={value} onValueChange={setValue} />;
};

export const Default: Story = {
  render: (args) => <RadioGroupStory {...args} />,
};

export const WithError: Story = {
  render: (args) => (
    <RadioGroupStory
      {...args}
      helperText={undefined}
      error="Please choose one contact method before continuing."
    />
  ),
};

export const WithDisabledOption: Story = {
  render: (args) => (
    <RadioGroupStory
      {...args}
      options={[
        ...args.options.slice(0, 2),
        {
          value: "in-person",
          label: "In person",
          description: "Currently unavailable for your plan.",
          disabled: true,
        },
      ]}
    />
  ),
};
