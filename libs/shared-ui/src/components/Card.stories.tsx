import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./Card";
import { Button } from "./Button";
import { CheckboxField } from "./CheckboxField";
import { Field } from "./Field";
import { Input } from "./Input";
import { Textarea } from "./Textarea";

const meta = {
  title: "Components/Card",
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Contact preferences</CardTitle>
          <CardDescription>
            Keep your profile details and notification preferences in one place.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Field
            htmlFor="card-email"
            label="Email"
            helperText="We only use this for account updates."
          >
            <Input type="email" placeholder="hello@example.com" />
          </Field>
          <Field
            htmlFor="card-message"
            label="Message"
            helperText="Share any additional context before we review your request."
          >
            <Textarea placeholder="Tell us more about your project." />
          </Field>
          <CheckboxField
            id="card-updates"
            label="Email me product updates"
            helperText="You can unsubscribe at any time."
          />
        </CardContent>
        <CardFooter>
          <Button>Save changes</Button>
          <Button variant="secondary">Preview</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const Compact: Story = {
  render: () => (
    <div className="max-w-xl">
      <Card className="p-6">
        <CardHeader className="gap-2">
          <CardTitle className="text-2xl">Quick note</CardTitle>
          <CardDescription>
            Add a short summary to keep your visit log easy to scan.
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-4">
          <Field htmlFor="card-summary" label="Summary">
            <Input placeholder="Bright living room with good ventilation" />
          </Field>
        </CardContent>
      </Card>
    </div>
  ),
};
