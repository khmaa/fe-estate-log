import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Spinner } from '../Spinner';

describe('Spinner', () => {
  it('renders with the default loading label', () => {
    render(<Spinner />);

    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });

  it('applies a custom label', () => {
    render(<Spinner label="Saving changes" />);

    expect(
      screen.getByRole('status', { name: 'Saving changes' }),
    ).toBeInTheDocument();
  });

  it('hides decorative spinners from assistive technology', () => {
    const { container } = render(
      <Spinner decorative label="Ignored loading label" />,
    );

    const spinner = container.firstChild;

    expect(spinner).toHaveAttribute('aria-hidden', 'true');
    expect(spinner).not.toHaveAttribute('role');
    expect(spinner).not.toHaveAttribute('aria-label');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('applies the selected size classes', () => {
    render(<Spinner size="lg" />);

    expect(screen.getByRole('status').firstChild).toHaveClass('h-6', 'w-6');
  });
});
