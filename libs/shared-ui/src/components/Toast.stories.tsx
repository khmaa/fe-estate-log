import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from './Button';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './Toast';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Toast>;

type Story = StoryObj<typeof meta>;

const ToastStory = ({
  variant,
  title,
  description,
}: {
  variant: 'info' | 'success' | 'error';
  title: string;
  description: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <ToastProvider>
      <div className="flex min-h-[320px] items-start justify-start p-10">
        <Button onClick={() => setOpen(true)}>Show toast</Button>
      </div>
      <Toast open={open} onOpenChange={setOpen} variant={variant}>
        <ToastTitle>{title}</ToastTitle>
        <ToastDescription>{description}</ToastDescription>
        <ToastClose>Dismiss</ToastClose>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
};

export default meta;

export const Info: Story = {
  render: () => (
    <ToastStory
      variant="info"
      title="Draft saved"
      description="Your shared-ui showcase notes were saved locally."
    />
  ),
};

export const Success: Story = {
  render: () => (
    <ToastStory
      variant="success"
      title="Changes published"
      description="The updated token styles are now available in the web preview."
    />
  ),
};

export const Error: Story = {
  render: () => (
    <ToastStory
      variant="error"
      title="Publish failed"
      description="Please review the required fields and try again."
    />
  ),
};
