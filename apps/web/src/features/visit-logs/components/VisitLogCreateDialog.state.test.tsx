import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AppProviders } from '../../../app/AppProviders';
import { useCreateVisitLog } from '../hooks/useCreateVisitLog';
import { VisitLogCreateDialog } from './VisitLogCreateDialog';

vi.mock('../hooks/useCreateVisitLog', () => ({
  useCreateVisitLog: vi.fn(),
}));

const createMutationState = (
  overrides?: Partial<ReturnType<typeof useCreateVisitLog>>,
) => ({
  mutateAsync: vi.fn(),
  reset: vi.fn(),
  isPending: false,
  isError: false,
  ...overrides,
});

describe('VisitLogCreateDialog state handling', () => {
  it('renders an error message when the create mutation fails', () => {
    vi.mocked(useCreateVisitLog).mockReturnValue(
      createMutationState({ isError: true }) as ReturnType<
        typeof useCreateVisitLog
      >,
    );

    render(
      <AppProviders>
        <VisitLogCreateDialog open onCreated={vi.fn()} onOpenChange={vi.fn()} />
      </AppProviders>,
    );

    expect(
      screen.getByText('Failed to create the visit log.'),
    ).toBeInTheDocument();
  });

  it('resets mutation state when the dialog is closed from the cancel action', async () => {
    const mutation = createMutationState();
    const onOpenChange = vi.fn();

    vi.mocked(useCreateVisitLog).mockReturnValue(
      mutation as ReturnType<typeof useCreateVisitLog>,
    );

    render(
      <AppProviders>
        <VisitLogCreateDialog
          open
          onCreated={vi.fn()}
          onOpenChange={onOpenChange}
        />
      </AppProviders>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
    expect(mutation.reset).toHaveBeenCalled();
  });

  it('keeps the create action disabled while the mutation is pending', () => {
    vi.mocked(useCreateVisitLog).mockReturnValue(
      createMutationState({ isPending: true }) as ReturnType<
        typeof useCreateVisitLog
      >,
    );

    render(
      <AppProviders>
        <VisitLogCreateDialog open onCreated={vi.fn()} onOpenChange={vi.fn()} />
      </AppProviders>,
    );

    expect(screen.getByRole('button', { name: 'Create draft' })).toBeDisabled();
  });
});
