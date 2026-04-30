import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AppProviders } from '../../../app/AppProviders';
import { VisitLogActiveFilters } from './VisitLogActiveFilters';

describe('VisitLogActiveFilters', () => {
  it('renders active filter badges only for non-default filter state', () => {
    render(
      <AppProviders>
        <VisitLogActiveFilters
          filters={{
            page: 2,
            pageSize: 5,
            pinnedOnly: true,
            query: 'gangnam',
            sort: 'district',
          }}
          onClearPage={vi.fn()}
          onClearPageSize={vi.fn()}
          onClearPinnedOnly={vi.fn()}
          onClearQuery={vi.fn()}
          onClearSort={vi.fn()}
        />
      </AppProviders>,
    );

    expect(screen.getByText('Active filters')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Clear Search: gangnam filter' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Clear Sort: District filter' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Clear Pinned only filter' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Clear Page size: 5 filter' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Clear Page: 2 filter' }),
    ).toBeInTheDocument();
  });

  it('returns null when no active filter remains', () => {
    render(
      <AppProviders>
        <VisitLogActiveFilters
          filters={{
            page: 1,
            pageSize: 2,
            pinnedOnly: false,
            query: '',
            sort: 'latest',
          }}
          onClearPage={vi.fn()}
          onClearPageSize={vi.fn()}
          onClearPinnedOnly={vi.fn()}
          onClearQuery={vi.fn()}
          onClearSort={vi.fn()}
        />
      </AppProviders>,
    );

    expect(screen.queryByText('Active filters')).toBeNull();
  });

  it('forwards individual active filter clear actions', () => {
    const handleClearQuery = vi.fn();
    const handleClearSort = vi.fn();
    const handleClearPinnedOnly = vi.fn();
    const handleClearPageSize = vi.fn();
    const handleClearPage = vi.fn();

    render(
      <AppProviders>
        <VisitLogActiveFilters
          filters={{
            page: 2,
            pageSize: 5,
            pinnedOnly: true,
            query: 'gangnam',
            sort: 'district',
          }}
          onClearPage={handleClearPage}
          onClearPageSize={handleClearPageSize}
          onClearPinnedOnly={handleClearPinnedOnly}
          onClearQuery={handleClearQuery}
          onClearSort={handleClearSort}
        />
      </AppProviders>,
    );

    fireEvent.click(
      screen.getByRole('button', { name: 'Clear Search: gangnam filter' }),
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Clear Sort: District filter' }),
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Clear Pinned only filter' }),
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Clear Page size: 5 filter' }),
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Clear Page: 2 filter' }),
    );

    expect(handleClearQuery).toHaveBeenCalled();
    expect(handleClearSort).toHaveBeenCalled();
    expect(handleClearPinnedOnly).toHaveBeenCalled();
    expect(handleClearPageSize).toHaveBeenCalled();
    expect(handleClearPage).toHaveBeenCalled();
  });
});
