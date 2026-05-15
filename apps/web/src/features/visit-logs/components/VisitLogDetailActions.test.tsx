import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { VisitLogDetailActions } from './VisitLogDetailActions';

describe('VisitLogDetailActions', () => {
  it('forwards detail action clicks', () => {
    const onBack = vi.fn();
    const onDelete = vi.fn();
    const onEdit = vi.fn();

    render(
      <VisitLogDetailActions
        backLabel="Back to visit logs"
        deleteLabel="Delete"
        editLabel="Edit"
        isActionDisabled={false}
        onBack={onBack}
        onDelete={onDelete}
        onEdit={onEdit}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Back to visit logs' }));
    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

    expect(onBack).toHaveBeenCalled();
    expect(onEdit).toHaveBeenCalled();
    expect(onDelete).toHaveBeenCalled();
  });

  it('disables edit and delete independently from back navigation', () => {
    render(
      <VisitLogDetailActions
        backLabel="Back to visit logs"
        deleteLabel="Delete"
        editLabel="Edit"
        isActionDisabled
        onBack={vi.fn()}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
      />,
    );

    expect(
      screen.getByRole('button', { name: 'Back to visit logs' }),
    ).not.toBeDisabled();
    expect(screen.getByRole('button', { name: 'Edit' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeDisabled();
  });
});
