import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AppProviders } from '../../../app/AppProviders';
import { VisitLogCreateDialog } from './VisitLogCreateDialog';

describe('VisitLogCreateDialog', () => {
  it('disables create until the required fields are filled', () => {
    render(
      <AppProviders>
        <VisitLogCreateDialog open onCreated={vi.fn()} onOpenChange={vi.fn()} />
      </AppProviders>,
    );

    expect(screen.getByRole('button', { name: 'Create draft' })).toBeDisabled();

    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: 'Jamsil draft' },
    });
    fireEvent.change(screen.getByLabelText('District'), {
      target: { value: 'Songpa-gu' },
    });
    fireEvent.change(screen.getByLabelText('Price'), {
      target: { value: 'KRW 1.35B' },
    });
    fireEvent.change(screen.getByLabelText('Summary'), {
      target: { value: 'Need a second pass.' },
    });

    expect(
      screen.getByRole('button', { name: 'Create draft' }),
    ).not.toBeDisabled();
  });

  it('creates a visit log and resets the form when the dialog closes', async () => {
    const onCreated = vi.fn();
    const onOpenChange = vi.fn();

    const { rerender } = render(
      <AppProviders>
        <VisitLogCreateDialog
          open
          onCreated={onCreated}
          onOpenChange={onOpenChange}
        />
      </AppProviders>,
    );

    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: 'Jamsil draft' },
    });
    fireEvent.change(screen.getByLabelText('District'), {
      target: { value: 'Songpa-gu' },
    });
    fireEvent.change(screen.getByLabelText('Price'), {
      target: { value: 'KRW 1.35B' },
    });
    fireEvent.change(screen.getByLabelText('Summary'), {
      target: { value: 'Need a second pass.' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Create draft' }));

    await waitFor(() => {
      expect(onCreated).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Jamsil draft',
          district: 'Songpa-gu',
          status: 'draft',
        }),
      );
    });
    expect(onOpenChange).toHaveBeenCalledWith(false);

    rerender(
      <AppProviders>
        <VisitLogCreateDialog
          open={false}
          onCreated={onCreated}
          onOpenChange={onOpenChange}
        />
      </AppProviders>,
    );

    rerender(
      <AppProviders>
        <VisitLogCreateDialog
          open
          onCreated={onCreated}
          onOpenChange={onOpenChange}
        />
      </AppProviders>,
    );

    expect(screen.getByLabelText('Title')).toHaveValue('');
    expect(screen.getByLabelText('District')).toHaveValue('');
    expect(screen.getByLabelText('Price')).toHaveValue('');
    expect(screen.getByLabelText('Summary')).toHaveValue('');
  });
});
