import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@shared-ui/core';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { VisitLogDeleteActions } from './VisitLogDeleteActions';

const renderActions = ({
  isConfirmDisabled = false,
  isPending = false,
  onConfirm = vi.fn(),
} = {}) => {
  render(
    <Dialog open onOpenChange={vi.fn()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete visit log</DialogTitle>
          <DialogDescription>Delete a visit log record.</DialogDescription>
        </DialogHeader>
        <DialogBody>Delete confirmation content</DialogBody>
        <VisitLogDeleteActions
          cancelLabel="Cancel"
          confirmLabel="Delete"
          isConfirmDisabled={isConfirmDisabled}
          isPending={isPending}
          onConfirm={onConfirm}
        />
      </DialogContent>
    </Dialog>,
  );
};

describe('VisitLogDeleteActions', () => {
  it('forwards confirm actions', () => {
    const handleConfirm = vi.fn();

    renderActions({ onConfirm: handleConfirm });

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

    expect(handleConfirm).toHaveBeenCalled();
  });

  it('disables confirm independently from the cancel action', () => {
    renderActions({ isConfirmDisabled: true });

    expect(screen.getByRole('button', { name: 'Delete' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Cancel' })).not.toBeDisabled();
  });

  it('disables both actions while pending', () => {
    renderActions({ isConfirmDisabled: true, isPending: true });

    expect(screen.getByRole('button', { name: 'Delete' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
  });
});
