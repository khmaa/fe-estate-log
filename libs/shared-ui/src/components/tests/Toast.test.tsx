import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '../Toast';

describe('Toast', () => {
  it('renders title and description when open', () => {
    render(
      <ToastProvider>
        <Toast open variant="success">
          <ToastTitle>Changes published</ToastTitle>
          <ToastDescription>Shared UI styles are now live.</ToastDescription>
          <ToastClose>Dismiss</ToastClose>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );

    expect(screen.getByText('Changes published')).toBeInTheDocument();
    expect(
      screen.getByText('Shared UI styles are now live.'),
    ).toBeInTheDocument();
  });

  it('applies the selected variant styles', () => {
    render(
      <ToastProvider>
        <Toast open variant="error">
          <ToastTitle>Publish failed</ToastTitle>
          <ToastDescription>Please try again.</ToastDescription>
          <ToastClose>Dismiss</ToastClose>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );

    expect(screen.getByText('Publish failed').closest('li')).toHaveClass(
      'border-danger',
    );
  });

  it('closes when the close action is pressed', () => {
    const ToastHarness = () => {
      const [open, setOpen] = useState(true);

      return (
        <ToastProvider>
          <Toast open={open} onOpenChange={setOpen}>
            <ToastTitle>Dismissible toast</ToastTitle>
            <ToastDescription>Toast body</ToastDescription>
            <ToastClose>Dismiss</ToastClose>
          </Toast>
          <ToastViewport />
        </ToastProvider>
      );
    };

    render(<ToastHarness />);

    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));

    expect(screen.queryByText('Dismissible toast')).not.toBeInTheDocument();
  });
});
