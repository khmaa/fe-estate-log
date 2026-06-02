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
    expect(screen.getByText('Enter a visit log title.')).toBeInTheDocument();
    expect(
      screen.getByText('Enter the district or destination area.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Enter a price label.')).toBeInTheDocument();
    expect(screen.getByText('Enter a short summary.')).toBeInTheDocument();

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

  it('prefills the form from duplicate initial values', () => {
    render(
      <AppProviders>
        <VisitLogCreateDialog
          open
          initialValues={{
            title: 'Duplicated visit',
            district: 'Mapo-gu',
            priceLabel: 'KRW 730M',
            propertyType: 'retail',
            summary: 'Review the weekend foot traffic.',
          }}
          onCreated={vi.fn()}
          onOpenChange={vi.fn()}
        />
      </AppProviders>,
    );

    expect(
      screen.getByRole('heading', { name: 'Duplicate visit log draft' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Start from the selected visit log and adjust the copied details before saving a new draft.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toHaveValue('Duplicated visit');
    expect(screen.getByLabelText('District')).toHaveValue('Mapo-gu');
    expect(screen.getByLabelText('Price')).toHaveValue('KRW 730M');
    expect(screen.getByLabelText('Summary')).toHaveValue(
      'Review the weekend foot traffic.',
    );
    expect(
      screen.getByRole('button', { name: 'Create duplicate draft' }),
    ).not.toBeDisabled();
  });
});
