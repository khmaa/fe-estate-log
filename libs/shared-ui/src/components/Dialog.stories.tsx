import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";

const meta = {
  title: "Components/Dialog",
  component: DialogContent,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DialogContent>;

type Story = StoryObj<typeof meta>;

const DemoDialog = ({
  title,
  description,
  body,
}: {
  title: string;
  description: string;
  body: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p className="text-sm leading-6 text-foreground">{body}</p>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button variant="secondary">Save draft</Button>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default meta;

export const Default: Story = {
  render: () => (
    <DemoDialog
      title="Create a new visit log"
      description="Review the shared UI modal structure before wiring it into a real workflow."
      body="This dialog uses a portal-backed overlay, a structured header, body, and footer, and shared button actions."
    />
  ),
};

export const DestructiveTone: Story = {
  render: () => (
    <DemoDialog
      title="Delete this draft?"
      description="This action removes the saved draft from your current workspace."
      body="Use destructive-style copy in the content while keeping the layout primitives reusable and neutral."
    />
  ),
};
