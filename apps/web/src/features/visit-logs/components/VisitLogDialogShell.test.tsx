import { DialogFooter } from '@shared-ui/core';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { VisitLogDialogShell } from './VisitLogDialogShell';

const renderShell = ({ open = true } = {}) => {
  const handleOpenChange = vi.fn();

  render(
    <VisitLogDialogShell
      actions={
        <DialogFooter>
          <button type="button">Save</button>
        </DialogFooter>
      }
      description="Manage a visit log record."
      onOpenChange={handleOpenChange}
      open={open}
      title="Visit log dialog"
    >
      <p>Dialog body content</p>
    </VisitLogDialogShell>,
  );

  return { handleOpenChange };
};

describe('VisitLogDialogShell', () => {
  it('renders title, description, body, and actions', () => {
    renderShell();

    expect(
      screen.getByRole('dialog', { name: 'Visit log dialog' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Manage a visit log record.')).toBeInTheDocument();
    expect(screen.getByText('Dialog body content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('does not render dialog content when closed', () => {
    renderShell({ open: false });

    expect(screen.queryByText('Dialog body content')).not.toBeInTheDocument();
  });

  it('forwards open state changes from the dialog shell', () => {
    const { handleOpenChange } = renderShell();

    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });

    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });
});
