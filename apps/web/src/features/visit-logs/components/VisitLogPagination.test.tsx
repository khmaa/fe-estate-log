import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { VisitLogPagination } from './VisitLogPagination';

describe('VisitLogPagination', () => {
  it('does not render when there is only one page', () => {
    render(
      <VisitLogPagination
        page={1}
        totalCount={1}
        totalPages={1}
        onPageChange={vi.fn()}
      />,
    );

    expect(screen.queryByRole('button', { name: 'Previous' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Next' })).toBeNull();
  });

  it('forwards both previous and next page changes', () => {
    const handlePageChange = vi.fn();

    render(
      <VisitLogPagination
        page={2}
        totalCount={5}
        totalPages={3}
        onPageChange={handlePageChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));

    expect(handlePageChange).toHaveBeenNthCalledWith(1, 1);
    expect(handlePageChange).toHaveBeenNthCalledWith(2, 3);
  });
});
