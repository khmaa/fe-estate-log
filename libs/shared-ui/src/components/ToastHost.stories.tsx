import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";
import { ToastHostProvider } from "./ToastHost";
import { useToast } from "./useToast";

const meta = {
  title: "Components/ToastHost",
  component: ToastHostProvider,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ToastHostProvider>;

type Story = StoryObj<typeof meta>;

const ToastHostDemo = () => {
  const { showToast } = useToast();

  return (
    <div className="flex min-h-[320px] items-start gap-3 p-10">
      <Button
        onClick={() =>
          showToast({
            title: "Draft saved",
            description: "The current showcase state was stored locally.",
            variant: "success",
          })
        }
      >
        Success toast
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          showToast({
            title: "Validation failed",
            description: "Review the highlighted fields and try again.",
            variant: "error",
          })
        }
      >
        Error toast
      </Button>
    </div>
  );
};

export default meta;

export const ManagedToast: Story = {
  render: () => (
    <ToastHostProvider>
      <ToastHostDemo />
    </ToastHostProvider>
  ),
};
