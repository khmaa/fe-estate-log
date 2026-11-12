import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

  it('announces success toasts with polite priority', async () => {
    render(
      <ToastProvider>
        <Toast open variant="success">
          <ToastTitle>Changes published</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );

    await waitFor(() => {
      expect(document.querySelector('[aria-live="polite"]')).toHaveTextContent(
        'Changes published',
      );
    });
  });

  it('announces error toasts with assertive priority', async () => {
    render(
      <ToastProvider>
        <Toast open variant="error">
          <ToastTitle>Publish failed</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );

    await waitFor(() => {
      expect(
        document.querySelector('[aria-live="assertive"]'),
      ).toHaveTextContent('Publish failed');
    });
  });

  it('uses an explicit announcement type before the variant default', async () => {
    render(
      <ToastProvider>
        <Toast open type="background" variant="error">
          <ToastTitle>Deferred error notice</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );

    await waitFor(() => {
      expect(document.querySelector('[aria-live="polite"]')).toHaveTextContent(
        'Deferred error notice',
      );
    });
    expect(document.querySelector('[aria-live="assertive"]')).toBeNull();
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

    expect(screen.queryByText('Dismissible toast')).toBeNull();
  });

  it('disables root animation for reduced motion', () => {
    render(
      <ToastProvider>
        <Toast open>
          <ToastTitle>Reduced motion toast</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );

    expect(screen.getByText('Reduced motion toast').closest('li')).toHaveClass(
      'data-[state=open]:animate-in',
      'motion-reduce:animate-none',
    );
  });
});
