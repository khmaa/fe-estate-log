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
import { VisitLogFormActions } from './VisitLogFormActions';

const renderActions = ({
  isPending = false,
  isSubmitDisabled = false,
  onSubmit = vi.fn(),
} = {}) => {
  render(
    <Dialog open onOpenChange={vi.fn()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Visit log form</DialogTitle>
          <DialogDescription>Actions for the visit log form.</DialogDescription>
        </DialogHeader>
        <DialogBody>Form fields</DialogBody>
        <VisitLogFormActions
          cancelLabel="Cancel"
          isPending={isPending}
          isSubmitDisabled={isSubmitDisabled}
          onSubmit={onSubmit}
          submitLabel="Save changes"
        />
      </DialogContent>
    </Dialog>,
  );
};

describe('VisitLogFormActions', () => {
  it('forwards submit actions', () => {
    const handleSubmit = vi.fn();

    renderActions({ onSubmit: handleSubmit });

    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));

    expect(handleSubmit).toHaveBeenCalled();
  });

  it('disables submit independently from the cancel action', () => {
    renderActions({ isSubmitDisabled: true });

    expect(screen.getByRole('button', { name: 'Save changes' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Cancel' })).not.toBeDisabled();
  });

  it('disables both actions while pending', () => {
    renderActions({ isPending: true, isSubmitDisabled: true });

    expect(screen.getByRole('button', { name: 'Save changes' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
  });
});
