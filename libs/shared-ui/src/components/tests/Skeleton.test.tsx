import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Skeleton } from '../Skeleton';

describe('Skeleton', () => {
  it('renders as an aria-hidden placeholder block', () => {
    render(<Skeleton data-testid="skeleton" />);

    expect(screen.getByTestId('skeleton')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });

  it('merges custom class names', () => {
    render(<Skeleton className="h-10 w-24" data-testid="skeleton" />);

    expect(screen.getByTestId('skeleton')).toHaveClass('h-10', 'w-24');
  });
});
